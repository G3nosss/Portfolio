'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '10+', label: 'Happy Clients' },
  { value: '∞', label: 'Cups of Coffee' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-gold/60 text-sm font-mono uppercase tracking-widest">Chapter 01</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">About Me</h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold to-steel rounded-2xl blur opacity-30" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-card to-background border-2 border-gold/40 rounded-2xl flex items-center justify-center">
                <span className="text-7xl font-bold font-mono text-gold/40">G</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="space-y-6">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-semibold text-text-primary"
            >
              A developer who believes great software tells a story.
            </motion.h3>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 text-text-secondary leading-relaxed"
            >
              <p>
                My journey into development started not with a textbook, but with curiosity.
                I wanted to understand how the web worked — and once I started pulling threads,
                I couldn&apos;t stop. What began as weekend experiments evolved into a craft I take
                deeply seriously.
              </p>
              <p>
                Over the past three years, I&apos;ve worked across the full stack — architecting
                scalable APIs, designing intuitive interfaces, and optimizing systems that need
                to perform under pressure. I don&apos;t just build features; I think about the
                people who will use them.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m studying design systems, exploring new technologies,
                or contributing to open source. I believe the best developers are forever
                students — and I embrace that wholeheartedly.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
            >
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
