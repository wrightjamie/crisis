const assert = require('assert');
const { tidyAiBrief } = require('../public/js/utils');

console.log('Running tidyAiBrief unit tests...');

// Test 1: Exact screenshot case
{
    const screenshotInput = `EXECUTIVE BRIEFING
OVERVIEW
The South Atlantic operational readiness is currently under threat, with Argentine forces rapidly mobilizing and catching UK defenses off guard. The Task Force is facing an uphill battle to secure key installations, and the situation demands immediate attention and decisive action. The weather in the South Atlantic is expected to remain clear for the next few days, providing a temporary advantage for our air assets. However, this clear weather will only persist if our logistics hub at Ascension Island can maintain a secure and efficient operation.
Critical Details and Challenges:
• Key Installations: Securing the following installations is of utmost importance:
◦ The US naval base at Port Stanley, Falkland Islands.
◦ The US and UK bases at West Point and Mount Pleasant.
◦ The Argentine naval base at Puerto Williams.
• Logistics Hub: The logistics hub at Ascension Island is under pressure, with supply lines and maintenance operations being hampered by Argentine forces' rapid mobilization. We need to ensure the hub can maintain a secure and efficient operation to support our ongoing operations.
• Weather and Air Assets: The clear weather expected to persist for the next few days will only allow our air assets to operate at peak efficiency. However, this will only be the case if our logistics hub can maintain a secure and efficient operation, ensuring that our air assets can access and utilize the necessary infrastructure and resources.
• Task Force Disposition: The Task Force is currently on the back foot, with Argentine forces taking the initiative. We need to ensure our forces are positioned and prepared to respond to any changes in the situation, and that we can rapidly adapt to any new developments.`;

    const result = tidyAiBrief(screenshotInput);

    // Should remove redundant top-level "EXECUTIVE BRIEFING"
    assert(!result.includes('EXECUTIVE BRIEFING'), 'Should strip redundant EXECUTIVE BRIEFING title');

    // Should format OVERVIEW as a clean markdown heading with surrounding newlines
    assert(result.includes('### Overview\n\n'), 'Should format OVERVIEW as a markdown heading with blank line');

    // Should format "Critical Details and Challenges:" as a markdown heading with surrounding blank lines
    assert(result.includes('### Critical Details and Challenges\n\n'), 'Should format section colon label as heading');

    // Should convert unicode bullets and bold the topic
    assert(result.includes('- **Key Installations:** Securing the following installations is of utmost importance:'), 'Should convert top bullet and bold label');
    assert(result.includes('  - The US naval base at Port Stanley, Falkland Islands.'), 'Should convert sub-bullet 1');
    assert(result.includes('  - The US and UK bases at West Point and Mount Pleasant.'), 'Should convert sub-bullet 2');
    assert(result.includes('  - The Argentine naval base at Puerto Williams.'), 'Should convert sub-bullet 3');
    assert(result.includes('- **Logistics Hub:** The logistics hub at Ascension Island is under pressure'), 'Should convert logistics bullet and bold label');
    assert(result.includes('- **Weather and Air Assets:** The clear weather'), 'Should convert weather bullet and bold label');
    assert(result.includes('- **Task Force Disposition:** The Task Force'), 'Should convert disposition bullet and bold label');

    console.log('✅ Screenshot brief formatting test passed.');
}

// Test 2: Redundant title variants
{
    const inputs = [
        '# EXECUTIVE BRIEFING\nSome text',
        '**EXECUTIVE BRIEFING**\nSome text',
        'INTELLIGENCE BRIEFING:\nSome text',
        'EXECUTIVE SUMMARY\nSome text',
        'MISSION BRIEFING\nSome text'
    ];

    for (const input of inputs) {
        const result = tidyAiBrief(input);
        assert.strictEqual(result, 'Some text', `Should strip title from: ${input}`);
    }
    console.log('✅ Redundant title stripping test passed.');
}

// Test 3: Already formatted markdown
{
    const input = `### Operational Summary

The crisis in the sector continues to escalate.

### Priorities

- **Air Superiority:** Establish defensive CAP.
  - Deploy 4x Typhoon aircraft.
- **Logistics:** Escort supply convoy.`;

    const result = tidyAiBrief(input);
    assert.strictEqual(result, input, 'Should preserve clean markdown without duplicating bold or altering indent');
    console.log('✅ Clean markdown preservation test passed.');
}

// Test 4: Regurgitated LLM prompt preambles
{
    const input = `Context:
Scores are low.
Task: Synthesize this into a brief.
EXECUTIVE BRIEFING
The forward operating base has taken damage.

- **Defences:** Repair perimeter sensors.`;

    const result = tidyAiBrief(input);
    assert(!result.includes('Context:'), 'Should strip Context preamble');
    assert(!result.includes('Task:'), 'Should strip Task preamble');
    assert(!result.includes('EXECUTIVE BRIEFING'), 'Should strip EXECUTIVE BRIEFING');
    assert(result.startsWith('The forward operating base has taken damage.'), 'Should start with actual briefing text');
    assert(result.includes('- **Defences:** Repair perimeter sensors.'), 'Should retain bullet');
    console.log('✅ Prompt preamble stripping test passed.');
}

// Test 5: Paragraph spacing and boundary conditions
{
    assert.strictEqual(tidyAiBrief(''), '', 'Empty string should return empty string');
    assert.strictEqual(tidyAiBrief(null), '', 'Null should return empty string');
    assert.strictEqual(tidyAiBrief(undefined), '', 'Undefined should return empty string');

    const multiline = `Paragraph one.

Paragraph two.`;
    assert.strictEqual(tidyAiBrief(multiline), multiline, 'Should preserve blank lines between paragraphs');

    const excessiveBreaks = `Paragraph one.\n\n\n\n\nParagraph two.`;
    assert.strictEqual(tidyAiBrief(excessiveBreaks), 'Paragraph one.\n\nParagraph two.', 'Should normalize excessive line breaks');
    console.log('✅ Boundary conditions and paragraph spacing test passed.');
}

console.log('All tidyAiBrief tests passed successfully! 🎉');
