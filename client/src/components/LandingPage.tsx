import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import '../styles/Landing.css';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import gsap from 'gsap';

const LandingPage: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blob1Ref.current && blob2Ref.current && blob3Ref.current) {
      // Breathing, slow liquid animations
      gsap.to(blob1Ref.current, {
        x: 'random(-10, 10)vw',
        y: 'random(-10, 10)vh',
        scale: 'random(0.85, 1.2)', // Increased scale variance for breathing
        opacity: 'random(0.5, 0.9)', // Opacity breathing
        duration: 25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(blob2Ref.current, {
        x: 'random(-15, 15)vw',
        y: 'random(-10, 15)vh',
        scale: 'random(0.9, 1.25)',
        opacity: 'random(0.4, 0.8)',
        duration: 30,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      gsap.to(blob3Ref.current, {
        x: 'random(-5, 15)vw',
        y: 'random(-15, 5)vh',
        scale: 'random(0.8, 1.15)',
        opacity: 'random(0.6, 1)',
        duration: 35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 5,
      });
    }
  }, []);

  return (
    <div className="landing-container">
      {/* Global Background */}
      <div className="canvas-container">
        <div ref={blob1Ref} className="bg-blob blob-1"></div>
        <div ref={blob2Ref} className="bg-blob blob-2"></div>
        <div ref={blob3Ref} className="bg-blob blob-3"></div>
        
        {/* Circuit Connections SVG */}
        <svg 
          className="circuit-overlay"
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.15 }}
        >
          <motion.path 
            d="M 10 500 Q 300 500 400 300 T 800 200" 
            fill="transparent" 
            stroke="#ffffff" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M 1200 100 Q 900 100 800 400 T 200 600" 
            fill="transparent" 
            stroke="#ffffff" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
          />
          <motion.circle cx="400" cy="300" r="3" fill="#ffffff" 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.circle cx="800" cy="400" r="3" fill="#ffffff" 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          />
        </svg>
      </div>

      <Navbar />
      <Hero />
      <Features />
      
      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-box glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <h2 className="cta-title">Ready to Upgrade Your Biology?</h2>
            <p className="cta-subtitle secondary-text">
              Join the elite group of individuals leveraging deep data for superior health and cognition.
            </p>
            <button className="btn-primary" style={{ margin: '0 auto' }}>
              Initialize Setup Access
            </button>
          </div>
        </motion.div>
      </section>

      {/* Basic Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <Activity size={20} color="#00f0ff" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
          NutriCore
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Protocol</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">System Status</a>
        </div>
        <div className="secondary-text" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} NutriCore Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
