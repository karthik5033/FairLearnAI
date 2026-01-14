'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { HeroHeader } from './header'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ChevronRight } from 'lucide-react'

const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = React.useState('')
    const [isDeleting, setIsDeleting] = React.useState(false)
    const highlightWord = "FairLearnAI"
    const highlightIndex = text.indexOf(highlightWord)

    React.useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleTyping = () => {
            if (!isDeleting) {
                if (displayText.length < text.length) {
                    setDisplayText(text.slice(0, displayText.length + 1))
                    timeout = setTimeout(handleTyping, 80) // Faster typing
                } else {
                    timeout = setTimeout(() => setIsDeleting(true), 4000) // Longer pause
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(text.slice(0, displayText.length - 1))
                    timeout = setTimeout(handleTyping, 40) // Faster deleting
                } else {
                    setIsDeleting(false)
                    timeout = setTimeout(handleTyping, 1000)
                }
            }
        }

        timeout = setTimeout(handleTyping, 100)

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, text])

    // Split logic
    const mainPart = highlightIndex !== -1 ? text.slice(0, highlightIndex) : text
    const displayMain = displayText.slice(0, mainPart.length)
    const displayHighlight = displayText.length > mainPart.length ? displayText.slice(mainPart.length) : ''

    return (
        <span>
            {displayMain}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 font-extrabold drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                {displayHighlight}
            </span>
            <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    times: [0, 0.5, 0.5, 1], 
                    ease: "linear" 
                }}
                className="ml-1 inline-block h-[1em] w-[4px] bg-indigo-400 align-bottom shadow-[0_0_10px_rgba(129,140,248,0.8)]"
            />
        </span>
    )
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="relative py-24 md:pb-32 lg:pb-36 lg:pt-48">
                        {/* Background Video - Rendered FIRST to stay behind */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 z-10 bg-black/50" />
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"></video>
                            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-slate-950/90 to-slate-950 z-20 pointer-events-none" />
                        </div>

                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 text-white lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <div className="grid place-items-center lg:place-items-start">
                                    {/* Ghost element for stable height */}
                                    <h1 className="invisible col-start-1 row-start-1 mt-4 max-w-2xl text-5xl font-bold md:text-6xl lg:mt-8 xl:text-7xl">
                                        Master Skills Faster with FairLearnAI
                                    </h1>
                                    {/* Visible typing text */}
                                    <h1 className="col-start-1 row-start-1 mt-4 max-w-2xl text-5xl font-bold text-white md:text-6xl lg:mt-8 xl:text-7xl drop-shadow-lg">
                                        <TypewriterText text="Master Skills Faster with FairLearnAI" />
                                    </h1>
                                </div>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-white/90 drop-shadow-md">Highly personalized learning paths and AI-driven analytics to help you master any subject.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-base font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:brightness-110 border-t border-white/20 transition-all duration-300">
                                        <Link href="/sign-up">
                                            <span className="text-nowrap">Start Learning</span>
                                            <ChevronRight className="ml-1" />
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full border border-white/50 bg-white/10 backdrop-blur-md px-6 text-base font-medium text-white hover:bg-white/20 hover:text-white hover:border-white/80 transition-all duration-300">
                                        <Link href="#features">
                                            <span className="text-nowrap">Request a demo</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}
