"use client"

import React, { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { 
    Plus, 
    Calendar, 
    MoreVertical, 
    Clock, 
    FileText, 
    CheckCircle2, 
    AlertCircle,
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.1 
        }
    }
}

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    }
}

export function TeacherAssignmentsTab() {
    const [assignments, setAssignments] = useState<any[]>([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch('/api/assignments', { 
                    cache: 'no-store',
                    next: { revalidate: 0 } // Force dynamic check for Next.js 13+
                });
                
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        const realAssignments = data.map((a: any) => ({
                            id: a.id,
                            title: a.title,
                            course: a.course,
                            dueDate: a.dueDate ? new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Due Date',
                            status: a.status,
                            submissions: a.submissions || 0,
                            total: a.totalStudents || 28,
                            avgScore: null,
                            daysLeft: a.dueDate ? Math.ceil((new Date(a.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0
                        }));
                        setAssignments(realAssignments);
                    }
                }
            } catch (err) {
                console.error("Assignment fetch error:", err);
            }
        };
        fetchAssignments();
    }, [])
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch('/api/assignments', { cache: 'no-store' });
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                
                const data = await res.json();
                console.log("Raw API Data:", data);
                
                if (Array.isArray(data)) {
                    setAssignments(data);
                } else {
                    setError("API returned non-array");
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(err.message || String(err));
            }
        };
        fetchAssignments();
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Assignments</h2>
                     <p className="text-slate-500 font-medium">Create and manage coursework for your classes.</p>
                </div>
                <Link href="/teacher/assignments/create">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        New Assignment
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Assignment Cards */}
                {assignments.map((assignment) => (
                    <div 
                        key={assignment.id}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-full"
                    >
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <Badge variant="secondary" className={`
                                    ${assignment.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                                      assignment.status === 'Grading' ? 'bg-amber-50 text-amber-700' :
                                      'bg-slate-100 text-slate-600'}
                                `}>
                                    {assignment.status}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-slate-400 hover:text-slate-900">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[160px] rounded-xl font-bold">
                                        <DropdownMenuItem 
                                            className="text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer" 
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                if(confirm("Are you sure? This cannot be undone.")) {
                                                    try {
                                                        const res = await fetch(`/api/assignments/${assignment.id}`, { method: 'DELETE' });
                                                        if (res.ok) {
                                                            setAssignments(prev => prev.filter(a => a.id !== assignment.id));
                                                        } else {
                                                            alert("Failed to delete assignment. Please try again.");
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert("Error deleting assignment.");
                                                    }
                                                }
                                            }}
                                        >
                                            Delete Assignment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                {assignment.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mb-6">{assignment.course}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due</p>
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                                        <Calendar className="w-3.5 h-3.5" /> {assignment.dueDate}
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submissions</p>
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                                        <FileText className="w-3.5 h-3.5" /> {assignment.submissions}/{assignment.total}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            {assignment.status !== 'Completed' ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-slate-500">Completion</span>
                                        <span className="text-emerald-600">{Math.round((assignment.submissions / assignment.total) * 100)}%</span>
                                    </div>
                                    <Progress value={(assignment.submissions / assignment.total) * 100} className="h-2 rounded-full bg-slate-100" />
                                    {assignment.daysLeft > 0 && (
                                         <p className="text-xs font-medium text-amber-600 mt-2 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Closes in {assignment.daysLeft} days
                                         </p>
                                    )}
                                </div>
                            ) : (
                                <div className=" bg-emerald-50 rounded-xl p-3 flex items-center justify-between">
                                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Class Average</span>
                                    <span className="text-lg font-extrabold text-emerald-700">{assignment.avgScore}%</span>
                                </div>
                            )}

                            <Link href={`/teacher/assignments/${assignment.id}`}>
                                <Button variant="outline" className="w-full mt-4 rounded-xl border-slate-200 font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300">
                                    Manage <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
                
                {assignments.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                        <FileText className="w-12 h-12 mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-slate-600">No Generated Assignments Found</h3>
                        <p className="text-sm">Create a new assignment to get started.</p>
                    </div>
                )}

                {/* Create New Placeholder Card */}
                <Link href="/teacher/assignments/create" className="h-full">
                    <button 
                        className="w-full h-full rounded-[2rem] border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-50 hover:border-emerald-200 transition-all group min-h-[300px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Create Assignment</h3>
                            <p className="text-sm font-medium text-slate-500">Set up a new task or quiz</p>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}
