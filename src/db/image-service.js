const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getDb } = require('./database');

function computeFileHash(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

function computeBufferHash(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

class ImageService {
    constructor(dbProvider = getDb) {
        this.getDb = dbProvider;
    }

    seedBaseImages(libraryPath = null, publicDir = null) {
        const libPath = libraryPath || path.join(__dirname, '..', '..', 'data', 'image-library.json');
        const pubDir = publicDir || path.join(__dirname, '..', '..', 'public');

        if (!fs.existsSync(libPath)) {
            console.warn(`Base image library file not found at ${libPath}`);
            return 0;
        }

        const raw = fs.readFileSync(libPath, 'utf8');
        const library = JSON.parse(raw);
        const db = this.getDb();

        const insertStmt = db.prepare(`
            INSERT INTO images (id, filename, hash, title, description, tags, is_base)
            VALUES (?, ?, ?, ?, ?, ?, 1)
            ON CONFLICT(id) DO UPDATE SET
                filename = excluded.filename,
                hash = excluded.hash,
                title = excluded.title,
                description = excluded.description,
                tags = excluded.tags,
                is_base = 1
        `);

        const transaction = db.transaction((entries) => {
            let count = 0;
            for (const [id, entry] of Object.entries(entries)) {
                const relativeFile = entry.file ? entry.file.replace(/^\//, '') : '';
                const absoluteFilePath = path.join(pubDir, relativeFile);
                let hash = computeFileHash(absoluteFilePath);
                if (!hash) {
                    hash = crypto.createHash('sha256').update(id + entry.title).digest('hex');
                }

                insertStmt.run(
                    id,
                    entry.file || `/images/library/${id}.png`,
                    hash,
                    entry.title || '',
                    entry.description || '',
                    JSON.stringify(entry.tags || [])
                );
                count++;
            }
            return count;
        });

        return transaction(library);
    }

    findImageByHash(hash) {
        if (!hash) return null;
        const db = this.getDb();
        const row = db.prepare(`SELECT * FROM images WHERE hash = ?`).get(hash);
        if (row && row.tags) {
            try { row.tags = JSON.parse(row.tags); } catch { row.tags = []; }
        }
        return row || null;
    }

    getImage(idOrFile) {
        if (!idOrFile || typeof idOrFile !== 'string') return null;
        const db = this.getDb();

        // Try lookup by ID first, then by filename
        let row = db.prepare(`SELECT * FROM images WHERE id = ?`).get(idOrFile);
        if (!row) {
            row = db.prepare(`SELECT * FROM images WHERE filename = ?`).get(idOrFile);
        }
        if (!row && !idOrFile.startsWith('/')) {
            row = db.prepare(`SELECT * FROM images WHERE filename = ?`).get('/' + idOrFile);
        }

        if (row && row.tags) {
            try { row.tags = JSON.parse(row.tags); } catch { row.tags = []; }
        }
        return row || null;
    }

    getAllImages({ tag, tags, query, q } = {}) {
        const db = this.getDb();
        const rows = db.prepare(`SELECT * FROM images ORDER BY title ASC`).all();

        const requestedTags = [];
        if (Array.isArray(tags)) {
            requestedTags.push(...tags);
        } else if (typeof tags === 'string' && tags.trim()) {
            requestedTags.push(...tags.split(',').map(t => t.trim()).filter(Boolean));
        }
        if (typeof tag === 'string' && tag.trim()) {
            requestedTags.push(...tag.split(',').map(t => t.trim()).filter(Boolean));
        }

        const normalizedTags = requestedTags.map(t => t.toLowerCase());
        const search = (query || q || '').trim().toLowerCase();

        return rows.map(r => {
            let parsedTags = [];
            try { parsedTags = JSON.parse(r.tags); } catch {}
            return {
                id: r.id,
                file: r.filename,
                title: r.title,
                description: r.description,
                tags: parsedTags,
                is_base: Boolean(r.is_base),
                hash: r.hash,
                createdAt: r.created_at
            };
        }).filter(entry => {
            if (normalizedTags.length > 0) {
                const entryTags = (entry.tags || []).map(t => t.toLowerCase());
                const hasAllTags = normalizedTags.every(reqTag => entryTags.includes(reqTag));
                if (!hasAllTags) return false;
            }
            if (search) {
                const haystack = [
                    entry.id || '',
                    entry.title || '',
                    entry.description || '',
                    ...(entry.tags || [])
                ].join(' ').toLowerCase();
                if (!haystack.includes(search)) return false;
            }
            return true;
        });
    }

    getAllTags() {
        const db = this.getDb();
        const rows = db.prepare(`SELECT tags FROM images`).all();
        const tagSet = new Set();
        for (const row of rows) {
            try {
                const parsed = JSON.parse(row.tags);
                if (Array.isArray(parsed)) {
                    parsed.forEach(t => tagSet.add(t));
                }
            } catch {}
        }
        return Array.from(tagSet).sort();
    }

    registerImage({ id, filename, hash, title = '', description = '', tags = [], isBase = 0 }) {
        const db = this.getDb();
        const stmt = db.prepare(`
            INSERT INTO images (id, filename, hash, title, description, tags, is_base, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                filename = excluded.filename,
                hash = excluded.hash,
                title = excluded.title,
                description = excluded.description,
                tags = excluded.tags,
                is_base = excluded.is_base
        `);
        stmt.run(
            id,
            filename,
            hash,
            title,
            description,
            JSON.stringify(tags),
            isBase ? 1 : 0
        );
        return this.getImage(id);
    }

    extractScenarioImageIds(scenarioData) {
        if (!scenarioData || typeof scenarioData !== 'object') return [];
        const imageIds = new Set();

        const collectFromItem = (item) => {
            if (!item) return;
            if (item.imageId) imageIds.add(item.imageId);
            if (item.image && typeof item.image === 'string') imageIds.add(item.image);
        };

        if (Array.isArray(scenarioData.assets)) {
            scenarioData.assets.forEach(collectFromItem);
        }
        if (Array.isArray(scenarioData.eventTemplates)) {
            scenarioData.eventTemplates.forEach(collectFromItem);
        }
        if (Array.isArray(scenarioData.manualActions)) {
            scenarioData.manualActions.forEach(collectFromItem);
        }
        if (Array.isArray(scenarioData.variantAxes)) {
            scenarioData.variantAxes.forEach(axis => {
                if (Array.isArray(axis.options)) {
                    axis.options.forEach(opt => {
                        if (Array.isArray(opt.assetModifiers)) {
                            opt.assetModifiers.forEach(collectFromItem);
                        }
                    });
                }
            });
        }

        return Array.from(imageIds);
    }

    linkScenarioImages(scenarioId, imageIdentifiers) {
        if (!scenarioId || !Array.isArray(imageIdentifiers)) return;
        const db = this.getDb();

        const insertLinkStmt = db.prepare(`
            INSERT OR IGNORE INTO scenario_images (scenario_id, image_id)
            VALUES (?, ?)
        `);

        db.transaction(() => {
            db.prepare(`DELETE FROM scenario_images WHERE scenario_id = ?`).run(scenarioId);

            for (const identifier of imageIdentifiers) {
                const img = this.getImage(identifier);
                if (img) {
                    insertLinkStmt.run(scenarioId, img.id);
                }
            }
        })();
    }

    getScenarioImages(scenarioId) {
        if (!scenarioId) return [];
        const db = this.getDb();
        const rows = db.prepare(`
            SELECT i.* FROM images i
            JOIN scenario_images si ON i.id = si.image_id
            WHERE si.scenario_id = ?
        `).all(scenarioId);

        return rows.map(r => {
            let parsedTags = [];
            try { parsedTags = JSON.parse(r.tags); } catch {}
            return {
                id: r.id,
                file: r.filename,
                hash: r.hash,
                title: r.title,
                description: r.description,
                tags: parsedTags,
                is_base: Boolean(r.is_base)
            };
        });
    }

    cleanupUnusedImages(scenarioId, publicDir = null) {
        if (!scenarioId) return [];
        const pubDir = publicDir || path.join(__dirname, '..', '..', 'public');
        const db = this.getDb();

        const linkedImages = db.prepare(`
            SELECT i.id, i.filename, i.is_base FROM images i
            JOIN scenario_images si ON i.id = si.image_id
            WHERE si.scenario_id = ?
        `).all(scenarioId);

        const deletedImageIds = [];

        db.transaction(() => {
            for (const img of linkedImages) {
                // Base images are never deleted
                if (img.is_base) continue;

                // Check if used in other scenarios
                const usage = db.prepare(`
                    SELECT COUNT(*) as count FROM scenario_images
                    WHERE image_id = ? AND scenario_id != ?
                `).get(img.id, scenarioId);

                if (usage && usage.count === 0) {
                    // Safe to delete!
                    db.prepare(`DELETE FROM images WHERE id = ?`).run(img.id);
                    deletedImageIds.push(img.id);

                    // Delete file from disk if it was a custom upload
                    if (img.filename) {
                        const relativeFile = img.filename.replace(/^\//, '');
                        const fullPath = path.join(pubDir, relativeFile);
                        if (fs.existsSync(fullPath)) {
                            try {
                                fs.unlinkSync(fullPath);
                            } catch (e) {
                                console.warn(`Failed to unlink image file ${fullPath}:`, e.message);
                            }
                        }
                    }
                }
            }
        })();

        return deletedImageIds;
    }

    resolveImageOnItem(item) {
        if (!item || !item.image) return;
        const lookupId = item.imageId || item.image;
        const entry = this.getImage(lookupId);
        if (entry) {
            item.imageId = entry.id;
            item.image = entry.filename;
            item.imageMeta = {
                id: entry.id,
                title: entry.title,
                description: entry.description,
                tags: entry.tags
            };
        }
    }

    resolveScenarioImages(scenario) {
        if (!scenario || typeof scenario !== 'object') return scenario;

        const resolve = (item) => this.resolveImageOnItem(item);

        if (Array.isArray(scenario.assets)) {
            scenario.assets.forEach(resolve);
        }
        if (Array.isArray(scenario.variantAxes)) {
            scenario.variantAxes.forEach(axis => {
                if (Array.isArray(axis.options)) {
                    axis.options.forEach(opt => {
                        if (Array.isArray(opt.assetModifiers)) {
                            opt.assetModifiers.forEach(resolve);
                        }
                    });
                }
            });
        }
        if (Array.isArray(scenario.eventTemplates)) {
            scenario.eventTemplates.forEach(resolve);
        }
        if (Array.isArray(scenario.manualActions)) {
            scenario.manualActions.forEach(resolve);
        }

        return scenario;
    }
}

const defaultInstance = new ImageService();

module.exports = defaultInstance;
module.exports.ImageService = ImageService;
module.exports.computeFileHash = computeFileHash;
module.exports.computeBufferHash = computeBufferHash;
