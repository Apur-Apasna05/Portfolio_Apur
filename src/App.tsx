import { useLayoutEffect, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MatrixRain } from "./components/effects/MatrixRain"
import { CyberGrid } from "./components/effects/CyberGrid"
import { ScanLine } from "./components/effects/ScanLine"
import { BinaryStream } from "./components/effects/BinaryStream"
import { ParticleField } from "./components/effects/ParticleField"
import { Navbar } from "./components/layout/Navbar"
import { CustomCursor } from "./components/layout/CustomCursor"
import { ScrollProgress } from "./components/layout/ScrollProgress"
import { LoadingScreen } from "./components/layout/LoadingScreen"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Skills } from "./components/sections/Skills"
import { Tools } from "./components/sections/Tools"
import { Projects } from "./components/sections/Projects"
import { Experience } from "./components/sections/Experience"
import { Certifications } from "./components/sections/Certifications"
import { HackerTerminal } from "./components/sections/HackerTerminal"
import { GitHubSection } from "./components/sections/GitHubSection"
import { Contact } from "./components/sections/Contact"
import { Footer } from "./components/sections/Footer"
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion"
import { scrollWindowToTop } from "./utils/scrollToTop"

export default function App() {
  const [loading, setLoading] = useState(true)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ms = reduced ? 200 : 1600
    const t = window.setTimeout(() => setLoading(false), ms)
    return () => window.clearTimeout(t)
  }, [reduced])

  useLayoutEffect(() => {
    if (loading) return
    if (window.location.hash === "#github") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
    }
    scrollWindowToTop()
  }, [loading])

  /** Late layout (fonts, images, canvas) can restore scroll position on GitHub Pages. */
  useEffect(() => {
    if (loading) return
    scrollWindowToTop()
    const onLoad = () => scrollWindowToTop()
    window.addEventListener("load", onLoad)
    const t0 = window.setTimeout(scrollWindowToTop, 0)
    const t1 = window.setTimeout(scrollWindowToTop, 120)
    const t2 = window.setTimeout(scrollWindowToTop, 380)
    return () => {
      window.removeEventListener("load", onLoad)
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [loading])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)")
    const apply = () => {
      if (mq.matches && !reduced) document.body.classList.add("cyber-hide-cursor")
      else document.body.classList.remove("cyber-hide-cursor")
    }
    apply()
    mq.addEventListener("change", apply)
    return () => {
      mq.removeEventListener("change", apply)
      document.body.classList.remove("cyber-hide-cursor")
    }
  }, [reduced])

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-[#00ff9d] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-black"
      >
        Skip to content
      </a>

      <LoadingScreen done={!loading} onComplete={() => {}} />

      <CustomCursor />
      <ScrollProgress />

      <div className="relative min-h-screen bg-[#030508]">
        <MatrixRain />
        <ParticleField />
        <CyberGrid />
        <BinaryStream />
        <ScanLine />

        <AnimatePresence>
          {!loading ? (
            <motion.div
              key="shell"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.45 }}
              className="relative z-10"
            >
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Tools />
                <Projects />
                <Experience />
                <Certifications />
                <HackerTerminal />
                <GitHubSection />
                <Contact />
                <Footer />
              </main>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  )
}
