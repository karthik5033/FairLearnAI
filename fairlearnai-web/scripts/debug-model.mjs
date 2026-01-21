import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const key = process.env.GEMINI_API_KEY_1;

async function listModels() {
    if (!key) {
        console.error("No key found.");
        return;
    }

    try {
        console.log(`Using Key: ${key.slice(0, 10)}...`);
        const genAI = new GoogleGenerativeAI(key);
        // Direct API call to list models is not exposed directly in high-level client sometimes, 
        // but let's try a direct request if standard generation fails.
        // Actually, the SDK has a way to get model info, but let's just stick to a simple generation test with a known fallback.
        
        // Let's try 'gemini-pro' again but with logging the request
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log("Attempting generation with gemini-pro...");
        const result = await model.generateContent("Hi");
        console.log("Success:", result.response.text());
        
    } catch (error) {
        console.error("Failed.");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("API Response:", await error.response.json());
        }
    }
}

listModels();
