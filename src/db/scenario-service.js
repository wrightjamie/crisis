const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { getDb } = require('./database');
const imageService = require('./image-service');
const { validateScenario } = require('../validate-scenarios');

class ScenarioService {
    constructor(dbProvider = getDb, imgService = imageService) {
        this.getDb = dbProvider;
        this.imageService = imgService;
    }

    listScenarios({ publishedOnly = false } = {}) {
        const db = this.getDb();
        const query = publishedOnly
            ? `SELECT id, name, is_builtin, guide_html, data, draft_data, has_draft, status, updated_at FROM scenarios WHERE status = 'published' ORDER BY name ASC`
            : `SELECT id, name, is_builtin, guide_html, data, draft_data, has_draft, status, updated_at FROM scenarios ORDER BY name ASC`;
        const rows = db.prepare(query).all();

        return rows.map(r => {
            let parsed = {};
            try {
                parsed = JSON.parse(r.status === 'draft' && r.draft_data ? r.draft_data : r.data);
            } catch {}

            const roles = Array.isArray(parsed.roles) ? parsed.roles : [];
            const events = Array.isArray(parsed.eventTemplates) ? parsed.eventTemplates : [];
            const assets = Array.isArray(parsed.assets) ? parsed.assets : [];

            return {
                id: r.id,
                name: r.name || parsed.name || r.id,
                description: parsed.description || '',
                isBuiltin: Boolean(r.is_builtin),
                hasDraft: Boolean(r.has_draft),
                status: r.status || 'published',
                hasGuide: Boolean(r.guide_html || parsed.guideUrl),
                guideUrl: (r.guide_html || parsed.guideUrl) ? `/scenarios/${r.id}/guide.html` : null,
                rolesCount: roles.length,
                minPlayers: parsed.minUsers || (roles.length > 0 ? 1 : 1),
                maxPlayers: parsed.maxUsers || (roles.length > 0 ? roles.length : 10),
                eventCount: events.length,
                assetCount: assets.length,
                version: parsed.version || '1.0.0',
                updatedAt: r.updated_at
            };
        });
    }

    _resolveGuideHtml(id, dbGuideHtml) {
        if (dbGuideHtml && typeof dbGuideHtml === 'string' && dbGuideHtml.trim().length > 0) {
            return dbGuideHtml;
        }
        if (!id || typeof id !== 'string') return dbGuideHtml || null;
        const safeId = path.basename(id);
        const diskGuidePath = path.join(__dirname, '..', '..', 'data', 'scenarios', safeId, 'guide.html');
        if (fs.existsSync(diskGuidePath)) {
            try {
                const diskHtml = fs.readFileSync(diskGuidePath, 'utf8');
                if (diskHtml && diskHtml.trim().length > 0) {
                    try {
                        const db = this.getDb();
                        db.prepare(`UPDATE scenarios SET guide_html = ? WHERE id = ? AND (guide_html IS NULL OR TRIM(guide_html) = '')`).run(diskHtml, id);
                    } catch {}
                    return diskHtml;
                }
            } catch {}
        }
        return dbGuideHtml || null;
    }

    getScenario(id, { useDraft = false } = {}) {
        if (!id || typeof id !== 'string') return null;
        const db = this.getDb();
        const row = db.prepare(`SELECT * FROM scenarios WHERE id = ?`).get(id);
        if (!row) return null;

        const rawJson = (useDraft && row.draft_data) ? row.draft_data : row.data;
        let scenario = {};
        try {
            scenario = JSON.parse(rawJson);
        } catch (err) {
            console.error(`Failed to parse scenario data for '${id}':`, err.message);
            return null;
        }

        const resolvedGuideHtml = this._resolveGuideHtml(id, row.guide_html);

        // Attach guideUrl if guide_html exists
        if (resolvedGuideHtml) {
            scenario.guideUrl = `/scenarios/${id}/guide.html`;
        }

        // Attach built-in flag and draft metadata
        scenario.isBuiltin = Boolean(row.is_builtin);
        scenario._meta = {
            isBuiltin: Boolean(row.is_builtin),
            hasDraft: Boolean(row.has_draft),
            status: row.status || 'published',
            updatedAt: row.updated_at,
            hasGuide: Boolean(resolvedGuideHtml)
        };

        if (resolvedGuideHtml) {
            scenario._guideHtml = resolvedGuideHtml;
        }

        // Resolve images through image service
        this.imageService.resolveScenarioImages(scenario);

        return scenario;
    }

    getScenarioGuide(id) {
        if (!id) return null;
        const db = this.getDb();
        const row = db.prepare(`SELECT guide_html FROM scenarios WHERE id = ?`).get(id);
        if (!row) return null;
        return this._resolveGuideHtml(id, row.guide_html);
    }

    _normalizeForSave(scenarioData) {
        const clean = JSON.parse(JSON.stringify(scenarioData));
        delete clean._meta;
        delete clean._guideHtml;
        delete clean._validation;
        delete clean.isBuiltin;

        const unresolveItem = (item) => {
            if (!item || typeof item !== 'object') return;
            if (item.imageId) {
                item.image = item.imageId;
                delete item.imageId;
            }
            delete item.imageMeta;
        };

        imageService.forEachScenarioImageItem(clean, unresolveItem);
        return clean;
    }

    _getScenarioRowOrThrow(id) {
        if (!id) throw new Error('Scenario ID is required');
        const db = this.getDb();
        const row = db.prepare(`SELECT * FROM scenarios WHERE id = ?`).get(id);
        if (!row) throw new Error(`Scenario '${id}' not found`);
        return { db, row };
    }

    saveScenario(scenarioData, { guideHtml = null, isBuiltin = null, force = false, asDraft = false } = {}) {
        if (!scenarioData || typeof scenarioData !== 'object') {
            throw new Error('Scenario data must be a valid object');
        }

        const cleanData = this._normalizeForSave(scenarioData);
        const validation = validateScenario(cleanData);
        if (!asDraft && !validation.isValid && !force) {
            throw new Error(`Scenario validation failed: ${validation.errors.join('; ')}`);
        }

        const id = cleanData.id;
        if (asDraft && (!cleanData.name || !String(cleanData.name).trim())) {
            cleanData.name = 'Untitled Crisis Scenario';
        }
        const name = cleanData.name;
        if (!id || !name) {
            throw new Error("Scenario 'id' and 'name' are required");
        }

        const dataJson = JSON.stringify(cleanData);
        const db = this.getDb();
        const existing = db.prepare(`SELECT id, is_builtin, status, guide_html FROM scenarios WHERE id = ?`).get(id);
        const resolvedBuiltin = isBuiltin !== null ? (isBuiltin ? 1 : 0) : (existing ? existing.is_builtin : 0);

        const imageIdentifiers = this.imageService.extractScenarioImageIds(cleanData);

        if (asDraft) {
            db.transaction(() => {
                if (!existing) {
                    db.prepare(`
                        INSERT INTO scenarios (id, name, is_builtin, guide_html, data, draft_data, has_draft, status, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, 1, 'draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                    `).run(id, name, resolvedBuiltin, guideHtml, dataJson, dataJson);
                } else if (existing.status === 'draft') {
                    db.prepare(`
                        UPDATE scenarios
                        SET name = ?,
                            guide_html = COALESCE(NULLIF(?, ''), guide_html),
                            data = ?,
                            draft_data = ?,
                            has_draft = 1,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE id = ?
                    `).run(name, guideHtml, dataJson, dataJson, id);
                } else {
                    // Existing published scenario: update only draft_data so live games are unaffected
                    db.prepare(`
                        UPDATE scenarios
                        SET draft_data = ?,
                            guide_html = COALESCE(NULLIF(?, ''), guide_html),
                            has_draft = 1,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE id = ?
                    `).run(dataJson, guideHtml, id);
                }
                this.imageService.linkScenarioImages(id, imageIdentifiers);
            })();

            const saved = this.getScenario(id, { useDraft: true });
            if (saved) saved._validation = validation;
            return saved;
        }

        const stmt = db.prepare(`
            INSERT INTO scenarios (id, name, is_builtin, guide_html, data, draft_data, has_draft, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, 0, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                is_builtin = excluded.is_builtin,
                guide_html = COALESCE(NULLIF(excluded.guide_html, ''), scenarios.guide_html),
                data = excluded.data,
                draft_data = excluded.draft_data,
                has_draft = 0,
                status = 'published',
                updated_at = CURRENT_TIMESTAMP
        `);

        db.transaction(() => {
            stmt.run(id, name, resolvedBuiltin, guideHtml, dataJson, dataJson);
            this.imageService.linkScenarioImages(id, imageIdentifiers);
        })();

        return this.getScenario(id);
    }

    publishScenario(id) {
        const { db, row } = this._getScenarioRowOrThrow(id);

        const draftJson = row.draft_data || row.data;
        let draftObj;
        try {
            draftObj = JSON.parse(draftJson);
        } catch (err) {
            throw new Error(`Invalid draft JSON: ${err.message}`);
        }

        const cleanData = this._normalizeForSave(draftObj);
        const validation = validateScenario(cleanData);
        if (!validation.isValid) {
            const err = new Error(`Scenario validation failed: ${validation.errors.join('; ')}`);
            err.validationErrors = validation.errors;
            throw err;
        }

        const cleanJson = JSON.stringify(cleanData);
        const imageIdentifiers = this.imageService.extractScenarioImageIds(cleanData);

        db.transaction(() => {
            db.prepare(`
                UPDATE scenarios
                SET name = ?,
                    data = ?,
                    draft_data = ?,
                    has_draft = 0,
                    status = 'published',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(cleanData.name || row.name, cleanJson, cleanJson, id);
            this.imageService.linkScenarioImages(id, imageIdentifiers);
        })();

        return this.getScenario(id);
    }

    discardDraft(id) {
        const { db } = this._getScenarioRowOrThrow(id);

        db.prepare(`
            UPDATE scenarios
            SET draft_data = data,
                has_draft = 0,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(id);

        return this.getScenario(id, { useDraft: true });
    }

    cloneScenario(id, { newId, newName } = {}) {
        if (!id) throw new Error('Source scenario ID is required');
        const source = this.getScenario(id, { useDraft: true });
        if (!source) throw new Error(`Source scenario '${id}' not found`);

        const targetId = (newId || `${id}_copy_${Date.now().toString(36)}`).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
        const targetName = (newName || `${source.name} (Copy)`).trim();

        const db = this.getDb();
        const exists = db.prepare(`SELECT id FROM scenarios WHERE id = ?`).get(targetId);
        if (exists) {
            throw new Error(`A scenario with ID '${targetId}' already exists`);
        }

        const guideHtml = this.getScenarioGuide(id);
        const clonedData = this._normalizeForSave(source);
        clonedData.id = targetId;
        clonedData.name = targetName;
        if (guideHtml) {
            clonedData.guideUrl = `/scenarios/${targetId}/guide.html`;
        }

        return this.saveScenario(clonedData, {
            guideHtml,
            isBuiltin: 0,
            asDraft: true
        });
    }

    resetToBuiltin(id, { legacyScenariosDir = null } = {}) {
        if (!id) throw new Error('Scenario ID is required');
        const baseDir = legacyScenariosDir || path.join(__dirname, '..', '..', 'data', 'scenarios');
        const scenarioFolder = path.join(baseDir, id);
        const scenarioJsPath = path.join(scenarioFolder, 'scenario.js');

        if (!fs.existsSync(scenarioJsPath)) {
            throw new Error(`Factory default definition not found on disk for '${id}'`);
        }

        delete require.cache[require.resolve(scenarioJsPath)];
        const factoryScenario = require(scenarioJsPath);
        const guidePath = path.join(scenarioFolder, 'guide.html');
        const guideHtml = fs.existsSync(guidePath) ? fs.readFileSync(guidePath, 'utf8') : null;

        return this.saveScenario(factoryScenario, {
            guideHtml,
            isBuiltin: 1,
            force: true,
            asDraft: false
        });
    }

    ensureCoreScenariosSeeded({ legacyScenariosDir = null } = {}) {
        const db = this.getDb();
        const imgCount = db.prepare(`SELECT COUNT(*) as cnt FROM images`).get().cnt;
        if (imgCount === 0 && this.imageService && typeof this.imageService.seedBaseImages === 'function') {
            this.imageService.seedBaseImages();
        }

        const baseDir = legacyScenariosDir || path.join(__dirname, '..', '..', 'data', 'scenarios');
        if (!fs.existsSync(baseDir)) return 0;

        const dirents = fs.readdirSync(baseDir, { withFileTypes: true });
        let seededCount = 0;

        for (const dirent of dirents) {
            if (!dirent.isDirectory()) continue;
            const scenarioId = dirent.name;
            const existing = db.prepare(`SELECT id FROM scenarios WHERE id = ?`).get(scenarioId);
            if (existing) continue;

            const scenarioFolder = path.join(baseDir, scenarioId);
            const scenarioJsPath = path.join(scenarioFolder, 'scenario.js');
            if (!fs.existsSync(scenarioJsPath)) continue;

            try {
                delete require.cache[require.resolve(scenarioJsPath)];
                const scenario = require(scenarioJsPath);
                const guidePath = path.join(scenarioFolder, 'guide.html');
                const guideHtml = fs.existsSync(guidePath) ? fs.readFileSync(guidePath, 'utf8') : null;

                this.saveScenario(scenario, {
                    guideHtml,
                    isBuiltin: 1,
                    force: true,
                    asDraft: false
                });
                seededCount++;
            } catch (err) {
                console.error(`Failed to auto-seed core scenario '${scenarioId}':`, err.message);
            }
        }

        return seededCount;
    }

    deleteScenario(id) {
        if (!id) throw new Error('Scenario ID is required');
        const db = this.getDb();
        const row = db.prepare(`SELECT id, is_builtin FROM scenarios WHERE id = ?`).get(id);
        if (!row) {
            return { success: false, error: 'Scenario not found' };
        }

        db.transaction(() => {
            this.imageService.cleanupUnusedImages(id);
            db.prepare(`DELETE FROM scenarios WHERE id = ?`).run(id);
        })();

        return { success: true, id };
    }

    exportAllScenarios(outputDir = null, publicDir = null) {
        const targetDir = outputDir || path.join(__dirname, '..', '..', 'scenarios');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const scenarios = this.listScenarios();
        const results = [];

        for (const s of scenarios) {
            const zipBuffer = this.exportScenarioZip(s.id, publicDir);
            const zipPath = path.join(targetDir, `${s.id}.zip`);
            fs.writeFileSync(zipPath, zipBuffer);
            results.push({
                id: s.id,
                name: s.name,
                path: zipPath,
                sizeBytes: zipBuffer.length
            });
        }

        return results;
    }

    exportScenarioZip(id, publicDir = null) {
        const { row } = this._getScenarioRowOrThrow(id);

        const pubDir = publicDir || path.join(__dirname, '..', '..', 'public');
        const zip = new AdmZip();

        let scenarioData = {};
        try {
            scenarioData = JSON.parse(row.data);
        } catch {
            scenarioData = { id: row.id, name: row.name };
        }

        // 1. Add scenario.json
        zip.addFile('scenario.json', Buffer.from(JSON.stringify(scenarioData, null, 2), 'utf8'));

        // 2. Add guide.html if present
        if (row.guide_html) {
            zip.addFile('guide.html', Buffer.from(row.guide_html, 'utf8'));
        }

        // 3. Add acronyms.json if present
        if (scenarioData.acronyms && typeof scenarioData.acronyms === 'object') {
            zip.addFile('acronyms.json', Buffer.from(JSON.stringify(scenarioData.acronyms, null, 2), 'utf8'));
        }

        // 4. Bundle all associated images (both linked and recursively extracted)
        const associatedImages = this.imageService.getScenarioImages(id);
        const seenIds = new Set(associatedImages.map(img => img.id));
        const extraImageIds = this.imageService.extractScenarioImageIds(scenarioData);
        for (const extraId of extraImageIds) {
            const img = this.imageService.getImage(extraId);
            if (img && !seenIds.has(img.id)) {
                associatedImages.push(img);
                seenIds.add(img.id);
            }
        }

        const imageManifest = [];

        for (const img of associatedImages) {
            if (!img.file) continue;
            const relativePath = img.file.replace(/^\//, '');
            const diskPath = path.join(pubDir, relativePath);

            let buffer = null;
            if (fs.existsSync(diskPath)) {
                buffer = fs.readFileSync(diskPath);
            }

            if (buffer) {
                const baseName = path.basename(diskPath);
                zip.addFile(`images/${baseName}`, buffer);
                imageManifest.push({
                    id: img.id,
                    filename: `images/${baseName}`,
                    originalPath: img.file,
                    hash: img.hash,
                    title: img.title,
                    description: img.description,
                    tags: img.tags
                });
            }
        }

        // Add images.json manifest inside the zip
        if (imageManifest.length > 0) {
            zip.addFile('images.json', Buffer.from(JSON.stringify(imageManifest, null, 2), 'utf8'));
        }

        return zip.toBuffer();
    }

    _extractScenarioJsonFromZip(zipEntries) {
        let scenarioEntry = zipEntries.find(e => e.entryName.toLowerCase() === 'scenario.json');
        if (!scenarioEntry) {
            scenarioEntry = zipEntries.find(e =>
                !e.entryName.includes('/') &&
                e.entryName.endsWith('.json') &&
                e.entryName !== 'images.json' &&
                e.entryName !== 'acronyms.json'
            );
        }

        if (!scenarioEntry) {
            throw new Error("Invalid scenario ZIP: 'scenario.json' was not found in the archive root.");
        }

        let scenarioData = null;
        try {
            scenarioData = JSON.parse(scenarioEntry.getData().toString('utf8'));
        } catch (err) {
            throw new Error(`Failed to parse 'scenario.json': ${err.message}`);
        }

        if (!scenarioData || !scenarioData.id || !scenarioData.name) {
            throw new Error("Invalid scenario data: 'id' and 'name' are required.");
        }
        return scenarioData;
    }

    _importZipCustomImages(zipEntries, scenarioId, pubDir) {
        const imageManifestEntry = zipEntries.find(e => e.entryName.toLowerCase() === 'images.json');
        let imageManifest = [];
        if (imageManifestEntry) {
            try {
                imageManifest = JSON.parse(imageManifestEntry.getData().toString('utf8'));
            } catch {}
        }

        const customImagesDir = path.join(pubDir, 'images', 'custom');
        if (!fs.existsSync(customImagesDir)) {
            fs.mkdirSync(customImagesDir, { recursive: true });
        }

        for (const entry of zipEntries) {
            if (!entry.entryName.startsWith('images/') || entry.isDirectory) continue;
            const imgBuffer = entry.getData();
            if (!imgBuffer || imgBuffer.length === 0) continue;

            const hash = this.imageService.constructor.name
                ? require('crypto').createHash('sha256').update(imgBuffer).digest('hex')
                : '';

            if (this.imageService.findImageByHash(hash)) continue;

            const baseName = path.basename(entry.entryName);
            const safeFileName = `${scenarioId}_${baseName}`;
            const destPath = path.join(customImagesDir, safeFileName);
            fs.writeFileSync(destPath, imgBuffer);

            const manifestInfo = imageManifest.find(m => path.basename(m.filename || '') === baseName) || {};
            const imgId = manifestInfo.id || `${scenarioId}_${path.parse(baseName).name}`;

            this.imageService.registerImage({
                id: imgId,
                filename: `/images/custom/${safeFileName}`,
                hash,
                title: manifestInfo.title || baseName,
                description: manifestInfo.description || '',
                tags: manifestInfo.tags || ['custom', scenarioId],
                isBase: 0
            });
        }
    }

    importScenarioZip(zipBuffer, { overwrite = false, publicDir = null } = {}) {
        if (!zipBuffer || !Buffer.isBuffer(zipBuffer)) {
            throw new Error('Valid zip buffer is required');
        }

        const pubDir = publicDir || path.join(__dirname, '..', '..', 'public');
        const zip = new AdmZip(zipBuffer);
        const zipEntries = zip.getEntries();

        // 1. Locate and validate scenario.json
        const scenarioData = this._extractScenarioJsonFromZip(zipEntries);

        // 2. Check for conflict
        const db = this.getDb();
        const existing = db.prepare(`SELECT id, name FROM scenarios WHERE id = ?`).get(scenarioData.id);
        if (existing && !overwrite) {
            return {
                conflict: true,
                id: scenarioData.id,
                name: scenarioData.name,
                message: `Scenario '${scenarioData.name}' (${scenarioData.id}) already exists. Confirm to overwrite.`
            };
        }

        // 3. Extract optional guide.html
        const guideEntry = zipEntries.find(e => e.entryName.toLowerCase() === 'guide.html');
        let guideHtml = null;
        if (guideEntry) {
            guideHtml = guideEntry.getData().toString('utf8');
            scenarioData.guideUrl = `/scenarios/${scenarioData.id}/guide.html`;
        }

        // 4. Extract optional acronyms.json
        const acronymsEntry = zipEntries.find(e => e.entryName.toLowerCase() === 'acronyms.json');
        if (acronymsEntry) {
            try {
                scenarioData.acronyms = JSON.parse(acronymsEntry.getData().toString('utf8'));
            } catch (e) {
                console.warn('Failed to parse acronyms.json from zip:', e.message);
            }
        }

        // 5. Extract and process images in images/
        this._importZipCustomImages(zipEntries, scenarioData.id, pubDir);

        // 6. Save scenario
        const saved = this.saveScenario(scenarioData, {
            guideHtml,
            isBuiltin: 0,
            force: true // Allow saving valid custom scenarios
        });

        return {
            success: true,
            id: saved.id,
            name: saved.name,
            hasGuide: Boolean(guideHtml)
        };
    }
}

const defaultInstance = new ScenarioService();

module.exports = defaultInstance;
module.exports.ScenarioService = ScenarioService;
