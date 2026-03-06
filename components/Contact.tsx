'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const contactLinks = [
  { icon: <FiMail />, label: 'Email', value: 'hello@g3nosss.dev', href: 'mailto:hello@g3nosss.dev' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/G3nosss', href: 'https://github.com/G3nosss' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/g3nosss', href: '#' },
  { icon: <FiTwitter />, label: 'Twitter', value: '@g3nosss', href: '#' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: In production, wire up to an API route or service
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4"
        >
          <span className="text-gold/60 text-sm font-mono uppercase tracking-widest">Chapter 05</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">Let&apos;s Connect</h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-text-secondary text-lg mb-16"
        >
          Every great collaboration starts with a conversation.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-text-secondary leading-relaxed">
              Whether you have a project in mind, a question to ask, or just want to say hi —
              my inbox is always open. I&apos;m currently available for freelance work and
              full-time opportunities.
            </p>

            <div className="space-y-4 pt-4">
              {contactLinks.map(link => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  className="flex items-center gap-4 group"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-steel group-hover:border-gold/50 group-hover:text-gold transition-all duration-200">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider">{link.label}</div>
                    <div className="text-text-primary text-sm group-hover:text-gold transition-colors">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <p className="text-text-secondary/60 text-sm pt-4">
              💬 I usually respond within 24 hours.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Message sent!</h3>
                <p className="text-text-secondary">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm text-text-secondary mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      required
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary/40 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition-all duration-200 text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary/40 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition-all duration-200 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-gold to-gold/80 text-background font-semibold rounded-lg hover:from-gold/90 hover:to-gold/70 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-gold/20"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
