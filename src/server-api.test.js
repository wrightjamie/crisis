const assert = require('assert');
const http = require('http');
const AdmZip = require('adm-zip');
const { initDatabase, closeDb } = require('./db/database');
const accessControl = require('./auth/access-control');
const imageService = require('./db/image-service');
const scenarioService = require('./db/scenario-service');

async function runTests() {
    console.log("Running Server API & Database integration tests...");

    // 1. Ensure DB has admin password and base images
    initDatabase();
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
        res.json(scenarioService.listScenarios());
    });

    app.get('/api/scenarios/:id', (req, res) => {
        const s = scenarioService.getScenario(req.params.id);
        if (!s) return res.status(404).json({ error: 'Not found' });
        res.json(s);
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

        console.log("✅ All Server API & Database integration tests passed!");
    } finally {
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
