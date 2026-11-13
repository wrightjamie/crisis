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

    listScenarios() {
        const db = this.getDb();
        const rows = db.prepare(`
            SELECT id, name, is_builtin, guide_html, data, updated_at
            FROM scenarios
            ORDER BY name ASC
        `).all();

        return rows.map(r => {
            let parsed = {};
            try {
                parsed = JSON.parse(r.data);
            } catch {}

            const roles = Array.isArray(parsed.roles) ? parsed.roles : [];
            const events = Array.isArray(parsed.eventTemplates) ? parsed.eventTemplates : [];
            const assets = Array.isArray(parsed.assets) ? parsed.assets : [];

            return {
                id: r.id,
                name: r.name || parsed.name || r.id,
                description: parsed.description || '',
                isBuiltin: Boolean(r.is_builtin),
                hasGuide: Boolean(r.guide_html || parsed.guideUrl),
                guideUrl: (r.guide_html || parsed.guideUrl) ? `/scenarios/${r.id}/guide.html` : null,
                rolesCount: roles.length,
                minPlayers: roles.length > 0 ? 1 : 1,
                maxPlayers: roles.length > 0 ? roles.length : 10,
                eventCount: events.length,
                assetCount: assets.length,
                version: parsed.version || '1.0.0',
                updatedAt: r.updated_at
            };
        });
    }

    getScenario(id) {
        if (!id || typeof id !== 'string') return null;
        const db = this.getDb();
        const row = db.prepare(`SELECT * FROM scenarios WHERE id = ?`).get(id);
        if (!row) return null;

        let scenario = {};
        try {
            scenario = JSON.parse(row.data);
        } catch (err) {
            console.error(`Failed to parse scenario data for '${id}':`, err.message);
            return null;
        }

        // Attach guideUrl if guide_html exists
        if (row.guide_html) {
            scenario.guideUrl = `/scenarios/${id}/guide.html`;
        }

        // Attach built-in flag
        scenario.isBuiltin = Boolean(row.is_builtin);

        // Resolve images through image service
        this.imageService.resolveScenarioImages(scenario);

        return scenario;
    }

    getScenarioGuide(id) {
        if (!id) return null;
        const db = this.getDb();
        const row = db.prepare(`SELECT guide_html FROM scenarios WHERE id = ?`).get(id);
        return row ? row.guide_html : null;
    }

    saveScenario(scenarioData, { guideHtml = null, isBuiltin = 0, force = false } = {}) {
        if (!scenarioData || typeof scenarioData !== 'object') {
            throw new Error('Scenario data must be a valid object');
        }

        const validation = validateScenario(scenarioData);
        if (!validation.isValid && !force) {
            throw new Error(`Scenario validation failed: ${validation.errors.join('; ')}`);
        }

        const id = scenarioData.id;
        const name = scenarioData.name;
        const dataJson = JSON.stringify(scenarioData);
        const db = this.getDb();

        const imageIdentifiers = this.imageService.extractScenarioImageIds(scenarioData);

        const stmt = db.prepare(`
            INSERT INTO scenarios (id, name, is_builtin, guide_html, data, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                is_builtin = excluded.is_builtin,
                guide_html = COALESCE(excluded.guide_html, scenarios.guide_html),
                data = excluded.data,
                updated_at = CURRENT_TIMESTAMP
        `);

        db.transaction(() => {
            stmt.run(id, name, isBuiltin ? 1 : 0, guideHtml, dataJson);
            this.imageService.linkScenarioImages(id, imageIdentifiers);
        })();

        return this.getScenario(id);
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
        if (!id) throw new Error('Scenario ID is required');
        const db = this.getDb();
        const row = db.prepare(`SELECT * FROM scenarios WHERE id = ?`).get(id);
        if (!row) throw new Error(`Scenario '${id}' not found`);

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

    importScenarioZip(zipBuffer, { overwrite = false, publicDir = null } = {}) {
        if (!zipBuffer || !Buffer.isBuffer(zipBuffer)) {
            throw new Error('Valid zip buffer is required');
        }

        const pubDir = publicDir || path.join(__dirname, '..', '..', 'public');
        const zip = new AdmZip(zipBuffer);
        const zipEntries = zip.getEntries();

        // 1. Locate scenario.json
        let scenarioEntry = zipEntries.find(e => e.entryName.toLowerCase() === 'scenario.json');
        if (!scenarioEntry) {
            // Check for any root .json file with id & name
            scenarioEntry = zipEntries.find(e => {
                if (!e.entryName.includes('/') && e.entryName.endsWith('.json') && e.entryName !== 'images.json' && e.entryName !== 'acronyms.json') {
                    return true;
                }
                return false;
            });
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

        // Validate basic structure
        if (!scenarioData || !scenarioData.id || !scenarioData.name) {
            throw new Error("Invalid scenario data: 'id' and 'name' are required.");
        }

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
            if (entry.entryName.startsWith('images/') && !entry.isDirectory) {
                const imgBuffer = entry.getData();
                if (!imgBuffer || imgBuffer.length === 0) continue;

                const hash = this.imageService.constructor.name ?
                    require('crypto').createHash('sha256').update(imgBuffer).digest('hex') : '';

                // Check if existing image with same hash exists in DB
                const existingImg = this.imageService.findImageByHash(hash);
                if (existingImg) {
                    // Reuse existing image record
                    continue;
                }

                // New image: save to disk and register in DB
                const baseName = path.basename(entry.entryName);
                const safeFileName = `${scenarioData.id}_${baseName}`;
                const destPath = path.join(customImagesDir, safeFileName);
                fs.writeFileSync(destPath, imgBuffer);

                const manifestInfo = imageManifest.find(m => path.basename(m.filename || '') === baseName) || {};
                const imgId = manifestInfo.id || `${scenarioData.id}_${path.parse(baseName).name}`;

                this.imageService.registerImage({
                    id: imgId,
                    filename: `/images/custom/${safeFileName}`,
                    hash,
                    title: manifestInfo.title || baseName,
                    description: manifestInfo.description || '',
                    tags: manifestInfo.tags || ['custom', scenarioData.id],
                    isBase: 0
                });
            }
        }

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
