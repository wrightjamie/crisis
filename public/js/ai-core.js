import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const MODEL_ID = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms))
    ]);
}

window.AICore = {
    engine: null,
    isReady: false,

    async init(progressCallback) {
        if (this.engine) return;
        try {
            this.engine = await CreateMLCEngine(MODEL_ID, {
                initProgressCallback: progressCallback,
                context_window_size: 2048
            });
            this.isReady = true;
            console.log("AI Engine loaded successfully.");
        } catch (e) {
            console.error("AI Engine failed to load:", e);
            throw e;
        }
    },

    STYLE_PRESETS: {
        sitrep: 'Military SITREP (BLUF)',
        executive: 'Executive Flash',
        standard: 'Standard Narrative'
    },

    async generateBrief(aiConfig, roleId, currentScores, baselineScores, actionContext = null, scoreConfigs = {}, strategy = "iterative", stylePreset = "sitrep") {
        if (!this.engine) throw new Error("AI Engine not initialized");

        const mode = baselineScores ? 'update' : 'initial';
        const roleContext = aiConfig.roleContexts[roleId] || "";
        
        let styleInstruction = "";
        let temperature = 0.7;

        if (stylePreset === 'sitrep') {
            temperature = 0.3;
            styleInstruction = "\nSTYLE: Military SITREP (BLUF - Bottom Line Up Front). Be strictly factual, objective, and operational. Maximum 2 to 3 concise sentences. State immediate operational impacts and status. Zero dramatic metaphors, fluff, or flowery narrative (e.g. no 'storm brewing', 'shadows loom', 'powder keg').";
        } else if (stylePreset === 'executive') {
            temperature = 0.5;
            styleInstruction = "\nSTYLE: Executive Flash. High-level strategic summary with immediate cross-agency risk implications and recommended decisions. Concise and actionable.";
        }

        // Combine system prompt with role specific context and style instructions
        const systemPrompt = `You are an automated intelligence reporting system.\n${roleContext}\n\n${aiConfig.systemPrompt}${styleInstruction}`;
        
        const relevantMetrics = Object.entries(currentScores).filter(([key, val]) => {
            const config = scoreConfigs[key];
            if (config && config.promptAI === false) return false;
            return aiConfig.scores[key] && aiConfig.scores[key].roles.includes(roleId);
        });

        const promptsUsed = [];
        if (strategy === 'noai') {
             let text = "Raw Metrics Data:\n";
             for (const [key, val] of relevantMetrics) {
                 const scoreObj = aiConfig.scores[key];
                 const config = scoreConfigs[key];
                 let valLabel = (config && config.unit) ? `${val} ${config.unit}` : (aiConfig.scoreLabels ? aiConfig.scoreLabels[val] || val : val);
                 text += `- ${scoreObj.name || scoreObj.label}: ${valLabel}\n`;
             }
             return { text, seeds: [], generated: false, prompts: [] };
        }

        let sentences = [];
        for (const [key, currentVal] of relevantMetrics) {
            let sentence = "";
            const scoreObj = aiConfig.scores[key];
            const config = scoreConfigs[key];

            const subject = scoreObj.subject || scoreObj.label;
            const is = scoreObj.isPlural ? "are" : "is";
            const has = scoreObj.isPlural ? "have" : "has";
            const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);

            let labelLower = "";
            let prevLabelLower = "";
            let displayVal = currentVal;
            let displayPrevVal = baselineScores ? baselineScores[key] : null;

            if (config && config.unit) {
                labelLower = `at ${displayVal} ${config.unit}`;
                if (displayPrevVal !== null) {
                    prevLabelLower = `at ${displayPrevVal} ${config.unit}`;
                }
            } else if (aiConfig.scoreLabels && aiConfig.scoreLabels[currentVal]) {
                labelLower = aiConfig.scoreLabels[currentVal].toLowerCase();
                if (displayPrevVal !== null && aiConfig.scoreLabels[displayPrevVal]) {
                    prevLabelLower = aiConfig.scoreLabels[displayPrevVal].toLowerCase();
                }
            } else {
                 labelLower = `at ${displayVal}`;
                 if (displayPrevVal !== null) prevLabelLower = `at ${displayPrevVal}`;
            }

            if (mode === 'initial') {
                sentence = `${capitalizedSubject} ${is} currently ${labelLower}.`;
                sentences.push({ label: scoreObj.label, text: sentence, changed: true, newVal: currentVal });
            } else if (mode === 'update') {
                const prevVal = baselineScores[key];
                if (currentVal !== prevVal) {
                    sentence = `${capitalizedSubject} ${has} changed from ${prevLabelLower} to ${labelLower}.`;
                    sentences.push({ label: scoreObj.label, text: sentence, changed: true, prevVal, newVal: currentVal });
                }
            }
        }

        if (sentences.length === 0 && mode === 'update') {
            return {
                text: "No operational changes have been detected in your focus areas during this reporting period.",
                seeds: [],
                generated: false,
                prompts: []
            };
        }

        let summaryContext = sentences.map(s => `- ${s.text}`).join("\n");
        let combinedText = "";

        if (strategy === 'iterative') {
            for (const s of sentences) {
                 const p = `Context: ${s.text}. Task: Write one short immersive sentence describing this operational state.`;
                 promptsUsed.push(p);
                 try {
                     const reply = await withTimeout(this.engine.chat.completions.create({
                          messages: [
                              { role: "system", content: systemPrompt },
                              { role: "user", content: p }
                          ],
                          max_tokens: 50,
                          temperature
                      }), 10000);
                      combinedText += `- ${reply.choices[0].message.content.trim()}\n`;
                 } catch(e) {
                     combinedText += `- ${s.text}\n`;
                 }
            }
            return { text: combinedText, seeds: sentences, generated: true, prompts: promptsUsed };
        } else {
            let summaryPrompt = mode === 'initial'
                ? `Context:\n${summaryContext}\nTask: Synthesize these facts into exactly ONE fluid paragraph that describes the overall operational picture based on the Focus area.`
                : `Context:\n${summaryContext}\nTask: Synthesize these facts into exactly ONE fluid paragraph that focuses on highlighting the recent changes and their impact based on the Focus area.`;

            if (mode === 'update' && actionContext) {
                summaryPrompt += `\n\nRecent Action: ${actionContext}\nEnsure the summary frames the score changes as the resulting impact of this recent action.`;
            }

            if (strategy === 'fewshot') {
                 summaryPrompt += `\nExamples:
Context:
- Public Approval has changed from medium to high.
- Budget has changed from medium to low.
Summary: Public support remains strong following recent operations, but our financial reserves are critically depleted.`;
            } else if (strategy === 'combined') {
                 summaryPrompt += `\nTask: Synthesize this into a cohesive paragraph focusing only on actionable changes.`;
            }

            promptsUsed.push(summaryPrompt);

            try {
                const summaryReply = await withTimeout(this.engine.chat.completions.create({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: summaryPrompt }
                    ],
                    temperature,
                    max_tokens: 250
                }), 45000); // 45 second timeout

                return {
                    text: summaryReply.choices[0].message.content.trim(),
                    seeds: sentences,
                    generated: true,
                    prompts: promptsUsed
                };
            } catch (error) {
                console.error("AI Briefing generation failed or timed out:", error);
                return { text: summaryContext, seeds: sentences, generated: false, prompts: promptsUsed };
            }
        }
    },

    async generateScenarioSummary(aiConfig, roleId, combinedText, stylePreset = "sitrep") {
        if (!this.engine) throw new Error("AI Engine not initialized");
        const systemPrompt = `You are an automated intelligence reporting system.\n${aiConfig.roleContexts[roleId] || ''}\n${aiConfig.systemPrompt}`;
        
        let userPrompt = '';
        let temperature = 0.7;

        if (stylePreset === 'sitrep') {
            temperature = 0.3;
            userPrompt = `Context:\n${combinedText}\nTask: Synthesize this intelligence into a concise Military Situation Report (SITREP / BLUF).
Format requirements:
- BLUF (Bottom Line Up Front): Maximum 2 sentences stating the immediate operational reality.
- ### Key Metrics & Tactical Status
- Exactly 2 to 3 factual bullet points. In each bullet point, bold the key subject at the start (e.g. "- **Subject:** Details...").
- Zero dramatic flair or narrative fluff. Plain, rigorous intelligence language.`;
        } else if (stylePreset === 'executive') {
            temperature = 0.5;
            userPrompt = `Context:\n${combinedText}\nTask: Synthesize this intelligence into an Executive Strategic Risk Briefing.
Format requirements:
- Strategic Risk Overview: 1 clear, high-level summary paragraph.
- ### Ministerial Decisions Required
- 2 to 3 actionable bullet points bolding the primary stakeholder/decision area.`;
        } else {
            temperature = 0.7;
            userPrompt = `Context:\n${combinedText}\nTask: Synthesize this intelligence into a comprehensive executive briefing formatted in clean Markdown.
Format requirements:
- Provide a clear, cohesive overview paragraph of the operational picture. Do NOT include greetings or titles like "EXECUTIVE BRIEFING".
- Follow with a "### Critical Details & Challenges" heading.
- Provide 2-3 concise bullet points highlighting the most critical specific details, risks, or challenges for this role.
- In each bullet point, bold the key subject at the start (e.g. "- **Subject:** Details...").
- Separate paragraphs, headings, and bullet points with blank lines.`;
        }

        const summaryReply = await withTimeout(this.engine.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature,
            max_tokens: 350
        }), 60000); // 60 second timeout for summary

        const rawOutput = summaryReply.choices[0].message.content.trim();
        const cleanedText = (typeof window !== 'undefined' && window.tidyAiBrief) ? window.tidyAiBrief(rawOutput) : rawOutput;

        return {
            text: cleanedText,
            prompt: userPrompt
        };
    }
};
