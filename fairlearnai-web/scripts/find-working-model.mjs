import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const API_KEY = process.env.GEMINI_API_KEY_1?.trim();

async function findWorkingModel() {
    // 1. List Models
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    console.log("Fetching model list...");
    
    let models = [];
    try {
        const response = await fetch(listUrl);
        const data = await response.json();
        if (data.models) {
            models = data.models.map(m => m.name.replace('models/', '')); // Get simple names
        }
    } catch (e) {
        console.error("List failed:", e);
        return;
    }

    console.log(`Found ${models.length} models. Testing generation on candidates...`);

    // Filter for likely generation models (ignore embedding, etc)
    const candidates = models.filter(m => !m.includes('embedding') && !m.includes('aqa') && !m.includes('vision'));

    for (const model of candidates) {
        process.stdout.write(`Testing ${model}... `);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const body = { contents: [{ parts: [{ text: "Hi" }] }] };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            if (res.ok) {
                console.log("✅ SUCCESS!");
                console.log(`>>> PLEASE USE MODEL: ${model} <<<`);
                return;
            } else {
                const err = await res.json();
                // console.log("Failed:", err.error?.message);
                console.log("❌");
            }
        } catch (e) {
            console.log("Error");
        }
    }
    console.log("No working generation model found.");
}

findWorkingModel();
