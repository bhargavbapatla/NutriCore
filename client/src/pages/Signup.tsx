import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Lock, Mail, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { signup } from '../api/authentication';
import { toast } from 'sonner';

const Signup: React.FC = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();

    // Form Data State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Loading and Error States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Focus States for UI Highlighting
    const [nameFocus, setNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            toast.error('Validation Error', {
                description: 'Passwords do not match'
            });
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...signupData } = formData;
            const response = await signup(signupData);
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message || "Success");
            }

            localStorage.setItem('isAuthenticated', 'true');
            navigate('/questionnaire');
        } catch (err: any) {
            console.error('Signup error:', err);

            let errorMessage = 'Failed to create account.';

            if (err.detail) {
                if (Array.isArray(err.detail)) {
                    // Extraction for FastAPI/Pydantic validation errors
                    errorMessage = err.detail.map((e: any) => e.msg).join(', ');
                } else if (typeof err.detail === 'string') {
                    errorMessage = err.detail;
                }
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error('Signup Failed', {
                description: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user changes form
        if (error) setError(null);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: colors.bgPage,
            fontFamily: "'DM Sans', sans-serif",
            color: colors.textPrimary
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
              border-radius: 8px !important;
          }
        `}
            </style>

            {/* --- AMBIENT BACKGROUND GLOW --- */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: `${colors.danger}0a`, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', backgroundColor: `${colors.emerald}0a`, filter: 'blur(100px)' }} />
            </div>

            {/* --- NEURAL CIRCUITS --- */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <svg style={{ width: '100%', height: '100%', opacity: 0.6 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="glowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor={colors.emerald} stopOpacity="0.8" /><stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <linearGradient id="glowRight" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor={colors.danger} stopOpacity="0.8" /><stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    <motion.path d="M -50 200 C 200 200, 400 450, 720 450" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.path d="M -50 750 C 300 750, 500 550, 720 550" fill="transparent" stroke="url(#glowLeft)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
                    <motion.path d="M 1490 150 C 1200 150, 1000 450, 720 450" fill="transparent" stroke="url(#glowRight)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
                    <motion.path d="M 1490 800 C 1100 800, 900 550, 720 550" fill="transparent" stroke="url(#glowRight)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
                </svg>
            </div>

            {/* --- HEADER --- */}
            <header style={{ position: 'relative', zIndex: 10, width: '100%', padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1.25rem', color: colors.textPrimary, fontFamily: "'DM Mono', monospace", letterSpacing: '0.05em' }}>
                    <Activity size={24} color={colors.emerald} />
                    NUTRICORE
                </div>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'color 0.3s' }}>
                    Return Home
                </Link>
            </header>

            {/* --- SIGNUP TERMINAL --- */}
            <main style={{ position: 'relative', zIndex: 10, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        width: '100%',
                        maxWidth: '520px',
                        padding: '3.5rem',
                        backgroundColor: colors.bgCard,
                        borderRadius: '16px',
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
                            Create an Account
                        </h1>
                        <p style={{ fontSize: '0.9rem', color: colors.textMuted, margin: 0 }}>
                            Set up your professional profile to continue.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            {/* Name Field */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.05em' }}>
                                    Name
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: nameFocus ? colors.emerald : colors.textMuted, transition: 'color 0.3s' }}>
                                        <User size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                        style={{
                                            width: '100%', boxSizing: 'border-box', padding: '14px 14px 14px 42px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${nameFocus ? colors.emeraldBorder : colors.borderSubtle}`,
                                            borderRadius: '8px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.05em' }}>
                                    Email ID
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: emailFocus ? colors.emerald : colors.textMuted, transition: 'color 0.3s' }}>
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                        style={{
                                            width: '100%', boxSizing: 'border-box', padding: '14px 14px 14px 42px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${emailFocus ? colors.emeraldBorder : colors.borderSubtle}`,
                                            borderRadius: '8px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            {/* Password Field */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.05em' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: passFocus ? colors.emerald : colors.textMuted, transition: 'color 0.3s' }}>
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => setPassFocus(true)}
                                        onBlur={() => setPassFocus(false)}
                                        style={{
                                            width: '100%', boxSizing: 'border-box', padding: '14px 14px 14px 42px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${passFocus ? colors.emeraldBorder : colors.borderSubtle}`,
                                            borderRadius: '8px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease', letterSpacing: '0.1em'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.05em' }}>
                                    Confirm Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: confirmFocus ? colors.emerald : colors.textMuted, transition: 'color 0.3s' }}>
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onFocus={() => setConfirmFocus(true)}
                                        onBlur={() => setConfirmFocus(false)}
                                        style={{
                                            width: '100%', boxSizing: 'border-box', padding: '14px 14px 14px 42px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${confirmFocus ? colors.emeraldBorder : colors.borderSubtle}`,
                                            borderRadius: '8px', color: colors.textPrimary, fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease', letterSpacing: '0.1em'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                marginTop: '1.5rem',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                padding: '16px 0', width: '100%',
                                borderRadius: '8px',
                                backgroundColor: isLoading ? colors.borderDefault : colors.emeraldTint,
                                border: `1px solid ${isLoading ? colors.borderSubtle : colors.emeraldBorder}`,
                                color: isLoading ? colors.textMuted : colors.emerald,
                                fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            whileHover={!isLoading ? {
                                backgroundColor: colors.emeraldGlow,
                                borderColor: colors.emerald,
                                y: -2
                            } : {}}
                            transition={{ duration: 0.2 }}
                        >
                            {isLoading ? 'Processing...' : 'Create'}
                            {!isLoading && <ArrowRight size={18} color={colors.emerald} />}
                        </motion.button>
                    </form>

                    {/* Footer Link */}
                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: colors.textMuted }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: colors.emerald, fontWeight: 600, textDecoration: 'none' }}>
                            Log in
                        </Link>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};

export default Signup;
