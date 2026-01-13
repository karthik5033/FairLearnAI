'use client'
import Link from 'next/link'
import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { MouseEvent, useRef } from 'react'
import React from 'react'

const features = [
    {
        title: "Fast Analysis",
        description: "Real-time performance tracking.",
        icon: Zap,
        color: "from-amber-500 to-orange-500",
        iconColor: "text-amber-500",
        shadow: "shadow-amber-500/20",
        rgb: "245, 158, 11", // Amber
        href: "/features/fast-analysis",
        benefits: ["Live Tracking", "Instant Feedback"]
    },
    {
        title: "AI Powered",
        description: "Personalized learning paths driven by AI.",
        icon: Cpu,
        color: "from-purple-500 to-indigo-500",
        iconColor: "text-purple-500",
        shadow: "shadow-purple-500/20",
        rgb: "168, 85, 247", // Purple
        href: "/features/ai-powered",
        benefits: ["Adaptive Learning", "Smart Suggestions"]
    },
    {
        title: "Secure",
        description: "Enterprise-grade security for data.",
        icon: Fingerprint,
        color: "from-blue-500 to-cyan-500",
        iconColor: "text-blue-500",
        shadow: "shadow-blue-500/20",
        rgb: "59, 130, 246", // Blue
        href: "/features/security",
        benefits: ["End-to-end Encrypted", "GDPR Compliant"]
    },
    {
        title: "Customizable",
        description: "Tailor the curriculum to your needs.",
        icon: Pencil,
        color: "from-pink-500 to-rose-500",
        iconColor: "text-pink-500",
        shadow: "shadow-pink-500/20",
        rgb: "236, 72, 153", // Pink
        href: "/features/customizable",
        benefits: ["White-label Ready", "Custom Themes"]
    },
    {
        title: "Full Control",
        description: "Comprehensive admin tools.",
        icon: Settings2,
        color: "from-emerald-500 to-teal-500",
        iconColor: "text-emerald-500",
        shadow: "shadow-emerald-500/20",
        rgb: "16, 185, 129", // Emerald
        href: "/features/full-control",
        benefits: ["Role-based Access", "Audit Logs"]
    },
    {
        title: "Smart Insights",
        description: "Predictive analytics for outcomes.",
        icon: Sparkles,
        color: "from-cyan-500 to-sky-500",
        iconColor: "text-cyan-500",
        shadow: "shadow-cyan-500/20",
        rgb: "6, 182, 212", // Cyan
        href: "/features/smart-insights",
        benefits: ["Predictive Trends", "Success Probability"]
    },
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    // Tilt Values
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    
    // Snappier spring animation to reduce lag feel
    const springConfig = { damping: 30, stiffness: 700, mass: 0.5 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);
    
    const backgroundGradient = useMotionTemplate`
        radial-gradient(
          650px circle at ${mouseX}px ${mouseY}px,
          rgba(${feature.rgb}, 0.10),
          transparent 80%
        )
    `

    function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
        if (cardRef.current) {
            rectRef.current = cardRef.current.getBoundingClientRect();
        }
        // Immediate tilt update on entry
        handleMouseMove(e);
    }

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!rectRef.current) return;
        
        const { left, top, width, height } = rectRef.current;
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        mouseX.set(x);
        mouseY.set(y);

        // Calculate rotation
        const centerX = width / 2;
        const centerY = height / 2;
        
        const intensity = 20;

        const rX = ((y - centerY) / centerY) * -intensity;
        const rY = ((x - centerX) / centerX) * intensity;

        rotateX.set(rX);
        rotateY.set(rY);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        mouseX.set(0);
        mouseY.set(0);
        rectRef.current = null;
    }

    return (
        <div style={{ perspective: "1200px" }} className="h-full">
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ 
                    rotateX: rotateXSpring, 
                    rotateY: rotateYSpring,
                    transformStyle: "preserve-3d" 
                }}
                className="group relative flex flex-col h-full border border-slate-200 bg-slate-50/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-zinc-700 transition-[background,border-color,box-shadow] duration-300 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 will-change-transform"
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Spotlight Gradient on Hover */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-2xl z-0"
                    style={{ background: backgroundGradient }}
                />
                
                {/* Decorative Corner Accent */}
                <div 
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/0 to-white/0 group-hover:from-[rgba(var(--feature-rgb),0.05)] transition-all duration-500 rounded-bl-3xl -mr-4 -mt-4 opacity-0 group-hover:opacity-100 z-0"
                    style={{ 
                        '--feature-rgb': feature.rgb 
                    } as React.CSSProperties}
                />

                {/* Inner Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

                {/* Content Container - Pushed forward in 3D space */}
                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex items-start justify-between mb-3">
                         <div className={`inline-flex w-fit rounded-xl bg-white dark:bg-zinc-800/50 p-2.5 shadow-sm ring-1 ring-inset ring-slate-100 dark:ring-zinc-800 ${feature.iconColor}`}>
                            <feature.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110" />
                        </div>
                    </div>
                   
                    <h3 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-50 mb-1">
                        {feature.title}
                    </h3>
                    <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
                        {feature.description}
                    </p>

                    {/* Benefits Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {feature.benefits?.map((benefit, i) => (
                            <span 
                                key={i}
                                className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-zinc-500 ring-1 ring-inset ring-slate-200 transition-colors duration-300 group-hover:bg-[rgba(var(--feature-rgb),0.05)] group-hover:text-[rgb(var(--feature-rgb))] group-hover:ring-[rgba(var(--feature-rgb),0.2)]"
                                style={{ 
                                    '--feature-rgb': feature.rgb 
                                } as React.CSSProperties}
                            >
                                {benefit}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <Link href={feature.href} passHref className="block w-full">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ 
                                    '--hover-bg': `rgba(${feature.rgb}, 0.1)`, 
                                    '--hover-text': `rgb(${feature.rgb})`, 
                                    '--hover-border': `rgba(${feature.rgb}, 0.2)` 
                                } as React.CSSProperties}
                                className="group/btn inline-flex items-center justify-center rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-zinc-600 transition-all duration-300 hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] hover:border-[var(--hover-border)] cursor-pointer w-full shadow-sm hover:shadow-md"
                            >
                                <span>Learn More</span>
                                <ArrowRight className="ml-1.5 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 via-30% to-slate-50 dark:bg-zinc-950">
            {/* Darker, richer top blob that fades out */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-40 dark:opacity-20 bg-gradient-to-tr from-indigo-900 via-purple-900 to-indigo-950 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Top Fade Mask to blend with Hero Section */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-950 to-transparent z-0 pointer-events-none" />

            <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3">
                            Features
                        </h2>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white dark:text-white mb-6">
                            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">excel</span>
                        </h2>
                        <p className="text-base leading-7 text-slate-300 dark:text-zinc-400">
                            FairLearnAI provides a comprehensive suite of tools designed to transform the educational experience for everyone involved.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
