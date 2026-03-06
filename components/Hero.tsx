'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const codeLines = [
  'const developer = {',
  '  name: "G3nosss",',
  '  role: "Full-Stack Developer",',
  '  passion: "Crafting digital experiences",',
  '  stack: ["Next.js", "TypeScript",',
  '          "Node.js", "PostgreSQL"],',
  '  coffee: Infinity,',
  '  motto: "Code is poetry.",',
  '};',
]

const heroWords = ['I', "don't", 'just', 'write', 'code.', 'I', 'craft', 'experiences.']

export default function Hero() {
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= codeLines.length) return

    const line = codeLines[currentLine]
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setTypedLines(prev => {
          const updated = [...prev]
          updated[currentLine] = line.slice(0, currentChar)
          return updated
        })
        setCurrentChar(c => c + 1)
      }, 35)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-steel/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] border border-gold/30 px-3 py-1.5 rounded-full bg-gold/5">
                Full-Stack Developer &amp; Digital Craftsman
              </span>
            </motion.div>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {heroWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-text-secondary text-lg leading-relaxed max-w-lg"
            >
              I turn complex problems into elegant, user-centric solutions. From backend
              architecture to pixel-perfect interfaces — every line of code is a deliberate
              design decision in the story I&apos;m building.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-gold/20"
              >
                See My Work
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-3 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                Let&apos;s Talk
              </button>
            </motion.div>
          </div>

          {/* Right side — Code block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            {/* Glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 to-steel/10 rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-text-secondary text-xs font-mono">developer.ts</span>
              </div>
              {/* Code content */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[280px]">
                {typedLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-text-secondary/40 w-6 text-right mr-4 select-none text-xs">
                      {i + 1}
                    </span>
                    <span className={
                      line.includes(':') && !line.includes('//') && !line.startsWith('const') && !line.startsWith('}')
                        ? 'text-steel'
                        : line.startsWith('const')
                        ? 'text-gold'
                        : line.startsWith('}')
                        ? 'text-gold'
                        : 'text-text-primary'
                    }>
                      {line}
                      {i === currentLine && currentLine < codeLines.length && (
                        <span className="inline-block w-2 h-4 bg-gold animate-pulse ml-0.5 align-middle" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-secondary text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border border-border rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
