"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Target, checkCircle2, XCircle, Zap, Flame, Timer, CheckCircle2, Trophy, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

const dailyQuestions = [
    {
        id: 1,
        question: "15% of 80 is equal to...",
        options: ["10", "12", "15", "8"],
        correct: 1,
        explanation: "10% is 8, 5% is 4. 8 + 4 = 12."
    },
    {
        id: 2,
        question: "Solve for x: 3x - 7 = 20",
        options: ["9", "8", "10", "13.5"],
        correct: 0,
        explanation: "3x = 27 -> x = 9."
    },
    {
        id: 3,
        question: "What is the next prime number after 13?",
        options: ["15", "16", "17", "19"],
        correct: 2,
        explanation: "14, 15, 16 are composite. 17 is prime."
    }
]

export default function DailyChallengePage() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "summary">("intro")
    const [currentQIndex, setCurrentQIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60) // Total time check
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

    const currentQuestion = dailyQuestions[currentQIndex]

    // Global Speed Timer
    useEffect(() => {
        if (gameState !== "playing") return
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState("summary")
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [gameState])

    const handleAnswer = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
        setIsAnswered(true)
        const isCorrect = index === currentQuestion.correct
        
        if (isCorrect) {
            setFeedback("correct")
            setScore(prev => prev + 100)
            toast.success("Speed Bonus! +100")
        } else {
            setFeedback("wrong")
            toast.error("Missed it!")
        }

        // Auto Advance for speed feel
        setTimeout(() => {
            if (currentQIndex < dailyQuestions.length - 1) {
                setCurrentQIndex(prev => prev + 1)
                setSelectedOption(null)
                setIsAnswered(false)
                setFeedback(null)
            } else {
                setGameState("summary")
            }
        }, 1200)
    }

    if (gameState === "intro") {
        return (
            <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-emerald-950 mb-2">Daily Sprint</h1>
                    <p className="text-emerald-700/60 font-medium mb-8">3 Questions. 60 Seconds. Go.</p>
                    <Button onClick={() => setGameState("playing")} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg">Start Run</Button>
                 </motion.div>
            </div>
        )
    }

    if (gameState === "summary") {
        return (
            <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
                 <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center">
                    <h1 className="text-3xl font-black text-emerald-950 mb-2">Run Complete</h1>
                    <div className="text-5xl font-black text-emerald-600 mb-2">{score} pts</div>
                    <p className="text-emerald-700/60 font-medium mb-8">Time remaining: {timeLeft}s</p>
                    <Link href="/dashboard">
                        <Button className="w-full h-14 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl font-bold">Back to Dashboard</Button>
                    </Link>
                 </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
             <div className="max-w-xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="w-5 h-5"/></Link>
                    <div className="flex items-center gap-2 font-black text-xl text-slate-900">
                        <Timer className="w-5 h-5 text-emerald-600" /> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </div>
                    <div className="font-bold text-slate-400">Q{currentQIndex+1}/{dailyQuestions.length}</div>
                </div>

                <motion.div key={currentQIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">{currentQuestion.question}</h2>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt, i) => (
                         <button
                            key={i}
                            disabled={isAnswered}
                            onClick={() => handleAnswer(i)}
                            className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${
                                isAnswered && i === currentQuestion.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                                isAnswered && i === selectedOption ? 'bg-red-50 border-red-500 text-red-700' :
                                'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
             </div>
        </div>
    )
}
