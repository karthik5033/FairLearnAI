'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Link from 'next/link'
import { 
    Search,
    Bell,
    Sparkles,
    Shield,
    Users,
    FileText,
    Settings
} from "lucide-react"

import { Logo } from "@/components/logo"
import { TeacherOverviewTab } from "@/components/teacher-dashboard/overview-tab"
import { TeacherStudentsTab } from "@/components/teacher-dashboard/students-tab"
import { TeacherAssignmentsTab } from "@/components/teacher-dashboard/assignments-tab"
import { TeacherSettingsTab } from "@/components/teacher-dashboard/settings-tab"

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export default function TeacherDashboardPage() {
    const [focusMode, setFocusMode] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
            
            {/* Ambient Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            {/* Header */}
            <header className="fixed top-4 z-40 w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
                <div className="max-w-7xl mx-auto rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-200/20 pointer-events-auto transition-all duration-300">
                    <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-3.5">
                        <div className="flex items-center gap-2">
                             <Logo className="text-slate-900" uniColor={false} />
                             <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-200 ml-2">Teacher</span>
                        </div>

                        {/* Search Bar - Hidden on mobile */}
                        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search students, flags, or rules..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-400 h-10 shadow-sm"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                 <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-slate-200 bg-white px-2 font-mono text-[10px] font-bold text-slate-500 shadow-sm">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                             <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-100 shadow-inner">
                                <span className={`text-[11px] font-bold px-3 transition-colors ${focusMode ? 'text-emerald-600' : 'text-slate-500'}`}>
                                    Focus
                                </span>
                                <button 
                                    onClick={() => setFocusMode(!focusMode)}
                                    className={`w-10 h-6 rounded-full p-0.5 transition-all duration-300 ${focusMode ? 'bg-emerald-500 shadow-md' : 'bg-slate-300'}`}
                                >
                                    <motion.div 
                                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                                        animate={{ x: focusMode ? 16 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </button>
                            </div>

                            <button className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all shadow-sm relative group">
                                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                            </button>
                             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-violet-100 border-2 border-white shadow-md cursor-pointer hover:shadow-lg transition-transform hover:scale-105 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                T
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <motion.main 
                className="max-w-7xl mx-auto px-6 pt-32 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Announcements Banner */}
                <AnimatePresence>
                    {!focusMode && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 32 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="bg-slate-900 rounded-[1.5rem] p-1.5 pr-6 text-white shadow-2xl shadow-slate-200/50 flex items-center justify-between relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-48 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px] -ml-20 -mb-32 pointer-events-none" />
                            
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50 shadow-inner backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                        <Bell className="w-5 h-5 text-white fill-white/20" />
                                    </div>
                                </div>
                                <div className="py-1">
                                    <div className="flex items-center gap-3 mb-0.5">
                                        <h3 className="font-bold text-base tracking-tight text-white">Policy Update</h3>
                                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-bold border border-indigo-500/20 uppercase tracking-wide shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                            Important
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 font-medium leading-relaxed">New genAI detection rules are now active for all classes.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 relative z-10">
                                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white text-slate-950 text-xs font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] active:scale-95 ring-1 ring-slate-200">
                                    Review Rules <Sparkles className="w-3 h-3 text-indigo-600" />
                                </button>
                                <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                    <span className="sr-only">Dismiss</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Greeting & Tabs */}
                <div className="mb-8">
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider mb-3 border border-emerald-100 shadow-sm">
                                <Shield className="w-3 h-3 fill-emerald-700" /> Integrity Status: Excellent
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Professor</span>
                            </h1>
                            <p className="text-slate-500 font-medium">
                                You have 5 new assignments to grade.
                            </p>
                        </div>
                        <div className="flex gap-2 p-1 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-100 overflow-x-auto shadow-sm">
                            {["overview", "students", "assignments", "settings"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${
                                        activeTab === tab 
                                            ? "bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5" 
                                            : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -20 }
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && <TeacherOverviewTab />}
                        {activeTab === 'students' && <TeacherStudentsTab />}
                        {activeTab === 'assignments' && <TeacherAssignmentsTab />}
                        {activeTab === 'settings' && <TeacherSettingsTab />}
                    </motion.div>
                </AnimatePresence>
            </motion.main>
        </div>
    )
}
