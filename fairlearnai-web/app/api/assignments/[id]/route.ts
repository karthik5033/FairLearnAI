import { NextResponse } from 'next/server';
import { getAssignmentById } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { getAssignmentSubmissions } = await import('@/lib/db'); // lazy load to avoid issues
    
    const assignment = await getAssignmentById(id);
    const submissions = await getAssignmentSubmissions(id);
    
    if (!assignment) {
        return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ...assignment, studentSubmissions: submissions });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { deleteAssignment } = await import('@/lib/db');
    
    try {
        await deleteAssignment(id);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
