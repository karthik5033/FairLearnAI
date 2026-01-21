import { NextResponse } from 'next/server';

// Temporary in-memory store for demo
let examMode = false;

export async function GET() {
    return NextResponse.json({ examMode });
}

export async function POST(request: Request) {
    const { mode } = await request.json();
    examMode = mode;
    return NextResponse.json({ success: true, examMode });
}
