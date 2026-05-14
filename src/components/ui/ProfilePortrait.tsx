import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { PERSON } from "../../data/portfolio"

const sizes = {
  hero: "h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72",
  about: "h-40 w-40 shrink-0 sm:h-44 sm:w-44",
} as const

type SizeKey = keyof typeof sizes

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

export function ProfilePortrait({ size = "hero" }: { size?: SizeKey }) {
  const reduced = usePrefersReducedMotion()

  const motionProps =
    size === "hero"
      ? {
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: 1, scale: 1 },
          transition,
        }
      : {
          initial: { opacity: 0, scale: 0.92 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "-12%" as const },
          transition: { ...transition, duration: reduced ? 0.01 : 0.65 },
        }

  return (
    <motion.div {...motionProps} className={`relative ${sizes[size]}`}>
      <div
        className="absolute -inset-[2px] rounded-full opacity-90 blur-[2px]"
        style={{
          background: "conic-gradient(from 120deg, #00ff9d, #00d4ff, #ff3366, #00ff9d)",
        }}
        aria-hidden
      />
      <div className="relative h-full w-full rounded-full bg-[#030508] p-[3px]">
        <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10">
          <img
            src={PERSON.profileImage}
            alt={PERSON.profileAlt}
            width={512}
            height={512}
            className="h-full w-full object-cover object-[50%_18%]"
            decoding="async"
            fetchPriority={size === "hero" ? "high" : "auto"}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,255,157,0.12) 0%, transparent 40%, rgba(0,212,255,0.08) 100%)",
            }}
            aria-hidden
          />
          {!reduced ? (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              aria-hidden
            >
              <div
                className="absolute inset-x-0 h-[28%] bg-gradient-to-b from-transparent via-[#00d4ff]/25 to-transparent"
                style={{
                  animation: "profile-scan 4.5s ease-in-out infinite",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_40px_rgba(0,255,157,0.25),inset_0_0_24px_rgba(0,212,255,0.08)]"
        aria-hidden
      />
    </motion.div>
  )
}
