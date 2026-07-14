import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

type Props = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
  className = "",
}: Props) {
  const [display, setDisplay] = useState<number | string>(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration)
      const eased = 1 - (1 - t) ** 3
      const currentVal = eased * value
      
      if (Number.isInteger(value)) {
        setDisplay(Math.round(currentVal))
      } else {
        setDisplay(currentVal.toFixed(1))
      }

      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
