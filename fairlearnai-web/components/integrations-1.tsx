'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from '@/components/logos'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'

export default function IntegrationsSection() {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-muted-foreground mt-6">Connect seamlessly with popular platforms and services to enhance your workflow.</p>
                    </div>

                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <IntegrationCard
                            title="Google Gemini"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <Gemini />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Replit"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <Replit />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Magic UI"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <MagicUI />
                        </IntegrationCard>

                        <IntegrationCard
                            title="VSCodium"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <VSCodium />
                        </IntegrationCard>

                        <IntegrationCard
                            title="MediaWiki"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <MediaWiki />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Google PaLM"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <GooglePaLM />
                        </IntegrationCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/meschacirung/cnblocks' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const backgroundGradient = useMotionTemplate`
        radial-gradient(
          650px circle at ${mouseX}px ${mouseY}px,
          rgba(120, 113, 255, 0.10),
          transparent 80%
        )
    `

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        
        const x = clientX - left;
        const y = clientY - top;
        
        mouseX.set(x);
        mouseY.set(y);

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
    }

    return (
        <div style={{ perspective: "1200px" }}>
            <motion.div
                style={{ 
                    rotateX: rotateXSpring, 
                    rotateY: rotateYSpring,
                    transformStyle: "preserve-3d" 
                }}
                className="h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Card className="group relative p-6 h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-zinc-200 dark:border-zinc-800 bg-card text-card-foreground">
                    {/* Spotlight Gradient */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                        style={{ background: backgroundGradient }}
                    />

                    <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                        <div className="*:size-10">{children}</div>

                        <div className="space-y-2 py-6">
                            <h3 className="text-base font-medium">{title}</h3>
                            <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
                        </div>

                        <div className="flex gap-3 border-t border-dashed pt-6 border-zinc-200 dark:border-zinc-800">
                            <Button
                                asChild
                                variant="secondary"
                                size="sm"
                                className="gap-1 pr-2 shadow-none bg-secondary/80 hover:bg-secondary">
                                <Link href={link}>
                                    Learn More
                                    <ChevronRight className="ml-0 !size-3.5 opacity-50" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
