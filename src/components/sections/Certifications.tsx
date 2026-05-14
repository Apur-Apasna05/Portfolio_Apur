import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { CERTIFICATIONS } from "../../data/portfolio"

export function Certifications() {
  return (
    <MotionSection id="certifications" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Credentials"
          title="Certification lattice"
          subtitle="Formal and project-backed credentials that validate depth across security and AI."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {CERTIFICATIONS.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-[#00d4ff]/25 bg-gradient-to-br from-[#071422]/95 to-[#030508]/95 p-6 shadow-[0_0_30px_rgba(0,212,255,0.08)] transition-shadow hover:border-[#00ff9d]/40 hover:shadow-[0_0_40px_rgba(0,255,157,0.15)]"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#00d4ff]/15 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ff3366]/35 bg-[#ff3366]/10">
                  <Award className="h-6 w-6 text-[#ff3366]" aria-hidden />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#00ff9d]">
                    {c.year}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{c.name}</h3>
                  <p className="mt-2 font-mono text-xs text-slate-400">{c.issuer}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
