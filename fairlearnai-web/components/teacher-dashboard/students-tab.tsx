"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
    Search, 
    MoreHorizontal, 
    Filter, 
    ArrowUpDown, 
    CheckCircle2, 
    AlertTriangle,
    Flag,
    Shield,
    Mail,
    FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import Link from "next/link"

const statsVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    }
}

// Mock Data
const students = [
    { id: 1, name: "Alice Johnson", email: "alice.j@uni.edu", status: "Active", risk: "Low", assignments: 12, avgScore: 92, lastActive: "2 mins ago", avatar: "AJ" },
    { id: 2, name: "Bob Smith", email: "bob.smith@uni.edu", status: "Active", risk: "Medium", assignments: 11, avgScore: 78, lastActive: "1 hour ago", avatar: "BS" },
    { id: 3, name: "Charlie Brown", email: "charlie.b@uni.edu", status: "Inactive", risk: "High", assignments: 8, avgScore: 65, lastActive: "3 days ago", avatar: "CB" },
    { id: 4, name: "Diana Prince", email: "diana.p@uni.edu", status: "Active", risk: "Low", assignments: 12, avgScore: 98, lastActive: "5 mins ago", avatar: "DP" },
    { id: 5, name: "Evan Wright", email: "evan.w@uni.edu", status: "Active", risk: "Low", assignments: 12, avgScore: 88, lastActive: "1 day ago", avatar: "EW" },
    { id: 6, name: "Fiona Gallagher", email: "fiona.g@uni.edu", status: "Warning", risk: "High", assignments: 9, avgScore: 72, lastActive: "4 hours ago", avatar: "FG" },
]

export function TeacherStudentsTab() {
    const [searchTerm, setSearchTerm] = useState("")
    
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-6"
        >
             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Students", value: "28", icon: Users, change: "+2 this week", color: "text-blue-500 bg-blue-50" },
                    { label: "At Risk", value: "3", icon: AlertTriangle, change: "Requires attention", color: "text-rose-500 bg-rose-50" },
                    { label: "Avg. Engagement", value: "88%", icon: Activity, change: "+5% vs last month", color: "text-emerald-500 bg-emerald-50" },
                ].map((stat, i) => (
                    <motion.div variants={statsVariants} key={i} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex items-center justify-between">
                         <div>
                            <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-extrabold text-slate-900">{stat.value}</h3>
                            <span className="text-xs font-bold text-slate-400 mt-2 inline-block">{stat.change}</span>
                         </div>
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                            {React.createElement(stat.icon, { className: "w-6 h-6" })}
                         </div>
                    </motion.div>
                ))}
             </div>

            {/* Main Table Card */}
            <motion.div variants={statsVariants} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Student Directory</h2>
                        <p className="text-sm text-slate-500 font-medium">Manage enrollment and monitor progress.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search students..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full md:w-64"
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold">
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                         <Link href="/teacher/students/add">
                             <Button className="rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800">
                                 Add Student
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="w-[300px] pl-6 font-bold text-slate-900">Student</TableHead>
                                <TableHead className="font-bold text-slate-900">Status</TableHead>
                                <TableHead className="font-bold text-slate-900">Risk Level</TableHead>
                                <TableHead className="font-bold text-slate-900 text-center">Avg. Score</TableHead>
                                <TableHead className="font-bold text-slate-900">Last Active</TableHead>
                                <TableHead className="text-right pr-6 font-bold text-slate-900">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id} className="hover:bg-slate-50/50 border-slate-100">
                                    <TableCell className="pl-6 py-4">

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                                                {student.avatar}
                                            </div>
                                            <div>
                                                <Link href={`/teacher/students/${student.id}`}>
                                                    <p className="font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer">{student.name}</p>
                                                </Link>
                                                <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                            ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                                              student.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                              'bg-slate-50 text-slate-600 border-slate-200'}
                                        `}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                         <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full 
                                                ${student.risk === 'Low' ? 'bg-emerald-500' : 
                                                  student.risk === 'Medium' ? 'bg-amber-500' : 
                                                  'bg-rose-500'}
                                            `}/>
                                            <span className="text-sm font-medium text-slate-700">{student.risk}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-900">
                                        {student.avgScore}%
                                    </TableCell>
                                    <TableCell className="text-slate-500 font-medium text-sm">
                                        {student.lastActive}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
                                              <span className="sr-only">Open menu</span>
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <Link href={`/teacher/students/${student.id}`}>
                                                <DropdownMenuItem className="gap-2 font-medium cursor-pointer">
                                                    <FileText className="w-4 h-4 text-slate-400" /> View Profile
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className="gap-2 font-medium">
                                                <Mail className="w-4 h-4 text-slate-400" /> Email Student
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="gap-2 font-medium text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                                               <Flag className="w-4 h-4" /> Report Issue
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </motion.div>
    )
}

import { Users, Activity } from "lucide-react"
