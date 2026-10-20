const fs = require('fs');
const path = require('path');

// Automatically load .env if present without requiring external dependencies
try {
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        for (const line of envContent.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx !== -1) {
                const key = trimmed.slice(0, eqIdx).trim();
                let val = trimmed.slice(eqIdx + 1).trim();
                val = val.replace(/^["'](.*)["']$/, '$1');
                if (!process.env[key]) {
                    process.env[key] = val;
                }
            }
        }
    }
} catch (e) {
    // Ignore .env read errors
}

class BugReportManager {
    constructor(dataPath, markdownPath) {
        this.dataPath = dataPath || path.join(__dirname, '../data/bug-reports.json');
        this.markdownPath = markdownPath || path.join(__dirname, '../BUG_REPORTS.md');
        this.enabled = false;
        this.reports = [];
        this.counter = 0;
        
        // GitHub Integration Settings
        this.githubRepo = process.env.GITHUB_REPO || 'wrightjamie/crisis';
        this.githubToken = process.env.GITHUB_TOKEN || process.env.CRISIS_GITHUB_TOKEN || '';
        
        // Traffic Light Sync Status (green = Git, amber = Local only, red = Cannot store)
        this.syncStatus = {
            mode: 'local',
            color: 'amber',
            label: 'Local Storage Only',
            details: 'Initializing...'
        };
        this.lastStatusCheck = 0;

        this.load();
        this.checkSyncStatus();
    }

    load() {
        try {
            const dataDir = path.dirname(this.dataPath);
            const tokenTxtPath = path.join(dataDir, 'github-token.txt');
            if (fs.existsSync(tokenTxtPath) && !this.githubToken) {
                const t = fs.readFileSync(tokenTxtPath, 'utf8').trim();
                if (t) this.githubToken = t;
            }

            if (fs.existsSync(this.dataPath)) {
                const raw = fs.readFileSync(this.dataPath, 'utf8');
                const data = JSON.parse(raw);
                this.enabled = Boolean(data.enabled);
                this.reports = Array.isArray(data.reports) ? data.reports : [];
                this.counter = typeof data.counter === 'number' ? data.counter : this.reports.length;
                if (data.githubRepo) this.githubRepo = data.githubRepo;
                if (data.githubToken && !this.githubToken) this.githubToken = data.githubToken;
            } else {
                this.enabled = false;
                this.reports = [];
                this.counter = 0;
                this.save();
            }
        } catch (err) {
            console.error('Error loading bug reports:', err);
            this.enabled = false;
            this.reports = [];
            this.counter = 0;
        }
    }

    save() {
        try {
            const dir = path.dirname(this.dataPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const payload = {
                enabled: this.enabled,
                counter: this.counter,
                githubRepo: this.githubRepo,
                githubToken: this.githubToken || undefined,
                hasGithubToken: Boolean(this.githubToken),
                lastUpdated: new Date().toISOString(),
                reports: this.reports
            };
            fs.writeFileSync(this.dataPath, JSON.stringify(payload, null, 2), 'utf8');
            this.updateMarkdown();
        } catch (err) {
            console.error('Error saving bug reports:', err);
        }
    }

    isEnabled() {
        return this.enabled;
    }

    setEnabled(value) {
        this.enabled = Boolean(value);
        this.save();
        return this.enabled;
    }

    getReports() {
        return [...this.reports];
    }

    async setGithubConfig({ token, repo }) {
        if (repo) this.githubRepo = repo.trim();
        if (token !== undefined) {
            this.githubToken = (token || '').trim();
            try {
                const dataDir = path.dirname(this.dataPath);
                if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
                fs.writeFileSync(path.join(dataDir, 'github-token.txt'), this.githubToken, 'utf8');
            } catch (e) {
                console.error('Error writing github-token.txt:', e);
            }
        }
        this.save();
        await this.checkSyncStatus(true);
        return this.getGithubStatus();
    }

    async checkSyncStatus(forceRefresh = false) {
        if (!forceRefresh && (Date.now() - this.lastStatusCheck < 180000) && this.syncStatus.details !== 'Initializing...') {
            return this.syncStatus;
        }

        // 1. Check local storage ability (Red check)
        try {
            const dir = path.dirname(this.dataPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            const testFile = path.join(dir, '.probe_write_test');
            fs.writeFileSync(testFile, 'ok', 'utf8');
            fs.unlinkSync(testFile);
        } catch (err) {
            this.syncStatus = {
                mode: 'error',
                color: 'red',
                label: 'Storage Offline',
                details: `Cannot write to disk: ${err.message}`
            };
            this.lastStatusCheck = Date.now();
            return this.syncStatus;
        }

        // 2. Check GitHub Token & connectivity (Green or Amber)
        if (!this.githubToken) {
            this.syncStatus = {
                mode: 'local',
                color: 'amber',
                label: 'Local Storage Only',
                details: 'Reports saved to disk/Docker volume (no GitHub token configured)'
            };
            this.lastStatusCheck = Date.now();
            return this.syncStatus;
        }

        try {
            const res = await fetch(`https://api.github.com/repos/${this.githubRepo}`, {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${this.githubToken}`,
                    'User-Agent': 'Crisis-Bug-Reporter'
                }
            });

            if (res.ok) {
                this.syncStatus = {
                    mode: 'git',
                    color: 'green',
                    label: 'Git Sync Active',
                    details: `Connected to GitHub (${this.githubRepo})`
                };
            } else if (res.status === 401 || res.status === 403) {
                this.syncStatus = {
                    mode: 'error',
                    color: 'red',
                    label: 'Git Auth Failed',
                    details: `GitHub HTTP ${res.status}: Invalid token or missing issue permissions`
                };
            } else {
                this.syncStatus = {
                    mode: 'local',
                    color: 'amber',
                    label: 'Local Storage (GitHub Unreachable)',
                    details: `GitHub responded with HTTP ${res.status}`
                };
            }
        } catch (err) {
            this.syncStatus = {
                mode: 'local',
                color: 'amber',
                label: 'Local Storage (Network Offline)',
                details: `Network error contacting GitHub: ${err.message}`
            };
        }

        this.lastStatusCheck = Date.now();
        return this.syncStatus;
    }

    getGithubStatus() {
        return {
            hasToken: Boolean(this.githubToken),
            repo: this.githubRepo,
            syncStatus: this.syncStatus
        };
    }

    getConfig() {
        return {
            enabled: this.enabled,
            reports: this.reports,
            github: this.getGithubStatus(),
            syncStatus: this.syncStatus
        };
    }

    async createGitHubIssue(report) {
        if (!this.githubToken || !this.githubRepo) {
            return null;
        }

        try {
            const typeLabel = report.type === 'bug' ? 'Bug' : (report.type === 'feature' ? 'Feature' : 'Feedback');
            const icon = report.type === 'bug' ? '🐛' : (report.type === 'feature' ? '✨' : '💡');
            const title = `[${typeLabel}] ${report.text.slice(0, 60)}${report.text.length > 60 ? '...' : ''}`;

            const labels = ['in-game-report'];
            if (report.type === 'bug') labels.push('bug');
            if (report.type === 'feature') labels.push('enhancement');

            let body = `### ${icon} In-Game ${typeLabel} Report (${report.id})\n\n`;
            body += `**Description:**\n${report.text}\n\n`;
            body += `----\n`;
            body += `**Metadata:**\n`;
            body += `- **Reported By:** ${report.sender} (\`${report.role}\`)\n`;
            if (report.gameId) body += `- **Game ID:** \`${report.gameId}\`\n`;
            if (report.scenarioId) body += `- **Scenario:** \`${report.scenarioId}\`\n`;
            if (report.stage !== null && report.stage !== undefined) body += `- **Stage:** ${report.stage}\n`;
            body += `- **Timestamp:** ${report.timestamp}\n`;

            const res = await fetch(`https://api.github.com/repos/${this.githubRepo}/issues`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${this.githubToken}`,
                    'User-Agent': 'Crisis-Bug-Reporter',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    body,
                    labels
                })
            });

            if (res.ok) {
                const data = await res.json();
                return {
                    issueNumber: data.number,
                    issueUrl: data.html_url
                };
            } else {
                const errData = await res.text();
                console.warn('GitHub Issue creation failed:', res.status, errData);
                return { error: `HTTP ${res.status}: ${errData.slice(0, 100)}` };
            }
        } catch (err) {
            console.warn('GitHub API request error:', err.message);
            return { error: err.message };
        }
    }

    async addReport({ type = 'bug', text = '', sender = '', role = '', gameId = null, scenarioId = null, stage = null }) {
        const trimmed = (text || '').trim();
        if (!trimmed) {
            throw new Error('Report text cannot be empty');
        }

        const validTypes = ['bug', 'feature', 'issue'];
        const normalizedType = validTypes.includes(type) ? type : 'bug';

        this.counter++;
        const id = `BR-${this.counter}`;
        const newReport = {
            id,
            timestamp: new Date().toISOString(),
            type: normalizedType,
            text: trimmed,
            role: role || 'anonymous',
            sender: sender || (role ? role.toUpperCase() : 'User'),
            gameId: gameId || null,
            scenarioId: scenarioId || null,
            stage: stage !== undefined && stage !== null ? stage : null,
            status: 'Open',
            githubIssue: null
        };

        // Try GitHub sync if token configured
        if (this.githubToken) {
            const ghResult = await this.createGitHubIssue(newReport);
            if (ghResult && ghResult.issueUrl) {
                newReport.githubIssue = {
                    number: ghResult.issueNumber,
                    url: ghResult.issueUrl
                };
            }
        }

        this.reports.unshift(newReport);
        this.save();
        return newReport;
    }

    updateReportStatus(id, newStatus) {
        const report = this.reports.find(r => r.id === id);
        if (!report) return null;

        const validStatuses = ['Open', 'In Progress', 'Resolved'];
        if (validStatuses.includes(newStatus)) {
            report.status = newStatus;
            report.updatedAt = new Date().toISOString();
            this.save();
        }
        return report;
    }

    clearReports() {
        this.reports = [];
        this.counter = 0;
        this.save();
    }

    generateMarkdown() {
        const total = this.reports.length;
        const bugs = this.reports.filter(r => r.type === 'bug').length;
        const features = this.reports.filter(r => r.type === 'feature').length;
        const issues = this.reports.filter(r => r.type === 'issue').length;
        const openCount = this.reports.filter(r => r.status === 'Open').length;
        const inProgressCount = this.reports.filter(r => r.status === 'In Progress').length;
        const resolvedCount = this.reports.filter(r => r.status === 'Resolved').length;

        let md = `# Bug Reports & Feature Requests\n\n`;
        md += `> Automatically synchronized with the Crisis in-game feedback system (\`data/bug-reports.json\`).\n`;
        md += `> Developers and AI assistants can review this list to track, fix bugs, or build requested features.\n\n`;

        md += `## Status Overview\n`;
        md += `- **System Active:** ${this.enabled ? '🟢 Enabled' : '⚪ Disabled'}\n`;
        md += `- **GitHub Sync:** ${this.githubToken ? `🟢 Active (${this.githubRepo})` : '⚪ Not Configured'}\n`;
        md += `- **Total Reports:** ${total}\n`;
        md += `- **Status:** 🟢 ${openCount} Open | 🟡 ${inProgressCount} In Progress | 🟣 ${resolvedCount} Resolved\n`;
        md += `- **Breakdown:** 🐛 ${bugs} Bugs | ✨ ${features} Features | 💡 ${issues} Issues/Feedback\n\n`;

        md += `---\n\n`;
        md += `## Reports List\n\n`;

        if (this.reports.length === 0) {
            md += `*No bug reports or feature requests recorded yet.*\n`;
        } else {
            for (const r of this.reports) {
                const icon = r.type === 'bug' ? '🐛' : (r.type === 'feature' ? '✨' : '💡');
                const statusEmoji = r.status === 'Resolved' ? '🟣' : (r.status === 'In Progress' ? '🟡' : '🟢');
                const typeLabel = r.type.charAt(0).toUpperCase() + r.type.slice(1);
                const formattedDate = new Date(r.timestamp).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

                let contextDetails = [];
                if (r.gameId) contextDetails.push(`Game: \`${r.gameId}\``);
                if (r.scenarioId) contextDetails.push(`Scenario: \`${r.scenarioId}\``);
                if (r.stage !== null && r.stage !== undefined) contextDetails.push(`Stage: ${r.stage}`);
                if (r.githubIssue) contextDetails.push(`[GitHub #${r.githubIssue.number}](${r.githubIssue.url})`);
                const contextStr = contextDetails.length > 0 ? ` | ${contextDetails.join(' | ')}` : '';

                md += `### [${r.id}] ${icon} ${typeLabel}: ${r.text.slice(0, 60)}${r.text.length > 60 ? '...' : ''}\n`;
                md += `- **Reported:** ${formattedDate}\n`;
                md += `- **Reporter:** ${r.sender} (\`${r.role}\`)${contextStr}\n`;
                md += `- **Status:** ${statusEmoji} **${r.status}**\n\n`;
                md += `> ${r.text.split('\n').join('\n> ')}\n\n`;
                md += `---\n\n`;
            }
        }
        return md;
    }

    updateMarkdown() {
        try {
            const md = this.generateMarkdown();
            fs.writeFileSync(this.markdownPath, md, 'utf8');
        } catch (err) {
            console.error('Error writing BUG_REPORTS.md:', err);
        }
    }
}

const bugReports = new BugReportManager();
module.exports = bugReports;
module.exports.BugReportManager = BugReportManager;
