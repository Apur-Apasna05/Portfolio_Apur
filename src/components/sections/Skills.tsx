import { motion } from "framer-motion"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { SKILLS } from "../../data/portfolio"

export function Skills() {
  return (
    <MotionSection id="skills" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Skill matrix"
          title="Offensive · defensive stack"
          subtitle="Proficiency estimates based on labs, coursework, and hands-on build cycles."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, i) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#00ff9d]/20 bg-[#07121f]/80 p-5 shadow-[0_0_0_1px_rgba(0,212,255,0.06)] backdrop-blur-md transition-shadow hover:border-[#00ff9d]/45 hover:shadow-[0_0_40px_rgba(0,255,157,0.12)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00ff9d]/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-white">{skill.name}</h3>
                <span className="font-mono text-sm text-[#00d4ff]">{skill.percent}%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-900">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#00ff9d] via-[#00d4ff] to-[#ff3366]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.04 }}
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                clearance · tier {(skill.percent / 20).toFixed(0)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
