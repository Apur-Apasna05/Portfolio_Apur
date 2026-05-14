import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Variant = "green" | "blue" | "red"

const ring: Record<Variant, string> = {
  green:
    "shadow-[0_0_24px_rgba(0,255,157,0.25)] hover:shadow-[0_0_36px_rgba(0,255,157,0.45)] border-[#00ff9d]/50",
  blue: "shadow-[0_0_24px_rgba(0,212,255,0.22)] hover:shadow-[0_0_36px_rgba(0,212,255,0.4)] border-[#00d4ff]/45",
  red: "shadow-[0_0_24px_rgba(255,51,102,0.22)] hover:shadow-[0_0_36px_rgba(255,51,102,0.38)] border-[#ff3366]/45",
}

type Common = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type AnchorNeon = Common & {
  href: string
  download?: boolean
  target?: string
  rel?: string
}

type ButtonNeon = Common & {
  href?: undefined
  onClick?: () => void
  type?: "button" | "submit"
}

export function NeonButton(props: AnchorNeon | ButtonNeon) {
  const { children, variant = "green", className = "" } = props
  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border bg-[#071018]/80 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${
            variant === "green"
              ? "rgba(0,255,157,0.5)"
              : variant === "blue"
                ? "rgba(0,212,255,0.45)"
                : "rgba(255,51,102,0.45)"
          }, transparent 55%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if ("href" in props && props.href) {
    const { href, download, target, rel } = props
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} ${ring[variant]} ${className}`}
      >
        {content}
      </motion.a>
    )
  }

  const { onClick, type = "button" } = props as ButtonNeon
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${ring[variant]} ${className}`}
    >
      {content}
    </motion.button>
  )
}
