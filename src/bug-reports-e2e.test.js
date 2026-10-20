const assert = require('assert');
const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const { BugReportManager } = require('./bug-reports');

async function runE2ETest() {
    console.log('Running Bug Reporting Server API E2E tests...');

    const testDataPath = path.join(__dirname, '../scratch/e2e-bug-reports.json');
    const testMdPath = path.join(__dirname, '../scratch/e2e-BUG_REPORTS.md');

    if (!fs.existsSync(path.dirname(testDataPath))) {
        fs.mkdirSync(path.dirname(testDataPath), { recursive: true });
    }
    if (fs.existsSync(testDataPath)) fs.unlinkSync(testDataPath);
    if (fs.existsSync(testMdPath)) fs.unlinkSync(testMdPath);

    const testBugManager = new BugReportManager(testDataPath, testMdPath);
    testBugManager.githubToken = ''; // Don't call GitHub in E2E mock tests

    const app = express();
    app.use(express.json());

    // Setup endpoints as in server.js
    app.get('/api/bug-reports', (req, res) => res.json(testBugManager.getConfig()));
    app.get('/api/bug-reports/markdown', (req, res) => res.send(testBugManager.generateMarkdown()));
    app.post('/api/bug-reports/toggle', (req, res) => {
        const enabled = testBugManager.setEnabled(req.body.enabled);
        res.json({ enabled });
    });
    app.post('/api/bug-reports', async (req, res) => {
        try {
            const report = await testBugManager.addReport(req.body);
            res.status(201).json(report);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    function request(method, path, body = null) {
        return new Promise((resolve, reject) => {
            const req = http.request(
                {
                    hostname: '127.0.0.1',
                    port,
                    path,
                    method,
                    headers: body ? { 'Content-Type': 'application/json' } : {}
                },
                (res) => {
                    let data = '';
                    res.on('data', (chunk) => (data += chunk));
                    res.on('end', () => {
                        resolve({
                            status: res.statusCode,
                            headers: res.headers,
                            data: res.headers['content-type']?.includes('json') ? JSON.parse(data) : data
                        });
                    });
                }
            );
            req.on('error', reject);
            if (body) req.write(JSON.stringify(body));
            req.end();
        });
    }

    try {
        // Test 1: Initial config
        const res1 = await request('GET', '/api/bug-reports');
        assert.strictEqual(res1.status, 200);
        assert.strictEqual(res1.data.enabled, false);
        assert.strictEqual(res1.data.reports.length, 0);

        // Test 2: Toggle ON
        const res2 = await request('POST', '/api/bug-reports/toggle', { enabled: true });
        assert.strictEqual(res2.status, 200);
        assert.strictEqual(res2.data.enabled, true);
        assert.strictEqual(testBugManager.isEnabled(), true);

        // Test 3: Submit bug report via API
        const res3 = await request('POST', '/api/bug-reports', {
            type: 'bug',
            text: 'Decision card submit button unresponsive on Safari',
            sender: 'Home Office',
            role: 'home_office',
            gameId: '4321',
            scenarioId: 'caribbean_crisis',
            stage: 2
        });
        assert.strictEqual(res3.status, 201);
        assert.strictEqual(res3.data.id, 'BR-1');
        assert.strictEqual(res3.data.status, 'Open');

        // Test 4: Verify markdown download endpoint
        const res4 = await request('GET', '/api/bug-reports/markdown');
        assert.strictEqual(res4.status, 200);
        assert(res4.data.includes('Decision card submit button unresponsive on Safari'));
        assert(res4.data.includes('Home Office'));

        // Test 5: Update status
        testBugManager.updateReportStatus('BR-1', 'Resolved');
        const res5 = await request('GET', '/api/bug-reports/markdown');
        assert(res5.data.includes('Resolved'));

        console.log('✅ Bug Reporting Server API E2E tests passed successfully.');
    } finally {
        server.close();
        if (fs.existsSync(testDataPath)) fs.unlinkSync(testDataPath);
        if (fs.existsSync(testMdPath)) fs.unlinkSync(testMdPath);
    }
}

runE2ETest().catch((err) => {
    console.error('E2E test failed:', err);
    process.exit(1);
});
