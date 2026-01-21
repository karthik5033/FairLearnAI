"use client"

import React, { useState, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    Calendar, 
    FileText, 
    Upload, 
    CheckCircle2,
    BookOpen,
    Save
} from "lucide-react"
import Link from "next/link"
import { TeacherHeader } from "@/components/teacher-dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditAssignmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    // Mock existing data
    const [formData, setFormData] = useState({
        title: "",
        course: "",
        description: "",
        dueDate: "",
        points: "100"
    })

    useEffect(() => {
        if (!id || id.startsWith('mock-')) return;
        const fetchIt = async () => {
            const res = await fetch(`/api/assignments/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    title: data.title || "",
                    course: data.course?.split(":")[0].trim().toLowerCase().replace(" ", "") || "",
                    description: data.description || "",
                    dueDate: data.dueDate || "",
                    points: "100" // DB doesn't have points yet
                });
            }
        };
        fetchIt();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, course: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Redirect back to assignment details
            router.push(`/teacher/assignments/${id}`)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

            <TeacherHeader />

            <motion.main 
                className="max-w-4xl mx-auto px-6 pt-32 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <Link href={`/teacher/assignments/${id}`} className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-sm mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Assignment
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Assignment</h1>
                    <p className="text-slate-500 font-medium">Update assignment details and settings.</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                Assignment Details
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700 font-bold">Assignment Title</Label>
                                    <Input 
                                        id="title" 
                                        value={formData.title} 
                                        onChange={handleChange}
                                        placeholder="e.g. Ethics in AI Case Study" 
                                        className="rounded-xl border-slate-200 focus:ring-emerald-500/20" 
                                        required 
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="course" className="text-slate-700 font-bold">Course</Label>
                                    <Select value={formData.course} onValueChange={handleSelectChange}>
                                        <SelectTrigger className="rounded-xl border-slate-200 focus:ring-emerald-500/20">
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                                            <SelectItem value="cs305">CS 305: Ethics</SelectItem>
                                            <SelectItem value="cs410">CS 410: Deep Learning</SelectItem>
                                            <SelectItem value="cs101">CS 101: Intro to CS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-700 font-bold">Description & Instructions</Label>
                                <Textarea 
                                    id="description" 
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Provide detailed instructions for the assignment..." 
                                    className="min-h-[150px] rounded-xl border-slate-200 focus:ring-emerald-500/20 resize-none leading-relaxed" 
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Calendar className="w-5 h-5 text-emerald-600" />
                                Schedule & Settings
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="dueDate" className="text-slate-700 font-bold">Due Date</Label>
                                    <Input 
                                        id="dueDate" 
                                        type="date" 
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200 focus:ring-emerald-500/20 w-full block" 
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="points" className="text-slate-700 font-bold">Total Points</Label>
                                    <Input 
                                        id="points" 
                                        type="number" 
                                        value={formData.points}
                                        onChange={handleChange}
                                        placeholder="100" 
                                        className="rounded-xl border-slate-200 focus:ring-emerald-500/20" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Upload className="w-5 h-5 text-emerald-600" />
                                Resources
                            </h2>
                            
                            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4">
                                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-rose-500 shadow-sm">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900">CaseStudy.pdf</p>
                                    <p className="text-xs text-slate-500">2.4 MB • Uploaded 2 days ago</p>
                                </div>
                                <Button type="button" variant="ghost" size="sm" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50">
                                    Remove
                                </Button>
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-200 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-2 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900">Upload more files</p>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-4">
                            <Link href={`/teacher/assignments/${id}`}>
                                <Button type="button" variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 min-w-[150px]" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Saving...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </span>
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </motion.main>
        </div>
    )
}
