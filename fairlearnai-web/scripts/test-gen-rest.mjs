import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const API_KEY = process.env.GEMINI_API_KEY_1?.trim();

async function testGenRest() {
    const models = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const model of models) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        console.log(`Testing generation with ${model}...`);
        
        const body = {
            contents: [{ parts: [{ text: "Hello" }] }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log(`✅ Success with ${model}!`);
                return; // Stop on first success
            } else {
                console.error(`❌ Failed with ${model}:`, data.error?.message || data);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    }
}

testGenRest();
