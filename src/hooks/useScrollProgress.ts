import { useEffect, useState } from "react"

export function useScrollProgress(): number {
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const height = doc.scrollHeight - doc.clientHeight
      const next = height > 0 ? (scrollTop / height) * 100 : 0
      setP(Math.min(100, Math.max(0, next)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return p
}
