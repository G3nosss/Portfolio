'use client'

import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

type Project = {
  title: string
  description: string
  tech: string[]
  live?: string
  source?: string
  featured?: boolean
  gradient: string
}

const projects: Project[] = [
  {
    title: 'Aether — Real-Time Collaboration Platform',
    description:
      'A full-stack productivity suite enabling real-time document collaboration, task management, and team communication. Built with a microservices architecture, featuring WebSocket-powered live updates, end-to-end encryption, and a custom rich-text editor. Engineered to handle thousands of concurrent users without breaking a sweat.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Redis', 'Docker'],
    live: '#',
    source: '#',
    featured: true,
    gradient: 'from-gold/20 via-card to-steel/20',
  },
  {
    title: 'Luminary — Developer Analytics Dashboard',
    description:
      'A comprehensive analytics platform for engineering teams. Tracks code quality metrics, deployment frequencies, and team velocity with beautiful, interactive visualizations.',
    tech: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Prisma'],
    live: '#',
    source: '#',
    gradient: 'from-steel/20 to-card',
  },
  {
    title: 'Nexus — API Gateway & Auth Service',
    description:
      'A production-ready API gateway with built-in JWT authentication, rate limiting, request routing, and a web-based management dashboard.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
    live: '#',
    source: '#',
    gradient: 'from-gold/10 to-card',
  },
  {
    title: 'Spectrum — Design System',
    description:
      'A comprehensive React component library with 50+ accessible, themeable components, complete Storybook documentation, and automated visual regression tests.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    live: '#',
    source: '#',
    gradient: 'from-card to-steel/20',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Projects() {
  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-gold/60 text-sm font-mono uppercase tracking-widest">Chapter 03</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">Selected Work</h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group mb-12 relative bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500"
          >
            {/* Shimmer border on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 via-steel/10 to-gold/10 blur-sm" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Gradient image area */}
              <div className={`h-64 lg:h-auto bg-gradient-to-br ${featured.gradient} flex items-center justify-center p-12`}>
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-gold/30 mb-2">{`{}`}</div>
                  <div className="text-text-secondary text-sm font-mono">Featured Project</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-gold text-xs font-mono uppercase tracking-widest mb-3">Featured Project</div>
                <h3 className="text-2xl font-bold mb-4 text-text-primary">{featured.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{featured.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-background border border-border rounded-full text-xs text-steel">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={featured.live} className="flex items-center gap-2 text-gold hover:text-gold/80 text-sm font-medium transition-colors">
                    <FiExternalLink /> View Live
                  </a>
                  <a href={featured.source} className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors">
                    <FiGithub /> Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {rest.map(project => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${project.gradient}`} />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-text-primary">{project.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-background border border-border rounded text-xs text-steel">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.live} className="text-gold hover:text-gold/80 text-sm transition-colors flex items-center gap-1">
                    <FiExternalLink size={14} /> Live
                  </a>
                  <a href={project.source} className="text-text-secondary hover:text-text-primary text-sm transition-colors flex items-center gap-1">
                    <FiGithub size={14} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
