'use client'

import { motion } from 'framer-motion'

type Experience = {
  role: string
  company: string
  period: string
  bullets: string[]
}

const experiences: Experience[] = [
  {
    role: 'Senior Frontend Developer',
    company: 'Company A',
    period: '2023 — Present',
    bullets: [
      'Led the redesign of the core product UI, reducing bounce rate by 34% and improving user satisfaction scores.',
      'Architected a component library used across 5 product teams, cutting UI development time by 40%.',
      'Mentored 3 junior developers, introducing code review practices and documentation standards.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Company B',
    period: '2022 — 2023',
    bullets: [
      'Built and maintained RESTful APIs serving 100k+ daily active users with 99.9% uptime.',
      'Migrated a monolithic application to a microservices architecture, improving deployment frequency by 3x.',
      'Collaborated closely with product and design teams to ship 12 features in 12 months.',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'Freelance',
    period: '2021 — 2022',
    bullets: [
      'Delivered 8 client websites and web applications, spanning e-commerce, SaaS, and portfolio projects.',
      'Developed full-stack applications using React, Node.js, and PostgreSQL from concept to deployment.',
      'Established a personal development workflow with CI/CD pipelines, automated testing, and code quality tools.',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-gold/60 text-sm font-mono uppercase tracking-widest">Chapter 04</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">The Journey</h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent" />

          <div className="space-y-12 pl-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-12 top-1.5 w-4 h-4 rounded-full border-2 border-gold bg-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-xl p-6 hover:border-gold/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-1">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{exp.role}</h3>
                      <div className="text-gold text-sm font-medium">{exp.company}</div>
                    </div>
                    <span className="text-text-secondary text-sm font-mono bg-background px-3 py-1 rounded-full border border-border self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                        <span className="text-gold mt-1.5 text-xs">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
