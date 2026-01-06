'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles, CheckCircle2, BarChart3, Clock, Shield, Users, ArrowRight, Star, Quote, ChevronDown, Check, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'
import { HeroHeader as Header } from '@/components/header'
import Footer from '@/components/footer'
import { useState, useRef, MouseEvent } from 'react'

// Extended Feature Data Configuration
const featuresData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    color: string;
    gradient: string;
    benefits: string[];
    stats: { label: string; value: string }[];
    steps: { title: string; desc: string }[];
    testimonial: { quote: string; author: string; role: string };
    faqs: { question: string; answer: string }[];
}> = {
    'fast-analysis': {
        title: "Fast Analysis",
        subtitle: "Real-time performance tracking at the speed of thought.",
        description: "Get instant feedback on student performance. Our underlying engine processes thousands of data points per second to provide you with actionable insights immediately after an assessment is submitted.",
        icon: Zap,
        color: "text-amber-500",
        gradient: "from-amber-500 to-orange-500",
        benefits: ["Zero-latency score updates", "Instant class-wide averages", "Trend analysis in milliseconds", "Real-time engagement metrics"],
        stats: [
            { label: "Processing Time", value: "< 50ms" },
            { label: "Data Points", value: "1M+/sec" },
            { label: "Updates", value: "Real-time" }
        ],
        steps: [
            { title: "Data Ingestion", desc: "Student inputs are captured instantly via secure websocket connections." },
            { title: "Rapid Processing", desc: "Our parallel processing engine normalizes and scores data in microseconds." },
            { title: "Instant Visualization", desc: "Dashboards update immediately, giving teachers live feedback." }
        ],
        testimonial: {
            quote: "The speed at which we get data back is absolutely game-changing. We can pivot our lesson plans mid-class based on live quiz results.",
            author: "Sarah Jenkins",
            role: "Principal, Oakwood High"
        },
        faqs: [
            { question: "Is it truly real-time?", answer: "Yes, our websocket architecture ensures that as soon as a student clicks submit, your dashboard updates within milliseconds." },
            { question: "Does this work on mobile?", answer: "Absolutely. The dashboard is fully responsive and optimized for tablet and mobile viewing." },
            { question: "Can I export the raw data?", answer: "Yes, all analysis data can be exported to CSV or synced directly to your SIS via API." }
        ]
    },
    'ai-powered': {
        title: "AI Powered",
        subtitle: "Personalized learning paths driven by advanced AI.",
        description: "Leverage state-of-the-art machine learning algorithms to adapt curriculum difficulty in real-time. FairLearnAI understands each student's learning pace and suggests the perfect next step.",
        icon: Cpu,
        color: "text-purple-500",
        gradient: "from-purple-500 to-indigo-500",
        benefits: ["Adaptive difficulty scaling", "Smart content recommendations", "Automated grading assistance", "Learning gap identification"],
        stats: [
            { label: "Prediction Accuracy", value: "94%" },
            { label: "Models Tuned", value: "Weekly" },
            { label: "Personalization", value: "100%" }
        ],
        steps: [
            { title: "Behavior Analysis", desc: "AI models analyze typical learning patterns and engagement levels." },
            { title: "Gap Identification", desc: "The system identifies specific concepts where a student is struggling." },
            { title: "Content Adaptation", desc: "Curriculum is automatically adjusted to reinforce weak areas." }
        ],
        testimonial: {
            quote: "It's like having a dedicated tutor for every single student. The AI catches struggling students long before I could.",
            author: "Dr. Mark Alistair",
            role: "Curriculum Director"
        },
        faqs: [
            { question: "How does the AI know what to suggest?", answer: "It analyzes over 50 data points per interaction, comparing them against millions of successful learning pathways." },
            { question: "Can I override the AI?", answer: "Yes, teachers always have full control to manually assign content or override suggestions." },
            { question: "Is student data used to train public models?", answer: "No. Your data is isolated and used only to improve models for your specific institution." }
        ]
    },
    'security': {
        title: "Secure",
        subtitle: "Enterprise-grade security for your sensitive data.",
        description: "We take data privacy seriously. With end-to-end encryption, SOC2 compliance, and regular security audits, your institution's data is safer than ever before.",
        icon: Fingerprint,
        color: "text-blue-500",
        gradient: "from-blue-500 to-cyan-500",
        benefits: ["End-to-end encryption", "COPPA & FERPA compliant", "Role-based access control", "Daily automated backups"],
        stats: [
            { label: "Encryption", value: "AES-256" },
            { label: "Compliance", value: "SOC2 Type II" },
            { label: "Uptime", value: "99.99%" }
        ],
        steps: [
            { title: "Encryption at Rest", desc: "All database entries are encrypted before they hit the disk." },
            { title: "Secure Transmission", desc: "Data in transit is protected via TLS 1.3 protocols." },
            { title: "Access Control", desc: "Granular permissions ensure only authorized personnel see sensitive data." }
        ],
        testimonial: {
            quote: "Finally, a platform that takes FERPA seriously from day one. The audit logs give us complete peace of mind.",
            author: "James Chen",
            role: "District CTO"
        },
        faqs: [
            { question: "Where is data hosted?", answer: "We use AWS data centers located within your country's borders to ensure data sovereignty." },
            { question: "Do you support SSO?", answer: "Yes, we integrate with Google Workspace, Microsoft Azure AD, and ClassLink." },
            { question: "How often are backups taken?", answer: "We perform full encrypted backups every 6 hours and point-in-time recovery logs every 5 minutes." }
        ]
    },
    'customizable': {
        title: "Customizable",
        subtitle: "Tailor the curriculum to fit your unique classroom needs.",
        description: "Every classroom is different. FairLearnAI gives you complete control over the interface, grading scales, and report formats. Make the platform truly yours.",
        icon: Pencil,
        color: "text-pink-500",
        gradient: "from-pink-500 to-rose-500",
        benefits: ["Customizable dashboard widgets", "Flexible grading rubrics", "White-label reports", "Personalized themes"],
        stats: [
            { label: "Widgets", value: "50+" },
            { label: "Themes", value: "Unlimited" },
            { label: "Setup Time", value: "< 5 min" }
        ],
        steps: [
            { title: "Module Selection", desc: "Pick and choose the learning modules relevant to your course." },
            { title: "Visual Tweaking", desc: "Adjust colors and layout to match your school's branding." },
            { title: "Rule Definition", desc: "Set custom grading scales and logic for automated reports." }
        ],
        testimonial: {
            quote: "I love that I can turn off features I don't need. It keeps the interface clean for my younger students.",
            author: "Emily Ross",
            role: "Elementary Teacher"
        },
        faqs: [
            { question: "Can I add my own logo?", answer: "Yes, the White-label plan allows full branding customization including logos and colors." },
            { question: "Can I change the grading scale?", answer: "Absolutely. You can define custom weightings, curves, and letter grade thresholds." },
            { question: "Do custom themes affect accessibility?", answer: "Our theme engine enforces WCAG compliance, so your custom colors will always remain accessible." }
        ]
    },
    'full-control': {
        title: "Full Control",
        subtitle: "Comprehensive admin tools for total oversight.",
        description: "Manage users, permissions, and institution-wide settings from a single powerful dashboard. Perfect for district admins and department heads.",
        icon: Settings2,
        color: "text-emerald-500",
        gradient: "from-emerald-500 to-teal-500",
        benefits: ["Centralized user management", "Granular permission settings", "Audit logs", "Bulk data import/export"],
        stats: [
            { label: "User Capacity", value: "100k+" },
            { label: "Admin Tools", value: "Comprehensive" },
            { label: "Audit Depth", value: "Full History" }
        ],
        steps: [
            { title: "Global Settings", desc: "Define district-wide policies and defaults in one place." },
            { title: "Role Assignment", desc: "Assign specific roles like Teacher, Principal, or Admin." },
            { title: "Activity Monitoring", desc: "Track system usage and compliance via detailed audit logs." }
        ],
        testimonial: {
            quote: "Managing 15,000 students used to be a nightmare. The bulk import tools saved us weeks of work.",
            author: "David Miller",
            role: "IT Administrator"
        },
        faqs: [
            { question: "Can we sync with PowerSchool?", answer: "Yes, we support bidirectional sync with PowerSchool, Canvas, and Blackboard." },
            { question: "Is there an activity log?", answer: "Every click and setting change is logged with a timestamp and user ID for full accountability." },
            { question: "Can I impersonate users?", answer: "Admins can safely view the platform as any user to troubleshoot issues without seeing passwords." }
        ]
    },
    'smart-insights': {
        title: "Smart Insights",
        subtitle: "Predictive analytics for better educational outcomes.",
        description: "Go beyond basic scores. Our predictive models analyze historical trends to warn you about at-risk students before they fall behind.",
        icon: Sparkles,
        color: "text-cyan-500",
        gradient: "from-cyan-500 to-sky-500",
        benefits: ["At-risk student alerts", "Success probability capability", "Long-term growth tracking", "Curriculum effectiveness analysis"],
        stats: [
            { label: "Prediction Window", value: "3 Months" },
            { label: "Model Type", value: "Hybrid" },
            { label: "Actionable Insights", value: "Daily" }
        ],
        steps: [
            { title: "Trend Analysis", desc: "Long-term data is analyzed to find subtle performance curves." },
            { title: "Risk Scoring", desc: "Each student is assigned a dynamic risk score based on engagement." },
            { title: "Intervention", desc: "Teachers receive suggested intervention strategies for at-risk students." }
        ],
        testimonial: {
            quote: "The predictive alerts allowed us to intervene with 12 at-risk students who would have otherwise slipped through the cracks.",
            author: "Maria Sanchez",
            role: "Guidance Counselor"
        },
        faqs: [
            { question: "How accurate are the predictions?", answer: "Our models have shown a 92% accuracy rate in predicting end-of-term grades by week 4." },
            { question: "What data points are used?", answer: "We analyze attendance, quiz scores, time-on-task, and homework completion rates." },
            { question: "Is this visible to parents?", answer: "Schools can choose to share insights with parents via the dedicated parent portal." }
        ]
    }
}

function TiltContainer({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full relative"
        >
            {children}
        </motion.div>
    )
}

function MockDashboard({ feature, gradient }: { feature: any, gradient: string }) {
    const isSecurity = feature.title === "Secure"
    const isAI = feature.title === "AI Powered"
    const isCustomizable = feature.title === "Customizable"
    const isFullControl = feature.title === "Full Control"
    
    const AnalyticsView = () => (
        <div className="grid grid-cols-2 gap-4 h-full">
            <div className="col-span-2 h-32 bg-white rounded-xl border border-zinc-100 shadow-sm p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-between px-6 pb-4 gap-2">
                    {[30, 50, 40, 70, 60, 80, 50, 90, 60, 40, 70].map((h, i) => (
                        <motion.div 
                            key={i}
                            className={`w-full rounded-sm bg-gradient-to-t ${gradient} opacity-80`}
                            initial={{ height: "10%" }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </div>
            <div className="h-24 bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center justify-center p-4">
                <div className="flex gap-2 items-end">
                    <motion.div animate={{ height: [20, 60, 20] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 bg-zinc-100 rounded-full" />
                    <motion.div animate={{ height: [40, 20, 40] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 bg-zinc-200 rounded-full" />
                    <motion.div animate={{ height: [60, 30, 60] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 bg-zinc-300 rounded-full" />
                </div>
            </div>
            <div className="h-24 bg-white rounded-xl border border-zinc-100 shadow-sm p-4 flex flex-col justify-center gap-2">
                <div className="w-full h-2 rounded-full bg-zinc-100" />
                <div className="w-3/4 h-2 rounded-full bg-zinc-100" />
                <div className="w-1/2 h-2 rounded-full bg-zinc-100" />
            </div>
        </div>
    )

    const SecurityView = () => (
        <div className="h-full flex flex-col gap-4">
            <div className="flex-1 bg-white rounded-xl border border-zinc-100 shadow-sm p-4 flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10 p-6 rounded-full bg-blue-50/50 border border-blue-100"
                >
                    <Shield className="w-16 h-16 text-blue-500" />
                </motion.div>
                {/* Scanning line */}
                <motion.div 
                    className="absolute top-0 left-0 right-0 h-1 bg-blue-400 blur-sm opacity-50"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="h-32 bg-zinc-900 rounded-xl border border-zinc-800 p-4 font-mono text-xs text-green-400 overflow-hidden flex flex-col gap-1 opacity-90">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>SYSTEM_SECURE</span>
                </div>
                {[
                    "Scanning ports... OK",
                    "Encrypting payload... DONE",
                    "Verifying handshake... OK",
                    "Firewall active. No threats found.",
                    "User auth validated.",
                ].map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5, duration: 0.5 }}
                    >
                        {">"} {log}
                    </motion.div>
                ))}
            </div>
        </div>
    )

    const AiView = () => (
        <div className="h-full flex flex-col gap-4">
             <div className="flex-1 bg-white rounded-xl border border-zinc-100 shadow-sm p-6 relative overflow-hidden flex flex-col items-center justify-center">
                <motion.div 
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center shadow-lg mb-6`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Cpu className="w-12 h-12 text-white" />
                </motion.div>
                <div className="flex gap-2">
                    {[1,2,3].map(i => (
                         <motion.div 
                            key={i}
                            className={`w-12 h-2 rounded-full bg-gradient-to-r ${gradient} opacity-50`}
                            animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                         />
                    ))}
                </div>
             </div>
             <div className="h-24 grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl border border-purple-100 p-3 flex flex-col justify-center">
                    <span className="text-xs text-purple-600 font-semibold mb-1">Learning Rate</span>
                    <span className="text-2xl font-bold text-purple-700">0.0031</span>
                </div>
                <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-3 flex flex-col justify-center">
                     <span className="text-xs text-indigo-600 font-semibold mb-1">Accuracy</span>
                     <span className="text-2xl font-bold text-indigo-700">99.8%</span>
                </div>
             </div>
        </div>
    )

    const CustomizableView = () => (
        <div className="h-full flex flex-col relative">
            {/* Background elements representing 'widgets' */}
            <div className="grid grid-cols-2 gap-4 h-full auto-rows-min opacity-40">
                 <div className="h-24 rounded-xl border border-dashed border-zinc-300 bg-zinc-50" />
                 <div className="h-24 rounded-xl border border-dashed border-zinc-300 bg-zinc-50" />
                 <div className="col-span-2 h-32 rounded-xl border border-dashed border-zinc-300 bg-zinc-50" />
            </div>

            {/* The 'Theme Editor' Panel overlay */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute inset-4 bg-white/90 backdrop-blur-md rounded-xl border border-zinc-200 shadow-xl p-4 flex flex-col gap-4"
            >
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-semibold text-sm text-zinc-600">Appearance</span>
                    <Settings2 className="w-4 h-4 text-zinc-400" />
                </div>
                
                {/* Color Picker Animation */}
                <div>
                     <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Accent Color</div>
                     <div className="flex gap-3">
                        {["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-amber-500"].map((c, i) => (
                            <motion.div 
                                key={i}
                                className={`w-8 h-8 rounded-full ${c} shadow-sm border-2 border-white ring-1 ring-zinc-100`}
                                animate={{ scale: [1, 1.2, 1], ringWidth: [1, 3, 1] }}
                                transition={{ delay: i * 0.5, duration: 2, repeat: Infinity }}
                            />
                        ))}
                     </div>
                </div>

                {/* Toggle Switches Animation */}
                <div>
                     <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Modules</div>
                     <div className="space-y-2">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-50">
                                <div className="h-2 w-16 bg-zinc-200 rounded" />
                                <motion.div 
                                    className={`w-8 h-4 rounded-full p-0.5 flex ${i === 1 ? 'bg-pink-500 justify-end' : 'bg-zinc-300 justify-start'}`}
                                    animate={i === 1 ? { backgroundColor: ["#ec4899", "#d1d5db", "#ec4899"] } : {}}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <motion.div className="w-3 h-3 bg-white rounded-full shadow-sm" layout />
                                </motion.div>
                            </div>
                        ))}
                     </div>
                </div>
            </motion.div>
        </div>
    )

    const FullControlView = () => (
        <div className="h-full flex flex-col bg-zinc-50/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">System Normal</span>
                    <span className="px-2 py-1 rounded bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Ver 2.4.0</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-300" />
                    <div className="w-2 h-2 rounded-full bg-zinc-300" />
                </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex-1">
                <div className="h-8 border-b border-zinc-100 bg-zinc-50 flex items-center px-4 gap-4">
                    <div className="w-4 h-4 rounded bg-zinc-200" />
                    <div className="flex-1 h-2 rounded bg-zinc-200" />
                    <div className="w-12 h-2 rounded bg-zinc-200" />
                </div>
                <div className="p-2 space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.4 }}
                            className="flex items-center gap-3 p-2 rounded hover:bg-zinc-50 transition-colors"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${['bg-emerald-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'][i - 1]}`}>
                                {['JD', 'AS', 'MR', 'LK'][i - 1]}
                            </div>
                            <div className="flex-1">
                                <div className="h-2 w-24 bg-zinc-800 rounded mb-1 opacity-80" />
                                <div className="h-1.5 w-16 bg-zinc-300 rounded" />
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[10px] font-medium ${i === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                                {i === 1 ? 'Admin' : 'User'}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )


    return (
        <div className="relative w-full aspect-[4/3] bg-zinc-50 rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col transform-gpu">
            {/* Window Header */}
            <div className="h-8 bg-white border-b border-zinc-200 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500/20" />
            </div>
            
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-16 md:w-48 bg-white border-r border-zinc-100 p-4 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 mb-4" />
                    {[1,2,3,4].map(i => (
                        <div key={i} className="h-6 w-full rounded-md bg-zinc-50 flex items-center px-2 gap-2 opacity-60">
                             <div className="w-4 h-4 rounded bg-zinc-200" />
                             <div className="hidden md:block w-20 h-2 rounded bg-zinc-100" />
                        </div>
                    ))}
                     <div className="mt-auto h-24 w-full rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-3 hidden md:block border border-indigo-100/50">
                        <div className="w-full h-2 rounded bg-indigo-100 mb-2" />
                        <div className="w-2/3 h-2 rounded bg-indigo-100" />
                     </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-zinc-50/50 p-6 flex flex-col gap-4 overflow-hidden relative">
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-4">
                         <div className="h-8 w-32 bg-white rounded-lg shadow-sm border border-zinc-100" />
                         <div className="flex gap-2">
                            <div className="h-8 w-8 bg-white rounded-lg shadow-sm border border-zinc-100" />
                            <div className="h-8 w-8 bg-white rounded-lg shadow-sm border border-zinc-100 flex items-center justify-center">
                                <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${feature.gradient}`} />
                            </div>
                         </div>
                    </div>

                    {/* Dynamic Content Area */}
                   {isSecurity ? <SecurityView /> : isAI ? <AiView /> : isCustomizable ? <CustomizableView /> : isFullControl ? <FullControlView /> : <AnalyticsView />}
                </div>
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        </div>
    )
}

function ComparisonTable({ feature }: { feature: any }) {
    return (
        <div className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
            <div className={`h-2 w-full bg-gradient-to-r ${feature.gradient}`} />
            <div className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8">Why FairLearnAI leads the pack</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-100">Feature</th>
                                <th className="py-4 px-6 text-lg font-bold text-zinc-900 border-b border-zinc-100 bg-zinc-50/50 rounded-t-xl w-1/3">FairLearnAI</th>
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 w-1/3">Standard LMS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Real-time Updates", us: true, them: false },
                                { name: "AI Personalization", us: true, them: false },
                                { name: "Modern UX/UI", us: true, them: false },
                                { name: "Predictive Analytics", us: true, them: "Basic" },
                                { name: "Integration Time", us: "< 5 Min", them: "Weeks" },
                            ].map((row, i) => (
                                <tr key={i} className="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50/30 transition-colors">
                                    <td className="py-4 px-6 font-medium text-zinc-700">{row.name}</td>
                                    <td className="py-4 px-6 bg-zinc-50/30 font-semibold text-zinc-900">
                                        {row.us === true ? <Check className={`w-6 h-6 ${feature.color}`} /> : (typeof row.us === 'string' ? <span className={feature.color}>{row.us}</span> : <X className="w-5 h-5 text-zinc-400" />)}
                                    </td>
                                    <td className="py-4 px-6 text-zinc-400">
                                        {row.them === true ? <Check className="w-5 h-5 text-zinc-400" /> : (typeof row.them === 'string' ? row.them : <X className="w-5 h-5 text-zinc-300" />)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border-b border-zinc-200 py-4 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center text-left focus:outline-none group"
            >
                <span className="font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors py-2">{question}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-2 text-zinc-600 text-sm leading-relaxed pb-4">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FeaturePage() {
    const params = useParams()
    const slug = params.slug as string
    const feature = featuresData[slug]

    if (!feature) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-zinc-500">Feature not found</p>
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Header />
            
            <main 
                className="relative pt-32 lg:pt-48 pb-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] min-h-screen"
            >
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 -translate-y-12 translate-x-12 blur-[120px] opacity-30 pointer-events-none`}>
                    <div className={`aspect-square w-[600px] bg-gradient-to-tr ${feature.gradient} rounded-full`} />
                </div>
                 
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/#features" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Features
                        </Link>
                    </div>

                    {/* HERO SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 relative z-10">
                        {/* Left: Content */}
                        <motion.div variants={itemVariants} className="relative z-10">
                             <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-white border border-zinc-100 shadow-sm mb-6 ${feature.color}`}>
                                <feature.icon className="h-8 w-8" />
                            </div>
                            
                            <h1 className={`text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br ${feature.gradient} pb-2`}>
                                {feature.title}
                            </h1>
                            <p className="text-2xl text-zinc-500 mb-8 leading-relaxed font-light">
                                {feature.subtitle}
                            </p>
                             <p className="text-base text-zinc-600 mb-10 leading-relaxed max-w-lg">
                                {feature.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                {feature.benefits.map((benefit, i) => (
                                    <div key={i} className={`flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border shadow-sm ${feature.color.replace('text', 'border')}/20 hover:border-${feature.color.split('-')[1]}-500/50 transition-colors`}>
                                        <CheckCircle2 className={`h-4 w-4 ${feature.color}`} />
                                        <span className="text-sm text-zinc-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Link href="/sign-up" className={`rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all bg-gradient-to-r ${feature.gradient}`}>
                                    Get Started
                                </Link>
                                <Link href="/contact" className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50 transition-all">
                                    Book Demo
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Interactive Dashboard Mockup 3D */}
                        <motion.div 
                            variants={itemVariants}
                            className="relative w-full z-10 perspective-[2000px] min-h-[300px] flex items-center justify-center"
                        >
                            <TiltContainer>
                                <MockDashboard feature={feature} gradient={feature.gradient} />
                            </TiltContainer>
                            
                            {/* Floating decorative elements */}
                            <motion.div 
                                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl -z-10"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                            />
                        </motion.div>
                    </div>

                    {/* TRUSTED BY STRIP */}
                    <motion.div variants={itemVariants} className="border-y border-zinc-100 py-8 mb-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-500 relative z-10">
                        <div className="flex justify-between items-center gap-8 overflow-hidden">
                             <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 whitespace-nowrap hidden md:block">Trusted by</p>
                             {['Acme Academy', 'Global High', 'Future School', 'Tech Institute', 'Smart Edu'].map((name, i) => (
                                 <span key={i} className="text-lg font-bold text-zinc-400 flex items-center gap-2">
                                     <div className="w-6 h-6 rounded bg-zinc-200" /> {name}
                                 </span>
                             ))}
                        </div>
                    </motion.div>

                    {/* STATS SECTION */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
                        {feature.stats.map((stat, i) => (
                            <div key={i} className="relative group p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.gradient} opacity-5 rounded-bl-full group-hover:scale-125 transition-transform duration-500`} />
                                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</p>
                                <p className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* COMPARISON TABLE */}
                    <motion.div variants={itemVariants} className="mb-32 relative z-10">
                        <ComparisonTable feature={feature} />
                    </motion.div>

                    {/* TWO COLUMN PROCESS & TESTIMONIAL */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
                        {/* Process Section - Left 7 cols */}
                        <motion.div variants={itemVariants} className="lg:col-span-7">
                            <div className="mb-12">
                                 <h2 className="text-sm font-bold tracking-wide text-indigo-500 uppercase mb-3">How It Works</h2>
                                 <h3 className="text-3xl font-bold text-zinc-900">Seamless integration into your workflow.</h3>
                            </div>

                            <div className="space-y-12 relative">
                                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-zinc-100" />
                                
                                {feature.steps.map((step, i) => (
                                    <div key={i} className="relative flex gap-6">
                                        <div className={`relative z-10 w-12 h-12 rounded-full bg-white border-4 border-zinc-50 shadow-sm flex items-center justify-center shrink-0`}>
                                            <span className={`text-lg font-bold ${feature.color}`}>{i + 1}</span>
                                        </div>
                                        <div className="pt-2">
                                            <h4 className="text-xl font-bold text-zinc-900 mb-2">{step.title}</h4>
                                            <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                         {/* Testimonial Section - Right 5 cols */}
                         <motion.div variants={itemVariants} className="lg:col-span-5 sticky top-32">
                            <div className={`relative rounded-3xl bg-zinc-900 p-8 shadow-2xl overflow-hidden text-white group`}>
                                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-1000`} />
                                <Quote className="w-12 h-12 text-zinc-700 mb-6" />
                                <blockquote className="relative z-10 text-xl font-medium leading-relaxed mb-8">
                                    "{feature.testimonial.quote}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border-2 border-zinc-500" />
                                    <div>
                                        <cite className="not-italic font-bold block">{feature.testimonial.author}</cite>
                                        <span className="text-zinc-400 text-sm">{feature.testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* FAQ SECTION */}
                     <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-32">
                        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-sm">
                            {feature.faqs.map((faq, i) => (
                                <FAQItem key={i} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA BOTTOM */}
                    <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden bg-white border border-zinc-200 px-6 py-24 shadow-2xl sm:px-24 xl:py-32 text-center group">
                         <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${feature.gradient}`} />
                         <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${feature.gradient} opacity-10 blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000`} />
                         
                         <div className="relative z-10">
                            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                                Ready to experience {feature.title}?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-500">
                                Join thousands of educators transforming their classrooms with FairLearnAI today.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/sign-up"
                                    className={`rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all bg-gradient-to-r ${feature.gradient}`}
                                >
                                    Get started for free
                                </Link>
                                <Link href="/contact" className="text-sm font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors">
                                    Contact sales <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                         </div>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    )
}
