'use client'

import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const TOTAL_FRAMES = 151

export default function HeroScroll() {
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentFrame, setCurrentFrame] = useState('/frames/ezgif-frame-001.jpg')
  const containerRef = useRef<HTMLDivElement>(null)

  // Loading screen: fade out after 1.8s
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Preload ALL 151 frames on mount for smooth scrubbing
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
    }
  }, [])

  // Scroll progress + frame scrubbing + navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.min(Math.max(-top / (height - window.innerHeight), 0), 1)
      setScrollProgress(progress)

      // Image frame scrubbing
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)) + 1,
        TOTAL_FRAMES
      )
      setCurrentFrame(
        `/frames/ezgif-frame-${String(frameIndex).padStart(3, '0')}.jpg`
      )

      // Hide navbar while inside scroll section, show when past it
      const nav = document.querySelector('nav') as HTMLElement | null
      if (nav) {
        if (progress < 0.95) {
          nav.style.opacity = '0'
          nav.style.pointerEvents = 'none'
        } else {
          nav.style.opacity = '1'
          nav.style.pointerEvents = 'auto'
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Reset navbar on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
      const nav = document.querySelector('nav') as HTMLElement | null
      if (nav) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'auto'
      }
    }
  }, [])

  const sp = scrollProgress

  // --- Text phase opacities (never overlap) ---
  const p1 =
    sp < 0.22
      ? Math.min(sp / 0.08, 1)
      : Math.max(1 - (sp - 0.22) / 0.05, 0)

  const p2 =
    sp < 0.25 ? 0
    : sp < 0.35 ? (sp - 0.25) / 0.10
    : sp < 0.45 ? 1
    : Math.max(1 - (sp - 0.45) / 0.05, 0)

  const p3 =
    sp < 0.50 ? 0
    : sp < 0.60 ? (sp - 0.50) / 0.10
    : sp < 0.70 ? 1
    : Math.max(1 - (sp - 0.70) / 0.05, 0)

  const p4 =
    sp < 0.75 ? 0
    : Math.min((sp - 0.75) / 0.10, 1)

  const phaseBase: React.CSSProperties = {
    pointerEvents: 'none',
    position: 'fixed',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    transition: 'opacity 0.15s ease',
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

      {/* ── 500vh Scroll Section ── */}
      <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
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
          {/* ── Background: frame scrubbing with cinematic zoom ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
            <img
              src={currentFrame}
              alt="hero"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                opacity: 0.85,
                transform: `scale(${1 + sp * 1.4}) translateY(${sp * -12}%)`,
                transformOrigin: 'center top',
                transition: 'transform 0.05s linear',
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
            style={{
              ...phaseBase,
              opacity: p1,
              transform: `translateY(${(1 - p1) * 40}px)`,
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
            style={{
              ...phaseBase,
              opacity: p2,
              transform: `translateY(${(1 - p2) * 40}px)`,
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
            style={{
              ...phaseBase,
              opacity: p3,
              transform: `translateY(${(1 - p3) * 40}px)`,
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
                React • Next.js • TypeScript • Node.js
              </p>
            </div>
          </div>

          {/* ── Phase 4 — "See my work" centered bottom ── */}
          <div
            style={{
              ...phaseBase,
              opacity: p4,
              transform: `translateY(${(1 - p4) * 40}px)`,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '6rem',
              textAlign: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 4px 32px rgba(0,0,0,0.7)',
                }}
              >
                See my work
              </h2>
              <FiChevronDown
                size={40}
                style={{
                  color: '#d4d4d8',
                  margin: '1rem auto 0',
                  display: 'block',
                  animation: 'bounce 1.2s infinite',
                }}
              />
            </div>
          </div>

          {/* ── Scroll indicator (disappears after scrolling starts) ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 20,
              pointerEvents: 'none',
              opacity: sp > 0.02 ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          >
            <span
              style={{
                color: '#a1a1aa',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
              }}
            >
              SCROLL
            </span>
            <div
              style={{
                width: '1.25rem',
                height: '2rem',
                border: '1px solid #52525b',
                borderRadius: '9999px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.375rem',
              }}
            >
              <div
                style={{
                  width: '0.25rem',
                  height: '0.375rem',
                  background: '#a1a1aa',
                  borderRadius: '9999px',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* bounce keyframes */}
      <style>{`\n        @keyframes bounce {\n          0%, 100% { transform: translateY(0); }\n          50% { transform: translateY(10px); }\n        }\n      `}</style>
    </>
  )
}