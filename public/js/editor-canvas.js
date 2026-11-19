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
        buildEdgesSvg
    } = window.FlowGraph;

    let scenarioRef = null;
    let onDirtyCallback = null;
    let selectedEventId = null;
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

        (scenarioRef.manualActions || []).forEach(act => {
            if (savedPositions[act.id] && typeof savedPositions[act.id].x === 'number' && typeof savedPositions[act.id].y === 'number') {
                act._canvasPos = {
                    x: Number(savedPositions[act.id].x),
                    y: Number(savedPositions[act.id].y)
                };
            } else if (!savedLayout) {
                delete act._canvasPos;
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

        (scenarioRef.manualActions || []).forEach(act => {
            if (act && act.id && act._canvasPos && typeof act._canvasPos.x === 'number' && typeof act._canvasPos.y === 'number') {
                positions[act.id] = {
                    x: Math.round(act._canvasPos.x),
                    y: Math.round(act._canvasPos.y)
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

    function init(scenario, onDirty) {
        scenarioRef = scenario;
        onDirtyCallback = onDirty;
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
        if (!Array.isArray(scenarioRef.manualActions)) scenarioRef.manualActions = [];

        const events = scenarioRef.eventTemplates;
        const actions = scenarioRef.manualActions;
        if (events.length === 0 && actions.length === 0) return;

        const needsLayout = forceRecalculate ||
            events.some(e => !e._canvasPos || typeof e._canvasPos.x !== 'number' || typeof e._canvasPos.y !== 'number') ||
            actions.some(a => !a._canvasPos || typeof a._canvasPos.x !== 'number' || typeof a._canvasPos.y !== 'number');
        if (!needsLayout) return;

        const posMap = computeLayout(events, actions, { forceRecalculate });
        events.forEach(ev => {
            const target = posMap.get(ev.id) || { x: 60, y: 60 };
            ev._canvasPos = { x: target.x, y: target.y };
        });
        actions.forEach(act => {
            const target = posMap.get(act.id) || { x: 60, y: 60 };
            act._canvasPos = { x: target.x, y: target.y };
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

        const events = scenarioRef.eventTemplates || [];
        const actions = scenarioRef.manualActions || [];

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
            const isRoot = idx === 0 || ev.id === 'ev_start';
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
                        <code>${escapeHtml(ev.id)}</code>
                        <div class="inline-flex items-center gap-xs">
                            ${ev.isEndGame ? `<span class="badge badge-endgame">🏁 End Game</span>` : ''}
                            ${ev.requiresUnlock ? `<span class="badge badge-inject">Inject</span>` : ''}
                            ${ev.stage ? `<span class="badge badge-stage">${escapeHtml(ev.stage)}</span>` : ''}
                            <span class="canvas-port" title="Click node to inspect & link events"></span>
                        </div>
                    </div>
                    <div class="canvas-node-title">${escapeHtml(ev.name || ev.title || 'Untitled Event')}</div>
                    <div class="canvas-node-meta">
                        ${triggersCount > 0 ? `<span class="badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 0.68rem;">Triggers: ${triggersCount}</span>` : ''}
                        ${hasDecisions ? `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.68rem;">Decisions: ${ev.decisions.length}</span>` : ''}
                        ${ev.visibleTo ? `<span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; font-size: 0.68rem;">Role-Restricted</span>` : ''}
                    </div>
                    ${optionsHtml}
                </div>
            `;
        }).join('');

        // BR-35: Render Manual Action nodes on the canvas
        const actionsHtml = actions.map((act, idx) => {
            const pos = act._canvasPos || { x: 60 + (idx % 4) * 340, y: 350 + Math.floor(idx / 4) * 160 };
            const isSelected = act.id === selectedEventId;
            const nodeClass = [
                'canvas-node',
                'action-node',
                isSelected ? 'selected' : ''
            ].filter(Boolean).join(' ');

            const preds = getActionPredecessorEvents(act);
            const tgts = getActionTriggeredEvents(act);

            return `
                <div class="${nodeClass}" data-action-id="${escapeHtml(act.id)}" style="left: ${Math.round(pos.x)}px; top: ${Math.round(pos.y)}px;">
                    <div class="canvas-node-header">
                        <code>${escapeHtml(act.id)}</code>
                        <div class="inline-flex items-center gap-xs">
                            <span class="badge" style="background: rgba(245, 158, 11, 0.25); color: #fbbf24; font-size: 0.65rem;">Manual Action</span>
                            <span class="canvas-port" style="background: #f59e0b;" title="Click node to inspect & link action"></span>
                        </div>
                    </div>
                    <div class="canvas-node-title">${escapeHtml(act.name || act.id)}</div>
                    <div class="canvas-node-meta">
                        ${preds.length > 0 ? `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: #cbd5e1; font-size: 0.68rem;">After: ${preds.join(', ')}</span>` : `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.68rem;">Always Available</span>`}
                        ${tgts.length > 0 ? `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 0.68rem;">Triggers: ${tgts.length}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        layer.innerHTML = eventsHtml + actionsHtml;

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
                const actObj = (scenarioRef.manualActions || []).find(x => x.id === actId);
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

        const events = scenarioRef.eventTemplates || [];
        const actions = scenarioRef.manualActions || [];
        group.innerHTML = buildEdgesSvg(events, actions, null, { escapeHtml });
    }

    // Slide-Out Inspector Drawer
    function openInspector(eventId) {
        selectedEventId = eventId;
        const drawer = document.getElementById('event-inspector-drawer');
        const body = document.getElementById('inspector-body');
        if (!drawer || !body || !scenarioRef) return;

        const ev = (scenarioRef.eventTemplates || []).find(e => e.id === eventId);
        if (!ev) return;

        document.getElementById('inspector-title').textContent = ev.name || ev.title || 'Event Details';
        document.getElementById('inspector-subtitle').textContent = ev.id;
        const deleteLabel = document.getElementById('btn-delete-node-label');
        if (deleteLabel) deleteLabel.textContent = 'Delete Event';

        const allEvents = scenarioRef.eventTemplates || [];
        const roles = scenarioRef.roles || [];
        const scoreKeys = Object.keys(scenarioRef.initialScores || {});
        const imgId = ev.imageId || ev.image || '';
        const imgUrl = window.EditorImagePicker ? window.EditorImagePicker.resolveImageUrl(imgId) : '/images/favicon.png';

        const descVal = typeof ev.description === 'string' ? ev.description : '';
        const triggers = Array.isArray(ev.triggerEvents) ? ev.triggerEvents : [];
        const decisions = Array.isArray(ev.decisions) ? ev.decisions : [];

        body.innerHTML = `
            <div class="field-row">
                <div class="field-group">
                    <label for="insp-ev-name">Event Title *</label>
                    <input type="text" id="insp-ev-name" class="form-control" value="${escapeHtml(ev.name || ev.title || '')}">
                </div>
                <div class="field-group">
                    <label for="insp-ev-id">Event ID *</label>
                    <input type="text" id="insp-ev-id" class="form-control" autocorrect="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(ev.id)}">
                </div>
            </div>

            <div class="field-group">
                <label>Event Artwork (Shared Image Library)</label>
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
                    <label for="insp-ev-desc">General Narrative Description</label>
                    <button type="button" id="insp-btn-ai-desc" class="btn-ai-brief" title="Draft narrative event description with AI">
                        ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                    </button>
                </div>
                <textarea id="insp-ev-desc" class="form-control" rows="6" placeholder="Event intelligence report shown to players...">${escapeHtml(descVal)}</textarea>
            </div>

            <div class="field-row">
                <div class="field-group">
                    <label for="insp-ev-stage">Stage ID (Optional)</label>
                    <input type="text" id="insp-ev-stage" class="form-control" autocorrect="off" spellcheck="false" value="${escapeHtml(ev.stage || '')}" placeholder="e.g. stage_1">
                </div>
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
            </div>

            <div class="field-row" style="margin-bottom: 1rem;">
                <label class="inline-flex items-center gap-xs text-sm cursor-pointer">
                    <input type="checkbox" id="insp-ev-unlock" ${ev.requiresUnlock ? 'checked' : ''}>
                    <span>Facilitator Inject (Requires Unlock)</span>
                </label>
                <label class="inline-flex items-center gap-xs text-sm cursor-pointer">
                    <input type="checkbox" id="insp-ev-repeatable" ${ev.repeatable ? 'checked' : ''}>
                    <span>Repeatable Event</span>
                </label>
            </div>

            <!-- Role Visibility (Fog of War) -->
            <div class="field-group">
                <label>Visible To Roles (Leave unchecked for all roles)</label>
                <div class="flex-center gap-sm flex-wrap" id="insp-visible-roles" style="justify-content: flex-start;">
                    ${roles.map(r => {
                        const checked = Array.isArray(ev.visibleTo) && ev.visibleTo.includes(r) ? 'checked' : '';
                        return `<label class="inline-flex items-center gap-xs text-xs"><input type="checkbox" class="insp-role-vis-cb" value="${escapeHtml(r)}" ${checked}> <span>${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</span></label>`;
                    }).join('') || '<span class="text-xs text-muted">No roles defined yet.</span>'}
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1.1rem 0;">

            <!-- Outgoing Event Links (triggerEvents) - Collapsible (BR-26) -->
            <details class="inspector-collapsible" id="insp-details-triggers" open>
                <summary>
                    <span class="inline-flex items-center gap-xs text-xs">
                        <span class="collapsible-caret">${renderIcon('chevron-right', 14)}</span>
                        <span>Auto-Triggered Next Events (${triggers.length})</span>
                    </span>
                    <button type="button" id="insp-btn-add-trigger" class="btn btn-secondary text-xs inline-flex items-center gap-xs">
                        ${renderIcon('link', 12)} <span>Link Event</span>
                    </button>
                </summary>
                <div class="inspector-collapsible-body">
                    <div id="insp-triggers-list" class="editor-item-list">
                        ${triggers.map((tr, tIdx) => {
                            const tId = typeof tr === 'string' ? tr : (tr.id || '');
                            const delaySec = Math.round(((tr.delayMs !== undefined ? tr.delayMs : 90000) / 1000));
                            const probVal = tr.probability !== undefined ? tr.probability : 1;
                            return `
                                <div class="editor-item-card" data-trigger-idx="${tIdx}">
                                    <div class="field-row" style="align-items: end;">
                                        <div class="field-group" style="margin-bottom: 0;">
                                            <label>Target Event</label>
                                            <select class="form-control text-xs insp-tr-target" data-idx="${tIdx}">
                                                <option value="">-- Select Target Event --</option>
                                                ${allEvents.filter(x => x.id !== ev.id).map(x => `<option value="${escapeHtml(x.id)}" ${x.id === tId ? 'selected' : ''}>${escapeHtml(x.name || x.id)} (${escapeHtml(x.id)})</option>`).join('')}
                                            </select>
                                        </div>
                                        <div class="field-group" style="margin-bottom: 0;">
                                            <label>Delay (sec)</label>
                                            <input type="number" class="form-control text-xs insp-tr-delay" data-idx="${tIdx}" value="${delaySec}" min="0" step="5">
                                        </div>
                                        <div class="field-group" style="margin-bottom: 0;">
                                            <label>Probability (0-1)</label>
                                            <input type="number" class="form-control text-xs insp-tr-prob" data-idx="${tIdx}" value="${probVal}" min="0.05" max="1" step="0.05">
                                        </div>
                                    </div>
                                    <div style="text-align: right; margin-top: 0.4rem;">
                                        <button type="button" class="btn btn-danger text-xs insp-btn-del-trigger" data-idx="${tIdx}">Unlink</button>
                                    </div>
                                </div>
                            `;
                        }).join('') || '<div class="text-xs text-muted">No automatic outgoing triggers.</div>'}
                    </div>
                </div>
            </details>

            <!-- Decisions & Linked Options - Collapsible (BR-26) -->
            <details class="inspector-collapsible" id="insp-details-decisions" open>
                <summary>
                    <span class="inline-flex items-center gap-xs text-xs">
                        <span class="collapsible-caret">${renderIcon('chevron-right', 14)}</span>
                        <span>Player Decisions &amp; Branching Options (${decisions.length})</span>
                    </span>
                    <button type="button" id="insp-btn-add-decision" class="btn btn-primary text-xs inline-flex items-center gap-xs">
                        ${renderIcon('plus', 12)} <span>Add Decision</span>
                    </button>
                </summary>
                <div class="inspector-collapsible-body">
                    <div id="insp-decisions-list" class="editor-item-list">
                        ${decisions.map((dec, dIdx) => `
                            <details class="decision-card-collapsible" style="border-left: 3px solid #10b981;" open>
                                <summary>
                                    <span class="inline-flex items-center gap-xs text-xs">
                                        <span class="collapsible-caret">${renderIcon('chevron-right', 13)}</span>
                                        <strong>Decision #${dIdx + 1}: ${escapeHtml(dec.prompt ? (dec.prompt.length > 36 ? dec.prompt.slice(0, 36) + '…' : dec.prompt) : 'Untitled')}</strong>
                                    </span>
                                    <button type="button" class="btn btn-danger text-xs insp-btn-del-dec" data-didx="${dIdx}">Remove Decision</button>
                                </summary>
                                <div class="decision-card-collapsible-body">
                                    <div class="field-group">
                                        <label>Decision Prompt</label>
                                        <input type="text" class="form-control text-xs insp-dec-prompt" data-didx="${dIdx}" value="${escapeHtml(dec.prompt || '')}" placeholder="What action should be taken?">
                                    </div>
                                    <div class="field-group">
                                        <label>Assigned Role(s) (Comma-separated role IDs)</label>
                                        <input type="text" class="form-control text-xs insp-dec-roles" data-didx="${dIdx}" value="${escapeHtml((dec.visibleTo || []).join(', '))}" placeholder="e.g. mayor, defence">
                                    </div>
                                    <div class="editor-item-list" style="margin-top: 0.5rem;">
                                        ${(dec.options || []).map((opt, oIdx) => {
                                            if (!opt.id) opt.id = `opt_${oIdx + 1}`;
                                            const optTriggers = getHelperTriggers(opt);
                                            const firstTarget = optTriggers[0] ? (typeof optTriggers[0] === 'string' ? optTriggers[0] : optTriggers[0].id) : '';
                                            const firstDelay = optTriggers[0] && optTriggers[0].delayMs ? Math.round(optTriggers[0].delayMs / 1000) : 60;
                                            const scoreEffects = (opt.effects && opt.effects.scores) ? opt.effects.scores : {};
                                            const scoreSummary = Object.entries(scoreEffects).map(([k, v]) => `${k}:${v}`).join(', ');

                                            return `
                                                <div style="background: var(--bg-secondary); padding: 0.65rem; border-radius: 4px; border: 1px solid var(--border-color);">
                                                    <div class="field-group" style="margin-bottom: 0.4rem;">
                                                        <label>Option #${oIdx + 1} Label</label>
                                                        <input type="text" class="form-control text-xs insp-opt-text" data-didx="${dIdx}" data-oidx="${oIdx}" value="${escapeHtml(opt.text || '')}" placeholder="Describe the player choice...">
                                                    </div>
                                                    <div class="field-row">
                                                        <div class="field-group" style="margin-bottom: 0.4rem;">
                                                            <label>Link to Downstream Event</label>
                                                            <select class="form-control text-xs insp-opt-link" data-didx="${dIdx}" data-oidx="${oIdx}">
                                                                <option value="">-- None --</option>
                                                                ${allEvents.filter(x => x.id !== ev.id).map(x => `<option value="${escapeHtml(x.id)}" ${x.id === firstTarget ? 'selected' : ''}>${escapeHtml(x.name || x.id)} (${escapeHtml(x.id)})</option>`).join('')}
                                                            </select>
                                                        </div>
                                                        <div class="field-group" style="margin-bottom: 0.4rem;">
                                                            <label>Link Delay (sec)</label>
                                                            <input type="number" class="form-control text-xs insp-opt-delay" data-didx="${dIdx}" data-oidx="${oIdx}" value="${firstDelay}" min="0" step="5">
                                                        </div>
                                                    </div>
                                                    <div class="field-group" style="margin-bottom: 0.35rem;">
                                                        <label>Score Effects (e.g. ${escapeHtml(scoreKeys[0] || 'public_panic')}:-1, ${escapeHtml(scoreKeys[1] || 'emergency_capacity')}:1)</label>
                                                        <input type="text" class="form-control text-xs insp-opt-scores" data-didx="${dIdx}" data-oidx="${oIdx}" value="${escapeHtml(scoreSummary)}" placeholder="metric:delta, metric2:delta">
                                                    </div>
                                                    <div style="text-align: right;">
                                                        <button type="button" class="btn btn-danger text-xs insp-btn-del-opt" data-didx="${dIdx}" data-oidx="${oIdx}">Remove Option</button>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                        <button type="button" class="btn btn-secondary text-xs insp-btn-add-opt" data-didx="${dIdx}">+ Add Choice Option</button>
                                    </div>
                                </div>
                            </details>
                        `).join('') || '<div class="text-xs text-muted">No player decisions attached to this event.</div>'}
                    </div>
                </div>
            </details>
        `;

        drawer.classList.add('open');
        renderCanvasNodes();
        bindInspectorControls(ev);
    }

    function bindInspectorControls(ev) {
        const body = document.getElementById('inspector-body');
        if (!body) return;

        const nameInp = document.getElementById('insp-ev-name');
        const idInp = document.getElementById('insp-ev-id');
        const descInp = document.getElementById('insp-ev-desc');
        const stageInp = document.getElementById('insp-ev-stage');
        const soundInp = document.getElementById('insp-ev-sound');
        const unlockCb = document.getElementById('insp-ev-unlock');
        const repeatCb = document.getElementById('insp-ev-repeatable');
        const pickImgBtn = document.getElementById('insp-btn-pick-image');

        if (nameInp) {
            nameInp.addEventListener('input', () => {
                ev.name = nameInp.value;
                ev.title = nameInp.value;
                document.getElementById('inspector-title').textContent = ev.name || 'Event Details';
                renderCanvasNodes();
                markDirty();
            });
        }

        if (idInp) {
            idInp.addEventListener('change', () => {
                const newId = idInp.value.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
                if (!newId || newId === ev.id) return;
                const oldId = ev.id;
                ev.id = newId;
                selectedEventId = newId;
                // Update any references pointing to oldId
                (scenarioRef.eventTemplates || []).forEach(other => {
                    (other.triggerEvents || []).forEach(tr => {
                        if (tr.id === oldId) tr.id = newId;
                    });
                    (other.decisions || []).forEach(d => {
                        (d.options || []).forEach(o => {
                            getHelperTriggers(o).forEach(tr => {
                                if (tr.id === oldId) tr.id = newId;
                            });
                        });
                    });
                });
                document.getElementById('inspector-subtitle').textContent = newId;
                render();
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

        if (stageInp) {
            stageInp.addEventListener('input', () => {
                if (stageInp.value.trim()) ev.stage = stageInp.value.trim();
                else delete ev.stage;
                renderCanvasNodes();
                markDirty();
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
        body.querySelectorAll('.insp-role-vis-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedRoles = Array.from(body.querySelectorAll('.insp-role-vis-cb:checked')).map(x => x.value);
                if (checkedRoles.length > 0) ev.visibleTo = checkedRoles;
                else delete ev.visibleTo;
                renderCanvasNodes();
                markDirty();
            });
        });

        // Outgoing triggers
        const addTrBtn = document.getElementById('insp-btn-add-trigger');
        if (addTrBtn) {
            addTrBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!Array.isArray(ev.triggerEvents)) ev.triggerEvents = [];
                const candidate = (scenarioRef.eventTemplates || []).find(x => x.id !== ev.id);
                ev.triggerEvents.push({
                    id: candidate ? candidate.id : '',
                    delayMs: 90000,
                    probability: 1
                });
                openInspector(ev.id);
                renderCanvasEdges();
                markDirty();
            });
        }

        body.querySelectorAll('.insp-tr-target').forEach(sel => {
            sel.addEventListener('change', () => {
                const idx = Number(sel.getAttribute('data-idx'));
                if (ev.triggerEvents && ev.triggerEvents[idx]) {
                    ev.triggerEvents[idx].id = sel.value;
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-tr-delay').forEach(inp => {
            inp.addEventListener('input', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                if (ev.triggerEvents && ev.triggerEvents[idx]) {
                    ev.triggerEvents[idx].delayMs = Math.max(0, Number(inp.value || 0) * 1000);
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-tr-prob').forEach(inp => {
            inp.addEventListener('input', () => {
                const idx = Number(inp.getAttribute('data-idx'));
                if (ev.triggerEvents && ev.triggerEvents[idx]) {
                    ev.triggerEvents[idx].probability = Math.min(1, Math.max(0.01, Number(inp.value || 1)));
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-btn-del-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-idx'));
                ev.triggerEvents.splice(idx, 1);
                openInspector(ev.id);
                renderCanvasEdges();
                markDirty();
            });
        });

        // Decisions & Options
        const addDecBtn = document.getElementById('insp-btn-add-decision');
        if (addDecBtn) {
            addDecBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!Array.isArray(ev.decisions)) ev.decisions = [];
                ev.decisions.push({
                    id: `dec_${ev.id}_${ev.decisions.length + 1}`,
                    prompt: 'Choose response posture:',
                    visibleTo: scenarioRef.roles && scenarioRef.roles[0] ? [scenarioRef.roles[0]] : [],
                    options: [
                        { id: 'opt_1', text: 'Option A', effects: { scores: {}, triggerEvents: [] } },
                        { id: 'opt_2', text: 'Option B', effects: { scores: {}, triggerEvents: [] } }
                    ]
                });
                openInspector(ev.id);
                renderCanvasEdges();
                markDirty();
            });
        }

        body.querySelectorAll('.insp-btn-del-dec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dIdx = Number(btn.getAttribute('data-didx'));
                ev.decisions.splice(dIdx, 1);
                openInspector(ev.id);
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-dec-prompt').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                if (ev.decisions[dIdx]) {
                    ev.decisions[dIdx].prompt = inp.value;
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-dec-roles').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                if (ev.decisions[dIdx]) {
                    const arr = inp.value.split(',').map(s => s.trim()).filter(Boolean);
                    ev.decisions[dIdx].visibleTo = arr;
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
                openInspector(ev.id);
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-btn-del-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = Number(btn.getAttribute('data-didx'));
                const oIdx = Number(btn.getAttribute('data-oidx'));
                ev.decisions[dIdx].options.splice(oIdx, 1);
                openInspector(ev.id);
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

        body.querySelectorAll('.insp-opt-link').forEach(sel => {
            sel.addEventListener('change', () => {
                const dIdx = Number(sel.getAttribute('data-didx'));
                const oIdx = Number(sel.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const eff = ensureOptionEffects(opt);
                const delayInput = body.querySelector(`.insp-opt-delay[data-didx="${dIdx}"][data-oidx="${oIdx}"]`);
                const delayMs = Math.max(0, Number(delayInput?.value || 60) * 1000);
                if (sel.value) {
                    eff.triggerEvents = [{ id: sel.value, delayMs }];
                } else {
                    eff.triggerEvents = [];
                }
                delete opt.triggerEvents;
                renderCanvasNodes();
                renderCanvasEdges();
                markDirty();
            });
        });

        body.querySelectorAll('.insp-opt-delay').forEach(inp => {
            inp.addEventListener('input', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                const oIdx = Number(inp.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const eff = ensureOptionEffects(opt);
                if (eff.triggerEvents.length > 0) {
                    eff.triggerEvents[0].delayMs = Math.max(0, Number(inp.value || 0) * 1000);
                    renderCanvasEdges();
                    markDirty();
                }
            });
        });

        body.querySelectorAll('.insp-opt-scores').forEach(inp => {
            inp.addEventListener('change', () => {
                const dIdx = Number(inp.getAttribute('data-didx'));
                const oIdx = Number(inp.getAttribute('data-oidx'));
                const opt = ev.decisions[dIdx].options[oIdx];
                const eff = ensureOptionEffects(opt);
                const scoresObj = {};
                inp.value.split(',').forEach(pair => {
                    const [k, v] = pair.split(':').map(s => s.trim());
                    if (k && !Number.isNaN(Number(v))) {
                        scoresObj[k] = Number(v);
                    }
                });
                eff.scores = scoresObj;
                markDirty();
            });
        });
    }

    function closeInspector() {
        selectedEventId = null;
        const drawer = document.getElementById('event-inspector-drawer');
        if (drawer) drawer.classList.remove('open');
        renderCanvasNodes();
    }

    function renderAccordionList() {
        const listEl = document.getElementById('events-accordion-list');
        if (!listEl || !scenarioRef) return;
        const events = scenarioRef.eventTemplates || [];

        if (events.length === 0) {
            listEl.innerHTML = `<div class="text-center text-muted" style="padding: 3rem;">No events in scenario. Click "Add Event Node" to create one.</div>`;
            return;
        }

        listEl.innerHTML = events.map(ev => {
            const triggersCount = (ev.triggerEvents || []).length;
            const decCount = (ev.decisions || []).length;
            return `
                <details class="event-accordion-item${ev.isEndGame ? ' endgame-item' : ''}">
                    <summary>
                        <div class="inline-flex items-center gap-sm">
                            <code>${escapeHtml(ev.id)}</code>
                            <span>${escapeHtml(ev.name || ev.title || 'Untitled Event')}</span>
                            ${ev.isEndGame ? `<span class="badge badge-endgame">🏁 End Game</span>` : ''}
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
            if (btnCanvas) btnCanvas.className = 'btn btn-secondary text-xs inline-flex items-center gap-xs';
            if (btnAcc) btnAcc.className = 'btn btn-primary text-xs inline-flex items-center gap-xs';
        } else {
            if (canvasWrap) canvasWrap.style.display = 'block';
            if (accWrap) accWrap.style.display = 'none';
            if (btnCanvas) btnCanvas.className = 'btn btn-primary text-xs inline-flex items-center gap-xs';
            if (btnAcc) btnAcc.className = 'btn btn-secondary text-xs inline-flex items-center gap-xs';
        }
        render();
    }

    // BR-35: Slide-Out Inspector for Manual Actions
    function openActionInspector(actionId) {
        selectedEventId = actionId;
        const drawer = document.getElementById('event-inspector-drawer');
        const body = document.getElementById('inspector-body');
        const titleEl = document.getElementById('inspector-title');
        const subtitleEl = document.getElementById('inspector-subtitle');
        const deleteLabel = document.getElementById('btn-delete-node-label');
        if (!drawer || !body || !scenarioRef) return;

        const act = (scenarioRef.manualActions || []).find(a => a.id === actionId);
        if (!act) return;

        if (titleEl) titleEl.textContent = act.name || act.id;
        if (subtitleEl) {
            subtitleEl.textContent = act.id;
            subtitleEl.style.display = 'inline-block';
        }
        if (deleteLabel) deleteLabel.textContent = 'Delete Manual Action';

        const allEvents = scenarioRef.eventTemplates || [];
        const roles = scenarioRef.roles || [];
        const scoreKeys = Object.keys(scenarioRef.initialScores || {});

        const preds = getActionPredecessorEvents(act);
        const triggers = getActionTriggeredEvents(act);
        const effScores = (act.effects && act.effects.scores) ? act.effects.scores : {};
        const scoreSummary = Object.entries(effScores).map(([k, v]) => `${k}:${v}`).join(', ');

        body.innerHTML = `
            <div class="field-row">
                <div class="field-group">
                    <label for="insp-act-name">Action Name *</label>
                    <input type="text" id="insp-act-name" class="form-control" value="${escapeHtml(act.name || '')}">
                </div>
                <div class="field-group">
                    <label for="insp-act-id">Action ID *</label>
                    <input type="text" id="insp-act-id" class="form-control" autocorrect="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(act.id)}">
                </div>
            </div>

            <div class="field-group">
                <div class="label-with-ai">
                    <label for="insp-act-desc">Action Description</label>
                    <button type="button" id="insp-btn-ai-act-desc" class="btn-ai-brief" title="Draft action description with AI">
                        ${renderIcon('sparkles', 12)} <span>AI Draft</span>
                    </button>
                </div>
                <textarea id="insp-act-desc" class="form-control" rows="3" placeholder="Explain what taking this action entails...">${escapeHtml(act.description || '')}</textarea>
            </div>

            <!-- Predecessor Tree Activity: Makes this Action Available -->
            <div class="field-group">
                <label>Available After Activity on Tree (Predecessor Events)</label>
                <p class="field-hint" style="margin-bottom: 0.4rem;">Select which scenario event(s) must trigger before this action unlocks for players. Leave unchecked for always available.</p>
                <div class="editor-item-list" style="max-height: 140px; overflow-y: auto; background: var(--bg-primary); padding: 0.5rem; border-radius: 4px; border: 1px solid var(--border-color);">
                    ${allEvents.map(ev => {
                        const isChecked = preds.includes(ev.id);
                        return `
                            <label class="inline-flex items-center gap-xs text-xs" style="cursor: pointer;">
                                <input type="checkbox" class="insp-act-pred-cb" value="${escapeHtml(ev.id)}" ${isChecked ? 'checked' : ''}>
                                <span>${escapeHtml(ev.name || ev.id)} (<code>${escapeHtml(ev.id)}</code>)</span>
                            </label>
                        `;
                    }).join('') || '<span class="text-xs text-muted">No canvas events available.</span>'}
                </div>
            </div>

            <!-- Initiator Roles -->
            <div class="field-group">
                <label>Allowed Initiator Role(s)</label>
                <div class="flex-center gap-sm flex-wrap" style="justify-content: flex-start;">
                    ${roles.map(r => {
                        const checked = Array.isArray(act.initiator) && act.initiator.includes(r);
                        return `<label class="inline-flex items-center gap-xs text-xs"><input type="checkbox" class="insp-act-role-cb" value="${escapeHtml(r)}" ${checked ? 'checked' : ''}> <span>${escapeHtml((scenarioRef.roleNames && scenarioRef.roleNames[r]) || r)}</span></label>`;
                    }).join('') || '<span class="text-xs text-muted">No roles defined.</span>'}
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1.1rem 0;">

            <!-- Downstream Triggered Events: Resulting from this action -->
            <div class="field-group">
                <label>Downstream Events Triggered by this Action</label>
                <p class="field-hint" style="margin-bottom: 0.4rem;">Select which canvas event(s) execute when this action is taken.</p>
                <div class="editor-item-list" style="max-height: 140px; overflow-y: auto; background: var(--bg-primary); padding: 0.5rem; border-radius: 4px; border: 1px solid var(--border-color);">
                    ${allEvents.map(ev => {
                        const isChecked = triggers.includes(ev.id);
                        return `
                            <label class="inline-flex items-center gap-xs text-xs" style="cursor: pointer;">
                                <input type="checkbox" class="insp-act-trig-cb" value="${escapeHtml(ev.id)}" ${isChecked ? 'checked' : ''}>
                                <span>${escapeHtml(ev.name || ev.id)} (<code>${escapeHtml(ev.id)}</code>)</span>
                            </label>
                        `;
                    }).join('') || '<span class="text-xs text-muted">No canvas events available.</span>'}
                </div>
            </div>

            <!-- Score Effects -->
            <div class="field-group">
                <label>Score Effects (e.g. ${escapeHtml(scoreKeys[0] || 'public_panic')}:-1, ${escapeHtml(scoreKeys[1] || 'emergency_capacity')}:1)</label>
                <input type="text" id="insp-act-scores" class="form-control text-xs" value="${escapeHtml(scoreSummary)}" placeholder="metric:delta, metric2:delta">
            </div>
        `;

        drawer.classList.add('open');
        renderCanvasNodes();

        // Bind Manual Action inspector controls
        const nameInp = document.getElementById('insp-act-name');
        const idInp = document.getElementById('insp-act-id');
        const descInp = document.getElementById('insp-act-desc');
        const scoresInp = document.getElementById('insp-act-scores');
        const aiDescBtn = document.getElementById('insp-btn-ai-act-desc');

        if (nameInp) {
            nameInp.addEventListener('input', () => {
                act.name = nameInp.value;
                if (titleEl) titleEl.textContent = act.name || 'Manual Action Details';
                renderCanvasNodes();
                markDirty();
            });
        }

        if (idInp) {
            idInp.addEventListener('change', () => {
                const newId = idInp.value.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
                if (!newId || newId === act.id) return;
                act.id = newId;
                selectedEventId = newId;
                if (subtitleEl) subtitleEl.textContent = newId;
                render();
                markDirty();
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

        if (scoresInp) {
            scoresInp.addEventListener('input', () => {
                const sc = {};
                scoresInp.value.split(',').forEach(part => {
                    const [k, v] = part.split(':').map(s => s.trim());
                    if (k && v !== undefined && !isNaN(Number(v))) {
                        sc[k] = Number(v);
                    }
                });
                if (!act.effects) act.effects = {};
                act.effects.scores = sc;
                markDirty();
            });
        }
    }

    function addActionNode() {
        if (!scenarioRef) return;
        if (!Array.isArray(scenarioRef.manualActions)) scenarioRef.manualActions = [];
        const actions = scenarioRef.manualActions;
        const n = actions.length + 1;
        const newId = `act_action_${n}_${Date.now().toString(36).slice(-3)}`;

        let defaultX = Math.round((160 - panX) / scale);
        let defaultY = Math.round((300 - panY) / scale);

        const newAct = {
            id: newId,
            name: `Manual Action ${n}`,
            description: 'Execute tactical action.',
            initiator: scenarioRef.roles && scenarioRef.roles[0] ? [scenarioRef.roles[0]] : ['pm'],
            conditions: {
                triggeredEvents: selectedEventId ? [selectedEventId] : []
            },
            effects: {
                triggerEvents: [],
                scores: {}
            },
            _canvasPos: {
                x: Math.max(40, Math.round(defaultX)),
                y: Math.max(40, Math.round(defaultY))
            }
        };

        actions.push(newAct);
        render();
        openActionInspector(newId);
        markDirty();
        showToast(`Created Manual Action "${newAct.name}" on canvas`, 'success');
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
            name: idx === 1 ? 'Master Start Event' : `Event ${idx}`,
            title: idx === 1 ? 'Master Start Event' : `Event ${idx}`,
            description: 'Describe the situation unfolding...',
            triggerEvents: [],
            decisions: [],
            _canvasPos: {
                x: Math.max(40, Math.round(defaultX)),
                y: Math.max(40, Math.round(defaultY))
            }
        };
        events.push(newEvent);
        render();
        openInspector(newId);
        markDirty();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const wrapper = document.getElementById('events-canvas-wrapper');
        if (wrapper) {
            wrapper.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.inspector-drawer') || e.target.closest('.canvas-node')) return;
                isPanning = true;
                panStartX = e.clientX - panX;
                panStartY = e.clientY - panY;
                wrapper.classList.add('panning');
            });

            window.addEventListener('pointermove', (e) => {
                if (draggingNodeId && scenarioRef) {
                    hasDraggedNode = true;
                    const evObj = (scenarioRef.eventTemplates || []).find(x => x.id === draggingNodeId);
                    const actObj = !evObj ? (scenarioRef.manualActions || []).find(x => x.id === draggingNodeId) : null;
                    const targetObj = evObj || actObj;
                    if (targetObj) {
                        const rect = wrapper.getBoundingClientRect();
                        const mx = (e.clientX - rect.left - panX) / scale;
                        const my = (e.clientY - rect.top - panY) / scale;
                        targetObj._canvasPos = {
                            x: Math.max(10, Math.round(mx - dragOffsetX)),
                            y: Math.max(10, Math.round(my - dragOffsetY))
                        };
                        const selector = evObj
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

            window.addEventListener('pointerup', () => {
                if (draggingNodeId) {
                    if (hasDraggedNode) {
                        syncCanvasLayoutToScenario();
                        markDirty();
                    }
                    draggingNodeId = null;
                }
                if (isPanning) {
                    isPanning = false;
                    wrapper.classList.remove('panning');
                    syncCanvasLayoutToScenario();
                }
            });
        }

        document.getElementById('btn-view-canvas')?.addEventListener('click', () => setViewMode('canvas'));
        document.getElementById('btn-view-accordion')?.addEventListener('click', () => setViewMode('accordion'));
        document.getElementById('btn-add-event-node')?.addEventListener('click', addEventNode);
        document.getElementById('btn-add-action-node')?.addEventListener('click', addActionNode);
        document.getElementById('btn-auto-layout-canvas')?.addEventListener('click', () => {
            ensureNodePositions(true);
            render();
            markDirty();
            showToast('Events arranged into narrative flow columns', 'info');
        });

        document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
            scale = Math.min(1.75, +(scale + 0.15).toFixed(2));
            applyTransform();
            syncCanvasLayoutToScenario();
        });
        document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
            scale = Math.max(0.4, +(scale - 0.15).toFixed(2));
            applyTransform();
            syncCanvasLayoutToScenario();
        });
        document.getElementById('btn-zoom-reset')?.addEventListener('click', () => {
            scale = 1;
            panX = 40;
            panY = 40;
            applyTransform();
            syncCanvasLayoutToScenario();
        });

        document.getElementById('btn-close-inspector')?.addEventListener('click', closeInspector);
        document.getElementById('btn-done-inspector')?.addEventListener('click', closeInspector);
        document.getElementById('btn-delete-event')?.addEventListener('click', () => {
            if (!selectedEventId || !scenarioRef) return;
            const evIdx = (scenarioRef.eventTemplates || []).findIndex(x => x.id === selectedEventId);
            if (evIdx !== -1) {
                scenarioRef.eventTemplates.splice(evIdx, 1);
                closeInspector();
                render();
                markDirty();
                showToast('Event deleted from scenario', 'info');
                return;
            }
            const actIdx = (scenarioRef.manualActions || []).findIndex(x => x.id === selectedEventId);
            if (actIdx !== -1) {
                scenarioRef.manualActions.splice(actIdx, 1);
                closeInspector();
                render();
                markDirty();
                showToast('Manual Action deleted from scenario', 'info');
                return;
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
