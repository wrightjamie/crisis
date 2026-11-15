// Crisis Scenario Editor - Visio-Style Event & Decision Flow Canvas + Slide-Out Inspector
(function() {
    'use strict';

    const { escapeHtml, renderIcon, showToast } = window.common;

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

    function getHelperTriggers(opt) {
        if (!opt) return [];
        if (Array.isArray(opt.triggerEvents)) return opt.triggerEvents;
        if (opt.effects && Array.isArray(opt.effects.triggerEvents)) return opt.effects.triggerEvents;
        return [];
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

    function getEventPrerequisites(ev) {
        if (!ev) return [];
        const direct = Array.isArray(ev.prerequisites) ? ev.prerequisites : [];
        const cond = (ev.conditions && Array.isArray(ev.conditions.prerequisites)) ? ev.conditions.prerequisites : [];
        return Array.from(new Set([...direct, ...cond])).filter(Boolean);
    }

    function estimateNodeHeight(ev) {
        let optCount = 0;
        (ev.decisions || []).forEach(d => {
            optCount += (d.options || []).length;
        });
        return 135 + optCount * 28;
    }

    function getActionPredecessorEvents(act) {
        if (!act) return [];
        const cond = act.conditions || {};
        const triggered = Array.isArray(cond.triggeredEvents) ? cond.triggeredEvents : [];
        const unlocked = Array.isArray(cond.unlockedEvents) ? cond.unlockedEvents : [];
        const events = Array.isArray(act.events) ? act.events : [];
        return Array.from(new Set([...triggered, ...unlocked, ...events])).filter(Boolean);
    }

    function getActionTriggeredEvents(act) {
        if (!act || !act.effects) return [];
        const eff = act.effects;
        const tr = Array.isArray(eff.triggerEvents) ? eff.triggerEvents : [];
        const rnd = Array.isArray(eff.randomEvents) ? eff.randomEvents.map(r => r.event || r.id) : [];
        return Array.from(new Set([...tr, ...rnd])).filter(Boolean);
    }

    // Compute clean left-to-right Visio layout where successors and manual actions align horizontally with their predecessors
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

        const eventMap = new Map();
        const outgoingOrdered = new Map(); // id -> Array<{ targetId, portOffsetY }>
        const incomingPreds = new Map();   // id -> Array<{ sourceId, portOffsetY }>

        events.forEach(e => {
            eventMap.set(e.id, e);
            outgoingOrdered.set(e.id, []);
            incomingPreds.set(e.id, []);
        });

        actions.forEach(a => {
            outgoingOrdered.set(a.id, []);
            incomingPreds.set(a.id, []);
        });

        const addEdge = (srcId, tgtId, portOffsetY = 0) => {
            if (!srcId || !tgtId || srcId === tgtId) return;
            if (!outgoingOrdered.has(srcId) || !incomingPreds.has(tgtId)) return;
            const outList = outgoingOrdered.get(srcId);
            if (!outList.some(x => x.targetId === tgtId)) {
                outList.push({ targetId: tgtId, portOffsetY });
            }
            const inList = incomingPreds.get(tgtId);
            if (!inList.some(x => x.sourceId === srcId)) {
                inList.push({ sourceId: srcId, portOffsetY });
            }
        };

        // 1. Collect directed edges across Events and Manual Actions
        events.forEach(ev => {
            (ev.triggerEvents || []).forEach(tr => {
                const targetId = typeof tr === 'string' ? tr : tr.id;
                addEdge(ev.id, targetId, 0);
            });
            let visualOptIdx = 0;
            (ev.decisions || []).forEach(dec => {
                (dec.options || []).forEach(opt => {
                    const offset = 28 + visualOptIdx * 22;
                    getHelperTriggers(opt).forEach(tr => {
                        const targetId = typeof tr === 'string' ? tr : tr.id;
                        addEdge(ev.id, targetId, offset);
                    });
                    visualOptIdx++;
                });
            });
            getEventPrerequisites(ev).forEach(preId => {
                addEdge(preId, ev.id, 0);
            });
        });

        // Edge connections for Manual Actions: Predecessor Event -> Manual Action -> Downstream Event
        actions.forEach(act => {
            getActionPredecessorEvents(act).forEach(predId => {
                addEdge(predId, act.id, 15);
            });
            getActionTriggeredEvents(act).forEach(tgtId => {
                addEdge(act.id, tgtId, 0);
            });
        });

        // Check if an event or decision unlocks a manual action via effects.unlockEvents
        events.forEach(ev => {
            const unlockList = Array.isArray(ev.effects?.unlockEvents) ? ev.effects.unlockEvents : [];
            unlockList.forEach(tgtId => {
                if (actions.some(a => a.id === tgtId)) {
                    addEdge(ev.id, tgtId, 10);
                }
            });
            (ev.decisions || []).forEach(dec => {
                (dec.options || []).forEach((opt, optIdx) => {
                    const optUnlocks = Array.isArray(opt.effects?.unlockEvents) ? opt.effects.unlockEvents : [];
                    optUnlocks.forEach(tgtId => {
                        if (actions.some(a => a.id === tgtId)) {
                            addEdge(ev.id, tgtId, 28 + optIdx * 22);
                        }
                    });
                });
            });
        });

        // 2. Assign horizontal depth
        const depthMap = new Map();
        const roots = [];

        const allNodes = [...events, ...actions];
        const sortedCandidates = allNodes.sort((a, b) => {
            const aStart = (a.id === 'ev_start' || a.id === 'evt_initial') ? 0 : 1;
            const bStart = (b.id === 'ev_start' || b.id === 'evt_initial') ? 0 : 1;
            if (aStart !== bStart) return aStart - bStart;
            const aIn = (incomingPreds.get(a.id) || []).length;
            const bIn = (incomingPreds.get(b.id) || []).length;
            if ((aIn === 0) !== (bIn === 0)) return aIn === 0 ? -1 : 1;
            return 0;
        });

        sortedCandidates.forEach(node => {
            if ((incomingPreds.get(node.id) || []).length === 0) {
                depthMap.set(node.id, 0);
                roots.push(node.id);
            }
        });

        if (roots.length === 0 && sortedCandidates.length > 0) {
            depthMap.set(sortedCandidates[0].id, 0);
            roots.push(sortedCandidates[0].id);
        }

        const maxLayer = Math.min(allNodes.length + 2, 16);
        let changed = true;
        let pass = 0;
        while (changed && pass < maxLayer) {
            changed = false;
            pass++;
            for (const node of sortedCandidates) {
                if (!depthMap.has(node.id)) continue;
                const uCol = depthMap.get(node.id);
                for (const edge of (outgoingOrdered.get(node.id) || [])) {
                    const vId = edge.targetId;
                    const currV = depthMap.get(vId);
                    if (currV === undefined || (currV < uCol + 1 && uCol + 1 < maxLayer)) {
                        depthMap.set(vId, uCol + 1);
                        changed = true;
                    }
                }
            }
        }

        sortedCandidates.forEach(node => {
            if (!depthMap.has(node.id)) {
                depthMap.set(node.id, 0);
                roots.push(node.id);
            }
        });

        // 3. Horizontal spanning forest
        const primaryChildren = new Map();
        const hasPrimaryParent = new Set();
        allNodes.forEach(node => primaryChildren.set(node.id, []));

        sortedCandidates.forEach(u => {
            const uCol = depthMap.get(u.id);
            for (const edge of (outgoingOrdered.get(u.id) || [])) {
                const vId = edge.targetId;
                const vCol = depthMap.get(vId);
                if (vCol === uCol + 1 && !hasPrimaryParent.has(vId) && vId !== u.id) {
                    primaryChildren.get(u.id).push(vId);
                    hasPrimaryParent.add(vId);
                }
            }
        });
        sortedCandidates.forEach(u => {
            const uCol = depthMap.get(u.id);
            for (const edge of (outgoingOrdered.get(u.id) || [])) {
                const vId = edge.targetId;
                const vCol = depthMap.get(vId);
                if (vCol > uCol && !hasPrimaryParent.has(vId) && vId !== u.id) {
                    primaryChildren.get(u.id).push(vId);
                    hasPrimaryParent.add(vId);
                }
            }
        });

        const computedPos = new Map();
        const colWidth = 360;
        const startX = 60;
        const gapY = 48;
        let cursorY = 60;
        const visited = new Set();

        function layoutSubtree(nodeId) {
            if (visited.has(nodeId)) return computedPos.get(nodeId)?.y || cursorY;
            visited.add(nodeId);

            const col = depthMap.get(nodeId) || 0;
            const x = startX + col * colWidth;
            const children = (primaryChildren.get(nodeId) || []).filter(cid => !visited.has(cid));
            const isAction = actions.some(a => a.id === nodeId);
            const nodeH = isAction ? 115 : (eventMap.has(nodeId) ? estimateNodeHeight(eventMap.get(nodeId)) : 120);

            if (children.length === 0) {
                const y = cursorY;
                computedPos.set(nodeId, { x, y });
                cursorY += nodeH + gapY;
                return y;
            }

            const childYs = [];
            for (const cid of children) {
                childYs.push(layoutSubtree(cid));
            }

            let y;
            if (childYs.length === 1) {
                y = childYs[0];
            } else {
                y = Math.round((childYs[0] + childYs[childYs.length - 1]) / 2);
            }

            computedPos.set(nodeId, { x, y });
            cursorY = Math.max(cursorY, y + nodeH + gapY);
            return y;
        }

        const treeRoots = sortedCandidates.filter(e => !hasPrimaryParent.has(e.id));
        treeRoots.forEach(rootNode => {
            layoutSubtree(rootNode.id);
        });
        sortedCandidates.forEach(node => {
            if (!visited.has(node.id)) layoutSubtree(node.id);
        });

        // 5. Column-by-column overlap resolution
        const columns = new Map();
        allNodes.forEach(node => {
            const col = depthMap.get(node.id) || 0;
            if (!columns.has(col)) columns.set(col, []);
            columns.get(col).push(node);
        });

        const sortedCols = Array.from(columns.keys()).sort((a, b) => a - b);
        for (const colIdx of sortedCols) {
            const colNodes = columns.get(colIdx);
            colNodes.forEach(node => {
                const preds = (incomingPreds.get(node.id) || [])
                    .filter(p => (depthMap.get(p.sourceId) || 0) < colIdx && computedPos.has(p.sourceId));
                const ownKids = primaryChildren.get(node.id) || [];
                if (preds.length > 1 && ownKids.length === 0) {
                    const avgY = Math.round(preds.reduce((sum, p) => {
                        const pPos = computedPos.get(p.sourceId);
                        return sum + pPos.y + Math.round((p.portOffsetY || 0) * 0.5);
                    }, 0) / preds.length);
                    computedPos.get(node.id).y = avgY;
                }
            });

            colNodes.sort((a, b) => (computedPos.get(a.id).y - computedPos.get(b.id).y));

            let minAllowedY = 60;
            colNodes.forEach(node => {
                const pos = computedPos.get(node.id);
                const isAction = actions.some(a => a.id === node.id);
                const nodeH = isAction ? 115 : (eventMap.has(node.id) ? estimateNodeHeight(eventMap.get(node.id)) : 120);

                if (pos.y < minAllowedY) {
                    const delta = minAllowedY - pos.y;
                    pos.y = minAllowedY;
                    let currKids = primaryChildren.get(node.id) || [];
                    while (currKids.length === 1) {
                        const kidId = currKids[0];
                        const kidPos = computedPos.get(kidId);
                        if (kidPos) kidPos.y += delta;
                        currKids = primaryChildren.get(kidId) || [];
                    }
                }
                minAllowedY = pos.y + nodeH + gapY;
            });
        }

        events.forEach(ev => {
            const hasValidPos = ev._canvasPos && typeof ev._canvasPos.x === 'number' && typeof ev._canvasPos.y === 'number';
            if (forceRecalculate || !hasValidPos) {
                const target = computedPos.get(ev.id) || { x: 60, y: 60 };
                ev._canvasPos = {
                    x: Math.round(target.x),
                    y: Math.round(target.y)
                };
            }
        });

        actions.forEach(act => {
            const hasValidPos = act._canvasPos && typeof act._canvasPos.x === 'number' && typeof act._canvasPos.y === 'number';
            if (forceRecalculate || !hasValidPos) {
                const target = computedPos.get(act.id) || { x: 60, y: cursorY };
                act._canvasPos = {
                    x: Math.round(target.x),
                    y: Math.round(target.y)
                };
            }
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
                            ${ev.requiresUnlock ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; font-size: 0.65rem;">Inject</span>` : ''}
                            ${ev.stage ? `<span class="badge" style="background: var(--bg-tertiary); font-size: 0.65rem;">${escapeHtml(ev.stage)}</span>` : ''}
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

    function buildBezierPath(x1, y1, x2, y2) {
        const dx = Math.max(Math.abs(x2 - x1) * 0.5, 60);
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    }

    function renderCanvasEdges() {
        const group = document.getElementById('canvas-edges-group');
        if (!group || !scenarioRef) return;

        const events = scenarioRef.eventTemplates || [];
        const eventMap = new Map();
        events.forEach(e => eventMap.set(e.id, e));

        const nodeW = 270;
        const nodeHalfH = 48;
        const svgParts = [];

        events.forEach(sourceEv => {
            const srcPos = sourceEv._canvasPos || { x: 0, y: 0 };
            const x1 = srcPos.x + nodeW;
            const y1 = srcPos.y + nodeHalfH;

            // 1. Direct triggerEvents
            (sourceEv.triggerEvents || []).forEach(tr => {
                const targetId = typeof tr === 'string' ? tr : tr.id;
                const targetEv = eventMap.get(targetId);
                if (!targetEv) return;

                const tgtPos = targetEv._canvasPos || { x: 0, y: 0 };
                const x2 = tgtPos.x;
                const y2 = tgtPos.y + nodeHalfH;
                const d = buildBezierPath(x1, y1, x2, y2);

                const delaySec = tr.delayMs ? `${Math.round(tr.delayMs / 1000)}s` : '';
                const prob = (tr.probability !== undefined && tr.probability < 1) ? `${Math.round(tr.probability * 100)}%` : '';
                const label = [delaySec, prob].filter(Boolean).join(' • ');
                const midX = Math.round((x1 + x2) / 2);
                const midY = Math.round((y1 + y2) / 2) - 6;

                svgParts.push(`<path d="${d}" class="canvas-edge-path" marker-end="url(#arrow-trigger)"/>`);
                if (label) {
                    svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label">${escapeHtml(label)}</text>`);
                }
            });

            // 2. Decision option triggers
            (sourceEv.decisions || []).forEach(dec => {
                (dec.options || []).forEach((opt, optIdx) => {
                    getHelperTriggers(opt).forEach(tr => {
                        const targetId = typeof tr === 'string' ? tr : tr.id;
                        const targetEv = eventMap.get(targetId);
                        if (!targetEv) return;

                        const tgtPos = targetEv._canvasPos || { x: 0, y: 0 };
                        const oy1 = y1 + 28 + optIdx * 18;
                        const x2 = tgtPos.x;
                        const y2 = tgtPos.y + nodeHalfH;
                        const d = buildBezierPath(x1, oy1, x2, y2);

                        const delaySec = tr.delayMs ? ` (${Math.round(tr.delayMs / 1000)}s)` : '';
                        const shortOpt = (opt.text || opt.id || 'Choice').substring(0, 18);
                        const midX = Math.round((x1 + x2) / 2);
                        const midY = Math.round((oy1 + y2) / 2) - 6;

                        svgParts.push(`<path d="${d}" class="canvas-edge-path decision-edge" marker-end="url(#arrow-decision)"/>`);
                        svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label" style="fill: #6ee7b7;">${escapeHtml(shortOpt + delaySec)}</text>`);
                    });
                });
            });

            // 3. Prerequisites
            getEventPrerequisites(sourceEv).forEach(preId => {
                const preEv = eventMap.get(preId);
                if (!preEv) return;
                const prePos = preEv._canvasPos || { x: 0, y: 0 };
                const px1 = prePos.x + nodeW;
                const py1 = prePos.y + nodeHalfH;
                const px2 = srcPos.x;
                const py2 = srcPos.y + nodeHalfH;
                const d = buildBezierPath(px1, py1, px2, py2);
                svgParts.push(`<path d="${d}" class="canvas-edge-path prereq-edge" marker-end="url(#arrow-prereq)"/>`);
            });
        });

        // BR-35: Draw edges for Manual Actions
        const actions = scenarioRef.manualActions || [];
        actions.forEach(act => {
            const actPos = act._canvasPos || { x: 0, y: 0 };
            const ax1 = actPos.x + nodeW;
            const ay1 = actPos.y + 40;
            const ax0 = actPos.x;
            const ay0 = actPos.y + 40;

            // Incoming: Predecessor Event -> Manual Action
            getActionPredecessorEvents(act).forEach(predId => {
                const predEv = eventMap.get(predId);
                if (!predEv) return;
                const pPos = predEv._canvasPos || { x: 0, y: 0 };
                const px1 = pPos.x + nodeW;
                const py1 = pPos.y + nodeHalfH;
                const d = buildBezierPath(px1, py1, ax0, ay0);
                const midX = Math.round((px1 + ax0) / 2);
                const midY = Math.round((py1 + ay0) / 2) - 6;

                svgParts.push(`<path d="${d}" class="canvas-edge-path action-unlock-edge" marker-end="url(#arrow-action)"/>`);
                svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label" style="fill: #fde68a;">Unlocks Action</text>`);
            });

            // Outgoing: Manual Action -> Triggered Event
            getActionTriggeredEvents(act).forEach(targetId => {
                const targetEv = eventMap.get(targetId);
                if (!targetEv) return;
                const tgtPos = targetEv._canvasPos || { x: 0, y: 0 };
                const x2 = tgtPos.x;
                const y2 = tgtPos.y + nodeHalfH;
                const d = buildBezierPath(ax1, ay1, x2, y2);
                const midX = Math.round((ax1 + x2) / 2);
                const midY = Math.round((ay1 + y2) / 2) - 6;

                svgParts.push(`<path d="${d}" class="canvas-edge-path action-edge" marker-end="url(#arrow-action)"/>`);
                svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label" style="fill: #fbbf24;">Action Triggers</text>`);
            });
        });

        group.innerHTML = svgParts.join('');
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
                <details class="event-accordion-item">
                    <summary>
                        <div class="inline-flex items-center gap-sm">
                            <code>${escapeHtml(ev.id)}</code>
                            <span>${escapeHtml(ev.name || ev.title || 'Untitled Event')}</span>
                            ${ev.requiresUnlock ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">Inject</span>` : ''}
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
