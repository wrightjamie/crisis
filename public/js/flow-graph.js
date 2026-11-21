// Shared Visio-Style Event & Decision Flow Graph Engine
// Used by both the Scenario Editor (editor-canvas.js) and Facilitator Display (scenario-explorer.js)
(function(global) {
    'use strict';

    function defaultEscapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getHelperTriggers(opt) {
        if (!opt) return [];
        if (Array.isArray(opt.triggerEvents)) return opt.triggerEvents;
        if (opt.effects && Array.isArray(opt.effects.triggerEvents)) return opt.effects.triggerEvents;
        return [];
    }

    function extractConditionEventRefs(cond, includeTriggered = true) {
        if (!cond || typeof cond !== 'object') return [];
        const refs = [];
        if (Array.isArray(cond.prerequisites)) refs.push(...cond.prerequisites);
        if (includeTriggered && Array.isArray(cond.triggeredEvents)) refs.push(...cond.triggeredEvents);
        if (includeTriggered && Array.isArray(cond.unlockedEvents)) refs.push(...cond.unlockedEvents);
        if (Array.isArray(cond.all)) {
            cond.all.forEach(sub => refs.push(...extractConditionEventRefs(sub, includeTriggered)));
        }
        if (Array.isArray(cond.any)) {
            cond.any.forEach(sub => refs.push(...extractConditionEventRefs(sub, includeTriggered)));
        }
        return Array.from(new Set(refs)).filter(Boolean);
    }

    function getEventPrerequisites(ev) {
        if (!ev) return [];
        const direct = Array.isArray(ev.prerequisites) ? ev.prerequisites : [];
        const fromCond = extractConditionEventRefs(ev.conditions, true);
        return Array.from(new Set([...direct, ...fromCond])).filter(id => id && id !== ev.id);
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
        const fromCond = extractConditionEventRefs(act.conditions, true);
        const events = Array.isArray(act.events) ? act.events : [];
        return Array.from(new Set([...fromCond, ...events])).filter(id => id && id !== act.id);
    }

    function getActionTriggeredEvents(act) {
        if (!act || !act.effects) return [];
        const eff = act.effects;
        const tr = Array.isArray(eff.triggerEvents)
            ? eff.triggerEvents.map(t => (typeof t === 'string' ? t : (t && (t.id || t.event))))
            : [];
        const rnd = Array.isArray(eff.randomEvents)
            ? eff.randomEvents.map(r => (typeof r === 'string' ? r : (r && (r.event || r.id))))
            : [];
        return Array.from(new Set([...tr, ...rnd])).filter(Boolean);
    }

    function isValidPos(pos) {
        return Boolean(pos && typeof pos.x === 'number' && typeof pos.y === 'number' && Number.isFinite(pos.x) && Number.isFinite(pos.y));
    }

    /**
     * Compute clean left-to-right Visio layout where successors and manual actions align horizontally
     * with their predecessors and column overlaps are resolved.
     *
     * @param {Array} events
     * @param {Array} actions
     * @param {Object} [options]
     * @param {Object} [options.savedPositions] Map/object of id -> { x, y }
     * @param {boolean} [options.forceRecalculate]
     * @returns {Map<string, { x: number, y: number }>}
     */
    function partitionNodes(rawEvents = [], rawActions = []) {
        const events = [];
        const actions = [];
        const seenAct = new Set();
        (rawEvents || []).forEach(item => {
            if (!item) return;
            if (item.isManualAction) {
                if (!seenAct.has(item.id)) {
                    actions.push(item);
                    seenAct.add(item.id);
                }
            } else {
                events.push(item);
            }
        });
        (rawActions || []).forEach(act => {
            if (!act || seenAct.has(act.id)) return;
            actions.push(act);
            seenAct.add(act.id);
        });
        return { events, actions };
    }

    function computeLayout(rawEvents = [], rawActions = [], options = {}) {
        const { events, actions } = partitionNodes(rawEvents, rawActions);
        const savedPositions = options.savedPositions || {};
        const forceRecalculate = Boolean(options.forceRecalculate);
        const result = new Map();

        if (events.length === 0 && actions.length === 0) return result;

        // Check if every node already has a valid saved position
        if (!forceRecalculate) {
            const allHavePos =
                events.every(e => isValidPos(savedPositions[e.id] || e._canvasPos)) &&
                actions.every(a => isValidPos(savedPositions[a.id] || a._canvasPos));
            if (allHavePos) {
                events.forEach(e => {
                    const p = savedPositions[e.id] || e._canvasPos;
                    result.set(e.id, { x: Math.round(p.x), y: Math.round(p.y) });
                });
                actions.forEach(a => {
                    const p = savedPositions[a.id] || a._canvasPos;
                    result.set(a.id, { x: Math.round(p.x), y: Math.round(p.y) });
                });
                return result;
            }
        }

        const eventMap = new Map();
        const outgoingOrdered = new Map();
        const incomingPreds = new Map();

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

        actions.forEach(act => {
            getActionPredecessorEvents(act).forEach(predId => {
                addEdge(predId, act.id, 15);
            });
            getActionTriggeredEvents(act).forEach(tgtId => {
                addEdge(act.id, tgtId, 0);
            });
            const actUnlocks = Array.isArray(act.effects?.unlockEvents) ? act.effects.unlockEvents : [];
            actUnlocks.forEach(tgtId => {
                addEdge(act.id, tgtId, 10);
            });
        });

        events.forEach(ev => {
            const unlockList = [
                ...(Array.isArray(ev.effects?.unlockEvents) ? ev.effects.unlockEvents : []),
                ...(Array.isArray(ev.autoEffects?.unlockEvents) ? ev.autoEffects.unlockEvents : [])
            ];
            unlockList.forEach(tgtId => {
                addEdge(ev.id, tgtId, 10);
            });
            (ev.decisions || []).forEach(dec => {
                (dec.options || []).forEach((opt, optIdx) => {
                    const optUnlocks = Array.isArray(opt.effects?.unlockEvents) ? opt.effects.unlockEvents : [];
                    optUnlocks.forEach(tgtId => {
                        addEdge(ev.id, tgtId, 28 + optIdx * 22);
                    });
                });
            });
        });

        // 2. Assign horizontal depth
        const depthMap = new Map();
        const roots = [];

        const allNodes = [...events, ...actions];
        const sortedCandidates = allNodes.slice().sort((a, b) => {
            const aStart = a.isOpeningEvent ? 0 : ((a.id === 'ev_start' || a.id === 'evt_initial') ? 1 : 2);
            const bStart = b.isOpeningEvent ? 0 : ((b.id === 'ev_start' || b.id === 'evt_initial') ? 1 : 2);
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

            const y = childYs.length === 1
                ? childYs[0]
                : Math.round((childYs[0] + childYs[childYs.length - 1]) / 2);

            computedPos.set(nodeId, { x, y });
            cursorY = Math.max(cursorY, y + nodeH + gapY);
            return y;
        }

        const treeRoots = sortedCandidates.filter(e => !hasPrimaryParent.has(e.id));
        treeRoots.forEach(rootNode => layoutSubtree(rootNode.id));
        sortedCandidates.forEach(node => {
            if (!visited.has(node.id)) layoutSubtree(node.id);
        });

        // 4. Column-by-column overlap resolution
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

            colNodes.sort((a, b) => computedPos.get(a.id).y - computedPos.get(b.id).y);

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
            const existing = savedPositions[ev.id] || ev._canvasPos;
            const target = (!forceRecalculate && isValidPos(existing))
                ? existing
                : (computedPos.get(ev.id) || { x: 60, y: 60 });
            result.set(ev.id, { x: Math.round(target.x), y: Math.round(target.y) });
        });

        actions.forEach(act => {
            const existing = savedPositions[act.id] || act._canvasPos;
            const target = (!forceRecalculate && isValidPos(existing))
                ? existing
                : (computedPos.get(act.id) || { x: 60, y: cursorY });
            result.set(act.id, { x: Math.round(target.x), y: Math.round(target.y) });
        });

        return result;
    }

    function buildBezierPath(x1, y1, x2, y2) {
        const dx = Math.max(Math.abs(x2 - x1) * 0.5, 60);
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    }

    function getSvgDefsMarkup(markerPrefix = '') {
        return `
            <defs>
                <marker id="${markerPrefix}arrow-trigger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" class="canvas-arrow-trigger"/>
                </marker>
                <marker id="${markerPrefix}arrow-decision" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" class="canvas-arrow-decision"/>
                </marker>
                <marker id="${markerPrefix}arrow-prereq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" class="canvas-arrow-prereq"/>
                </marker>
                <marker id="${markerPrefix}arrow-action" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" class="canvas-arrow-action"/>
                </marker>
            </defs>
        `;
    }

    /**
     * Build SVG markup for all graph edges (event triggers, decision branches, prerequisites, manual actions).
     */
    function buildEdgesSvg(rawEvents = [], rawActions = [], posMap, options = {}) {
        const { events, actions } = partitionNodes(rawEvents, rawActions);
        const escapeHtml = options.escapeHtml || defaultEscapeHtml;
        const nodeW = options.nodeWidth || 270;
        const nodeHalfH = options.nodeHalfHeight || 48;
        const markerPrefix = options.markerPrefix || '';
        const getEdgeClass = typeof options.getEdgeClass === 'function' ? options.getEdgeClass : null;

        const eventMap = new Map();
        events.forEach(e => eventMap.set(e.id, e));

        const getPos = (id, fallbackObj) => {
            if (posMap && typeof posMap.get === 'function' && posMap.has(id)) {
                return posMap.get(id);
            }
            if (posMap && posMap[id]) return posMap[id];
            return fallbackObj?._canvasPos || { x: 0, y: 0 };
        };

        const extraClass = (edgeInfo) => {
            if (!getEdgeClass) return '';
            const cls = getEdgeClass(edgeInfo);
            return cls ? ` ${cls}` : '';
        };

        const svgParts = [];

        events.forEach(sourceEv => {
            const srcPos = getPos(sourceEv.id, sourceEv);
            const x1 = srcPos.x + nodeW;
            const y1 = srcPos.y + nodeHalfH;

            // 1. Direct triggerEvents
            (sourceEv.triggerEvents || []).forEach(tr => {
                const targetId = typeof tr === 'string' ? tr : tr.id;
                const targetEv = eventMap.get(targetId);
                if (!targetEv) return;

                const tgtPos = getPos(targetId, targetEv);
                const x2 = tgtPos.x;
                const y2 = tgtPos.y + nodeHalfH;
                const d = buildBezierPath(x1, y1, x2, y2);

                const delaySec = tr.delayMs ? `${Math.round(tr.delayMs / 1000)}s` : '';
                const prob = (tr.probability !== undefined && tr.probability < 1) ? `${Math.round(tr.probability * 100)}%` : '';
                const label = [delaySec, prob].filter(Boolean).join(' • ');
                const midX = Math.round((x1 + x2) / 2);
                const midY = Math.round((y1 + y2) / 2) - 6;
                const cls = extraClass({ type: 'trigger', sourceId: sourceEv.id, targetId });

                svgParts.push(`<path d="${d}" class="canvas-edge-path${cls}" marker-end="url(#${markerPrefix}arrow-trigger)"/>`);
                if (label) {
                    svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label${cls}">${escapeHtml(label)}</text>`);
                }
            });

            // 2. Decision option triggers
            (sourceEv.decisions || []).forEach(dec => {
                (dec.options || []).forEach((opt, optIdx) => {
                    getHelperTriggers(opt).forEach(tr => {
                        const targetId = typeof tr === 'string' ? tr : tr.id;
                        const targetEv = eventMap.get(targetId);
                        if (!targetEv) return;

                        const tgtPos = getPos(targetId, targetEv);
                        const oy1 = y1 + 28 + optIdx * 18;
                        const x2 = tgtPos.x;
                        const y2 = tgtPos.y + nodeHalfH;
                        const d = buildBezierPath(x1, oy1, x2, y2);

                        const delaySec = tr.delayMs ? ` (${Math.round(tr.delayMs / 1000)}s)` : '';
                        const shortOpt = (opt.text || opt.id || 'Choice').substring(0, 18);
                        const midX = Math.round((x1 + x2) / 2);
                        const midY = Math.round((oy1 + y2) / 2) - 6;
                        const cls = extraClass({ type: 'decision', sourceId: sourceEv.id, targetId, optionId: opt.id });

                        svgParts.push(`<path d="${d}" class="canvas-edge-path decision-edge${cls}" marker-end="url(#${markerPrefix}arrow-decision)"/>`);
                        svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label decision-edge-label${cls}">${escapeHtml(shortOpt + delaySec)}</text>`);
                    });
                });
            });

            // 3. Prerequisites
            getEventPrerequisites(sourceEv).forEach(preId => {
                const preEv = eventMap.get(preId);
                if (!preEv) return;
                const prePos = getPos(preId, preEv);
                const px1 = prePos.x + nodeW;
                const py1 = prePos.y + nodeHalfH;
                const px2 = srcPos.x;
                const py2 = srcPos.y + nodeHalfH;
                const d = buildBezierPath(px1, py1, px2, py2);
                const cls = extraClass({ type: 'prereq', sourceId: preId, targetId: sourceEv.id });
                svgParts.push(`<path d="${d}" class="canvas-edge-path prereq-edge${cls}" marker-end="url(#${markerPrefix}arrow-prereq)"/>`);
            });

            // 3b. Event & Decision option unlockEvents
            const actionMap = new Map();
            actions.forEach(a => actionMap.set(a.id, a));
            const emitUnlockEdge = (tgtId, sy, optionId = null) => {
                const tgtEv = eventMap.get(tgtId);
                const tgtAct = actionMap.get(tgtId);
                if (!tgtEv && !tgtAct) return;
                const tgtPos = getPos(tgtId, tgtEv || tgtAct);
                const x2 = tgtPos.x;
                const y2 = tgtPos.y + (tgtAct ? 40 : nodeHalfH);
                const d = buildBezierPath(x1, sy, x2, y2);
                const midX = Math.round((x1 + x2) / 2);
                const midY = Math.round((sy + y2) / 2) - 6;
                const edgeType = tgtAct ? 'action-unlock' : 'unlock';
                const cls = extraClass({ type: edgeType, sourceId: sourceEv.id, targetId: tgtId, optionId });
                const pathClass = tgtAct ? 'action-unlock-edge' : 'prereq-edge';
                const marker = tgtAct ? `${markerPrefix}arrow-action` : `${markerPrefix}arrow-prereq`;
                svgParts.push(`<path d="${d}" class="canvas-edge-path ${pathClass}${cls}" marker-end="url(#${marker})"/>`);
                svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label action-unlock-label${cls}">Unlocks</text>`);
            };

            const directUnlocks = [
                ...(Array.isArray(sourceEv.effects?.unlockEvents) ? sourceEv.effects.unlockEvents : []),
                ...(Array.isArray(sourceEv.autoEffects?.unlockEvents) ? sourceEv.autoEffects.unlockEvents : [])
            ];
            directUnlocks.forEach(tgtId => emitUnlockEdge(tgtId, y1));

            (sourceEv.decisions || []).forEach(dec => {
                (dec.options || []).forEach((opt, optIdx) => {
                    const optUnlocks = Array.isArray(opt.effects?.unlockEvents) ? opt.effects.unlockEvents : [];
                    optUnlocks.forEach(tgtId => emitUnlockEdge(tgtId, y1 + 28 + optIdx * 18, opt.id));
                });
            });
        });

        // 4. Manual Action edges
        actions.forEach(act => {
            const actPos = getPos(act.id, act);
            const ax1 = actPos.x + nodeW;
            const ay1 = actPos.y + 40;
            const ax0 = actPos.x;
            const ay0 = actPos.y + 40;

            getActionPredecessorEvents(act).forEach(predId => {
                const predEv = eventMap.get(predId);
                if (!predEv) return;
                const pPos = getPos(predId, predEv);
                const px1 = pPos.x + nodeW;
                const py1 = pPos.y + nodeHalfH;
                const d = buildBezierPath(px1, py1, ax0, ay0);
                const midX = Math.round((px1 + ax0) / 2);
                const midY = Math.round((py1 + ay0) / 2) - 6;
                const cls = extraClass({ type: 'action-unlock', sourceId: predId, targetId: act.id });

                svgParts.push(`<path d="${d}" class="canvas-edge-path action-unlock-edge${cls}" marker-end="url(#${markerPrefix}arrow-action)"/>`);
                svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label action-unlock-label${cls}">Unlocks Action</text>`);
            });

            getActionTriggeredEvents(act).forEach(targetId => {
                const targetEv = eventMap.get(targetId);
                if (!targetEv) return;
                const tgtPos = getPos(targetId, targetEv);
                const x2 = tgtPos.x;
                const y2 = tgtPos.y + nodeHalfH;
                const d = buildBezierPath(ax1, ay1, x2, y2);
                const midX = Math.round((ax1 + x2) / 2);
                const midY = Math.round((ay1 + y2) / 2) - 6;
                const cls = extraClass({ type: 'action-trigger', sourceId: act.id, targetId });

                svgParts.push(`<path d="${d}" class="canvas-edge-path action-edge${cls}" marker-end="url(#${markerPrefix}arrow-action)"/>`);
                svgParts.push(`<text x="${midX}" y="${midY}" text-anchor="middle" class="canvas-edge-label action-edge-label${cls}">Action Triggers</text>`);
            });
        });

        return svgParts.join('');
    }

    /**
     * Reusable pan & zoom controller for a canvas stage wrapper.
     */
    function createPanZoomController(config) {
        const wrapperEl = config.wrapperEl;
        const planeEl = config.planeEl;
        const zoomLabelEl = config.zoomLabelEl || null;
        const minScale = config.minScale ?? 0.3;
        const maxScale = config.maxScale ?? 1.75;
        const onTransformChange = typeof config.onTransformChange === 'function' ? config.onTransformChange : null;
        const canStartPan = typeof config.canStartPan === 'function' ? config.canStartPan : () => true;

        let scale = config.initialScale ?? 1;
        let panX = config.initialPanX ?? 40;
        let panY = config.initialPanY ?? 40;
        let isPanning = false;
        let didPan = false;
        let panStartX = 0;
        let panStartY = 0;

        function applyTransform() {
            if (planeEl) {
                planeEl.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
            }
            if (zoomLabelEl) {
                zoomLabelEl.textContent = `${Math.round(scale * 100)}%`;
            }
        }

        function clampScale(val) {
            return Math.max(minScale, Math.min(maxScale, Number(val.toFixed(2))));
        }

        function setState(next) {
            if (typeof next.panX === 'number') panX = Math.round(next.panX);
            if (typeof next.panY === 'number') panY = Math.round(next.panY);
            if (typeof next.scale === 'number') scale = clampScale(next.scale);
            applyTransform();
        }

        function getState() {
            return { panX, panY, scale };
        }

        function zoomBy(delta, centerClientX = null, centerClientY = null) {
            const nextScale = clampScale(scale + delta);
            if (nextScale === scale) return;

            if (wrapperEl && centerClientX !== null && centerClientY !== null) {
                const rect = wrapperEl.getBoundingClientRect();
                const mouseX = centerClientX - rect.left;
                const mouseY = centerClientY - rect.top;
                const ratio = nextScale / scale;
                panX = Math.round(mouseX - (mouseX - panX) * ratio);
                panY = Math.round(mouseY - (mouseY - panY) * ratio);
            }

            scale = nextScale;
            applyTransform();
            if (onTransformChange) onTransformChange(getState());
        }

        function zoomIn() {
            zoomBy(0.15);
        }

        function zoomOut() {
            zoomBy(-0.15);
        }

        function reset() {
            scale = 1;
            panX = 40;
            panY = 40;
            applyTransform();
            if (onTransformChange) onTransformChange(getState());
        }

        function fitToView(posMap, nodeWidth = 270, nodeHeight = 160) {
            if (!wrapperEl || !posMap || posMap.size === 0) {
                reset();
                return;
            }
            const rect = wrapperEl.getBoundingClientRect();
            if (rect.width < 40 || rect.height < 40) return;

            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;

            posMap.forEach(pos => {
                if (pos.x < minX) minX = pos.x;
                if (pos.y < minY) minY = pos.y;
                if (pos.x + nodeWidth > maxX) maxX = pos.x + nodeWidth;
                if (pos.y + nodeHeight > maxY) maxY = pos.y + nodeHeight;
            });

            if (!Number.isFinite(minX)) {
                reset();
                return;
            }

            const pad = 48;
            const contentW = Math.max(maxX - minX, 200);
            const contentH = Math.max(maxY - minY, 150);
            const fitScale = clampScale(Math.min((rect.width - pad * 2) / contentW, (rect.height - pad * 2) / contentH, 1));

            scale = fitScale;
            panX = Math.round((rect.width - contentW * scale) / 2 - minX * scale);
            panY = Math.round(pad - minY * scale);
            applyTransform();
            if (onTransformChange) onTransformChange(getState());
        }

        function onPointerDown(e) {
            if (e.button !== 0) return;
            if (!canStartPan(e)) return;
            isPanning = true;
            didPan = false;
            panStartX = e.clientX - panX;
            panStartY = e.clientY - panY;
            wrapperEl.classList.add('panning');
        }

        function onPointerMove(e) {
            if (!isPanning) return;
            const nextX = e.clientX - panStartX;
            const nextY = e.clientY - panStartY;
            if (Math.abs(nextX - panX) > 3 || Math.abs(nextY - panY) > 3) {
                didPan = true;
            }
            panX = nextX;
            panY = nextY;
            applyTransform();
        }

        function onPointerUp() {
            if (!isPanning) return;
            isPanning = false;
            wrapperEl.classList.remove('panning');
            if (onTransformChange) onTransformChange(getState());
        }

        function onWheel(e) {
            if (!wrapperEl) return;
            e.preventDefault();
            const step = e.deltaY < 0 ? 0.1 : -0.1;
            zoomBy(step, e.clientX, e.clientY);
        }

        if (wrapperEl) {
            wrapperEl.addEventListener('pointerdown', onPointerDown);
            wrapperEl.addEventListener('wheel', onWheel, { passive: false });
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        }

        applyTransform();

        return {
            applyTransform,
            setState,
            getState,
            zoomIn,
            zoomOut,
            reset,
            fitToView,
            wasPanning: () => didPan,
            destroy: () => {
                if (wrapperEl) {
                    wrapperEl.removeEventListener('pointerdown', onPointerDown);
                    wrapperEl.removeEventListener('wheel', onWheel);
                }
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
            }
        };
    }

    const FlowGraph = {
        getHelperTriggers,
        getEventPrerequisites,
        estimateNodeHeight,
        getActionPredecessorEvents,
        getActionTriggeredEvents,
        computeLayout,
        buildBezierPath,
        getSvgDefsMarkup,
        buildEdgesSvg,
        createPanZoomController
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = FlowGraph;
    } else {
        global.FlowGraph = FlowGraph;
    }
})(typeof window !== 'undefined' ? window : globalThis);
