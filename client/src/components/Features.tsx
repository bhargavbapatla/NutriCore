import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Dna,
  Brain,
  Heart,
  Target,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as any }
  }
};

const Features: React.FC = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLElement>(null);

  const featuresList = [
    {
      icon: <Dna size={28} color={colors.emerald} />,
      title: "Genome Mapping",
      description: "Proprietary CRISPR-base sequencing to analyze your unique metabolic blueprint.",
      accent: colors.emerald,
      tint: colors.emeraldTint,
      border: colors.emeraldBorder
    },
    {
      icon: <Brain size={28} color={colors.teal} />,
      title: "Neural Synergy",
      description: "Cognitive performance optimization via amino-acid and neurotransmitter balancing.",
      accent: colors.teal,
      tint: colors.tealTint,
      border: colors.tealBorder
    },
    {
      icon: <Zap size={28} color={colors.emerald} />,
      title: "Cellular Energy",
      description: "Mitochondrial enhancement protocols designed to eliminate chronic fatigue.",
      accent: colors.emerald,
      tint: colors.emeraldTint,
      border: colors.emeraldBorder
    },
    {
      icon: <Target size={28} color={colors.teal} />,
      title: "Precision Macro",
      description: "Dynamic micro-nutrient adjustments based on real-time biometric feedback loops.",
      accent: colors.teal,
      tint: colors.tealTint,
      border: colors.tealBorder
    },
    {
      icon: <Heart size={28} color={colors.danger} />,
      title: "Longevity Bio",
      description: "Advanced anti-aging protocols rooted in telomere protection and sirtuin activation.",
      accent: colors.danger,
      tint: colors.dangerTint,
      border: colors.dangerBorder
    },
    {
      icon: <ShieldCheck size={28} color={colors.teal} />,
      title: "Immune Shield",
      description: "Fortify your natural defenses through data-driven immunological resilience training.",
      accent: colors.teal,
      tint: colors.tealTint,
      border: colors.tealBorder
    }
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      style={{
        padding: '8rem 5%',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'transparent'
      }}
    >
      {/* --- HEADER SECTION --- */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem', maxWidth: '800px', margin: '0 auto 5rem auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: colors.textPrimary,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}
        >
          Proprietary Tech
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          style={{
            fontSize: '1.25rem',
            color: colors.textBody,
            fontWeight: 500,
            lineHeight: 1.6
          }}
        >
          Hardware meets wetware. Our integrated system bridges the gap between biological potential and peak performance.
        </motion.p>
      </div>

      {/* --- FEATURE GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {featuresList.map((feat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -8,
              backgroundColor: colors.bgElevated,
              borderColor: feat.accent,
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)'
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '1.5rem',
              padding: '2.5rem',
              borderRadius: '2rem',
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.borderDefault}`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'default',
              transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
            }}
          >
            {/* Icon Box */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: feat.tint,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${feat.border}`,
              transition: 'transform 0.5s ease, background-color 0.5s ease'
            }}>
              {feat.icon}
            </div>

            {/* Text Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>
                {feat.title}
              </h3>
              <p style={{ color: colors.textBody, fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                {feat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
