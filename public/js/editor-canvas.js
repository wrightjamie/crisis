// Crisis Scenario Editor - Visio-Style Event & Decision Flow Canvas + Slide-Out Inspector
(function() {
    'use strict';

    const { escapeHtml, renderIcon, showToast } = window.common;
    const {
        getHelperTriggers,
        getEventPrerequisites,
        getActionPredecessorEvents,
        getActionTriggeredEvents,
        computeLayout,
        buildBezierPath,
        buildEdgesSvg
    } = window.FlowGraph;

    let scenarioRef = null;
    let onDirtyCallback = null;
    let onLayoutChangeCallback = null;
    let selectedEventId = null;
    let inspectorView = { mode: 'root' }; // { mode: 'root' } | { mode: 'link', kind, idx } | { mode: 'option', dIdx, oIdx }
    let viewMode = 'canvas'; // 'canvas' | 'accordion'

    // Pan & Zoom state
    let scale = 1;
    let panX = 40;
    let panY = 40;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;

    // Node Drag state
    let draggingNodeId = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let hasDraggedNode = false;

    // Drag-to-Connect Link state
    let linkingSource = null; // { id, type: 'event'|'action', startX, startY }
    let hoveredLinkTargetEl = null;

    const LAYOUT_VERSION = 2;

    function getLocalLayoutKey() {
        return scenarioRef && scenarioRef.id ? `crisis_canvas_layout_${scenarioRef.id}` : null;
    }

    function restoreSavedCanvasLayout() {
        if (!scenarioRef) return;
        let localLayout = null;
        const key = getLocalLayoutKey();
        if (key) {
            try {
                const raw = localStorage.getItem(key);
                if (raw) localLayout = JSON.parse(raw);
            } catch {}
        }

        const savedLayout = (scenarioRef.canvasLayout && scenarioRef.canvasLayout.version === LAYOUT_VERSION)
            ? scenarioRef.canvasLayout
            : (localLayout && localLayout.version === LAYOUT_VERSION ? localLayout : null);

        if (savedLayout && typeof savedLayout === 'object') {
            if (typeof savedLayout.panX === 'number') panX = savedLayout.panX;
            if (typeof savedLayout.panY === 'number') panY = savedLayout.panY;
            if (typeof savedLayout.scale === 'number') scale = savedLayout.scale;
        }

        const savedPositions = savedLayout?.positions || {};

        (scenarioRef.eventTemplates || []).forEach(ev => {
            if (savedPositions[ev.id] && typeof savedPositions[ev.id].x === 'number' && typeof savedPositions[ev.id].y === 'number') {
                ev._canvasPos = {
                    x: Number(savedPositions[ev.id].x),
                    y: Number(savedPositions[ev.id].y)
                };
            } else if (!savedLayout) {
                // Upgrade from v1 unaligned layout so the new predecessor-to-successor layout takes effect
                delete ev._canvasPos;
            }
        });
    }

    function syncCanvasLayoutToScenario() {
        if (!scenarioRef) return;
        const positions = {};
        (scenarioRef.eventTemplates || []).forEach(ev => {
            if (ev && ev.id && ev._canvasPos && typeof ev._canvasPos.x === 'number' && typeof ev._canvasPos.y === 'number') {
                positions[ev.id] = {
                    x: Math.round(ev._canvasPos.x),
                    y: Math.round(ev._canvasPos.y)
                };
            }
        });

        scenarioRef.canvasLayout = {
            version: LAYOUT_VERSION,
            panX: Math.round(panX),
            panY: Math.round(panY),
            scale: Number(scale.toFixed(2)),
            positions
        };

        const key = getLocalLayoutKey();
        if (key) {
            try {
                localStorage.setItem(key, JSON.stringify(scenarioRef.canvasLayout));
            } catch {}
        }
    }

    function getAllEvents() {
        return (scenarioRef?.eventTemplates || []).filter(e => e && !e.isManualAction);
    }

    function getAllActions() {
        return (scenarioRef?.eventTemplates || []).filter(e => e && e.isManualAction);
    }

    function init(scenario, onDirty, onLayoutChange) {
        scenarioRef = scenario;
        onDirtyCallback = onDirty;
        onLayoutChangeCallback = onLayoutChange;
        if (!Array.isArray(scenarioRef.eventTemplates)) {
            scenarioRef.eventTemplates = [];
        }
        restoreSavedCanvasLayout();
        ensureNodePositions(false);
        render();
    }

    function markDirty() {
        syncCanvasLayoutToScenario();
        if (typeof onDirtyCallback === 'function') {
            onDirtyCallback();
        }
    }

    function markLayoutChanged() {
        syncCanvasLayoutToScenario();
        if (typeof onLayoutChangeCallback === 'function') {
            onLayoutChangeCallback();
        }
    }

    function getNodeDisplayLabel(node, allNodes) {
        const base = (node && (node.name || node.title)) ? String(node.name || node.title).trim() : 'Untitled';
        if (!Array.isArray(allNodes)) return base;
        const dupes = allNodes.filter(n => n && String(n.name || n.title || '').trim() === base);
        if (dupes.length <= 1) return base;
        if (node.stage) return `${base} (${node.stage})`;
        const idx = dupes.indexOf(node) + 1;
        return `${base} #${idx}`;
    }

    function getEventTitleById(id) {
        const ev = (scenarioRef?.eventTemplates || []).find(e => e.id === id);
        if (ev) return ev.name || ev.title || 'Untitled Event';
        const act = (scenarioRef?.manualActions || []).find(a => a.id === id);
        if (act) return act.name || 'Untitled Action';
        return id;
    }

    function ensureOptionEffects(opt) {
        if (!opt.effects || typeof opt.effects !== 'object') {
            opt.effects = {};
        }
        if (!Array.isArray(opt.effects.triggerEvents)) {
            opt.effects.triggerEvents = Array.isArray(opt.triggerEvents) ? opt.triggerEvents : [];
        }
        if (!opt.effects.scores || typeof opt.effects.scores !== 'object') {
            opt.effects.scores = {};
        }
        return opt.effects;
    }

    // Compute clean left-to-right Visio layout using shared FlowGraph engine
    function ensureNodePositions(forceRecalculate = false) {
        if (!scenarioRef) return;
        if (!Array.isArray(scenarioRef.eventTemplates)) scenarioRef.eventTemplates = [];

        const nodes = scenarioRef.eventTemplates;
        if (nodes.length === 0) return;

        const needsLayout = forceRecalculate ||
            nodes.some(e => !e._canvasPos || typeof e._canvasPos.x !== 'number' || typeof e._canvasPos.y !== 'number');
        if (!needsLayout) return;

        const posMap = computeLayout(nodes, [], { forceRecalculate });
        nodes.forEach(node => {
            const target = posMap.get(node.id) || { x: 60, y: 60 };
            node._canvasPos = { x: target.x, y: target.y };
        });

        syncCanvasLayoutToScenario();
    }

    function applyTransform() {
        const plane = document.getElementById('canvas-transform-plane');
        const label = document.getElementById('canvas-zoom-label');
        if (plane) {
            plane.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
        }
        if (label) {
            label.textContent = `${Math.round(scale * 100)}%`;
        }
    }

    function render() {
        if (!scenarioRef) return;
        const countBadge = document.getElementById('tab-count-events');
        if (countBadge) {
            countBadge.textContent = (scenarioRef.eventTemplates || []).length;
        }

        if (viewMode === 'accordion') {
            renderAccordionList();
        } else {
            renderCanvasNodes();
            renderCanvasEdges();
            applyTransform();
        }
    }

    function renderCanvasNodes() {
        const layer = document.getElementById('canvas-nodes-layer');
        if (!layer || !scenarioRef) return;

        const events = getAllEvents();
        const actions = getAllActions();

        if (events.length === 0 && actions.length === 0) {
            layer.innerHTML = `
                <div style="position: absolute; left: 120px; top: 100px; max-width: 380px;" class="editor-panel text-center">
                    <h4 style="margin: 0 0 0.5rem 0;">No Events Yet</h4>
                    <p class="text-xs text-muted mb-2">Click "Add Event Node" in the toolbar above to create your starting event and build your branching narrative tree.</p>
                </div>
            `;
            return;
        }

        const eventsHtml = events.map((ev, idx) => {
            const pos = ev._canvasPos || { x: 60 + (idx % 4) * 340, y: 60 + Math.floor(idx / 4) * 200 };
            const isSelected = ev.id === selectedEventId;
            const hasDecisions = Array.isArray(ev.decisions) && ev.decisions.length > 0;
            const isRoot = Boolean(ev.isOpeningEvent) || (!events.some(x => x.isOpeningEvent) && (ev.id === 'ev_start' || ev.id === 'evt_initial' || idx === 0));
            const nodeClass = [
                'canvas-node',
                isSelected ? 'selected' : '',
                ev.isEndGame ? 'endgame-node' : '',
                isRoot ? 'root-node' : '',
                ev.requiresUnlock ? 'inject-node' : '',
                hasDecisions ? 'decision-has-branches' : ''
            ].filter(Boolean).join(' ');

            const triggersCount = (ev.triggerEvents || []).length;
            let optionsHtml = '';
            if (hasDecisions) {
                const pills = [];
                ev.decisions.forEach(dec => {
                    (dec.options || []).forEach(opt => {
                        const optTriggers = getHelperTriggers(opt);
                        const linkedIds = optTriggers.map(t => typeof t === 'string' ? t : t.id).filter(Boolean);
                        pills.push(`
                            <div class="canvas-option-pill" title="${escapeHtml(opt.text || opt.id)}">
                                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(opt.text || opt.id)}</span>
                                ${linkedIds.length > 0 ? `<span class="badge" style="font-size: 0.65rem; background: rgba(16,185,129,0.25); color: #6ee7b7;">→ ${linkedIds.length}</span>` : ''}
                            </div>
                        `);
                    });
                });
                if (pills.length > 0) {
                    optionsHtml = `<div class="canvas-decision-pills">${pills.join('')}</div>`;
                }
            }

            return `
                <div class="${nodeClass}" data-event-id="${escapeHtml(ev.id)}" style="left: ${Math.round(pos.x)}px; top: ${Math.round(pos.y)}px;">
                    <div class="canvas-node-header">
                        <div class="inline-flex items-center gap-xs flex-wrap">
                            ${ev.isOpeningEvent ? `<span class="badge badge-opening">Start</span>` : ''}
                            ${ev.isEndGame ? `<span class="badge badge-endgame">End Game</span>` : ''}
                            ${ev.requiresUnlock ? `<span class="badge badge-inject">Inject</span>` : ''}
                            ${ev.stage ? `<span class="badge badge-stage">${escapeHtml(ev.stage)}</span>` : ''}
                        </div>
                    </div>
                    <div class="canvas-node-title">${escapeHtml(ev.name || ev.title || 'Untitled Event')}</div>
                    <div class="canvas-node-meta">
                        ${triggersCount > 0 ? `<span class="badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 0.68rem;">Triggers: ${triggersCount}</span>` : ''}
                        ${hasDecisions ? `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.68rem;">Decisions: ${ev.decisions.length}</span>` : ''}
                        ${ev.visibleTo ? `<span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; font-size: 0.68rem;">Role-Restricted</span>` : ''}
                    </div>
                    ${optionsHtml}
                    <button type="button" class="canvas-link-handle" data-link-source="${escapeHtml(ev.id)}" data-link-source-type="event" title="Drag to another node to link" aria-label="Drag to link from ${escapeHtml(ev.name || 'event')}">${renderIcon('plus', 12)}</button>
                </div>
            `;
        }).join('');

        // Render Manual Action nodes on the canvas
        const actionsHtml = actions.map((act, idx) => {
            const pos = act._canvasPos || { x: 60 + (idx % 4) * 340, y: 350 + Math.floor(idx / 4) * 160 };
            const isSelected = act.id === selectedEventId;
            const nodeClass = [
                'canvas-node',
                'action-node',
                isSelected ? 'selected' : ''
            ].filter(Boolean).join(' ');

            const preds = getActionPredecessorEvents(act);
            const predLabels = preds.map(pid => getEventTitleById(pid));
            const tgts = getActionTriggeredEvents(act);

            return `
                <div class="${nodeClass}" data-action-id="${escapeHtml(act.id)}" style="left: ${Math.round(pos.x)}px; top: ${Math.round(pos.y)}px;">
                    <div class="canvas-node-header">
                        <span class="badge" style="background: rgba(245, 158, 11, 0.25); color: #fbbf24; font-size: 0.65rem;">Manual Action</span>
                    </div>
                    <div class="canvas-node-title">${escapeHtml(act.name || 'Untitled Action')}</div>
                    <div class="canvas-node-meta">
                        ${predLabels.length > 0 ? `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: #cbd5e1; font-size: 0.68rem;" title="${escapeHtml(predLabels.join(', '))}">After: ${escapeHtml(predLabels.length > 1 ? `${predLabels[0]} +${predLabels.length - 1}` : predLabels[0])}</span>` : `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.68rem;">Always Available</span>`}
                        ${tgts.length > 0 ? `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 0.68rem;">Triggers: ${tgts.length}</span>` : ''}
                    </div>
                    <button type="button" class="canvas-link-handle" data-link-source="${escapeHtml(act.id)}" data-link-source-type="action" title="Drag to another node to link" aria-label="Drag to link from ${escapeHtml(act.name || 'action')}">${renderIcon('plus', 12)}</button>
                </div>
            `;
        }).join('');

        layer.innerHTML = eventsHtml + actionsHtml;

        // Bind drag-to-connect link handles
        layer.querySelectorAll('.canvas-link-handle').forEach(handle => {
            handle.addEventListener('pointerdown', (e) => {
                if (e.button !== 0) return;
                e.stopPropagation();
                e.preventDefault();
                const srcId = handle.getAttribute('data-link-source');
                const srcType = handle.getAttribute('data-link-source-type');
                const nodeEl = handle.closest('.canvas-node');
                const srcObj = (scenarioRef.eventTemplates || []).find(x => x.id === srcId);
                if (!srcObj || !srcObj._canvasPos) return;
                const nodeW = nodeEl ? nodeEl.offsetWidth : 270;
                const nodeH = nodeEl ? nodeEl.offsetHeight : 96;
                linkingSource = {
                    id: srcId,
                    type: srcType,
                    startX: srcObj._canvasPos.x + nodeW,
                    startY: srcObj._canvasPos.y + Math.round(nodeH / 2)
                };
                const tempPath = document.getElementById('canvas-temp-link-path');
                if (tempPath) {
                    tempPath.removeAttribute('hidden');
                    tempPath.setAttribute('d', buildBezierPath(linkingSource.startX, linkingSource.startY, linkingSource.startX + 10, linkingSource.startY));
                }
            });
            handle.addEventListener('click', (e) => e.stopPropagation());
        });

        // Attach drag and click listeners to event nodes
        layer.querySelectorAll('.canvas-node[data-event-id]').forEach(nodeEl => {
            const evId = nodeEl.getAttribute('data-event-id');

            nodeEl.addEventListener('pointerdown', (e) => {
                if (e.button !== 0) return;
                e.stopPropagation();
                draggingNodeId = evId;
                hasDraggedNode = false;
                const evObj = (scenarioRef.eventTemplates || []).find(x => x.id === evId);
                if (!evObj) return;
                const wrapperRect = document.getElementById('events-canvas-wrapper').getBoundingClientRect();
                const mouseCanvasX = (e.clientX - wrapperRect.left - panX) / scale;
                const mouseCanvasY = (e.clientY - wrapperRect.top - panY) / scale;
                dragOffsetX = mouseCanvasX - (evObj._canvasPos?.x || 0);
                dragOffsetY = mouseCanvasY - (evObj._canvasPos?.y || 0);
            });

            nodeEl.addEventListener('click', (e) => {
                e.stopPropagation();
                if (hasDraggedNode) return;
                openInspector(evId);
            });
        });

        // Attach drag and click listeners to manual action nodes (BR-35)
        layer.querySelectorAll('.canvas-node[data-action-id]').forEach(nodeEl => {
            const actId = nodeEl.getAttribute('data-action-id');

            nodeEl.addEventListener('pointerdown', (e) => {
                if (e.button !== 0) return;
                e.stopPropagation();
                draggingNodeId = actId;
                hasDraggedNode = false;
                const actObj = getAllActions().find(x => x.id === actId);
                if (!actObj) return;
                const wrapperRect = document.getElementById('events-canvas-wrapper').getBoundingClientRect();
                const mouseCanvasX = (e.clientX - wrapperRect.left - panX) / scale;
                const mouseCanvasY = (e.clientY - wrapperRect.top - panY) / scale;
                dragOffsetX = mouseCanvasX - (actObj._canvasPos?.x || 0);
                dragOffsetY = mouseCanvasY - (actObj._canvasPos?.y || 0);
            });

            nodeEl.addEventListener('click', (e) => {
                e.stopPropagation();
                if (hasDraggedNode) return;
                openActionInspector(actId);
            });
        });
    }

    function renderCanvasEdges() {
        const group = document.getElementById('canvas-edges-group');
        if (!group || !scenarioRef) return;

        const events = getAllEvents();
        const actions = getAllActions();
        group.innerHTML = buildEdgesSvg(events, actions, null, { escapeHtml });
    }

    function formatScoreLabel(key) {
        if (!key) return '';
        const cfg = scenarioRef?.scoreConfigs?.[key];
        if (cfg && cfg.label) return cfg.label;
        return String(key)
            .replace(/[_-]+/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    function getAvailableScoreKeys(existingScores = {}) {
        const base = Object.keys(scenarioRef?.initialScores || {});
        const extras = Object.keys(existingScores || {}).filter(k => !base.includes(k));
        return [...base, ...extras];
    }

    function renderScoreEffectRows(scoresObj, attrStr, clsPrefix) {
        const entries = Object.entries(scoresObj || {});
        const allKeys = getAvailableScoreKeys(scoresObj);
        if (entries.length === 0) {
            return `<div class="text-xs text-muted">No score effects.</div>`;
        }
        return entries.map(([k, v], sIdx) => `
            <div class="insp-sublist-row">
                <select class="form-control text-xs ${clsPrefix}-score-key" ${attrStr} data-sidx="${sIdx}" aria-label="Score Metric">
                    ${allKeys.map(sk => `<option value="${escapeHtml(sk)}" ${sk === k ? 'selected' : ''}>${escapeHtml(formatScoreLabel(sk))}</option>`).join('')}
                </select>
                <input type="number" step="1" class="form-control text-xs ${clsPrefix}-score-val" ${attrStr} data-sidx="${sIdx}" value="${Number.isFinite(Number(v)) ? Number(v) : 0}" aria-label="Score Delta">
                <button type="button" class="btn btn-danger text-xs insp-sublist-del ${clsPrefix}-btn-del-score" ${attrStr} data-sidx="${sIdx}" title="Remove score effect" aria-label="Remove score effect">&times;</button>
            </div>
        `).join('');
    }

    const STANDARD_ASSET_STATES = ['operational', 'damaged', 'deployed', 'destroyed', 'offline'];

    function getScenarioAssets() {
        return Array.isArray(scenarioRef?.assets) ? scenarioRef.assets.filter(a => a && a.id) : [];
    }

    function extractConditionRules(conditions) {
        const c = (conditions && typeof conditions === 'object') ? conditions : {};
        const scoreRules = [];
        if (c.minScores && typeof c.minScores === 'object') {
            Object.entries(c.minScores).forEach(([metric, value]) => {
                scoreRules.push({ metric, op: 'min', value: Number(value) });
            });
        }
        if (c.maxScores && typeof c.maxScores === 'object') {
            Object.entries(c.maxScores).forEach(([metric, value]) => {
                scoreRules.push({ metric, op: 'max', value: Number(value) });
            });
        }
        const assetMap = { ...(c.assets || {}), ...(c.assetStates || {}) };
        const assetRules = Object.entries(assetMap).map(([assetId, state]) => ({
            assetId,
            state: String(state || 'operational')
        }));
        return { scoreRules, assetRules };
    }

    function applyConditionRulesToObject(targetObj, scoreRules, assetRules) {
        const existing = (targetObj.conditions && typeof targetObj.conditions === 'object') ? { ...targetObj.conditions } : {};
        delete existing.minScores;
        delete existing.maxScores;
        delete existing.assetStates;
        delete existing.assets;

        const minScores = {};
        const maxScores = {};
        scoreRules.forEach(r => {
            if (!r.metric || !Number.isFinite(Number(r.value))) return;
            if (r.op === 'max') maxScores[r.metric] = Number(r.value);
            else minScores[r.metric] = Number(r.value);
        });
        if (Object.keys(minScores).length > 0) existing.minScores = minScores;
        if (Object.keys(maxScores).length > 0) existing.maxScores = maxScores;

        const assetStates = {};
        assetRules.forEach(r => {
            if (!r.assetId || !r.state) return;
            assetStates[r.assetId] = r.state;
        });
        if (Object.keys(assetStates).length > 0) existing.assetStates = assetStates;

        if (Object.keys(existing).length > 0) {
            targetObj.conditions = existing;
        } else {
            delete targetObj.conditions;
        }
    }

    function renderConditionsEditorHtml(conditions, attrStr, clsPrefix) {
        const { scoreRules, assetRules } = extractConditionRules(conditions);
        const existingScoreMap = {};
        scoreRules.forEach(r => { existingScoreMap[r.metric] = r.value; });
        const allScoreKeys = getAvailableScoreKeys(existingScoreMap);
        const assets = getScenarioAssets();

        const scoreHtml = scoreRules.length === 0
            ? `<div class="text-xs text-muted">No score thresholds set.</div>`
            : scoreRules.map((r, idx) => `
                <div class="insp-sublist-row">
                    <select class="form-control text-xs ${clsPrefix}-cond-score-key" ${attrStr} data-cidx="${idx}" aria-label="Score Metric">
                        ${allScoreKeys.map(sk => `<option value="${escapeHtml(sk)}" ${sk === r.metric ? 'selected' : ''}>${escapeHtml(formatScoreLabel(sk))}</option>`).join('')}
                    </select>
                    <select class="form-control text-xs insp-cond-op ${clsPrefix}-cond-score-op" ${attrStr} data-cidx="${idx}" aria-label="Comparison">
                        <option value="min" ${r.op === 'min' ? 'selected' : ''}>&ge;</option>
                        <option value="max" ${r.op === 'max' ? 'selected' : ''}>&le;</option>
                    </select>
                    <input type="number" step="1" class="form-control text-xs ${clsPrefix}-cond-score-val" ${attrStr} data-cidx="${idx}" value="${Number.isFinite(r.value) ? r.value : 3}" aria-label="Threshold Value">
                    <button type="button" class="btn btn-danger text-xs insp-sublist-del ${clsPrefix}-btn-del-cond-score" ${attrStr} data-cidx="${idx}" title="Remove score rule" aria-label="Remove score rule">&times;</button>
                </div>
            `).join('');

        const assetHtml = assetRules.length === 0
            ? `<div class="text-xs text-muted">${assets.length === 0 ? 'No scenario assets defined yet.' : 'No asset status rules set.'}</div>`
            : assetRules.map((r, idx) => {
                const stateOptions = STANDARD_ASSET_STATES.includes(r.state)
                    ? STANDARD_ASSET_STATES
                    : [...STANDARD_ASSET_STATES, r.state];
                const hasAssetInList = assets.some(a => a.id === r.assetId);
                return `
                    <div class="insp-sublist-row">
                        <select class="form-control text-xs ${clsPrefix}-cond-asset-id" ${attrStr} data-aidx="${idx}" aria-label="Asset">
                            ${!hasAssetInList && r.assetId ? `<option value="${escapeHtml(r.assetId)}" selected>${escapeHtml(r.assetId)}</option>` : ''}
                            ${assets.map(a => `<option value="${escapeHtml(a.id)}" ${a.id === r.assetId ? 'selected' : ''}>${escapeHtml(a.name || a.id)}</option>`).join('')}
                        </select>
                        <select class="form-control text-xs insp-cond-state ${clsPrefix}-cond-asset-state" ${attrStr} data-aidx="${idx}" aria-label="Asset Status">
                            ${stateOptions.map(st => `<option value="${escapeHtml(st)}" ${st === r.state ? 'selected' : ''}>${escapeHtml(st.charAt(0).toUpperCase() + st.slice(1))}</option>`).join('')}
                        </select>
                        <button type="button" class="btn btn-danger text-xs insp-sublist-del ${clsPrefix}-btn-del-cond-asset" ${attrStr} data-aidx="${idx}" title="Remove asset rule" aria-label="Remove asset rule">&times;</button>
                    </div>
                `;
            }).join('');

        return `
            <div class="insp-cond-group">
                <div>
                    <div class="insp-sublist-header">
                        <label>Score Thresholds (${scoreRules.length})</label>
                        <button type="button" class="btn btn-secondary text-xs ${clsPrefix}-btn-add-cond-score" ${attrStr}>+ Add Score Rule</button>
                    </div>
                    <div class="insp-sublist">${scoreHtml}</div>
                </div>
                <div>
                    <div class="insp-sublist-header">
                        <label>Asset Status (${assetRules.length})</label>
                        <button type="button" class="btn btn-secondary text-xs ${clsPrefix}-btn-add-cond-asset" ${attrStr} ${assets.length === 0 ? 'disabled title="Add assets in Tab 3 first"' : ''}>+ Add Asset Rule</button>
                    </div>
                    <div class="insp-sublist">${assetHtml}</div>
                </div>
            </div>
        `;
    }

    function setupInspectorHeaderTitle(initialValue, fallbackLabel, onChange) {
        const titleBtn = document.getElementById('inspector-title-btn');
        const titleSpan = document.getElementById('inspector-title');
        const titleInput = document.getElementById('inspector-title-input');
        if (!titleBtn || !titleSpan || !titleInput) return;

        let currentVal = initialValue || '';
        titleSpan.textContent = currentVal || fallbackLabel;
        titleInput.value = currentVal;
        titleInput.placeholder = fallbackLabel;
        titleInput.hidden = true;
        titleBtn.hidden = false;

        let beforeEdit = currentVal;

        const enterEdit = () => {
            beforeEdit = titleInput.value;
            titleBtn.hidden = true;
            titleInput.hidden = false;
            titleInput.focus();
            titleInput.select();
        };

        const exitEdit = () => {
            titleInput.hidden = true;
            titleBtn.hidden = false;
        };

        titleBtn.onclick = enterEdit;
        titleInput.oninput = () => {
            const next = titleInput.value;
            titleSpan.textContent = next || fallbackLabel;
            onChange(next);
        };
        titleInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                titleInput.blur();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                titleInput.value = beforeEdit;
                titleSpan.textContent = beforeEdit || fallbackLabel;
                onChange(beforeEdit);
                titleInput.blur();
            }
        };
        titleInput.onblur = exitEdit;
    }

    function buildVisibilitySummary(ev) {
        const parts = [];
        if (ev.isOpeningEvent) parts.push('Start');
        if (ev.isEndGame) parts.push('End');
        if (ev.requiresUnlock) parts.push('Inject');
        if (ev.repeatable) parts.push('Repeatable');
        if (Array.isArray(ev.visibleTo) && ev.visibleTo.length > 0) {
            parts.push(`${ev.visibleTo.length} role${ev.visibleTo.length === 1 ? '' : 's'}`);
        } else {
            parts.push('All roles');
        }
        if (ev.sound) parts.push(ev.sound);
        return parts.join(' · ');
    }

    function renderEventRootView(ev, preservedOpenIds = new Set()) {
        const allEvents = getAllEvents();
        const allNodes = (scenarioRef.eventTemplates || []).filter(x => x && x.id !== ev.id);
        const roles = scenarioRef.roles || [];
        const imgId = ev.imageId || ev.image || '';
        const imgUrl = window.EditorImagePicker ? window.EditorImagePicker.resolveImageUrl(imgId) : '/images/favicon.png';
        const descVal = typeof ev.description === 'string' ? ev.description : '';

        const triggers = Array.isArray(ev.triggerEvents) ? ev.triggerEvents : [];
        const unlocks = Array.isArray(ev.autoEffects?.unlockEvents) ? ev.autoEffects.unlockEvents : [];
        const decisions = Array.isArray(ev.decisions) ? ev.decisions : [];
        const totalLinks = triggers.length + unlocks.length + decisions.length;

        const { scoreRules, assetRules } = extractConditionRules(ev.conditions);
        const evCondCount = scoreRules.length + assetRules.length;
        const condSummary = ev.autoTriggerOnConditions
            ? `Auto · ${evCondCount} rule${evCondCount === 1 ? '' : 's'}`
            : (evCondCount > 0 ? `${evCondCount} rule${evCondCount === 1 ? '' : 's'}` : 'None');

        const visSummary = buildVisibilitySummary(ev);
        const visOpen = preservedOpenIds.has('insp-details-visibility') ? 'open' : '';
        const condOpen = preservedOpenIds.has('insp-details-ev-conditions') ? 'open' : '';

        const triggerCards = triggers.map((tr, idx) => {
            const tId = typeof tr === 'string' ? tr : (tr.id || '');
            const targetEv = allEvents.find(x => x.id === tId);
            const targetLabel = targetEv ? getNodeDisplayLabel(targetEv, allEvents) : 'Unlinked Auto-Trigger';
            const delaySec = Math.round(((tr && typeof tr === 'object' && tr.delayMs !== undefined ? tr.delayMs : 90000) / 1000));
            const probPct = Math.round(((tr && typeof tr === 'object' && tr.probability !== undefined ? tr.probability : 1) * 100));
            return `
                <div class="insp-summary-card kind-trigger" role="button" tabindex="0" data-drill-kind="trigger" data-drill-idx="${idx}">
                    <div class="insp-summary-card-main">
                        <div class="insp-summary-card-title">&rarr; ${escapeHtml(targetLabel)}</div>
                        <div class="insp-summary-card-meta">Auto-Trigger &middot; ${delaySec}s delay${probPct < 100 ? ` &middot; ${probPct}%` : ''}</div>
                    </div>
                    <div class="insp-summary-card-actions">
                        <button type="button" class="insp-icon-del-btn insp-btn-del-trigger" data-idx="${idx}" title="Remove link" aria-label="Remove link">&times;</button>
                        <span class="insp-summary-chevron">${renderIcon('chevron-right', 15)}</span>
                    </div>
                </div>
            `;
        }).join('');

        const unlockCards = unlocks.map((uId, idx) => {
            const targetNode = allNodes.find(x => x.id === uId);
            const targetLabel = targetNode
                ? `${getNodeDisplayLabel(targetNode, allNodes)}${targetNode.isManualAction ? ' (Manual Action)' : ''}`
                : 'Unlinked Unlock';
            return `
                <div class="insp-summary-card kind-unlock" role="button" tabindex="0" data-drill-kind="unlock" data-drill-idx="${idx}">
                    <div class="insp-summary-card-main">
                        <div class="insp-summary-card-title">Unlock: ${escapeHtml(targetLabel)}</div>
                        <div class="insp-summary-card-meta">Unlocks Event / Action</div>
                    </div>
                    <div class="insp-summary-card-actions">
                        <button type="button" class="insp-icon-del-btn insp-btn-del-unlock" data-idx="${idx}" title="Remove unlock" aria-label="Remove unlock">&times;</button>
                        <span class="insp-summary-chevron">${renderIcon('chevron-right', 15)}</span>
                    </div>
                </div>
            `;
        }).join('');

        const decisionCards = decisions.map((dec, idx) => {
            const decPrompt = (dec.text || dec.prompt || '').trim() || `Decision #${idx + 1}`;
            const optCount = (dec.options || []).length;
            const roleList = Array.isArray(dec.visibleTo) && dec.visibleTo.length > 0
                ? dec.visibleTo
                : (dec.role ? [dec.role] : []);
            const roleLabel = roleList.length > 0
                ? roleList.map(r => (scenarioRef.roleNames && scenarioRef.roleNames[r]) || r).join(', ')
                : 'Unassigned';
            return `
                <div class="insp-summary-card kind-decision" role="button" tabindex="0" data-drill-kind="decision" data-drill-idx="${idx}">
                    <div class="insp-summary-card-main">
                        <div class="insp-summary-card-title">${escapeHtml(decPrompt)}</div>
                        <div class="insp-summary-card-meta">Decision &middot; ${optCount} option${optCount === 1 ? '' : 's'} &middot; ${escapeHtml(roleLabel)}</div>
                    </div>
                    <div class="insp-summary-card-actions">
                        <button type="button" class="insp-icon-del-btn insp-btn-del-dec" data-didx="${idx}" title="Remove decision" aria-label="Remove decision">&times;</button>
                        <span class="insp-summary-chevron">${renderIcon('chevron-right', 15)}</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="field-group">
                <label>Event Artwork</label>
                <button type="button" id="insp-btn-pick-image" class="image-slot-btn">
                    <img src="${escapeHtml(imgUrl)}" alt="" class="image-slot-thumb" id="insp-img-preview" width="38" height="38">
                    <div>
                        <div class="text-bold" id="insp-img-id-label">${escapeHtml(imgId || 'Choose Image...')}</div>
                        <div class="text-xs text-muted">Click to browse Shared Image Library</div>
                    </div>
                </button>
            </div>

            <div class="field-group">
                <div class="label-with-ai">
                    <label for="insp-ev-desc">Narrative Description</label>
                    <button type="button" id="insp-btn-ai-desc" class="btn-ai-brief" title="Draft narrative event description with AI">
                        ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                    </button>
                </div>
                <textarea id="insp-ev-desc" class="form-control" rows="4" placeholder="Event intelligence report shown to players...">${escapeHtml(descVal)}</textarea>
            </div>

            <details class="inspector-collapsible" id="insp-details-visibility" ${visOpen}>
                <summary>
                    <span class="inline-flex items-center gap-xs text-xs">
                        <span class="collapsible-caret">${renderIcon('chevron-right', 14)}</span>
                        <span>Visibility &amp; Options</span>
                    </span>
                    <span class="insp-summary-pill">${escapeHtml(visSummary)}</span>
                </summary>
                <div class="inspector-collapsible-body">
                    <div class="field-group">
                        <label for="insp-ev-sound">Sound Cue (Optional)</label>
                        <select id="insp-ev-sound" class="form-control">
                            <option value="" ${!ev.sound ? 'selected' : ''}>None / Default</option>
                            <option value="alert" ${ev.sound === 'alert' ? 'selected' : ''}>Alert Chime (alert)</option>
                            <option value="teletype" ${ev.sound === 'teletype' ? 'selected' : ''}>Teletype Wire (teletype)</option>
                            <option value="klaxon" ${ev.sound === 'klaxon' ? 'selected' : ''}>Klaxon Siren (klaxon)</option>
                            <option value="explosion" ${ev.sound === 'explosion' ? 'selected' : ''}>Explosion Blast (explosion)</option>
                            <option value="sonar" ${ev.sound === 'sonar' ? 'selected' : ''}>Sonar Ping (sonar)</option>
                            ${ev.sound && !['alert', 'teletype', 'klaxon', 'explosion', 'sonar'].includes(ev.sound) ? `<option value="${escapeHtml(ev.sound)}" selected>${escapeHtml(ev.sound)} (Custom)</option>` : ''}
                        </select>
                    </div>

                    <div class="field-group">
                        <label>Event Options</label>
                        <div class="inspector-check-grid">
                            <label class="insp-check" title="${ev.isOpeningEvent ? 'Mark another event as Opening Event to transfer' : 'Designate as the single opening event of this scenario'}">
                                <input type="checkbox" id="insp-ev-opening" ${ev.isOpeningEvent ? 'checked disabled' : ''}>
                                <span>Opening Event (Start)</span>
                            </label>
                            <label class="insp-check">
                                <input type="checkbox" id="insp-ev-endgame" ${ev.isEndGame ? 'checked' : ''}>
                                <span>Endgame Event (End)</span>
                            </label>
                            <label class="insp-check" title="Requires facilitator or upstream event unlock before triggering">
                                <input type="checkbox" id="insp-ev-unlock" ${ev.requiresUnlock ? 'checked' : ''}>
                                <span>Facilitator Inject</span>
                            </label>
                            <label class="insp-check">
                                <input type="checkbox" id="insp-ev-repeatable" ${ev.repeatable ? 'checked' : ''}>
                                <span>Repeatable Event</span>
                            </label>
                            <label class="insp-check" title="Convert this event into a player-initiated manual action">
                                <input type="checkbox" id="insp-toggle-manual-action">
                                <span>Manual action</span>
                            </label>
                        </div>
                    </div>

                    <div class="field-group" style="margin-bottom: 0;">
                        <label>Visible To Roles (Leave unchecked for all roles)</label>
                        <div class="inspector-check-grid" id="insp-visible-roles">
                            ${roles.map(r => {
                                const checked = Array.isArray(ev.visibleTo) && ev.visibleTo.includes(r) ? 'checked' : '';
                                return `<label class="insp-check"><input type="checkbox" class="insp-role-vis-cb" value="${escapeHtml(r)}" ${checked}><span>${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</span></label>`;
                            }).join('') || '<span class="text-xs text-muted">No roles defined yet.</span>'}
                        </div>
                    </div>
                </div>
            </details>

            <details class="inspector-collapsible" id="insp-details-ev-conditions" ${condOpen} style="margin-top: 0.65rem;">
                <summary>
                    <span class="inline-flex items-center gap-xs text-xs">
                        <span class="collapsible-caret">${renderIcon('chevron-right', 14)}</span>
                        <span>Trigger Conditions</span>
                    </span>
                    <span class="insp-summary-pill ${ev.autoTriggerOnConditions || evCondCount > 0 ? 'active' : ''}">${escapeHtml(condSummary)}</span>
                </summary>
                <div class="inspector-collapsible-body">
                    <div class="field-group" style="margin-bottom: 0.75rem;">
                        <label class="insp-check" title="Automatically fire this event during gameplay as soon as all conditions below are satisfied">
                            <input type="checkbox" id="insp-ev-auto-cond" ${ev.autoTriggerOnConditions ? 'checked' : ''}>
                            <span>Auto-trigger when conditions are met</span>
                        </label>
                    </div>
                    ${renderConditionsEditorHtml(ev.conditions, '', 'insp-ev')}
                </div>
            </details>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">

            <div class="insp-section-header">
                <span class="insp-section-title">Outgoing Links &amp; Decisions (${totalLinks})</span>
                <button type="button" id="insp-btn-add-link" class="btn btn-primary text-xs inline-flex items-center gap-xs">
                    ${renderIcon('plus', 12)} <span>Add Link / Decision</span>
                </button>
            </div>

            <div class="insp-summary-list" id="insp-unified-links-list">
                ${triggerCards}
                ${unlockCards}
                ${decisionCards}
                ${totalLinks === 0 ? '<div class="text-xs text-muted">No outgoing links or decisions yet. Click "Add Link / Decision" or drag from the node\'s + handle.</div>' : ''}
            </div>
        `;
    }

    function renderEventLinkSubview(ev, kind, idx) {
        const allEvents = getAllEvents();
        const allNodes = (scenarioRef.eventTemplates || []).filter(x => x && x.id !== ev.id);
        const roles = scenarioRef.roles || [];
        const evTitle = ev.name || ev.title || 'Event';

        if (kind === 'trigger') {
            const tr = (ev.triggerEvents || [])[idx];
            if (!tr) return null;
            const tId = typeof tr === 'string' ? tr : (tr.id || '');
            const delaySec = Math.round(((tr.delayMs !== undefined ? tr.delayMs : 90000) / 1000));
            const probVal = tr.probability !== undefined ? tr.probability : 1;
            return `
                <div class="insp-subview-nav">
                    <button type="button" class="insp-back-btn" id="insp-btn-back-root">&larr; <span>${escapeHtml(evTitle)}</span></button>
                    <button type="button" class="btn btn-danger text-xs insp-btn-del-trigger" data-idx="${idx}">Remove Link</button>
                </div>
                <div class="insp-subview-heading">Auto-Trigger Link</div>
                <div class="field-group">
                    <label>Link Type</label>
                    <select class="form-control text-xs insp-link-type" data-kind="trigger" data-idx="${idx}">
                        <option value="trigger" selected>Auto-Trigger Next Event</option>
                        <option value="decision">Player Decision</option>
                        <option value="unlock">Unlock Event / Action</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>Target Event</label>
                    <select class="form-control text-xs insp-tr-target" data-idx="${idx}">
                        <option value="">-- Select Target Event --</option>
                        ${allEvents.filter(x => x.id !== ev.id).map(x => `<option value="${escapeHtml(x.id)}" ${x.id === tId ? 'selected' : ''}>${escapeHtml(getNodeDisplayLabel(x, allEvents))}</option>`).join('')}
                    </select>
                </div>
                <div class="field-row">
                    <div class="field-group">
                        <label>Delay (seconds)</label>
                        <input type="number" class="form-control text-xs insp-tr-delay" data-idx="${idx}" value="${delaySec}" min="0" step="5">
                    </div>
                    <div class="field-group">
                        <label>Probability (0&ndash;1)</label>
                        <input type="number" class="form-control text-xs insp-tr-prob" data-idx="${idx}" value="${probVal}" min="0.05" max="1" step="0.05">
                    </div>
                </div>
            `;
        }

        if (kind === 'unlock') {
            const uId = (ev.autoEffects?.unlockEvents || [])[idx];
            if (uId === undefined) return null;
            return `
                <div class="insp-subview-nav">
                    <button type="button" class="insp-back-btn" id="insp-btn-back-root">&larr; <span>${escapeHtml(evTitle)}</span></button>
                    <button type="button" class="btn btn-danger text-xs insp-btn-del-unlock" data-idx="${idx}">Remove Unlock</button>
                </div>
                <div class="insp-subview-heading">Unlock Event / Action</div>
                <div class="field-group">
                    <label>Link Type</label>
                    <select class="form-control text-xs insp-link-type" data-kind="unlock" data-idx="${idx}">
                        <option value="trigger">Auto-Trigger Next Event</option>
                        <option value="decision">Player Decision</option>
                        <option value="unlock" selected>Unlock Event / Action</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>Unlocks Event or Manual Action</label>
                    <select class="form-control text-xs insp-unlock-target" data-idx="${idx}">
                        <option value="">-- Select Target --</option>
                        ${allNodes.map(x => `<option value="${escapeHtml(x.id)}" ${x.id === uId ? 'selected' : ''}>${escapeHtml(getNodeDisplayLabel(x, allNodes))}${x.isManualAction ? ' (Manual Action)' : ''}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        if (kind === 'decision') {
            const dec = (ev.decisions || [])[idx];
            if (!dec) return null;
            const decPrompt = dec.text || dec.prompt || '';
            const assignedRoles = Array.isArray(dec.visibleTo) && dec.visibleTo.length > 0
                ? dec.visibleTo
                : (dec.role ? [dec.role] : []);
            const opts = Array.isArray(dec.options) ? dec.options : [];

            const optCards = opts.map((opt, oIdx) => {
                if (!opt.id) opt.id = `opt_${oIdx + 1}`;
                const optTriggers = getHelperTriggers(opt);
                const scoreCount = Object.keys((opt.effects && opt.effects.scores) ? opt.effects.scores : {}).length;
                const cond = extractConditionRules(opt.conditions);
                const condCount = cond.scoreRules.length + cond.assetRules.length;
                const metaParts = [];
                metaParts.push(`${optTriggers.length} event${optTriggers.length === 1 ? '' : 's'}`);
                if (scoreCount > 0) metaParts.push(`${scoreCount} score effect${scoreCount === 1 ? '' : 's'}`);
                if (condCount > 0) metaParts.push(`${condCount} condition${condCount === 1 ? '' : 's'}`);
                return `
                    <div class="insp-summary-card kind-option" role="button" tabindex="0" data-drill-opt="${oIdx}" data-didx="${idx}">
                        <div class="insp-summary-card-main">
                            <div class="insp-summary-card-title">${escapeHtml(opt.text || `Option #${oIdx + 1}`)}</div>
                            <div class="insp-summary-card-meta">${escapeHtml(metaParts.join(' · '))}</div>
                        </div>
                        <div class="insp-summary-card-actions">
                            <button type="button" class="insp-icon-del-btn insp-btn-del-opt" data-didx="${idx}" data-oidx="${oIdx}" title="Remove option" aria-label="Remove option">&times;</button>
                            <span class="insp-summary-chevron">${renderIcon('chevron-right', 15)}</span>
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="insp-subview-nav">
                    <button type="button" class="insp-back-btn" id="insp-btn-back-root">&larr; <span>${escapeHtml(evTitle)}</span></button>
                    <button type="button" class="btn btn-danger text-xs insp-btn-del-dec" data-didx="${idx}">Remove Decision</button>
                </div>
                <div class="insp-subview-heading">Player Decision #${idx + 1}</div>
                <div class="field-group">
                    <label>Link Type</label>
                    <select class="form-control text-xs insp-link-type" data-kind="decision" data-idx="${idx}">
                        <option value="trigger">Auto-Trigger Next Event</option>
                        <option value="decision" selected>Player Decision</option>
                        <option value="unlock">Unlock Event / Action</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>Decision Prompt</label>
                    <input type="text" class="form-control text-xs insp-dec-prompt" data-didx="${idx}" value="${escapeHtml(decPrompt)}" placeholder="What action should be taken?">
                </div>
                <div class="field-group">
                    <label>Assigned Role(s)</label>
                    <div class="inspector-check-grid">
                        ${roles.map(r => {
                            const isChecked = assignedRoles.includes(r);
                            return `<label class="insp-check"><input type="checkbox" class="insp-dec-role-cb" data-didx="${idx}" value="${escapeHtml(r)}" ${isChecked ? 'checked' : ''}><span>${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</span></label>`;
                        }).join('') || '<span class="text-xs text-muted">No roles defined yet.</span>'}
                    </div>
                </div>

                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">

                <div class="insp-section-header">
                    <span class="insp-section-title">Choice Options (${opts.length})</span>
                    <button type="button" class="btn btn-primary text-xs inline-flex items-center gap-xs insp-btn-add-opt" data-didx="${idx}">
                        ${renderIcon('plus', 12)} <span>Add Option</span>
                    </button>
                </div>
                <div class="insp-summary-list">
                    ${optCards || '<div class="text-xs text-muted">No choice options yet. Click "Add Option".</div>'}
                </div>
            `;
        }
        return null;
    }

    function renderDecisionOptionSubview(ev, dIdx, oIdx) {
        const dec = (ev.decisions || [])[dIdx];
        const opt = dec?.options?.[oIdx];
        if (!dec || !opt) return null;

        const allEvents = getAllEvents();
        const optTriggers = getHelperTriggers(opt);
        const scoreEffects = (opt.effects && opt.effects.scores) ? opt.effects.scores : {};
        const optCond = extractConditionRules(opt.conditions);
        const optCondCount = optCond.scoreRules.length + optCond.assetRules.length;
        const decLabel = (dec.text || dec.prompt || '').trim() || `Decision #${dIdx + 1}`;

        return `
            <div class="insp-subview-nav">
                <button type="button" class="insp-back-btn" id="insp-btn-back-decision" data-didx="${dIdx}">&larr; <span>${escapeHtml(decLabel)}</span></button>
                <button type="button" class="btn btn-danger text-xs insp-btn-del-opt" data-didx="${dIdx}" data-oidx="${oIdx}">Remove Option</button>
            </div>
            <div class="insp-subview-heading">Choice Option #${oIdx + 1}</div>

            <div class="field-group">
                <label>Option Label</label>
                <input type="text" class="form-control text-xs insp-opt-text" data-didx="${dIdx}" data-oidx="${oIdx}" value="${escapeHtml(opt.text || '')}" placeholder="Describe the player choice...">
            </div>

            <div class="field-group">
                <div class="insp-sublist-header">
                    <label>Downstream Events (${optTriggers.length})</label>
                    <button type="button" class="btn btn-secondary text-xs insp-btn-add-opt-link" data-didx="${dIdx}" data-oidx="${oIdx}">+ Add Event</button>
                </div>
                <div class="insp-sublist">
                    ${optTriggers.length === 0 ? '<div class="text-xs text-muted">No downstream events linked.</div>' : optTriggers.map((tr, tIdx) => {
                        const targetId = typeof tr === 'string' ? tr : (tr.id || '');
                        const delaySec = (typeof tr === 'object' && tr && tr.delayMs !== undefined) ? Math.round(tr.delayMs / 1000) : 60;
                        return `
                            <div class="insp-sublist-row">
                                <select class="form-control text-xs insp-opt-link" data-didx="${dIdx}" data-oidx="${oIdx}" data-tidx="${tIdx}" aria-label="Downstream Event">
                                    <option value="">-- Select Event --</option>
                                    ${allEvents.filter(x => x.id !== ev.id).map(x => `<option value="${escapeHtml(x.id)}" ${x.id === targetId ? 'selected' : ''}>${escapeHtml(getNodeDisplayLabel(x, allEvents))}</option>`).join('')}
                                </select>
                                <input type="number" class="form-control text-xs insp-opt-delay" data-didx="${dIdx}" data-oidx="${oIdx}" data-tidx="${tIdx}" value="${delaySec}" min="0" step="5" aria-label="Delay in seconds" title="Delay (seconds)">
                                <span class="insp-sublist-unit">s</span>
                                <button type="button" class="btn btn-danger text-xs insp-sublist-del insp-btn-del-opt-link" data-didx="${dIdx}" data-oidx="${oIdx}" data-tidx="${tIdx}" title="Remove event link" aria-label="Remove event link">&times;</button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="field-group">
                <div class="insp-sublist-header">
                    <label>Score Effects (${Object.keys(scoreEffects).length})</label>
                    <button type="button" class="btn btn-secondary text-xs insp-btn-add-opt-score" data-didx="${dIdx}" data-oidx="${oIdx}">+ Add Effect</button>
                </div>
                <div class="insp-sublist">
                    ${renderScoreEffectRows(scoreEffects, `data-didx="${dIdx}" data-oidx="${oIdx}"`, 'insp-opt')}
                </div>
            </div>

            <details class="insp-opt-cond-details" ${optCondCount > 0 ? 'open' : ''}>
                <summary>
                    <span>Availability Conditions &mdash; Scores &amp; Assets (${optCondCount})</span>
                    <span class="text-xs text-muted">${optCondCount > 0 ? 'Restricted' : 'Always available'}</span>
                </summary>
                ${renderConditionsEditorHtml(opt.conditions, `data-didx="${dIdx}" data-oidx="${oIdx}"`, 'insp-opt')}
            </details>
        `;
    }

    // Slide-Out Inspector Drawer (Compact Summary + In-Drawer Drill-In)
    function openInspector(eventId, nextView, animDir) {
        const isSwitchingEvent = selectedEventId !== eventId;
        selectedEventId = eventId;
        if (nextView) {
            inspectorView = nextView;
        } else if (isSwitchingEvent) {
            inspectorView = { mode: 'root' };
        }

        const drawer = document.getElementById('event-inspector-drawer');
        const body = document.getElementById('inspector-body');
        if (!drawer || !body || !scenarioRef) return;

        const ev = (scenarioRef.eventTemplates || []).find(e => e.id === eventId);
        if (!ev) return;

        // Preserve open <details> panels when refreshing the same root view
        const preservedOpenIds = new Set();
        if (!isSwitchingEvent && inspectorView.mode === 'root') {
            body.querySelectorAll('details[id][open]').forEach(d => preservedOpenIds.add(d.id));
        }

        setupInspectorHeaderTitle(ev.name || ev.title || '', 'Untitled Event', (nextTitle) => {
            ev.name = nextTitle;
            ev.title = nextTitle;
            renderCanvasNodes();
            markDirty();
        });
        const subtitleEl = document.getElementById('inspector-subtitle');
        if (subtitleEl) subtitleEl.textContent = ev.id;
        const deleteLabel = document.getElementById('btn-delete-node-label');
        if (deleteLabel) deleteLabel.textContent = 'Delete Event';

        let html = null;
        if (inspectorView.mode === 'option') {
            html = renderDecisionOptionSubview(ev, inspectorView.dIdx, inspectorView.oIdx);
            if (!html) {
                inspectorView = { mode: 'link', kind: 'decision', idx: inspectorView.dIdx };
            }
        }
        if (!html && inspectorView.mode === 'link') {
            html = renderEventLinkSubview(ev, inspectorView.kind, inspectorView.idx);
            if (!html) {
                inspectorView = { mode: 'root' };
            }
        }
        if (!html) {
            html = renderEventRootView(ev, preservedOpenIds);
        }

        const animClass = animDir === 'forward' ? 'insp-anim-forward' : (animDir === 'back' ? 'insp-anim-back' : '');
        body.innerHTML = `<div class="${animClass}">${html}</div>`;
        if (animDir) body.scrollTop = 0;

        drawer.classList.add('open');
        window.common?.floatingBar?.setDrawerShift(true);
        renderCanvasNodes();
        bindInspectorControls(ev);
    }

    function bindInspectorControls(ev) {
        const body = document.getElementById('inspector-body');
        if (!body) return;

        const descInp = document.getElementById('insp-ev-desc');
        const soundInp = document.getElementById('insp-ev-sound');
        const openingCb = document.getElementById('insp-ev-opening');
        const endgameCb = document.getElementById('insp-ev-endgame');
        const unlockCb = document.getElementById('insp-ev-unlock');
        const repeatCb = document.getElementById('insp-ev-repeatable');
        const manualToggleCb = document.getElementById('insp-toggle-manual-action');
        const pickImgBtn = document.getElementById('insp-btn-pick-image');

        if (manualToggleCb) {
            manualToggleCb.addEventListener('change', () => {
                if (manualToggleCb.checked) {
                    convertEventToAction(ev);
                }
            });
        }

        if (openingCb) {
            openingCb.addEventListener('change', () => {
                if (!openingCb.checked) {
                    openingCb.checked = true;
                    return;
                }
                const currentOpener = (scenarioRef.eventTemplates || []).find(e => e.isOpeningEvent && e.id !== ev.id);
                if (currentOpener) {
                    const ok = confirm(`"${currentOpener.name || 'Current Opening Event'}" is currently the Opening Event. Transfer Opening Event to "${ev.name || 'this event'}"?`);
                    if (!ok) {
                        openingCb.checked = false;
                        return;
                    }
                    delete currentOpener.isOpeningEvent;
                }
                ev.isOpeningEvent = true;
                openingCb.disabled = true;
                renderCanvasNodes();
                markDirty();
                showToast(`"${ev.name || 'Event'}" set as Opening Event`, 'info');
            });
        }

        if (endgameCb) {
            endgameCb.addEventListener('change', () => {
                if (endgameCb.checked) ev.isEndGame = true;
                else delete ev.isEndGame;
                renderCanvasNodes();
                markDirty();
            });
        }

        if (descInp) {
            descInp.addEventListener('input', () => {
                if (typeof ev.description === 'object' && ev.description !== null) {
                    ev.description._general = descInp.value;
                } else {
                    ev.description = descInp.value;
                }
                markDirty();
            });
        }

        const aiDescBtn = document.getElementById('insp-btn-ai-desc');
        if (aiDescBtn && descInp) {
            aiDescBtn.addEventListener('click', async () => {
                if (typeof window.requestEditorAiBriefing !== 'function') return;
                const text = await window.requestEditorAiBriefing({
                    fieldType: 'event_description',
                    targetName: ev.name || ev.title || ev.id,
                    targetId: ev.id
                });
                if (text) {
                    descInp.value = text;
                    if (typeof ev.description === 'object' && ev.description !== null) {
                        ev.description._general = text;
                    } else {
                        ev.description = text;
                    }
                    markDirty();
                }
            });
        }

        if (soundInp) {
            soundInp.addEventListener('change', () => {
                if (soundInp.value.trim()) ev.sound = soundInp.value.trim();
                else delete ev.sound;
                markDirty();
            });
        }

        if (unlockCb) {
            unlockCb.addEventListener('change', () => {
                ev.requiresUnlock = unlockCb.checked;
                renderCanvasNodes();
                markDirty();
            });
        }

        if (repeatCb) {
            repeatCb.addEventListener('change', () => {
                ev.repeatable = repeatCb.checked;
                markDirty();
            });
        }

        if (pickImgBtn && window.EditorImagePicker) {
            pickImgBtn.addEventListener('click', () => {
                window.EditorImagePicker.open(ev.imageId || ev.image, (chosenId, chosenFile) => {
                    ev.image = chosenId;
                    ev.imageId = chosenId;
                    const thumb = document.getElementById('insp-img-preview');
                    const lbl = document.getElementById('insp-img-id-label');
                    if (thumb) thumb.src = chosenFile;
                    if (lbl) lbl.textContent = chosenId;
                    markDirty();
                });
            });
        }

        // Visible roles checkboxes
        const refreshVisPill = () => {
            const pill = body.querySelector('#insp-details-visibility .insp-summary-pill');
            if (pill) pill.textContent = buildVisibilitySummary(ev);
        };
        if (soundInp) soundInp.addEventListener('change', refreshVisPill);
        if (openingCb) openingCb.addEventListener('change', refreshVisPill);
        if (endgameCb) endgameCb.addEventListener('change', refreshVisPill);
        if (unlockCb) unlockCb.addEventListener('change', refreshVisPill);
        if (repeatCb) repeatCb.addEventListener('change', refreshVisPill);

        body.querySelectorAll('.insp-role-vis-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedRoles = Array.from(body.querySelectorAll('.insp-role-vis-cb:checked')).map(x => x.value);
                if (checkedRoles.length > 0) ev.visibleTo = checkedRoles;
                else delete ev.visibleTo;
                refreshVisPill();
                renderCanvasNodes();
                markDirty();
            });
        });

        // Drill-In Navigation (Root <-> Link/Decision <-> Choice Option)
        const backRootBtn = document.getElementById('insp-btn-back-root');
        if (backRootBtn) {
            backRootBtn.addEventListener('click', () => {
                openInspector(ev.id, { mode: 'root' }, 'back');
            });
        }

        const backDecBtn = document.getElementById('insp-btn-back-decision');
        if (backDecBtn) {
            backDecBtn.addEventListener('click', () => {
                const dIdx = Number(backDecBtn.getAttribute('data-didx'));
                openInspector(ev.id, { mode: 'link', kind: 'decision', idx: dIdx }, 'back');
            });
        }

        body.querySelectorAll('.insp-summary-card[data-drill-kind]').forEach(card => {
            const openLink = (e) => {
                if (e.target.closest('button')) return;
                const kind = card.getAttribute('data-drill-kind');
                const idx = Number(card.getAttribute('data-drill-idx'));
                openInspector(ev.id, { mode: 'link', kind, idx }, 'forward');
            };
            card.addEventListener('click', openLink);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLink(e);
                }
            });
        });

        body.querySelectorAll('.insp-summary-card[data-drill-opt]').forEach(card => {
            const openOpt = (e) => {
                if (e.target.closest('button')) return;
                const dIdx = Number(card.getAttribute('data-didx'));
                const oIdx = Number(card.getAttribute('data-drill-opt'));
                openInspector(ev.id, { mode: 'option', dIdx, oIdx }, 'forward');
            };
            card.addEventListener('click', openOpt);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openOpt(e);
                }
            });
        });

        // Unified Outgoing Links & Decisions: Add & immediately drill into the new link
        const handleAddLink = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!Array.isArray(ev.triggerEvents)) ev.triggerEvents = [];
            const candidate = getAllEvents().find(x => x.id !== ev.id);
            ev.triggerEvents.push({
                id: candidate ? candidate.id : '',
                delayMs: 90000,
                probability: 1
            });
            const newIdx = ev.triggerEvents.length - 1;
            openInspector(ev.id, { mode: 'link', kind: 'trigger', idx: newIdx }, 'forward');
            renderCanvasNodes();
            renderCanvasEdges();
            markDirty();
        };
        const addLinkBtn = document.getElementById('insp-btn-add-link');
        if (addLinkBtn) addLinkBtn.addEventListener('click', handleAddLink);

        // Convert link card type in-place (Auto-Trigger <-> Player Decision <-> Unlock Event / Action)
        body.querySelectorAll('.insp-link-type').forEach(sel => {
            sel.addEventListener('change', () => {
                const fromKind = sel.getAttribute('data-kind');
                const idx = Number(sel.getAttribute('data-idx'));
                const toKind = sel.value;
                if (!toKind || fromKind === toKind) return;

                let carriedTargetId = '';
                let carriedDelayMs = 60000;

                if (fromKind === 'trigger' && Array.isArray(ev.triggerEvents) && ev.triggerEvents[idx]) {
                    const tr = ev.triggerEvents.splice(idx, 1)[0];
                    carriedTargetId = typeof tr === 'string' ? tr : (tr.id || '');
                    carriedDelayMs = tr.delayMs !== undefined ? tr.delayMs : 60000;
                } else if (fromKind === 'decision' && Array.isArray(ev.decisions) && ev.decisions[idx]) {
                    const dec = ev.decisions.splice(idx, 1)[0];
                    const firstOpt = (dec.options || [])[0];
                    const firstTr = firstOpt ? getHelperTriggers(firstOpt)[0] : null;
                    if (firstTr) {
                        carriedTargetId = typeof firstTr === 'string' ? firstTr : (firstTr.id || '');
                        carriedDelayMs = firstTr.delayMs !== undefined ? firstTr.delayMs : 60000;
                    }
                } else if (fromKind === 'unlock' && Array.isArray(ev.autoEffects?.unlockEvents)) {
                    carriedTargetId = ev.autoEffects.unlockEvents.splice(idx, 1)[0] || '';
                }

                let nextIdx = 0;
                if (toKind === 'trigger') {
                    if (!Array.isArray(ev.triggerEvents)) ev.triggerEvents = [];
                    ev.triggerEvents.push({
                        id: carriedTargetId,
                        delayMs: carriedDelayMs,
                        probability: 1
                    });
                    nextIdx = ev.triggerEvents.length - 1;
                } else if (toKind === 'decision') {
                    if (!Array.isArray(ev.decisions)) ev.decisions = [];
                    const defaultRole = scenarioRef.roles && scenarioRef.roles[0] ? scenarioRef.roles[0] : '';
                    ev.decisions.push({
                        id: `dec_${ev.id}_${ev.decisions.length + 1}`,
                        role: defaultRole,
                        text: 'Choose response posture:',
                        visibleTo: defaultRole ? [defaultRole] : [],
                        options: [
                            {
                                id: 'opt_1',
                                text: 'Option A',
                                effects: {
                                    scores: {},
                                    triggerEvents: carriedTargetId ? [{ id: carriedTargetId, delayMs: carriedDelayMs }] : []
                                }
                            },
                            { id: 'opt_2', text: 'Option B', effects: { scores: {}, triggerEvents: [] } }
                        ]
                    });
                    nextIdx = ev.decisions.length - 1;
                } else if (toKind === 'unlock') {
                    if (!ev.autoEffects || typeof ev.autoEffects !== 'object') ev.autoEffects = {};
                    if (!Array.isArray(ev.autoEffects.unlockEvents)) ev.autoEffects.unlockEvents = [];
                    ev.autoEffects.unlockEvents.push(carriedTargetId);
                    nextIdx = ev.autoEffects.unlockEvents.length - 1;
                }

                openInspector(ev.id, { mode: 'link', kind: toKind, idx: nextIdx });
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-unlock-target').forEach(sel => {
            sel.addEventListener('change', () => {
                const idx = Number(sel.getAttribute('data-idx'));
                if (ev.autoEffects && Array.isArray(ev.autoEffects.unlockEvents)) {
                    ev.autoEffects.unlockEvents[idx] = sel.value;
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-btn-del-unlock').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const idx = Number(btn.getAttribute('data-idx'));
                if (ev.autoEffects && Array.isArray(ev.autoEffects.unlockEvents)) {
                    ev.autoEffects.unlockEvents.splice(idx, 1);
                    const wasInSubview = inspectorView.mode !== 'root';
                    openInspector(ev.id, { mode: 'root' }, wasInSubview ? 'back' : undefined);
                    renderCanvasNodes();
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        const ensureTriggerObj = (idx) => {
            if (!Array.isArray(ev.triggerEvents) || ev.triggerEvents[idx] === undefined) return null;
            if (typeof ev.triggerEvents[idx] === 'string') {
                ev.triggerEvents[idx] = { id: ev.triggerEvents[idx], delayMs: 60000, probability: 1 };
            }
            return ev.triggerEvents[idx];
        };

        body.querySelectorAll('.insp-tr-target').forEach(sel => {
            sel.addEventListener('change', () => {
                const tr = ensureTriggerObj(Number(sel.getAttribute('data-idx')));
                if (tr) {
                    tr.id = sel.value;
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-tr-delay').forEach(inp => {
            inp.addEventListener('input', () => {
                const tr = ensureTriggerObj(Number(inp.getAttribute('data-idx')));
                if (tr) {
                    tr.delayMs = Math.max(0, Number(inp.value || 0) * 1000);
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-tr-prob').forEach(inp => {
            inp.addEventListener('input', () => {
                const tr = ensureTriggerObj(Number(inp.getAttribute('data-idx')));
                if (tr) {
                    tr.probability = Math.min(1, Math.max(0.01, Number(inp.value || 1)));
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-btn-del-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const idx = Number(btn.getAttribute('data-idx'));
                ev.triggerEvents.splice(idx, 1);
                const wasInSubview = inspectorView.mode !== 'root';
                openInspector(ev.id, { mode: 'root' }, wasInSubview ? 'back' : undefined);
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-btn-del-dec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dIdx = Number(btn.getAttribute('data-didx'));
                ev.decisions.splice(dIdx, 1);
                const wasInSubview = inspectorView.mode !== 'root';
                openInspector(ev.id, { mode: 'root' }, wasInSubview ? 'back' : undefined);
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-dec-prompt').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                if (ev.decisions[dIdx]) {
                    ev.decisions[dIdx].text = inp.value;
                    ev.decisions[dIdx].prompt = inp.value;
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-dec-role-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const dIdx = Number(cb.getAttribute('data-didx'));
                if (ev.decisions[dIdx]) {
                    const checkedRoles = Array.from(body.querySelectorAll(`.insp-dec-role-cb[data-didx="${dIdx}"]:checked`)).map(x => x.value);
                    ev.decisions[dIdx].visibleTo = checkedRoles;
                    ev.decisions[dIdx].role = checkedRoles[0] || '';
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-btn-add-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                if (!ev.decisions[dIdx].options) ev.decisions[dIdx].options = [];
                const usedIds = new Set(ev.decisions[dIdx].options.map(o => o.id));
                let nextNum = ev.decisions[dIdx].options.length + 1;
                while (usedIds.has(`opt_${nextNum}`)) nextNum++;
                ev.decisions[dIdx].options.push({
                    id: `opt_${nextNum}`,
                    text: `Option ${nextNum}`,
                    effects: { scores: {}, triggerEvents: [] }
                });
                const newOIdx = ev.decisions[dIdx].options.length - 1;
                openInspector(ev.id, { mode: 'option', dIdx, oIdx: newOIdx }, 'forward');
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-btn-del-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                ev.decisions[dIdx].options.splice(oIdx, 1);
                const wasInOption = inspectorView.mode === 'option';
                openInspector(ev.id, { mode: 'link', kind: 'decision', idx: dIdx }, wasInOption ? 'back' : undefined);
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-opt-text').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                const oIdx = Number(inp.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                opt.text = inp.value;
                if (!opt.id) opt.id = `opt_${oIdx + 1}`;
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        // Normalize option triggerEvents into opt.effects.triggerEvents as objects
        const ensureOptionTriggerArray = (opt) => {
            const eff = ensureOptionEffects(opt);
            if (Array.isArray(opt.triggerEvents) && opt.triggerEvents.length > 0 && eff.triggerEvents.length === 0) {
                eff.triggerEvents = opt.triggerEvents.map(t => (typeof t === 'string' ? { id: t, delayMs: 60000 } : t));
            }
            delete opt.triggerEvents;
            eff.triggerEvents = eff.triggerEvents.map(t => (typeof t === 'string' ? { id: t, delayMs: 60000 } : t));
            return eff.triggerEvents;
        };

        body.querySelectorAll('.insp-btn-add-opt-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const arr = ensureOptionTriggerArray(opt);
                const candidate = getAllEvents().find(x => x.id !== ev.id && !arr.some(t => t.id === x.id))
                    || getAllEvents().find(x => x.id !== ev.id);
                arr.push({ id: candidate ? candidate.id : '', delayMs: 60000 });
                openInspector(ev.id);
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-btn-del-opt-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                const tIdx = Number(btn.getAttribute('data-tidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const arr = ensureOptionTriggerArray(opt);
                arr.splice(tIdx, 1);
                openInspector(ev.id);
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-opt-link').forEach(sel => {
            sel.addEventListener('change', () => {
                const dIdx = Number(sel.getAttribute('data-didx'));
                const oIdx = Number(sel.getAttribute('data-oidx'));
                const tIdx = Number(sel.getAttribute('data-tidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const arr = ensureOptionTriggerArray(opt);
                if (arr[tIdx]) {
                    arr[tIdx].id = sel.value;
                    renderCanvasNodes();
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-opt-delay').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                const oIdx = Number(inp.getAttribute('data-oidx'));
                const tIdx = Number(inp.getAttribute('data-tidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const arr = ensureOptionTriggerArray(opt);
                if (arr[tIdx]) {
                    arr[tIdx].delayMs = Math.max(0, Number(inp.value || 0) * 1000);
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        // Structured Score Effects (Decision Options)
        const syncOptionScoresFromDom = (dIdx, oIdx) => {
            const opt = ev.decisions[dIdx].options[oIdx];
            const eff = ensureOptionEffects(opt);
            const nextScores = {};
            const keySels = body.querySelectorAll(`.insp-opt-score-key[data-didx="${dIdx}"][data-oidx="${oIdx}"]`);
            keySels.forEach(sel => {
                const sIdx = sel.getAttribute('data-sidx');
                const valInp = body.querySelector(`.insp-opt-score-val[data-didx="${dIdx}"][data-oidx="${oIdx}"][data-sidx="${sIdx}"]`);
                const key = sel.value;
                const num = Number(valInp?.value ?? 0);
                if (key && Number.isFinite(num)) {
                    nextScores[key] = num;
                }
            });
            eff.scores = nextScores;
            markDirty();
        };

        body.querySelectorAll('.insp-btn-add-opt-score').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const eff = ensureOptionEffects(opt);
                const avail = getAvailableScoreKeys(eff.scores);
                const nextKey = avail.find(k => !(k in eff.scores)) || avail[0] || 'public_panic';
                eff.scores[nextKey] = (nextKey in eff.scores) ? eff.scores[nextKey] : -1;
                openInspector(ev.id);
                markDirty();
            });
        });

        body.querySelectorAll('.insp-btn-del-opt-score').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                const sIdx = Number(btn.getAttribute('data-sidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const eff = ensureOptionEffects(opt);
                const keys = Object.keys(eff.scores || {});
                if (keys[sIdx] !== undefined) {
                    delete eff.scores[keys[sIdx]];
                    openInspector(ev.id);
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-opt-score-key').forEach(sel => {
            sel.addEventListener('change', () => {
                syncOptionScoresFromDom(Number(sel.getAttribute('data-didx')), Number(sel.getAttribute('data-oidx')));
            });
        });

        body.querySelectorAll('.insp-opt-score-val').forEach(inp => {
            inp.addEventListener('input', () => {
                syncOptionScoresFromDom(Number(inp.getAttribute('data-didx')), Number(inp.getAttribute('data-oidx')));
            });
        });

        // Auto-trigger on conditions toggle (Event)
        const autoCondCb = document.getElementById('insp-ev-auto-cond');
        if (autoCondCb) {
            autoCondCb.addEventListener('change', () => {
                if (autoCondCb.checked) ev.autoTriggerOnConditions = true;
                else delete ev.autoTriggerOnConditions;
                openInspector(ev.id);
                renderCanvasNodes();
                markDirty();
            });
        }

        // Reusable Conditions Editor binder (used by Event Trigger Conditions & Decision Option Conditions)
        const bindConditionsGroup = (clsPrefix, getTargetFromEl) => {
            const syncTargetFromDom = (el) => {
                const targetObj = getTargetFromEl(el);
                if (!targetObj) return;
                const dAttr = el.getAttribute('data-didx');
                const oAttr = el.getAttribute('data-oidx');
                const scopeSel = (dAttr !== null && oAttr !== null) ? `[data-didx="${dAttr}"][data-oidx="${oAttr}"]` : '';

                const scoreRules = [];
                body.querySelectorAll(`.${clsPrefix}-cond-score-key${scopeSel}`).forEach(sel => {
                    const cIdx = sel.getAttribute('data-cidx');
                    const opEl = body.querySelector(`.${clsPrefix}-cond-score-op${scopeSel}[data-cidx="${cIdx}"]`);
                    const valEl = body.querySelector(`.${clsPrefix}-cond-score-val${scopeSel}[data-cidx="${cIdx}"]`);
                    scoreRules.push({
                        metric: sel.value,
                        op: opEl ? opEl.value : 'min',
                        value: Number(valEl?.value ?? 3)
                    });
                });

                const assetRules = [];
                body.querySelectorAll(`.${clsPrefix}-cond-asset-id${scopeSel}`).forEach(sel => {
                    const aIdx = sel.getAttribute('data-aidx');
                    const stEl = body.querySelector(`.${clsPrefix}-cond-asset-state${scopeSel}[data-aidx="${aIdx}"]`);
                    assetRules.push({
                        assetId: sel.value,
                        state: stEl ? stEl.value : 'operational'
                    });
                });

                applyConditionRulesToObject(targetObj, scoreRules, assetRules);
                markDirty();
            };

            body.querySelectorAll(`.${clsPrefix}-btn-add-cond-score`).forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetObj = getTargetFromEl(btn);
                    if (!targetObj) return;
                    const { scoreRules, assetRules } = extractConditionRules(targetObj.conditions);
                    const usedMetrics = new Set(scoreRules.map(r => r.metric));
                    const allKeys = getAvailableScoreKeys();
                    const nextKey = allKeys.find(k => !usedMetrics.has(k)) || allKeys[0] || 'public_panic';
                    scoreRules.push({ metric: nextKey, op: 'min', value: 3 });
                    applyConditionRulesToObject(targetObj, scoreRules, assetRules);
                    openInspector(ev.id);
                    markDirty();
                });
            });

            body.querySelectorAll(`.${clsPrefix}-btn-del-cond-score`).forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetObj = getTargetFromEl(btn);
                    if (!targetObj) return;
                    const cIdx = Number(btn.getAttribute('data-cidx'));
                    const { scoreRules, assetRules } = extractConditionRules(targetObj.conditions);
                    scoreRules.splice(cIdx, 1);
                    applyConditionRulesToObject(targetObj, scoreRules, assetRules);
                    openInspector(ev.id);
                    markDirty();
                });
            });

            body.querySelectorAll(`.${clsPrefix}-btn-add-cond-asset`).forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetObj = getTargetFromEl(btn);
                    if (!targetObj) return;
                    const assets = getScenarioAssets();
                    if (assets.length === 0) return;
                    const { scoreRules, assetRules } = extractConditionRules(targetObj.conditions);
                    const usedAssets = new Set(assetRules.map(r => r.assetId));
                    const nextAsset = assets.find(a => !usedAssets.has(a.id)) || assets[0];
                    assetRules.push({ assetId: nextAsset.id, state: 'operational' });
                    applyConditionRulesToObject(targetObj, scoreRules, assetRules);
                    openInspector(ev.id);
                    markDirty();
                });
            });

            body.querySelectorAll(`.${clsPrefix}-btn-del-cond-asset`).forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetObj = getTargetFromEl(btn);
                    if (!targetObj) return;
                    const aIdx = Number(btn.getAttribute('data-aidx'));
                    const { scoreRules, assetRules } = extractConditionRules(targetObj.conditions);
                    assetRules.splice(aIdx, 1);
                    applyConditionRulesToObject(targetObj, scoreRules, assetRules);
                    openInspector(ev.id);
                    markDirty();
                });
            });

            body.querySelectorAll(`.${clsPrefix}-cond-score-key, .${clsPrefix}-cond-score-op, .${clsPrefix}-cond-asset-id, .${clsPrefix}-cond-asset-state`).forEach(sel => {
                sel.addEventListener('change', () => syncTargetFromDom(sel));
            });

            body.querySelectorAll(`.${clsPrefix}-cond-score-val`).forEach(inp => {
                inp.addEventListener('input', () => syncTargetFromDom(inp));
            });
        };

        bindConditionsGroup('insp-ev', () => ev);
        bindConditionsGroup('insp-opt', (el) => {
            const dIdx = Number(el.getAttribute('data-didx'));
            const oIdx = Number(el.getAttribute('data-oidx'));
            return ev.decisions?.[dIdx]?.options?.[oIdx] || null;
        });
    }

    function closeInspector() {
        selectedEventId = null;
        inspectorView = { mode: 'root' };
        const drawer = document.getElementById('event-inspector-drawer');
        if (drawer) drawer.classList.remove('open');
        window.common?.floatingBar?.setDrawerShift(false);
        renderCanvasNodes();
    }

    function renderAccordionList() {
        const listEl = document.getElementById('events-accordion-list');
        if (!listEl || !scenarioRef) return;
        const events = scenarioRef.eventTemplates || [];

        if (events.length === 0) {
            listEl.innerHTML = `<div class="text-center text-muted" style="padding: 3rem;">No events in scenario. Click the + button to add a node.</div>`;
            return;
        }

        listEl.innerHTML = events.map(ev => {
            const triggersCount = (ev.triggerEvents || []).length;
            const decCount = (ev.decisions || []).length;
            return `
                <details class="event-accordion-item${ev.isEndGame ? ' endgame-item' : ''}">
                    <summary>
                        <div class="inline-flex items-center gap-sm">
                            ${ev.isOpeningEvent ? `<span class="badge badge-opening">Start</span>` : ''}
                            <span>${escapeHtml(ev.name || ev.title || 'Untitled Event')}</span>
                            ${ev.isEndGame ? `<span class="badge badge-endgame">End Game</span>` : ''}
                            ${ev.requiresUnlock ? `<span class="badge badge-inject">Inject</span>` : ''}
                        </div>
                        <div class="inline-flex items-center gap-xs">
                            <span class="badge" style="background: var(--bg-tertiary);">Triggers: ${triggersCount}</span>
                            <span class="badge" style="background: var(--bg-tertiary);">Decisions: ${decCount}</span>
                        </div>
                    </summary>
                    <div class="event-accordion-body">
                        <p class="text-sm text-secondary mb-2">${escapeHtml(typeof ev.description === 'string' ? ev.description : 'Dynamic description')}</p>
                        <button type="button" class="btn btn-primary text-xs btn-acc-inspect" data-id="${escapeHtml(ev.id)}">Open in Slide-Out Inspector</button>
                    </div>
                </details>
            `;
        }).join('');

        listEl.querySelectorAll('.btn-acc-inspect').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                setViewMode('canvas');
                openInspector(id);
            });
        });
    }

    function setViewMode(mode) {
        viewMode = mode;
        const canvasWrap = document.getElementById('events-canvas-wrapper');
        const accWrap = document.getElementById('events-accordion-wrapper');
        const btnCanvas = document.getElementById('btn-view-canvas');
        const btnAcc = document.getElementById('btn-view-accordion');

        if (mode === 'accordion') {
            if (canvasWrap) canvasWrap.style.display = 'none';
            if (accWrap) accWrap.style.display = 'block';
            btnCanvas?.classList.remove('active');
            btnAcc?.classList.add('active');
        } else {
            if (canvasWrap) canvasWrap.style.display = 'block';
            if (accWrap) accWrap.style.display = 'none';
            btnCanvas?.classList.add('active');
            btnAcc?.classList.remove('active');
        }
        render();
    }

    function convertEventToAction(ev) {
        if (!scenarioRef || !ev) return;
        if (ev.isOpeningEvent) {
            showToast('Transfer the Opening Event to another event before converting this node to a Manual Action.', 'error');
            const cb = document.getElementById('insp-toggle-manual-action');
            if (cb) cb.checked = false;
            return;
        }

        // Collect incoming predecessors from events that triggered this node
        const incomingPreds = [];
        getAllEvents().forEach(other => {
            if (!other || other.id === ev.id) return;
            if ((other.triggerEvents || []).some(t => (typeof t === 'string' ? t : t.id) === ev.id)) {
                incomingPreds.push(other.id);
                other.triggerEvents = other.triggerEvents.filter(t => (typeof t === 'string' ? t : t.id) !== ev.id);
            }
        });
        const existingPreds = getEventPrerequisites(ev);
        const allPreds = Array.from(new Set([...incomingPreds, ...existingPreds]));

        ev.isManualAction = true;
        if (!Array.isArray(ev.initiator) || ev.initiator.length === 0) {
            ev.initiator = scenarioRef.roles && scenarioRef.roles[0] ? [scenarioRef.roles[0]] : ['pm'];
        }
        if (allPreds.length > 0) {
            ev.conditions = { ...(ev.conditions || {}), triggeredEvents: allPreds };
        }
        if (!ev.effects) ev.effects = {};
        if (!Array.isArray(ev.effects.triggerEvents)) {
            ev.effects.triggerEvents = (ev.triggerEvents || []).map(t => (typeof t === 'string' ? { id: t, delayMs: 60000, probability: 1 } : t));
        }
        delete ev.triggerEvents;
        delete ev.decisions;
        delete ev.isEndGame;

        render();
        openActionInspector(ev.id);
        markDirty();
        showToast(`Converted "${ev.name || 'Node'}" to Manual Action`, 'info');
    }

    function convertActionToEvent(act) {
        if (!scenarioRef || !act) return;
        const outgoing = getActionTriggeredEvents(act);

        delete act.isManualAction;
        act.title = act.name || 'Untitled Event';
        act.triggerEvents = outgoing.map(tid => ({ id: tid, delayMs: 60000, probability: 1 }));
        if (!Array.isArray(act.decisions)) act.decisions = [];
        delete act.initiator;
        delete act.requiresApprovalFrom;
        if (act.effects) {
            delete act.effects.triggerEvents;
            if (Object.keys(act.effects).length === 0) delete act.effects;
        }

        render();
        openInspector(act.id);
        markDirty();
        showToast(`Converted "${act.name || 'Node'}" to Event Node`, 'info');
    }

    // Slide-Out Inspector for Manual Actions
    function openActionInspector(actionId) {
        selectedEventId = actionId;
        const drawer = document.getElementById('event-inspector-drawer');
        const body = document.getElementById('inspector-body');
        const subtitleEl = document.getElementById('inspector-subtitle');
        const deleteLabel = document.getElementById('btn-delete-node-label');
        if (!drawer || !body || !scenarioRef) return;

        const act = getAllActions().find(a => a.id === actionId);
        if (!act) return;

        setupInspectorHeaderTitle(act.name || '', 'Untitled Manual Action', (nextTitle) => {
            act.name = nextTitle;
            act.title = nextTitle;
            renderCanvasNodes();
            markDirty();
        });
        if (subtitleEl) {
            subtitleEl.textContent = '';
            subtitleEl.style.display = 'none';
        }
        if (deleteLabel) deleteLabel.textContent = 'Delete Manual Action';

        const allEvents = getAllEvents();
        const roles = scenarioRef.roles || [];

        const preds = getActionPredecessorEvents(act);
        const triggers = getActionTriggeredEvents(act);
        const effScores = (act.effects && act.effects.scores) ? act.effects.scores : {};

        body.innerHTML = `
            <div class="field-group">
                <div class="label-with-ai">
                    <label for="insp-act-desc">Action Description</label>
                    <button type="button" id="insp-btn-ai-act-desc" class="btn-ai-brief" title="Draft action description with AI">
                        ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                    </button>
                </div>
                <textarea id="insp-act-desc" class="form-control" rows="4" placeholder="Explain what taking this action entails...">${escapeHtml(act.description || '')}</textarea>
            </div>

            <div class="field-group">
                <label>Node Options</label>
                <div class="inspector-check-grid">
                    <label class="insp-check" title="Uncheck to convert back to a standard Event node">
                        <input type="checkbox" id="insp-toggle-manual-action" checked>
                        <span>Manual action</span>
                    </label>
                </div>
            </div>

            <!-- Initiator Roles -->
            <div class="field-group">
                <label>Allowed Initiator Role(s)</label>
                <div class="inspector-check-grid">
                    ${roles.map(r => {
                        const checked = Array.isArray(act.initiator) && act.initiator.includes(r);
                        return `<label class="insp-check"><input type="checkbox" class="insp-act-role-cb" value="${escapeHtml(r)}" ${checked ? 'checked' : ''}><span>${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</span></label>`;
                    }).join('') || '<span class="text-xs text-muted">No roles defined.</span>'}
                </div>
            </div>

            <!-- Predecessor Tree Activity: Makes this Action Available -->
            <div class="field-group">
                <label>Available After Event(s)</label>
                <p class="field-hint" style="margin-bottom: 0.4rem;">Select which event(s) make this action available to players.</p>
                <div class="inspector-check-stack" style="max-height: 160px; overflow-y: auto; padding-right: 0.25rem;">
                    ${allEvents.map(ev => {
                        const isChecked = preds.includes(ev.id);
                        return `
                            <label class="insp-check">
                                <input type="checkbox" class="insp-act-pred-cb" value="${escapeHtml(ev.id)}" ${isChecked ? 'checked' : ''}>
                                <span>${escapeHtml(getNodeDisplayLabel(ev, allEvents))}</span>
                            </label>
                        `;
                    }).join('') || '<span class="text-xs text-muted">No canvas events available.</span>'}
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1.1rem 0;">

            <!-- Downstream Triggered Events: Resulting from this action -->
            <div class="field-group">
                <label>Downstream Events Triggered by this Action</label>
                <p class="field-hint" style="margin-bottom: 0.4rem;">Select which event(s) execute when this action is taken.</p>
                <div class="inspector-check-stack" style="max-height: 160px; overflow-y: auto; padding-right: 0.25rem;">
                    ${allEvents.map(ev => {
                        const isChecked = triggers.includes(ev.id);
                        return `
                            <label class="insp-check">
                                <input type="checkbox" class="insp-act-trig-cb" value="${escapeHtml(ev.id)}" ${isChecked ? 'checked' : ''}>
                                <span>${escapeHtml(getNodeDisplayLabel(ev, allEvents))}</span>
                            </label>
                        `;
                    }).join('') || '<span class="text-xs text-muted">No canvas events available.</span>'}
                </div>
            </div>

            <!-- Score Effects -->
            <div class="field-group">
                <div class="insp-sublist-header">
                    <label>Score Effects (${Object.keys(effScores).length})</label>
                    <button type="button" id="insp-btn-add-act-score" class="btn btn-secondary text-xs">+ Add Effect</button>
                </div>
                <div class="insp-sublist" id="insp-act-scores-list">
                    ${renderScoreEffectRows(effScores, '', 'insp-act')}
                </div>
            </div>
        `;

        drawer.classList.add('open');
        window.common?.floatingBar?.setDrawerShift(true);
        renderCanvasNodes();

        // Bind Manual Action inspector controls
        const manualToggleCb = document.getElementById('insp-toggle-manual-action');
        const descInp = document.getElementById('insp-act-desc');
        const aiDescBtn = document.getElementById('insp-btn-ai-act-desc');

        if (manualToggleCb) {
            manualToggleCb.addEventListener('change', () => {
                if (!manualToggleCb.checked) {
                    convertActionToEvent(act);
                }
            });
        }

        if (descInp) {
            descInp.addEventListener('input', () => {
                act.description = descInp.value;
                markDirty();
            });
        }

        if (aiDescBtn && descInp) {
            aiDescBtn.addEventListener('click', async () => {
                if (typeof window.requestEditorAiBriefing !== 'function') return;
                const text = await window.requestEditorAiBriefing({
                    fieldType: 'action_description',
                    targetName: act.name || act.id,
                    targetId: act.id
                });
                if (text) {
                    descInp.value = text;
                    act.description = text;
                    markDirty();
                }
            });
        }

        body.querySelectorAll('.insp-act-pred-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedPreds = Array.from(body.querySelectorAll('.insp-act-pred-cb:checked')).map(x => x.value);
                if (!act.conditions) act.conditions = {};
                act.conditions.triggeredEvents = checkedPreds;
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-act-role-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedRoles = Array.from(body.querySelectorAll('.insp-act-role-cb:checked')).map(x => x.value);
                act.initiator = checkedRoles;
                markDirty();
            });
        });

        body.querySelectorAll('.insp-act-trig-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedTrigs = Array.from(body.querySelectorAll('.insp-act-trig-cb:checked')).map(x => x.value);
                if (!act.effects) act.effects = {};
                act.effects.triggerEvents = checkedTrigs;
                renderCanvasEdges();
                markDirty();
            });
        });

        // Structured Score Effects (Manual Action)
        const syncActionScoresFromDom = () => {
            if (!act.effects) act.effects = {};
            const nextScores = {};
            body.querySelectorAll('.insp-act-score-key').forEach(sel => {
                const sIdx = sel.getAttribute('data-sidx');
                const valInp = body.querySelector(`.insp-act-score-val[data-sidx="${sIdx}"]`);
                const key = sel.value;
                const num = Number(valInp?.value ?? 0);
                if (key && Number.isFinite(num)) {
                    nextScores[key] = num;
                }
            });
            act.effects.scores = nextScores;
            markDirty();
        };

        const addActScoreBtn = document.getElementById('insp-btn-add-act-score');
        if (addActScoreBtn) {
            addActScoreBtn.addEventListener('click', () => {
                if (!act.effects) act.effects = {};
                if (!act.effects.scores || typeof act.effects.scores !== 'object') act.effects.scores = {};
                const avail = getAvailableScoreKeys(act.effects.scores);
                const nextKey = avail.find(k => !(k in act.effects.scores)) || avail[0] || 'public_panic';
                act.effects.scores[nextKey] = (nextKey in act.effects.scores) ? act.effects.scores[nextKey] : -1;
                openActionInspector(act.id);
                markDirty();
            });
        }

        body.querySelectorAll('.insp-act-btn-del-score').forEach(btn => {
            btn.addEventListener('click', () => {
                const sIdx = Number(btn.getAttribute('data-sidx'));
                if (!act.effects || !act.effects.scores) return;
                const keys = Object.keys(act.effects.scores);
                if (keys[sIdx] !== undefined) {
                    delete act.effects.scores[keys[sIdx]];
                    openActionInspector(act.id);
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-act-score-key').forEach(sel => {
            sel.addEventListener('change', syncActionScoresFromDom);
        });

        body.querySelectorAll('.insp-act-score-val').forEach(inp => {
            inp.addEventListener('input', syncActionScoresFromDom);
        });
    }

    function createDragLink(source, targetId, targetType) {
        if (!scenarioRef || !source || !targetId || source.id === targetId) return;
        const srcTitle = getEventTitleById(source.id);
        const tgtTitle = getEventTitleById(targetId);

        if (source.type === 'event' && targetType === 'event') {
            const srcEv = (scenarioRef.eventTemplates || []).find(e => e.id === source.id);
            if (!srcEv) return;
            if (!Array.isArray(srcEv.triggerEvents)) srcEv.triggerEvents = [];
            const already = srcEv.triggerEvents.some(t => (typeof t === 'string' ? t : t.id) === targetId);
            if (already) {
                showToast(`"${srcTitle}" is already linked to "${tgtTitle}"`, 'info');
                return;
            }
            srcEv.triggerEvents.push({ id: targetId, delayMs: 60000, probability: 1 });
        } else if (source.type === 'event' && targetType === 'action') {
            const tgtAct = getAllActions().find(a => a.id === targetId);
            if (!tgtAct) return;
            if (!tgtAct.conditions) tgtAct.conditions = {};
            const preds = getActionPredecessorEvents(tgtAct);
            if (preds.includes(source.id)) {
                showToast(`"${srcTitle}" already unlocks "${tgtTitle}"`, 'info');
                return;
            }
            if (!Array.isArray(tgtAct.conditions.triggeredEvents)) tgtAct.conditions.triggeredEvents = [];
            tgtAct.conditions.triggeredEvents.push(source.id);
        } else if (source.type === 'action' && targetType === 'event') {
            const srcAct = getAllActions().find(a => a.id === source.id);
            if (!srcAct) return;
            if (!srcAct.effects) srcAct.effects = {};
            if (!Array.isArray(srcAct.effects.triggerEvents)) srcAct.effects.triggerEvents = [];
            const already = srcAct.effects.triggerEvents.some(t => (typeof t === 'string' ? t : (t.id || t.event)) === targetId);
            if (already) {
                showToast(`"${srcTitle}" already triggers "${tgtTitle}"`, 'info');
                return;
            }
            srcAct.effects.triggerEvents.push({ id: targetId, delayMs: 60000, probability: 1 });
        } else {
            showToast('Link Manual Actions to or from Event nodes.', 'info');
            return;
        }

        render();
        if (selectedEventId === source.id) {
            if (source.type === 'action') openActionInspector(source.id);
            else openInspector(source.id);
        }
        markDirty();
        showToast(`Linked "${srcTitle}" → "${tgtTitle}"`, 'success');
    }

    function addEventNode() {
        if (!scenarioRef) return;
        if (!Array.isArray(scenarioRef.eventTemplates)) scenarioRef.eventTemplates = [];
        const events = scenarioRef.eventTemplates;
        const idx = events.length + 1;
        const newId = idx === 1 ? 'ev_start' : `ev_event_${idx}_${Date.now().toString(36).slice(-3)}`;

        let defaultX = Math.round((160 - panX) / scale);
        let defaultY = Math.round((100 - panY) / scale);

        const predEv = selectedEventId ? events.find(e => e.id === selectedEventId) : events[events.length - 1];
        if (predEv && predEv._canvasPos) {
            defaultX = predEv._canvasPos.x + 360;
            defaultY = predEv._canvasPos.y;
            while (events.some(e => e._canvasPos && Math.abs(e._canvasPos.x - defaultX) < 120 && Math.abs(e._canvasPos.y - defaultY) < 130)) {
                defaultY += 185;
            }
        }

        const newEvent = {
            id: newId,
            name: idx === 1 ? 'Opening Crisis Event' : `Event ${idx}`,
            title: idx === 1 ? 'Opening Crisis Event' : `Event ${idx}`,
            description: 'Describe the situation unfolding...',
            triggerEvents: [],
            decisions: [],
            _canvasPos: {
                x: Math.max(40, Math.round(defaultX)),
                y: Math.max(40, Math.round(defaultY))
            }
        };
        if (idx === 1 && !events.some(e => e.isOpeningEvent)) {
            newEvent.isOpeningEvent = true;
        }
        events.push(newEvent);
        render();
        openInspector(newId);
        markDirty();
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (window.common && window.common.floatingBar) {
            const leftBar = document.getElementById('editor-float-left');
            const rightBar = document.getElementById('editor-float-right');
            const isEventsVisible = document.getElementById('panel-events')?.style.display !== 'none';
            if (leftBar) {
                window.common.floatingBar.addGroup('editor-canvas-left', { slot: 'left', order: 10, element: leftBar, visible: isEventsVisible });
            }
            if (rightBar) {
                window.common.floatingBar.addGroup('editor-canvas-right', { slot: 'right', order: 10, element: rightBar, visible: isEventsVisible });
            }
        }

        const wrapper = document.getElementById('events-canvas-wrapper');
        if (wrapper) {
            wrapper.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.inspector-drawer') || e.target.closest('.canvas-node') || e.target.closest('.floating-bar')) return;
                isPanning = true;
                panStartX = e.clientX - panX;
                panStartY = e.clientY - panY;
                wrapper.classList.add('panning');
            });

            window.addEventListener('pointermove', (e) => {
                if (linkingSource && scenarioRef) {
                    const rect = wrapper.getBoundingClientRect();
                    const mx = (e.clientX - rect.left - panX) / scale;
                    const my = (e.clientY - rect.top - panY) / scale;
                    const tempPath = document.getElementById('canvas-temp-link-path');
                    if (tempPath) {
                        tempPath.setAttribute('d', buildBezierPath(linkingSource.startX, linkingSource.startY, mx, my));
                    }
                    const under = document.elementFromPoint(e.clientX, e.clientY);
                    const targetNode = under ? under.closest('.canvas-node') : null;
                    if (hoveredLinkTargetEl && hoveredLinkTargetEl !== targetNode) {
                        hoveredLinkTargetEl.classList.remove('link-drop-target');
                    }
                    hoveredLinkTargetEl = null;
                    if (targetNode) {
                        const tid = targetNode.getAttribute('data-event-id') || targetNode.getAttribute('data-action-id');
                        if (tid && tid !== linkingSource.id) {
                            targetNode.classList.add('link-drop-target');
                            hoveredLinkTargetEl = targetNode;
                        }
                    }
                    return;
                }

                if (draggingNodeId && scenarioRef) {
                    hasDraggedNode = true;
                    const targetObj = (scenarioRef.eventTemplates || []).find(x => x.id === draggingNodeId);
                    if (targetObj) {
                        const rect = wrapper.getBoundingClientRect();
                        const mx = (e.clientX - rect.left - panX) / scale;
                        const my = (e.clientY - rect.top - panY) / scale;
                        targetObj._canvasPos = {
                            x: Math.max(10, Math.round(mx - dragOffsetX)),
                            y: Math.max(10, Math.round(my - dragOffsetY))
                        };
                        const selector = !targetObj.isManualAction
                            ? `.canvas-node[data-event-id="${CSS.escape(draggingNodeId)}"]`
                            : `.canvas-node[data-action-id="${CSS.escape(draggingNodeId)}"]`;
                        const nodeEl = document.querySelector(selector);
                        if (nodeEl) {
                            nodeEl.style.left = `${targetObj._canvasPos.x}px`;
                            nodeEl.style.top = `${targetObj._canvasPos.y}px`;
                        }
                        renderCanvasEdges();
                    }
                    return;
                }

                if (isPanning) {
                    panX = e.clientX - panStartX;
                    panY = e.clientY - panStartY;
                    applyTransform();
                }
            });

            window.addEventListener('pointerup', (e) => {
                if (linkingSource) {
                    const tempPath = document.getElementById('canvas-temp-link-path');
                    if (tempPath) {
                        tempPath.setAttribute('hidden', '');
                        tempPath.setAttribute('d', '');
                    }
                    if (hoveredLinkTargetEl) {
                        hoveredLinkTargetEl.classList.remove('link-drop-target');
                        hoveredLinkTargetEl = null;
                    }
                    const under = document.elementFromPoint(e.clientX, e.clientY);
                    const targetNode = under ? under.closest('.canvas-node') : null;
                    if (targetNode) {
                        const evTarget = targetNode.getAttribute('data-event-id');
                        const actTarget = targetNode.getAttribute('data-action-id');
                        if (evTarget) createDragLink(linkingSource, evTarget, 'event');
                        else if (actTarget) createDragLink(linkingSource, actTarget, 'action');
                    }
                    linkingSource = null;
                    return;
                }

                if (draggingNodeId) {
                    if (hasDraggedNode) {
                        markLayoutChanged();
                    }
                    draggingNodeId = null;
                }
                if (isPanning) {
                    isPanning = false;
                    wrapper.classList.remove('panning');
                    markLayoutChanged();
                }
            });
        }

        document.getElementById('btn-view-canvas')?.addEventListener('click', () => setViewMode('canvas'));
        document.getElementById('btn-view-accordion')?.addEventListener('click', () => setViewMode('accordion'));
        document.getElementById('btn-add-event-node')?.addEventListener('click', addEventNode);
        document.getElementById('btn-auto-layout-canvas')?.addEventListener('click', () => {
            ensureNodePositions(true);
            render();
            markLayoutChanged();
            showToast('Events arranged into narrative flow columns', 'info');
        });

        document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
            scale = Math.min(1.75, +(scale + 0.15).toFixed(2));
            applyTransform();
            markLayoutChanged();
        });
        document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
            scale = Math.max(0.4, +(scale - 0.15).toFixed(2));
            applyTransform();
            markLayoutChanged();
        });
        document.getElementById('btn-zoom-reset')?.addEventListener('click', () => {
            scale = 1;
            panX = 40;
            panY = 40;
            applyTransform();
            markLayoutChanged();
        });

        document.getElementById('btn-close-inspector')?.addEventListener('click', closeInspector);
        document.getElementById('btn-done-inspector')?.addEventListener('click', closeInspector);
        document.getElementById('btn-delete-event')?.addEventListener('click', () => {
            if (!selectedEventId || !scenarioRef) return;
            const nodeIdx = (scenarioRef.eventTemplates || []).findIndex(x => x.id === selectedEventId);
            if (nodeIdx !== -1) {
                const isAct = Boolean(scenarioRef.eventTemplates[nodeIdx]?.isManualAction);
                scenarioRef.eventTemplates.splice(nodeIdx, 1);
                closeInspector();
                render();
                markDirty();
                showToast(isAct ? 'Manual Action deleted from scenario' : 'Event deleted from scenario', 'info');
            }
        });
    });

    window.EditorCanvas = {
        init,
        render,
        openInspector,
        closeInspector
    };
})();
