"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Eye, 
  MessageSquare, 
  AlertTriangle,
  Save,
  Wand2,
  FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.1 
        }
    }
}

const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    }
}

export function TeacherSettingsTab() {
  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl space-y-8"
    >
        <div className="flex items-center justify-between">
             <div>
                 <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Classroom Rules & Settings</h2>
                 <p className="text-slate-500 font-medium">Configure AI detection sensitivity and student permissions.</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 font-bold rounded-xl">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
            </Button>
        </div>

        {/* AI Permissions */}
        <motion.div variants={sectionVariants} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                    <Wand2 className="w-5 h-5" />
                </div>
                <div>
                     <h3 className="text-lg font-bold text-slate-900">AI Tool Permissions</h3>
                     <p className="text-sm text-slate-500 font-medium">Control what generative tools students can access.</p>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base font-bold text-slate-900">Grammar & Spell Check</Label>
                        <p className="text-sm text-slate-500">Allow basic correction tools like Grammarly.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                         <div className="flex items-center gap-2">
                            <Label className="text-base font-bold text-slate-900">Generative Assistance</Label>
                            <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">Restricted</Badge>
                         </div>
                        <p className="text-sm text-slate-500">Allow AI to suggest outlines or rephrase sentences.</p>
                    </div>
                    <Switch />
                </div>
                 <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base font-bold text-slate-900">Coding Copilot</Label>
                        <p className="text-sm text-slate-500">Allow code completion for CS assignments.</p>
                    </div>
                    <Select defaultValue="blocked">
                        <SelectTrigger className="w-[180px] rounded-xl border-slate-200 font-medium">
                            <SelectValue placeholder="Select permission" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 font-medium">
                            <SelectItem value="allowed">Allowed</SelectItem>
                            <SelectItem value="restricted">Restricted (Log only)</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>

        {/* Integrity Sensitivity */}
        <motion.div variants={sectionVariants} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                    <Shield className="w-5 h-5" />
                </div>
                 <div>
                     <h3 className="text-lg font-bold text-slate-900">Integrity Sensitivity</h3>
                     <p className="text-sm text-slate-500 font-medium">Adjust strictness of plagiarism and AI detection.</p>
                </div>
            </div>

            <div className="space-y-8">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-bold text-slate-900">AI Probability Threshold</Label>
                        <span className="text-sm font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">85%</span>
                    </div>
                    <Slider defaultValue={[85]} max={100} step={1} className="py-4" />
                    <p className="text-xs text-slate-500 font-medium flex gap-2">
                        <span className="text-emerald-600">Low (Relaxed)</span>
                        <span className="flex-1 border-b border-dashed border-slate-200 relative top-[-8px]"></span>
                        <span className="text-rose-600">High (Strict)</span>
                    </p>
                </div>

                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex gap-3">
                         <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                         <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-900">Flag "Write for me" prompts</p>
                            <p className="text-xs text-slate-500">Automatically block and flag students asking AI to generate full essays.</p>
                         </div>
                    </div>
                    <Switch defaultChecked />
                </div>
            </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={sectionVariants} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                     <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                     <p className="text-sm text-slate-500 font-medium">Customize when you want to be alerted.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                     "High-risk integrity flag",
                     "Student falls behind (2+ missed assignments)",
                     "Weekly insights report",
                     "New policy updates"
                 ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                          <Label className="text-sm font-bold text-slate-700 cursor-pointer w-full" htmlFor={`notif-${i}`}>{item}</Label>
                          <Switch id={`notif-${i}`} defaultChecked={i === 0 || i === 2} />
                      </div>
                 ))}
            </div>
        </motion.div>

    </motion.div>
  )
}
