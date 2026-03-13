import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Outer wrapper enforces the gap from the top of the screen
    <div style={{ position: 'fixed', top: '24px', left: 0, width: '100%', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '0 5%', pointerEvents: 'none' }}>

      {/* Inner floating pill */}
      <header
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1200px',
          borderRadius: '9999px',
          background: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.3s ease'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1.25rem', color: 'white' }}>
          <Activity size={24} color="#22d3ee" />
          NutriCore
        </div>

        {/* Links */}
        <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.75rem', fontWeight: 700, color: '#a0aabf', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e) => e.currentTarget.style.color = '#22d3ee'} onMouseOut={(e) => e.currentTarget.style.color = '#a0aabf'}>Features</a>
          <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e) => e.currentTarget.style.color = '#22d3ee'} onMouseOut={(e) => e.currentTarget.style.color = '#a0aabf'}>About</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e) => e.currentTarget.style.color = '#22d3ee'} onMouseOut={(e) => e.currentTarget.style.color = '#a0aabf'}>Pricing</a>
        </div>

        {/* Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/login" className="hidden md:block" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, color: '#a0aabf', textTransform: 'uppercase', letterSpacing: '0.1em' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#a0aabf'}>
            Log In
          </Link>

          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <motion.button
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '10px 24px', borderRadius: '9999px',
                backgroundColor: '#ffffff', border: 'none',
                color: '#020617', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer'
              }}
              whileHover={{ backgroundColor: '#22d3ee', y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Get Protocol
            </motion.button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;