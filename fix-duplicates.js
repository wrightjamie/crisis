const fs = require('fs');
let content = fs.readFileSync('public/css/style.css', 'utf8');

// The original file didn't have .d-none, .d-flex, .ml-auto initially but my plan might have appended them twice if I ran a bash block twice.
// Let's clean up any duplicated block by removing the second occurrence.

// Since CSS specificity handles it gracefully, we can just leave it if there's no harm, but let's see if we can manually clean it up.
