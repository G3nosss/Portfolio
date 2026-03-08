'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import Image from 'next/image'

const panelStyle = (visible: boolean): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(24px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
})

export default function HeroScroll() {
  const [loadingDone, setLoadingDone] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [imgError, setImgError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Loading screen: fade out after 1800ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setScrollProgress(progress)
      if (window.scrollY > 10) {
        setHasScrolled(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sp = scrollProgress

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {!loadingDone && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col items-center justify-center"
          >
            {/* Logo SVG — bright white strokes for visibility */}
            <motion.svg
              viewBox="0 0 100 100"
              width="96"
              height="96"
              fill="none"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Outer A shape */}
              <path
                d="M 15 85 L 50 15 L 85 85"
                stroke="white"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeOpacity={0.9}
              />
              {/* Crossbar */}
              <path
                d="M 30 62 L 70 62"
                stroke="white"
                strokeWidth={4}
                strokeLinecap="round"
                strokeOpacity={0.9}
              />
            </motion.svg>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-zinc-400 text-xs font-mono tracking-[0.35em] uppercase mt-5"
            >
              Loading Experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 500vh Scroll Section */}
      <section>
        <div ref={containerRef} className="relative h-[500vh]">
          {/* Sticky viewport */}
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            {/* Background image layer */}
            <div
              className="absolute inset-0 z-0"
              style={{
                transform: `scale(${1 + sp * 0.25})`,
                transition: 'transform 0.1s linear',
                transformOrigin: 'center center',
              }}
            >
              {!imgError ? (
                <Image
                  src="/hero.png"
                  alt="Hero background"
                  fill
                  priority
                  className="object-cover"
                  style={{ opacity: 0.78 }}
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback gradient if image missing */
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" />
              )}
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 z-10" />
            </div>

            {/* Phase 1 — Your Name */}
            <div
              className="absolute inset-0 z-10 flex pointer-events-none justify-center items-center text-center px-6"
              style={panelStyle(sp >= 0 && sp < 0.22)}
            >
              <div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-lg">
                  Your Name.
                </h1>
                <p className="text-zinc-300 text-base sm:text-xl mt-4 font-mono tracking-widest">
                  Full Stack Web Developer
                </p>
              </div>
            </div>

            {/* Phase 2 — I build digital experiences */}
            <div
              className="absolute inset-0 z-10 flex pointer-events-none justify-center items-center px-8 sm:px-20"
              style={panelStyle(sp >= 0.25 && sp < 0.45)}
            >
              <div>
                <h2 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                  I build digital experiences.
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg mt-4 max-w-xl">
                  From responsive UIs to scalable full-stack applications.
                </p>
              </div>
            </div>

            {/* Phase 3 — Bridging design and code */}
            <div
              className="absolute inset-0 z-10 flex pointer-events-none justify-end items-center px-8 sm:px-20"
              style={panelStyle(sp >= 0.50 && sp < 0.68)}
            >
              <div className="text-right">
                <h2 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                  Bridging design and code.
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg mt-4 font-mono">
                  React • Next.js • TypeScript • Node.js
                </p>
              </div>
            </div>

            {/* Phase 4 — See my work */}
            <div
              className="absolute inset-0 z-10 flex pointer-events-none justify-center items-end pb-24 text-center"
              style={panelStyle(sp >= 0.75 && sp < 0.92)}
            >
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                  See my work
                </h2>
                <FiChevronDown
                  size={40}
                  className="text-zinc-300 animate-bounce mx-auto mt-4"
                />
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
              style={{
                opacity: hasScrolled ? 0 : 1,
                transition: 'opacity 0.5s ease',
              }}
            >
              <span className="text-zinc-400 text-xs uppercase tracking-[0.3em]">SCROLL</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-5 h-8 border border-zinc-500 rounded-full flex justify-center pt-1.5"
              >
                <div className="w-1 h-1.5 bg-zinc-400 rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}