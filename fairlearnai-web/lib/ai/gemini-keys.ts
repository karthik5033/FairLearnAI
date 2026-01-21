export const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY_1?.trim(),
  process.env.GEMINI_API_KEY_2?.trim(),
  process.env.GEMINI_API_KEY_3?.trim(),
  process.env.GEMINI_API_KEY_4?.trim(),
  process.env.GEMINI_API_KEY_5?.trim(),
].filter((key): key is string => !!key && key.length > 0);

if (GEMINI_KEYS.length === 0) {
  console.warn("⚠️ No Gemini API keys found in environment variables. AI features will fail.");
} else {
    console.log(`✅ Loaded ${GEMINI_KEYS.length} Gemini API keys.`);
}

let verificationIndex = 0;

export function getNextKey(): string {
  if (GEMINI_KEYS.length === 0) {
    throw new Error("No Gemini API keys available.");
  }
  
  // Simple Round Robin for now
  const key = GEMINI_KEYS[verificationIndex];
  verificationIndex = (verificationIndex + 1) % GEMINI_KEYS.length;
  return key;
}

export function getRandomKey(): string {
    if (GEMINI_KEYS.length === 0) {
        throw new Error("No Gemini API keys available.");
      }
    const randomIndex = Math.floor(Math.random() * GEMINI_KEYS.length);
    return GEMINI_KEYS[randomIndex];
}
