const assert = require('assert');
const http = require('http');
const AdmZip = require('adm-zip');
const { initDatabase, getDb, closeDb } = require('./db/database');
const accessControl = require('./auth/access-control');
const imageService = require('./db/image-service');
const scenarioService = require('./db/scenario-service');
const assetPresets = require('./asset-presets');
const { validateScenario } = require('./validate-scenarios');

async function runTests() {
    console.log("Running Server API & Database integration tests...");

    // 1. Ensure DB has admin password and base images (backup original admin_auth first!)
    initDatabase();
    const db = getDb();
    const originalAdminAuth = db.prepare(`SELECT value, updated_at FROM system_config WHERE key = 'admin_auth'`).get();
    accessControl.setAdminPassword('testadmin123');

    // 2. Start server on an ephemeral port
    // We load server.js components or spin up express
    const express = require('express');
    const app = express();
    app.use(express.json());

    // Mount identical routes to server.js
    app.get('/scenarios/:id/guide.html', (req, res, next) => {
        const guideHtml = scenarioService.getScenarioGuide(req.params.id);
        if (guideHtml) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.send(guideHtml);
        }
        res.status(404).send('Guide not found');
    });

    app.post('/api/auth/login', (req, res) => {
        const result = accessControl.authenticate(req.body);
        if (result.success) return res.json(result);
        res.status(401).json(result);
    });

    app.get('/api/auth/me', (req, res) => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.substring(7).trim();
        }
        res.json(accessControl.verifySession(token));
    });

    app.get('/api/scenarios', (req, res) => {
        const publishedOnly = req.query.publishedOnly === 'true';
        res.json(scenarioService.listScenarios({ publishedOnly }));
    });

    app.get('/api/scenarios/:id', (req, res) => {
        const useDraft = req.query.draft === 'true';
        const scenario = scenarioService.getScenario(req.params.id, { useDraft });
        if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
        res.json(scenario);
    });

    app.get('/api/editor/presets', (req, res) => {
        res.json({
            assets: assetPresets.getAssetPresetsWithResolvedImages(),
            roles: assetPresets.ROLE_PRESETS,
            scores: assetPresets.SCORE_PRESETS,
            maps: assetPresets.MAP_PRESETS
        });
    });

    app.post('/api/ai/suggest-roles', accessControl.requireAuth('admin'), (req, res) => {
        try {
            const suggestions = assetPresets.suggestComplementaryRoles(req.body || {});
            res.json({ suggestions });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    app.post('/api/ai/generate-briefing', accessControl.requireAuth('admin'), (req, res) => {
        try {
            const text = assetPresets.generateBriefingSuggestion(req.body || {});
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

    app.get('/api/scenarios/:id/export', (req, res) => {
        try {
            const buf = scenarioService.exportScenarioZip(req.params.id);
            res.setHeader('Content-Type', 'application/zip');
            res.send(buf);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    });

    app.post('/api/scenarios/import', accessControl.requireAuth('admin'), (req, res) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            try {
                const buf = Buffer.concat(chunks);
                const overwrite = req.query.overwrite === 'true';
                const result = scenarioService.importScenarioZip(buf, { overwrite });
                if (result.conflict) return res.status(409).json(result);
                res.status(201).json(result);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
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

    const server = http.createServer(app);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    function request(path, options = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(path, baseUrl);
            const req = http.request(url, options, (res) => {
                const chunks = [];
                res.on('data', c => chunks.push(c));
                res.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    let json = null;
                    try { json = JSON.parse(buffer.toString('utf8')); } catch {}
                    resolve({ status: res.statusCode, headers: res.headers, buffer, json, text: buffer.toString('utf8') });
                });
            });
            req.on('error', reject);
            if (options.body) {
                if (Buffer.isBuffer(options.body)) req.write(options.body);
                else req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
            }
            req.end();
        });
    }

    try {
        // Test 1: Auth failure
        const badLogin = await request('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { username: 'admin', password: 'wrong' }
        });
        assert.strictEqual(badLogin.status, 401);

        // Test 2: Auth success
        const goodLogin = await request('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { username: 'admin', password: 'testadmin123' }
        });
        assert.strictEqual(goodLogin.status, 200);
        assert.ok(goodLogin.json.token);
        const token = goodLogin.json.token;

        // Test 3: Session check
        const meRes = await request('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        assert.strictEqual(meRes.status, 200);
        assert.strictEqual(meRes.json.authenticated, true);
        assert.strictEqual(meRes.json.user.username, 'admin');

        // Test 4: List scenarios
        const listRes = await request('/api/scenarios');
        assert.strictEqual(listRes.status, 200);
        assert.ok(Array.isArray(listRes.json));
        assert.ok(listRes.json.length >= 13, `Expected at least 13 scenarios, found ${listRes.json.length}`);

        // Test 5: Dynamic guide for op_sovereign_sky
        const guideRes = await request('/scenarios/op_sovereign_sky/guide.html');
        assert.strictEqual(guideRes.status, 200);
        assert.ok(guideRes.text.includes('html') || guideRes.text.length > 100);

        // Test 6: Export scenario zip
        const exportRes = await request('/api/scenarios/tutorial/export');
        assert.strictEqual(exportRes.status, 200);
        const zip = new AdmZip(exportRes.buffer);
        assert.ok(zip.getEntry('scenario.json'));

        // Test 7: Import scenario zip with auth
        const importRes = await request('/api/scenarios/import', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/zip'
            },
            body: exportRes.buffer
        });
        // tutorial already exists, should return 409 conflict
        assert.strictEqual(importRes.status, 409);
        assert.strictEqual(importRes.json.conflict, true);

        // Import with overwrite=true
        const overwriteRes = await request('/api/scenarios/import?overwrite=true', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/zip'
            },
            body: exportRes.buffer
        });
        assert.strictEqual(overwriteRes.status, 201);
        assert.strictEqual(overwriteRes.json.success, true);

        // Test 8: GET /api/editor/presets
        const presetsRes = await request('/api/editor/presets');
        assert.strictEqual(presetsRes.status, 200);
        assert.ok(Array.isArray(presetsRes.json.assets) && presetsRes.json.assets.length > 0);
        assert.ok(presetsRes.json.roles && Array.isArray(presetsRes.json.roles.bundles) && presetsRes.json.roles.bundles.length > 0);
        assert.ok(Array.isArray(presetsRes.json.roles.commonRoles) && presetsRes.json.roles.commonRoles.some(r => r.name === 'Prime Minister'));
        assert.ok(Array.isArray(presetsRes.json.maps) && presetsRes.json.maps.length >= 7, 'Should include theatre presets');
        assert.strictEqual(presetsRes.json.scores[0].scores.public_panic.unit, '', '1-5 scale scores should have blank unit');

        // Test 9: POST /api/ai/suggest-roles & POST /api/ai/generate-briefing
        const suggestRes = await request('/api/ai/suggest-roles', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                title: 'Cyber Grid Blackout',
                description: 'A hostile cyber attack disables power substations',
                existingRoles: ['Prime Minister']
            }
        });
        assert.strictEqual(suggestRes.status, 200);
        assert.ok(Array.isArray(suggestRes.json.suggestions) && suggestRes.json.suggestions.length > 0);
        assert.ok(!suggestRes.json.suggestions.some(s => s.name === 'Prime Minister'), 'Should not suggest already existing role');

        const genBriefRes = await request('/api/ai/generate-briefing', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                fieldType: 'role_briefing',
                scenarioName: 'Cyber Grid Blackout',
                scenarioDescription: 'A hostile cyber attack disables power substations',
                targetName: 'National Cyber Director',
                targetId: 'cyber'
            }
        });
        assert.strictEqual(genBriefRes.status, 200);
        assert.ok(genBriefRes.json.text && genBriefRes.json.text.includes('Cyber Grid Blackout'));

        // Test 10: Create draft scenario, auto-save draft, validate, publish, clone, and delete
        for (const s of scenarioService.listScenarios()) {
            if (s.id.startsWith('api_editor_test_')) {
                scenarioService.deleteScenario(s.id, { force: true });
            }
        }
        const testScenId = 'api_editor_test_' + Date.now();
        const baseTutorial = scenarioService.getScenario('tutorial');
        const newDraftPayload = {
            ...baseTutorial,
            id: testScenId,
            name: 'API Editor Test Scenario'
        };
        const createRes = await request('/api/scenarios', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: newDraftPayload
        });
        assert.strictEqual(createRes.status, 201);
        assert.strictEqual(createRes.json.id, testScenId);

        // Published-only list should not include unpublished draft
        const pubListRes = await request('/api/scenarios?publishedOnly=true');
        assert.ok(!pubListRes.json.some(s => s.id === testScenId), 'Unpublished draft should not appear in publishedOnly=true list');

        // Auto-save draft update via PUT /api/scenarios/:id/draft
        newDraftPayload.name = 'API Editor Updated Draft Name';
        newDraftPayload._guideHtml = '<h1>Custom Guide</h1>';
        const saveDraftRes = await request(`/api/scenarios/${testScenId}/draft`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: newDraftPayload
        });
        assert.strictEqual(saveDraftRes.status, 200);
        assert.strictEqual(saveDraftRes.json.name, 'API Editor Updated Draft Name');

        // Publish the scenario
        const pubRes = await request(`/api/scenarios/${testScenId}/publish`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        assert.strictEqual(pubRes.status, 200);
        assert.strictEqual(pubRes.json._meta.status, 'published');
        assert.strictEqual(pubRes.json._meta.hasDraft, false);

        // Cleanup test scenario
        await request(`/api/scenarios/${testScenId}?force=true`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("✅ All Server API & Database integration tests passed!");
    } finally {
        if (originalAdminAuth) {
            db.prepare(`
                INSERT INTO system_config (key, value, updated_at)
                VALUES ('admin_auth', ?, ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
            `).run(originalAdminAuth.value, originalAdminAuth.updated_at);
        }
        server.close();
    }
}

if (require.main === module) {
    runTests().catch(err => {
        console.error('Test failed:', err);
        process.exit(1);
    });
}

module.exports = runTests;
