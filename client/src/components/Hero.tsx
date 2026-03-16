import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(blob1Ref.current, { x: '30%', y: '20%', duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to(blob2Ref.current, { x: '-20%', y: '-30%', duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 5%',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'transparent'
            }}
        >
            {/* Ambient Blobs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
                <div ref={blob1Ref} style={{ position: 'absolute', top: '-10%', left: '-10%', width: '800px', height: '800px', borderRadius: '50%', backgroundColor: `${colors.emerald}0a`, filter: 'blur(120px)' }} />
                <div ref={blob2Ref} style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '800px', height: '800px', borderRadius: '50%', backgroundColor: `${colors.teal}08`, filter: 'blur(120px)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '64rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: colors.textPrimary, textTransform: 'uppercase', marginBottom: '2rem' }}
                >
                    Nutri<br />
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', maxWidth: '42rem', margin: '0 auto' }}
                >
                    <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.6, color: colors.textBody, fontWeight: 500, margin: 0 }}>
                        Advanced biological optimization. We synchronize your molecular data to engineer the ultimate human experience.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <motion.button
                            onClick={() => navigate('/signup')}
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                padding: '16px 40px', borderRadius: '9999px',
                                backgroundColor: colors.bgCard, border: `1px solid ${colors.borderDefault}`,
                                color: colors.textPrimary, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                                cursor: 'pointer', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{
                                backgroundColor: colors.bgElevated,
                                borderColor: colors.emerald,
                                y: -2
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            Launch Protocol
                            <ArrowRight size={18} color={colors.emerald} />
                        </motion.button>
                        <button
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                padding: '16px 40px', borderRadius: '9999px',
                                backgroundColor: 'transparent', border: 'none',
                                color: colors.textMuted, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = colors.textBody}
                            onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
                        >
                            View Specs
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
