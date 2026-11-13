const fs = require('fs');
const path = require('path');
let imageService = null;
try {
    imageService = require('./db/image-service');
} catch {}

const IMAGE_LIBRARY_PATH = path.join(__dirname, '..', 'data', 'image-library.json');

let cachedLibrary = null;

function getImageLibrary(forceReload = false) {
    if (!cachedLibrary || forceReload) {
        const raw = fs.readFileSync(IMAGE_LIBRARY_PATH, 'utf8');
        cachedLibrary = JSON.parse(raw);
    }
    return cachedLibrary;
}

function getImage(id) {
    if (!id || typeof id !== 'string') return null;
    if (imageService) {
        try {
            const dbImg = imageService.getImage(id);
            if (dbImg) {
                return {
                    id: dbImg.id,
                    file: dbImg.filename,
                    title: dbImg.title,
                    description: dbImg.description,
                    tags: dbImg.tags
                };
            }
        } catch {}
    }
    const lib = getImageLibrary();
    return lib[id] || null;
}

function getAllTags() {
    if (imageService) {
        try {
            const tags = imageService.getAllTags();
            if (tags && tags.length > 0) return tags;
        } catch {}
    }
    const lib = getImageLibrary();
    const tagSet = new Set();
    for (const entry of Object.values(lib)) {
        if (Array.isArray(entry.tags)) {
            entry.tags.forEach(t => tagSet.add(t));
        }
    }
    return Array.from(tagSet).sort();
}

function getAllImages({ tag, tags, query, q } = {}) {
    if (imageService) {
        try {
            const dbImages = imageService.getAllImages({ tag, tags, query, q });
            if (dbImages && dbImages.length > 0) return dbImages;
        } catch {}
    }
    const lib = getImageLibrary();
    let results = Object.values(lib);

    const requestedTags = [];
    if (Array.isArray(tags)) {
        requestedTags.push(...tags);
    } else if (typeof tags === 'string' && tags.trim()) {
        requestedTags.push(...tags.split(',').map(t => t.trim()).filter(Boolean));
    }
    if (typeof tag === 'string' && tag.trim()) {
        requestedTags.push(...tag.split(',').map(t => t.trim()).filter(Boolean));
    }

    if (requestedTags.length > 0) {
        const normalizedTags = requestedTags.map(t => t.toLowerCase());
        results = results.filter(entry => {
            const entryTags = (entry.tags || []).map(t => t.toLowerCase());
            return normalizedTags.every(reqTag => entryTags.includes(reqTag));
        });
    }

    const search = (query || q || '').trim().toLowerCase();
    if (search) {
        results = results.filter(entry => {
            const haystack = [
                entry.id || '',
                entry.title || '',
                entry.description || '',
                ...(entry.tags || [])
            ].join(' ').toLowerCase();
            return haystack.includes(search);
        });
    }

    return results;
}

function resolveImageOnItem(item) {
    if (!item || !item.image) return;
    const lookupId = item.imageId || item.image;
    const entry = getImage(lookupId);
    if (entry) {
        item.imageId = entry.id;
        item.image = entry.file;
        item.imageMeta = {
            id: entry.id,
            title: entry.title,
            description: entry.description,
            tags: entry.tags
        };
    }
}

function resolveScenarioImages(scenario) {
    if (!scenario || typeof scenario !== 'object') return scenario;

    if (Array.isArray(scenario.assets)) {
        scenario.assets.forEach(resolveImageOnItem);
    }

    if (Array.isArray(scenario.variantAxes)) {
        scenario.variantAxes.forEach(axis => {
            if (Array.isArray(axis.options)) {
                axis.options.forEach(opt => {
                    if (Array.isArray(opt.assetModifiers)) {
                        opt.assetModifiers.forEach(resolveImageOnItem);
                    }
                });
            }
        });
    }

    if (Array.isArray(scenario.eventTemplates)) {
        scenario.eventTemplates.forEach(resolveImageOnItem);
    }

    if (Array.isArray(scenario.manualActions)) {
        scenario.manualActions.forEach(resolveImageOnItem);
    }

    return scenario;
}

module.exports = {
    IMAGE_LIBRARY_PATH,
    getImageLibrary,
    getImage,
    getAllImages,
    getAllTags,
    resolveImageOnItem,
    resolveScenarioImages
};
