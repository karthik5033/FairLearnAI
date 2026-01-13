"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    UserPlus, 
    Mail, 
    CreditCard, 
    BookOpen,
    CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddStudentPage() {
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
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add New Student</h1>
                    <p className="text-slate-500 font-medium">Enroll a new student into your courses.</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <UserPlus className="w-5 h-5 text-emerald-600" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-slate-700 font-bold">First Name</Label>
                                    <Input id="firstName" placeholder="Jane" className="rounded-xl border-slate-200 focus:ring-emerald-500/20" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-slate-700 font-bold">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" className="rounded-xl border-slate-200 focus:ring-emerald-500/20" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-bold">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input id="email" type="email" placeholder="jane.doe@university.edu" className="pl-10 rounded-xl border-slate-200 focus:ring-emerald-500/20" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                Enrollment Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="studentId" className="text-slate-700 font-bold">Student ID</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input id="studentId" placeholder="ID-12345678" className="pl-10 rounded-xl border-slate-200 focus:ring-emerald-500/20" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="course" className="text-slate-700 font-bold">Assign Course</Label>
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
                                        Enrolling...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Enroll Student
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
