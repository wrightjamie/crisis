const fs = require('fs');
const path = require('path');

const files = [
    '../public/js/utils.js',
    '../public/js/facilitator.js',
    '../public/js/client.js',
    '../public/index.html',
    '../public/facilitator.html'
].map(p => path.join(__dirname, p));

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');
    
    // Match HTML tags (like <div class="a" class="b">)
    // We match the tag opening up to the closing >
    content = content.replace(/<([a-zA-Z0-9]+)\s+([^>]+)>/g, (match, tagName, attrs) => {
        const classMatches = [...attrs.matchAll(/\bclass=(['"])(.*?)\1/g)];
        if (classMatches.length > 1) {
            let classes = [];
            classMatches.forEach(m => classes.push(...m[2].split(/\s+/)));
            // Deduplicate classes
            classes = [...new Set(classes)].filter(Boolean).join(' ');
            
            let isFirst = true;
            let newAttrs = attrs.replace(/\s*class=(['"])(.*?)\1/g, () => {
                if (isFirst) {
                    isFirst = false;
                    return ` class="${classes}"`;
                }
                return '';
            });
            
            // Reconstruct the tag
            return `<${tagName} ${newAttrs.trim()}>`;
        }
        return match;
    });
    
    fs.writeFileSync(f, content);
    console.log(`Fixed ${path.basename(f)}`);
});
