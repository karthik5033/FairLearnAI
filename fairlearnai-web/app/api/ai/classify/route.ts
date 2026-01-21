import { NextResponse } from 'next/server';
import { classifyPrompt } from '@/lib/ai/classifier';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const result = classifyPrompt(prompt);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Classification error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
