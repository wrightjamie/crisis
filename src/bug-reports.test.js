const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { BugReportManager } = require('./bug-reports');

const testDataPath = path.join(__dirname, '../scratch/test-bug-reports.json');
const testMdPath = path.join(__dirname, '../scratch/test-BUG_REPORTS.md');

// Ensure clean scratch dir
if (!fs.existsSync(path.dirname(testDataPath))) {
    fs.mkdirSync(path.dirname(testDataPath), { recursive: true });
}
if (fs.existsSync(testDataPath)) fs.unlinkSync(testDataPath);
if (fs.existsSync(testMdPath)) fs.unlinkSync(testMdPath);

async function runTests() {
    console.log('Running BugReportManager unit tests...');

    const manager = new BugReportManager(testDataPath, testMdPath);
    manager.githubToken = ''; // Don't call GitHub during unit tests

    // Test 1: Defaults
    assert.strictEqual(manager.isEnabled(), false, 'Default enabled should be false');
    assert.strictEqual(manager.getReports().length, 0, 'Default reports should be empty');

    // Test 2: Enable / Disable
    manager.setEnabled(true);
    assert.strictEqual(manager.isEnabled(), true, 'Enabled should be true after setEnabled(true)');
    manager.setEnabled(false);
    assert.strictEqual(manager.isEnabled(), false, 'Enabled should be false after setEnabled(false)');

    // Test 3: Add report
    manager.setEnabled(true);
    const report1 = await manager.addReport({
        type: 'bug',
        text: 'Test bug description',
        sender: 'Facilitator',
        role: 'facilitator',
        gameId: '1234',
        scenarioId: 'test_scenario',
        stage: 1
    });

    assert.strictEqual(report1.id, 'BR-1');
    assert.strictEqual(report1.type, 'bug');
    assert.strictEqual(report1.text, 'Test bug description');
    assert.strictEqual(report1.status, 'Open');
    assert.strictEqual(manager.getReports().length, 1);

    // Test 4: Add second report (feature)
    const report2 = await manager.addReport({
        type: 'feature',
        text: 'Add audio alert on event trigger',
        sender: 'Home Secretary',
        role: 'home_office',
        gameId: '1234'
    });

    assert.strictEqual(report2.id, 'BR-2');
    assert.strictEqual(report2.type, 'feature');
    assert.strictEqual(manager.getReports().length, 2);

    // Test 5: Status update
    manager.updateReportStatus('BR-1', 'In Progress');
    const updated = manager.getReports().find(r => r.id === 'BR-1');
    assert.strictEqual(updated.status, 'In Progress');

    // Test 6: Verify markdown file output
    assert(fs.existsSync(testMdPath), 'Markdown file should be created');
    const mdContent = fs.readFileSync(testMdPath, 'utf8');
    assert(mdContent.includes('Test bug description'), 'Markdown should contain bug description');
    assert(mdContent.includes('Add audio alert on event trigger'), 'Markdown should contain feature description');
    assert(mdContent.includes('In Progress'), 'Markdown should reflect updated status');

    // Test 7: Persistence reload
    const reloaded = new BugReportManager(testDataPath, testMdPath);
    assert.strictEqual(reloaded.isEnabled(), true);
    assert.strictEqual(reloaded.getReports().length, 2);

    // Test 8: GitHub Config & Traffic Light Sync Status
    reloaded.setGithubConfig({ repo: 'wrightjamie/crisis', token: '' });
    const localStatus = await reloaded.checkSyncStatus(true);
    assert.strictEqual(localStatus.color, 'amber', 'Empty token should result in amber (local storage)');
    assert.strictEqual(localStatus.mode, 'local');

    // Test 9: Unwritable storage yields red
    const unwritableManager = new BugReportManager('Z:\\nonexistent_crisis_test\\reports.json', testMdPath);
    unwritableManager.githubToken = '';
    const errorStatus = await unwritableManager.checkSyncStatus(true);
    assert.strictEqual(errorStatus.color, 'red', 'Unwritable storage should result in red');

    // Cleanup test scratch files
    if (fs.existsSync(testDataPath)) fs.unlinkSync(testDataPath);
    if (fs.existsSync(testMdPath)) fs.unlinkSync(testMdPath);

    console.log('✅ BugReportManager unit tests passed successfully.');
}

runTests().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
