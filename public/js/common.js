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

    // 7. Toast Notification Engine
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

        let icon = 'ℹ️';
        let borderColor = 'var(--border-color)';
        if (type === 'success') {
            icon = '✅';
            borderColor = 'rgba(16, 185, 129, 0.4)';
        } else if (type === 'error') {
            icon = '❌';
            borderColor = 'rgba(239, 68, 68, 0.4)';
        } else if (type === 'warning') {
            icon = '⚠️';
            borderColor = 'rgba(245, 158, 11, 0.4)';
        }

        toast.style.borderColor = borderColor;
        toast.innerHTML = `<span style="margin-right: 0.5rem;">${icon}</span><span>${escapeHtml(message)}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, durationMs);
    }

    // 8. Safe HTML Escaping
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
        escapeHtml
    };

    window.common = common;
    window.CrisisCommon = common;
})();
