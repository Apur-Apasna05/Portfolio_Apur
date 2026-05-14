import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

const COLS = 18

export function BinaryStream() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] flex justify-between overflow-hidden opacity-[0.06]"
      aria-hidden
    >
      {Array.from({ length: COLS }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 text-[10px] font-mono text-[#00ff9d]"
          style={{
            animation: `binary-fall ${14 + (i % 5) * 2}s linear infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {Array.from({ length: 40 }).map((__, j) => (
            <span key={j}>{(i + j) % 2}</span>
          ))}
        </div>
      ))}
    </div>
  )
}
