import React from "react"
import { motion } from "framer-motion"
import { 
    Calendar as CalendarIcon, 
    Clock, 
    Video, 
    FileText, 
    Users, 
    ChevronRight,
    MapPin,
    AlertCircle
} from "lucide-react"

const scheduleItems = [
    { 
        id: 1, 
        time: "10:00 AM - 11:30 AM", 
        title: "Live Session: Physics Mechanics", 
        type: "Live Class", 
        instructor: "Dr. A. Smith",
        status: "upcoming", // upcoming, current, completed
        color: "rose",
        icon: Video
    },
    { 
        id: 2, 
        time: "02:00 PM - 03:00 PM", 
        title: "Calculus Homework Submission", 
        type: "Deadline", 
        instructor: "Module 3",
        status: "upcoming",
        color: "orange",
        icon: FileText
    },
    { 
        id: 3, 
        time: "04:30 PM - 05:30 PM", 
        title: "Group Study: Python Project", 
        type: "Meeting", 
        instructor: "Team Alpha",
        status: "upcoming",
        color: "blue",
        icon: Users
    },
]

const upcomingItems = [
     { day: "Tomorrow", date: "Oct 24", title: "Chemistry Lab Report", type: "Deadline", color: "orange" },
     { day: "Wednesday", date: "Oct 25", title: "History Seminar", type: "Live Class", color: "rose" },
     { day: "Thursday", date: "Oct 26", title: "Mid-Term Review", type: "Event", color: "emerald" },
]

const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
}

export function ScheduleTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Daily Agenda */}
            <div className="lg:col-span-2 space-y-8">
                 <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                             <h2 className="text-2xl font-bold text-slate-900">Today's Agenda</h2>
                             <p className="text-slate-500 font-medium">Tuesday, October 23, 2024</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                                <span className="sr-only">Previous Day</span>
                                <ChevronRight className="w-5 h-5 rotate-180" />
                             </button>
                             <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                                <span className="sr-only">Next Day</span>
                                <ChevronRight className="w-5 h-5" />
                             </button>
                        </div>
                    </div>

                    <div className="space-y-6 relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[88px] top-4 bottom-4 w-px bg-slate-100 hidden md:block" />

                        {scheduleItems.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row gap-6 relative group">
                                <div className="md:w-32 pt-3 text-right shrink-0">
                                    <p className="text-sm font-bold text-slate-900">{item.time.split('-')[0]}</p>
                                    <p className="text-xs font-medium text-slate-400">{item.time.split('-')[1]}</p>
                                </div>
                                
                                <div className="hidden md:block absolute left-[83px] top-3.5 w-3 h-3 rounded-full bg-white border-2 border-emerald-500 z-10 shadow-[0_0_0_4px_white]" />

                                <div className={`flex-1 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-${item.color}-200 transition-all group-hover:bg-${item.color}-50/10`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={`px-3 py-1 rounded-full bg-${item.color}-50 text-${item.color}-600 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5`}>
                                            <item.icon className="w-3 h-3" />
                                            {item.type}
                                        </div>
                                        {item.status === 'upcoming' && <AlertCircle className="w-4 h-4 text-slate-300" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" /> {item.instructor}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> 1h 30m
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                         {/* Free Time Block */}
                         <div className="flex flex-col md:flex-row gap-6 relative opacity-50">
                                <div className="md:w-32 pt-3 text-right shrink-0">
                                    <p className="text-sm font-bold text-slate-900">06:00 PM</p>
                                </div>
                                <div className="hidden md:block absolute left-[83px] top-3.5 w-3 h-3 rounded-full bg-slate-200 z-10 shadow-[0_0_0_4px_white]" />
                                <div className="flex-1 p-5 rounded-2xl border border-dashed border-slate-200">
                                     <p className="text-sm font-medium text-slate-400 text-center">Free Time / Self Study</p>
                                </div>
                        </div>

                    </div>
                 </motion.div>
            </div>

            {/* Right Column: Calendar & Upcoming */}
            <div className="space-y-8">
                 <motion.div variants={itemVariants} className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl shadow-slate-900/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">October 2024</h3>
                        <CalendarIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    {/* Simplified Visual Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-bold">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                         {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                             <div 
                                key={day} 
                                className={`h-8 w-8 flex items-center justify-center rounded-full ${
                                    day === 23 ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30' : 
                                    day === 24 || day === 26 ? 'text-white' : 
                                    'text-slate-500 hover:bg-slate-800 cursor-pointer'
                                }`}
                            >
                                {day}
                                {(day === 24 || day === 26) && <div className="absolute w-1 h-1 bg-rose-500 rounded-full mt-4" />}
                            </div>
                         ))}
                    </div>
                 </motion.div>

                 <motion.div variants={itemVariants} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h3 className="font-bold text-slate-900 mb-4">Up Next</h3>
                    <div className="space-y-4">
                        {upcomingItems.map((item, i) => (
                            <div key={i} className="flex gap-3 items-center group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.day.substr(0, 3)}</span>
                                    <span className="text-sm font-bold text-slate-900">{item.date.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.title}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md bg-${item.color}-50 text-${item.color}-600 inline-block mt-0.5`}>{item.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                 </motion.div>
            </div>
        </div>
    )
}
