"use client";

import { motion } from "motion/react";
import { Users, Target, Shield, Globe, Award, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
    { label: "Students Empowered", value: "10k+" },
    { label: "Countries Reached", value: "25+" },
    { label: "AI Models Trained", value: "50+" },
    { label: "Team Members", value: "15" },
];

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "Democratizing access to personalized, AI-driven education with fairness at the core of everything we build.",
        gradient: "from-indigo-500/20 to-purple-500/20",
        iconColor: "text-indigo-600",
        border: "hover:border-indigo-500/50"
    },
    {
        icon: Shield,
        title: "Ethical AI First",
        description: "We rigorously test every model for bias to ensure equitable learning opportunities for students of all backgrounds.",
        gradient: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-600",
        border: "hover:border-emerald-500/50"
    },
    {
        icon: Globe,
        title: "Global Impact",
        description: "Education knows no borders. Our tools adapt to diverse curriculums, languages, and cultural contexts worldwide.",
        gradient: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-600",
        border: "hover:border-blue-500/50"
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-white">
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column: Narrative with enhanced typography */}
                    <div className="space-y-8 lg:sticky lg:top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6 border border-indigo-100">
                                About Us
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                                We are pioneering <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                    Fair & Adaptive Learning
                                </span>
                            </h2>
                            <p className="text-lg leading-relaxed text-slate-600 mb-6">
                                FairLearnAI started with a simple yet powerful question: <span className="text-slate-900 font-semibold">How can AI level the playing field?</span>
                            </p>
                            <p className="text-lg leading-relaxed text-slate-600">
                                We combine cutting-edge machine learning with deep pedagogical research to create tools that understand the unique journey of every student, ensuring no one is left behind.
                            </p>
                        </motion.div>

                        <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.2, duration: 0.6 }}
                             className="flex flex-wrap gap-4 pt-2"
                        >
                             <Button asChild className="h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                <Link href="/contact">
                                    Join Our Journey
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-12 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full hover:border-slate-300 transition-all duration-300">
                                <Link href="/team">
                                    Meet the Team
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Integrated Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100 mt-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Values Cards (Modern Glass Style) */}
                    <div className="space-y-6 pt-8 lg:pt-0">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className={`group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${item.border} hover:border-opacity-100`}
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                
                                <div className="relative z-10 flex gap-6 items-start">
                                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm ${item.iconColor}`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
