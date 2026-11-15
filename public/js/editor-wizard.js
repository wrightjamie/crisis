// Crisis Scenario Editor - 4-Step Quick-Setup Wizard
(function() {
    'use strict';

    const { apiFetch, escapeHtml, showToast } = window.common;

    let currentStep = 1;
    let scenarioRef = null;
    let presetsRef = null;
    let onSyncCallback = null;

    function init(scenario, presets, onSync) {
        scenarioRef = scenario;
        presetsRef = presets;
        onSyncCallback = onSync;
        populateWizardPresets();
        syncWizardFieldsFromScenario();
    }

    function populateWizardPresets() {
        if (!presetsRef) return;

        // Role bundles
        const roleBundleSel = document.getElementById('wiz-role-bundle');
        if (roleBundleSel && presetsRef.roles && Array.isArray(presetsRef.roles.bundles)) {
            roleBundleSel.innerHTML = '<option value="">-- Select a Role Preset Bundle --</option>' +
                presetsRef.roles.bundles.map(b => `<option value="${escapeHtml(b.id)}">${escapeHtml(b.name)} (${b.roles.length} roles)</option>`).join('');
        }

        // Score presets
        const scoreSel = document.getElementById('wiz-score-preset');
        if (scoreSel && Array.isArray(presetsRef.scores)) {
            scoreSel.innerHTML = '<option value="">-- Select Scoring Preset --</option>' +
                presetsRef.scores.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.name)}</option>`).join('');
        }

        // Map presets
        const mapSel = document.getElementById('wiz-map-preset');
        if (mapSel && Array.isArray(presetsRef.maps)) {
            mapSel.innerHTML = '<option value="">-- Choose Geographic Region --</option>' +
                presetsRef.maps.map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.name)}</option>`).join('');
        }

        // Quick-add assets
        renderWizardQuickAssets();
    }

    function renderWizardQuickAssets() {
        const container = document.getElementById('wiz-quick-assets');
        if (!container || !presetsRef || !Array.isArray(presetsRef.assets)) return;

        container.innerHTML = presetsRef.assets.map(p => {
            const alreadyAdded = (scenarioRef?.assets || []).some(a => a.name === p.name);
            return `
                <button type="button" class="quick-asset-card" data-preset-id="${escapeHtml(p.presetId)}" style="${alreadyAdded ? 'border-color: #10b981; background: rgba(16, 185, 129, 0.1);' : ''}">
                    <img src="${escapeHtml(p.imageUrl)}" alt="" class="quick-asset-thumb" width="36" height="36" loading="lazy">
                    <div class="quick-asset-meta">
                        <div class="quick-asset-name">${escapeHtml(p.name)}</div>
                        <div class="quick-asset-cat">${alreadyAdded ? 'Added ✓' : escapeHtml(p.category)}</div>
                    </div>
                </button>
            `;
        }).join('');

        container.querySelectorAll('.quick-asset-card').forEach(btn => {
            btn.addEventListener('click', () => {
                const pid = btn.getAttribute('data-preset-id');
                const preset = presetsRef.assets.find(x => x.presetId === pid);
                if (!preset || !scenarioRef) return;

                if (!Array.isArray(scenarioRef.assets)) scenarioRef.assets = [];
                const center = scenarioRef.mapConfig?.center || [51.5074, -0.1278];
                const jitterLat = (Math.random() - 0.5) * 0.04;
                const jitterLng = (Math.random() - 0.5) * 0.04;

                scenarioRef.assets.push({
                    id: `${preset.presetId}_${scenarioRef.assets.length + 1}`,
                    name: preset.name,
                    image: preset.imageId,
                    imageId: preset.imageId,
                    location: [+(center[0] + jitterLat).toFixed(4), +(center[1] + jitterLng).toFixed(4)],
                    state: preset.state || 'operational',
                    tags: [...(preset.tags || [])],
                    briefing: preset.briefing || ''
                });

                renderWizardQuickAssets();
                if (typeof onSyncCallback === 'function') onSyncCallback();
                showToast(`Added ${preset.name} to scenario`, 'success');
            });
        });
    }

    function syncWizardFieldsFromScenario() {
        if (!scenarioRef) return;
        const nameInp = document.getElementById('wiz-name');
        const idInp = document.getElementById('wiz-id');
        const descInp = document.getElementById('wiz-desc');
        const latInp = document.getElementById('wiz-lat');
        const lngInp = document.getElementById('wiz-lng');
        const zoomInp = document.getElementById('wiz-zoom');

        if (nameInp) nameInp.value = scenarioRef.name || '';
        if (idInp) idInp.value = scenarioRef.id || '';
        if (descInp) descInp.value = scenarioRef.description || '';
        if (latInp && scenarioRef.mapConfig?.center) latInp.value = scenarioRef.mapConfig.center[0];
        if (lngInp && scenarioRef.mapConfig?.center) lngInp.value = scenarioRef.mapConfig.center[1];
        if (zoomInp && scenarioRef.mapConfig) zoomInp.value = scenarioRef.mapConfig.zoom || 10;

        renderWizardRolesPreview();
        renderWizardScoresPreview();
        renderWizardQuickAssets();
    }

    function renderWizardRolesPreview() {
        const box = document.getElementById('wiz-roles-preview');
        if (!box || !scenarioRef) return;
        const roles = scenarioRef.roles || [];
        if (roles.length === 0) {
            box.innerHTML = `<div class="text-xs text-muted">No roles selected yet. Choose a bundle above or click "Suggest Roles with AI".</div>`;
            return;
        }
        box.innerHTML = roles.map(r => `
            <div class="editor-item-card flex-between items-center" style="padding: 0.45rem 0.75rem;">
                <div>
                    <strong class="text-xs">${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</strong>
                    <code class="text-xs text-muted" style="margin-left: 0.4rem;">${escapeHtml(r)}</code>
                </div>
                <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">Configured</span>
            </div>
        `).join('');
    }

    function renderWizardScoresPreview() {
        const box = document.getElementById('wiz-scores-preview');
        if (!box || !scenarioRef) return;
        const scores = scenarioRef.initialScores || {};
        const entries = Object.entries(scores);
        if (entries.length === 0) {
            box.innerHTML = `<div class="text-xs text-muted">No scoring metrics configured yet.</div>`;
            return;
        }
        box.innerHTML = entries.map(([k, v]) => `
            <div class="editor-item-card flex-between items-center" style="padding: 0.45rem 0.75rem;">
                <code>${escapeHtml(k)}</code>
                <span class="badge" style="background: var(--bg-tertiary);">Initial: ${escapeHtml(v)}</span>
            </div>
        `).join('');
    }

    function setStep(step) {
        currentStep = Math.max(1, Math.min(4, step));
        for (let i = 1; i <= 4; i++) {
            const pane = document.getElementById(`wizard-step-${i}`);
            if (pane) pane.hidden = (i !== currentStep);
        }
        document.querySelectorAll('.wizard-step-pill').forEach(pill => {
            const s = Number(pill.getAttribute('data-step'));
            pill.classList.toggle('done', s < currentStep);
            if (s === currentStep) pill.setAttribute('aria-current', 'step');
            else pill.removeAttribute('aria-current');
        });

        const prevBtn = document.getElementById('btn-wiz-prev');
        const nextBtn = document.getElementById('btn-wiz-next');
        const finishBtn = document.getElementById('btn-wiz-finish');

        if (prevBtn) prevBtn.disabled = (currentStep === 1);
        if (nextBtn) nextBtn.style.display = currentStep < 4 ? 'inline-flex' : 'none';
        if (finishBtn) finishBtn.style.display = currentStep === 4 ? 'inline-flex' : 'none';
    }

    function open() {
        syncWizardFieldsFromScenario();
        setStep(1);
        const dialog = document.getElementById('setup-wizard-dialog');
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }

    function close() {
        const dialog = document.getElementById('setup-wizard-dialog');
        if (dialog && dialog.open) {
            dialog.close();
        }
        if (typeof onSyncCallback === 'function') {
            onSyncCallback();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('btn-open-wizard')?.addEventListener('click', open);
        document.getElementById('btn-skip-wizard')?.addEventListener('click', close);
        document.getElementById('btn-wiz-finish')?.addEventListener('click', close);
        document.getElementById('btn-wiz-prev')?.addEventListener('click', () => setStep(currentStep - 1));
        document.getElementById('btn-wiz-next')?.addEventListener('click', () => setStep(currentStep + 1));

        const nameInp = document.getElementById('wiz-name');
        const idInp = document.getElementById('wiz-id');
        const descInp = document.getElementById('wiz-desc');

        if (nameInp) {
            nameInp.addEventListener('input', () => {
                if (!scenarioRef) return;
                scenarioRef.name = nameInp.value;
                if (!scenarioRef._idLocked) {
                    const slug = nameInp.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
                    if (slug) {
                        if (idInp) idInp.value = slug;
                        scenarioRef.id = slug;
                    }
                }
                if (typeof onSyncCallback === 'function') onSyncCallback();
            });
        }

        if (idInp) {
            idInp.addEventListener('input', () => {
                if (scenarioRef && scenarioRef._idLocked) return;
                idInp.dataset.manual = '1';
                if (scenarioRef) {
                    const cleaned = idInp.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
                    if (cleaned) {
                        scenarioRef.id = cleaned;
                        if (typeof onSyncCallback === 'function') onSyncCallback();
                    }
                }
            });
        }

        if (descInp) {
            descInp.addEventListener('input', () => {
                if (scenarioRef) {
                    scenarioRef.description = descInp.value;
                    if (typeof onSyncCallback === 'function') onSyncCallback();
                }
            });
        }

        document.getElementById('btn-ai-wiz-desc')?.addEventListener('click', async () => {
            if (!scenarioRef || typeof window.requestEditorAiBriefing !== 'function') return;
            const text = await window.requestEditorAiBriefing({
                fieldType: 'scenario_description',
                targetName: scenarioRef.name
            });
            if (text && descInp) {
                descInp.value = text;
                scenarioRef.description = text;
                if (typeof onSyncCallback === 'function') onSyncCallback();
            }
        });

        document.getElementById('wiz-role-bundle')?.addEventListener('change', (e) => {
            const bundleId = e.target.value;
            if (!bundleId || !presetsRef || !scenarioRef) return;
            const bundle = (presetsRef.roles?.bundles || []).find(b => b.id === bundleId);
            if (!bundle) return;

            if (!Array.isArray(scenarioRef.roles)) scenarioRef.roles = [];
            if (!scenarioRef.roleNames) scenarioRef.roleNames = {};
            if (!scenarioRef.briefings) scenarioRef.briefings = { _general: '' };

            bundle.roles.forEach(r => {
                if (!scenarioRef.roles.includes(r.id)) {
                    scenarioRef.roles.push(r.id);
                }
                scenarioRef.roleNames[r.id] = r.name;
                if (r.briefing) scenarioRef.briefings[r.id] = r.briefing;
            });

            renderWizardRolesPreview();
            if (typeof onSyncCallback === 'function') onSyncCallback();
            showToast(`Applied ${bundle.name} roles`, 'success');
        });

        document.getElementById('btn-wiz-ai-roles')?.addEventListener('click', async () => {
            if (!scenarioRef) return;
            try {
                const res = await apiFetch('/api/ai/suggest-roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: scenarioRef.name,
                        description: scenarioRef.description,
                        existingRoles: scenarioRef.roles || []
                    })
                });
                const data = await res.json();
                const suggestions = data.suggestions || [];
                if (suggestions.length === 0) {
                    showToast('All recommended roles are already added', 'info');
                    return;
                }
                if (!Array.isArray(scenarioRef.roles)) scenarioRef.roles = [];
                if (!scenarioRef.roleNames) scenarioRef.roleNames = {};
                if (!scenarioRef.briefings) scenarioRef.briefings = { _general: '' };

                suggestions.slice(0, 3).forEach(s => {
                    if (!scenarioRef.roles.includes(s.id)) {
                        scenarioRef.roles.push(s.id);
                        scenarioRef.roleNames[s.id] = s.name;
                        scenarioRef.briefings[s.id] = s.briefing;
                    }
                });
                renderWizardRolesPreview();
                if (typeof onSyncCallback === 'function') onSyncCallback();
                showToast(`AI added ${Math.min(3, suggestions.length)} complementary roles`, 'success');
            } catch (err) {
                showToast('AI role suggestion failed: ' + err.message, 'error');
            }
        });

        document.getElementById('wiz-score-preset')?.addEventListener('change', (e) => {
            const pid = e.target.value;
            if (!pid || !presetsRef || !scenarioRef) return;
            const preset = (presetsRef.scores || []).find(s => s.id === pid);
            if (!preset) return;

            scenarioRef.initialScores = {};
            scenarioRef.scoreConfigs = {};
            for (const [key, cfg] of Object.entries(preset.scores)) {
                scenarioRef.initialScores[key] = cfg.initial;
                scenarioRef.scoreConfigs[key] = {
                    min: cfg.min,
                    max: cfg.max,
                    unit: cfg.unit,
                    visibleToPlayers: cfg.visibleToPlayers,
                    promptAI: cfg.promptAI
                };
            }
            renderWizardScoresPreview();
            if (typeof onSyncCallback === 'function') onSyncCallback();
            showToast(`Applied ${preset.name} metrics`, 'success');
        });

        document.getElementById('wiz-map-preset')?.addEventListener('change', (e) => {
            const mid = e.target.value;
            if (!mid || !presetsRef || !scenarioRef) return;
            const mp = (presetsRef.maps || []).find(m => m.id === mid);
            if (!mp) return;
            scenarioRef.mapConfig = {
                center: [...mp.center],
                zoom: mp.zoom
            };
            document.getElementById('wiz-lat').value = mp.center[0];
            document.getElementById('wiz-lng').value = mp.center[1];
            document.getElementById('wiz-zoom').value = mp.zoom;
            if (typeof onSyncCallback === 'function') onSyncCallback();
        });

        ['wiz-lat', 'wiz-lng', 'wiz-zoom'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                if (!scenarioRef) return;
                const lat = Number(document.getElementById('wiz-lat').value || 51.5074);
                const lng = Number(document.getElementById('wiz-lng').value || -0.1278);
                const zoom = Number(document.getElementById('wiz-zoom').value || 10);
                scenarioRef.mapConfig = { center: [lat, lng], zoom };
                if (typeof onSyncCallback === 'function') onSyncCallback();
            });
        });
    });

    window.EditorWizard = {
        init,
        open,
        close
    };
})();
