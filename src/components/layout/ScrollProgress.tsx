import { useScrollProgress } from "../../hooks/useScrollProgress"

export function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#00ff9d] via-[#00d4ff] to-[#ff3366] shadow-[0_0_12px_rgba(0,255,157,0.5)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
