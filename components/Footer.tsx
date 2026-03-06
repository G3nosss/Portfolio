'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/G3nosss', label: 'GitHub' },
  { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:text-gold hover:border-gold/50 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Credit */}
          <p className="text-text-secondary text-sm text-center">
            Designed &amp; Built with{' '}
            <span className="text-gold">♥</span>
            {' '}by{' '}
            <span className="text-text-primary font-medium">G3nosss</span>
          </p>

          {/* Copyright */}
          <p className="text-text-secondary/50 text-xs">
            © 2026 All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
