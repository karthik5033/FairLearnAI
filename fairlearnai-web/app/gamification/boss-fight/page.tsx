"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sparkles, Sword, ShieldAlert, Heart, HeartCrack, ChevronRight, Skull, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

const bossStages = [
    {
        id: 1,
        title: "The Limit Barrier",
        hp: 500,
        question: "Evaluate lim(x->0) (sin x)/x",
        options: ["0", "1", "Undefined", "Infinity"],
        correct: 1,
        damage: 250,
        color: "violet",
        bossVisual: "🛡️" // Simple emoji for now, replaceable with image
    },
    {
        id: 2,
        title: "The Derivative Core",
        hp: 1000,
        question: "Find f'(x) if f(x) = ln(x^2 + 1)",
        options: ["2x/(x^2+1)", "1/(x^2+1)", "2x", "x/(x^2+1)"],
        correct: 0,
        damage: 500,
        color: "rose",
        bossVisual: "👹"
    }
]

export default function BossFightPage() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "victory" | "defeat">("intro")
    const [stage, setStage] = useState(0)
    const [bossHp, setBossHp] = useState(bossStages[0].hp)
    const [maxBossHp, setMaxBossHp] = useState(bossStages[0].hp)
    const [playerHp, setPlayerHp] = useState(100)
    const [isAttacking, setIsAttacking] = useState(false)
    const [shake, setShake] = useState(false)
    const [combatLog, setCombatLog] = useState<string[]>([])

    const currentStage = bossStages[stage]

    const addLog = (msg: string) => {
        setCombatLog(prev => [msg, ...prev].slice(0, 3))
    }

    const handleAttack = (index: number) => {
        setIsAttacking(true)
        if (index === currentStage.correct) {
            // Player Attack Animation
            setShake(true)
            setTimeout(() => setShake(false), 300)

            setTimeout(() => {
                const dmg = currentStage.damage + Math.floor(Math.random() * 50)
                const newHp = bossHp - dmg
                setBossHp(newHp <= 0 ? 0 : newHp)
                addLog(`You dealt ${dmg} CRITICAL damage!`)
                
                if (newHp <= 0) {
                    if (stage < bossStages.length - 1) {
                         toast.success("Stage Clear! Boss Transforming...", { icon: '⚔️' })
                         setTimeout(() => {
                             setStage(prev => prev + 1)
                             setBossHp(bossStages[stage + 1].hp)
                             setMaxBossHp(bossStages[stage + 1].hp)
                             setIsAttacking(false)
                             addLog(`BOSS EVOLVED: ${bossStages[stage + 1].title}`)
                         }, 1500)
                    } else {
                        setGameState("victory")
                    }
                } else {
                    toast.success("Direct Hit!")
                    setIsAttacking(false)
                }
            }, 600)
        } else {
            // Player Miss / Boss Counter
            setTimeout(() => {
                const dmg = 35
                setPlayerHp(prev => prev - dmg)
                addLog(`Boss counter-attacked! -${dmg} HP`)
                toast.error("Missed! Boss strikes back.")
                setIsAttacking(false)
                if (playerHp - dmg <= 0) setGameState("defeat")
            }, 600)
        }
    }

    if (gameState === "intro") {
        return (
             <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
                 {/* Background Grid */}
                 <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                 
                 <motion.div 
                    initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                    animate={{ scale: 1, y: 0, opacity: 1 }} 
                    className="max-w-lg w-full bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 text-center relative z-10"
                >
                    <div className="w-28 h-28 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-violet-100 relative">
                         <div className="absolute inset-0 bg-violet-100 rounded-full animate-ping opacity-20" />
                        <Sword className="w-12 h-12 text-violet-600" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 text-slate-900 tracking-tight">BOSS RUSH MODE</h1>
                    <div className="flex justify-center gap-2 mb-8">
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full uppercase tracking-wider">Multi-Stage</span>
                        <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full uppercase tracking-wider">Hardcore</span>
                    </div>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Defeat the Calculus Guardians to unlock the next chapter. Wrong answers deal massive damage to your HP.
                    </p>
                    <Button 
                        onClick={() => setGameState("playing")} 
                        className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-violet-200 transition-all hover:scale-[1.02]"
                    >
                        Enter Arena
                    </Button>
                 </motion.div>
             </div>
        )
    }

    if (gameState === "victory") {
        return (
             <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center max-w-lg w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">VICTORY</h1>
                    <p className="text-xl text-slate-500 font-medium mb-8">Boss Defeated! +500 XP Gained.</p>
                    <Link href="/dashboard">
                        <Button className="w-full h-14 bg-slate-900 text-white font-bold rounded-xl shadow-lg">Return to Base</Button>
                    </Link>
                 </motion.div>
             </div>
        )
    }

    if (gameState === "defeat") {
        return (
             <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center max-w-lg w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-rose-100">
                    <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Skull className="w-12 h-12 text-rose-600" />
                    </div>
                    <h1 className="text-5xl font-black text-rose-900 mb-4 tracking-tighter">DEFEATED</h1>
                    <p className="text-xl text-rose-500 font-medium mb-8">The guardian was too strong.</p>
                    <Button onClick={() => window.location.reload()} className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200">Try Again</Button>
                 </motion.div>
             </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 w-full h-64 bg-slate-50 rounded-b-[3rem] -z-10" />

            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col p-4 md:p-8">
                
                {/* Header HUD */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                     <Link href="/dashboard" className="self-start md:self-auto p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-400"/>
                     </Link>
                     
                     <div className="flex-1 w-full max-w-2xl px-4">
                         <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                             <span>Boss HP // {currentStage.title}</span>
                             <span>{bossHp} / {maxBossHp}</span>
                         </div>
                         <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner relative">
                             {/* Damage Flash */}
                             <motion.div 
                                className="absolute top-0 right-0 h-full bg-white opacity-50 z-10"
                                initial={{ width: 0 }}
                                animate={{ width: shake ? "100%" : 0 }}
                             />
                             <motion.div 
                                className={`h-full ${currentStage.color === 'rose' ? 'bg-rose-500' : 'bg-violet-500'}`}
                                animate={{ width: `${(bossHp / maxBossHp) * 100}%` }}
                                transition={{ type: "spring", stiffness: 100 }}
                             />
                         </div>
                     </div>
                </header>

                <main className="flex-1 flex flex-col items-center relative z-0">
                    
                    {/* Boss Visual */}
                    <div className="relative mb-12 group">
                        <motion.div 
                            animate={shake ? { x: [-10, 10, -10, 10, 0], rotate: [0, -5, 5, -5, 5, 0] } : { y: [0, -10, 0] }}
                            transition={shake ? { duration: 0.4 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className={`w-48 h-48 md:w-64 md:h-64 bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center border-4 ${currentStage.color === 'rose' ? 'border-rose-100' : 'border-violet-100'} relative z-10`}
                        >
                            <span className="text-8xl filter drop-shadow-xl">{currentStage.bossVisual}</span>
                            
                            {/* Hit Effect Overlay */}
                            <AnimatePresence>
                                {shake && (
                                    <motion.div 
                                        initial={{ opacity: 1, scale: 1 }} 
                                        animate={{ opacity: 0, scale: 1.5 }} 
                                        className="absolute inset-0 bg-white rounded-[2.5rem]" 
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Boss Aura */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 ${currentStage.color === 'rose' ? 'bg-rose-500/10' : 'bg-violet-500/10'} rounded-full blur-3xl -z-10 animate-pulse`} />
                    </div>
                    
                    {/* Combat Log (Floating) */}
                    <div className="absolute top-0 right-0 hidden lg:block w-64 space-y-2 pointer-events-none">
                        <AnimatePresence>
                            {combatLog.map((log, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg text-right"
                                >
                                    {log}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Question Card */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        key={stage}
                        className="w-full max-w-3xl bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl text-center mb-8 relative"
                    >
                         <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-8">{currentStage.question}</h2>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentStage.options.map((opt, i) => (
                                <button
                                    key={i}
                                    disabled={isAttacking}
                                    onClick={() => handleAttack(i)}
                                    className="group relative p-6 bg-slate-50 hover:bg-white border-2 border-slate-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100 rounded-2xl font-bold text-lg md:text-xl transition-all duration-200 active:scale-[0.98] text-slate-600 hover:text-violet-700 overflow-hidden"
                                >
                                    <span className="relative z-10">{opt}</span>
                                    <div className="absolute inset-0 bg-violet-50 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                </main>

                {/* Player Stats Footer */}
                <footer className="fixed bottom-0 left-0 w-full p-4 md:p-6 pointer-events-none">
                    <div className="max-w-5xl mx-auto flex justify-center">
                        <motion.div 
                            animate={playerHp < 50 ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="bg-white border border-slate-200 shadow-2xl rounded-2xl px-8 py-4 flex items-center gap-4 pointer-events-auto"
                        >
                            <div className="relative">
                                <Heart className={`w-8 h-8 ${playerHp < 30 ? 'text-rose-500 animate-bounce' : 'text-rose-500'}`} fill="currentColor" />
                                <div className="absolute inset-0 blur-sm bg-rose-500/20 rounded-full" />
                            </div>
                            <div className="w-48">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    <span>Player Vitality</span>
                                    <span>{playerHp}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <motion.div 
                                        className={`h-full ${playerHp < 30 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                        animate={{ width: `${playerHp}%` }}
                                     />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
