import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const API_KEY = process.env.GEMINI_API_KEY_1;

async function checkModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    
    console.log("Fetching models from:", url.replace(API_KEY, 'HIDDEN_KEY'));
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.models) {
            console.log("✅ Models found:");
            data.models.forEach(m => console.log(` - ${m.name} (${m.displayName})`));
        } else {
            console.error("❌ No models found or error occurred:");
            console.error(JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Network error:", err);
    }
}

checkModels();
