const fs = require('fs');
let content = fs.readFileSync('public/js/facilitator.js', 'utf8');

content = content.replace(
    `const facBadge = g.hasFacilitator ? '<span class="role-badge" style="background-color: var(--status-1); color: #000; font-size: 0.8em; padding: 2px 6px;">Facilitator Online</span>' : '<span class="role-badge" style="background-color: var(--accent-orange); color: #000; font-size: 0.8em; padding: 2px 6px;">Facilitator Offline</span>';`,
    `const facBadge = g.hasFacilitator ? '<span class="role-badge" style="background-color: var(--status-1); color: var(--text-primary); font-size: 0.8em; padding: 2px 6px;">Facilitator Online</span>' : '<span class="role-badge" style="background-color: var(--accent-orange); color: var(--text-primary); font-size: 0.8em; padding: 2px 6px;">Facilitator Offline</span>';`
);

fs.writeFileSync('public/js/facilitator.js', content);
