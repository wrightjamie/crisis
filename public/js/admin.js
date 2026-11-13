// Crisis Wargame - Admin Console Logic
(function() {
    let allScenarios = [];
    let allImages = [];
    let pendingZipFile = null;

    const { apiFetch, escapeHtml, showToast, logout, checkAuth } = window.common;

    // 1. Initial Authentication Check
    async function initAuth() {
        const user = await checkAuth('admin');
        if (user) {
            document.getElementById('username-display').textContent = user.username;
            return true;
        }
        return false;
    }

    // 2. Navigation Tabs
    function setupTabs() {
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetTab = tab.getAttribute('data-tab');
                document.getElementById('tab-scenarios').style.display = targetTab === 'scenarios' ? 'block' : 'none';
                document.getElementById('tab-images').style.display = targetTab === 'images' ? 'block' : 'none';

                if (targetTab === 'images' && allImages.length === 0) {
                    loadImages();
                }
            });
        });
    }

    // 3. Logout
    document.getElementById('btn-logout').addEventListener('click', () => logout());

    // 4. Load & Render Scenarios
    async function loadScenarios() {
        const tbody = document.getElementById('scenarios-table-body');
        try {
            const res = await apiFetch('/api/scenarios');
            allScenarios = await res.json();
            renderScenariosTable(allScenarios);
        } catch (err) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2rem; color: var(--accent-red);">Failed to load scenarios: ${err.message}</td></tr>`;
        }
    }

    function renderScenariosTable(scenarios) {
        const tbody = document.getElementById('scenarios-table-body');
        if (!scenarios || scenarios.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2rem;">No scenarios found matching your criteria.</td></tr>`;
            return;
        }

        tbody.innerHTML = scenarios.map(s => {
            const typeBadge = s.isBuiltin ?
                `<span class="badge badge-builtin">Built-in</span>` :
                `<span class="badge badge-custom">Custom</span>`;

            const guideBadge = s.hasGuide ?
                `<a href="/scenarios/${encodeURIComponent(s.id)}/guide.html" target="_blank" rel="noopener" class="badge badge-guide text-decoration-none" title="Open Guide">📄 Guide</a>` :
                `<span class="text-xs text-muted">-</span>`;

            const updatedDate = s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : '-';

            return `
                <tr data-id="${s.id}">
                    <td><code>${escapeHtml(s.id)}</code></td>
                    <td style="font-weight: 500;">${escapeHtml(s.name)}</td>
                    <td>${typeBadge}</td>
                    <td><span class="text-xs text-muted">${s.minPlayers || 1}–${s.maxPlayers || 10} roles (${s.eventCount || 0} events)</span></td>
                    <td>${guideBadge}</td>
                    <td class="text-xs text-muted">${updatedDate}</td>
                    <td style="text-align: right; white-space: nowrap;">
                        <button type="button" class="btn-icon btn-export" data-id="${s.id}" title="Export .zip package">📥 Export</button>
                        <button type="button" class="btn-icon btn-view-json" data-id="${s.id}" title="View JSON">👁️ JSON</button>
                        <button type="button" class="btn-icon btn-danger btn-delete" data-id="${s.id}" data-name="${escapeHtml(s.name)}" data-builtin="${s.isBuiltin ? 'true' : 'false'}" title="Delete scenario">🗑️</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach action handlers
        tbody.querySelectorAll('.btn-export').forEach(btn => {
            btn.addEventListener('click', () => exportScenario(btn.getAttribute('data-id')));
        });
        tbody.querySelectorAll('.btn-view-json').forEach(btn => {
            btn.addEventListener('click', () => viewScenarioJson(btn.getAttribute('data-id')));
        });
        tbody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteScenario(
                btn.getAttribute('data-id'),
                btn.getAttribute('data-name'),
                btn.getAttribute('data-builtin') === 'true'
            ));
        });
    }

    // Filter scenarios
    document.getElementById('scenario-search').addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            renderScenariosTable(allScenarios);
            return;
        }
        const filtered = allScenarios.filter(s =>
            (s.name && s.name.toLowerCase().includes(query)) ||
            (s.id && s.id.toLowerCase().includes(query)) ||
            (s.description && s.description.toLowerCase().includes(query))
        );
        renderScenariosTable(filtered);
    });

    // 5. Scenario Actions
    async function exportScenario(id) {
        try {
            const res = await apiFetch(`/api/scenarios/${encodeURIComponent(id)}/export`);
            if (!res.ok) throw new Error('Failed to download scenario zip');

            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${id}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            showBanner(`Export failed: ${err.message}`, 'error');
        }
    }

    async function viewScenarioJson(id) {
        try {
            const res = await apiFetch(`/api/scenarios/${encodeURIComponent(id)}`);
            const data = await res.json();
            document.getElementById('json-modal-title').textContent = `${data.name} (${data.id})`;
            document.getElementById('json-modal-content').textContent = JSON.stringify(data, null, 2);
            document.getElementById('json-modal').style.display = 'flex';
        } catch (err) {
            showBanner(`Failed to load scenario details: ${err.message}`, 'error');
        }
    }

    async function deleteScenario(id, name, isBuiltin) {
        let msg = `Are you sure you want to delete scenario '${name}' (${id})?`;
        if (isBuiltin) {
            msg = `⚠️ Warning: '${name}' is a built-in system scenario. Are you sure you want to force delete it?`;
        }
        if (!confirm(msg)) return;

        try {
            const res = await apiFetch(`/api/scenarios/${encodeURIComponent(id)}${isBuiltin ? '?force=true' : ''}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (res.ok) {
                showBanner(`Scenario '${name}' was deleted successfully.`, 'success');
                loadScenarios();
            } else {
                showBanner(`Delete failed: ${data.error || 'Unknown error'}`, 'error');
            }
        } catch (err) {
            showBanner(`Delete failed: ${err.message}`, 'error');
        }
    }

    // 6. ZIP Import Handling
    const fileInput = document.getElementById('scenario-file-input');
    const chooseBtn = document.getElementById('btn-choose-file');
    const importBtn = document.getElementById('btn-import-scenario');
    const fileLabel = document.getElementById('selected-file-label');
    const overwriteCheck = document.getElementById('overwrite-checkbox');

    chooseBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            pendingZipFile = fileInput.files[0];
            fileLabel.textContent = pendingZipFile.name;
            importBtn.disabled = false;
        } else {
            pendingZipFile = null;
            fileLabel.textContent = 'No file chosen';
            importBtn.disabled = true;
        }
    });

    importBtn.addEventListener('click', () => {
        if (!pendingZipFile) return;
        executeImport(pendingZipFile, overwriteCheck.checked);
    });

    async function executeImport(file, overwrite = false) {
        importBtn.disabled = true;
        importBtn.textContent = 'Importing...';
        showBanner('Uploading and processing scenario package...', 'info');

        try {
            const url = `/api/scenarios/import${overwrite ? '?overwrite=true' : ''}`;
            const res = await apiFetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/zip'
                },
                body: file
            });

            if (res.status === 409) {
                // Conflict
                const conflictData = await res.json();
                document.getElementById('conflict-modal-message').textContent =
                    conflictData.message || `Scenario '${conflictData.name || conflictData.id}' already exists.`;
                document.getElementById('conflict-modal').style.display = 'flex';
                importBtn.disabled = false;
                importBtn.textContent = 'Import';
                return;
            }

            const data = await res.json();
            if (res.ok) {
                showBanner(`✅ Scenario '${data.name}' (${data.id}) imported successfully!`, 'success');
                fileInput.value = '';
                pendingZipFile = null;
                fileLabel.textContent = 'No file chosen';
                importBtn.textContent = 'Import';
                loadScenarios();
            } else {
                showBanner(`❌ Import failed: ${data.error || 'Unknown error'}`, 'error');
                importBtn.disabled = false;
                importBtn.textContent = 'Import';
            }
        } catch (err) {
            showBanner(`❌ Import error: ${err.message}`, 'error');
            importBtn.disabled = false;
            importBtn.textContent = 'Import';
        }
    }

    // Conflict Modal Handlers
    document.getElementById('btn-close-conflict').addEventListener('click', () => {
        document.getElementById('conflict-modal').style.display = 'none';
    });
    document.getElementById('btn-cancel-conflict').addEventListener('click', () => {
        document.getElementById('conflict-modal').style.display = 'none';
    });
    document.getElementById('btn-confirm-overwrite').addEventListener('click', () => {
        document.getElementById('conflict-modal').style.display = 'none';
        if (pendingZipFile) {
            executeImport(pendingZipFile, true);
        }
    });

    // Close JSON modal
    document.getElementById('btn-close-json').addEventListener('click', () => {
        document.getElementById('json-modal').style.display = 'none';
    });

    // 7. Image Library
    async function loadImages() {
        try {
            const [imagesRes, tagsRes] = await Promise.all([
                apiFetch('/api/images'),
                apiFetch('/api/images/tags')
            ]);
            allImages = await imagesRes.json();
            const tags = await tagsRes.json();

            // Populate tags select
            const tagSelect = document.getElementById('image-tag-filter');
            tagSelect.innerHTML = '<option value="">All Tags</option>' +
                tags.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');

            renderImagesGrid(allImages);
        } catch (err) {
            document.getElementById('images-grid').innerHTML = `
                <div class="text-center text-muted" style="grid-column: 1 / -1; padding: 2rem; color: var(--accent-red);">
                    Failed to load image library: ${err.message}
                </div>
            `;
        }
    }

    function renderImagesGrid(images) {
        const grid = document.getElementById('images-grid');
        document.getElementById('image-count-label').textContent = `${images.length} images`;

        if (!images || images.length === 0) {
            grid.innerHTML = `<div class="text-center text-muted" style="grid-column: 1 / -1; padding: 3rem;">No images found.</div>`;
            return;
        }

        grid.innerHTML = images.map(img => {
            const tagsHtml = (img.tags || []).map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('');
            const baseBadge = img.is_base ?
                `<span class="badge badge-builtin" style="position: absolute; top: 8px; right: 8px;">Base</span>` :
                `<span class="badge badge-custom" style="position: absolute; top: 8px; right: 8px;">Custom</span>`;

            return `
                <div class="image-card" style="position: relative;">
                    ${baseBadge}
                    <img src="${escapeHtml(img.file)}" alt="${escapeHtml(img.title || img.id)}" class="image-thumb" loading="lazy" onerror="this.src='/images/favicon.png'">
                    <div class="image-info">
                        <div class="image-title" title="${escapeHtml(img.title || img.id)}">${escapeHtml(img.title || img.id)}</div>
                        <div class="image-meta"><code>${escapeHtml(img.id)}</code></div>
                        <div class="image-tags">${tagsHtml}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Filter Images
    function filterImages() {
        const query = document.getElementById('image-search').value.trim().toLowerCase();
        const tag = document.getElementById('image-tag-filter').value.toLowerCase();

        let filtered = allImages;
        if (tag) {
            filtered = filtered.filter(img => (img.tags || []).some(t => t.toLowerCase() === tag));
        }
        if (query) {
            filtered = filtered.filter(img =>
                (img.id && img.id.toLowerCase().includes(query)) ||
                (img.title && img.title.toLowerCase().includes(query)) ||
                (img.description && img.description.toLowerCase().includes(query))
            );
        }
        renderImagesGrid(filtered);
    }

    document.getElementById('image-search').addEventListener('input', filterImages);
    document.getElementById('image-tag-filter').addEventListener('change', filterImages);

    // Helpers
    function showBanner(message, type = 'info') {
        const banner = document.getElementById('import-status-banner');
        banner.style.display = 'block';
        banner.textContent = message;
        if (type === 'error') {
            banner.style.background = 'rgba(239, 68, 68, 0.15)';
            banner.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            banner.style.color = 'var(--accent-red)';
        } else if (type === 'success') {
            banner.style.background = 'rgba(16, 185, 129, 0.15)';
            banner.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            banner.style.color = '#10b981';
        } else {
            banner.style.background = 'rgba(59, 130, 246, 0.15)';
            banner.style.border = '1px solid rgba(59, 130, 246, 0.3)';
            banner.style.color = 'var(--accent-blue)';
        }
    }

    // Initialization
    async function init() {
        const authenticated = await initAuth();
        if (authenticated) {
            setupTabs();
            loadScenarios();
        }
    }

    init();
})();
