import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <Activity size={24} color="#ffffff" strokeWidth={2.5} />
        NutriCore
      </a>
      <div className="nav-links">
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#pricing" className="nav-link">Pricing</a>
      </div>
      <button className="nav-action-btn">
        Get Protocol
      </button>
    </nav>
  );
};

export default Navbar;
