import { NextResponse } from 'next/server';
import { getUserStats, addQuizResult } from '@/lib/db';

export async function GET() {
    try {
        const stats = await getUserStats();
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user progress' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { topic, score, total } = await req.json();
        
        if (!topic || score === undefined || !total) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await addQuizResult(topic, score, total);
        
        return NextResponse.json({ 
            success: true, 
            xpGained: result.xpGained,
            newLevel: result.newLevel
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }
}
