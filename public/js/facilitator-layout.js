// Facilitator Dashboard Customizable Card Layout
// Per-card allowed column widths, handle-scoped drag-and-drop reordering,
// and <details> collapse state persisted in localStorage.
(function(global) {
    'use strict';

    const STORAGE_KEY = 'crisis_facilitator_layout_v1';
    const SPAN_CLASSES = ['span-2', 'span-3', 'span-full'];

    function parseAllowedWidths(raw, fallback = '1') {
        const list = String(raw || fallback)
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(Boolean);
        return list.length > 0 ? list : [String(fallback).trim().toLowerCase()];
    }

    function formatWidthLabel(width) {
        return width === 'full' ? 'Full' : `${width}×`;
    }

    function getNextWidth(currentWidth, allowedWidths) {
        if (!Array.isArray(allowedWidths) || allowedWidths.length <= 1) {
            return String(currentWidth);
        }
        const curr = String(currentWidth).toLowerCase();
        const idx = allowedWidths.indexOf(curr);
        const nextIdx = idx === -1 ? 0 : (idx + 1) % allowedWidths.length;
        return allowedWidths[nextIdx];
    }

    function sanitizeLayoutState(rawState, cardDescriptors) {
        const state = rawState && typeof rawState === 'object' ? rawState : {};
        const descriptorMap = new Map(cardDescriptors.map(d => [d.id, d]));

        // 1. Order: keep valid known IDs without duplicates, then append any missing cards
        const seen = new Set();
        const order = [];
        if (Array.isArray(state.order)) {
            state.order.forEach(id => {
                if (descriptorMap.has(id) && !seen.has(id)) {
                    seen.add(id);
                    order.push(id);
                }
            });
        }
        cardDescriptors.forEach(d => {
            if (!seen.has(d.id)) {
                seen.add(d.id);
                order.push(d.id);
            }
        });

        // 2. Widths: enforce per-card allowedWidths
        const widths = {};
        const rawWidths = state.widths && typeof state.widths === 'object' ? state.widths : {};
        cardDescriptors.forEach(d => {
            const candidate = rawWidths[d.id] !== undefined ? String(rawWidths[d.id]).toLowerCase() : null;
            widths[d.id] = (candidate && d.allowedWidths.includes(candidate)) ? candidate : d.defaultWidth;
        });

        // 3. Collapsed (<details> open state): boolean per collapsible card
        const collapsed = {};
        const rawCollapsed = state.collapsed && typeof state.collapsed === 'object' ? state.collapsed : {};
        cardDescriptors.forEach(d => {
            if (!d.hasDetails) return;
            if (typeof rawCollapsed[d.id] === 'boolean') {
                collapsed[d.id] = rawCollapsed[d.id];
            } else {
                collapsed[d.id] = d.defaultCollapsed;
            }
        });

        return { order, widths, collapsed };
    }

    function initFacilitatorLayout() {
        if (typeof document === 'undefined') return;
        const grid = document.querySelector('#facilitator-dashboard .grid');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll(':scope > .admin-card[data-card-id]'));
        if (cards.length === 0) return;

        const cardMap = new Map();
        const descriptors = cards.map(card => {
            const id = card.getAttribute('data-card-id');
            const defaultWidth = (card.getAttribute('data-default-width') || '1').trim().toLowerCase();
            const allowedWidths = parseAllowedWidths(card.getAttribute('data-allowed-widths'), defaultWidth);
            const detailsEl = card.querySelector(':scope > details');
            const desc = {
                id,
                defaultWidth,
                allowedWidths,
                hasDetails: Boolean(detailsEl),
                defaultCollapsed: detailsEl ? !detailsEl.hasAttribute('open') : false
            };
            cardMap.set(id, { card, desc, detailsEl, widthBtn: null });
            return desc;
        });

        let savedRaw = null;
        try {
            const str = localStorage.getItem(STORAGE_KEY);
            if (str) savedRaw = JSON.parse(str);
        } catch (_) {
            savedRaw = null;
        }

        let layoutState = sanitizeLayoutState(savedRaw, descriptors);

        function saveState() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(layoutState));
            } catch (_) {
                // Ignore storage quota errors
            }
        }

        function triggerRelayout() {
            if (typeof global.relayoutFacilitatorGrid === 'function') {
                global.relayoutFacilitatorGrid();
            }
        }

        function applyWidth(id, width) {
            const entry = cardMap.get(id);
            if (!entry) return;
            const validWidth = entry.desc.allowedWidths.includes(width) ? width : entry.desc.defaultWidth;
            layoutState.widths[id] = validWidth;

            SPAN_CLASSES.forEach(cls => entry.card.classList.remove(cls));
            if (validWidth === '2') entry.card.classList.add('span-2');
            else if (validWidth === '3') entry.card.classList.add('span-3');
            else if (validWidth === 'full') entry.card.classList.add('span-full');

            if (entry.widthBtn) {
                entry.widthBtn.textContent = '↔';
                entry.widthBtn.title = `Card width: ${formatWidthLabel(validWidth)} (click to cycle: ${entry.desc.allowedWidths.map(formatWidthLabel).join(' → ')})`;
                entry.widthBtn.setAttribute('aria-label', `Cycle card width (currently ${formatWidthLabel(validWidth)})`);
            }
        }

        function applyOrder(orderIds) {
            const sizer = grid.querySelector(':scope > .grid-sizer');
            orderIds.forEach(id => {
                const entry = cardMap.get(id);
                if (entry) grid.appendChild(entry.card);
            });
            if (sizer && grid.firstChild !== sizer) {
                grid.insertBefore(sizer, grid.firstChild);
            }
        }

        function applyCollapsed(id, isCollapsed) {
            const entry = cardMap.get(id);
            if (!entry || !entry.detailsEl) return;
            layoutState.collapsed[id] = Boolean(isCollapsed);
            if (isCollapsed) entry.detailsEl.removeAttribute('open');
            else entry.detailsEl.setAttribute('open', '');
        }

        // Drag-and-drop state
        let draggedCardId = null;

        function clearDropTargets() {
            cardMap.forEach(({ card }) => card.classList.remove('fac-card-drop-target'));
        }

        // Inject header controls & bind events
        descriptors.forEach(desc => {
            const entry = cardMap.get(desc.id);
            const { card, detailsEl } = entry;

            const controls = document.createElement('div');
            controls.className = 'fac-card-controls';
            controls.addEventListener('click', (e) => e.stopPropagation());

            if (desc.allowedWidths.length > 1) {
                const widthBtn = document.createElement('button');
                widthBtn.type = 'button';
                widthBtn.className = 'fac-card-width-btn';
                widthBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const nextWidth = getNextWidth(layoutState.widths[desc.id], desc.allowedWidths);
                    applyWidth(desc.id, nextWidth);
                    saveState();
                    triggerRelayout();
                });
                entry.widthBtn = widthBtn;
                controls.appendChild(widthBtn);
            }

            const dragHandle = document.createElement('button');
            dragHandle.type = 'button';
            dragHandle.className = 'fac-card-drag-handle';
            dragHandle.textContent = '⋮⋮';
            dragHandle.title = 'Drag to reorder card';
            dragHandle.setAttribute('aria-label', `Drag to reorder ${desc.id} card`);
            dragHandle.addEventListener('pointerdown', () => {
                card.setAttribute('draggable', 'true');
            });
            dragHandle.addEventListener('pointerup', () => {
                if (!draggedCardId) card.removeAttribute('draggable');
            });
            dragHandle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            controls.appendChild(dragHandle);

            // Mount controls in the top-right corner of the card
            card.appendChild(controls);

            // Persist <details> toggle
            if (detailsEl) {
                detailsEl.addEventListener('toggle', () => {
                    layoutState.collapsed[desc.id] = !detailsEl.open;
                    saveState();
                    triggerRelayout();
                });
            }

            // HTML5 Drag-and-Drop handlers on card
            card.addEventListener('dragstart', (e) => {
                if (card.getAttribute('draggable') !== 'true') {
                    e.preventDefault();
                    return;
                }
                draggedCardId = desc.id;
                card.classList.add('fac-card-dragging');
                if (e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', desc.id);
                }
            });

            card.addEventListener('dragover', (e) => {
                if (!draggedCardId || draggedCardId === desc.id) return;
                e.preventDefault();
                if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
                clearDropTargets();
                card.classList.add('fac-card-drop-target');
            });

            card.addEventListener('dragleave', (e) => {
                if (!card.contains(e.relatedTarget)) {
                    card.classList.remove('fac-card-drop-target');
                }
            });

            card.addEventListener('drop', (e) => {
                if (!draggedCardId || draggedCardId === desc.id) return;
                e.preventDefault();
                clearDropTargets();

                const fromIdx = layoutState.order.indexOf(draggedCardId);
                const toIdx = layoutState.order.indexOf(desc.id);
                if (fromIdx === -1 || toIdx === -1) return;

                const nextOrder = layoutState.order.slice();
                nextOrder.splice(fromIdx, 1);
                nextOrder.splice(toIdx, 0, draggedCardId);
                layoutState.order = nextOrder;

                applyOrder(layoutState.order);
                saveState();
                triggerRelayout();
            });

            card.addEventListener('dragend', () => {
                draggedCardId = null;
                card.classList.remove('fac-card-dragging');
                card.removeAttribute('draggable');
                clearDropTargets();
            });
        });

        // Apply initial hydrated state
        applyOrder(layoutState.order);
        descriptors.forEach(desc => {
            applyWidth(desc.id, layoutState.widths[desc.id]);
            if (desc.hasDetails) {
                applyCollapsed(desc.id, layoutState.collapsed[desc.id]);
            }
        });
        triggerRelayout();

        global.resetFacilitatorLayout = function() {
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (_) {
                // Ignore storage errors
            }
            layoutState = sanitizeLayoutState(null, descriptors);
            applyOrder(layoutState.order);
            descriptors.forEach(desc => {
                applyWidth(desc.id, desc.defaultWidth);
                if (desc.hasDetails) {
                    applyCollapsed(desc.id, desc.defaultCollapsed);
                }
            });
            triggerRelayout();
            const menu = document.getElementById('dropdown-menu');
            if (menu) menu.classList.remove('show');
        };
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', initFacilitatorLayout);
    }

    const FacilitatorLayout = {
        parseAllowedWidths,
        getNextWidth,
        sanitizeLayoutState
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = FacilitatorLayout;
    } else {
        global.FacilitatorLayout = FacilitatorLayout;
    }
})(typeof window !== 'undefined' ? window : globalThis);
