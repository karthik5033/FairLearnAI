"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Mail, MapPin, Phone, Send, User, MessageSquare, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/logo";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function ContactPage() {
    return (
        <section className="min-h-screen w-full lg:grid lg:grid-cols-2">
            
            {/* Left Panel: Immersive Brand Experience */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 lg:p-20 overflow-hidden bg-slate-50 border-r border-slate-100">
                
                {/* Advanced Mesh Gradients */}
                <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow delay-1000 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light pointer-events-none" />

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 h-full flex flex-col justify-between"
                >
                    <motion.div variants={itemVariants}>
                        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                            <Logo className="text-2xl" />
                        </Link>
                    </motion.div>

                    <div className="space-y-10 max-w-xl">
                         <motion.div variants={itemVariants}>
                            <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                                Let's build the <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 animate-gradient-x">
                                    future of learning
                                </span> <br/>
                                together.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                We're empowering the next generation of educators and students with ethical, transparent AI tools. Join the movement.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <ContactInfoItem icon={Mail} label="Email" value="hello@fairlearnai.com" href="mailto:hello@fairlearnai.com" />
                            <ContactInfoItem icon={Phone} label="Phone" value="+1 (555) 000-0000" href="tel:+15550000000" />
                            <ContactInfoItem icon={MapPin} label="Office" value="123 AI Blvd, San Francisco, CA" />
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="flex gap-5 text-slate-400 pt-8">
                        <SocialLink icon={Twitter} href="#" label="Twitter" />
                        <SocialLink icon={Github} href="#" label="GitHub" />
                        <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Panel: Premium Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white relative">
                 {/* Mobile Header */}
                 <div className="absolute top-6 left-6 lg:hidden">
                    <Link href="/">
                        <Logo />
                    </Link>
                 </div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full max-w-[440px] space-y-8 pt-16 lg:pt-0"
                >
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Get in touch</h2>
                        <p className="text-slate-500 text-sm">We'd love to hear from you. Fill out the form below.</p>
                    </div>

                    <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 group">
                                <Label htmlFor="first-name" className="text-slate-700 font-medium group-focus-within:text-indigo-600 transition-colors">First Name</Label>
                                <Input id="first-name" placeholder="John" className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-11 transition-all" />
                            </div>
                            <div className="space-y-2 group">
                                <Label htmlFor="last-name" className="text-slate-700 font-medium group-focus-within:text-indigo-600 transition-colors">Last Name</Label>
                                <Input id="last-name" placeholder="Doe" className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-11 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="email" className="text-slate-700 font-medium group-focus-within:text-indigo-600 transition-colors">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-11 transition-all" />
                        </div>

                        <div className="space-y-2 group">
                             <Label htmlFor="subject" className="text-slate-700 font-medium group-focus-within:text-indigo-600 transition-colors">Subject</Label>
                             <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <MessageSquare className="w-5 h-5" />
                                </span>
                                <Input id="subject" placeholder="Partnership Inquiry" className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-11 transition-all" />
                             </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label htmlFor="message" className="text-slate-700 font-medium group-focus-within:text-indigo-600 transition-colors">Message</Label>
                            <Textarea id="message" placeholder="Tell us about your needs..." className="min-h-[150px] bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 resize-none p-4 transition-all" />
                        </div>

                        <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200/50 transition-all hover:scale-[1.02] active:scale-[0.98] text-base font-semibold group relative overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Send Message
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </form>

                    <p className="text-xs text-center text-slate-400 mt-6">
                        By sending this message, you agree to our <Link href="#" className="underline hover:text-indigo-600 transition-colors">Privacy Policy</Link> and <Link href="#" className="underline hover:text-indigo-600 transition-colors">Terms of Service</Link>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function ContactInfoItem({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        rotateX.set(((clientY - top - height / 2) / height) * -20);
        rotateY.set(((clientX - left - width / 2) / width) * 20);
    }
    
    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    const Wrapper = href ? Link : 'div';
    const props = href ? { href, className: "block" } : { className: "block" };

    return (
        <Wrapper {...props}>
             <motion.div
                style={{ perspective: 1000, rotateX: rotateXSpring, rotateY: rotateYSpring }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/60 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-slate-900 font-semibold text-lg group-hover:text-indigo-700 transition-colors">{value}</p>
                    </div>
                </div>
            </motion.div>
        </Wrapper>
    )
}

function SocialLink({ icon: Icon, href, label }: { icon: any, href: string, label: string }) {
    return (
        <a 
            href={href} 
            aria-label={label}
            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            <Icon className="w-5 h-5" />
        </a>
    )
}
