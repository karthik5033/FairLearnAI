import { NextResponse } from 'next/server';
import { addQuizResult } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topic, score, total, assignmentId } = body;

        if (!topic || score === undefined || !total) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await addQuizResult(topic, score, total, assignmentId);
        
        return NextResponse.json({ 
            success: true, 
            xpGained: result.xpGained,
            newLevel: result.newLevel 
        });
    } catch (e) {
        console.error("Quiz submission error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
