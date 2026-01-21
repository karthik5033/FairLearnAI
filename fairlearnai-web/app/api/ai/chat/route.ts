import { NextResponse } from 'next/server';
import { classifyPrompt } from '@/lib/ai/classifier';
import { GeminiClient } from '@/lib/ai/gemini-client';

export async function POST(req: Request) {
    try {
        const { prompt, mode = 'practice', userRole = 'student' } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // 1. Run Classification
        const classification = classifyPrompt(prompt);

        // 2. Teacher Policy (Hardcoded for now as per idea.txt)
        const examMode = false;

        // 3. Logic based on classification and policy
        if (classification.label === 'DISALLOWED' || (examMode && classification.label !== 'ALLOWED')) {
            return NextResponse.json({
                label: classification.label,
                answer: "I'm sorry, but I cannot provide the direct answer or assist with this request as it violates academic integrity policies. I can, however, help you understand the concepts if you ask for a hint or explanation.",
                blocked: true,
                reason: classification.reason
            });
        }

        // 4. Prepare System Prompt (Foundation for LLM)
        let systemPrompt = "You are a helpful academic tutor. Help the student understand concepts clearly.";
        
        if (classification.label === 'HINT_ONLY') {
            systemPrompt = "You are a tutor in 'Hint mode'. Do NOT provide the final answer. Instead, guide the student with questions, step-by-step logic, or clues to help them reach the answer themselves.";
        } else if (classification.label === 'OFF_TOPIC') {
            systemPrompt = "The student has asked an off-topic question. Politely redirect them to their academic studies while remaining friendly.";
        }

        // 5. Generate Response via Gemini (Multi-Key Failover)
        let answer = "";
        try {
            // Note: If blocked, we skip the LLM call entirely (handled above)
            // If HINT_ONLY or ALLOWED, we proceed.
            // OFF_TOPIC is also sent to LLM with a redirecting system prompt to make it natural.
            
            console.log(`🤖 Sending request to Gemini [Label: ${classification.label}]`);
            answer = await GeminiClient.generateContent(systemPrompt, prompt);
            
        } catch (llmError) {
            console.error("Gemini generation failed:", llmError);
            // Fallback if LLM fails completely
            answer = "I'm having trouble connecting to my brain right now. Please try again later. (Error: Service Unavailable)";
        }

        return NextResponse.json({
            label: classification.label,
            answer: answer,
            blocked: false,
            confidence: classification.confidence
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
