"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ArrowLeft, 
    ChevronLeft, 
    ChevronRight, 
    CheckCircle2, 
    XCircle, 
    AlertTriangle, 
    MessageSquare, 
    Save, 
    Sparkles,
    FileText,
    Code,
    Maximize2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TeacherHeader } from "@/components/teacher-dashboard/header"

export default function GradingPage({ params }: { params: { id: string } }) {
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
    const [score, setScore] = useState(85)
    const [isAiAnalysisOpen, setIsAiAnalysisOpen] = useState(true)

    // Mock Data
    const students = [
        { id: 1, name: "Alice Johnson", status: "Submitted", submittedAt: "Oct 23, 2:30 PM", file: "ethics_essay_final.pdf" },
        { id: 2, name: "Bob Smith", status: "Submitted", submittedAt: "Oct 23, 4:15 PM", file: "ethics_case_study.docx" },
        { id: 3, name: "Charlie Brown", status: "Late", submittedAt: "Oct 25, 9:00 AM", file: "case_study_v2.pdf" },
    ]

    const student = students[currentStudentIndex]

    const handleNext = () => {
        if (currentStudentIndex < students.length - 1) setCurrentStudentIndex(prev => prev + 1)
    }

    const handlePrev = () => {
        if (currentStudentIndex > 0) setCurrentStudentIndex(prev => prev - 1)
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col overflow-hidden">
            
            {/* Condensed Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <Link href={`/teacher/assignments/${params.id}`} className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-[1px] bg-slate-200" />
                    <div>
                        <h1 className="text-sm font-bold text-slate-900">Ethics in AI: Case Study</h1>
                        <p className="text-xs text-slate-500 font-medium">{student.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handlePrev} 
                            disabled={currentStudentIndex === 0}
                            className="h-7 w-7 p-0 rounded-md"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-xs font-bold text-slate-600 min-w-[3rem] text-center">
                            {currentStudentIndex + 1} / {students.length}
                        </span>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleNext} 
                            disabled={currentStudentIndex === students.length - 1}
                            className="h-7 w-7 p-0 rounded-md"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                     </div>
                     <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 h-9 rounded-lg text-xs">
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Save Grade
                     </Button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Left Panel: Submission Viewer */}
                <div className="flex-1 bg-slate-100 p-6 overflow-auto flex items-center justify-center relative">
                    <div className="bg-white w-full h-full max-w-3xl rounded-xl shadow-sm border border-slate-200 p-12 overflow-y-auto">
                        {/* Mock Document Content */}
                        <div className="max-w-prose mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">The Ethical Implications of Autonomous Vehicles</h2>
                            <p className="text-slate-700 leading-relaxed">
                                The advent of autonomous vehicles (AVs) presents a myriad of ethical dilemmas that must be addressed before widespread adoption. One of the most cited examples is the "Trolley Problem," which questions how an AI should react in an unavoidable accident scenario.
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
                                <p className="text-amber-900 text-sm font-medium italic">
                                    <Sparkles className="w-3 h-3 inline mr-1" /> 
                                    AI Note: This paragraph bears highly similar structure to an existing article.
                                </p>
                            </div>
                            <p className="text-slate-700 leading-relaxed">
                                However, beyond the extreme scenarios, there are subtle ethical considerations regarding day-to-day decision making. For instance, should an AV prioritize the safety of its passengers over pedestrians in all cases? Utilitarian frameworks would suggest minimizing total harm, which might arguably lead to sacrificing the passenger in specific edge cases.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Furthermore, the data privacy of AV users is a significant concern. The continuous collection of location and behavioral data creates a surveillance capitalism ecosystem that threatens individual privacy rights.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                In conclusion, while AVs promise to reduce human error and traffic congestion, the moral algorithms governing them require transparent public discourse and regulation.
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-900/90 text-white p-1 rounded-lg backdrop-blur shadow-xl">
                         <Button variant="ghost" size="sm" className="h-8 w-8 hover:bg-white/20 text-white"><Maximize2 className="w-4 h-4" /></Button>
                         <div className="w-[1px] bg-white/20 h-4 my-auto" />
                         <span className="text-xs font-bold px-2 flex items-center">Page 1 of 1</span>
                    </div>
                </div>

                {/* Right Panel: Grading & Feedback */}
                <div className="w-[400px] bg-white border-l border-slate-200 flex flex-col">
                    <Tabs defaultValue="rubric" className="flex-1 flex flex-col">
                        <div className="px-4 pt-3">
                            <TabsList className="w-full bg-slate-100 rounded-lg p-1 grid grid-cols-2">
                                <TabsTrigger value="rubric" className="rounded-md font-bold text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Rubric & Score</TabsTrigger>
                                <TabsTrigger value="feedback" className="rounded-md font-bold text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Feedback</TabsTrigger>
                            </TabsList>
                        </div>
                        
                        <ScrollArea className="flex-1 p-6">
                            <TabsContent value="rubric" className="mt-0 space-y-8">
                                
                                {/* AI Insight Card */}
                                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
                                     <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-indigo-600" />
                                        <h3 className="font-bold text-indigo-900 text-sm">AI Analysis</h3>
                                     </div>
                                     <div className="space-y-2">
                                         <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-600">Relevance</span>
                                            <span className="text-emerald-600">High</span>
                                         </div>
                                         <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-600">Originality</span>
                                            <span className="text-amber-600">85% (Check highlights)</span>
                                         </div>
                                         <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-600">Grammar</span>
                                            <span className="text-emerald-600">Excellent</span>
                                         </div>
                                     </div>
                                </div>

                                {/* Score Input */}
                                <div className="space-y-4">
                                    <div className="flex items-end justify-between">
                                        <label className="text-sm font-bold text-slate-700">Total Score</label>
                                        <div className="flex items-end gap-1">
                                            <Input 
                                                type="number" 
                                                value={score} 
                                                onChange={(e) => setScore(Number(e.target.value))}
                                                className="w-20 text-right font-bold text-2xl h-12 border-slate-200 focus:ring-emerald-500/20" 
                                            />
                                            <span className="text-slate-400 font-bold mb-2">/ 100</span>
                                        </div>
                                    </div>
                                    <Slider 
                                        value={[score]} 
                                        max={100} 
                                        step={1} 
                                        onValueChange={(val) => setScore(val[0])}
                                        className="py-2"
                                    />
                                </div>

                                <Separator />

                                {/* Rubric Items */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-bold text-slate-700">Understanding of Topic</span>
                                            <span className="text-xs font-bold text-slate-400">28/30</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Demonstrates deep understanding of ethical frameworks.</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? "bg-emerald-500" : "bg-slate-100"}`} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-bold text-slate-700">Critical Analysis</span>
                                            <span className="text-xs font-bold text-slate-400">35/40</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Analysis of the trolley problem is somewhat generic.</p>
                                         <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? "bg-emerald-500" : "bg-slate-100"}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </TabsContent>
                            
                            <TabsContent value="feedback" className="mt-0 h-full">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-700">General Feedback</label>
                                    <Textarea 
                                        placeholder="Write your feedback here..." 
                                        className="min-h-[200px] bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none leading-relaxed"
                                    />
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Quick Comments</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["Great work!", "Check citation format", "Expand on this point", "Needs more evidence"].map((comment) => (
                                                <Badge key={comment} variant="outline" className="cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                                    + {comment}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}
