import { useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, Code2, GitFork, Star } from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { PERSON } from "../../data/portfolio"
import { useGitHubRepos } from "../../hooks/useGitHubRepos"

function statUrl(params: string, cacheBust: string) {
  return `https://github-readme-stats.vercel.app/api?username=${PERSON.githubUsername}&${params}&_cb=${cacheBust}`
}

function langBars(repos: { language: string | null }[]) {
  const counts = new Map<string, number>()
  for (const r of repos) {
    if (!r.language) continue
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
  }
  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1])
  const max = entries[0]?.[1] ?? 1
  return entries.slice(0, 8).map(([lang, n]) => ({
    lang,
    pct: Math.round((n / max) * 100),
    count: n,
  }))
}

export function GitHubSection() {
  const u = PERSON.githubUsername
  const gh = useGitHubRepos()
  const cacheBust = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const stats = statUrl(
    "show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a1628&title_color=00ff9d&icon_color=00d4ff&text_color=9fb3c8",
    cacheBust,
  )
  const streak = `https://github-readme-streak-stats.herokuapp.com/?user=${encodeURIComponent(u)}&theme=dark&hide_border=true&background=0A1628&ring=00FF9D&fire=FF3366&currStreakLabel=00D4FF&sideLabels=00D4FF&_cb=${cacheBust}`
  const graph = `https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(u)}&theme=react-dark&hide_border=true&bg_color=0a1628&color=00ff9d&line=00d4ff&point=ffffff&_cb=${cacheBust}`
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(u)}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0a1628&title_color=00ff9d&text_color=9fb3c8&_cb=${cacheBust}`

  const sortedRepos =
    gh.status === "ok"
      ? [...gh.repos]
          .filter((r) => r.name.toLowerCase() !== u.toLowerCase())
          .sort((a, b) => {
            const ta = a.pushed_at ? new Date(a.pushed_at).getTime() : 0
            const tb = b.pushed_at ? new Date(b.pushed_at).getTime() : 0
            return tb - ta
          })
      : []

  const repoBars =
    gh.status === "ok"
      ? langBars(gh.repos.filter((r) => r.name.toLowerCase() !== u.toLowerCase()))
      : []

  const sheFirst =
    gh.status === "ok"
      ? (() => {
          const hi = sortedRepos.findIndex((r) => r.name.toLowerCase() === "shebuilds")
          if (hi <= 0) return sortedRepos
          const copy = [...sortedRepos]
          const [sp] = copy.splice(hi, 1)
          return sp ? [sp, ...copy] : sortedRepos
        })()
      : []

  return (
    <MotionSection id="github" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Telemetry"
          title="GitHub dashboard"
          subtitle="Readme stats plus a live repository index from the GitHub API (public data, updates on each visit)."
        />

        {gh.status === "loading" ? (
          <p className="mb-6 font-mono text-xs text-[#00d4ff]/80">Pulling repository manifest…</p>
        ) : null}
        {gh.status === "error" ? (
          <p className="mb-6 font-mono text-xs text-amber-400/90" role="status">
            {gh.message} Stats cards below may still load from CDN.
          </p>
        ) : null}

        {gh.status === "ok" ? (
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="glass-panel rounded-2xl border border-[#00ff9d]/20 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Public repos
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-[#00ff9d]">{sortedRepos.length}</p>
            </div>
            <div className="glass-panel rounded-2xl border border-[#00d4ff]/20 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Total stars
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-[#00d4ff]">
                {sortedRepos.reduce((s, r) => s + r.stargazers_count, 0)}
              </p>
            </div>
            <div className="glass-panel rounded-2xl border border-[#ff3366]/20 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Primary languages
              </p>
              <p className="mt-2 font-mono text-sm text-slate-300">
                {repoBars.length ? repoBars.map((b) => b.lang).join(" · ") : "—"}
              </p>
            </div>
          </div>
        ) : null}

        {gh.status === "ok" && repoBars.length > 0 ? (
          <div className="mb-10 rounded-2xl border border-cyan-500/25 bg-[#060f18]/80 p-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Languages by repo count
            </h3>
            <ul className="mt-4 space-y-3">
              {repoBars.map((b) => (
                <li key={b.lang}>
                  <div className="flex justify-between font-mono text-xs text-slate-400">
                    <span className="text-[#00ff9d]">{b.lang}</span>
                    <span>
                      {b.count} repo{b.count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.a
            href={`https://github.com/${u}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="block overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a1628]/50 shadow-[0_0_30px_rgba(0,212,255,0.1)]"
          >
            <img
              src={stats}
              alt={`${u} GitHub statistics`}
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </motion.a>
          <motion.a
            href={`https://github.com/${u}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="block overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a1628]/50 shadow-[0_0_30px_rgba(0,212,255,0.1)]"
          >
            <img
              src={streak}
              alt={`${u} contribution streak`}
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </motion.a>
          <motion.a
            href={`https://github.com/${u}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="block overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a1628]/50 shadow-[0_0_30px_rgba(0,212,255,0.1)] lg:col-span-2"
          >
            <img
              src={graph}
              alt={`${u} contribution activity graph`}
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </motion.a>
          <motion.div
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a1628]/50 shadow-[0_0_30px_rgba(0,212,255,0.1)] lg:col-span-2"
          >
            <img
              src={langs}
              alt={`${u} language usage`}
              className="h-auto w-full max-w-full"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        {gh.status === "ok" && sheFirst.length > 0 ? (
          <div className="mt-12">
            <h3 className="mb-4 font-display text-lg font-bold text-white">Repositories (live)</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {sheFirst.map((r) => {
                const featured = r.name.toLowerCase() === "shebuilds"
                return (
                  <motion.a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className={`block rounded-xl border p-4 transition-colors ${
                      featured
                        ? "border-fuchsia-500/50 bg-fuchsia-950/20 shadow-[0_0_24px_rgba(232,121,249,0.15)]"
                        : "border-white/10 bg-black/30 hover:border-[#00d4ff]/35"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-mono text-sm font-semibold text-[#00ff9d]">{r.name}</p>
                      {featured ? (
                        <span className="shrink-0 rounded border border-fuchsia-400/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-fuchsia-200">
                          SheBuilds
                        </span>
                      ) : null}
                    </div>
                    {r.description ? (
                      <p className="mt-2 line-clamp-2 text-xs text-slate-400">{r.description}</p>
                    ) : (
                      <p className="mt-2 text-xs italic text-slate-600">No description on GitHub</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-500">
                      {r.language ? (
                        <span className="flex items-center gap-1 text-[#00d4ff]">
                          <Code2 className="h-3.5 w-3.5" aria-hidden />
                          {r.language}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" aria-hidden />
                        {r.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" aria-hidden />
                        {r.forks_count}
                      </span>
                      {r.pushed_at ? (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" aria-hidden />
                          {new Date(r.pushed_at).toLocaleDateString()}
                        </span>
                      ) : null}
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        ) : null}

        <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500">
          <Code2 className="h-4 w-4 text-[#00ff9d]" aria-hidden />
          Stats images: github-readme-stats &amp; activity graph. Repository list: GitHub REST API
          (60 req/hr unauthenticated).
        </p>
      </div>
    </MotionSection>
  )
}
