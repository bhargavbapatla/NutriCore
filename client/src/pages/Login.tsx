import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/dashboard';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#020308',
      color: '#ffffff'
    }}>

      {/* --- INJECTED CSS FOR AUTOFILL RESET --- */}
      <style>
        {`
          /* Input reset to prevent browser autofill styling from breaking the dark theme */
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active{
              -webkit-box-shadow: 0 0 0 30px #0a0e17 inset !important;
              -webkit-text-fill-color: white !important;
          }
        `}
      </style>

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: 'rgba(34, 211, 238, 0.05)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: 'rgba(217, 70, 239, 0.05)', filter: 'blur(100px)' }} />
      </div>

      {/* --- INWARD FIRING NEURAL CIRCUITS (Replaced Helix) --- */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg style={{ width: '100%', height: '100%', opacity: 0.6 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="glowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="glowRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#d946ef" stopOpacity="0.8" />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1.25rem', color: 'white' }}>
          <Activity size={24} color="#22d3ee" />
          NUTRICORE
        </div>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, color: '#a0aabf', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
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
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
              Login Protocol
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#a0aabf', margin: 0 }}>
              Authenticate to access your bio-dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#a0aabf', textTransform: 'uppercase', letterSpacing: '0.2em', paddingLeft: '0.25rem' }}>
                Email Identification
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: emailFocus ? '#22d3ee' : '#64748b', transition: 'color 0.3s' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="user@neural-link.com"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  style={{
                    width: '100%', padding: '16px 16px 16px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${emailFocus ? 'rgba(34, 211, 238, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#a0aabf', textTransform: 'uppercase', letterSpacing: '0.2em', paddingLeft: '0.25rem' }}>
                Security Key
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: passFocus ? '#22d3ee' : '#64748b', transition: 'color 0.3s' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  style={{
                    width: '100%', padding: '16px 16px 16px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${passFocus ? 'rgba(34, 211, 238, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease', letterSpacing: '0.2em'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              style={{
                marginTop: '1rem',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                padding: '18px 0', width: '100%', borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              }}
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(0px)',
                borderColor: 'rgba(34, 211, 238, 0.8)',
                y: -2
              }}
              transition={{ duration: 0.2 }}
            >
              Authenticate
              <ArrowRight size={18} color="#22d3ee" />
            </motion.button>
          </form>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
            New Entity?{' '}
            <Link to="/signup" style={{ color: '#22d3ee', fontWeight: 700, textDecoration: 'none' }}>
              Initialize Profile
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default Login;