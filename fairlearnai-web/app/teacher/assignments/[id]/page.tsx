"use client"

import React, { useState } from "react"
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

export default function AssignmentDetailsPage({ params }: { params: { id: string } }) {
    // Mock Data based on ID (ignoring actual ID for now, using static mock)
    const assignment = {
        title: "Ethics in AI: Case Study Analysis",
        course: "CS 305: Ethics",
        dueDate: "Oct 24, 2024",
        status: "Active",
        submissions: 24,
        total: 28,
        description: "Analyze the provided case study regarding autonomous vehicle decision making. Discuss the ethical implications using the frameworks covered in class.",
        avgScore: 88
    }

    const studentSubmissions = [
        { id: 1, name: "Alice Johnson", status: "Submitted", score: 92, submittedAt: "Oct 23, 2:30 PM", risk: "Low" },
        { id: 2, name: "Bob Smith", status: "Submitted", score: 85, submittedAt: "Oct 23, 4:15 PM", risk: "Low" },
        { id: 3, name: "Charlie Brown", status: "Late", score: 78, submittedAt: "Oct 25, 9:00 AM", risk: "Medium" },
        { id: 4, name: "Diana Prince", status: "Missing", score: null, submittedAt: "-", risk: "-" },
    ]

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
                            <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600">
                                Edit Assignment
                            </Button>
                            <Button className="rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                                Grade Submissions
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Description */}
                    <div className="lg:col-span-2 space-y-8">
                         {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Completion Rate</p>
                                <h3 className="text-2xl font-extrabold text-slate-900">{Math.round((assignment.submissions / assignment.total) * 100)}%</h3>
                                <Progress value={(assignment.submissions / assignment.total) * 100} className="h-1.5 mt-3 rounded-full bg-slate-100" />
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Score</p>
                                <h3 className="text-2xl font-extrabold text-emerald-600">{assignment.avgScore}%</h3>
                                <p className="text-xs font-medium text-emerald-600 mt-1">+2% vs last year</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Needs Grading</p>
                                <h3 className="text-2xl font-extrabold text-amber-500">4</h3>
                                <p className="text-xs font-medium text-slate-400 mt-1">Requires attention</p>
                            </div>
                        </div>

                        {/* Recent Submissions Table */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900">Student Submissions</h3>
                                <div className="flex gap-2">
                                     <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Search..." 
                                            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none w-40"
                                        />
                                    </div>
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
                                        {studentSubmissions.map((student) => (
                                            <TableRow key={student.id} className="hover:bg-slate-50/50 border-slate-100">
                                                <TableCell className="font-bold text-slate-700 pl-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">
                                                            <User className="w-3 h-3" />
                                                        </div>
                                                        {student.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={`
                                                        ${student.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                          student.status === 'Late' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                          'bg-rose-50 text-rose-700 border-rose-200'}
                                                    `}>
                                                        {student.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-slate-500 font-medium text-xs">
                                                    {student.submittedAt}
                                                </TableCell>
                                                <TableCell className="font-bold text-slate-900">
                                                    {student.score !== null ? `${student.score}%` : '-'}
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-indigo-50/50 rounded-[2rem] p-6 border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> AI Insights
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                                    <p className="text-indigo-900 font-bold text-sm mb-1">Unusual Similarity Detected</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Students Alice Johnson and Bob Smith have 85% similarity in their code structure.
                                    </p>
                                    <Button variant="link" className="text-indigo-600 font-bold text-xs p-0 h-auto mt-2">
                                        View Comparison &rarr;
                                    </Button>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                                    <p className="text-indigo-900 font-bold text-sm mb-1">GenAI Usage Flag</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Charlie Brown's submission shows patterns consistent with generated text.
                                    </p>
                                    <Button variant="link" className="text-indigo-600 font-bold text-xs p-0 h-auto mt-2">
                                        Analyze Report &rarr;
                                    </Button>
                                </div>
                            </div>
                        </div>

                         <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200">
                             <h3 className="font-bold text-slate-900 mb-2">Assignment Resources</h3>
                             <ul className="space-y-3">
                                <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500/30 transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">CaseStudy.pdf</p>
                                        <p className="text-[10px] text-slate-400">2.4 MB</p>
                                    </div>
                                </li>
                             </ul>
                         </div>
                    </div>

                </div>
            </motion.main>
        </div>
    )
}
