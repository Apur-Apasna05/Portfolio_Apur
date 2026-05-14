import { useCallback, useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine, ISourceOptions } from "@tsparticles/engine"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

export function ParticleField() {
  const [ready, setReady] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    void initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [reduced])

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 48, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#00ff9d", "#00d4ff", "#ff3366"] },
        opacity: { value: { min: 0.12, max: 0.45 } },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          distance: 120,
          color: "#00d4ff",
          opacity: 0.12,
          width: 1,
        },
      },
      detectRetina: true,
    }),
    [],
  )

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) node.setAttribute("data-particles", "1")
  }, [])

  if (reduced || !ready) return null

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      <Particles id="cyber-particles" className="h-full w-full" options={options} />
    </div>
  )
}
