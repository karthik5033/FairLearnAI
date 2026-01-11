"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
    Search,
    Bell,
    Menu
} from "lucide-react"
import { Logo } from "@/components/logo"
import Link from "next/link"

export function TeacherHeader() {
    const [focusMode, setFocusMode] = useState(false)

    return (
        <header className="fixed top-4 z-40 w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-200/20 pointer-events-auto transition-all duration-300">
                <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-3.5">
                    <Link href="/teacher/dashboard" className="flex items-center gap-2">
                            <Logo className="text-slate-900" uniColor={false} />
                            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-200 ml-2">Teacher</span>
                    </Link>

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
    )
}
