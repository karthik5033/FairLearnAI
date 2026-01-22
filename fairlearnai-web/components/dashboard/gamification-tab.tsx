import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Zap, 
    Trophy, 
    Target, 
    Flame, 
    ArrowRight, 
    Brain,
    Coins,
    Sparkles,
    Shield,
    Atom
} from "lucide-react"
import Link from "next/link"

const stats = [
    { id: "xp", label: "Current XP", value: "...", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { id: "streak", label: "Daily Streak", value: "0 Days", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "tokens", label: "Hint Tokens", value: "0", icon: Coins, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "level", label: "Level", value: "1", icon: Trophy, color: "text-indigo-500", bg: "bg-indigo-50" },
]

const activities = [
    { 
        title: "Adaptive Math Quiz", 
        desc: "Based on your focus on Calculus",
        reward: "+50 XP",
        type: "Adaptive",
        icon: Brain,
        color: "indigo",
        link: "/gamification/adaptive-math"
    },
    { 
        title: "Daily Challenge", 
        desc: "Complete 3 rapid-fire questions",
        reward: "+20 XP",
        type: "Daily",
        icon: Target,
        color: "emerald",
        link: "/gamification/daily-challenge"
    },
    { 
        title: "Boss Fight: Limits", 
        desc: "Unlock the next chapter",
        reward: "+200 XP",
        type: "Boss",
        icon: Sparkles,
        color: "violet",
        link: "/gamification/boss-fight"
    },
    { 
        title: "Physics Lab: Motion", 
        desc: "Master Kinematics in 3D",
        reward: "+80 XP",
        type: "Simulation",
        icon: Atom,
        color: "rose",
        link: "/gamification/physics-lab"
    }
]

const badges = [
    { name: "First Streak", img: "https://api.dicebear.com/7.x/shapes/svg?seed=streak" },
    { name: "No Hints Master", img: "https://api.dicebear.com/7.x/shapes/svg?seed=hint" },
    { name: "Math Whiz", img: "https://api.dicebear.com/7.x/shapes/svg?seed=math" },
    { name: "Fair Player", img: "https://api.dicebear.com/7.x/shapes/svg?seed=fair" },
]

export function GamificationTab() {
    const [statsData, setStatsData] = useState(stats);
    const [levelInfo, setLevelInfo] = useState({ level: 1, progress: 0, nextXp: 500 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/user/progress');
                const data = await res.json();
                
                // Update stats array
                setStatsData(prev => prev.map(s => {
                    if (s.id === "xp") return { ...s, value: data.xp.toLocaleString() };
                    if (s.id === "streak") return { ...s, value: `${data.streak} Days` };
                    if (s.id === "tokens") return { ...s, value: data.hintTokens.toString() };
                    if (s.id === "level") return { ...s, value: data.level.toString() };
                    return s;
                }));

                // Update Level Circle
                const xpForNextLevel = data.level * 500;
                const progress = (data.xp % 500) / 500 * 100;
                setLevelInfo({ level: data.level, progress, nextXp: 500 - (data.xp % 500) });

            } catch (err) {
                console.error("Failed to load progress", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 pb-10">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsData.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <h4 className="text-xl font-black text-slate-900">{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content (Adaptive Quizzes) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Recommended Challenges</h2>
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 italic">
                            <Brain className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">AI Powered</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activities.map((act, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer overflow-hidden transition-all hover:border-indigo-200"
                            >
                                <div className={`absolute top-0 left-0 w-2 h-full bg-${act.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-${act.color}-50 flex items-center justify-center text-${act.color}-600 group-hover:scale-110 transition-transform`}>
                                        <act.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest text-${act.color}-600`}>{act.type}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className="text-[10px] font-bold text-slate-400 capitalize">{act.reward}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{act.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium">{act.desc}</p>
                                    </div>
                                </div>

                                <Link href={act.link}>
                                    <button className={`px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 group-hover:bg-indigo-600 transition-all shadow-lg active:scale-95`}>
                                        Start Now <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Mistake Replay (Special Card) */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                        
                        <div className="relative z-10">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-6">
                                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] font-extrabold uppercase tracking-widest">Mistake Replay</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 tracking-tight">Adaptive Mastery Session</h3>
                            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed max-w-md">
                                "Spaced repetition active. We've compiled 12 questions from topics you struggled with last week. Master them to reclaim your integrity score."
                            </p>
                            <button className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                                Replay Mistakes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column (Badges & Progression) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Progression Visual */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Level Progression</h3>
                        <div className="relative w-40 h-40 mx-auto mb-8">
                             {/* Mock Progress Circle */}
                             <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" className="text-indigo-500" strokeLinecap="round" />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-slate-900">{levelInfo.level}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master</span>
                             </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-bold tracking-tight">
                                <span className="text-slate-400">NEXT: LEVEL {levelInfo.level + 1}</span>
                                <span className="text-indigo-600">{levelInfo.nextXp} XP LEFT</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${levelInfo.progress}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Badges Cabinet */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Badge Cabinet</h3>
                            <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">View All</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {badges.map((badge, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-white hover:border-indigo-100 hover:shadow-md cursor-pointer">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-4 ring-slate-100 group-hover:ring-indigo-50 transition-all">
                                        <img src={badge.img} alt={badge.name} className="w-full h-full" />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-600 text-center uppercase tracking-tighter">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
