import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Activity,
  Globe,
  Key,
  Lock,
  ScanSearch,
  ShieldAlert,
  Zap,
} from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { TOOLS } from "../../data/portfolio"

const iconMap = {
  scan: ScanSearch,
  globe: Globe,
  zap: Zap,
  activity: Activity,
  key: Key,
  lock: Lock,
  "shield-alert": ShieldAlert,
} as const

export function Tools() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <MotionSection id="tools" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Arsenal"
          title="Cyber tool showcase"
          subtitle="Authorized-use tooling cards with terminal-style reveals on interaction."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => {
            const Icon = iconMap[tool.icon]
            const isOpen = open === tool.name
            return (
              <motion.button
                key={tool.name}
                type="button"
                layout
                onClick={() => setOpen(isOpen ? null : tool.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                className={`text-left transition-shadow ${
                  isOpen
                    ? "border-glow-green shadow-[0_0_36px_rgba(0,255,157,0.18)]"
                    : "hover:shadow-[0_0_28px_rgba(0,212,255,0.15)]"
                } group relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#050c14]/90 p-5 backdrop-blur-md`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00d4ff]/35 bg-[#00d4ff]/10 text-[#00d4ff]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold text-white">{tool.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#00ff9d]/70">
                      {isOpen ? "./verbose --on" : "./scan --brief"}
                    </p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-xs leading-relaxed text-slate-300">
                        <p className="mb-2 text-[#00ff9d]">root@defense-grid:~# info {tool.name.toLowerCase()}</p>
                        <p>{tool.desc}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="short"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 line-clamp-2 text-sm text-slate-400"
                    >
                      {tool.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </MotionSection>
  )
}
