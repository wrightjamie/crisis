const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, '../public/css/style.css');
let content = fs.readFileSync(stylePath, 'utf8');

const replacements = [
    // Colors
    { search: /#000/g, replace: 'var(--color-black)' },
    { search: /#fff/g, replace: 'var(--color-white)' },
    { search: /#2563eb/g, replace: 'var(--color-blue-hover)' },
    { search: /rgba\(0,\s*0,\s*0,\s*0\.5\)/g, replace: 'var(--color-backdrop)' },
    { search: /rgba\(52,\s*152,\s*219,\s*0\.1\)/g, replace: 'var(--color-blue-faded)' },
    
    // Z-index
    { search: /z-index:\s*1000/g, replace: 'z-index: var(--z-panel)' },
    { search: /z-index:\s*2000/g, replace: 'z-index: var(--z-modal)' },
    { search: /z-index:\s*1;/g, replace: 'z-index: var(--z-base);' },
    
    // Shadows
    { search: /-4px 0 20px rgba\(0,0,0,0\.5\)/g, replace: 'var(--shadow-lg)' },
    { search: /0 0 10px\s+var\(--accent-red\)/g, replace: 'var(--shadow-glow)' },
    { search: /0 0 15px\s+var\(--status-4\)/g, replace: 'var(--shadow-glow-large)' },
    
    // Border Radius
    { search: /border-radius:\s*2px/g, replace: 'border-radius: var(--radius-xs)' },
    { search: /border-radius:\s*4px/g, replace: 'border-radius: var(--radius-sm)' },
    
    // Fonts
    { search: /font-weight:\s*bold/g, replace: 'font-weight: var(--font-bold)' },
    { search: /font-weight:\s*500/g, replace: 'font-weight: var(--font-medium)' },
    { search: /font-size:\s*0\.75rem/g, replace: 'font-size: var(--text-xs)' },
    { search: /font-size:\s*0\.8rem/g, replace: 'font-size: var(--text-xs)' },
    { search: /font-size:\s*0\.85rem/g, replace: 'font-size: var(--text-sm)' },
    { search: /font-size:\s*0\.9rem/g, replace: 'font-size: var(--text-base)' },
    { search: /font-size:\s*0\.95rem/g, replace: 'font-size: var(--text-base)' },
    { search: /font-size:\s*1\.1rem/g, replace: 'font-size: var(--text-md)' },
    { search: /font-size:\s*1\.5rem/g, replace: 'font-size: var(--text-lg)' },
    
    // Spacing
    { search: /padding:\s*0 1rem/g, replace: 'padding: 0 var(--space-md)' },
    { search: /padding:\s*0\.25rem 0\.75rem/g, replace: 'padding: var(--space-xs) 0.75rem' }, // 0.75 is non-standard
    { search: /padding:\s*1rem/g, replace: 'padding: var(--space-md)' },
    { search: /margin-bottom:\s*2rem/g, replace: 'margin-bottom: var(--space-xl)' },
    { search: /margin-bottom:\s*1rem/g, replace: 'margin-bottom: var(--space-md)' },
    { search: /padding-bottom:\s*0\.5rem/g, replace: 'padding-bottom: var(--space-sm)' },
    { search: /margin-bottom:\s*0\.5rem/g, replace: 'margin-bottom: var(--space-sm)' },
    { search: /padding:\s*0\.5rem/g, replace: 'padding: var(--space-sm)' },
    { search: /margin-bottom:\s*1\.5rem/g, replace: 'margin-bottom: var(--space-lg)' },
    { search: /padding:\s*1\.25rem/g, replace: 'padding: 1.25rem' }, // Non standard
    { search: /padding:\s*3rem 2rem/g, replace: 'padding: var(--space-2xl) var(--space-xl)' },
    { search: /padding:\s*0\.5rem 1rem/g, replace: 'padding: var(--space-sm) var(--space-md)' },
    { search: /padding:\s*0\.75rem 1rem/g, replace: 'padding: 0.75rem var(--space-md)' },
    { search: /padding:\s*0\.25rem 0\.5rem/g, replace: 'padding: var(--space-xs) var(--space-sm)' },
    
    // Transitions
    { search: /transition:\s*transform 0\.3s ease-in-out/g, replace: 'transition: transform var(--transition-normal) ease-in-out' },
    { search: /transition:\s*background-color 0\.2s/g, replace: 'transition: background-color var(--transition-fast)' },
    { search: /transition:\s*transform 0\.2s/g, replace: 'transition: transform var(--transition-fast)' },
    { search: /transition:\s*all 0\.2s/g, replace: 'transition: all var(--transition-fast)' }
];

replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
});

fs.writeFileSync(stylePath, content);
console.log('style.css updated with tokens!');
