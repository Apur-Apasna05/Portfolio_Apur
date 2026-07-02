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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus("error")
      setStatusMessage("Uplink failed: VITE_WEB3FORMS_ACCESS_KEY is not configured in environment variables.")
      return
    }

    setStatus("sending")
    setStatusMessage("")

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", accessKey)
    formData.append("subject", `New message from ${formData.get("name")} (Portfolio)`)
    formData.append("from_name", "Cybersecurity Portfolio Uplink")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setStatus("sent")
        setStatusMessage("Transmission successful! Message packets successfully routed to destination.")
        e.currentTarget.reset()
      } else {
        setStatus("error")
        setStatusMessage(data.message || "Uplink rejected packets. Transmission failed.")
      }
    } catch (error) {
      setStatus("error")
      setStatusMessage("Transmission failed: Link connection timed out.")
    }

    window.setTimeout(() => {
      setStatus("idle")
      setStatusMessage("")
    }, 6000)
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
                disabled={status === "sending"}
                whileHover={status === "sending" ? {} : { scale: 1.02 }}
                whileTap={status === "sending" ? {} : { scale: 0.98 }}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#00ff9d]/45 py-3 font-display text-sm font-bold uppercase tracking-widest text-[#00ff9d] shadow-[0_0_24px_rgba(0,255,157,0.2)] transition-colors sm:w-auto sm:px-10 ${
                  status === "sending"
                    ? "bg-[#00ff9d]/5 opacity-60 cursor-not-allowed"
                    : "bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20"
                }`}
              >
                <Send className={`h-4 w-4 ${status === "sending" ? "animate-pulse" : ""}`} aria-hidden />
                {status === "sending" ? "Transmitting..." : "Transmit"}
              </motion.button>
              {status === "sent" ? (
                <p className="font-mono text-xs text-[#00ff9d]" role="status">
                  {statusMessage}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="font-mono text-xs text-[#ff3366]" role="status">
                  {statusMessage}
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
