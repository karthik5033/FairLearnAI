import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEYS } from "./gemini-keys";

// Safety settings to allow intended educational content while filtering harmful content
const SAFETY_SETTINGS = [
    {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
];

export class GeminiClient {
    /**
     * Generates content using a "Master/Slave" failover strategy.
     * It iterates through available keys until one succeeds.
     */
    static async generateContent(systemPrompt: string, userPrompt: string, modelName: string = "gemini-2.5-flash"): Promise<string> {
        let lastError: any = null;

        // Try every key in the pool
        for (let i = 0; i < GEMINI_KEYS.length; i++) {
            const currentKey = GEMINI_KEYS[i];
            
            try {
                // Initialize the model with the current key
                const genAI = new GoogleGenerativeAI(currentKey);
                const model = genAI.getGenerativeModel({ model: modelName });

                // Construct a chat-like prompt structure
                // Note: For simple one-shot generation, we can just concatenate or use generateContent
                // If system instructions are supported by the specific model version, we could use them.
                // For standard gemini-pro, we'll prepend the system prompt.
                const finalPrompt = `${systemPrompt}\n\nUser Query: ${userPrompt}`;

                const result = await model.generateContent(finalPrompt);
                const response = result.response;
                const text = response.text();

                return text;

            } catch (error: any) {
                console.warn(`⚠️ Key ${i + 1} (${currentKey.slice(0, 5)}...) failed.`, error.message);
                lastError = error;

                // Check for rate limits (429) or server errors (5xx) to continue
                // If it's a 400 Bad Request (invalid prompt), we might want to stop, 
                // but for simplicity we failover for robustness.
                continue; 
            }
        }

        // If we exhaust all keys
        console.error("❌ All Gemini API keys failed.");
        throw lastError || new Error("All Gemini API keys failed to generate a response.");
    }
}
