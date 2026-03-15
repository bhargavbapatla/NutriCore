import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Lock, Mail, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { signup } from '../api/authentication';
import { toast } from 'sonner';
import { useFormik, FormikProvider, Field } from 'formik';
import * as Yup from 'yup';

// ─── Reusable field wrapper ────────────────────────────────────────────────────
// Separates the input+icon row from the error message so the icon never
// gets pushed out of center when validation text appears below.
const InputField: React.FC<{
    name: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    label: string;
    isFocused: boolean;
    onFocus: () => void;
    onBlur: (e: React.FocusEvent) => void;
    colors: any;
    extraStyle?: React.CSSProperties;
}> = ({ name, type, placeholder, icon, label, isFocused, onFocus, onBlur, colors, extraStyle }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
            fontSize: '0.62rem', fontWeight: 700,
            color: colors.textMuted, textTransform: 'uppercase',
            letterSpacing: '0.18em', paddingLeft: 2,
            fontFamily: "'DM Mono', monospace",
        }}>
            {label}
        </label>
        <Field name={name}>
            {({ field, meta }: any) => (
                <>
                    {/* ── Input row — icon always centers against THIS div only ── */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: 14,
                            top: '50%',                    // ← always 50% of the input row height
                            transform: 'translateY(-50%)', // ← never affected by error text below
                            color: isFocused ? colors.emerald : (meta.touched && meta.error ? colors.danger : colors.textMuted),
                            transition: 'color 0.2s',
                            display: 'flex',
                            pointerEvents: 'none',
                        }}>
                            {icon}
                        </div>
                        <input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            onBlur={(e) => { field.onBlur(e); onBlur(e); }}
                            style={{
                                width: '100%',
                                padding: '13px 14px 13px 42px',
                                background: colors.bgElevated,
                                border: `0.5px solid ${meta.touched && meta.error
                                        ? colors.danger
                                        : isFocused
                                            ? colors.emeraldBorder
                                            : colors.borderDefault
                                    }`,
                                borderRadius: 10,
                                color: colors.textPrimary,
                                fontSize: '0.88rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                fontFamily: "'DM Sans', sans-serif",
                                boxSizing: 'border-box' as const,
                                ...extraStyle,
                            }}
                        />
                    </div>
                    {/* ── Error lives outside the relative container ── */}
                    {meta.touched && meta.error && (
                        <div style={{
                            color: colors.danger,
                            fontSize: '0.65rem',
                            fontWeight: 500,
                            marginTop: -2,
                            paddingLeft: 2,
                        }}>
                            {meta.error}
                        </div>
                    )}
                </>
            )}
        </Field>
    </div>
);

// ─── Signup ───────────────────────────────────────────────────────────────────
const Signup: React.FC = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [nameFocus, setNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(7, 'Min 7 characters').max(72, 'Too long').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
    });

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', confirmPassword: '' },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { confirmPassword, ...signupData } = values;
                const response = await signup(signupData);
                if (response.status === 200) toast.success(response.data.message || 'Account created');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/questionnaire');
            } catch (err: any) {
                let msg = 'Failed to create account.';
                if (err.detail) {
                    msg = Array.isArray(err.detail) ? err.detail.map((e: any) => e.msg).join(', ') : err.detail;
                } else if (err.message) msg = err.message;
                toast.error('Signup Failed', { description: msg });
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            position: 'relative', overflow: 'hidden',
            backgroundColor: colors.bgPage, color: colors.textPrimary,
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${colors.bgElevated} inset !important;
          -webkit-text-fill-color: ${colors.textPrimary} !important;
        }
        .return-link:hover { color: ${colors.emerald} !important; }
        .login-link:hover  { color: ${colors.emeraldLight} !important; }
      `}</style>

            {/* Ambient */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(244,63,94,0.05) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${colors.borderSubtle} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderSubtle} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
            </div>

            {/* Circuit lines */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <svg style={{ width: '100%', height: '100%', opacity: 0.5 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="sgGlowE" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor={colors.emerald} stopOpacity="0.7" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <linearGradient id="sgGlowD" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor={colors.danger} stopOpacity="0.6" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <motion.path d="M -50 200 C 200 200, 400 450, 720 450" fill="transparent" stroke="url(#sgGlowE)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.path d="M -50 750 C 300 750, 500 550, 720 550" fill="transparent" stroke="url(#sgGlowE)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
                    <motion.path d="M 1490 150 C 1200 150, 1000 450, 720 450" fill="transparent" stroke="url(#sgGlowD)" strokeWidth="1.5" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
                    <motion.path d="M 1490 800 C 1100 800, 900 550, 720 550" fill="transparent" stroke="url(#sgGlowD)" strokeWidth="1" strokeLinecap="round" animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
                </svg>
            </div>

            {/* Header */}
            <header style={{ position: 'relative', zIndex: 10, width: '100%', padding: '1.75rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 900, fontSize: '1.05rem', color: colors.textPrimary, fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em' }}>
                    <Activity size={20} color={colors.emerald} />
                    NUTRICORE
                </div>
                <Link to="/" className="return-link" style={{ textDecoration: 'none', fontSize: '0.68rem', fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
                    Return Home
                </Link>
            </header>

            {/* Card */}
            <main style={{ position: 'relative', zIndex: 10, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        width: '100%', maxWidth: 520,
                        padding: '2.75rem',
                        background: colors.bgCard,
                        borderRadius: 20,
                        border: `0.5px solid ${colors.borderDefault}`,
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        display: 'flex', flexDirection: 'column', gap: '2rem',
                        position: 'relative', overflow: 'hidden',
                    }}
                >
                    {/* Card glow */}
                    <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 120, background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {/* Title */}
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.4rem', letterSpacing: '-0.03em', color: colors.textPrimary }}>
                            Create an account
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>
                            Set up your profile to get started.
                        </p>
                    </div>

                    {/* Form */}
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                                <InputField name="name" type="text" placeholder="John Doe" label="Name" icon={<User size={15} />} isFocused={nameFocus} onFocus={() => setNameFocus(true)} onBlur={() => setNameFocus(false)} colors={colors} />
                                <InputField name="email" type="email" placeholder="you@example.com" label="Email" icon={<Mail size={15} />} isFocused={emailFocus} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} colors={colors} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                                <InputField name="password" type="password" placeholder="••••••••" label="Password" icon={<Lock size={15} />} isFocused={passFocus} onFocus={() => setPassFocus(true)} onBlur={() => setPassFocus(false)} colors={colors} extraStyle={{ letterSpacing: '0.15em' }} />
                                <InputField name="confirmPassword" type="password" placeholder="••••••••" label="Confirm Password" icon={<Lock size={15} />} isFocused={confirmFocus} onFocus={() => setConfirmFocus(true)} onBlur={() => setConfirmFocus(false)} colors={colors} extraStyle={{ letterSpacing: '0.15em' }} />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={!isLoading ? { y: -1 } : {}}
                                whileTap={!isLoading ? { scale: 0.97 } : {}}
                                transition={{ duration: 0.15 }}
                                style={{
                                    marginTop: '0.5rem',
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                    padding: '14px 0', width: '100%', borderRadius: 10,
                                    background: isLoading ? colors.bgElevated : colors.emerald,
                                    border: `0.5px solid ${isLoading ? colors.borderDefault : colors.emeraldBorder}`,
                                    color: isLoading ? colors.textMuted : colors.bgPage,
                                    fontSize: '0.78rem', fontWeight: 800,
                                    letterSpacing: '0.16em', textTransform: 'uppercase',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s, color 0.2s',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                {isLoading ? 'Creating account...' : <><span>Create account</span><ArrowRight size={15} /></>}
                            </motion.button>
                        </form>
                    </FormikProvider>

                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: colors.textMuted }}>
                        Already have an account?{' '}
                        <Link to="/login" className="login-link" style={{ color: colors.emerald, fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s' }}>
                            Log in
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Signup;