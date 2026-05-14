import { AnimatePresence, motion } from "framer-motion"
import { Shield } from "lucide-react"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

type Props = {
  done: boolean
  onComplete: () => void
}

export function LoadingScreen({ done, onComplete }: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030508]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00ff9d]/40 bg-[#0a1628]/80 shadow-[0_0_40px_rgba(0,255,157,0.2)]"
          >
            <Shield className="h-10 w-10 text-[#00d4ff]" aria-hidden />
          </motion.div>
          <p className="font-display text-sm uppercase tracking-[0.4em] text-[#00ff9d]">
            Initializing
          </p>
          <p className="mt-2 font-mono text-xs text-slate-500">Secure channel · AES-256</p>
          {!reduced ? (
            <motion.div
              className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-slate-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
