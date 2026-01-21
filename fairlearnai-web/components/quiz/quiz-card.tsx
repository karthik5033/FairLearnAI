'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RefreshCw, HelpCircle } from 'lucide-react';
import { Quiz } from '@/lib/ai/quiz-generator';

interface QuizCardProps {
    quiz: Quiz;
    onReset: () => void;
}

export function QuizCard({ quiz, onReset }: QuizCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    const [xpGained, setXpGained] = useState(0);

    const question = quiz.questions[currentIndex];

    // Auto-save result on finish
    const finishQuiz = async (finalScore: number) => {
        try {
            const res = await fetch('/api/user/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    topic: quiz.topic, 
                    score: finalScore, 
                    total: quiz.questions.length 
                })
            });
            const data = await res.json();
            if (data.success) {
                setXpGained(data.xpGained);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === question.correctAnswerIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < quiz.questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowSummary(true);
            finishQuiz(score + (selectedOption === question.correctAnswerIndex ? 1 : 0));
        }
    };

    if (showSummary) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col items-center justify-center text-center"
            >
                <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 font-medium mb-4">You scored <span className="text-indigo-600 font-bold text-xl">{score}</span> out of <span className="text-slate-900 font-bold text-xl">{quiz.questions.length}</span></p>

                {xpGained > 0 && (
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className="mb-8 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-600 font-bold text-sm flex items-center gap-2"
                    >
                        <Trophy className="w-4 h-4 fill-amber-600" /> +{xpGained} XP Earned
                    </motion.div>
                )}

                <div className="w-full max-w-xs bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / quiz.questions.length) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    />
                </div>

                <button 
                    onClick={onReset}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                >
                    <RefreshCw className="w-4 h-4" /> Try Another Quiz
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{quiz.topic}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 capitalize">{quiz.difficulty}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-xs font-bold text-indigo-600">Question {currentIndex + 1}/{quiz.questions.length}</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100">
                    {score}
                </div>
            </div>

            {/* Question */}
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-6">
                            {question.question}
                        </h2>

                        <div className="space-y-3">
                            {question.options.map((option, idx) => {
                                const isSelected = selectedOption === idx;
                                const isCorrect = idx === question.correctAnswerIndex;
                                const showResult = isAnswered;

                                let borderClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                                let bgClass = "bg-white";
                                let icon = null;

                                if (showResult) {
                                    if (isSelected && isCorrect) {
                                        borderClass = "border-emerald-500 ring-1 ring-emerald-500";
                                        bgClass = "bg-emerald-50";
                                        icon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
                                    } else if (isSelected && !isCorrect) {
                                        borderClass = "border-rose-500 ring-1 ring-rose-500";
                                        bgClass = "bg-rose-50";
                                        icon = <XCircle className="w-5 h-5 text-rose-600" />;
                                    } else if (!isSelected && isCorrect) {
                                        borderClass = "border-emerald-200 active-correct"; // Highlight correct answer
                                        bgClass = "bg-emerald-50/50";
                                        icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 opacity-50" />;
                                    } else {
                                        borderClass = "border-slate-100 opacity-50";
                                    }
                                } else if (isSelected) {
                                    borderClass = "border-indigo-500 ring-1 ring-indigo-500";
                                    bgClass = "bg-indigo-50";
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(idx)}
                                        disabled={isAnswered}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all relative flex items-center justify-between group ${borderClass} ${bgClass}`}
                                    >
                                        <span className={`font-medium ${showResult && isSelected && !isCorrect ? 'text-rose-900' : 'text-slate-700'}`}>
                                            {option}
                                        </span>
                                        {icon}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Explanation */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600 overflow-hidden"
                        >
                            <div className="flex gap-2">
                                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                <p><span className="font-bold text-slate-900">Explanation:</span> {question.explanation}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]"
                >
                    {currentIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
