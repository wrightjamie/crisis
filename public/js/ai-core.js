import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const MODEL_ID = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

const withTimeout = (promise, ms) => {
    let timerId;
    const timeoutPromise = new Promise((_, reject) => {
        timerId = setTimeout(() => reject(new Error(`AI generation timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timerId));
};

window.AICore = {
    engine: null,
    isReady: false,
    
    async init(progressCallback) {
        if (this.engine) return;
        try {
            this.engine = await CreateMLCEngine(MODEL_ID, {
                initProgressCallback: progressCallback
            });
            this.isReady = true;
            console.log("AI Engine loaded successfully.");
        } catch (e) {
            console.error("AI Engine failed to load:", e);
            throw e;
        }
    },

    async generateBrief(aiConfig, roleId, currentScores, baselineScores, actionContext = null, scoreConfigs = {}) {
        if (!this.engine) throw new Error("AI Engine not initialized");

        const mode = baselineScores ? 'update' : 'initial';
        const roleContext = aiConfig.roleContexts[roleId] || "";
        
        // Combine system prompt with role specific context
        const systemPrompt = `You are an automated intelligence reporting system.\n${roleContext}\n\n${aiConfig.systemPrompt}`;
        
        const relevantMetrics = Object.entries(currentScores).filter(([key, val]) => {
            const config = scoreConfigs[key];
            if (config && config.promptAI === false) return false;
            return aiConfig.scores[key] && aiConfig.scores[key].roles.includes(roleId);
        });

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
                generated: false
            };
        }

        let summaryContext = sentences.map(s => `- ${s.text}`).join("\n");
        let summaryPrompt = mode === 'initial' 
            ? `Context:\n${summaryContext}\nTask: Synthesize these facts into exactly ONE fluid paragraph that describes the overall operational picture based on the Focus area.`
            : `Context:\n${summaryContext}\nTask: Synthesize these facts into exactly ONE fluid paragraph that focuses on highlighting the recent changes and their impact based on the Focus area.`;

        if (mode === 'update' && actionContext) {
            summaryPrompt += `\n\nRecent Action: ${actionContext}\nEnsure the summary frames the score changes as the resulting impact of this recent action.`;
        }

        const summaryReply = await withTimeout(this.engine.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: summaryPrompt }
            ],
            temperature: 0.7,
            max_tokens: 250
        }), 45000); // 45 second timeout

        return {
            text: summaryReply.choices[0].message.content.trim(),
            seeds: sentences,
            generated: true
        };
    },

    async generateScenarioSummary(aiConfig, roleId, combinedText) {
        if (!this.engine) throw new Error("AI Engine not initialized");
        const systemPrompt = `You are an automated intelligence reporting system.\n${aiConfig.roleContexts[roleId] || ''}\n${aiConfig.systemPrompt}`;
        const userPrompt = `Context:\n${combinedText}\nTask: Synthesize this intelligence into a comprehensive executive briefing. Provide a clear overview paragraph of the operational picture, followed by 2-3 bullet points highlighting the most critical specific details and challenges for this role.`;
        
        const summaryReply = await withTimeout(this.engine.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 350
        }), 60000); // 60 second timeout for summary

        return {
            text: summaryReply.choices[0].message.content.trim(),
            prompt: userPrompt
        };
    }
};
