import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ECGIcon = ({ size = 24, color = "#e8b86d" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    <polyline
      points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="60"
      strokeDashoffset="60"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="60"
        to="-60"
        dur="1.5s"
        repeatCount="indefinite"
        calcMode="linear"
      />
    </polyline>
  </svg>
);

const Login: React.FC = () => {
  const { colors } = useTheme();
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API authentication delay
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsLoading(false);
      navigate('/questionnaire');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: colors.bgPage,
      color: colors.textPrimary,
      fontFamily: "'DM Sans', sans-serif"
    }}>

      {/* --- INJECTED CSS FOR AUTOFILL RESET --- */}
      <style>
        {`
          /* Input reset to prevent browser autofill styling from breaking the dark theme */
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active{
              -webkit-box-shadow: 0 0 0 30px ${colors.bgPage} inset !important;
              -webkit-text-fill-color: ${colors.textPrimary} !important;
          }
        `}
      </style>

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: `${colors.gold}0a`, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: `${colors.rose}0a`, filter: 'blur(100px)' }} />
      </div>

      {/* --- NEURAL CIRCUITS --- */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg style={{ width: '100%', height: '100%', opacity: 0.6 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="glowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor={colors.gold} stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="glowRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor={colors.rose} stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Left Side Waves */}
          <motion.path d="M -50 200 C 200 200, 400 450, 720 450" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M -50 750 C 300 750, 500 550, 720 550" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

          {/* Right Side Waves */}
          <motion.path d="M 1490 150 C 1200 150, 1000 450, 720 450" fill="transparent" stroke="url(#glowRight)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          <motion.path d="M 1490 800 C 1100 800, 900 550, 720 550" fill="transparent" stroke="url(#glowRight)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </svg>
      </div>

      {/* --- HEADER --- */}
      <header style={{ position: 'relative', zIndex: 10, width: '100%', padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1.25rem', color: colors.textPrimary, fontFamily: "'DM Mono', monospace", letterSpacing: '0.05em' }}>
          <ECGIcon size={24} color={colors.gold} />
          NUTRICORE
        </div>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Return Home
        </Link>
      </header>

      {/* --- LOGIN TERMINAL --- */}
      <main style={{ position: 'relative', zIndex: 10, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: '3rem',
            backgroundColor: colors.bgCard,
            borderRadius: '24px',
            border: `1px solid ${colors.borderDefault}`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}
        >
          {/* Titles */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: colors.textPrimary }}>
              Login
            </h1>
            <p style={{ fontSize: '0.9rem', color: colors.textMuted, margin: 0 }}>
              Authenticate to access your bio-dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 800, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.2em', paddingLeft: '0.25rem' }}>
                Email ID
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: emailFocus ? colors.gold : colors.textMuted, transition: 'color 0.3s' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="user@neural-link.com"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  disabled={isLoading}
                  style={{
                    width: '100%', padding: '16px 16px 16px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${emailFocus ? colors.goldBorder : colors.borderSubtle}`,
                    borderRadius: '12px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease',
                    opacity: isLoading ? 0.5 : 1
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 800, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.2em', paddingLeft: '0.25rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: passFocus ? colors.gold : colors.textMuted, transition: 'color 0.3s' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  disabled={isLoading}
                  style={{
                    width: '100%', padding: '16px 16px 16px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${passFocus ? colors.goldBorder : colors.borderSubtle}`,
                    borderRadius: '12px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease', letterSpacing: '0.2em',
                    opacity: isLoading ? 0.5 : 1
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '1rem',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                padding: '18px 0', width: '100%', borderRadius: '9999px',
                backgroundColor: colors.goldTint, border: `1px solid ${colors.goldBorder}`,
                color: colors.gold, fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: isLoading ? 'not-allowed' : 'pointer', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                transition: 'all 0.3s ease'
              }}
              whileHover={!isLoading ? {
                backgroundColor: colors.goldGlow,
                borderColor: colors.gold,
                y: -2
              } : {}}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <>
                  Authenticating...
                  <ECGIcon size={18} color={colors.gold} />
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={18} color={colors.gold} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: colors.textMuted }}>
            New Entity?{' '}
            <Link to="/signup" style={{ color: colors.gold, fontWeight: 700, textDecoration: 'none' }}>
              Initialize Profile
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default Login;
