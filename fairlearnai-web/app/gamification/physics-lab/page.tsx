"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Atom, Activity, PlayCircle, RefreshCw, Target as TargetIcon, ChevronRight, Wind, BarChart2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

// --- Dynamic Simulation Data ---
const levels = [
    {
        id: 1,
        title: "Simulation 01: Standard Launch",
        description: "Calculate Range (R) for v₀ = 20 m/s at 45°.",
        variables: { theta: 45, v0: 20, g: 9.8 },
        options: ["40.8m", "20.4m", "35.2m", "50.1m"],
        correctIndex: 0,
        correctValue: 40.8,
        positionPercent: 80
    },
    {
        id: 2,
        title: "Simulation 02: High Velocity",
        description: "Calculate Range (R) for v₀ = 30 m/s at 30°.",
        variables: { theta: 30, v0: 30, g: 9.8 },
        options: ["79.5m", "91.8m", "45.9m", "110.2m"],
        correctIndex: 0,
        correctValue: 79.5, // (900 * sin(60)) / 9.8 = 79.53
        positionPercent: 90
    },
    {
        id: 3,
        title: "Simulation 03: Steep Arc",
        description: "Calculate Range (R) for v₀ = 25 m/s at 60°.",
        variables: { theta: 60, v0: 25, g: 9.8 },
        options: ["60.1m", "55.2m", "48.2m", "32.5m"],
        correctIndex: 1,
        correctValue: 55.2, // (625 * sin(120)) / 9.8 = 55.23
        positionPercent: 70
    },
    {
        id: 4,
        title: "Simulation 04: Low Gravity",
        description: "Moon Base: v₀ = 15 m/s at 45°, g = 1.6 m/s².",
        variables: { theta: 45, v0: 15, g: 1.6 },
        options: ["140.6m", "100.5m", "88.2m", "225.0m"],
        correctIndex: 0,
        correctValue: 140.6, // (225 * 1)/1.6 = 140.6
        positionPercent: 85
    },
    {
        id: 5,
        title: "Simulation 05: Precision Strike",
        description: "Target locked at 100m. If angle is 45°, find v₀.",
        variables: { theta: 45, v0: "?", g: 9.8 },
        options: ["31.3 m/s", "40.5 m/s", "22.1 m/s", "9.8 m/s"],
        correctIndex: 0,
        correctValue: 31.3, // v^2 = Rg -> v = sqrt(980) = 31.3
        positionPercent: 88
    }
]

export default function PhysicsLabPage() {
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [selected, setSelected] = useState<number | null>(null)
    const [simulationState, setSimulationState] = useState<"idle" | "running" | "hit" | "miss">("idle")
    const [score, setScore] = useState(0)
    
    // Physics State for Animation
    const currentLevel = levels[currentLevelIdx]

    const runSimulation = (idx: number) => {
        if (isRunning) return
        setSelected(idx)
        setIsRunning(true)
        setSimulationState("running")
        
        const isCorrect = idx === currentLevel.correctIndex
        
        setTimeout(() => {
            setIsRunning(false)
            setSimulationState(isCorrect ? "hit" : "miss")
            
            if (isCorrect) {
                 toast.success("Target Destroyed! Data Validated.")
                 setScore(prev => prev + 100)
            } else {
                toast.error("Trajectory Error! Simulation Failed.")
            }
        }, 2200) 
    }

    const nextLevel = () => {
        if (currentLevelIdx < levels.length - 1) {
            setCurrentLevelIdx(prev => prev + 1)
            resetSim()
        } else {
            toast.success("All Simulations Complete!")
        }
    }

    const resetSim = () => {
        setIsRunning(false)
        setSelected(null)
        setSimulationState("idle")
    }

    const getLandingPercent = () => {
        if (selected === null) return 0
        if (selected === currentLevel.correctIndex) {
            return currentLevel.positionPercent
        }
        return selected % 2 === 0 ? 40 : 95 // Random overshoot/undershoot
    }

    // Generate path for SVG trail based on current target scaling
    const generatePath = () => {
        const landingX = getLandingPercent() * 5 
        return `M 15 0 Q ${15 + (landingX * 3)} -250 ${15 + (landingX * 6)} 0`
    }

    const isLevelComplete = simulationState === "hit"

    return (
         <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 transition-colors duration-500">
             
             {/* Header */}
             <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-4">
                     <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-5 h-5"/>
                     </Link>
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl flex items-center justify-center border border-rose-200 shadow-sm">
                            <Atom className="w-6 h-6 text-rose-600" /> 
                         </div>
                         <div>
                             <h1 className="font-bold text-slate-800 tracking-wide text-lg leading-none">PHYSICS LAB</h1>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">SIM {currentLevelIdx + 1}/{levels.length}</span>
                                <span className="text-[10px] font-bold text-slate-400">SCORE: {score}</span>
                             </div>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                     <div className="hidden md:flex items-center gap-4 bg-slate-100/50 px-4 py-2 rounded-lg border border-slate-100">
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                             <Wind className="w-3 h-3" /> AIR: {currentLevel.id === 4 ? '0 (Vacuum)' : '0.02'}
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                             <BarChart2 className="w-3 h-3" /> FPS: 60
                         </div>
                     </div>
                     <Button variant="outline" size="icon" onClick={() => window.location.reload()} title="Reset All" className="rounded-xl">
                        <RefreshCw className="w-5 h-5 text-slate-500" />
                     </Button>
                 </div>
             </header>

             <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                 
                 {/* VIEWPORT (Left - 8 Cols) */}
                 <div className="lg:col-span-8 flex flex-col gap-6">
                     
                     {/* The Lab View */}
                     <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] overflow-hidden aspect-[16/9] relative group">
                         {/* World Backgrounds */}
                         <div className={`absolute inset-0 transition-colors duration-700 ${currentLevel.id === 4 ? 'bg-slate-900' : 'bg-transparent'}`} /> 
                         <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] transition-opacity duration-700 ${currentLevel.id === 4 ? 'opacity-10' : 'opacity-100'}`} />

                         {/* Moon Theme Extras */}
                         {currentLevel.id === 4 && (
                            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-slate-800 shadow-inner opacity-20" />
                         )}

                         {/* Floor */}
                         <div className={`absolute bottom-0 left-0 right-0 h-16 border-t transition-colors duration-700 ${currentLevel.id === 4 ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-t from-slate-50 to-white border-slate-100'}`} />
                         
                         {/* World Container */}
                         <div className="absolute inset-0 p-8 flex items-end overflow-visible">
                             
                             {/* Cannon Assembly */}
                             <div className="relative z-10 bottom-6 left-4">
                                 <motion.div 
                                    animate={{ rotate: -currentLevel.variables.theta as number }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-36 h-6 rounded-full origin-left shadow-xl border border-slate-400 absolute bottom-4 left-6 z-0 ${currentLevel.id === 4 ? 'bg-slate-700' : 'bg-slate-800'}`}
                                 />
                                 <div className={`w-16 h-16 rounded-full relative z-10 border-4 border-slate-200 shadow-sm ${currentLevel.id === 4 ? 'bg-slate-600' : 'bg-slate-700'}`} />
                             </div>

                             {/* Projectile (Animated) */}
                             {simulationState === 'running' && (
                                <motion.div 
                                    className={`absolute left-[4.5rem] bottom-[3.5rem] rounded-full shadow-lg z-30 border-2 border-white ${currentLevel.id === 4 ? 'bg-cyan-400' : 'bg-slate-900'}`}
                                    style={{ width: 16, height: 16 }}
                                    animate={{ 
                                        x: getLandingPercent() * (window.innerWidth < 768 ? 4 : 8), 
                                        y: [0, currentLevel.id === 4 ? -150 : -250, 0], // Moon gravity has lower arc peak visual logic for same range
                                    }}
                                    transition={{ duration: 2.2, ease: "linear", times: [0, 0.5, 1] }} 
                                />
                             )}

                             {/* Target */}
                             <div 
                                className="absolute bottom-[2.5rem] flex flex-col items-center justify-end z-10 transition-all duration-500"
                                style={{ left: `${currentLevel.positionPercent}%` }}
                             >
                                 <TargetIcon className={`w-12 h-12 ${simulationState === "hit" ? "text-emerald-500" : "text-rose-500"}`} strokeWidth={1.5} />
                                 <div className={`absolute -bottom-8 text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border shadow-sm ${currentLevel.id === 4 ? 'text-slate-900 border-slate-200' : 'text-slate-400 border-slate-100'}`}>
                                    TARGET: {currentLevel.correctValue}m
                                 </div>
                             </div>

                             {/* FX */}
                             <AnimatePresence>
                                {simulationState === "hit" && (
                                    <motion.div 
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 3, opacity: 0 }}
                                        className="absolute bottom-[2rem] w-20 h-20 bg-emerald-400/40 rounded-full blur-xl"
                                        style={{ left: `${currentLevel.positionPercent}%`, transform: 'translateX(-50%)' }}
                                    />
                                )}
                             </AnimatePresence>
                             
                         </div>

                         {/* Status Toasts Overlaid */}
                         <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
                             <AnimatePresence>
                                 {simulationState === "hit" && (
                                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
                                        <CheckCircle2 className="w-5 h-5" /> SIMULATION PASSED
                                    </motion.div>
                                 )}
                             </AnimatePresence>
                         </div>
                     </div>

                     {/* Data Indicators */}
                     <div className="grid grid-cols-3 gap-6">
                         <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Launch Angle</span>
                             <span className="text-2xl font-black font-mono text-slate-800 group-hover:text-rose-600 transition-colors">{currentLevel.variables.theta}°</span>
                         </div>
                         <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Initial Velocity</span>
                             <span className="text-2xl font-black font-mono text-slate-800 group-hover:text-rose-600 transition-colors">{currentLevel.variables.v0} {typeof currentLevel.variables.v0 === 'number' ? 'm/s' : ''}</span>
                         </div>
                         <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gravity</span>
                             <span className="text-2xl font-black font-mono text-slate-800 group-hover:text-rose-600 transition-colors">{currentLevel.variables.g} m/s²</span>
                         </div>
                     </div>
                 </div>

                 {/* CONTROLS (Right - 4 Cols) */}
                 <div className="lg:col-span-4 flex flex-col gap-6">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden transition-all h-full">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-orange-400" />
                         
                         <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{currentLevel.title}</h2>
                         <p className="text-slate-500 text-sm leading-relaxed mb-6 border-l-2 border-slate-200 pl-3">
                             {currentLevel.description}
                         </p>
                         
                         <div className="space-y-3 relative z-10">
                             {currentLevel.options.map((opt, i) => {
                                 const isSelected = selected === i
                                 const isDisabled = simulationState !== "idle"
                                 
                                 return (
                                     <button
                                        key={i}
                                        disabled={isDisabled}
                                        onClick={() => runSimulation(i)}
                                        className={`w-full group relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                            isSelected 
                                                ? 'border-rose-500 bg-rose-50 shadow-md scale-[1.02]' 
                                                : isDisabled 
                                                    ? 'border-slate-100 bg-slate-50 opacity-60 grayscale'
                                                    : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                                        }`}
                                     >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 block ${isSelected ? 'text-rose-600' : 'text-slate-400'}`}>Option {String.fromCharCode(65+i)}</span>
                                                <span className={`font-bold font-mono text-xl ${isSelected ? 'text-rose-900' : 'text-slate-700'}`}>{opt}</span>
                                            </div>
                                            
                                            {isSelected && simulationState === 'running' ? (
                                                <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
                                            ) : (
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-rose-500 bg-rose-500 text-white' : 'border-slate-200 text-slate-300 group-hover:border-slate-400 group-hover:text-slate-500'}`}>
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Progress Bar Loading Effect */}
                                        {isSelected && simulationState === "running" && (
                                            <motion.div 
                                                className="absolute bottom-0 left-0 h-1 bg-rose-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2.2, ease: "linear" }}
                                            />
                                        )}
                                     </button>
                                 )
                             })}
                         </div>

                         {/* NEXT LEVEL BUTTON */}
                         {isLevelComplete && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                                <Button onClick={nextLevel} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg">
                                    {currentLevelIdx < levels.length - 1 ? "Initialize Next Simulation" : "Complete Lab Report"}
                                </Button>
                            </motion.div>
                         )}
                     </div>
                 </div>

             </main>
         </div>
    )
}
