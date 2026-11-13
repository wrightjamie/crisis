require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const gameManager = require('./src/game-manager');
const { getAllImages, getAllTags, getImage } = require('./src/image-library');
const bugReports = require('./src/bug-reports');
const accessControl = require('./src/auth/access-control');
const scenarioService = require('./src/db/scenario-service');
const AdmZip = require('adm-zip');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Parse JSON bodies for API endpoints
app.use(express.json());

// Dynamic scenario guide route from SQLite
app.get('/scenarios/:id/guide.html', (req, res, next) => {
    const guideHtml = scenarioService.getScenarioGuide(req.params.id);
    if (guideHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(guideHtml);
    }
    next();
});

// Protect /facilitator and /admin routes with Access Control
function checkPageAuth(req, res, next) {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.substring(7).trim();
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else if (req.headers.cookie) {
        const match = req.headers.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
        if (match) token = match[1];
    }

    const session = accessControl.verifySession(token);
    if (!session.authenticated) {
        return res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
    }
    next();
}

app.get('/facilitator', checkPageAuth);
app.get('/admin', checkPageAuth);

// Serve static files from the 'public' directory, allowing extensionless URLs
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Serve static scenario files (images, acronyms, wikis)
app.use('/scenarios', express.static(path.join(__dirname, 'data/scenarios')));

// Basic route to ensure server is running
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Access Control Endpoints
app.post('/api/auth/login', (req, res) => {
    const result = accessControl.authenticate(req.body);
    if (result.success) {
        res.cookie('auth_token', result.token, { httpOnly: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
        return res.json(result);
    }
    res.status(401).json(result);
});

app.post('/api/auth/logout', (req, res) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.substring(7).trim();
    } else if (req.body && req.body.token) {
        token = req.body.token;
    } else if (req.headers.cookie) {
        const match = req.headers.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
        if (match) token = match[1];
    }
    accessControl.invalidateSession(token);
    res.clearCookie('auth_token');
    res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.substring(7).trim();
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else if (req.headers.cookie) {
        const match = req.headers.cookie.match(/(?:^|;\s*)auth_token=([^;]+)/);
        if (match) token = match[1];
    }
    const session = accessControl.verifySession(token);
    res.json(session);
});

// Helper to extract uploaded zip buffer
function extractZipBuffer(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('error', err => reject(err));
        req.on('end', () => {
            const raw = Buffer.concat(chunks);
            if (raw.length === 0) return reject(new Error('No file uploaded'));

            const zipMagic = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
            const pkIdx = raw.indexOf(zipMagic);
            if (pkIdx === -1) {
                return resolve(raw);
            }

            const endRecord = Buffer.from([0x50, 0x4b, 0x05, 0x06]);
            const endIdx = raw.lastIndexOf(endRecord);
            if (endIdx !== -1 && endIdx >= pkIdx) {
                let commentLen = 0;
                if (raw.length >= endIdx + 22) {
                    commentLen = raw.readUInt16LE(endIdx + 20);
                }
                const zipEnd = endIdx + 22 + commentLen;
                return resolve(raw.subarray(pkIdx, Math.min(zipEnd, raw.length)));
            }

            resolve(raw.subarray(pkIdx));
        });
    });
}

// Scenarios API Endpoints
app.get('/api/scenarios', (req, res) => {
    res.json(scenarioService.listScenarios());
});

app.get('/api/scenarios/export-all', (req, res) => {
    try {
        const scenarios = scenarioService.listScenarios();
        const masterZip = new AdmZip();
        for (const s of scenarios) {
            const buf = scenarioService.exportScenarioZip(s.id);
            masterZip.addFile(`${s.id}.zip`, buf);
        }
        const masterBuffer = masterZip.toBuffer();
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="all-scenarios.zip"');
        res.send(masterBuffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/scenarios/:id', (req, res) => {
    const scenario = scenarioService.getScenario(req.params.id);
    if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
    res.json(scenario);
});

app.get('/api/scenarios/:id/export', (req, res) => {
    try {
        const zipBuffer = scenarioService.exportScenarioZip(req.params.id);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.id}.zip"`);
        res.send(zipBuffer);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.post('/api/scenarios/import', accessControl.requireAuth('admin'), async (req, res) => {
    try {
        const zipBuffer = await extractZipBuffer(req);
        const overwrite = req.query.overwrite === 'true' || req.headers['x-overwrite'] === 'true';
        const result = scenarioService.importScenarioZip(zipBuffer, { overwrite });
        if (result.conflict) {
            return res.status(409).json(result);
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/scenarios/:id', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const force = req.query.force === 'true';
        const result = scenarioService.deleteScenario(req.params.id, { force });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Shared Image Library API endpoints (for Scenario Editor & runtime tools)
app.get('/api/images/tags', (req, res) => {
    res.json(getAllTags());
});

app.get('/api/images/:id', (req, res) => {
    const img = getImage(req.params.id);
    if (!img) return res.status(404).json({ error: 'Image not found' });
    res.json(img);
});

app.get('/api/images', (req, res) => {
    res.json(getAllImages(req.query));
});

// Bug & Feedback Reporting API endpoints
app.get('/api/bug-reports', (req, res) => {
    res.json(bugReports.getConfig());
});

app.get('/api/bug-reports/test-sync', async (req, res) => {
    const syncStatus = await bugReports.checkSyncStatus(true);
    io.emit('bug_sync_status_updated', syncStatus);
    res.json(syncStatus);
});

app.get('/api/bug-reports/markdown', (req, res) => {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="BUG_REPORTS.md"');
    res.send(bugReports.generateMarkdown());
});

app.post('/api/bug-reports/toggle', (req, res) => {
    const enabled = bugReports.setEnabled(req.body.enabled, req.body.target);
    const target = bugReports.getTarget();
    io.emit('bug_reporting_toggled', { enabled, target });
    res.json({ enabled, target });
});

app.post('/api/bug-reports/target', (req, res) => {
    const target = bugReports.setTarget(req.body.target);
    io.emit('bug_reporting_toggled', { enabled: bugReports.enabled, target });
    res.json({ enabled: bugReports.enabled, target });
});

app.post('/api/bug-reports', async (req, res) => {
    try {
        const report = await bugReports.addReport(req.body);
        io.emit('new_bug_report', report);
        res.status(201).json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/bug-reports/github-config', async (req, res) => {
    const status = await bugReports.setGithubConfig(req.body);
    io.emit('bug_reporting_github_updated', status);
    io.emit('bug_sync_status_updated', bugReports.syncStatus);
    res.json({ ...status, syncStatus: bugReports.syncStatus });
});

const setupSockets = require('./src/socket');

// Setup sockets
setupSockets(io, gameManager);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
