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
const { validateScenario } = require('./src/validate-scenarios');
const {
    ROLE_PRESETS,
    SCORE_PRESETS,
    MAP_PRESETS,
    getAssetPresetsWithResolvedImages,
    suggestComplementaryRoles,
    generateBriefingSuggestion
} = require('./src/asset-presets');
const AdmZip = require('adm-zip');

// Ensure core built-in scenarios and base images are seeded into SQLite on any fresh deployment
try {
    const seeded = scenarioService.ensureCoreScenariosSeeded();
    if (seeded > 0) {
        console.log(`Seeded ${seeded} core scenario(s) into SQLite.`);
    }
} catch (err) {
    console.warn('Core scenario auto-seed check warning:', err.message);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Parse JSON bodies for API endpoints (allow up to 5MB for rich scenarios & guides)
app.use(express.json({ limit: '5mb' }));

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
    const session = accessControl.verifyRequest(req);
    if (!session.authenticated) {
        return res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
    }
    next();
}

app.get('/facilitator', checkPageAuth);
app.get('/admin', checkPageAuth);
app.get('/editor', checkPageAuth);
app.get('/editor.html', checkPageAuth);

// Serve static vendor files
app.use('/vendor/tagify', express.static(path.join(__dirname, 'node_modules/@yaireo/tagify/dist')));

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
    try {
        const result = accessControl.authenticate(req.body);
        if (result.success) {
            res.cookie('auth_token', result.token, { httpOnly: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
            return res.json(result);
        }
        res.status(401).json(result);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, error: 'Authentication failed due to internal error' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    try {
        const token = accessControl.extractToken(req);
        accessControl.invalidateSession(token);
        res.clearCookie('auth_token');
        res.json({ success: true });
    } catch (err) {
        console.error('Logout error:', err);
        res.json({ success: true });
    }
});

app.get('/api/auth/me', (req, res) => {
    try {
        res.json(accessControl.verifyRequest(req));
    } catch (err) {
        console.error('Auth verification error:', err);
        res.json({ authenticated: false });
    }
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
    const publishedOnly = req.query.publishedOnly === 'true';
    res.json(scenarioService.listScenarios({ publishedOnly }));
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

// Scenario Editor Presets & AI Role Suggester
app.get('/api/editor/presets', (req, res) => {
    res.json({
        assets: getAssetPresetsWithResolvedImages(),
        roles: ROLE_PRESETS,
        scores: SCORE_PRESETS,
        maps: MAP_PRESETS
    });
});

app.post('/api/ai/suggest-roles', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const suggestions = suggestComplementaryRoles(req.body || {});
        res.json({ suggestions });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/ai/generate-briefing', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const text = generateBriefingSuggestion(req.body || {});
        res.json({ text });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/scenarios/validate', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const result = validateScenario(req.body || {});
        res.json(result);
    } catch (err) {
        res.status(400).json({ isValid: false, errors: [err.message] });
    }
});

app.post('/api/scenarios', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const scenarioData = req.body;
        if (!scenarioData || !scenarioData.id || !scenarioData.name) {
            return res.status(400).json({ error: "Scenario 'id' and 'name' are required" });
        }
        const existing = scenarioService.getScenario(scenarioData.id, { useDraft: true });
        if (existing) {
            return res.status(409).json({ error: `Scenario '${scenarioData.id}' already exists` });
        }
        const guideHtml = scenarioData._guideHtml || null;
        const saved = scenarioService.saveScenario(scenarioData, {
            guideHtml,
            isBuiltin: 0,
            asDraft: true
        });
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/scenarios/:id', (req, res) => {
    const useDraft = req.query.draft === 'true';
    const scenario = scenarioService.getScenario(req.params.id, { useDraft });
    if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
    res.json(scenario);
});

app.put('/api/scenarios/:id/draft', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const scenarioData = { ...req.body, id: req.params.id };
        const guideHtml = scenarioData._guideHtml !== undefined ? scenarioData._guideHtml : null;
        const saved = scenarioService.saveScenario(scenarioData, {
            guideHtml,
            asDraft: true
        });
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/scenarios/:id/publish', accessControl.requireAuth('admin'), (req, res) => {
    try {
        if (req.body && req.body.id) {
            const guideHtml = req.body._guideHtml !== undefined ? req.body._guideHtml : null;
            scenarioService.saveScenario({ ...req.body, id: req.params.id }, { guideHtml, asDraft: true });
        }
        const published = scenarioService.publishScenario(req.params.id);
        res.json(published);
    } catch (err) {
        res.status(400).json({
            error: err.message,
            validationErrors: err.validationErrors || [err.message]
        });
    }
});

app.post('/api/scenarios/:id/discard-draft', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const restored = scenarioService.discardDraft(req.params.id);
        res.json(restored);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/scenarios/:id/clone', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const { newId, newName } = req.body || {};
        const cloned = scenarioService.cloneScenario(req.params.id, { newId, newName });
        res.status(201).json(cloned);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/scenarios/:id/reset-builtin', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const reset = scenarioService.resetToBuiltin(req.params.id);
        res.json(reset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/scenarios/:id/test-session', accessControl.requireAuth('admin'), (req, res) => {
    try {
        const id = req.params.id;
        if (req.body && req.body.id) {
            const guideHtml = req.body._guideHtml !== undefined ? req.body._guideHtml : null;
            scenarioService.saveScenario({ ...req.body, id }, { guideHtml, asDraft: true });
        }
        const draftScenario = scenarioService.getScenario(id, { useDraft: true });
        if (!draftScenario) {
            return res.status(404).json({ error: `Scenario '${id}' not found` });
        }

        const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        const testGameId = `TEST-${suffix}`;
        const engine = gameManager.createGame(testGameId, `[TEST] ${draftScenario.name}`);
        if (!engine) {
            return res.status(500).json({ error: 'Could not allocate test game session' });
        }
        engine.useDraft = true;
        engine.isTestSession = true;
        engine.createLobby(id, {}, true);

        res.status(201).json({
            gameId: testGameId,
            scenarioId: id,
            redirectUrl: `/facilitator?game=${encodeURIComponent(testGameId)}`
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
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

app.patch('/api/bug-reports/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const report = await bugReports.updateReportStatus(req.params.id, status);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        io.emit('bug_report_updated', report);
        res.json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const setupSockets = require('./src/socket');

// Setup sockets
setupSockets(io, gameManager);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
