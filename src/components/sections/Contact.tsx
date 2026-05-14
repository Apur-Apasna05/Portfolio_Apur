import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Link2, Mail, Phone, Send, UserRound } from "lucide-react"
import { GlassPanel, SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { PERSON, SOCIALS } from "../../data/portfolio"

const iconFor = (name: (typeof SOCIALS)[number]["icon"]) => {
  switch (name) {
    case "user":
      return UserRound
    case "code":
      return Code2
    case "link":
      return Link2
    case "mail":
      return Mail
    default:
      return Mail
  }
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sent")
    window.setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <MotionSection id="contact" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Uplink"
          title="Establish contact"
          subtitle="Encrypted-style form for recruiters and collaborators — messages are simulated client-side only."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassPanel>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#00ff9d]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-[#00d4ff]/60"
                  placeholder="Your designation"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#00ff9d]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-[#00d4ff]/60"
                  placeholder="you@domain.sec"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#00ff9d]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-[#00d4ff]/60"
                  placeholder="Mission parameters, collaboration scope, or internship signal..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#00ff9d]/45 bg-[#00ff9d]/10 py-3 font-display text-sm font-bold uppercase tracking-widest text-[#00ff9d] shadow-[0_0_24px_rgba(0,255,157,0.2)] transition-colors hover:bg-[#00ff9d]/20 sm:w-auto sm:px-10"
              >
                <Send className="h-4 w-4" aria-hidden />
                Transmit
              </motion.button>
              {status === "sent" ? (
                <p className="font-mono text-xs text-[#00d4ff]" role="status">
                  Packet queued (demo). Email {PERSON.email} for a real response.
                </p>
              ) : null}
            </form>
          </GlassPanel>

          <div className="flex flex-col justify-between gap-8">
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white">Direct channels</h3>
              <a
                href={`mailto:${PERSON.email}`}
                className="mt-4 flex items-center gap-3 font-mono text-sm text-slate-300 transition-colors hover:text-[#00ff9d]"
              >
                <Mail className="h-5 w-5 shrink-0 text-[#00d4ff]" aria-hidden />
                {PERSON.email}
              </a>
              <a
                href={`tel:${PERSON.phone.replace(/\s/g, "")}`}
                className="mt-3 flex items-center gap-3 font-mono text-sm text-slate-300 transition-colors hover:text-[#00ff9d]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#ff3366]" aria-hidden />
                {PERSON.phone}
              </a>
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
                Social graph
              </p>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => {
                  const Icon = iconFor(s.icon)
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00d4ff]/30 bg-[#071422]/80 text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-colors hover:border-[#00ff9d]/50 hover:text-[#00ff9d] hover:shadow-[0_0_28px_rgba(0,255,157,0.25)]"
                      aria-label={s.label}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
