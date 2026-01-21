import { JSONFilePreset } from 'lowdb/node';

// Define the schema types
export interface UserStats {
    xp: number;
    level: number;
    streak: number;
    hintTokens: number;
    integrityScore: number;
}

export interface QuizResult {
    id: string;
    topic: string;
    score: number;
    total: number;
    date: string;
    assignmentId?: string;
}

export interface Assignment {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    status: 'Active' | 'Draft' | 'Completed';
    quizData: any; // The generated quiz questions
    submissions: number;
    totalStudents: number;
}

export interface DatabaseSchema {
    user: UserStats;
    quizHistory: QuizResult[];
    assignments: Assignment[];
}

// Initial default data
const defaultData: DatabaseSchema = {
    user: { 
        xp: 1240, 
        level: 15, 
        streak: 7, 
        hintTokens: 12,
        integrityScore: 98
    },
    quizHistory: [],
    assignments: []
};

// Initialize the database
// We use a singleton pattern promise to ensure we await db connection
let dbInstance: any = null;

export async function getDb() {
    if (!dbInstance) {
        dbInstance = await JSONFilePreset<DatabaseSchema>('data/db.json', defaultData);
    }
    return dbInstance;
}

// Helper: Get User Stats
export async function getUserStats(): Promise<UserStats> {
    const db = await getDb();
    await db.read();
    return db.data.user;
}

// Helper: Add Quiz Result & Update XP
export async function addQuizResult(topic: string, score: number, total: number, assignmentId?: string) {
    const db = await getDb();
    await db.read();

    // 1. Save Result
    const newResult: QuizResult = {
        id: crypto.randomUUID(),
        topic,
        score,
        total,
        date: new Date().toISOString(),
        assignmentId
    };
    db.data.quizHistory.unshift(newResult); 

    // 2. Update Assignment Stats (if applicable)
    if (assignmentId) {
        const assignment = db.data.assignments.find((a: Assignment) => a.id === assignmentId);
        if (assignment) {
            assignment.submissions = (assignment.submissions || 0) + 1;
        }
    }

    // 3. Calculate XP (10 points per correct answer + 50 bonus for perfect score)
    let xpGained = score * 10;
    if (score === total) xpGained += 50;

    // 3. Update User Stats
    db.data.user.xp += xpGained;
    
    // Simple level up logic: Level = 1 + (XP / 500)
    const newLevel = 1 + Math.floor(db.data.user.xp / 500);
    db.data.user.level = newLevel;

    await db.write();

    return { xpGained, newLevel };
}

// Helper: Assignments
export async function getAssignments(): Promise<Assignment[]> {
    const db = await getDb();
    await db.read();
    return db.data.assignments || [];
}

export async function getAssignmentSubmissions(assignmentId: string): Promise<QuizResult[]> {
    const db = await getDb();
    await db.read();
    return db.data.quizHistory.filter((q: QuizResult) => q.assignmentId === assignmentId);
}

export async function addAssignment(assignment: Omit<Assignment, 'id' | 'submissions' | 'totalStudents'>) {
    const db = await getDb();
    await db.read();

    const newAssignment: Assignment = {
        ...assignment,
        id: crypto.randomUUID(),
        submissions: 0,
        totalStudents: 28 // Mock class size
    };
    
    // Ensure array exists
    if (!db.data.assignments) db.data.assignments = [];
    
    db.data.assignments.unshift(newAssignment);
    await db.write();
    
    return newAssignment;
}

export async function getAssignmentById(id: string): Promise<Assignment | undefined> {
    const db = await getDb();
    await db.read();
    return db.data.assignments?.find((a: Assignment) => a.id === id);
}

export async function deleteAssignment(id: string) {
    const db = await getDb();
    await db.read();
    if (db.data.assignments) {
        db.data.assignments = db.data.assignments.filter((a: Assignment) => a.id !== id);
        await db.write();
    }
}
