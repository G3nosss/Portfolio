'use client'

import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const TOTAL_FRAMES = 151
const SCROLL_HEIGHT = '900vh'

function getFrameSrc(index: number) {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`
}

export default function HeroScroll() {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Refs for RAF-based smooth scrubbing (no React re-render on every frame)
  const rawProgressRef = useRef(0)
  const smoothProgressRef = useRef(0)
  const spRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  // Text phase div refs — updated directly in RAF loop
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2Ref = useRef<HTMLDivElement>(null)
  const phase3Ref = useRef<HTMLDivElement>(null)
  const phase4Ref = useRef<HTMLDivElement>(null)

  // Navbar ref
  const navHiddenRef = useRef(false)

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Preload all frames
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image()
      img.src = getFrameSrc(i)
    }
  }, [])

  // Scroll listener + RAF smooth loop
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      rawProgressRef.current = Math.min(
        Math.max(-top / (height - window.innerHeight), 0),
        1
      )
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Smooth interpolation — increase 0.12 for faster catch-up, decrease for more lag
      smoothProgressRef.current = lerp(
        smoothProgressRef.current,
        rawProgressRef.current,
        0.12
      )
      const sp = smoothProgressRef.current
      spRef.current = sp

      // --- Update background frame directly on DOM node ---
      const frameIndex = Math.min(
        Math.floor(sp * (TOTAL_FRAMES - 1)) + 1,
        TOTAL_FRAMES
      )
      const newSrc = getFrameSrc(frameIndex)
      if (imgRef.current && imgRef.current.src !== newSrc) {
        // Use absolute URL comparison
        if (!imgRef.current.src.endsWith(newSrc)) {
          imgRef.current.src = newSrc
        }
      }

      // --- Navbar hide/show ---
      const nav = document.querySelector('nav') as HTMLElement | null
      if (nav) {
        if (sp < 0.95 && !navHiddenRef.current) {
          nav.style.opacity = '0'
          nav.style.pointerEvents = 'none'
          navHiddenRef.current = true
        } else if (sp >= 0.95 && navHiddenRef.current) {
          nav.style.opacity = '1'
          nav.style.pointerEvents = 'auto'
          navHiddenRef.current = false
        }
      }

      // --- Phase opacities (smooth, non-overlapping) ---
      const p1 =
        sp < 0.18
          ? Math.min(sp / 0.06, 1)
          : Math.max(1 - (sp - 0.18) / 0.06, 0)

      const p2 =
        sp < 0.26 ? 0
        : sp < 0.36 ? (sp - 0.26) / 0.10
        : sp < 0.46 ? 1
        : Math.max(1 - (sp - 0.46) / 0.06, 0)

      const p3 =
        sp < 0.52 ? 0
        : sp < 0.62 ? (sp - 0.52) / 0.10
        : sp < 0.72 ? 1
        : Math.max(1 - (sp - 0.72) / 0.06, 0)

      const p4 =
        sp < 0.78 ? 0
        : Math.min((sp - 0.78) / 0.10, 1)

      const applyPhase = (el: HTMLDivElement | null, p: number) => {
        if (!el) return
        el.style.opacity = String(p)
        el.style.transform = `translateY(${(1 - p) * 36}px)`
      }

      applyPhase(phase1Ref.current, p1)
      applyPhase(phase2Ref.current, p2)
      applyPhase(phase3Ref.current, p3)
      applyPhase(phase4Ref.current, p4)

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const nav = document.querySelector('nav') as HTMLElement | null
      if (nav) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'auto'
      }
    }
  }, [])

  const phaseBase: React.CSSProperties = {
    pointerEvents: 'none',
    position: 'fixed',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    willChange: 'opacity, transform',
  }

  return (
    <>
      {/* ── Loading Screen ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto',
          transition: 'opacity 0.6s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontSize: '3.5rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#C9A96E',
            userSelect: 'none',
          }}
        >
          {'<G/>'}
        </span>
        <p
          style={{
            marginTop: '1.25rem',
            color: '#8A8F9E',
            fontSize: '0.7rem',
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Loading Experience
        </p>
      </div>

      {/* ── Scroll Section ── */}
      <div ref={containerRef} style={{ height: SCROLL_HEIGHT, position: 'relative' }}>
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* ── Background: frame scrubbing, NO zoom ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={getFrameSrc(1)}
              alt="hero background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                opacity: 0.88,
                willChange: 'contents',
              }}
            />
            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.38)',
                zIndex: 1,
              }}
            />
          </div>

          {/* ── Phase 1 — "Your Name." centered ── */}
          <div
            ref={phase1Ref}
            style={{
              ...phaseBase,
              opacity: 0,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 1.5rem',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                }}
              >
                Your Name.
              </h1>
              <p
                style={{
                  marginTop: '1rem',
                  color: '#d4d4d8',
                  fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Full Stack Web Developer
              </p>
            </div>
          </div>

          {/* ── Phase 2 — Left aligned ── */}
          <div
            ref={phase2Ref}
            style={{
              ...phaseBase,
              opacity: 0,
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '0 clamp(2rem, 8vw, 6rem)',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                  maxWidth: '700px',
                }}
              >
                I build digital experiences.
              </h2>
              <p
                style={{
                  marginTop: '1rem',
                  color: '#d4d4d8',
                  fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                  maxWidth: '500px',
                }}
              >
                From responsive UIs to scalable full-stack applications.
              </p>
            </div>
          </div>

          {/* ── Phase 3 — Right aligned ── */}
          <div
            ref={phase3Ref}
            style={{
              ...phaseBase,
              opacity: 0,
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0 clamp(2rem, 8vw, 6rem)',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                  maxWidth: '700px',
                }}
              >
                Bridging design and code.
              </h2>
              <p
                style={{
                  marginTop: '1rem',
                  color: '#d4d4d8',
                  fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                }}
              >
                React · Next.js · TypeScript · Node.js
              </p>
            </div>
          </div>

          {/* ── Phase 4 — "See my work" bottom center ── */}
          <div
            ref={phase4Ref}
            style={{
              ...phaseBase,
              opacity: 0,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '6rem',
              textAlign: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                }}
              >
                See my work
              </h2>
              <FiChevronDown
                size={36}
                style={{
                  color: '#d4d4d8',
                  marginTop: '1rem',
                  animation: 'bounce 1.5s infinite',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </>
  )
}