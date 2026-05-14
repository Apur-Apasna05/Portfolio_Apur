import { Shield } from "lucide-react"
import { PERSON } from "../../data/portfolio"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#020408]/90 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <Shield className="h-4 w-4 text-[#00ff9d]" aria-hidden />
          <span>© {new Date().getFullYear()} {PERSON.name}. Built with React + Vite.</span>
        </div>
        <p className="max-w-md font-mono text-[11px] leading-relaxed text-slate-600">
          This interface is a portfolio simulation. No offensive tooling is executed in-browser.
        </p>
      </div>
    </footer>
  )
}
