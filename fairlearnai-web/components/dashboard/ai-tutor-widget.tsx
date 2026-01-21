'use client'

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, ChevronRight, Send, Loader2, RefreshCw, XCircle } from "lucide-react"
import { toast } from "sonner"

interface Message {
    role: 'user' | 'ai';
    content: string;
    label?: string;
    blocked?: boolean;
}

export function AITutorWidget() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: "Hello! I'm your FairLearn AI Tutor. How can I help you with your studies today?" }
    ])
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, loading])

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput("")
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setLoading(true)

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage })
            })

            const data = await response.json()

            if (data.blocked) {
                setMessages(prev => [...prev, { 
                    role: 'ai', 
                    content: data.answer, 
                    label: data.label,
                    blocked: true 
                }])
                toast.error("Safety Policy: This request was modified or blocked to ensure academic integrity.", {
                    description: data.reason
                })
            } else {
                setMessages(prev => [...prev, { 
                    role: 'ai', 
                    content: data.answer,
                    label: data.label
                }])
            }
        } catch (error) {
            console.error("Chat error:", error)
            toast.error("Failed to connect to the AI Tutor. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div 
            className="bg-white rounded-[2rem] border border-slate-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[400px]"
        >
            <div className="bg-slate-50 rounded-[1.5rem] p-4 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Tutor</p>
                            <p className="text-xs font-bold text-emerald-700">Online & Ready</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setMessages([{ role: 'ai', content: "Hello! I'm your FairLearn AI Tutor. How can I help you with your studies today?" }])}
                        className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
                >
                    <AnimatePresence initial={false}>
                        {messages.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                                    m.role === 'user' 
                                        ? 'bg-slate-900 text-white' 
                                        : m.blocked 
                                            ? 'bg-rose-50 border border-rose-100 text-rose-700'
                                            : 'bg-white border border-slate-100 text-slate-600'
                                }`}>
                                    {m.blocked && <XCircle className="w-3.5 h-3.5 mb-1 text-rose-500" />}
                                    {m.content}
                                    {m.label && (
                                        <div className={`mt-2 text-[8px] font-bold uppercase tracking-widest opacity-60 ${m.blocked ? 'text-rose-500' : 'text-slate-400'}`}>
                                            Type: {m.label}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
                                <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="p-2 gap-2 flex shrink-0">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a question..." 
                    disabled={loading}
                    className="flex-1 bg-white border border-slate-100 rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-all active:scale-90 disabled:opacity-50 disabled:bg-slate-400"
                >
                    <Send className="w-3.5 h-3.5" />
                </button>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </motion.div>
    )
}
