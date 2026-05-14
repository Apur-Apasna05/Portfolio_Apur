import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })

  useEffect(() => {
    if (reduced) return
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseleave", leave)
    }
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-screen md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    >
      <div
        className="h-8 w-8 rounded-full border border-[#00ff9d]/60"
        style={{
          boxShadow:
            "0 0 20px rgba(0,255,157,0.35), inset 0 0 12px rgba(0,212,255,0.15)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff]" />
    </motion.div>
  )
}
