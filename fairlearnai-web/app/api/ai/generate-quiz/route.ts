import { NextResponse } from 'next/server';
import { GeminiClient } from '@/lib/ai/gemini-client';
import { generateQuizPrompt, generateQuizFromMaterialPrompt } from '@/lib/ai/quiz-generator';

export async function POST(req: Request) {
    try {
        const { topic, difficulty = 'Intermediate', count = 5, sourceText } = await req.json();

        // Validation
        if (!topic && !sourceText) {
            return NextResponse.json({ error: 'Topic or Source Text is required' }, { status: 400 });
        }

        let prompt;
        let logMsg;

        if (sourceText) {
            prompt = generateQuizFromMaterialPrompt(sourceText, count);
            logMsg = `Generating Quiz from Material (Length: ${sourceText.length})`;
        } else {
            prompt = generateQuizPrompt(topic, difficulty, count);
            logMsg = `Generating Quiz: ${topic} (${difficulty})`;
        }
        
        console.log(`🧠 ${logMsg}`);
        let jsonString = await GeminiClient.generateContent(
            "You are a strict JSON generator.", 
            prompt
        );

        // Cleanup: Remove markdown code blocks if present
        jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

        // Attempt to fix JSON if it has leading/trailing garbage
        const firstBrace = jsonString.indexOf('{');
        const lastBrace = jsonString.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            jsonString = jsonString.slice(firstBrace, lastBrace + 1);
        }

        let quizData;
        try {
            quizData = JSON.parse(jsonString);
        } catch (parseError) {
            console.warn("Initial JSON parse failed, attempting repair:", parseError);
            // Common LLM JSON errors repair:
            // 1. Double escape backslashes that aren't valid escapes
            // 2. Remove trailing commas
            const fixedJson = jsonString
                .replace(/\\(?!["\\/bfnrtu])/g, '\\\\') // Escape invalid backslashes
                .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

            try {
                quizData = JSON.parse(fixedJson);
            } catch (retryError) {
                 console.error("JSON Repair failed:", fixedJson);
                 throw new Error("Received malformed JSON from AI model. Please try again.");
            }
        }

        return NextResponse.json(quizData);

    } catch (error) {
        console.error('Quiz Generation Error:', error);
        return NextResponse.json({ 
            error: `Failed to generate quiz: ${error instanceof Error ? error.message : String(error)}`,
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
