const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../public');
let exitCode = 0;
let outputData = "";

function log(msg) {
    console.log(msg);
    outputData += msg + "\n";
}

function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.css') || filePath.endsWith('.js') || filePath.endsWith('.html')) {
      if (file !== 'tokens.css' && file !== 'variables.css' && file !== 'reset.css' && !filePath.includes('node_modules')) {
          fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const files = findFiles(SRC_DIR);

const cssPatterns = [
  {
    regex: /#([0-9a-fA-F]{3,8})|rgba?\([^)]+\)|hsla?\([^)]+\)/gi,
    type: 'error',
    category: 'Hardcoded Color',
    suggestion: 'Use --color-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])(?:padding|margin|gap|top|bottom|left|right)(?:-[a-zA-Z]+)*\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Spacing',
    suggestion: 'Use --space-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])font-size\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Font Size',
    suggestion: 'Use --text-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])font-weight\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Font Weight',
    suggestion: 'Use --font-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])border-radius\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Border Radius',
    suggestion: 'Use --radius-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])box-shadow\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Box Shadow',
    suggestion: 'Use --shadow-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])z-index\s*:\s*([^;]+);/gi,
    type: 'error',
    category: 'Hardcoded Z-Index',
    suggestion: 'Use --z-* tokens'
  },
  {
    regex: /(?<![-a-zA-Z])transition(?:-duration)?\s*:\s*([^;]+);/gi,
    type: 'warning',
    category: 'Hardcoded Transition',
    suggestion: 'Use --transition-* tokens'
  }
];

const inlineStylePattern = {
    regex: /style\s*=\s*['"]([^'"]+)['"]/gi,
    type: 'error',
    category: 'Inline Style',
    suggestion: 'Extract to a CSS class'
};

let totalErrors = 0;
let totalWarnings = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(SRC_DIR, file).replace(/\\/g, '/');
  const isCss = file.endsWith('.css');

  lines.forEach((line, lineIdx) => {
    let cleanLine = line
      .replace(/var\([^)]+\)/g, ' 0 ')
      .replace(/calc\b[^;]+/g, ' 0 ')
      .replace(/color-mix\b[^;]+/g, ' 0 ')
      .replace(/oklch\b[^;]+/g, ' 0 ')
      .replace(/anchor\b[^;]+/g, ' 0 ')
      .replace(/!important/g, '');

    if (isCss) {
        cssPatterns.forEach(p => {
          const matches = [...cleanLine.matchAll(p.regex)];
          matches.forEach(m => {
            let val = m[1] ? m[1].trim() : m[0].trim();
            
            if (!val || val === '' || val === 'calc()') return;
            
            // Strip commas and clean up
            const allowed = ['0', 'none', 'inherit', 'initial', 'transparent', 'currentColor', 'normal', 'auto', '100%', '50%', '-50%',
              'transform', 'opacity', 'filter', 'all', 'background', 'color', 'border-color', 'box-shadow', 'background-color',
              'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'solid', '1px', '-1px'
            ];
            const tokens = val.replace(/,/g, ' ').split(/\s+/).filter(v => v);
            const allAllowed = tokens.every(v => allowed.includes(v));
            if (allAllowed) return;

            if (p.category === 'Hardcoded Color') val = m[0];

            log(`[${p.type.toUpperCase()}] ${relPath}:${lineIdx + 1}\n  Violation: ${p.category} -> "${val}"`);
            
            if (p.type === 'error') {
                totalErrors++;
                exitCode = 1;
            } else {
                totalWarnings++;
            }
          });
        });
    } else {
        // For JS and HTML, check for inline styles
        const matches = [...line.matchAll(inlineStylePattern.regex)];
        matches.forEach(m => {
            let val = m[1].trim();
            // Ignore empty styles or just simple display toggles which might be dynamic
            if (val === '' || val === 'display: none;' || val === 'display: block;' || val === 'display: flex;') return;
            
            log(`[${inlineStylePattern.type.toUpperCase()}] ${relPath}:${lineIdx + 1}\n  Violation: ${inlineStylePattern.category} -> "${val}"`);
            totalErrors++;
            exitCode = 1;
        });
    }
  });
});

log(`\nAudit complete: ${totalErrors} Errors, ${totalWarnings} Warnings.`);
fs.writeFileSync(path.join(__dirname, '../audit_report.txt'), outputData);
if (exitCode === 1) process.exit(1);
