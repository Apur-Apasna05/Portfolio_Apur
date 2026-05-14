import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = { children: ReactNode; className?: string }

export function GlitchText({ children, className = "" }: Props) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute inset-0 z-0 text-[#00d4ff] opacity-70 mix-blend-screen"
        style={{ animation: "glitch-shift 3.2s infinite linear alternate" }}
        aria-hidden
      >
        {children}
      </span>
      <span
        className="pointer-events-none absolute inset-0 z-0 text-[#ff3366] opacity-60 mix-blend-screen"
        style={{
          animation: "glitch-shift 2.6s infinite linear alternate-reverse",
        }}
        aria-hidden
      >
        {children}
      </span>
    </span>
  )
}

export function GlitchHeading({ children, className = "" }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      <GlitchText>{children}</GlitchText>
    </motion.h1>
  )
}
