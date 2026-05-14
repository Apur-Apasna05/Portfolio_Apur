import { motion } from "framer-motion"
import { Orbit, Satellite } from "lucide-react"
import { GlassPanel, SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { EXPERIENCE } from "../../data/portfolio"

export function Experience() {
  return (
    <MotionSection id="experience" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Chronicle"
          title="Experience stream"
          subtitle="Internships, research threads, and community velocity — mapped as a defense timeline."
        />

        <GlassPanel className="relative">
          <div className="pointer-events-none absolute left-[1.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff9d] via-[#00d4ff] to-[#ff3366] opacity-40 md:left-8" />

          <ul className="relative space-y-10 md:space-y-12">
            {EXPERIENCE.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex shrink-0 flex-col items-center md:w-16">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00ff9d]/50 bg-[#030508] shadow-[0_0_20px_rgba(0,255,157,0.25)]">
                    {i === 0 ? (
                      <Satellite className="h-5 w-5 text-[#00ff9d]" aria-hidden />
                    ) : (
                      <Orbit className="h-5 w-5 text-[#00d4ff]" aria-hidden />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-white md:text-xl">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#ff3366]">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-[#00d4ff]/90">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                    {item.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </MotionSection>
  )
}
