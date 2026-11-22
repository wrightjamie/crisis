const assert = require('assert');
const {
    parseAllowedWidths,
    getNextWidth,
    sanitizeLayoutState
} = require('../public/js/facilitator-layout');

console.log('Running FacilitatorLayout unit tests...');

// 1. parseAllowedWidths
assert.deepStrictEqual(parseAllowedWidths('2, 3, Full'), ['2', '3', 'full']);
assert.deepStrictEqual(parseAllowedWidths('', '1'), ['1']);

// 2. getNextWidth cycling & locked single-width cards
assert.strictEqual(getNextWidth('2', ['2', '3', 'full']), '3');
assert.strictEqual(getNextWidth('3', ['2', '3', 'full']), 'full');
assert.strictEqual(getNextWidth('full', ['2', '3', 'full']), '2');
assert.strictEqual(getNextWidth('1', ['1']), '1', 'Locked single-width card must not change width');

// 3. sanitizeLayoutState: order, per-card width enforcement, and collapse persistence
const descriptors = [
    { id: 'event-explorer', defaultWidth: '3', allowedWidths: ['2', '3', 'full'], hasDetails: false, defaultCollapsed: false },
    { id: 'scores', defaultWidth: '1', allowedWidths: ['1'], hasDetails: true, defaultCollapsed: false },
    { id: 'active-events', defaultWidth: '1', allowedWidths: ['1', '2'], hasDetails: true, defaultCollapsed: false },
    { id: 'used-events', defaultWidth: '1', allowedWidths: ['1', '2'], hasDetails: true, defaultCollapsed: true }
];

const sanitized = sanitizeLayoutState({
    order: ['scores', 'unknown-card', 'event-explorer', 'scores'],
    widths: {
        'event-explorer': 'full',
        'scores': '3',          // invalid for scores (locked to 1) -> must clamp to default '1'
        'active-events': '2',
        'used-events': '99'     // invalid -> must clamp to default '1'
    },
    collapsed: {
        'scores': true,
        'used-events': false
    }
}, descriptors);

assert.deepStrictEqual(
    sanitized.order,
    ['scores', 'event-explorer', 'active-events', 'used-events'],
    'Should deduplicate, drop unknown IDs, and append missing cards in default order'
);
assert.strictEqual(sanitized.widths['event-explorer'], 'full');
assert.strictEqual(sanitized.widths['scores'], '1', 'Locked card width must reject invalid persisted width');
assert.strictEqual(sanitized.widths['active-events'], '2');
assert.strictEqual(sanitized.widths['used-events'], '1');
assert.strictEqual(sanitized.collapsed['scores'], true);
assert.strictEqual(sanitized.collapsed['active-events'], false, 'Missing collapse state should use defaultCollapsed');
assert.strictEqual(sanitized.collapsed['used-events'], false);
assert.strictEqual('event-explorer' in sanitized.collapsed, false, 'Non-details card should not appear in collapsed map');

console.log('✅ FacilitatorLayout unit tests passed successfully!');
