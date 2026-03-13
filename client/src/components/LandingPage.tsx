import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import { motion } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // 2. Safe GSAP Animations
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.fade-up-section');

      sections.forEach((section) => {
        gsap.set(section, { autoAlpha: 0, y: 80, scale: 0.98 });

        gsap.to(section, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });

      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        color: '#ffffff',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: 'sans-serif',
        /* CRITICAL FIX: Background applied directly to the main container, overwriting any white defaults */
        background: 'radial-gradient(circle at 50% 0%, #0a1128 0%, #020308 50%, #000000 100%)',
        backgroundColor: '#020308' // Fallback
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
          html.lenis, html.lenis body { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: hidden; }
        `}
      </style>

      {/* BACKGROUND CIRCUITS - Fixed to zIndex 0 so it stays above the dark background but below content */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg style={{ width: '100%', height: '100%', opacity: 0.6 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="glowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor="#22d3ee" stopOpacity="0.8" /><stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="glowRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor="#d946ef" stopOpacity="0.8" /><stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.path d="M -50 200 C 200 200, 400 450, 720 450" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M -50 750 C 300 750, 500 550, 720 550" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
          <motion.path d="M 1490 150 C 1200 150, 1000 450, 720 450" fill="transparent" stroke="url(#glowRight)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          <motion.path d="M 1490 800 C 1100 800, 900 550, 720 550" fill="transparent" stroke="url(#glowRight)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </svg>
      </div>

      <Navbar />

      {/* Main Container */}
      <main style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>

        {/* Your Hero should be transparent so it shows the dark gradient from the wrapper */}
        <Hero />

        <div className="fade-up-section">
          <Features />
        </div>

        {/* --- BULLETPROOF CTA SECTION --- */}
        <section className="fade-up-section" style={{ padding: '8rem 5%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: '100%', maxWidth: '900px', padding: '5rem 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Ready to Upgrade Your Biology?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#a0aabf', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
              Join the elite group of individuals leveraging deep data for superior health and cognition.
            </p>
            <motion.button
              onClick={() => window.location.href = '/signup'}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                padding: '16px 40px', borderRadius: '9999px', marginTop: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)', borderColor: 'rgba(34, 211, 238, 0.8)', y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Initialize Setup Access
              <ArrowRight size={18} color="#22d3ee" />
            </motion.button>
          </div>
        </section>
      </main>

      <footer
        className="fade-up-section"
        style={{
          position: 'relative', zIndex: 10, padding: '4rem 5%',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: '#020308',
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.25rem', color: 'white' }}>
          <Activity size={24} color="#22d3ee" />
          NutriCore
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: '#a0aabf', textDecoration: 'none', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Privacy Protocol</a>
          <a href="#" style={{ color: '#a0aabf', textDecoration: 'none', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Terms of Service</a>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          &copy; {new Date().getFullYear()} NutriCore Systems. Secure Link Established.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;