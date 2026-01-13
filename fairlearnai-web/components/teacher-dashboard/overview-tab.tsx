"use client"

import React from "react"
import { motion,Variants } from "framer-motion"
import { 
    Clock, 
    Play, 
    CheckCircle2, 
    PieChart, 
    Calendar, 
    Library, 
    FileText, 
    Video, 
    Download, 
    Target, 
    Users, 
    Settings, 
    Flame, 
    Trophy, 
    Bot, 
    ChevronRight,
    Shield,
    AlertTriangle,
    Eye,
    Activity,
    BookOpen,
    GraduationCap,
    AlertOctagon,
    XCircle,
    MessageSquare,
    Search
} from "lucide-react"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const itemVariants:Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export function TeacherOverviewTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Main Content) - Spans 8 columns */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Hero / Status Card */}
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] group"
                >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-[10rem] opacity-50 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider mb-4 shadow-lg shadow-slate-900/20">
                                <Shield className="w-3 h-3 text-emerald-400" /> System Active
                            </span>
                            
                            <h2 className="text-3xl font-bold mb-3 text-slate-900 tracking-tight leading-tight">
                                Academic Integrity Monitor
                            </h2>
                            <p className="text-slate-500 font-medium mb-6 leading-relaxed">
                                AI usage is within expected parameters. 3 new flags require your attention today.
                            </p>
                            
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 transition-all active:scale-95">
                                    Review Flags <Eye className="w-4 h-4" />
                                </button>
                                <Link href="/teacher/dashboard?tab=settings" className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors inline-block">
                                    Class Settings
                                </Link>
                            </div>
                        </div>

                        {/* Visual Status Map */}
                        <div className="md:w-64 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Safety Checks</h3>
                            {[
                                { label: "Plagiarism Scan", status: "secure" },
                                { label: "Bias Detection", status: "warning" },
                                { label: "Safety Filter", status: "secure" },
                                { label: "Prompt Injection", status: "secure" }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border ${
                                        step.status === 'secure' ? 'bg-emerald-500 border-emerald-500 text-white' :
                                        step.status === 'warning' ? 'bg-amber-100 border-amber-500 text-amber-600 ring-2 ring-amber-100' :
                                        'bg-slate-100 border-slate-200 text-slate-400'
                                    }`}>
                                        {step.status === 'secure' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={`text-xs font-bold ${
                                        step.status === 'locked' ? 'text-slate-400' : 'text-slate-700'
                                    }`}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Activity & Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Charts Section */}
                        <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow"
                        >
                        <div className="h-[300px] w-full">
                                <ChartAreaInteractive />
                        </div>
                        </motion.div>

                    {/* Recent Flags Widget */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                                    <AlertTriangle className="w-4 h-4" />
                                    </div>
                                <h3 className="text-base font-bold text-slate-800">Recent Flags</h3>
                            </div>
                            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { time: "10m ago", title: "Write my essay request", type: "Plagiarism", color: "text-rose-500 bg-rose-50" },
                                { time: "2h ago", title: "Biased framing detected", type: "Review", color: "text-amber-500 bg-amber-50" },
                                { time: "4h ago", title: "Unsafe content filter", type: "Blocked", color: "text-slate-500 bg-slate-100" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-16 pt-1 text-xs font-bold text-slate-400 text-right group-hover:text-slate-600 transition-colors">
                                        {item.time}
                                    </div>
                                    <div className="flex-1 pb-4 border-l-2 border-slate-100 pl-4 relative last:border-0 last:pb-0">
                                        <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ring-2 ring-slate-100 bg-white group-hover:bg-slate-300 transition-colors`} />
                                        <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all`}>
                                            <p className="text-sm font-bold text-slate-800">{item.title}</p>
                                            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                    {/* Class Insights (replacing Recommended Resources) */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Classroom Insights</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: "Prompt Diversity", type: "High", desc: "Students are exploring varied topics.", icon: MessageSquare, color: "text-purple-500 bg-purple-50" },
                            { title: "Citation Usage", type: "Improved", desc: "20% increase in sources.", icon: FileText, color: "text-blue-500 bg-blue-50" },
                            { title: "Time Management", type: "Stable", desc: "Consistent usage patterns.", icon: Clock, color: "text-emerald-500 bg-emerald-50" },
                        ].map((res, i) => (
                            <div key={i} className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 hover:shadow-md transition-all cursor-pointer group">
                                <div className={`w-10 h-10 rounded-xl ${res.color} flex items-center justify-center mb-3`}>
                                    <res.icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{res.title}</h4>
                                <p className="text-xs text-slate-400 font-medium mb-1">{res.type}</p>
                                <p className="text-xs text-slate-500 leading-tight">{res.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Right Column (Stats & Extras) - Spans 4 columns */}
            <motion.div className="lg:col-span-4 space-y-8" variants={itemVariants}>
                
                {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: "Update Rules", icon: Settings, color: "text-violet-600 bg-violet-50" },
                        { label: "Student List", icon: Users, color: "text-amber-600 bg-amber-50" },
                        { label: "Reports", icon: Activity, color: "text-sky-600 bg-sky-50" },
                        { label: "Support", icon: Bot, color: "text-slate-600 bg-slate-50" },
                    ].map((action, i) => (
                        <Link 
                            key={i} 
                            href={`/teacher/dashboard?tab=${
                                action.label === "Update Rules" ? "settings" :
                                action.label === "Student List" ? "students" :
                                action.label === "Reports" ? "assignments" :
                                "overview"
                            }`}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                                <action.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{action.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                                <Users className="w-5 h-5 fill-orange-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">28</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active</p>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-100" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                <Shield className="w-5 h-5 fill-yellow-600" />
                            </div>
                                <div>
                                <p className="text-2xl font-extrabold text-slate-900">98%</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Safe</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500">Weekly Engagement</span>
                            <span className="text-xs font-bold text-emerald-600">High</span>
                        </div>
                         <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                        </div>
                    </div>
                </div>

                {/* Top Students / Usage (Replacing Leaderboard) */}
                <motion.div 
                    variants={itemVariants} 
                    className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Top Learners</h3>
                        <Link href="/teacher/dashboard?tab=students" className="text-xs text-emerald-600 font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "John S.", status: "Excelling", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
                            { name: "Emily D.", status: "Steady", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
                            { name: "Michael B.", status: "Needs Support", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
                        ].map((student, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50`}>
                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={student.img} alt={student.name} className="w-full h-full" />
                                </div>
                                <span className="text-sm font-bold text-slate-700 flex-1">{student.name}</span>
                                <span className={`text-xs font-bold ${
                                    student.status === 'Excelling' ? 'text-emerald-500' :
                                    student.status === 'Needs Support' ? 'text-rose-500' :
                                    'text-blue-500'
                                }`}>{student.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Teacher Assistant Widget (Replacing AI Tutor) */}
                <motion.div 
                    variants={itemVariants} 
                    className="bg-white rounded-[2rem] border border-slate-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="bg-slate-50 rounded-[1.5rem] p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                                <Bot className="w-4 h-4" />
                            </div>
                            <p className="text-xs font-bold text-violet-700 bg-violet-100 px-2 py-1 rounded-md">AI Search</p>
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                            "Search across all student prompts for specific topics or potential issues."
                        </p>
                    </div>
                    <div className="p-2 gap-2 flex">
                        <input 
                            type="text" 
                            placeholder="Search prompts..." 
                            className="flex-1 bg-white border border-slate-100 rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                         <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-colors">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    )
}
