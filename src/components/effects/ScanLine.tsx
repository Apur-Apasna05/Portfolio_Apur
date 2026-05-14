import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

export function ScanLine() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-x-0 h-[30vh] opacity-[0.07]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,212,255,0.35), transparent)",
          animation: "scan-move 9s linear infinite",
        }}
      />
    </div>
  )
}
