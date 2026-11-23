const assert = require('assert');
const { initDatabase, closeDb } = require('../db/database');
const { AccessControl } = require('./access-control');

function runTests() {
    console.log("Running Access Control unit tests...");

    // Use in-memory SQLite DB for clean isolated test
    const testDb = initDatabase(':memory:');
    const auth = new AccessControl(() => testDb);

    // 1. Initial state: no admin password
    assert.strictEqual(auth.hasAdminPassword(), false, "Should report no admin password initially");

    const failedAuth = auth.authenticate({ username: 'admin', password: 'secretpassword' });
    assert.strictEqual(failedAuth.success, false, "Auth should fail when password not configured");

    // 2. Set admin password
    auth.setAdminPassword('secretpassword123');
    assert.strictEqual(auth.hasAdminPassword(), true, "Should report admin password configured");

    // 3. Failed logins (wrong username, wrong password)
    const wrongUser = auth.authenticate({ username: 'user', password: 'secretpassword123' });
    assert.strictEqual(wrongUser.success, false, "Should fail on non-admin username");

    const wrongPass = auth.authenticate({ username: 'admin', password: 'wrongpassword' });
    assert.strictEqual(wrongPass.success, false, "Should fail on incorrect password");

    // 4. Successful login
    const loginRes = auth.authenticate({ username: 'admin', password: 'secretpassword123' });
    assert.strictEqual(loginRes.success, true, "Should succeed with correct password");
    assert.ok(loginRes.token, "Should return session token");
    assert.strictEqual(loginRes.user.username, 'admin');

    // 5. Verify active session
    const verifyRes = auth.verifySession(loginRes.token);
    assert.strictEqual(verifyRes.authenticated, true, "Session should be authenticated");
    assert.strictEqual(verifyRes.user.username, 'admin');

    // 6. Capability checks
    assert.strictEqual(auth.checkCapability(verifyRes.user, 'admin'), true, "Admin should have admin capability");
    assert.strictEqual(auth.checkCapability(verifyRes.user, 'facilitator'), true, "Admin should have facilitator capability");
    assert.strictEqual(auth.checkCapability({ username: 'guest' }, 'admin'), false, "Guest should not have admin capability");

    // 7. Invalidate session (logout)
    const logoutRes = auth.invalidateSession(loginRes.token);
    assert.strictEqual(logoutRes, true, "Should successfully invalidate session");

    const verifyAfterLogout = auth.verifySession(loginRes.token);
    assert.strictEqual(verifyAfterLogout.authenticated, false, "Session should no longer be valid");

    // 8. Verify reset authorization via current password and one-time recovery code
    const badReset = auth.verifyResetAuthorization({ recoveryKey: 'INVALID-CODE' });
    assert.strictEqual(badReset.authorized, false, "Should reject invalid recovery code");

    const passReset = auth.verifyResetAuthorization({ currentPassword: 'secretpassword123' });
    assert.strictEqual(passReset.authorized, true, "Should authorize with current admin password");
    assert.strictEqual(passReset.method, 'password');

    const code = auth.generateRecoveryCode({ logToConsole: false });
    assert.ok(code && code.length === 9 && code.includes('-'), "Should generate formatted recovery code");

    const codeReset = auth.verifyResetAuthorization({ recoveryKey: code.toLowerCase().replace('-', '') });
    assert.strictEqual(codeReset.authorized, true, "Should authorize with recovery code (case/hyphen-insensitive)");
    assert.strictEqual(codeReset.method, 'recovery_code');

    const reusedCode = auth.verifyResetAuthorization({ recoveryKey: code });
    assert.strictEqual(reusedCode.authorized, false, "One-time recovery code should rotate after use");

    closeDb();
    console.log("✅ Access Control unit tests passed successfully!");
}

if (require.main === module) {
    runTests();
}

module.exports = runTests;
