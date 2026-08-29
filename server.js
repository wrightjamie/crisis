require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const gameManager = require('./src/game-manager');
const { getAllImages, getAllTags, getImage } = require('./src/image-library');
const bugReports = require('./src/bug-reports');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Parse JSON bodies for API endpoints
app.use(express.json());

// Serve static files from the 'public' directory, allowing extensionless URLs
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Serve static scenario files (images, acronyms, wikis)
app.use('/scenarios', express.static(path.join(__dirname, 'data/scenarios')));

// Basic route to ensure server is running
app.get('/ping', (req, res) => {
    res.send('pong');
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
    const enabled = bugReports.setEnabled(req.body.enabled);
    io.emit('bug_reporting_toggled', { enabled });
    res.json({ enabled });
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
