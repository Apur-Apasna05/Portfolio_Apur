import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = {
  kicker: string
  title: string
  subtitle?: string
  id?: string
}

export function SectionHeading({ kicker, title, subtitle, id }: Props) {
  return (
    <header id={id} className="mb-10 md:mb-14">
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-[#00ff9d]/90"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
      >
        <span className="text-glow-green">{title}</span>
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-3 max-w-2xl text-sm text-slate-400 md:text-base"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  )
}

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`glass-panel holo-card rounded-2xl p-6 shadow-[0_0_40px_rgba(0,212,255,0.06)] md:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
