"use client";
import { motion } from "motion/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { GraduationCap, FileCheck, Server, Library, ShieldCheck } from "lucide-react";

const StatItem = ({
  end,
  label,
  prefix = "",
  suffix = "",
}: {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="pl-6 border-l-4 border-indigo-500 hover:border-indigo-600 transition-colors duration-300">
      <div className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl flex items-baseline gap-1">
        {prefix && <span className="text-2xl text-indigo-600 align-top">{prefix}</span>}
        {inView ? (
          <CountUp
            start={0}
            end={end}
            duration={2.5}
            separator=","
            suffix={suffix}
          />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden py-24 md:py-32 bg-white"
    >
      {/* Background Gradients - Subtle for Light Theme */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-50 pointer-events-none">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-indigo-100 to-purple-100" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-50 pointer-events-none">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-purple-100 to-indigo-100" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                Impact by the <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  numbers
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                Trusted by leading institutions worldwide. We help you measure
                what matters so you can focus on meaningful improvements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-zinc-200 pt-10">
              <StatItem end={1200} label="Active Students" prefix="+" />
              <StatItem end={50} label="Partner Schools" prefix="+" />
              <StatItem end={98} label="Satisfaction Rate" suffix="%" />
              <StatItem end={24} label="Support 24/7" suffix="/7" />
            </div>
          </div>

          {/* Right Content - Live Activity Feed */}
          <div className="relative lg:pl-10">
              {/* Decorative Card Glow - Subtle */}
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-[2.5rem] blur opacity-60"></div>
            
            <div className="relative overflow-hidden rounded-3xl bg-white border border-zinc-100 p-8 shadow-2xl shadow-indigo-500/10">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Live Activity
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-500">Real-time</span>
                </div>
              </div>

              <div className="space-y-6 relative">
                 {/* Gradient mask for scroll effect appearance - White to Transparent */}
                 <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {[
                  {
                    text: "New student enrolled in 'Advanced AI'",
                    time: "2m ago",
                    icon: GraduationCap,
                    color: "bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-500/20",
                  },
                  {
                    text: "Assignment 'Neural Networks' graded",
                    time: "5m ago",
                    icon: FileCheck,
                    color: "bg-purple-50 text-purple-600 ring-1 ring-inset ring-purple-500/20",
                  },
                  {
                    text: "Server capacity scaled up",
                    time: "12m ago",
                    icon: Server,
                    color: "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20",
                  },
                  {
                    text: "New resource added to Library",
                    time: "15m ago",
                    icon: Library,
                    color: "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-500/20",
                  },
                  {
                    text: "System backup completed",
                    time: "1h ago",
                    icon: ShieldCheck,
                    color: "bg-zinc-50 text-zinc-600 ring-1 ring-inset ring-zinc-500/20",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color} transition-transform group-hover:scale-110`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {item.text}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
