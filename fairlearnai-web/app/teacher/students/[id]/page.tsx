"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    Mail, 
    MoreHorizontal, 
    Shield, 
    Activity, 
    BookOpen, 
    Clock,
    AlertTriangle,
    CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StudentProfilePage({ params }: { params: { id: string } }) {
    // Mock Student Data
    const student = {
        id: "1",
        name: "Alice Johnson",
        email: "alice.j@uni.edu",
        course: "Computer Science",
        year: "Junior",
        status: "Active",
        riskLevel: "Low",
        avgGrade: 92,
        attendance: 95,
        lastActive: "2 mins ago"
    }

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
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-slate-400">
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        
                        <div className="text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{student.name}</h1>
                                    <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                                            {student.course}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                                            {student.year}
                                        </Badge>
                                        <Badge className={`
                                            ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}
                                        `}>
                                            {student.status}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-500 font-medium mt-3 flex items-center gap-2 justify-center md:justify-start">
                                        <Mail className="w-4 h-4" /> {student.email}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600">
                                        <Mail className="w-4 h-4 mr-2" /> Message
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 rounded-xl">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                     <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500">Average Grade</p>
                            <h3 className="text-2xl font-extrabold text-slate-900">{student.avgGrade}%</h3>
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500">Assignments</p>
                            <h3 className="text-2xl font-extrabold text-slate-900">12/14</h3>
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500">Risk Level</p>
                            <h3 className="text-2xl font-extrabold text-rose-600">{student.riskLevel}</h3>
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Activity Feed */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: "Submitted Assignment", detail: "Ethics Case Study", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
                                { action: "Flagged Content", detail: "Similarity Detected in Project", time: "1 day ago", icon: AlertTriangle, color: "text-amber-500 bg-amber-50" },
                                { action: "Logged In", detail: "From Chrome on Windows", time: "2 days ago", icon: Clock, color: "text-slate-500 bg-slate-50" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{item.action}</p>
                                        <p className="text-slate-500 text-xs font-medium">{item.detail}</p>
                                        <p className="text-slate-400 text-[10px] mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Chart Placeholder */}
                     <div className="space-y-6">
                        <h3 className="font-bold text-lg text-slate-900">Performance Trends</h3>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm h-[300px] flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
                            <p className="text-slate-400 font-medium">Chart visualization would go here</p>
                        </div>
                    </div>
                </div>

            </motion.main>
        </div>
    )
}
