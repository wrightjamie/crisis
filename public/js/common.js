// Crisis Wargame - Common Shared Client Utilities
(function() {
    'use strict';

    // 1. Ensure Standard Head Assets
    if (typeof document !== 'undefined') {
        if (!document.querySelector('link[rel="icon"]')) {
            const fav = document.createElement('link');
            fav.rel = 'icon';
            fav.type = 'image/png';
            fav.href = 'images/favicon.png';
            document.head.appendChild(fav);
        }
    }

    // 2. Token & Auth Storage
    function getToken() {
        try {
            return localStorage.getItem('auth_token');
        } catch {
            return null;
        }
    }

    function setToken(token) {
        try {
            if (token) localStorage.setItem('auth_token', token);
            else localStorage.removeItem('auth_token');
        } catch {}
    }

    function clearToken() {
        try {
            localStorage.removeItem('auth_token');
        } catch {}
    }

    // 3. Authenticated Fetch Helper
    async function apiFetch(url, options = {}) {
        options.headers = options.headers || {};
        const token = getToken();
        if (token && !options.headers['Authorization']) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(url, options);
        if (res.status === 401) {
            clearToken();
            if (!window.location.pathname.includes('login')) {
                const redirect = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = `/login?redirect=${redirect}`;
            }
            throw new Error('Unauthorized');
        }
        return res;
    }

    // 4. Session & Capability Verifier
    async function checkAuth(requiredCapability = null) {
        const token = getToken();
        try {
            const res = await fetch('/api/auth/me', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const data = await res.json();
            if (!data.authenticated) {
                if (!window.location.pathname.includes('login')) {
                    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
                    window.location.href = `/login?redirect=${redirect}`;
                }
                return false;
            }

            if (requiredCapability && data.user) {
                const caps = data.user.capabilities || [];
                if (!caps.includes(requiredCapability) && data.user.role !== 'admin') {
                    showToast(`Forbidden: Requires '${requiredCapability}' capability`, 'error');
                    return false;
                }
            }
            return data.user;
        } catch (err) {
            if (!window.location.pathname.includes('login')) {
                const redirect = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = `/login?redirect=${redirect}`;
            }
            return false;
        }
    }

    // 5. Global Logout
    async function logout() {
        try {
            await apiFetch('/api/auth/logout', { method: 'POST' });
        } catch {}
        clearToken();
        window.location.href = '/login';
    }

    // 6. Socket Helper
    let cachedSocket = null;
    function getSocket(options = {}) {
        if (window.socket) return window.socket;
        if (cachedSocket) return cachedSocket;

        if (typeof io === 'undefined') {
            console.warn('Common: Socket.io library not loaded.');
            return null;
        }

        const socketOptions = {
            auth: {
                token: getToken()
            },
            ...options
        };

        cachedSocket = io(socketOptions);
        window.socket = cachedSocket;
        return cachedSocket;
    }

    // 7. Lucide SVG Icon Helper (zero emojis)
    // TODO: Audit remaining legacy views (facilitator.html, index.html) to ensure all emojis are replaced with Lucide SVG icons.
    const SVG_ICONS = {
        'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
        'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
        'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
        'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        'package': '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
        'folder': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
        'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'play': '<polygon points="5 3 19 12 5 21 5 3"/>',
        'rocket': '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
        'refresh': '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
        'copy': '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        'map': '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
        'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
        'bar-chart': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
        'git-branch': '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
        'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
        'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
        'check': '<polyline points="20 6 9 17 4 12"/>',
        'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        'x-circle': '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
        'info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
        'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
        'list': '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
        'zoom-in': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
        'zoom-out': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>',
        'maximize': '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
        'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
        'sliders': '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
        'chevron-up': '<polyline points="18 15 12 9 6 15"/>',
        'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
        'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
        'volume': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>'
    };

    function renderIcon(name, size = 14, extraClass = '') {
        const inner = SVG_ICONS[name] || SVG_ICONS['info'];
        const cls = extraClass ? ` class="${extraClass}"` : '';
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${cls}>${inner}</svg>`;
    }

    // 8. Toast Notification Engine
    let toastContainer = null;
    function getToastContainer() {
        if (!toastContainer) {
            toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
            }
        }
        return toastContainer;
    }

    function showToast(message, type = 'info', durationMs = 3500) {
        if (typeof document === 'undefined') return;
        const container = getToastContainer();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');

        let iconHtml = renderIcon('info', 16);
        let borderColor = 'var(--border-color)';
        if (type === 'success') {
            iconHtml = renderIcon('check-circle', 16);
            borderColor = 'rgba(16, 185, 129, 0.4)';
        } else if (type === 'error') {
            iconHtml = renderIcon('x-circle', 16);
            borderColor = 'rgba(239, 68, 68, 0.4)';
        } else if (type === 'warning') {
            iconHtml = renderIcon('alert-triangle', 16);
            borderColor = 'rgba(245, 158, 11, 0.4)';
        }

        toast.style.borderColor = borderColor;
        toast.innerHTML = `<span class="inline-flex items-center" style="margin-right: 0.5rem;">${iconHtml}</span><span>${escapeHtml(message)}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, durationMs);
    }

    // 9. Safe HTML Escaping
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // 10. Reusable Pagination Component (BR-13)
    function createPaginator({
        items = [],
        pageSize = 24,
        currentPage = 1,
        containerEl = null,
        onPageChange = null
    } = {}) {
        let _items = Array.isArray(items) ? items : [];
        let _pageSize = Math.max(1, Number(pageSize) || 24);
        let _currentPage = Math.max(1, Number(currentPage) || 1);
        let _container = containerEl;
        let _onPageChange = typeof onPageChange === 'function' ? onPageChange : null;

        function getTotalPages() {
            return Math.max(1, Math.ceil(_items.length / _pageSize));
        }

        function getCurrentPage() {
            return Math.min(_currentPage, getTotalPages());
        }

        function getPageItems() {
            const page = getCurrentPage();
            const start = (page - 1) * _pageSize;
            return _items.slice(start, start + _pageSize);
        }

        function setPage(newPage) {
            const maxPage = getTotalPages();
            _currentPage = Math.max(1, Math.min(newPage, maxPage));
            render();
            if (_onPageChange) {
                _onPageChange(getPageItems(), {
                    page: _currentPage,
                    totalPages: maxPage,
                    totalItems: _items.length,
                    pageSize: _pageSize
                });
            }
        }

        function setItems(newItems, resetToFirstPage = false) {
            _items = Array.isArray(newItems) ? newItems : [];
            if (resetToFirstPage) _currentPage = 1;
            else _currentPage = getCurrentPage();
            render();
            if (_onPageChange) {
                _onPageChange(getPageItems(), {
                    page: _currentPage,
                    totalPages: getTotalPages(),
                    totalItems: _items.length,
                    pageSize: _pageSize
                });
            }
        }

        function render() {
            if (!_container) return;
            const totalPages = getTotalPages();
            const page = getCurrentPage();
            const total = _items.length;

            if (total <= _pageSize) {
                _container.innerHTML = '';
                _container.style.display = 'none';
                return;
            }

            _container.style.display = 'flex';
            const startItem = (page - 1) * _pageSize + 1;
            const endItem = Math.min(page * _pageSize, total);

            _container.innerHTML = `
                <div class="pagination-bar flex-between items-center gap-sm flex-wrap w-100" style="padding: 0.75rem 0.25rem;">
                    <div class="text-xs text-muted">
                        Showing <strong>${startItem}–${endItem}</strong> of <strong>${total}</strong> items
                    </div>
                    <div class="inline-flex items-center gap-xs">
                        <button type="button" class="btn btn-secondary text-xs btn-pag-prev" ${page <= 1 ? 'disabled' : ''} title="Previous Page">
                            ← Prev
                        </button>
                        <span class="text-xs text-bold" style="padding: 0 0.4rem;">
                            Page ${page} of ${totalPages}
                        </span>
                        <button type="button" class="btn btn-secondary text-xs btn-pag-next" ${page >= totalPages ? 'disabled' : ''} title="Next Page">
                            Next →
                        </button>
                    </div>
                </div>
            `;

            _container.querySelector('.btn-pag-prev')?.addEventListener('click', () => {
                if (page > 1) setPage(page - 1);
            });
            _container.querySelector('.btn-pag-next')?.addEventListener('click', () => {
                if (page < totalPages) setPage(page + 1);
            });
        }

        return {
            setItems,
            setPage,
            getPageItems,
            getCurrentPage,
            getTotalPages,
            render,
            setContainer: (el) => { _container = el; render(); }
        };
    }

    // Export to global scope
    const common = {
        getToken,
        setToken,
        clearToken,
        apiFetch,
        checkAuth,
        logout,
        getSocket,
        showToast,
        escapeHtml,
        renderIcon,
        createPaginator
    };

    window.common = common;
    window.CrisisCommon = common;
})();
