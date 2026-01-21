import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from parent directory (fairlearnai-web)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY_5,
].filter(Boolean);

console.log(`Found ${keys.length} keys.`);

const MODELS_TO_TEST = ["models/gemini-1.5-flash", "models/gemini-pro"];

async function testKey(key) {
    for (const modelName of MODELS_TO_TEST) {
        try {
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test.");
            await result.response; // Wait for response
            console.log(`✅ Key ${key.slice(0, 5)}... WORKS with ${modelName}`);
            return true; // Stop after first success for this key
        } catch (error) {
            console.error(`❌ Key ${key.slice(0, 5)}... FAILED with ${modelName}`);
            if (error.status === 404) console.error("   -> Model not found/supported.");
            else console.error("   -> " + error.message);
        }
    }
    return false;
}

async function run() {
    if (keys.length === 0) {
        console.error("No keys found! Check .env.local path.");
        return;
    }

    console.log("Testing keys...");
    for (const key of keys) {
        await testKey(key);
    }
}

run();
