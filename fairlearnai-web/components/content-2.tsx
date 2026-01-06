'use client'
import { Cpu, Zap } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function ContentSection() {
    return (
        <section id="solution" className="py-24 lg:py-32 overflow-hidden relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
                            The FairLearnAI ecosystem brings together our tools.
                        </h2>
                        
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                FairLearnAI is evolving to be more than just analytics. <span className="font-semibold text-foreground">It supports an entire ecosystem</span> — from classrooms to administration.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                It supports an entire workflow — from assignments to the grading and feedback helping educators and students succeed.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                {
                                    icon: Zap,
                                    title: "Instant Feedback",
                                    desc: "Real-time grading and suggestions.",
                                    color: "text-amber-500",
                                    bg: "bg-amber-500/10", 
                                    border: "group-hover:border-amber-500/50"
                                },
                                {
                                    icon: Cpu,
                                    title: "Deep Analysis",
                                    desc: "Understanding learning patterns.",
                                    color: "text-purple-500",
                                    bg: "bg-purple-500/10",
                                    border: "group-hover:border-purple-500/50"
                                }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                                    className={`group flex gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 ${item.border}`}
                                >
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold leading-none">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 p-2 shadow-2xl backdrop-blur-sm ring-1 ring-zinc-900/10 dark:ring-white/10">
                            <Image
                                src="/charts.png"
                                className="hidden w-full rounded-xl dark:block shadow-inner"
                                alt="Analytics Dashboard Dark"
                                width={1207}
                                height={929}
                            />
                            <Image
                                src="/charts-light.png"
                                className="w-full rounded-xl shadow-inner dark:hidden"
                                alt="Analytics Dashboard Light"
                                width={1207}
                                height={929}
                            />
                            {/* Decorative gradient blob */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-60" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
