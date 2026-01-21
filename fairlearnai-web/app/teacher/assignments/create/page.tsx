"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ArrowLeft, 
    Calendar, 
    FileText, 
    Upload, 
    CheckCircle2,
    BookOpen,
    Sparkles,
    BrainCircuit,
    Loader2,
    X,
    FileType
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function CreateAssignmentPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [generatedQuiz, setGeneratedQuiz] = useState<any>(null)
    
    // Form States
    const [topic, setTopic] = useState("")
    const [difficulty, setDifficulty] = useState("Intermediate")
    const [materialText, setMaterialText] = useState("")
    
    // Common fields
    const [title, setTitle] = useState("")
    const [course, setCourse] = useState("CS 101: Intro to CS")
    const [dueDate, setDueDate] = useState("")
    const [description, setDescription] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Generator logic
    const handleGenerate = async (mode: 'topic' | 'material') => {
        setIsLoading(true);
        setGeneratedQuiz(null);

        try {
            const body: any = { count: 5 }; // Default 5 questions
            
            if (mode === 'topic') {
                if (!topic) { toast.error("Please enter a topic"); setIsLoading(false); return; }
                body.topic = topic;
                body.difficulty = difficulty;
            } else {
                if (!materialText) { toast.error("Please provide study material"); setIsLoading(false); return; }
                body.sourceText = materialText;
            }

            const res = await fetch('/api/ai/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setGeneratedQuiz(data);
            toast.success("Quiz generated successfully!");

        } catch (error) {
            console.error(error);
            toast.error("Failed to generate quiz");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileRead = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type === "text/plain" || file.name.endsWith(".md") || file.name.endsWith(".txt")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setMaterialText(event.target?.result as string);
                toast.success(`Loaded ${file.name}`);
            };
            reader.readAsText(file);
        } else {
            toast.error("Currently mostly text/markdown files are supported for instant parsing.");
        }
    };

    const handleFinalSave = async () => {
        setIsLoading(true);
        try {
            // Determine final payload
            const payload = {
                title: title || (topic ? `Quiz: ${topic}` : "New Assignment"),
                course: course,
                dueDate: dueDate || new Date().toISOString().split('T')[0],
                status: 'Active',
                quizData: generatedQuiz, // Can be null if manual
                description: description
            };

            const res = await fetch('/api/assignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success("Assignment Created!");
            router.push('/teacher/dashboard?tab=assignments');
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to create assignment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 relative">
            <TeacherHeader />

            <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
                <div className="mb-8">
                    <Link href="/teacher/dashboard?tab=assignments" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-sm mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Assignments
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Assignment</h1>
                    <p className="text-slate-500 font-medium">Use AI to generate a quiz or set up a manual project.</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-2">
                    <Tabs defaultValue="topic" className="w-full">
                        <div className="border-b border-slate-100 px-6 pt-4">
                            <TabsList className="bg-slate-100/50 p-1 rounded-xl gap-2">
                                <TabsTrigger value="topic" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 font-bold text-slate-600">
                                    <Sparkles className="w-4 h-4 mr-2 text-indigo-500" /> AI By Topic
                                </TabsTrigger>
                                <TabsTrigger value="material" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 font-bold text-slate-600">
                                    <BookOpen className="w-4 h-4 mr-2 text-emerald-500" /> AI From Material
                                </TabsTrigger>
                                <TabsTrigger value="manual" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 font-bold text-slate-600">
                                    <FileText className="w-4 h-4 mr-2 text-slate-500" /> Manual Setup
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* TAB 1: TOPIC GENERATOR */}
                        <TabsContent value="topic" className="p-6 md:p-8 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-base font-bold text-slate-700">Topic or Subject</Label>
                                        <Input 
                                            placeholder="e.g. Calculus Limits, Roman History, Molecular Bio..." 
                                            className="h-12 rounded-xl text-lg"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-base font-bold text-slate-700">Difficulty Level</Label>
                                        <Select value={difficulty} onValueChange={setDifficulty}>
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Beginner">Beginner (Foundations)</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate (Standard)</SelectItem>
                                                <SelectItem value="Advanced">Advanced (Challenge)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button 
                                        size="lg" 
                                        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200"
                                        onClick={() => handleGenerate('topic')}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                                        Generate Quiz
                                    </Button>
                                </div>

                                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                                    {!generatedQuiz ? (
                                        <div className="text-center text-slate-400">
                                            <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="font-medium">Enter a topic to preview <br/> AI generation here.</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full overflow-y-auto max-h-[400px] pr-2">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-lg text-indigo-700">Generated Preview</h3>
                                                <span className="text-xs font-bold px-2 py-1 bg-white rounded border">{generatedQuiz.questions.length} Qs</span>
                                            </div>
                                            <div className="space-y-3">
                                                {generatedQuiz.questions.map((q: any, i: number) => (
                                                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-sm shadow-sm">
                                                        <p className="font-bold text-slate-800 mb-2">{i+1}. {q.question}</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {q.options.map((opt: string, j: number) => (
                                                                <div key={j} className={`p-2 rounded border text-xs ${j === q.correctAnswerIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                                                    {opt}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button onClick={handleFinalSave} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                                                Confirm & Create Assignment
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* TAB 2: MATERIAL GENERATOR */}
                        <TabsContent value="material" className="p-6 md:p-8 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                                        <input type="file" ref={fileInputRef} className="hidden" accept=".txt,.md,.json" onChange={handleFileRead} />
                                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="font-bold text-slate-900">Upload Study Material</p>
                                        <p className="text-xs text-slate-500 mt-1">Supports .txt, .md (Max 10MB)</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-slate-500 font-bold">Or paste text</span>
                                        </div>
                                    </div>

                                    <Textarea 
                                        placeholder="Paste article, notes, or chapter content here..." 
                                        className="min-h-[200px] rounded-xl border-slate-200 focus:ring-emerald-500/20 font-mono text-xs leading-relaxed"
                                        value={materialText}
                                        onChange={(e) => setMaterialText(e.target.value)}
                                    />
                                    
                                    <Button 
                                        size="lg" 
                                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-200"
                                        onClick={() => handleGenerate('material')}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <BrainCircuit className="w-5 h-5 mr-2" />}
                                        Analyze & Generate Quiz
                                    </Button>
                                </div>

                                {/* Preview Section (Reused) */}
                                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                                     {!generatedQuiz ? (
                                        <div className="text-center text-slate-400">
                                            <FileType className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="font-medium">Upload content to generate <br/> a context-aware quiz.</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full overflow-y-auto max-h-[400px] pr-2">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-lg text-emerald-700">Material Analysis Result</h3>
                                                <span className="text-xs font-bold px-2 py-1 bg-white rounded border">{generatedQuiz.questions.length} Qs</span>
                                            </div>
                                            <div className="space-y-3">
                                                {generatedQuiz.questions.map((q: any, i: number) => (
                                                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-sm shadow-sm">
                                                        <p className="font-bold text-slate-800 mb-2">{i+1}. {q.question}</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {q.options.map((opt: string, j: number) => (
                                                                <div key={j} className={`p-2 rounded border text-xs ${j === q.correctAnswerIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                                                    {opt}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                             <Button onClick={handleFinalSave} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                                                Confirm & Create Assignment
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* TAB 3: MANUAL SETUP */}
                        <TabsContent value="manual" className="p-6 md:p-8">
                             <div className="max-w-2xl mx-auto space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base font-bold text-slate-700">Assignment Title</Label>
                                    <Input 
                                        placeholder="Enter title" 
                                        className="rounded-xl" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-bold text-slate-700">Course</Label>
                                    <Select value={course} onValueChange={setCourse}>
                                            <SelectTrigger className="rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CS 305: Ethics">CS 305: Ethics</SelectItem>
                                                <SelectItem value="CS 410: Deep Learning">CS 410: Deep Learning</SelectItem>
                                                <SelectItem value="CS 101: Intro to CS">CS 101: Intro to CS</SelectItem>
                                            </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-bold text-slate-700">Description</Label>
                                    <Textarea 
                                        placeholder="Instructions..." 
                                        className="rounded-xl min-h-[100px]"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-bold text-slate-700">Due Date</Label>
                                    <Input 
                                        type="date" 
                                        className="rounded-xl"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full rounded-xl bg-slate-900 text-white font-bold h-12" onClick={handleFinalSave} disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Create Manually"}
                                </Button>
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
