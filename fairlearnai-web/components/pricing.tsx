import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
             {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="mx-auto max-w-5xl px-6 relative z-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center mb-16">
                    <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Strictly Simple</h2>
                    <h1 className="text-4xl font-bold text-zinc-900 lg:text-5xl">Pricing that Scales with You</h1>
                    <p className="text-lg text-zinc-600">FairLearnAI offers flexible plans for institutions of all sizes. From single classrooms to entire university districts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Free Plan */}
                    <div className="flex flex-col h-full rounded-3xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-indigo-500/5">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-zinc-900">Free</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-zinc-900">$0</span>
                                <span className="ml-1 text-sm font-semibold text-zinc-500">/month</span>
                            </div>
                            <p className="mt-2 text-sm text-zinc-500">Per editor. Perfect for getting started.</p>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                            <ul className="space-y-3 text-sm text-zinc-600">
                                {['Basic Analytics Dashboard', '5GB Cloud Storage', 'Email Context Support', 'Community Access'].map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <Check className="h-5 w-5 flex-shrink-0 text-zinc-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <Button asChild variant="outline" className="w-full rounded-full h-12 border-zinc-200 text-zinc-900 hover:bg-zinc-50 hover:text-zinc-900">
                                <Link href="/sign-up">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="flex flex-col h-full rounded-3xl border border-indigo-200 bg-indigo-50/30 p-8 relative overflow-hidden ring-1 ring-indigo-500/20 shadow-xl shadow-indigo-500/10">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                                Most Popular
                            </span>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-indigo-900">Pro</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-zinc-900">$19</span>
                                <span className="ml-1 text-sm font-semibold text-zinc-500">/month</span>
                            </div>
                            <p className="mt-2 text-sm text-zinc-500">Per editor. For serious educators.</p>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="text-sm font-medium text-zinc-900">Everything in Free, plus:</div>
                            <ul className="space-y-3 text-sm text-zinc-700">
                                {['Unlimited Cloud Storage', 'Priority Email & Chat Support', 'Advanced Analytics & Reports', 'Single Sign-On (SSO)', 'Mobile App Access', 'Custom Templates'].map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <Check className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8">
                             <Button asChild className="w-full rounded-full h-12 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                                <Link href="/sign-up">Upgrade to Pro</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
