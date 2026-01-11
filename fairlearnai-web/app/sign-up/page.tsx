"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

function LogoIcon({ className, uniColor }: { className?: string; uniColor?: boolean }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-8', className)}>
            <path
                d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
                fill={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
            />
            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="20"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" /> {/* Emerald-500 */}
                    <stop
                        offset="1"
                        stopColor="#3b82f6" /* Blue-500 */
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default function SignUpPage() {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-8">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute right-0 top-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#e0e7ff_100%)] opacity-60"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[440px]"
            >
                <div className="mb-8 text-center">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                         className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50"
                    >
                        <LogoIcon />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold tracking-tight text-slate-900"
                    >
                        Create Account
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-2 text-slate-500"
                    >
                        Join FairLearnAI to get started today
                    </motion.p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50">
                    <div className="p-8">
                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <Button
                                variant="outline"
                                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-12 shadow-sm"
                            >
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="font-semibold">Google</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-12 shadow-sm"
                            >
                                <svg
                                    className="mr-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256">
                                    <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                                    <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                                    <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path>
                                    <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path>
                                </svg>
                                <span className="font-semibold">Microsoft</span>
                            </Button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname" className="text-slate-700 font-semibold ml-1">Firstname</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                        <Input
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            placeholder="John"
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname" className="text-slate-700 font-semibold ml-1">Lastname</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                        <Input
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            placeholder="Doe"
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">Username</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your username"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pwd" className="text-slate-700 font-semibold ml-1">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <Input
                                        id="pwd"
                                        name="pwd"
                                        type="password"
                                        placeholder="Create a password"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <Button className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30 mt-2">
                                Create Account
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/50 p-4 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Have an account?{" "}
                            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500 underline-offset-4 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                     <p className="text-xs font-medium text-slate-400">
                        &copy; {new Date().getFullYear()} FairLearnAI. All rights reserved.
                     </p>
                </div>
            </motion.div>
        </section>
    )
}
