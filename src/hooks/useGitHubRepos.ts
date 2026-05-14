import { useEffect, useState } from "react"
import { PERSON } from "../data/portfolio"

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string | null
  updated_at: string | null
}

type State =
  | { status: "idle" | "loading"; repos: GitHubRepo[] }
  | { status: "ok"; repos: GitHubRepo[] }
  | { status: "error"; repos: GitHubRepo[]; message: string }

export function useGitHubRepos() {
  const [state, setState] = useState<State>({ status: "idle", repos: [] })

  useEffect(() => {
    const user = PERSON.githubUsername
    const ac = new AbortController()
    setState({ status: "loading", repos: [] })

    void (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=100&type=owner`,
          {
            signal: ac.signal,
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          },
        )
        if (!res.ok) {
          setState({
            status: "error",
            repos: [],
            message: res.status === 403 ? "GitHub API rate limit — try again later." : `HTTP ${res.status}`,
          })
          return
        }
        const data = (await res.json()) as GitHubRepo[]
        const visible = data.filter((r) => !r.fork && !r.archived)
        setState({ status: "ok", repos: visible })
      } catch (e) {
        if ((e as Error).name === "AbortError") return
        setState({ status: "error", repos: [], message: "Could not load repositories." })
      }
    })()

    return () => ac.abort()
  }, [])

  return state
}
