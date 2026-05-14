import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Code2, ExternalLink, Sparkles } from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"
import { MotionSection } from "../layout/MotionSection"
import { CURATED_PROJECTS, PERSON } from "../../data/portfolio"
import { useGitHubRepos, type GitHubRepo } from "../../hooks/useGitHubRepos"

type DisplayProject = {
  key: string
  title: string
  description: string
  stack: readonly string[] | string[]
  github: string
  live: string
  accent: string
  highlight?: boolean
}

const ACCENTS = [
  "from-emerald-500/25 to-teal-500/20",
  "from-sky-500/25 to-indigo-500/20",
  "from-amber-500/25 to-orange-500/20",
  "from-pink-500/25 to-rose-500/20",
  "from-lime-500/25 to-green-600/20",
  "from-cyan-500/25 to-blue-500/20",
] as const

function slugKey(s: string) {
  return s.trim().toLowerCase()
}

function accentFromName(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i) * (i + 1)) % ACCENTS.length
  return ACCENTS[h] ?? ACCENTS[0]
}

function mergeProjects(repos: GitHubRepo[]): DisplayProject[] {
  const highlighted = CURATED_PROJECTS.filter((p) => "highlight" in p && p.highlight)
  const restCurated = CURATED_PROJECTS.filter((p) => !("highlight" in p && p.highlight))

  const takenSlugs = new Set(
    CURATED_PROJECTS.map((p) => {
      const slug = (p as { slug?: string }).slug
      return slug ? slugKey(slug) : null
    }).filter((x): x is string => x !== null),
  )

  const fromApi: DisplayProject[] = [...repos]
    .sort((a, b) => {
      const ta = a.pushed_at ? new Date(a.pushed_at).getTime() : 0
      const tb = b.pushed_at ? new Date(b.pushed_at).getTime() : 0
      return tb - ta
    })
    .filter((r) => {
      if (slugKey(r.name) === slugKey(PERSON.githubUsername)) return false
      if (takenSlugs.has(slugKey(r.name))) return false
      return true
    })
    .map((r) => ({
      key: `gh-${r.id}`,
      title: r.name,
      description: r.description ?? "Public repository on GitHub — see README for details.",
      stack: r.language ? [r.language] : ["GitHub"],
      github: r.html_url,
      live: r.homepage && r.homepage.startsWith("http") ? r.homepage : "#contact",
      accent: accentFromName(r.name),
    }))

  const curatedDisplay: DisplayProject[] = [...highlighted, ...restCurated].map((p, i) => {
    const slug = (p as { slug?: string }).slug
    return {
      key: slug ? `cur-${slugKey(slug)}` : `cur-${slugKey(p.title)}-${i}`,
    title: p.title,
    description: p.description,
    stack: [...p.stack],
    github: p.github,
    live: p.live,
    accent: p.accent,
    highlight: "highlight" in p ? Boolean(p.highlight) : false,
    }
  })

  return [...curatedDisplay, ...fromApi]
}

function ProjectCard({
  title,
  description,
  stack,
  github,
  live,
  accent,
  highlight,
  i,
}: DisplayProject & { i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2
    setTilt({ x: px * -8, y: py * 8 })
  }

  const onLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: i * 0.05 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#060f18]/90 shadow-[0_0_0_1px_rgba(0,255,157,0.04)] transition-shadow hover:shadow-[0_0_45px_rgba(0,255,157,0.12)] ${
        highlight
          ? "border-fuchsia-500/55 ring-2 ring-fuchsia-500/30 hover:border-[#ff3366]/50"
          : "border-cyan-500/20 hover:border-[#00ff9d]/35"
      }`}
    >
      {highlight ? (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-fuchsia-400/50 bg-fuchsia-950/80 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-fuchsia-200 shadow-[0_0_20px_rgba(232,121,249,0.35)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Featured
        </div>
      ) : null}

      <div
        className={`relative h-40 bg-gradient-to-br ${accent} overflow-hidden`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22/%3E%3Cpath%20d%3D%22M30%200L60%2030%2030%2060%200%2030z%22%20fill%3D%22rgba(255,255,255,0.03)%22/%3E%3C/svg%3E')] opacity-80" />
        <p className="absolute bottom-4 left-4 font-display text-2xl font-black uppercase tracking-tighter text-white/90 drop-shadow-lg">
          {title
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </p>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060f18] via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[#00d4ff]/25 bg-[#00d4ff]/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#00d4ff]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition-colors hover:border-[#00ff9d]/50 hover:text-[#00ff9d]"
          >
            <Code2 className="h-4 w-4" aria-hidden />
            GitHub
          </a>
          <a
            href={live}
            target={live.startsWith("http") ? "_blank" : undefined}
            rel={live.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition-colors hover:border-[#00d4ff]/50 hover:text-[#00d4ff]"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {live.startsWith("http") ? "Live / site" : "Live demo"}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const gh = useGitHubRepos()
  const repoIds =
    gh.status === "ok" ? gh.repos.map((r) => `${r.id}-${r.pushed_at ?? ""}`).join() : ""

  const list = useMemo(
    () => mergeProjects(gh.status === "ok" ? gh.repos : []),
    [gh.status, repoIds],
  )

  return (
    <MotionSection id="projects" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Deployments"
          title="Signature builds"
          subtitle="Curated portfolio work merged with live repositories from GitHub — SheBuilds is featured."
        />

        {gh.status === "loading" ? (
          <p className="mb-8 font-mono text-xs text-[#00d4ff]/80">Syncing with GitHub API…</p>
        ) : null}
        {gh.status === "error" ? (
          <p className="mb-8 font-mono text-xs text-amber-400/90" role="status">
            {gh.message} Showing curated projects only.
          </p>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          {list.map(({ key, ...rest }, i) => (
            <ProjectCard key={key} {...rest} i={i} />
          ))}
        </div>
      </div>
    </MotionSection>
  )
}
