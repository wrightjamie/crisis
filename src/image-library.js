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

    const normalizedTags = imageService && imageService.parseRequestedTags
        ? imageService.parseRequestedTags({ tag, tags })
        : [];

    if (normalizedTags.length > 0) {
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
    if (imageService && imageService.forEachScenarioImageItem) {
        return imageService.forEachScenarioImageItem(scenario, resolveImageOnItem);
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
