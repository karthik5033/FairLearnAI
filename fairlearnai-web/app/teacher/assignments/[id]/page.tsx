"use client"

import React, { useState, use, useEffect } from "react"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    Calendar, 
    FileText, 
    Clock, 
    MoreVertical, 
    User, 
    Search, 
    Filter,
    CheckCircle2,
    AlertCircle
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"

export default function AssignmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Default Mock Data
    const defaultMock = {
        title: "Ethics in AI: Case Study Analysis",
        course: "CS 305: Ethics",
        dueDate: "Oct 24, 2024",
        status: "Active",
        submissions: 24,
        total: 28,
        description: "Analyze the provided case study regarding autonomous vehicle decision making. Discuss the ethical implications using the frameworks covered in class.",
        avgScore: 88
    }

    const [assignment, setAssignment] = useState<any>(defaultMock);

    useEffect(() => {
        if (!id || id.startsWith('mock-')) return;
        
        const fetchAssignment = async () => {
            try {
                const res = await fetch(`/api/assignments/${id}`, { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    
                    // Transform DB submissions to Table Format
                    const mappedSubmissions = (data.studentSubmissions || []).map((sub: any, idx: number) => ({
                        id: sub.id,
                        name: "Alex (You)", // Since we only have one user
                        status: "Submitted",
                        score: Math.round((sub.score / sub.total) * 100),
                        submittedAt: new Date(sub.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                        risk: "Low"
                    }));

                    setAssignment({
                        ...data,
                        total: data.totalStudents, // Fix mapping
                        description: data.description || "Assessment generated via AI Fairness Assistant.",
                        avgScore: data.avgScore || (mappedSubmissions.length > 0 ? Math.round(mappedSubmissions.reduce((acc: number, curr: any) => acc + curr.score, 0) / mappedSubmissions.length) : 0),
                        dueDate: data.dueDate ? new Date(data.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Date',
                        submissionsList: mappedSubmissions
                    });
                }
            } catch (err) {
                console.error("Failed to load assignment", err);
            }
        };
        fetchAssignment();
    }, [id]);

    const studentSubmissions = assignment.submissionsList || [];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <TeacherHeader />

            <motion.main 
                className="max-w-7xl mx-auto px-6 pt-32 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <Link href="/teacher/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-sm mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{assignment.title}</h1>
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                                    {assignment.status}
                                </Badge>
                            </div>
                            <p className="text-slate-500 font-medium text-lg mb-4">{assignment.course}</p>
                            
                            <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-emerald-600" /> 
                                    Due: {assignment.dueDate}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-600" /> 
                                    {assignment.submissions}/{assignment.total} Submissions
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link href={`/teacher/assignments/${id}/edit`}>
                                <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600">
                                    Edit Assignment
                                </Button>
                            </Link>
                            <Link href={`/teacher/assignments/${id}/grade`}>
                                <Button className="rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                                    Grade Submissions
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Description */}
                    <div className="lg:col-span-2 space-y-8">
                         {/* Stats Cards */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Completion Rate</p>
                                <h3 className="text-2xl font-extrabold text-slate-900">
                                    {assignment.total > 0 ? Math.round((assignment.submissions / assignment.total) * 100) : 0}%
                                </h3>
                                <Progress value={assignment.total > 0 ? (assignment.submissions / assignment.total) * 100 : 0} className="h-1.5 mt-3 rounded-full bg-slate-100" />
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Score</p>
                                <h3 className="text-2xl font-extrabold text-emerald-600">{assignment.avgScore || 0}%</h3>
                                <p className="text-xs font-medium text-slate-400 mt-1">Based on graded work</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Needs Grading</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-extrabold text-amber-500">0</h3>
                                    <span className="text-xs font-medium text-slate-400">pending</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Submissions Table */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900">Student Submissions</h3>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-8 rounded-lg border-slate-200 text-xs font-bold">
                                        <Filter className="w-3 h-3 mr-1.5" /> Filter
                                    </Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent border-slate-100">
                                            <TableHead className="font-bold text-slate-900 pl-6">Student</TableHead>
                                            <TableHead className="font-bold text-slate-900">Status</TableHead>
                                            <TableHead className="font-bold text-slate-900">Submitted</TableHead>
                                            <TableHead className="font-bold text-slate-900">Score</TableHead>
                                            <TableHead className="font-bold text-slate-900 text-right pr-6">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {studentSubmissions.length > 0 ? studentSubmissions.map((student: any) => (
                                            <TableRow key={student.id} className="hover:bg-slate-50 border-slate-100 transition-colors">
                                                <TableCell className="pl-6 font-bold text-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        {student.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                                                        {student.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-slate-500 text-sm font-medium">{student.submittedAt}</TableCell>
                                                <TableCell className="font-bold text-slate-900">{student.score}%</TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow className="hover:bg-transparent">
                                                <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="bg-slate-50 p-4 rounded-full mb-3">
                                                            <FileText className="w-6 h-6 opacity-30" />
                                                        </div>
                                                        <p className="font-medium">No submissions yet.</p>
                                                        <p className="text-xs mt-1">Students will appear here once they start the assignment.</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        {/* AI Insights - Real Logic */}
                        <div className="bg-indigo-50/50 rounded-[2rem] p-6 border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> AI Insights
                            </h3>
                            <div className="space-y-4">
                                {studentSubmissions.length > 0 ? (
                                    <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-indigo-100">
                                        <p className="text-indigo-900 text-sm font-medium leading-relaxed">
                                            {(() => {
                                                const avg = studentSubmissions.reduce((acc: number, curr: any) => acc + curr.score, 0) / studentSubmissions.length;
                                                const highest = Math.max(...studentSubmissions.map((s: any) => s.score));
                                                
                                                let insight = "";
                                                if (avg >= 90) insight = "Excellent class performance! The majority of students have demonstrated mastery of this topic.";
                                                else if (avg >= 75) insight = `Good overall understanding (${Math.round(avg)}% avg). A review of advanced concepts might trigger perfect scores.`;
                                                else if (avg >= 60) insight = "Mixed results. While some students are succeeding, others (scores < 60%) may need a dedicated review session.";
                                                else insight = "Significant knowledge gaps detected. Immediate remedial action or topic reteaching is recommended.";

                                                return insight + ` Highest score recorded is ${highest}%.`;
                                            })()}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-white/60 p-4 rounded-xl shadow-sm border border-indigo-100 text-center py-6">
                                        <p className="text-indigo-400 text-xs font-medium">Waiting for submissions to generate insights...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resources - Empty State for now */}
                        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200">
                             <h3 className="font-bold text-slate-900 mb-4">Assignment Resources</h3>
                             <div className="flex flex-col items-center justify-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                <FileText className="w-8 h-8 opacity-20 mb-2" />
                                <p className="text-xs font-medium">No additional resources provided.</p>
                             </div>
                         </div>
                    </div>
                </div>
            </motion.main>
        </div>
    )
}
