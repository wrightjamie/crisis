// Crisis Scenario Editor - Shared Image Library Picker Modal
(function() {
    'use strict';

    const { apiFetch, escapeHtml } = window.common;

    let cachedImages = [];
    let cachedTags = [];
    let activeCallback = null;
    let selectedId = null;

    async function ensureLoaded() {
        if (cachedImages.length > 0) return;
        try {
            const [imgRes, tagRes] = await Promise.all([
                apiFetch('/api/images'),
                apiFetch('/api/images/tags')
            ]);
            cachedImages = await imgRes.json();
            cachedTags = await tagRes.json();
            populateTagFilter();
        } catch (err) {
            console.error('Failed to load shared image library:', err);
        }
    }

    function populateTagFilter() {
        const sel = document.getElementById('picker-tag-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">All Tags</option>' +
            cachedTags.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
    }

    function resolveImageUrl(imageIdOrUrl) {
        if (!imageIdOrUrl) return '/images/favicon.png';
        if (imageIdOrUrl.startsWith('/') || imageIdOrUrl.startsWith('http')) return imageIdOrUrl;
        const found = cachedImages.find(img => img.id === imageIdOrUrl);
        return found ? found.file : '/images/favicon.png';
    }

    function renderGrid() {
        const grid = document.getElementById('picker-image-grid');
        if (!grid) return;

        const q = (document.getElementById('picker-search-input')?.value || '').trim().toLowerCase();
        const tag = (document.getElementById('picker-tag-select')?.value || '').trim().toLowerCase();

        const filtered = cachedImages.filter(img => {
            if (tag && !(img.tags || []).some(t => t.toLowerCase() === tag)) return false;
            if (q) {
                const hay = `${img.id} ${img.title} ${img.description || ''} ${(img.tags || []).join(' ')}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="text-muted text-sm" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No matching images found.</div>`;
            return;
        }

        grid.innerHTML = filtered.map(img => `
            <button type="button" class="picker-image-card ${img.id === selectedId ? 'selected' : ''}" data-id="${escapeHtml(img.id)}" data-file="${escapeHtml(img.file)}">
                <img src="${escapeHtml(img.file)}" alt="${escapeHtml(img.title || img.id)}" loading="lazy" width="150" height="96">
                <div class="picker-image-card-info">
                    <div class="picker-image-card-title" title="${escapeHtml(img.title || img.id)}">${escapeHtml(img.title || img.id)}</div>
                    <div class="text-xs text-muted" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(img.id)}</div>
                </div>
            </button>
        `).join('');

        grid.querySelectorAll('.picker-image-card').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosenId = btn.getAttribute('data-id');
                const chosenFile = btn.getAttribute('data-file');
                const dialog = document.getElementById('image-picker-dialog');
                if (dialog && dialog.open) dialog.close();
                if (typeof activeCallback === 'function') {
                    activeCallback(chosenId, chosenFile);
                }
            });
        });
    }

    async function open(currentId, onSelect) {
        await ensureLoaded();
        selectedId = currentId || null;
        activeCallback = onSelect;
        renderGrid();
        const dialog = document.getElementById('image-picker-dialog');
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        ensureLoaded();

        const searchInp = document.getElementById('picker-search-input');
        const tagSel = document.getElementById('picker-tag-select');
        const closeBtn = document.getElementById('btn-close-image-picker');
        const dialog = document.getElementById('image-picker-dialog');

        if (searchInp) searchInp.addEventListener('input', renderGrid);
        if (tagSel) tagSel.addEventListener('change', renderGrid);
        if (closeBtn && dialog) {
            closeBtn.addEventListener('click', () => {
                if (dialog.open) dialog.close();
            });
        }
    });

    window.EditorImagePicker = {
        ensureLoaded,
        open,
        resolveImageUrl,
        getCachedImages: () => cachedImages
    };
})();
