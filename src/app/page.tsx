'use client'

/**
 * OpenBento - Landing Page
 * Redesigned with Tailwind CSS and Bento.me aesthetic
 */

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ============ Components ============

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-[var(--color-border)]">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:opacity-80 transition-opacity">
        🍱 OpenBento
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/showcase" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors hidden sm:block">
          Explore
        </Link>
        <Link href="/auth/login" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          Log in
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-[var(--color-brand-primary)] text-white text-sm font-semibold rounded-full hover:brightness-110 transition-all shadow-lg shadow-orange-500/20"
        >
          Sign up free
        </Link>
      </div>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-hover)] border border-[var(--color-border)] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">v1.0 Public Beta</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-6">
            Your life in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">
              a grid.
            </span>
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
            Showcase everything you are, do, and create in one beautiful, modular link-in-bio page. Drag, drop, and design your personal corner of the internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-lg font-bold rounded-2xl hover:scale-105 transition-transform duration-200"
            >
              Claim your bento
            </Link>
            <Link
              href="/showcase"
              className="px-8 py-4 bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-lg font-bold rounded-2xl hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              See examples
            </Link>
          </div>
        </motion.div>

        {/* Hero Visual - Bento Grid Preview */}
        <motion.div
          className="flex-1 w-full max-w-[600px] aspect-square relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 p-4 bg-[var(--color-bg-primary)] rounded-[40px] border border-[var(--color-border)] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
            {/* Profile Card 2x2 */}
            <div className="col-span-2 row-span-2 bg-white rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-500 to-purple-500 shadow-lg mb-4" />
              <div>
                <h3 className="font-bold text-xl text-black">Henry</h3>
                <p className="text-gray-500 text-sm">Digital Creator</p>
              </div>
            </div>

            {/* Map Card 2x1 */}
            <div className="col-span-2 row-span-1 bg-[#2C3E50] rounded-3xl p-4 flex items-center justify-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.4194,37.7749,12,0/400x200?access_token=pk.placeholder')] bg-cover bg-center" />
              <div className="relative z-10 flex items-center gap-2 text-white/90">
                <span className="text-xl">📍</span>
                <span className="font-medium">San Francisco</span>
              </div>
            </div>

            {/* Instagram 1x1 */}
            <div className="col-span-1 row-span-1 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-3xl flex items-center justify-center text-white text-3xl hover:scale-[1.05] transition-transform cursor-pointer shadow-sm">
              <i className="fab fa-instagram">📸</i>
            </div>

            {/* Spotify 1x1 */}
            <div className="col-span-1 row-span-1 bg-[#1DB954] rounded-3xl flex items-center justify-center text-white text-3xl hover:scale-[1.05] transition-transform cursor-pointer shadow-sm">
              <i className="fab fa-spotify">🎵</i>
            </div>

            {/* Image 2x2 (Photos) */}
            <div className="col-span-2 row-span-2 bg-gray-100 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Workspace" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-medium">My Setup</p>
              </div>
            </div>

            {/* Twitter 1x1 */}
            <div className="col-span-1 row-span-1 bg-black rounded-3xl flex items-center justify-center text-white text-3xl hover:scale-[1.05] transition-transform cursor-pointer shadow-sm">
              𝕏
            </div>

            {/* Link 1x1 */}
            <div className="col-span-1 row-span-1 bg-white border border-gray-100 rounded-3xl flex items-center justify-center text-3xl hover:scale-[1.05] transition-transform cursor-pointer shadow-sm">
              🔗
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, desc, delay }: { icon: string, title: string, desc: string, delay: number }) => (
  <motion.div
    className="p-8 rounded-[32px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-primary)] flex items-center justify-center text-2xl mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">{title}</h3>
    <p className="text-[var(--color-text-secondary)] leading-relaxed">{desc}</p>
  </motion.div>
)

const Features = () => (
  <section className="py-32 bg-[var(--color-bg-tertiary)]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-[var(--color-text-primary)]">
          Everything you need to <br /> share your story.
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Powerful widgets, beautiful themes, and complete control over your online presence. All for free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon="🎨"
          title="Drag & Drop Interface"
          desc="Simply drag widgets to arrange your grid. Resize them with a click. No coding required."
          delay={0.1}
        />
        <FeatureCard
          icon="🧩"
          title="Rich Widgets"
          desc="Embed almost anything: Spotify playlists, YouTube videos, Maps, Links, and Photos."
          delay={0.2}
        />
        <FeatureCard
          icon="📱"
          title="Mobile Optimized"
          desc="Your page adapts perfectly to any screen size. Looks great on phones and desktops."
          delay={0.3}
        />
        <FeatureCard
          icon="⚡"
          title="Instant Performance"
          desc="Built on Next.js 14 for lightning-fast page loads and top-tier SEO out of the box."
          delay={0.4}
        />
        <FeatureCard
          icon="🌗"
          title="Dark Mode Support"
          desc="Automatic dark mode matching your visitor's system preferences."
          delay={0.5}
        />
        <FeatureCard
          icon="🐙"
          title="Open Source"
          desc="100% free and open source. Host it yourself or use our cloud platform."
          delay={0.6}
        />
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-12 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-lg font-bold">🍱 OpenBento</span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          © 2024 OpenBento Community
        </span>
      </div>

      <div className="flex items-center gap-8">
        <a href="https://github.com/bravohenry/openbento" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium transition-colors">GitHub</a>
        <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium transition-colors">Twitter</a>
        <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium transition-colors">Discord</a>
      </div>
    </div>
  </footer>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero />
        <Features />

        {/* Simple CTA */}
        <section className="py-32 px-6">
          <motion.div
            className="max-w-5xl mx-auto bg-black text-white rounded-[48px] p-12 md:p-24 text-center overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-50" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                Ready to claim your corner?
              </h2>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-black text-xl font-bold rounded-2xl hover:bg-gray-100 transition-colors"
              >
                Get Started for Free
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
