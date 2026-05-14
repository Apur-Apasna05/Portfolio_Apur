import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { PERSON, CURATED_PROJECTS, SKILLS, SOCIALS } from "../../data/portfolio"

type Line =
  | { kind: "in"; text: string }
  | { kind: "out"; text: string; id: string }

function typeText(full: string, onUpdate: (s: string) => void, onDone: () => void, speed = 18) {
  let i = 0
  const id = window.setInterval(() => {
    i += 1
    onUpdate(full.slice(0, i))
    if (i >= full.length) {
      window.clearInterval(id)
      onDone()
    }
  }, speed)
  return () => window.clearInterval(id)
}

const WELCOME = `AA_DEFENSE_SHELL v2.6.0 — authorized simulation only.
Type 'help' for available commands.`

export function HackerTerminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: WELCOME, id: "boot" }])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const scrollRootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRootRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [lines])

  const pushOut = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random()}`
    setLines((prev) => [...prev, { kind: "out", text: "", id }])
    setBusy(true)
    return typeText(
      text,
      (partial) => {
        setLines((prev) =>
          prev.map((l) => (l.kind === "out" && l.id === id ? { ...l, text: partial } : l)),
        )
      },
      () => setBusy(false),
      14,
    )
  }, [])

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      if (cmd === "clear") {
        setLines([{ kind: "out", text: WELCOME, id: `boot-${Date.now()}` }])
        return
      }

      setLines((prev) => [...prev, { kind: "in", text: raw }])

      let out: string
      switch (cmd) {
        case "help":
          out = `Available commands:
  help       — show this message
  whoami     — operator profile
  skills     — stack proficiency list
  projects   — deployed build index
  socials    — external uplinks
  contact    — direct comms channels
  clear      — wipe terminal buffer`
          break
        case "whoami":
          out = `${PERSON.name}
${PERSON.role}
${PERSON.degree} · ${PERSON.college}
${PERSON.year} · CGPA ${PERSON.cgpa}
GitHub: github.com/${PERSON.githubUsername}
Swecha: code.swecha.org/APASNA`
          break
        case "skills":
          out = SKILLS.map((s) => `  · ${s.name.padEnd(18)} ${s.percent}%`).join("\n")
          break
        case "projects":
          out = `${CURATED_PROJECTS.map((p, i) => `  [${i + 1}] ${p.title}`).join("\n")}
  … + more repositories sync live from GitHub in the Projects section.`
          break
        case "socials":
          out = SOCIALS.map((s) => `  · ${s.label.padEnd(12)} ${s.href}`).join("\n")
          break
        case "contact":
          out = `Email : ${PERSON.email}
Phone : ${PERSON.phone}
Signal: request via encrypted mail preferred.`
          break
        default:
          out = `bash: command not found: ${raw}
Hint: type 'help' for command manifest.`
      }
      pushOut(out)
    },
    [pushOut],
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const v = input
    setInput("")
    runCommand(v)
  }

  return (
    <MotionSection id="terminal" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Subsystem"
          title="Interactive shell"
          subtitle="A sandboxed command surface for recruiters — no real system access."
        />

        <motion.div
          layout
          className="overflow-hidden rounded-2xl border border-[#00ff9d]/30 bg-[#020408]/95 shadow-[0_0_50px_rgba(0,255,157,0.12)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#071018] px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-[#ff3366]/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-[#00ff9d]/90" />
            <span className="ml-4 font-mono text-[11px] text-slate-500">
              zsh — aa@defense-grid — ~80x24
            </span>
          </div>

          <div
            ref={scrollRootRef}
            className="max-h-[min(520px,70vh)] min-h-[280px] cursor-text overflow-y-auto overflow-x-hidden overscroll-contain p-4 font-mono text-sm leading-relaxed text-slate-200 md:min-h-[320px] md:p-6 md:text-[13px]"
            onClick={() => inputRef.current?.focus()}
            onKeyDown={() => inputRef.current?.focus()}
            role="region"
            aria-label="Simulated terminal"
            tabIndex={-1}
          >
            <div className="space-y-3 whitespace-pre-wrap">
              {lines.map((line, idx) =>
                line.kind === "in" ? (
                  <p key={`in-${idx}`} className="text-[#00ff9d]">
                    <span className="text-[#ff3366]">➜</span>{" "}
                    <span className="text-[#00d4ff]">~</span> {line.text}
                  </p>
                ) : (
                  <p key={line.id} className="text-slate-300">
                    {line.text}
                  </p>
                ),
              )}
            </div>

            <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
              <span className="shrink-0 text-[#ff3366]" aria-hidden>
                ➜
              </span>
              <span className="shrink-0 text-[#00d4ff]" aria-hidden>
                ~
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="min-w-0 flex-1 bg-transparent text-[#00ff9d] outline-none placeholder:text-slate-600 disabled:opacity-50"
                placeholder={busy ? "streaming..." : "enter command..."}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  )
}
