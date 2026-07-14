import { motion } from "framer-motion"
import { Cpu, GraduationCap, Radar } from "lucide-react"
import { GlassPanel, SectionHeading } from "../ui/SectionHeading"
import { ProfilePortrait } from "../ui/ProfilePortrait"
import { AnimatedCounter } from "../ui/AnimatedCounter"
import { MotionSection } from "../layout/MotionSection"
import { PERSON, STATS } from "../../data/portfolio"

export function About() {
  return (
    <MotionSection id="about" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Profile / ABOUT"
          title="About"
          subtitle="Academic trajectory, mission interests, and integrity-first security mindset."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassPanel className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00ff9d]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#00d4ff]/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
              <ProfilePortrait size="about" />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-white">{PERSON.name}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#00d4ff]">
                  {PERSON.degree}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-slate-400">{PERSON.year}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Stanley College · Hyderabad
                </p>
              </div>
            </div>

            <p className="relative mt-6 text-sm leading-relaxed text-slate-300 md:text-base">
              {PERSON.summary}
            </p>

            <p className="relative mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
              At <span className="text-[#00ff9d]">{PERSON.college}</span>, she connects adversarial
              thinking with responsible engineering — from{" "}
              <strong className="text-white">DRDO-DRDL networking labs</strong> to{" "}
              <strong className="text-white">LLM-based systems at Swecha</strong> and production-style
              ML deployments.
            </p>

            <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <GraduationCap className="h-8 w-8 shrink-0 text-[#00d4ff]" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    CGPA
                  </p>
                  <p className="font-display text-2xl font-bold text-[#00ff9d]">{PERSON.cgpa}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 sm:col-span-2">
                <Cpu className="h-8 w-8 shrink-0 text-[#ff3366]" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Focus
                  </p>
                  <p className="text-sm text-slate-200">
                    Offensive awareness · defensive depth · AI assurance
                  </p>
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => {
              const isLastOdd = i === STATS.length - 1 && STATS.length % 2 !== 0
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`glass-panel flex flex-col justify-between rounded-2xl border border-[#00d4ff]/20 p-5 shadow-[0_0_30px_rgba(0,212,255,0.08)] ${
                    isLastOdd ? "col-span-2 flex-row sm:flex-row items-center justify-between" : ""
                  }`}
                >
                  <div className={isLastOdd ? "flex items-center gap-4" : ""}>
                    <Radar className="h-5 w-5 text-[#00ff9d]/70" aria-hidden />
                    {isLastOdd && (
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                        {s.label}
                      </p>
                    )}
                  </div>
                  <div className={isLastOdd ? "text-right" : "mt-6"}>
                    <p className="font-display text-3xl font-bold text-white md:text-4xl">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </p>
                    {!isLastOdd && (
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                        {s.label}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
