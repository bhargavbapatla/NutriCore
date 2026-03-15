import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// ─── ECG Icon ─────────────────────────────────────────────────────────────────
const ECGIcon = ({ size = 24, color = '#10b981' }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24" fill="none"
    style={{ overflow: 'visible' }}
  >
    <polyline
      points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
      stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="60" strokeDashoffset="60"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="60" to="-60"
        dur="1.5s" repeatCount="indefinite" calcMode="linear"
      />
    </polyline>
  </svg>
);

// ─── Login ────────────────────────────────────────────────────────────────────
const Login: React.FC = () => {
  const { colors } = useTheme();
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsLoading(false);
      navigate('/questionnaire');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      backgroundColor: colors.bgPage,
      color: colors.textPrimary,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,900&family=DM+Mono:wght@400;500&display=swap');

        /* Autofill reset — prevents browser from overriding dark bg */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${colors.bgCard} inset !important;
          -webkit-text-fill-color: ${colors.textPrimary} !important;
        }

        .return-link { transition: color 0.2s; }
        .return-link:hover { color: ${colors.emerald} !important; }

        .signup-link { transition: color 0.2s; }
        .signup-link:hover { color: ${colors.emeraldLight} !important; }
      `}</style>

      {/* ── Ambient blobs ──────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Top-left — emerald */}
        <div style={{
          position: 'absolute', top: '5%', left: '5%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)',
        }} />
        {/* Bottom-right — teal */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(13,148,136,0.06) 0%, transparent 70%)',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(${colors.borderSubtle} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.borderSubtle} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* ── Circuit line animations ─────────────────────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="glowEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor={colors.emerald} stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="glowTeal" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor={colors.teal} stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <motion.path
            d="M -50 200 C 200 200, 400 450, 720 450"
            fill="transparent" stroke="url(#glowEmerald)"
            strokeWidth="1.5" strokeLinecap="round"
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M -50 750 C 300 750, 500 550, 720 550"
            fill="transparent" stroke="url(#glowEmerald)"
            strokeWidth="1" strokeLinecap="round"
            animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.path
            d="M 1490 150 C 1200 150, 1000 450, 720 450"
            fill="transparent" stroke="url(#glowTeal)"
            strokeWidth="1.5" strokeLinecap="round"
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.path
            d="M 1490 800 C 1100 800, 900 550, 720 550"
            fill="transparent" stroke="url(#glowTeal)"
            strokeWidth="1" strokeLinecap="round"
            animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </svg>
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'relative', zIndex: 10,
        width: '100%', padding: '1.75rem 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          fontWeight: 900, fontSize: '1.05rem',
          color: colors.textPrimary,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: '0.08em',
        }}>
          <ECGIcon size={22} color={colors.emerald} />
          NUTRICORE
        </div>
        <Link
          to="/"
          className="return-link"
          style={{
            textDecoration: 'none', fontSize: '0.68rem', fontWeight: 700,
            color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.15em',
          }}
        >
          Return Home
        </Link>
      </header>

      {/* ── Login card ─────────────────────────────────────────────────────── */}
      <main style={{
        position: 'relative', zIndex: 10,
        flexGrow: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '100%', maxWidth: 420,
            padding: '2.75rem',
            backgroundColor: colors.bgCard,
            borderRadius: 20,
            border: `0.5px solid ${colors.borderDefault}`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex', flexDirection: 'column', gap: '2.25rem',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Subtle top glow inside card */}
          <div style={{
            position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
            width: '70%', height: 120,
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Title */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 48, height: 48, borderRadius: '50%',
              background: colors.emeraldTint,
              border: `0.5px solid ${colors.emeraldBorder}`,
              marginBottom: '1rem',
            }}>
              <ECGIcon size={20} color={colors.emerald} />
            </div>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.4rem',
              letterSpacing: '-0.03em', color: colors.textPrimary,
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>
              Authenticate to access your dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontSize: '0.62rem', fontWeight: 700,
                color: colors.textMuted, textTransform: 'uppercase',
                letterSpacing: '0.18em', paddingLeft: 2,
                fontFamily: "'DM Mono', monospace",
              }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: emailFocus ? colors.emerald : colors.textMuted,
                  transition: 'color 0.2s', display: 'flex',
                }}>
                  <Mail size={16} />
                </div>
                <input
                  type="email" required
                  placeholder="you@example.com"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  disabled={isLoading}
                  style={{
                    width: '100%', padding: '13px 14px 13px 42px',
                    background: colors.bgElevated,
                    border: `0.5px solid ${emailFocus ? colors.emeraldBorder : colors.borderDefault}`,
                    borderRadius: 10, color: colors.textPrimary,
                    fontSize: '0.88rem', outline: 'none',
                    transition: 'border-color 0.2s',
                    opacity: isLoading ? 0.5 : 1,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 2 }}>
                <label style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  color: colors.textMuted, textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  Password
                </label>
                <a href="#" style={{
                  fontSize: '0.65rem', color: colors.teal,
                  textDecoration: 'none', fontWeight: 600,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = colors.emerald)}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = colors.teal)}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: passFocus ? colors.emerald : colors.textMuted,
                  transition: 'color 0.2s', display: 'flex',
                }}>
                  <Lock size={16} />
                </div>
                <input
                  type="password" required
                  placeholder="••••••••"
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  disabled={isLoading}
                  style={{
                    width: '100%', padding: '13px 14px 13px 42px',
                    background: colors.bgElevated,
                    border: `0.5px solid ${passFocus ? colors.emeraldBorder : colors.borderDefault}`,
                    borderRadius: 10, color: colors.textPrimary,
                    fontSize: '0.9rem', outline: 'none', letterSpacing: '0.15em',
                    transition: 'border-color 0.2s',
                    opacity: isLoading ? 0.5 : 1,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.97 } : {}}
              transition={{ duration: 0.15 }}
              style={{
                marginTop: '0.5rem',
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', gap: 10,
                padding: '14px 0', width: '100%', borderRadius: 10,
                background: isLoading ? colors.bgElevated : colors.emerald,
                border: `0.5px solid ${isLoading ? colors.borderDefault : colors.emeraldBorder}`,
                color: isLoading ? colors.textMuted : colors.bgPage,
                fontSize: '0.78rem', fontWeight: 800,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {isLoading ? (
                <>
                  Authenticating
                  <ECGIcon size={16} color={colors.emerald} />
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign up link */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: colors.textMuted }}>
            New here?{' '}
            <Link
              to="/signup"
              className="signup-link"
              style={{ color: colors.emerald, fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s' }}
            >
              Create account
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;