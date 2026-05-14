import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01"

type Column = { y: number; speed: number; chars: string[] }

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let cols: Column[] = []
    let w = 0
    let h = 0
    let fontSize = 14
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fontSize = w < 640 ? 12 : 14
      ctx.font = `${fontSize}px JetBrains Mono, monospace`
      const count = Math.ceil(w / fontSize) + 1
      cols = Array.from({ length: count }, () => ({
        y: Math.random() * h,
        speed: 0.4 + Math.random() * 1.8,
        chars: Array.from({ length: 24 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      }))
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.fillStyle = "rgba(3, 5, 8, 0.12)"
      ctx.fillRect(0, 0, w, h)
      cols.forEach((col, i) => {
        const x = i * fontSize
        col.y += col.speed
        if (col.y > h + 40) {
          col.y = -Math.random() * 200
          col.speed = 0.4 + Math.random() * 1.8
        }
        for (let j = 0; j < col.chars.length; j++) {
          const y = col.y - j * fontSize
          if (y < -fontSize || y > h + fontSize) continue
          const head = j === 0
          ctx.fillStyle = head
            ? "rgba(185, 255, 220, 0.95)"
            : `rgba(0, 255, 157, ${0.12 + (1 - j / col.chars.length) * 0.35})`
          ctx.fillText(col.chars[j] ?? "0", x, y)
        }
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-35"
      aria-hidden
    />
  )
}
