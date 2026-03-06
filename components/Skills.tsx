'use client'

import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiFramer, SiNodedotjs, SiExpress, SiGraphql,
  SiPostgresql, SiMongodb, SiPrisma,
  SiGit, SiDocker, SiVercel, SiFigma,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

type Skill = {
  name: string
  icon: React.ReactNode
}

type Category = {
  label: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Framer Motion', icon: <SiFramer /> },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'REST APIs', icon: <VscCode /> },
      { name: 'GraphQL', icon: <SiGraphql /> },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Prisma', icon: <SiPrisma /> },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'VS Code', icon: <VscCode /> },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-gold/60 text-sm font-mono uppercase tracking-widest">Chapter 02</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">Skills &amp; Technologies</h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-steel text-sm font-semibold uppercase tracking-widest mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -4 }}
                    className="group flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-gold/60 transition-all duration-200 cursor-default"
                  >
                    <span className="text-base text-steel group-hover:text-gold transition-colors">
                      {skill.icon}
                    </span>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
