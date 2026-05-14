import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Download, FolderKanban, Mail } from "lucide-react"
import { GlitchHeading } from "../ui/GlitchText"
import { NeonButton } from "../ui/NeonButton"
import { ProfilePortrait } from "../ui/ProfilePortrait"
import { HERO_TYPING, PERSON } from "../../data/portfolio"

function Typewriter({ words }: { words: readonly string[] }) {
  const [wi, setWi] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = words[wi] ?? ""
    if (!deleting && text === full && full.length > 0) {
      const pause = window.setTimeout(() => setDeleting(true), 1500)
      return () => clearTimeout(pause)
    }
    const speed = deleting ? 45 : 90
    const id = window.setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1))
      } else if (text.length > 0) {
        setText(full.slice(0, text.length - 1))
      } else {
        setDeleting(false)
        setWi((w) => (w + 1) % words.length)
      }
    }, speed)
    return () => clearTimeout(id)
  }, [text, deleting, wi, words])

  return (
    <span className="font-mono text-[#00d4ff] text-glow-blue">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-pulse bg-[#00ff9d] align-[-0.15em]" />
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="min-w-0 flex-1">
            <GlitchHeading>{PERSON.name}</GlitchHeading>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-slate-400 md:text-lg"
            >
              {PERSON.role}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex min-h-[2.5rem] flex-wrap items-center gap-2 font-mono text-base text-slate-300 md:text-xl"
            >
              <span className="text-[#ff3366]">$</span>
              <span className="text-slate-500">focus</span>
              <span className="text-[#00ff9d]">--vector</span>
              <Typewriter words={HERO_TYPING} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <NeonButton href="#projects" variant="green">
                <FolderKanban className="relative z-10 h-4 w-4" aria-hidden />
                View Projects
              </NeonButton>
              <NeonButton href={PERSON.resumePath} download variant="blue">
                <Download className="relative z-10 h-4 w-4" aria-hidden />
                Download Resume
              </NeonButton>
              <NeonButton href="#contact" variant="red">
                <Mail className="relative z-10 h-4 w-4" aria-hidden />
                Contact Me
              </NeonButton>
            </motion.div>

            <motion.a
              href="#about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-20 inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-[#00d4ff]"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
              Scroll to decrypt profile
            </motion.a>
          </div>

          <div className="flex shrink-0 justify-center lg:justify-end">
            <ProfilePortrait size="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
