"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ArrowLeft, 
    Brain, 
    CheckCircle2, 
    XCircle, 
    Zap, 
    Trophy,
    ChevronRight,
    Heart,
    Timer,
    Sparkles,
    Snowflake, 
    Wand2,
    Flame,
    Infinity as InfinityIcon,
    Bot,
    Calculator,
    Lightbulb,
    X,
    MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// --- Mock Adaptive Question Bank with Concept Data ---
const questionBank = [
    {
        id: 1,
        difficulty: 1,
        topic: "Derivatives",
        question: "What is the derivative of f(x) = x²?",
        options: ["x", "2x", "2", "x²"],
        correct: 1, 
        explanation: "Power Rule: d/dx(x^n) = nx^(n-1). Here n=2, so 2x^(2-1) = 2x.",
        formula: "d/dx(xⁿ) = nxⁿ⁻¹"
    },
    {
        id: 2,
        difficulty: 1,
        topic: "Limits",
        question: "Evaluate lim(x→2) of (x + 3).",
        options: ["2", "3", "5", "Undefined"],
        correct: 2,
        explanation: "Direct Substitution: Replace x with 2. 2 + 3 = 5.",
        formula: "lim(x→a) f(x) = f(a) (if continuous)"
    },
    {
        id: 3,
        difficulty: 2,
        topic: "Integrals",
        question: "What is the integral of 1/x dx?",
        options: ["ln|x| + C", "x + C", "-1/x² + C", "e^x + C"],
        correct: 0,
        explanation: "The antiderivative of 1/x is ln|x|.",
        formula: "∫(1/x)dx = ln|x| + C"
    },
    {
        id: 4,
        difficulty: 2,
        topic: "Trig Derivatives",
        question: "If f(x) = sin(x), what is f'(x)?",
        options: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"],
        correct: 1,
        explanation: "Derivative of sin(x) is cos(x).",
        formula: "d/dx(sin x) = cos x"
    },
    {
        id: 5,
        difficulty: 3,
        topic: "Chain Rule",
        question: "Find the derivative of f(x) = e^(2x).",
        options: ["e^(2x)", "2e^(2x)", "2xe^(2x-1)", "e^x"],
        correct: 1,
        explanation: "Chain Rule: d/dx(e^u) = e^u * u'. u=2x, u'=2.",
        formula: "d/dx(f(g(x))) = f'(g(x)) * g'(x)"
    },
    {
        id: 6,
        difficulty: 3,
        topic: "Definite Integrals",
        question: "Evaluate ∫ 2x dx from 0 to 3.",
        options: ["6", "9", "3", "18"],
        correct: 1,
        explanation: "Power Rule: x². [3² - 0²] = 9 - 0 = 9.",
        formula: "∫ₐᵇ f(x)dx = F(b) - F(a)"
    }
]

export default function AdaptiveMathQuizPage() {
    const router = useRouter()
    
    // --- State ---
    const [gameState, setGameState] = useState<"intro" | "playing" | "summary" | "gameover">("intro")
    const [currentQIndex, setCurrentQIndex] = useState(0)
    
    // Stats
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [streak, setStreak] = useState(0)
    const [xpGained, setXpGained] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    
    // Powerups & Tools
    const [hints, setHints] = useState(2)
    const [freezes, setFreezes] = useState(1)
    const [aiCredits, setAiCredits] = useState(1)
    
    // Ephemeral State
    const [timeFrozen, setTimeFrozen] = useState(false)
    const [disabledOptions, setDisabledOptions] = useState<number[]>([])
    const [showFormula, setShowFormula] = useState(false)
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
    const [isAiLoading, setIsAiLoading] = useState(false)
    
    // Timer
    const [timeLeft, setTimeLeft] = useState(45) // Increased for "Pro" complexity
    
    // Answer State
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

    const currentQuestion = questionBank[currentQIndex]

    // --- Timer Logic ---
    useEffect(() => {
        if (gameState !== "playing" || isAnswered || timeFrozen) return
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeOut()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [gameState, isAnswered, timeFrozen])

    const handleTimeOut = () => {
        setIsAnswered(true)
        setFeedback("wrong")
        setStreak(0)
        setMultiplier(1)
        loseLife()
    }

    const loseLife = () => {
        setLives(prev => {
            if (prev <= 1) {
                setGameState("gameover")
                return 0
            }
            return prev - 1
        })
    }

    // --- Gameplay Logic ---
    const handleAnswer = (index: number) => {
        if (isAnswered) return
        
        setSelectedOption(index)
        setIsAnswered(true)

        const isCorrect = index === currentQuestion.correct
        
        if (isCorrect) {
            setFeedback("correct")
            const basePoints = 150 * currentQuestion.difficulty
            const timeBonus = Math.floor(timeLeft * 3)
            const streakBonus = streak * 50
            const totalPoints = (basePoints + timeBonus + streakBonus) * multiplier
            
            setScore(prev => prev + Math.floor(totalPoints)) 
            setStreak(prev => prev + 1)
            setMultiplier(prev => Math.min(prev + 0.5, 5)) // Cap at 5x
            setXpGained(prev => prev + Math.floor(totalPoints / 10))
            
            toast.success(`Correct! +${Math.floor(totalPoints)} pts`)
        } else {
            setFeedback("wrong")
            setStreak(0)
            setMultiplier(1)
            loseLife()
            if (lives > 1) toast.error("Wrong answer! Life lost.")
        }
    }

    // --- Tools & Powerups ---
    const useHint = () => {
        if (hints <= 0 || isAnswered || disabledOptions.length > 0) return
        setHints(prev => prev - 1)
        
        const wrongIndices = currentQuestion.options
            .map((_, i) => i)
            .filter(i => i !== currentQuestion.correct)
        
        const shuffled = wrongIndices.sort(() => 0.5 - Math.random())
        setDisabledOptions(shuffled.slice(0, 2))
        toast.info("Filter applied: 50% options removed.")
    }

    const useFreeze = () => {
        if (freezes <= 0 || isAnswered || timeFrozen) return
        setFreezes(prev => prev - 1)
        setTimeFrozen(true)
        toast.info("Temporal Field Activated: Timer Paused.")
    }

    const toggleFormula = () => {
        setShowFormula(!showFormula)
    }

    const askAI = () => {
        if (aiCredits <= 0 || isAnswered || aiAnalysis) return
        
        setAiCredits(prev => prev - 1)
        setIsAiLoading(true)
        
        // Simulate Stream
        setTimeout(() => {
            setIsAiLoading(false)
            setAiAnalysis(`💡 **AI Analysis**: This is a ${currentQuestion.topic} problem. 
            
Recall the formula for this concept. Look at the variable layout. 

*Hint*: Break it down step-by-step. You're looking for the rate of change.`)
        }, 1500)
    }

    const handleNext = () => {
        if (currentQIndex < questionBank.length - 1) {
            setCurrentQIndex(prev => prev + 1)
            resetQuestionState()
        } else {
            finishGame()
        }
    }

    const resetQuestionState = () => {
        setSelectedOption(null)
        setIsAnswered(false)
        setFeedback(null)
        setTimeLeft(45) 
        setDisabledOptions([])
        setTimeFrozen(false)
        setShowFormula(false)
        setAiAnalysis(null)
        setIsAiLoading(false)
    }

    const finishGame = async () => {
        setGameState("summary")
    }

    // --- RENDERERS ---

    // 1. INTRO
    if (gameState === "intro") {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-50" />
                
                 <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden relative z-10 flex flex-col md:flex-row"
                >
                    {/* Left Panel - Visuals */}
                    <div className="md:w-5/12 bg-slate-950 p-10 flex flex-col justify-between relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -mr-16 -mt-16" />
                         <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] -ml-10 -mb-10" />
                         
                         <div className="relative z-10">
                             <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                                 <InfinityIcon className="w-8 h-8 text-indigo-400" />
                             </div>
                             <h1 className="text-3xl font-black mb-2 text-white">
                                Math Mastery<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pro Level</span>
                             </h1>
                             <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                Advanced adaptive algorithms tailored to your calculus curriculum.
                             </p>
                         </div>

                         <div className="relative z-10 space-y-5 mt-12">
                             <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                 <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 
                                 </div>
                                 Topic: Derivatives & Limits
                             </div>
                             <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                 <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                 </div>
                                 Difficulty: Adaptive (1-5)
                             </div>
                             <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                 <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                 </div> 
                                 Tools: AI & Formulas Enabled
                             </div>
                         </div>
                    </div>

                    {/* Right Panel - Action */}
                    <div className="md:w-7/12 p-10 flex flex-col justify-center bg-white">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Mission Config</h2>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <span className="text-xs font-bold text-slate-400 uppercase">Current Streak</span>
                                <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> 0
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <span className="text-xs font-bold text-slate-400 uppercase">Available AI</span>
                                <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-indigo-500" /> 1 Credit
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setGameState("playing")}
                            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-lg font-bold shadow-lg transition-all hover:translate-y-[-2px]"
                        >
                            Initialize Session
                        </Button>
                        <p className="text-center text-xs text-slate-400 mt-4 font-medium">Session ID: #MATH-8829-X</p>
                    </div>
                 </motion.div>
            </div>
        )
    }

    // 2. SUMMARY (Simple for now)
    if (gameState === "summary" || gameState === "gameover") {
         return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                 <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-100"
                 >
                     <h2 className="text-3xl font-black mb-4">Results</h2>
                     <p className="text-4xl font-bold text-indigo-600 mb-8">{score} pts</p>
                     <Button onClick={() => window.location.reload()}>Play Again</Button>
                 </motion.div>
            </div>
         )
    }

    // 3. GAMEPLAY
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            
            {/* --- PRO HUD --- */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        
                        {/* Progress Nodes */}
                        <div className="hidden md:flex items-center gap-2">
                            {questionBank.map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        i === currentQIndex ? 'bg-indigo-600 scale-125 ring-4 ring-indigo-50' : 
                                        i < currentQIndex ? 'bg-emerald-500' : 'bg-slate-200'
                                    }`} />
                                    {i < questionBank.length - 1 && (
                                        <div className={`w-6 h-0.5 mx-1 ${i < currentQIndex ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Stats Group */}
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                            <div className="flex items-center gap-1.5">
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                                <span className="font-bold text-sm">{lives}</span>
                            </div>
                            <div className="w-px h-4 bg-slate-200" />
                            <div className="flex items-center gap-1.5">
                                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                <span className="font-bold text-sm">{streak}x</span>
                            </div>
                            <div className="w-px h-4 bg-slate-200" />
                            <div className="flex items-center gap-1.5">
                                <Trophy className="w-4 h-4 text-amber-500" />
                                <span className="font-bold text-sm">{score}</span>
                            </div>
                        </div>

                         {/* Timer Ring */}
                        <div className="relative w-10 h-10 flex items-center justify-center">
                             <svg className="w-full h-full transform -rotate-90">
                                <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3" fill="transparent" />
                                <motion.circle 
                                    cx="20" cy="20" r="16" 
                                    stroke={timeFrozen ? '#06b6d4' : timeLeft < 10 ? '#ef4444' : '#6366f1'} 
                                    strokeWidth="3" fill="transparent" strokeLinecap="round"
                                    strokeDasharray="100"
                                    strokeDashoffset={100 - ((timeLeft/45) * 100)}
                                    className="transition-all duration-1000"
                                />
                             </svg>
                             <span className="absolute text-[10px] font-bold">{timeLeft}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- MAIN SPLIT LAYOUT --- */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8">
                
                {/* LEFT COL: Question & Options (2/3) */}
                <div className="md:w-2/3 flex flex-col gap-6">
                    
                    {/* Question Card */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentQIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                            
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Brain className="w-3 h-3" /> {currentQuestion.topic}
                                </span>
                                <span className="text-slate-400 text-xs font-mono font-medium">ID: Q-{currentQuestion.id}092</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-8">
                                {currentQuestion.question}
                            </h2>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOption === idx
                                    const isCorrect = idx === currentQuestion.correct
                                    const isDisabled = disabledOptions.includes(idx)
                                    
                                    let statusClass = "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md"
                                    if (isAnswered) {
                                        if (isCorrect) statusClass = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500"
                                        else if (isSelected) statusClass = "border-rose-500 bg-rose-50 text-rose-900"
                                        else statusClass = "opacity-50 border-slate-100 bg-slate-50"
                                    }
                                    if (isDisabled) statusClass = "opacity-20 pointer-events-none grayscale bg-slate-50"

                                    return (
                                        <button
                                            key={idx}
                                            disabled={isAnswered || isDisabled}
                                            onClick={() => handleAnswer(idx)}
                                            className={`p-6 rounded-2xl border-2 text-lg font-medium transition-all duration-200 text-left flex items-center justify-between group ${statusClass}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                                                    isSelected || (isCorrect && isAnswered) ? 'border-current' : 'border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500'
                                                }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                {option}
                                            </div>
                                            {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                            {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                                        </button>
                                    )
                                })}
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    {/* Feedback & Continue */}
                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className={`rounded-2xl p-6 border ${feedback === 'correct' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className={`font-bold text-lg mb-1 ${feedback === 'correct' ? 'text-emerald-800' : 'text-rose-800'}`}>
                                            {feedback === 'correct' ? 'Remarkable!' : 'Needs Improvement'}
                                        </h4>
                                        <p className="text-sm text-slate-600 max-w-lg">
                                            {feedback === 'correct' ? "Your streak multiplier is increasing." : currentQuestion.explanation}
                                        </p>
                                    </div>
                                    <Button onClick={handleNext} className={`px-8 h-12 rounded-xl font-bold shadow-lg text-white ${feedback === 'correct' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT COL: Tools & Support (1/3) */}
                <div className="md:w-1/3 flex flex-col gap-6">
                    
                    {/* Tool Belt */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-fuchsia-50 rounded-bl-full -mr-4 -mt-4 opacity-50" />
                        
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                             <Zap className="w-3 h-3" /> Quantum Tools
                        </h3>
                        <div className="space-y-3 relative z-10">
                            <button 
                                onClick={useHint}
                                disabled={hints <= 0 || isAnswered}
                                className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all flex items-center justify-between group disabled:opacity-50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-fuchsia-500 group-hover:scale-110 transition-transform">
                                        <Wand2 className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-700 text-sm group-hover:text-fuchsia-700">50/50 Split</p>
                                        <p className="text-[10px] text-slate-400">Remove 2 options</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-white px-2 py-1 rounded-md border border-slate-100">{hints} left</span>
                            </button>

                            <button 
                                onClick={useFreeze}
                                disabled={freezes <= 0 || isAnswered || timeFrozen}
                                className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 transition-all flex items-center justify-between group disabled:opacity-50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-cyan-500 group-hover:scale-110 transition-transform">
                                        <Snowflake className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-700 text-sm group-hover:text-cyan-700">Time Freeze</p>
                                        <p className="text-[10px] text-slate-400">Pause timer</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-white px-2 py-1 rounded-md border border-slate-100">{freezes} left</span>
                            </button>
                        </div>
                    </div>

                    {/* Pro Features: Formula Card & AI */}
                    <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[30px] pointer-events-none" />
                        
                        <div className="relative z-10 space-y-5">
                            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                                 <Sparkles className="w-3 h-3" /> Intelligence Spt.
                            </h3>

                            {/* Formula Toggle */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm flex items-center gap-2">
                                        <Calculator className="w-4 h-4 text-emerald-400" /> Concept Card
                                    </span>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={toggleFormula}
                                        className="h-7 text-xs bg-transparent border-indigo-400 text-indigo-300 hover:bg-indigo-900 hover:text-white"
                                    >
                                        {showFormula ? 'Hide' : 'Reveal'}
                                    </Button>
                                </div>
                                {showFormula && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-xs text-slate-300 font-mono bg-black/30 p-2 rounded-lg border border-white/5"
                                    >
                                        {currentQuestion.formula}
                                    </motion.div>
                                )}
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 transition-colors hover:bg-white/10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm flex items-center gap-2">
                                        <Bot className="w-4 h-4 text-indigo-400" /> AI Assistant
                                    </span>
                                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">{aiCredits} Cr</span>
                                </div>
                                
                                {aiAnalysis ? (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20"
                                    >
                                        {aiAnalysis}
                                    </motion.div>
                                ) : (
                                    <Button 
                                        onClick={askAI}
                                        disabled={aiCredits <= 0 || isAiLoading}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-xs h-9 shadow-lg shadow-indigo-900/50 border border-indigo-500/50"
                                    >
                                        {isAiLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-white rounded-full animate-bounce" /> Analyzing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Lightbulb className="w-3 h-3" /> Request Hint
                                            </span>
                                        )}
                                    </Button>
                                )}
                            </div>

                        </div>
                    </div>

                </div>

            </main>
        </div>
    )
}
