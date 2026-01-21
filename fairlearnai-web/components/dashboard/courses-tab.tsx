import React, { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
    Play, 
    Clock, 
    Star, 
    MoreHorizontal,
    BookOpen,
    Code,
    Cpu,
    FlaskConical,
    BrainCircuit,
    X
} from "lucide-react"
import { QuizCreator } from "@/components/quiz/quiz-creator"
import { QuizCard } from "@/components/quiz/quiz-card"
import { Quiz } from "@/lib/ai/quiz-generator"

const courses = [
    { 
        id: 1, 
        title: "Advanced Calculus: Limits", 
        role: "Mathematics", 
        progress: 75, 
        totalModules: 12, 
        completedModules: 9,
        bg: "bg-emerald-50",
        icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
        color: "text-emerald-600"
    },
    { 
        id: 2, 
        title: "Intro to Python Programming", 
        role: "Computer Science", 
        progress: 45, 
        totalModules: 20, 
        completedModules: 9,
        bg: "bg-blue-50",
        icon: <Code className="w-6 h-6 text-blue-600" />,
        color: "text-blue-600"
    },
    { 
        id: 3, 
        title: "Organic Chemistry Basics", 
        role: "Science", 
        progress: 10, 
        totalModules: 15, 
        completedModules: 1,
        bg: "bg-purple-50",
        icon: <FlaskConical className="w-6 h-6 text-purple-600" />,
        color: "text-purple-600"
    },
     { 
        id: 4, 
        title: "Digital Logic Design", 
        role: "Engineering", 
        progress: 90, 
        totalModules: 10, 
        completedModules: 9,
        bg: "bg-orange-50",
        icon: <Cpu className="w-6 h-6 text-orange-600" />,
        color: "text-orange-600"
    }
]

const exploreCourses = [
     { 
        id: 5, 
        title: "Machine Learning A-Z", 
        modules: 42,
        rating: 4.9,
        students: "1.2k"
    },
    { 
        id: 6, 
        title: "Creative Writing Masterclass", 
        modules: 18,
        rating: 4.7,
        students: "850"
    },
    { 
        id: 7, 
        title: "History of Ancient Rome", 
        modules: 24,
        rating: 4.8,
        students: "2.1k"
    },
]

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export function CoursesTab() {
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const [showQuizCreator, setShowQuizCreator] = useState(false);

    return (
        <div className="space-y-8">

            {/* AI Practice Mode Section */}
            <motion.div variants={itemVariants} className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-4 backdrop-blur-sm">
                            <BrainCircuit className="w-3.5 h-3.5" /> AI Practice Mode
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-white">Challenge Your Knowledge</h2>
                        <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
                            Generate a custom quiz on any topic instantly. Test your skills, earn XP, and master your subjects with AI-powered questions.
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowQuizCreator(true)}
                        className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-black/10 hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        Create Practice Quiz
                    </button>
                </div>

                {/* Quiz Modal / Overlay */}
                <AnimatePresence>
                    {showQuizCreator && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full max-w-4xl h-[600px] flex gap-4"
                            >
                                <button 
                                    onClick={() => { setShowQuizCreator(false); setActiveQuiz(null); }}
                                    className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-2 font-medium"
                                >
                                    Close <div className="p-1 bg-white/10 rounded-full"><X className="w-4 h-4" /></div>
                                </button>

                                <div className="flex-1 h-full">
                                    {activeQuiz ? (
                                        <QuizCard 
                                            quiz={activeQuiz} 
                                            onReset={() => setActiveQuiz(null)} 
                                        />
                                    ) : (
                                        <QuizCreator 
                                            onQuizGenerated={(quiz) => setActiveQuiz(quiz)} 
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
            
            {/* My Courses Section */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">My Courses</h2>
                    <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all group relative overflow-hidden">
                             <div className={`absolute top-0 right-0 w-32 h-32 ${course.bg} rounded-bl-[4rem] opacity-50 transition-transform group-hover:scale-110`} />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${course.bg} flex items-center justify-center`}>
                                        {course.icon}
                                    </div>
                                    <button className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${course.color}`}>{course.role}</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{course.title}</h3>
                                    <p className="text-slate-500 text-xs font-medium">{course.completedModules} / {course.totalModules} Modules Completed</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000" 
                                            style={{ width: `${course.progress}%` }} 
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700">{course.progress}% Complete</span>
                                        <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                                           Continue <Play className="w-3 h-3 fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Explore Section */}
            <motion.div variants={itemVariants} className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Explore New Topics</h2>
                    <div className="flex gap-2">
                        {["Popular", "New", "Trending"].map((filter, i) => (
                             <button key={i} className={`px-3 py-1 text-xs font-bold rounded-full ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {exploreCourses.map((course) => (
                        <div key={course.id} className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-[2rem] border border-slate-200/60 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group">
                             <div className="flex justify-between items-start mb-10">
                                <div className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold border border-slate-100 shadow-sm text-slate-600">
                                    {course.modules} Modules
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                                </div>
                             </div>
                             
                             <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{course.title}</h4>
                             <p className="text-xs text-slate-500 font-medium mb-4">{course.students} students enrolled</p>
                             
                             <button className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all">
                                 View Syllabus
                             </button>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
