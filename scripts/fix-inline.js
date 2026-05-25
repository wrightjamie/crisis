const fs = require('fs');
const path = require('path');

const filePaths = [
    '../public/js/utils.js',
    '../public/js/facilitator.js',
    '../public/js/client.js',
    '../public/js/scenario-explorer.js',
    '../public/index.html',
    '../public/facilitator.html'
].map(p => path.join(__dirname, p));

const replacements = [
    // utils.js replacements
    { search: /style="border-color: var\(--accent-blue\);"/g, replace: 'class="card wiki-card-blue"' },
    { search: /style="border-color: var\(--accent-orange\);"/g, replace: 'class="card wiki-card-orange"' },
    { search: /style="margin-bottom: 1rem; border-bottom: 1px solid var\(--border-color\); padding-bottom: 0\.5rem;"/g, replace: 'class="card-title wiki-card-title"' },
    { search: /style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0\.5rem;"/g, replace: 'class="wiki-menu-list"' },
    { search: /style="width: 100%; border-color: var\(--accent-blue\);"/g, replace: 'class="btn wiki-asset-btn"' },
    { search: /style="width: 100%; border-color: var\(--accent-orange\);"/g, replace: 'class="btn wiki-term-btn"' },
    { search: /style="color: var\(--text-muted\); font-size: 0\.9rem;"/g, replace: 'class="wiki-empty-msg"' },
    { search: /style="margin-bottom: 1rem;"/g, replace: 'class="btn wiki-back-btn"' },
    { search: /style="width: 100%; border-radius: var\(--radius-sm\) var\(--radius-sm\) 0 0; margin: -1\.5rem -1\.5rem 1rem -1\.5rem; width: calc\(100% \+ 3rem\); display: block; border-bottom: 1px solid var\(--border-color\);"/g, replace: 'class="wiki-img"' },
    { search: /style="color: var\(--accent-blue\);"/g, replace: 'class="card-title wiki-title-blue"' },
    { search: /style="margin-top: 1rem; line-height: 1\.5;"/g, replace: 'class="card-desc wiki-desc-margin"' },
    { search: /style="color: var\(--accent-orange\); font-size: 1\.2rem;"/g, replace: 'class="card-title wiki-title-orange"' },
    { search: /style="font-weight:bold; margin-bottom: 1rem; border-bottom: 1px solid var\(--border-color\); padding-bottom: 0\.5rem;"/g, replace: 'class="card-desc wiki-term-def"' },
    { search: /style="line-height: 1\.5;"/g, replace: 'class="card-desc wiki-term-wiki"' },

    // facilitator.html & index.html replacements
    { search: /style="display: flex; gap: 1rem; align-items: center;"/g, replace: 'class="flex-center gap-2"' },
    { search: /style="font-size: 0\.8rem; display: flex; align-items: center; gap: 0\.5rem; color: var\(--text-muted\); border-left: 1px solid var\(--border-color\); padding-left: 1rem; margin-left: 0\.5rem;"/g, replace: 'class="fac-roles"' },
    { search: /style="width: 8px; height: 8px; border-radius: 50%; background: var\(--status-4\); display: inline-block;"/g, replace: 'class="fac-badge"' },
    { search: /style="display: flex; gap: 0\.5rem; align-items: center;"/g, replace: 'class="flex-center gap-1"' },
    { search: /style="background-color: var\(--bg-tertiary\); color: var\(--text-primary\); border: 1px solid var\(--border-color\); font-weight: bold;"/g, replace: 'class="btn client-btn-taken"' },
    { search: /style="border-top: 1px solid var\(--border-color\);"/g, replace: 'class="top-bar-border"' },
    { search: /style="display: none; padding: 2rem; max-width: 1200px; margin: 0 auto; text-align: center;"/g, replace: 'class="fac-dashboard-container"' },
    { search: /style="color: var\(--text-primary\); margin-bottom: 2rem;"/g, replace: 'class="mb-2 text-center text-primary"' },
    { search: /style="display: grid; gap: 1\.5rem; grid-template-columns: repeat\(auto-fit, minmax\(350px, 1fr\)\);"/g, replace: 'class="fac-dashboard-grid"' },
    { search: /style="font-size: 0\.8rem; color: var\(--text-secondary\); margin-bottom: 1rem; flex-shrink: 0;"/g, replace: 'class="text-sm text-secondary mb-1"' },
    { search: /style="overflow-y: auto; overflow-x: auto; max-height: max\(75vh, 400px\); padding-right: 0\.5rem;"/g, replace: 'class="fac-event-list"' },
    { search: /style="font-size: 0\.8rem; color: var\(--text-secondary\); margin-bottom: 1rem;"/g, replace: 'class="text-sm text-secondary mb-1"' },
    { search: /style="margin-top: 1rem; width: 100%;"/g, replace: 'class="btn btn-primary mt-1 w-100"' },
    { search: /style="opacity: 0\.6;"/g, replace: 'class="opacity-60"' },

    { search: /style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var\(--bg-primary\); z-index: 3000; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem;"/g, replace: 'class="client-holding-overlay"' },
    { search: /style="color: var\(--text-primary\); margin-bottom: 1rem;"/g, replace: 'class="mb-1"' },
    { search: /style="color: var\(--text-secondary\);"/g, replace: 'class="text-secondary"' },
    { search: /style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var\(--bg-primary\); z-index: 2500; display: none; flex-direction: column; justify-content: center; align-items: center; padding: 2rem;"/g, replace: 'class="client-holding-hidden"' },
    { search: /style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(200px, 1fr\)\); gap: 1rem; width: 100%; max-width: 800px;"/g, replace: 'class="client-role-grid"' },
    { search: /style="color: var\(--text-primary\); margin-bottom: 0\.5rem; text-align: center;"/g, replace: 'class="text-center mb-1"' },
    { search: /style="color: var\(--text-muted\); text-align: center; margin-bottom: 2rem; font-size: 0\.9rem; text-transform: uppercase;"/g, replace: 'class="text-center text-muted text-sm mb-2 uppercase"' },
    { search: /style="width: 100%; padding: 1rem; font-size: 1\.1rem; margin-top: 1rem;"/g, replace: 'class="btn btn-primary w-100 mt-1 text-md"' },

    // client.js and facilitator.js DOM creation styles
    { search: /style="font-size:0\.75rem; color:var\(--text-muted\);"/g, replace: 'class="text-xs text-muted"' },
    { search: /style\.backgroundColor = 'var\(--status-1\)'/g, replace: 'classList.add("fac-status-online")' },
    { search: /style\.color = '#fff'/g, replace: '' },
    { search: /style\.backgroundColor = 'var\(--bg-tertiary\)'/g, replace: 'classList.add("fac-status-offline")' },
    { search: /style\.color = 'var\(--text-muted\)'/g, replace: '' },
    { search: /style\.fontSize = '0\.7rem'/g, replace: '' },
    { search: /style\.padding = '0\.1rem 0\.4rem'/g, replace: '' },

    { search: /style="margin-bottom: 0\.5rem; padding: 0\.5rem;"/g, replace: 'class="card mb-1 p-1"' },
    { search: /style="display:flex; justify-content:space-between; align-items:center;"/g, replace: 'class="flex-between"' },
    { search: /style="display:flex; gap:0\.5rem; align-items:center;"/g, replace: 'class="flex-center gap-1"' },
    { search: /style="display:block; margin-top:0\.5rem;"/g, replace: 'class="mt-1 d-block"' },
    { search: /style="padding: 0\.2rem 0\.5rem; font-size: 0\.8rem; background: var\(--bg-tertiary\);"/g, replace: 'class="btn text-sm p-1 fac-status-offline"' },
    { search: /style="color:var\(--status-1\)"/g, replace: 'class="text-status-1"' },
    { search: /style="color:var\(--accent-orange\)"/g, replace: 'class="text-status-4"' },

    { search: /style="margin: 1rem 0; border-top: 1px solid var\(--border-color\); padding-top: 1rem;"/g, replace: 'class="mt-2 pt-1 border-top"' },
    { search: /style="color: var\(--text-muted\); font-size: 0\.85rem; text-transform: uppercase; margin-bottom: 1rem;"/g, replace: 'class="text-sm text-muted uppercase mb-1"' },
    { search: /style="display: block; font-size: 0\.9rem; font-weight: bold; color: var\(--text-secondary\); margin-bottom: 0\.5rem;"/g, replace: 'class="text-base text-bold text-secondary mb-1 d-block"' },
    { search: /style="display: flex; flex-wrap: wrap; gap: 0\.5rem;"/g, replace: 'class="flex-center gap-1 flex-wrap"' },
    { search: /style="font-size: 0\.85rem; padding: 0\.4rem 0\.8rem;"/g, replace: 'class="btn variant-opt text-sm p-1"' },
    { search: /style="font-size: 0\.8rem; padding: 0\.3rem 0\.8rem; background: none; border: 1px solid var\(--text-muted\); color: var\(--text-muted\); margin-top: 0\.5rem;"/g, replace: 'class="btn text-sm p-1 text-muted border-muted mt-1 bg-none"' },

    { search: /style="margin-bottom: 1rem; padding: 0\.5rem; border: 1px solid var\(--accent-red\); background: rgba\(231,76,60,0\.1\); color: var\(--accent-red\); font-size: 0\.85rem; border-radius: var\(--radius-sm\);"/g, replace: 'class="mb-1 p-1 border-red bg-red-faded text-red text-sm radius-sm"' },
    { search: /style="margin: 0\.5rem 0 0 1\.5rem; padding: 0;"/g, replace: 'class="mt-1 ml-2 p-0"' },
    { search: /style="color: var\(--text-secondary\); margin-bottom: 1rem;"/g, replace: 'class="text-secondary mb-1"' },
    { search: /style="width: 100%; margin-top: 0\.5rem;"/g, replace: 'class="btn btn-primary w-100 mt-1"' },

    // And generic cleanup fixes
    { search: /class="card" style="margin-bottom: 1rem;"/g, replace: 'class="card mb-2"' },
    { search: /style="margin-top: 2rem;"/g, replace: 'class="mt-2"' },
    { search: /style="width: 100%; padding: 1rem; font-size: 1\.1rem; \$\{meetsConditions \? '' : 'background-color: var\(--accent-red\); border-color: var\(--accent-red\);'\}"/g, replace: 'class="btn btn-primary w-100 p-2 text-md ${meetsConditions ? \'\' : \'btn-danger\'}"' },
    // Remaining inline styles
    { search: /style="margin-top: 1rem; border-top: 1px solid var\(--border-color\); padding-top: 0\.5rem;"/g, replace: 'class="mt-2 border-top pt-1"' },
    { search: /style="font-size: 0\.75rem; color: var\(--text-muted\); white-space: pre-wrap; margin-top: 0\.5rem; background: var\(--bg-primary\); padding: 0\.5rem; border-radius: 4px; font-family: inherit;"/g, replace: 'class="text-xs text-muted mt-1 bg-primary p-1 radius-sm pre-wrap font-inherit"' },
    { search: /style="background-color: var\(--accent-blue\); width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"/g, replace: 'class="bg-blue w-12 h-12 radius-full border-white"' },
    { search: /style="margin-bottom: 1\.5rem;"/g, replace: 'class="mb-3"' },
    { search: /style="line-height: 1\.6; font-size: 0\.95rem;"/g, replace: 'class="text-base lh-16"' },
    { search: /style="list-style: none; padding: 0; margin: 0; font-size: 0\.85rem; color: var\(--text-muted\);"/g, replace: 'class="list-none p-0 m-0 text-sm text-muted"' },
    { search: /style="margin-bottom: 0\.3rem;"/g, replace: 'class="mb-05"' },
    { search: /style="margin: 1\.5rem 0 1rem; font-size: 1rem; color: var\(--text-secondary\); text-transform: uppercase; border-bottom: 1px solid var\(--border-color\); padding-bottom: 0\.5rem;"/g, replace: 'class="my-3 text-base text-secondary uppercase border-bottom pb-1"' },
    { search: /style="color: var\(--status-1\); font-size: 0\.8rem; float: right;"/g, replace: 'class="text-status-1 text-sm float-right"' },
    { search: /style="color: var\(--accent-orange\); font-size: 0\.8rem; float: right;"/g, replace: 'class="text-status-4 text-sm float-right"' },
    { search: /style="text-transform: uppercase;"/g, replace: 'class="uppercase"' },
    { search: /style="margin-top: 1rem; border-left: 2px solid var\(--accent-blue\);"/g, replace: 'class="mt-2 border-left-blue"' },
    { search: /style="margin-top: 1rem; display: flex; gap: 0\.5rem; flex-wrap: wrap;"/g, replace: 'class="mt-2 flex-center gap-1 flex-wrap"' },
    { search: /style="background: var\(--bg-primary\); padding: 0\.2rem 0\.5rem; border-radius: var\(--radius-sm\); border: 1px solid var\(--border-color\); font-size: 0\.75rem; text-transform: uppercase;"/g, replace: 'class="bg-primary p-1 radius-sm border-color text-xs uppercase"' },
    { search: /style="margin-bottom: 1rem; border-color: var\(--accent-orange\); background-color: rgba\(230, 126, 34, 0\.1\);"/g, replace: 'class="mb-2 border-orange bg-orange-faded"' },
    { search: /style="color: var\(--accent-orange\); font-size: 0\.9rem; margin-bottom: 0\.5rem;"/g, replace: 'class="text-orange text-base mb-1"' },
    { search: /style="margin-bottom: 1rem; border-color: var\(--accent-red\); background-color: rgba\(231, 76, 60, 0\.1\);"/g, replace: 'class="mb-2 border-red bg-red-faded"' },
    { search: /style="color: var\(--accent-red\); font-size: 0\.9rem; margin-bottom: 0\.5rem;"/g, replace: 'class="text-red text-base mb-1"' },
    { search: /style="margin: 1\.5rem 0 0\.5rem; color: var\(--text-muted\); font-size: 0\.9rem; text-transform: uppercase;"/g, replace: 'class="my-3 text-muted text-base uppercase"' },
    
    // Remaining generic cleanup
    { search: /style="margin-top: 1rem;"/g, replace: 'class="mt-2"' },
    { search: /style="padding: 0\.5rem;"/g, replace: 'class="p-1"' },
    { search: /style="font-size: 0\.9rem;"/g, replace: 'class="text-base"' },
    { search: /style="color:var\(--text-muted\);"/g, replace: 'class="text-muted"' },
    { search: /style="white-space: pre-wrap;"/g, replace: 'class="pre-wrap"' },
    { search: /style="cursor: pointer; color: var\(--text-muted\); font-size: 0\.8rem; outline: none;"/g, replace: 'class="cursor-pointer text-muted text-sm outline-none"' },
];

filePaths.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    replacements.forEach(r => {
        content = content.replace(r.search, r.replace);
    });
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${path.basename(file)}`);
    }
});
