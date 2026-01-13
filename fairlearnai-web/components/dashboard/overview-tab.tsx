import React from "react"
import { motion, Variants } from "framer-motion"
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
    ChevronRight 
} from "lucide-react"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export function OverviewTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Main Content) - Spans 8 columns */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Functionality: Course Hero Card with Map */}
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
                                <Clock className="w-3 h-3 text-emerald-400" /> In Progress
                            </span>
                            
                            <h2 className="text-3xl font-bold mb-3 text-slate-900 tracking-tight leading-tight">
                                Advanced Calculus: Limits
                            </h2>
                            <p className="text-slate-500 font-medium mb-6 leading-relaxed">
                                You're 75% done with Module 3. Master continuity to unlock the next quiz.
                            </p>
                            
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 transition-all active:scale-95">
                                    Resume Lesson <Play className="w-4 h-4 fill-current" />
                                </button>
                                <button className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                                    Syllabus
                                </button>
                            </div>
                        </div>

                        {/* Visual Course Map */}
                        <div className="md:w-64 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Module Map</h3>
                            {[
                                { label: "Intro to Limits", status: "completed" },
                                { label: "Epsilon-Delta", status: "completed" },
                                { label: "Continuity", status: "current" },
                                { label: "Derivatives Intro", status: "locked" }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border ${
                                        step.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' :
                                        step.status === 'current' ? 'bg-white border-emerald-500 text-emerald-500 ring-2 ring-emerald-100' :
                                        'bg-slate-100 border-slate-200 text-slate-400'
                                    }`}>
                                        {step.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                                    </div>
                                    <span className={`text-xs font-bold ${
                                        step.status === 'locked' ? 'text-slate-400' : 'text-slate-700'
                                    }`}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Recent Activity & Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Charts Section */}
                        <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow"
                        >
                        {/* Header removed to let chart component handle it */}
                        <div className="h-[300px] w-full">
                                <ChartAreaInteractive />
                        </div>
                        </motion.div>

                    {/* Schedule / Tasks Widget */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                                    <Calendar className="w-4 h-4" />
                                    </div>
                                <h3 className="text-base font-bold text-slate-800">Today's Schedule</h3>
                            </div>
                            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { time: "10:00 AM", title: "Live Session: Physics", type: "Live", color: "text-rose-500 bg-rose-50" },
                                { time: "02:00 PM", title: "Assignment Due", type: "Deadline", color: "text-orange-500 bg-orange-50" },
                                { time: "04:30 PM", title: "Group Study", type: "Meet", color: "text-blue-500 bg-blue-50" },
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

                    {/* Recommended Resources (New) */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <Library className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Recommended for You</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: "Calculus Cheatsheet", type: "PDF", size: "2.4 MB", icon: FileText, color: "text-red-500 bg-red-50" },
                            { title: "Limits Walkthrough", type: "Video", size: "15 min", icon: Video, color: "text-blue-500 bg-blue-50" },
                            { title: "Practice Problem Set", type: "Worksheet", size: "1.1 MB", icon: Download, color: "text-emerald-500 bg-emerald-50" },
                        ].map((res, i) => (
                            <div key={i} className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 hover:shadow-md transition-all cursor-pointer group">
                                <div className={`w-10 h-10 rounded-xl ${res.color} flex items-center justify-center mb-3`}>
                                    <res.icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{res.title}</h4>
                                <p className="text-xs text-slate-400 font-medium">{res.type} • {res.size}</p>
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
                        { label: "Start Quiz", icon: Target, color: "text-violet-600 bg-violet-50" },
                        { label: "Flashcards", icon: Library, color: "text-amber-600 bg-amber-50" },
                        { label: "Peer Help", icon: Users, color: "text-sky-600 bg-sky-50" },
                        { label: "Customize", icon: Settings, color: "text-slate-600 bg-slate-50" },
                    ].map((action, i) => (
                        <button key={i} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                                <action.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* Stats Cards - Compact & Clean */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                                <Flame className="w-5 h-5 fill-orange-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">7 <span className="text-sm font-bold text-slate-400">days</span></p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Streak</p>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-100" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                <Trophy className="w-5 h-5 fill-yellow-600" />
                            </div>
                                <div>
                                <p className="text-2xl font-extrabold text-slate-900">1.2k</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500">Weekly Goal</span>
                            <span className="text-xs font-bold text-emerald-600">80%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                        </div>
                    </div>
                </div>

                {/* Leaderboard Widget (New) */}
                <motion.div 
                    variants={itemVariants} 
                    className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Top Peers</h3>
                        <button className="text-xs text-emerald-600 font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Sarah K.", points: "2,450", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
                            { name: "Mike R.", points: "1,890", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
                            { name: "You", points: "1,200", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", active: true },
                        ].map((peer, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${peer.active ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50'}`}>
                                <span className={`text-xs font-bold w-4 ${i===0 ? 'text-yellow-500' : 'text-slate-400'}`}>{i+1}</span>
                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={peer.img} alt={peer.name} className="w-full h-full" />
                                </div>
                                <span className="text-sm font-bold text-slate-700 flex-1">{peer.name}</span>
                                <span className="text-xs font-bold text-slate-500">{peer.points} XP</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Tutor Widget */}
                <motion.div 
                    variants={itemVariants} 
                    className="bg-white rounded-[2rem] border border-slate-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="bg-slate-50 rounded-[1.5rem] p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                <Bot className="w-4 h-4" />
                            </div>
                            <p className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">Online</p>
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                            "I've found a great article to help with <span className="font-bold text-slate-900">Derivatives</span>. Want to see it?"
                        </p>
                    </div>
                    <div className="p-2 gap-2 flex">
                        <input 
                            type="text" 
                            placeholder="Ask a question..." 
                            className="flex-1 bg-white border border-slate-100 rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    )
}
