import { NextResponse } from 'next/server';
import { getAssignments, addAssignment } from '@/lib/db';

export const dynamic = 'force-dynamic';


export async function GET() {
    console.log("API: GET /api/assignments called");
    try {
        const assignments = await getAssignments();
        console.log(`API: Returning ${assignments.length} assignments`);
        return NextResponse.json(assignments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, course, dueDate, status, quizData } = body;

        if (!title || !course) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newAssignment = await addAssignment({
            title,
            course,
            dueDate: dueDate || new Date().toLocaleDateString(),
            status: status || 'Active',
            quizData: quizData || null
        });

        return NextResponse.json({ success: true, assignment: newAssignment });
    } catch (error) {
        console.error("Create assignment error:", error);
        return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
    }
}
