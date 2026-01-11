"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    Calendar, 
    FileText, 
    Upload, 
    CheckCircle2,
    BookOpen
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateAssignmentPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <TeacherHeader />

            <motion.main 
                className="max-w-4xl mx-auto px-6 pt-32 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <Link href="/teacher/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-sm mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Assignment</h1>
                    <p className="text-slate-500 font-medium">Set up a new task, quiz, or project for your class.</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                Assignment Details
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700 font-bold">Assignment Title</Label>
                                    <Input id="title" placeholder="e.g. Ethics in AI Case Study" className="rounded-xl border-slate-200 focus:ring-emerald-500/20" required />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="course" className="text-slate-700 font-bold">Course</Label>
                                    <Select>
                                        <SelectTrigger className="rounded-xl border-slate-200 focus:ring-emerald-500/20">
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                                            <SelectItem value="cs305">CS 305: Ethics</SelectItem>
                                            <SelectItem value="cs410">CS 410: Deep Learning</SelectItem>
                                            <SelectItem value="cs101">CS 101: Intro to CS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-700 font-bold">Description & Instructions</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Provide detailed instructions for the assignment..." 
                                    className="min-h-[150px] rounded-xl border-slate-200 focus:ring-emerald-500/20 resize-none leading-relaxed" 
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Calendar className="w-5 h-5 text-emerald-600" />
                                Schedule & Settings
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="dueDate" className="text-slate-700 font-bold">Due Date</Label>
                                    <Input id="dueDate" type="date" className="rounded-xl border-slate-200 focus:ring-emerald-500/20 w-full block" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="points" className="text-slate-700 font-bold">Total Points</Label>
                                    <Input id="points" type="number" placeholder="100" className="rounded-xl border-slate-200 focus:ring-emerald-500/20" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Upload className="w-5 h-5 text-emerald-600" />
                                Resources
                            </h2>
                            
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-200 transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">Click to upload files</p>
                                <p className="text-xs text-slate-500 mt-1">PDF, DOCX, or ZIP up to 10MB</p>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-4">
                            <Button type="button" variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600">
                                Cancel
                            </Button>
                            <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 min-w-[150px]" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Create Assignment
                                    </span>
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </motion.main>
        </div>
    )
}
