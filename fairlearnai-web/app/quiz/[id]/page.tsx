"use client"

import React, { useState, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ChevronRight, 
    ChevronLeft, 
    CheckCircle2, 
    AlertCircle, 
    Clock, 
    Flag,
    HelpCircle,
    X,
    Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

// LaTeX Rendering Support (Basic)
// For a production app, use 'react-latex-next' or similar. 
// For now, we'll try to display it cleanly or rely on browser support if handled.
const LatexRenderer = ({ text }: { text: string }) => {
    // Simple replacement for now to make reading easier if no library is installed
    return (
        <span dangerouslySetInnerHTML={{ 
            __html: text
                .replace(/\\\(/g, '<span class="font-serif italic">')
                .replace(/\\\)/g, '</span>')
                .replace(/\\\\/g, '') 
        }} />
    )
}

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> optionIndex
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const res = await fetch(`/api/assignments/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setAssignment(data);
                } else {
                    toast.error("Failed to load quiz");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error loading quiz");
            } finally {
                setLoading(false);
            }
        };
        fetchAssignment();
    }, [id]);

    // Timer Effect
    useEffect(() => {
        if (!quizStarted || showResults) return;
        
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizStarted, showResults]);

    const handleAnswerSelect = (optionIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: optionIndex
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < (assignment?.quizData?.questions?.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!assignment?.quizData?.questions) return;
        
        // Calculate Score
        let calculatedScore = 0;
        assignment.quizData.questions.forEach((q: any, idx: number) => {
            if (answers[idx] === q.correctAnswerIndex) {
                calculatedScore++;
            }
        });
        
        setScore(calculatedScore);
        setShowResults(true);

        // Submit to API
        try {
            await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: assignment.quizData.topic,
                    score: calculatedScore,
                    total: assignment.quizData.questions.length,
                    assignmentId: id
                })
            });
            toast.success("Quiz submitted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save results");
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
                <h2 className="text-xl font-bold text-slate-800">Quiz not found</h2>
                <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const questions = assignment.quizData?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // --- Intro Screen ---
    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
                 
                 <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white max-w-lg w-full rounded-[2rem] shadow-xl border border-slate-100 p-8 text-center relative z-10"
                >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                        <Flag className="w-8 h-8" />
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{assignment.title}</h1>
                    <p className="text-slate-500 font-medium mb-8">
                        {questions.length} Questions • {assignment.quizData?.difficulty} • 15 Minutes
                    </p>

                    <div className="space-y-4 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                        <h3 className="font-bold text-slate-900 mb-2">Instructions</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Answer all questions to the best of your ability.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>You can navigate back and forth between questions.</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Results will be calculated immediately after submission.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-3">
                         <Link href="/dashboard" className="flex-1">
                            <Button variant="outline" className="w-full h-12 rounded-xl font-bold">Cancel</Button>
                        </Link>
                        <Button 
                            className="flex-1 h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                            onClick={() => setQuizStarted(true)}
                        >
                            Start Quiz
                        </Button>
                    </div>
                 </motion.div>
            </div>
        )
    }

    // --- Results Screen ---
    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
                 <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
                 
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white max-w-md w-full rounded-[2rem] shadow-xl border border-slate-100 p-8 text-center relative z-10"
                >
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
                        <Trophy className="w-10 h-10 fill-current" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Quiz Completed!</h2>
                    <p className="text-slate-500 mb-8">You scored {score} out of {questions.length}</p>

                    <div className="mb-8">
                         <div className="text-5xl font-extrabold text-slate-900 mb-2">{percentage}%</div>
                         <Progress value={percentage} className="h-3 rounded-full bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                         <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                            <p className="text-xs font-bold text-emerald-600 uppercase">Correct</p>
                            <p className="text-2xl font-bold text-emerald-700">{score}</p>
                         </div>
                         <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                            <p className="text-xs font-bold text-rose-600 uppercase">Incorrect</p>
                            <p className="text-2xl font-bold text-rose-700">{questions.length - score}</p>
                         </div>
                    </div>

                    <Link href="/dashboard">
                        <Button className="w-full h-12 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800">
                            Back to Dashboard
                        </Button>
                    </Link>
                 </motion.div>
            </div>
        )
    }

    // --- Quiz Interface ---
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                                <X className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="font-bold text-sm text-slate-900">{assignment.title}</h1>
                            <p className="text-xs text-slate-500 font-medium">{assignment.course}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
                            timeRemaining < 60 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600'
                        }`}>
                            <Clock className="w-4 h-4" />
                            {formatTime(timeRemaining)}
                        </div>
                    </div>
                </div>
                <Progress value={progress} className="h-1 bg-slate-100 rounded-none [&>div]:bg-emerald-500 transition-all duration-500" />
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                {assignment.quizData.topic}
                            </span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                            <LatexRenderer text={currentQuestion.question} />
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option: string, idx: number) => {
                                const isSelected = answers[currentQuestionIndex] === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all relative group ${
                                            isSelected 
                                                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-sm' 
                                                : 'border-slate-100 bg-white hover:border-slate-300 text-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                                                isSelected
                                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                                    : 'border-slate-200 text-slate-400 group-hover:border-slate-300'
                                            }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="font-medium text-sm md:text-base">
                                                <LatexRenderer text={option} />
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                                                <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                    <Button 
                        variant="ghost" 
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="text-slate-500 hover:text-slate-900 font-bold"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    
                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button 
                            className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 font-bold shadow-lg shadow-slate-900/20"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </Button>
                    ) : (
                        <Button 
                            className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl px-8 font-bold shadow-lg shadow-emerald-600/20"
                            onClick={handleNext}
                        >
                            Next Question <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </main>
        </div>
    )
}
