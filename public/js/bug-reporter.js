// In-Game Bug & Feedback Reporting System (Client Module)
(function() {
    'use strict';

    // Lazy-load CSS stylesheet ONLY when the bug reporting system is actively enabled
    function loadBugReporterCss() {
        if (typeof document !== 'undefined' && !document.querySelector('link[href*="bug-reporter.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/bug-reporter.css';
            document.head.appendChild(link);
        }
    }

    // State
    let isEnabled = false;
    let targetAudience = 'all'; // 'all' or 'facilitator'
    let isOpen = false;
    let reports = [];
    let currentFilter = 'all';
    let unreadCount = 0;
    let githubConfig = { hasToken: false, repo: 'wrightjamie/crisis' };

    // Get socket instance from window or global io
    const socket = window.socket || (typeof io !== 'undefined' ? io() : null);
    if (!socket) {
        console.warn('BugReporter: socket.io not found.');
        return;
    }
    window.bugReporterSocket = socket;

    // Helper to determine if on facilitator or admin page
    function isFacilitatorPage() {
        return window.location.pathname.includes('facilitator') || window.location.pathname.includes('admin') || !!document.getElementById('facilitator-view');
    }

    // Get current user context
    function getUserContext() {
        const isFac = isFacilitatorPage();
        const isAdmin = window.location.pathname.includes('admin');
        const urlGameId = new URLSearchParams(window.location.search).get('game');
        const storedRole = sessionStorage.getItem('crisis_role');
        const role = isAdmin ? 'admin' : (isFac ? 'facilitator' : (storedRole || 'anonymous'));
        
        let sender = 'Anonymous';
        if (isAdmin) {
            sender = 'System Admin';
        } else if (isFac) {
            sender = 'Facilitator (Admin)';
        } else if (storedRole) {
            sender = storedRole.toUpperCase();
        }

        // Scenario / Game State
        const state = window.localState || window.currentState || null;
        const gameId = urlGameId || (state ? state.gameId : null);
        const scenarioId = state ? (state.scenarioId || (state.scenarioConfig ? state.scenarioConfig.id : null)) : null;
        const stage = state && state.currentStageIndex !== undefined ? (state.currentStageIndex + 1) : null;

        return { role, sender, gameId, scenarioId, stage };
    }

    // Mount DOM elements
    function createWidgetDOM() {
        if (document.getElementById('bug-reporter-launcher')) return;

        // Launcher Button
        const launcher = document.createElement('button');
        launcher.id = 'bug-reporter-launcher';
        launcher.className = 'bug-reporter-launcher';
        launcher.title = 'Report a bug or feature request';
        launcher.style.display = 'none';
        launcher.innerHTML = `
            <span class="bug-icon">🐞</span>
            <span class="bug-label">Feedback & Bugs</span>
            <span id="bug-badge" class="bug-badge" style="display: none;">0</span>
        `;
        launcher.addEventListener('click', togglePanel);
        document.body.appendChild(launcher);

        // Panel Container
        const panel = document.createElement('div');
        panel.id = 'bug-reporter-panel';
        panel.className = 'bug-reporter-panel';
        panel.style.display = 'none';

        const isFac = isFacilitatorPage();
        const facHeaderBtn = isFac ? `
            <button id="bug-btn-copy-ai" class="bug-btn-icon" title="Copy reports to clipboard for AI / Developer">📋</button>
            <button id="bug-btn-download-md" class="bug-btn-icon" title="Download BUG_REPORTS.md">⬇️</button>
        ` : '';

        const facAudienceBar = isFac ? `
            <div id="bug-drawer-audience-bar" class="bug-drawer-audience-bar">
                <span class="text-xs text-secondary font-bold">Target Audience:</span>
                <select id="bug-drawer-target-select" class="bug-target-select-drawer" onchange="window.setBugReportingTarget(this.value)">
                    <option value="all">🌐 All Users</option>
                    <option value="facilitator">👤 Facilitator Only</option>
                </select>
            </div>
        ` : '';

        panel.innerHTML = `
            <div class="bug-panel-header">
                <div class="bug-panel-title">
                    <span>🐞 Bug & Feedback</span>
                    <span class="bug-live-dot" title="Live sync active"></span>
                    <span id="bug-drawer-sync-pill" class="bug-sync-pill bug-sync-amber" title="Local Storage">
                        <span class="bug-sync-dot"></span>
                        <span id="bug-drawer-sync-text">Local</span>
                    </span>
                </div>
                <div class="bug-header-actions">
                    ${facHeaderBtn}
                    <button id="bug-btn-close" class="bug-btn-icon" title="Close / Minimize">&times;</button>
                </div>
            </div>
            ${facAudienceBar}
            
            <div class="bug-filter-tabs">
                <button class="bug-tab active" data-filter="all">All (<span id="count-all">0</span>)</button>
                <button class="bug-tab" data-filter="bug">🐛 Bugs (<span id="count-bug">0</span>)</button>
                <button class="bug-tab" data-filter="feature">✨ Features (<span id="count-feature">0</span>)</button>
                <button class="bug-tab" data-filter="issue">💡 Other (<span id="count-issue">0</span>)</button>
            </div>

            <div id="bug-messages-container" class="bug-messages-container">
                <div class="bug-empty-state">
                    <div class="bug-empty-icon">📝</div>
                    <p class="m-0">No reports logged yet.</p>
                    <span class="text-xs">Submit a bug, issue, or feature idea below.</span>
                </div>
            </div>

            <div class="bug-panel-footer">
                <div class="bug-type-selector">
                    <label class="bug-type-chip selected">
                        <input type="radio" name="bug-input-type" value="bug" checked>
                        <span>🐛 Bug</span>
                    </label>
                    <label class="bug-type-chip">
                        <input type="radio" name="bug-input-type" value="feature">
                        <span>✨ Feature</span>
                    </label>
                    <label class="bug-type-chip">
                        <input type="radio" name="bug-input-type" value="issue">
                        <span>💡 Other</span>
                    </label>
                </div>
                <div class="bug-input-row">
                    <textarea id="bug-input-text" class="bug-textarea" placeholder="Type a bug, issue, or feature request..." rows="2"></textarea>
                    <button id="bug-btn-send" class="btn btn-primary bug-send-btn">Send</button>
                </div>
                <div class="bug-footer-note">
                    <span>Press Enter to send (Shift+Enter for newline)</span>
                    <span id="bug-sender-tag" class="text-secondary font-mono"></span>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Event bindings
        document.getElementById('bug-btn-close').addEventListener('click', () => togglePanel(false));
        document.getElementById('bug-btn-send').addEventListener('click', submitReport);

        const textarea = document.getElementById('bug-input-text');
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitReport();
            }
        });

        // Type chip styling toggle
        panel.querySelectorAll('.bug-type-chip input').forEach(input => {
            input.addEventListener('change', () => {
                panel.querySelectorAll('.bug-type-chip').forEach(c => c.classList.remove('selected'));
                input.closest('.bug-type-chip').classList.add('selected');
            });
        });

        // Filter tabs
        panel.querySelectorAll('.bug-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                panel.querySelectorAll('.bug-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.getAttribute('data-filter');
                renderReports();
            });
        });

        // Facilitator export buttons
        const btnCopyAi = document.getElementById('bug-btn-copy-ai');
        if (btnCopyAi) {
            btnCopyAi.addEventListener('click', copyReportsForAi);
        }
        const btnDownloadMd = document.getElementById('bug-btn-download-md');
        if (btnDownloadMd) {
            btnDownloadMd.addEventListener('click', downloadMarkdownFile);
        }
    }

    // Toggle Chat Panel visibility
    function togglePanel(explicitState) {
        loadBugReporterCss();
        isOpen = typeof explicitState === 'boolean' ? explicitState : !isOpen;
        const panel = document.getElementById('bug-reporter-panel');
        if (!panel) return;

        if (isOpen) {
            panel.style.display = 'flex';
            unreadCount = 0;
            updateBadge();
            const textarea = document.getElementById('bug-input-text');
            if (textarea) textarea.focus();
            
            // Update sender context tag in footer
            const ctx = getUserContext();
            const tag = document.getElementById('bug-sender-tag');
            if (tag) tag.textContent = `${ctx.sender}`;
            renderReports();
        } else {
            panel.style.display = 'none';
        }
    }

    // Update Launcher Badge
    function updateBadge() {
        const badge = document.getElementById('bug-badge');
        if (!badge) return;
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }

    // Update Counts
    function updateCounts() {
        const total = reports.length;
        const bugs = reports.filter(r => r.type === 'bug').length;
        const features = reports.filter(r => r.type === 'feature').length;
        const issues = reports.filter(r => r.type === 'issue').length;

        const elAll = document.getElementById('count-all');
        const elBug = document.getElementById('count-bug');
        const elFeat = document.getElementById('count-feature');
        const elIssue = document.getElementById('count-issue');

        if (elAll) elAll.textContent = total;
        if (elBug) elBug.textContent = bugs;
        if (elFeat) elFeat.textContent = features;
        if (elIssue) elIssue.textContent = issues;

        // Facilitator Dashboard count if exists
        const dashCount = document.getElementById('bug-system-count-dashboard');
        if (dashCount) {
            dashCount.textContent = `(${total} total reports: ${bugs} bugs, ${features} features)`;
        }
    }

    // Render reports list
    function renderReports() {
        const container = document.getElementById('bug-messages-container');
        if (!container) return;

        updateCounts();

        const filtered = currentFilter === 'all' 
            ? reports 
            : reports.filter(r => r.type === currentFilter);

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="bug-empty-state">
                    <div class="bug-empty-icon">📝</div>
                    <p class="m-0">No ${currentFilter === 'all' ? '' : currentFilter} reports recorded.</p>
                    <span class="text-xs">Use the box below to log an issue or suggestion.</span>
                </div>
            `;
            return;
        }

        const isFac = isFacilitatorPage();
        let html = '';

        // Display in chronological order for chat experience (oldest at top, newest at bottom)
        const displayList = [...filtered].reverse();

        for (const r of displayList) {
            const timeStr = new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const typeClass = `type-${r.type}`;
            const isFacSender = r.role === 'facilitator';

            let statusClass = 'bug-status-open';
            if (r.status === 'In Progress') statusClass = 'bug-status-inprogress';
            if (r.status === 'Resolved') statusClass = 'bug-status-resolved';

            const statusClickable = isFac ? 'clickable' : '';
            const statusTitle = isFac ? 'Click to toggle status (Open / In Progress / Resolved)' : 'Status';

            let ghHtml = '';
            if (r.githubIssue && r.githubIssue.url) {
                ghHtml = `<a href="${r.githubIssue.url}" target="_blank" rel="noopener" class="bug-github-link">🔗 GitHub #${r.githubIssue.number}</a>`;
            }

            let metaParts = [];
            if (r.gameId) metaParts.push(`Game ${r.gameId}`);
            if (r.scenarioId) metaParts.push(r.scenarioId);
            if (r.stage !== null && r.stage !== undefined) metaParts.push(`Stg ${r.stage}`);
            const metaStr = metaParts.length > 0 ? metaParts.join(' • ') : '';

            html += `
                <div class="bug-message-card ${typeClass}" data-id="${r.id}">
                    <div class="bug-card-top">
                        <div class="bug-card-sender">
                            <span>${escapeHtml(r.sender)}</span>
                            <span class="bug-role-tag ${isFacSender ? 'fac' : ''}">${escapeHtml(r.role)}</span>
                        </div>
                        <div class="bug-card-meta">
                            <span>${timeStr}</span>
                            <span class="bug-status-pill ${statusClass} ${statusClickable}" title="${statusTitle}" onclick="window.cycleBugStatus && window.cycleBugStatus('${r.id}')">${r.status || 'Open'}</span>
                        </div>
                    </div>
                    ${metaStr ? `<div class="bug-card-context">${escapeHtml(metaStr)}</div>` : ''}
                    <div class="bug-card-text">${escapeHtml(r.text)}</div>
                    ${ghHtml}
                </div>
            `;
        }

        container.innerHTML = html;
        // Auto scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // Submit a new report
    function submitReport() {
        const textarea = document.getElementById('bug-input-text');
        if (!textarea) return;
        const text = textarea.value.trim();
        if (!text) return;

        const checkedRadio = document.querySelector('input[name="bug-input-type"]:checked');
        const type = checkedRadio ? checkedRadio.value : 'bug';

        const ctx = getUserContext();
        const payload = {
            type,
            text,
            sender: ctx.sender,
            role: ctx.role,
            gameId: ctx.gameId,
            scenarioId: ctx.scenarioId,
            stage: ctx.stage
        };

        socket.emit('submit_bug_report', payload);
        textarea.value = '';
    }

    // Status cycling for facilitator
    window.cycleBugStatus = function(reportId) {
        if (!isFacilitatorPage()) return;
        const report = reports.find(r => r.id === reportId);
        if (!report) return;

        let nextStatus = 'In Progress';
        if (report.status === 'Open') nextStatus = 'In Progress';
        else if (report.status === 'In Progress') nextStatus = 'Resolved';
        else if (report.status === 'Resolved') nextStatus = 'Open';

        socket.emit('update_bug_report_status', { id: reportId, status: nextStatus });
    };

    // Copy markdown for AI prompt
    function copyReportsForAi() {
        fetch('/api/bug-reports/markdown')
            .then(res => res.text())
            .then(text => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('📋 Copied bug reports to clipboard! Paste directly to AI assistant.');
                    }).catch(() => fallbackCopy(text));
                } else {
                    fallbackCopy(text);
                }
            })
            .catch(err => {
                console.error(err);
                showToast('Failed to fetch bug reports markdown.');
            });
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('📋 Copied bug reports to clipboard! Paste directly to AI assistant.');
    }

    function downloadMarkdownFile() {
        window.open('/api/bug-reports/markdown', '_blank');
    }

    // Simple toast helper
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-info';
        toast.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:99999;background:var(--bg-secondary);border:1px solid var(--accent-blue);color:#fff;padding:0.75rem 1.25rem;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.5);font-size:0.9rem;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // HTML escape helper
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Apply enabled state to UI
    function setSystemEnabled(enabled, target) {
        isEnabled = Boolean(enabled);
        if (target !== undefined && target !== null) {
            targetAudience = target === 'facilitator' ? 'facilitator' : 'all';
        }

        const isFac = isFacilitatorPage();
        const visibleForMe = isEnabled && (targetAudience === 'all' || isFac);

        if (visibleForMe) {
            loadBugReporterCss();
        }

        const launcher = document.getElementById('bug-reporter-launcher');
        const panel = document.getElementById('bug-reporter-panel');

        if (launcher) {
            launcher.style.display = visibleForMe ? 'inline-flex' : 'none';
        }
        if (panel && !visibleForMe) {
            panel.style.display = 'none';
            isOpen = false;
        }

        // Sync Facilitator Dashboard controls if present
        const dashToggle = document.getElementById('toggle-bug-system-dashboard');
        const dashStatus = document.getElementById('bug-system-status-dashboard');
        const dashDetails = document.getElementById('bug-system-dashboard-details');
        const targetWrapper = document.getElementById('bug-target-wrapper');
        const selectBugTarget = document.getElementById('select-bug-target');
        const drawerTargetSelect = document.getElementById('bug-drawer-target-select');
        const bugSystemDesc = document.getElementById('bug-system-desc');

        if (dashDetails) {
            dashDetails.style.display = isEnabled ? 'flex' : 'none';
        }
        if (targetWrapper) {
            targetWrapper.style.display = isEnabled ? 'inline-flex' : 'none';
        }
        if (dashToggle) dashToggle.checked = isEnabled;
        if (selectBugTarget) selectBugTarget.value = targetAudience;
        if (drawerTargetSelect) drawerTargetSelect.value = targetAudience;

        if (dashStatus) {
            if (isEnabled) {
                const label = targetAudience === 'facilitator' ? 'Facilitator Only' : 'All Users';
                dashStatus.textContent = `Enabled (${label})`;
                dashStatus.className = 'text-bold text-accent-green';
            } else {
                dashStatus.textContent = 'Disabled';
                dashStatus.className = 'text-bold text-muted';
            }
        }

        if (bugSystemDesc) {
            if (!isEnabled) {
                bugSystemDesc.textContent = 'Enable in-game chat reporting for all player stations or just the facilitator.';
            } else if (targetAudience === 'facilitator') {
                bugSystemDesc.textContent = 'Active for facilitator only (hidden from player stations).';
            } else {
                bugSystemDesc.textContent = 'Active for all player stations and facilitator.';
            }
        }

        // Sync Header Button if present
        const headerStatus = document.getElementById('header-bug-status');
        const headerBtn = document.getElementById('btn-toggle-bugs');
        if (headerStatus) {
            if (!isEnabled) {
                headerStatus.textContent = 'OFF';
                headerStatus.style.color = 'var(--text-secondary)';
            } else {
                headerStatus.textContent = targetAudience === 'facilitator' ? 'FAC' : 'ALL';
                headerStatus.style.color = 'var(--accent-green)';
            }
        }
        if (headerBtn) {
            if (isEnabled) {
                headerBtn.classList.add('border-accent-green');
                const label = targetAudience === 'facilitator' ? 'Facilitator Only' : 'All Users';
                headerBtn.title = `Bug Reporting: ${label} (Click to switch / toggle)`;
            } else {
                headerBtn.classList.remove('border-accent-green');
                headerBtn.title = 'Toggle Bug & Feedback System (Currently OFF)';
            }
        }
    }

    // Traffic Light Status UI updater (Green = Git Sync, Amber = Local Only, Red = Storage Offline / Error)
    function updateSyncStatusUI(sync) {
        if (!sync) return;
        const color = sync.color || (sync.mode === 'git' ? 'green' : (sync.mode === 'error' ? 'red' : 'amber'));
        const label = sync.label || (sync.mode === 'git' ? 'Git Sync Active' : (sync.mode === 'error' ? 'Storage Offline' : 'Local Storage Only'));
        const details = sync.details || '';

        // Dashboard pill
        const dashBadge = document.getElementById('bug-sync-badge-dashboard');
        const dashText = document.getElementById('bug-sync-text-dashboard');
        if (dashBadge) {
            dashBadge.className = `bug-sync-pill bug-sync-${color}`;
            dashBadge.title = `${label}: ${details}`;
        }
        if (dashText) {
            dashText.textContent = label;
        }

        // Facilitator top bar dot
        const headerDot = document.getElementById('header-sync-dot');
        if (headerDot) {
            headerDot.className = `bug-sync-dot ${color}`;
            headerDot.title = `${label}: ${details}`;
        }

        // Drawer header pill
        const drawerPill = document.getElementById('bug-drawer-sync-pill');
        const drawerText = document.getElementById('bug-drawer-sync-text');
        if (drawerPill) {
            drawerPill.className = `bug-sync-pill bug-sync-${color}`;
            drawerPill.title = `${label}: ${details}`;
        }
        if (drawerText) {
            drawerText.textContent = color === 'green' ? 'Git' : (color === 'red' ? 'Error' : 'Local');
        }
    }

    // Toggle Bug Reporting Target (All Users vs Facilitator Only)
    window.setBugReportingTarget = function(target) {
        const nextTarget = target === 'facilitator' ? 'facilitator' : 'all';
        targetAudience = nextTarget;
        socket.emit('set_bug_reporting_target', { target: nextTarget });
    };

    // Toggle Bug Reporting (for Facilitator)
    window.toggleBugReporting = function(explicitVal, explicitTarget) {
        if (explicitVal !== undefined) {
            const nextVal = Boolean(explicitVal);
            const nextTarget = explicitTarget || targetAudience;
            socket.emit('toggle_bug_reporting', { enabled: nextVal, target: nextTarget });
        } else {
            // Header button clicked without arguments: cycle OFF -> ALL -> FAC -> OFF
            if (!isEnabled) {
                socket.emit('toggle_bug_reporting', { enabled: true, target: 'all' });
            } else if (targetAudience === 'all') {
                socket.emit('set_bug_reporting_target', { target: 'facilitator' });
            } else {
                socket.emit('toggle_bug_reporting', { enabled: false, target: 'all' });
            }
        }
    };

    window.promptSetGithubToken = function() {
        const token = prompt('Enter your GitHub Personal Access Token (starts with github_pat_ or ghp_):', '');
        if (token === null) return;
        
        showToast('Saving GitHub token...');
        fetch('/api/bug-reports/github-config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token.trim(), repo: 'wrightjamie/crisis' })
        })
        .then(r => r.json())
        .then(res => {
            if (res.syncStatus) updateSyncStatusUI(res.syncStatus);
            const icon = res.syncStatus?.color === 'green' ? '🟢' : '🟡';
            showToast(`${icon} GitHub token updated! ${res.syncStatus?.label || ''}`);
        })
        .catch(err => {
            showToast(`🔴 Failed to set token: ${err.message}`);
        });
    };

    window.testBugSync = function() {
        showToast('Testing storage & GitHub sync...');
        fetch('/api/bug-reports/test-sync')
            .then(res => res.json())
            .then(status => {
                updateSyncStatusUI(status);
                const icon = status.color === 'green' ? '🟢' : (status.color === 'red' ? '🔴' : '🟡');
                showToast(`${icon} ${status.label} - ${status.details}`);
            })
            .catch(err => {
                showToast(`🔴 Failed to test sync: ${err.message}`);
            });
    };

    window.copyBugReportsForAi = copyReportsForAi;
    window.downloadBugReportsMd = downloadMarkdownFile;

    // Socket Event Handlers
    socket.on('bug_reporting_config', (config) => {
        reports = config.reports || [];
        githubConfig = config.github || githubConfig;
        
        updateSyncStatusUI(config.syncStatus || (config.github && config.github.syncStatus));
        setSystemEnabled(config.enabled, config.target);
        renderReports();
    });

    socket.on('bug_sync_status_updated', (syncStatus) => {
        updateSyncStatusUI(syncStatus);
    });

    socket.on('bug_reporting_toggled', (data) => {
        setSystemEnabled(data.enabled, data.target);
    });

    socket.on('new_bug_report', (report) => {
        reports.unshift(report);
        if (!isOpen) {
            unreadCount++;
            updateBadge();
        }
        renderReports();
    });

    socket.on('bug_report_updated', (updated) => {
        const idx = reports.findIndex(r => r.id === updated.id);
        if (idx !== -1) {
            reports[idx] = updated;
            renderReports();
        }
    });

    socket.on('bug_reporting_github_updated', (status) => {
        githubConfig = status;
        const ghIndicator = document.getElementById('bug-gh-indicator');
        if (ghIndicator) {
            ghIndicator.style.display = status.hasToken ? 'inline-block' : 'none';
        }
    });

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createWidgetDOM();
            socket.emit('request_bug_reports');
        });
    } else {
        createWidgetDOM();
        socket.emit('request_bug_reports');
    }

})();
