'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, List, Layers, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { toast } from 'sonner';

interface QuizCreatorProps {
    onQuizGenerated: (quizData: any) => void;
}

export function QuizCreator({ onQuizGenerated }: QuizCreatorProps) {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Intermediate');
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/ai/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, difficulty, count })
            });

            if (!response.ok) throw new Error("Failed to generate quiz");

            const data = await response.json();
            onQuizGenerated(data);
            toast.success("Quiz generated successfully!");

        } catch (error) {
            console.error(error);
            toast.error("Failed to create quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col justify-center">
            
            <div className="mb-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/20">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">AI Quiz Generator</h3>
                <p className="text-sm text-slate-500 font-medium">Create a custom practice test in seconds.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-indigo-500" /> Topic or Chapter
                    </label>
                    <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Calculus Limits, Photosynthesis, WW2"
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-indigo-500" /> Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`h-10 rounded-xl text-xs font-bold border transition-all ${
                                    difficulty === level 
                                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-700 ml-1 flex items-center gap-2">
                            <List className="w-3.5 h-3.5 text-indigo-500" /> Question Count
                        </label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{count} Qs</span>
                    </div>
                    <input 
                        type="range" 
                        min="3" 
                        max="10" 
                        value={count} 
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full accent-indigo-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between px-1">
                        <span className="text-[10px] font-bold text-slate-300">3</span>
                        <span className="text-[10px] font-bold text-slate-300">10</span>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" /> Generate Quiz
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
