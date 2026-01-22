export type ClassificationLabel = 'ALLOWED' | 'HINT_ONLY' | 'DISALLOWED' | 'OFF_TOPIC';

export interface ClassificationResult {
    label: ClassificationLabel;
    confidence: number;
    reason?: string;
}

const DISALLOWED_KEYWORDS = [
    "final answer",
    "give me the solution",
    "solve completely",
    "answer key",
    "entire paper",
    "only answers no explanation",
    "do my homework",
    "write the essay",
    "write an essay",
    "write a essay",
    "essay",
    "summary",
    "full solution",
    "get me the answer",
    "generate an essay"
];

const HINT_ONLY_KEYWORDS = [
    "solve this",
    "how to solve",
    "step by step",
    "explain this",
    "help me with this question",
    "derivative of",
    "integral of",
    "what is the answer to"
];

const OFF_TOPIC_KEYWORDS = [
    "tell me a joke",
    "weather",
    "who are you",
    "how are you",
    "story",
    "game"
];

export async function classifyPrompt(prompt: string): Promise<ClassificationResult> {
    const lowerPrompt = prompt.toLowerCase();

    // 0. Try Custom ML Model (FastAPI)
    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            signal: AbortController.timeout(1000) // 1s timeout
        });
        
        if (response.ok) {
            const data = await response.json();
            return {
                label: data.label as ClassificationLabel,
                confidence: data.confidence,
                reason: data.reason
            };
        }
    } catch (e) {
        // ML Model offline, fall back to rules
        // console.warn("ML Service unavailable:", e);
    }

    // 1. Check for Disallowed Keywords (High Priority)
    for (const keyword of DISALLOWED_KEYWORDS) {
        if (lowerPrompt.includes(keyword)) {
            return {
                label: 'DISALLOWED',
                confidence: 0.95,
                reason: `Detected cheating attempt: "${keyword}"`
            };
        }
    }

    // 2. Check for Hint Only Keywords
    for (const keyword of HINT_ONLY_KEYWORDS) {
        if (lowerPrompt.includes(keyword)) {
            return {
                label: 'HINT_ONLY',
                confidence: 0.85,
                reason: `Request involves solving a problem: "${keyword}"`
            };
        }
    }

    // 3. Check for Off Topic
    for (const keyword of OFF_TOPIC_KEYWORDS) {
        if (lowerPrompt.includes(keyword)) {
            return {
                label: 'OFF_TOPIC',
                confidence: 0.8,
                reason: `Off-topic request: "${keyword}"`
            };
        }
    }

    // 4. Default to ALLOWED
    return {
        label: 'ALLOWED',
        confidence: 0.7,
        reason: "Generic academic inquiry"
    };
}
