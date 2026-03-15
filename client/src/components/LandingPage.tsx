import React, { useEffect, useRef } from 'react';
import Hero from './Hero';
import Features from './Features';
import { ArrowRight, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// ─── Agents ───────────────────────────────────────────────────────────────────
const AGENT_DEFS = [
  {
    num: '01', name: 'NutritionAgent', role: 'Food Intelligence',
    desc: 'Identifies Indian dishes from photos using LLaVA vision. Maps every ingredient to IFCT 2017 — 1,000+ foods, full macro and micro breakdown down to B12 and calcium.',
    accentKey: 'emerald' as const, tintKey: 'emeraldTint' as const, borderKey: 'emeraldBorder' as const,
    tag: 'LLaVA Vision · IFCT RAG · Qdrant',
  },
  {
    num: '02', name: 'FitnessAgent', role: 'Activity Sync',
    desc: 'Pulls live data from Strava and Google Fit via OAuth2. Recalculates your daily calorie ceiling based on workout intensity, heart rate zones, and MET values.',
    accentKey: 'teal' as const, tintKey: 'tealTint' as const, borderKey: 'tealBorder' as const,
    tag: 'Strava · Google Fit · OAuth2',
  },
  {
    num: '03', name: 'CheatDayAgent', role: 'Weekend Intelligence',
    desc: 'The only agent of its kind. Tracks your weekly deficit and workout streak, then produces a mathematically justified cheat budget — in samosas, biryani, chai.',
    accentKey: 'emerald' as const, tintKey: 'emeraldTint' as const, borderKey: 'emeraldBorder' as const,
    tag: 'Deficit Tracking · Indian Junk DB',
  },
  {
    num: '04', name: 'DeficiencyAgent', role: 'Micronutrient Watchdog',
    desc: 'Flags silent gaps before they compound. Cross-references your daily logs against bloodwork PDFs and cites PubMed abstracts with every alert. Never a guess.',
    accentKey: 'teal' as const, tintKey: 'tealTint' as const, borderKey: 'tealBorder' as const,
    tag: 'PubMed RAG · PyMuPDF · Alerts',
  },
  {
    num: '05', name: 'DiabetesAgent', role: 'Glycaemic Control',
    desc: 'Only activates for prediabetic and diabetic users. Scores every meal by GI and GL, correlates with CGM glucose readings, tracks HbA1c against ICMR guidelines.',
    accentKey: 'danger' as const, tintKey: 'dangerTint' as const, borderKey: 'dangerBorder' as const,
    tag: 'GI/GL · CGM · HbA1c · ICMR',
  },
  {
    num: '06', name: 'PlannerAgent', role: 'Orchestrator',
    desc: 'Always runs last. Reads the full shared state from every agent and synthesises it into one coherent, personalised recommendation. The voice you actually talk to.',
    accentKey: 'emerald' as const, tintKey: 'emeraldTint' as const, borderKey: 'emeraldBorder' as const,
    tag: 'LangGraph · Conversation Memory',
  },
];

// ─── ECG Logo ─────────────────────────────────────────────────────────────────
const ECGLogo: React.FC = () => {
  const { colors } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 900, fontSize: '1rem', color: colors.textPrimary, letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace" }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
        <polyline points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
          stroke={colors.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="60">
          <animate attributeName="stroke-dashoffset" from="60" to="-60" dur="1.8s" repeatCount="indefinite" />
        </polyline>
      </svg>
      NUTRICORE
    </div>
  );
};

// ─── LandingPage ──────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const agentsPinRef = useRef<HTMLDivElement>(null);
  const agentsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Lenis ───────────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const onFrame = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    // ── GSAP ────────────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up-section').forEach(el => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1, y: 0, duration: 1.0, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Horizontal pinned agents section
      if (agentsPinRef.current && agentsTrackRef.current) {
        const track = agentsTrackRef.current;
        const getDist = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: agentsPinRef.current,
            start: 'top top',
            end: () => `+=${getDist() + window.innerWidth * 0.4}`,
            pin: true, scrub: 1.0,
            anticipatePin: 1, invalidateOnRefresh: true,
          },
        });

        gsap.to('.agents-progress', {
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: agentsPinRef.current,
            start: 'top top',
            end: () => `+=${getDist() + window.innerWidth * 0.4}`,
            scrub: true,
          },
        });
      }
    }, containerRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(t);
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(onFrame);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh', color: colors.textPrimary, overflowX: 'hidden',
      background: colors.bgPage,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,700;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; box-sizing: border-box; }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-stopped { overflow: hidden; }
        .agent-card { transition: border-color 0.22s, background 0.22s; will-change: transform, opacity; }
        .nav-link-lp { transition: color 0.2s; }
        .nav-link-lp:hover { color: ${colors.emerald} !important; }
        .cta-primary-lp { transition: background 0.18s, transform 0.15s; }
        .cta-primary-lp:hover { background: ${colors.emeraldLight} !important; transform: translateY(-1px); }
        .cta-primary-lp:active { transform: scale(0.97) !important; }
        .footer-link-lp { transition: color 0.2s; }
        .footer-link-lp:hover { color: ${colors.textBody} !important; }
      `}</style>

      {/* ── Ambient ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '70vw', height: '50vh', background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vh', background: 'radial-gradient(ellipse, rgba(13,148,136,0.05) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '35%', right: '-5%', width: '35vw', height: '35vh', background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 65%)' }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${colors.borderSubtle} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderSubtle} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* ── Sticky nav ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1.1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: `${colors.bgPage}d9`, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `0.5px solid ${colors.borderSubtle}`,
      }}>
        <ECGLogo />
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Features', 'Agents', 'Pricing'].map(l => (
            <a key={l} href="#" className="nav-link-lp" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em' }}>{l}</a>
          ))}
          <a href="/signup" style={{
            background: colors.emeraldTint, border: `0.5px solid ${colors.emeraldBorder}`,
            color: colors.emerald, padding: '7px 18px', borderRadius: 8,
            fontSize: '0.74rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.06em',
            transition: 'background 0.18s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = colors.emeraldGlow)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = colors.emeraldTint)}
          >
            Get Access
          </a>
        </nav>
      </header>

      <main style={{ position: 'relative', zIndex: 10, paddingTop: '5rem' }}>
        <Hero />

        {/* ── Stats ── */}
        <section className="fade-up-section" style={{ padding: '0 5% 6rem' }}>
          <div style={{
            background: colors.bgCard, border: `0.5px solid ${colors.borderDefault}`,
            borderRadius: 14, padding: '1.5rem 3rem',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
            position: 'relative', overflow: 'hidden',
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ position: 'absolute', left: `${i * 25}%`, top: '18%', bottom: '18%', width: '0.5px', background: colors.borderSubtle }} />
            ))}
            {[
              { v: '14,000+', l: 'Indian foods tracked' },
              { v: '6 agents', l: 'Working in parallel' },
              { v: '< 2s', l: 'Photo to nutrition' },
              { v: '98.2%', l: 'Accuracy rate' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: 900, color: colors.emerald, letterSpacing: '-0.03em', fontFamily: "'DM Mono', monospace" }}>{s.v}</div>
                <div style={{ fontSize: '0.66rem', color: colors.textMuted, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="fade-up-section"><Features /></div>

        {/* ════════════════════════════════════════════════════
            AGENTS — GSAP HORIZONTAL PINNED SCROLL
        ════════════════════════════════════════════════════ */}
        <section ref={agentsPinRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative', background: colors.bgPage }}>
          {/* Header */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: '2.5rem 5% 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color: colors.emerald, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
                The Architecture
              </div>
              <h2 style={{ fontSize: 'clamp(1.9rem,3vw,2.75rem)', fontWeight: 900, color: colors.textPrimary, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
                Six agents.<br /><span style={{ color: colors.emerald }}>One shared brain.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textMuted, fontSize: '0.7rem', paddingBottom: 6 }}>
              <span style={{ letterSpacing: '0.05em' }}>Scroll to explore</span>
              <MoveRight size={13} color={colors.emerald} />
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '5%', right: '5%', zIndex: 20, height: '0.5px', background: colors.borderSubtle }}>
            <div className="agents-progress" style={{ height: '100%', background: colors.emerald, transformOrigin: 'left center', transform: 'scaleX(0)' }} />
          </div>

          {/* Track */}
          <div ref={agentsTrackRef} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingLeft: '5%', paddingRight: '10%', height: '100%', willChange: 'transform' }}>
            {/* Lead-in */}
            <div style={{ flexShrink: 0, width: 'clamp(260px,26vw,360px)', marginTop: '5rem' }}>
              <p style={{ fontSize: '0.96rem', color: colors.textBody, lineHeight: 1.8, maxWidth: 300, margin: '0 0 1.5rem' }}>
                NutriCore runs a{' '}
                <span style={{ color: colors.textPrimary, fontWeight: 700 }}>LangGraph state machine</span>
                {' '}where agents share context and conditionally activate based on your data, day, and health profile.
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 28, height: 0.5, background: colors.emeraldDim }} />
                <span style={{ fontSize: '0.62rem', color: colors.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                  LangGraph · Llama 3.1 · Ollama
                </span>
              </div>
            </div>

            {/* Cards */}
            {AGENT_DEFS.map((agent, i) => {
              const accent = colors[agent.accentKey];
              const tint = colors[agent.tintKey];
              const border = colors[agent.borderKey];
              return (
                <div
                  key={agent.name}
                  className="agent-card"
                  style={{
                    flexShrink: 0,
                    width: 'clamp(290px,29vw,375px)',
                    height: 'clamp(320px,41vh,415px)',
                    background: colors.bgCard,
                    border: `0.5px solid ${colors.borderDefault}`,
                    borderRadius: 16,
                    padding: '1.75rem 2rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    position: 'relative', overflow: 'hidden',
                    marginTop: i % 2 === 0 ? '5rem' : '9rem',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = border; (e.currentTarget as HTMLDivElement).style.background = colors.bgElevated; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.borderDefault; (e.currentTarget as HTMLDivElement).style.background = colors.bgCard; }}
                >
                  {/* Watermark */}
                  <div style={{ position: 'absolute', bottom: '-0.5rem', right: '0.75rem', fontSize: '6.5rem', fontWeight: 900, color: accent, opacity: 0.04, lineHeight: 1, fontFamily: "'DM Mono', monospace", userSelect: 'none', pointerEvents: 'none' }}>
                    {agent.num}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: accent, letterSpacing: '0.16em', textTransform: 'uppercase', background: tint, border: `0.5px solid ${border}`, padding: '4px 11px', borderRadius: 6, fontFamily: "'DM Mono', monospace" }}>{agent.num}</span>
                      <span style={{ fontSize: '0.58rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>{agent.role}</span>
                    </div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: colors.textPrimary, letterSpacing: '-0.02em', margin: '0 0 0.7rem' }}>{agent.name}</h3>
                    <p style={{ fontSize: '0.82rem', color: colors.textBody, lineHeight: 1.7, margin: 0 }}>{agent.desc}</p>
                  </div>
                  <div style={{ fontSize: '0.6rem', color: colors.textMuted, fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em', borderTop: `0.5px solid ${colors.borderSubtle}`, paddingTop: '0.9rem', marginTop: '0.9rem' }}>{agent.tag}</div>
                </div>
              );
            })}
            <div style={{ flexShrink: 0, width: '8vw' }} />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="fade-up-section" style={{ padding: '8rem 5%', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 760,
            background: colors.bgCard, border: `0.5px solid ${colors.borderDefault}`,
            borderRadius: 20,
            padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,4rem)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: '55%', height: 160, background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: colors.emerald, letterSpacing: '0.2em', textTransform: 'uppercase', background: colors.emeraldTint, border: `0.5px solid ${colors.emeraldBorder}`, padding: '5px 16px', borderRadius: 6, fontFamily: "'DM Mono', monospace" }}>
              Free for 30 days
            </span>

            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, margin: 0, color: colors.textPrimary, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Precision nutrition.<br /><span style={{ color: colors.emerald }}>Built for Indian bodies.</span>
            </h2>

            <p style={{ fontSize: '0.96rem', color: colors.textBody, margin: 0, maxWidth: 440, lineHeight: 1.8 }}>
              Six AI agents. Your complete food history. Real-time fitness sync. Designed from the ground up for Indian food culture — not retrofitted from a Western app.
            </p>

            <button
              className="cta-primary-lp"
              onClick={() => window.location.href = '/signup'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 34px', borderRadius: 9, marginTop: 8,
                background: colors.emerald, border: 'none',
                color: colors.bgPage, fontSize: '0.76rem', fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Initialize Setup <ArrowRight size={14} />
            </button>

            <p style={{ fontSize: '0.67rem', color: colors.textMuted, margin: 0 }}>No credit card required</p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        position: 'relative', zIndex: 10, padding: '2.5rem 5%',
        borderTop: `0.5px solid ${colors.borderSubtle}`,
        background: `${colors.bgPage}f0`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <ECGLogo />
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" className="footer-link-lp" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.66rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{l}</a>
          ))}
        </div>
        <div style={{ color: colors.textMuted, fontSize: '0.64rem', letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace" }}>
          © {new Date().getFullYear()} NutriCore Systems
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;