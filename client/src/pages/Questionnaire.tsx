import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';

// ─── SVG Icons — 20×20, stroke-based, Lucide-style ────────────────────────────

const IconWeightDown = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5a5.5 5.5 0 1 1 11 0" />
        <path d="M4 6.5h16" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M12 12v7" />
        <path d="M9 16l3 3 3-3" />
    </svg>
);

const IconMuscle = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5C5 5 5 3 7 2s4 1 4 1 2-1 4 1 1 4-1 5L10.5 12" />
        <path d="M13.5 10.5l3 3c1.5 1.5 1.5 3.5-.5 4.5s-4 .5-5-1L8 14c-1-1-.5-2.5 1-3.5l1.5-1" />
    </svg>
);

const IconBalance = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <path d="M5 6l7-3 7 3" />
        <path d="M3 10l4 9H3" />
        <path d="M21 10l-4 9h4" />
        <line x1="3" y1="19" x2="9" y2="19" />
        <line x1="15" y1="19" x2="21" y2="19" />
    </svg>
);

const IconHeartPulse = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.07 4.93a7 7 0 0 0-9.9 0L12 7.93l2.83-3a7 7 0 0 1 4.24 10.07" />
        <path d="M12 7.93L9.17 4.93A7 7 0 0 0 5 15l7 7 3.5-3.5" />
        <path d="M7 12h2l1.5-3 2 6 1.5-3H16" />
    </svg>
);

const IconDesk = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="8" y2="17" />
        <line x1="16" y1="21" x2="16" y2="17" />
        <line x1="6" y1="21" x2="18" y2="21" />
        <line x1="7" y1="10" x2="17" y2="10" />
        <line x1="7" y1="13" x2="13" y2="13" />
    </svg>
);

const IconWalk = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="3.5" r="1.5" />
        <path d="M10 7.5l-2 5h4l1.5 6" />
        <path d="M14.5 7.5l2 4" />
        <path d="M8.5 18.5l1-4.5" />
        <path d="M6 21l3-4" />
        <path d="M15.5 21l-1.5-4.5" />
    </svg>
);

const IconRun = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="15" cy="3.5" r="1.5" />
        <path d="M8 8.5l3 2 3-4.5" />
        <path d="M6 12.5l3-4.5 5.5 1.5" />
        <path d="M15 7l2.5 5-3.5 2-1 5" />
        <path d="M7 19.5l2.5-5.5" />
        <path d="M16.5 8.5l2.5 1.5" />
    </svg>
);

const IconZap = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

// Meals — distinct plate icons per frequency
const IconPlate2 = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="6" />
        <path d="M12 8V4" />
        <path d="M8 4h8" />
        <path d="M9.5 14a2.5 2.5 0 0 1 5 0" />
    </svg>
);

const IconPlate3 = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="6" />
        <line x1="8" y1="3" x2="8" y2="6" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="16" y1="3" x2="16" y2="6" />
        <path d="M9.5 14a2.5 2.5 0 0 1 5 0" />
    </svg>
);

const IconPlate5 = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="6" />
        <path d="M6 4l2 3M12 3v3M18 4l-2 3" />
        <path d="M9 12h6M9 15.5h6" />
    </svg>
);

const IconClock = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 3.5" />
        <path d="M6.5 3.5l1.5 1.5M17.5 3.5L16 5" />
    </svg>
);

const IconDrumstick = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.45 8.55a4 4 0 1 0-5.66 5.66" />
        <path d="M9.79 14.21L4.5 19.5" />
        <circle cx="4.5" cy="19.5" r="2" />
        <path d="M8.5 10.5L13 6" />
    </svg>
);

const IconLeaf = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

const IconSeedling = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12C12 7 8 4 3 3c0 5 3 9 9 9z" />
        <path d="M12 12c0-5 4-8 9-9 0 5-3 9-9 9z" />
        <path d="M9 20h6" />
    </svg>
);

const IconWheatOff = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="2" x2="22" y2="22" />
        <path d="M11.6 6.6A3 3 0 0 1 15 10M9 9a3 3 0 0 0 3.4 2.9" />
        <path d="M12 3v3M9 21h6M12 15v6" />
        <path d="M14.9 9A3 3 0 0 1 12 12M6 9a3 3 0 0 0 3 3" />
        <path d="M9 15a3 3 0 0 0 2.6-1.5M15 12a3 3 0 0 1-1.1 2.3" />
    </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
type IconRenderer = (color: string) => React.ReactNode;

type AnswerMap = Record<string, number | number[] | string>;

interface BaseStep {
    key: string;
    label: string;
    title: string;
    sub: string;
}

interface OptionsStep extends BaseStep {
    type: 'options' | 'tiles';
    options: { icon: IconRenderer; label: string; desc?: string; sub?: string }[];
}

interface SliderStep extends BaseStep {
    type: 'slider';
    min: number; max: number; default: number;
    step: number; unit: string;
    labels: [string, string];
}

interface MultiStep extends BaseStep {
    type: 'multi';
    options: { icon: IconRenderer; label: string; desc: string }[];
}

type Step = OptionsStep | SliderStep | MultiStep;

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
    {
        key: 'goal', label: 'Primary goal',
        title: "What's your main goal?",
        sub: 'This shapes everything — your plan is built around this.',
        type: 'options',
        options: [
            { icon: (c) => <IconWeightDown color={c} />, label: 'Lose weight', desc: 'Reduce body fat, improve composition' },
            { icon: (c) => <IconMuscle color={c} />, label: 'Build muscle', desc: 'Gain lean mass and strength' },
            { icon: (c) => <IconBalance color={c} />, label: 'Maintain & tone', desc: 'Stay lean, improve fitness' },
            { icon: (c) => <IconHeartPulse color={c} />, label: 'Improve health', desc: 'Energy, longevity, better habits' },
        ],
    },
    {
        key: 'activity', label: 'Activity level',
        title: 'How active are you currently?',
        sub: 'Be honest — this sets your calorie baseline.',
        type: 'options',
        options: [
            { icon: (c) => <IconDesk color={c} />, label: 'Sedentary', desc: 'Desk job, little to no exercise' },
            { icon: (c) => <IconWalk color={c} />, label: 'Lightly active', desc: '1–3 workouts per week' },
            { icon: (c) => <IconRun color={c} />, label: 'Moderately active', desc: '3–5 workouts per week' },
            { icon: (c) => <IconZap color={c} />, label: 'Very active', desc: '6+ workouts or physical job' },
        ],
    },
    {
        key: 'weight', label: 'Current weight',
        title: 'What do you weigh right now?',
        sub: 'Used to calculate your daily calorie and macro targets.',
        type: 'slider',
        min: 40, max: 160, default: 70, step: 0.5, unit: 'kg',
        labels: ['40 kg', '160 kg'],
    },
    {
        key: 'sleep', label: 'Recovery quality',
        title: 'How well did you sleep last night?',
        sub: 'Poor sleep raises cortisol and affects nutrient partitioning.',
        type: 'slider',
        min: 1, max: 10, default: 7, step: 1, unit: '/ 10',
        labels: ['Restless', 'Deep sleep'],
    },
    {
        key: 'meals', label: 'Eating pattern',
        title: 'How do you prefer to eat?',
        sub: 'Your plan adapts to your natural rhythm.',
        type: 'tiles',
        options: [
            { icon: (c) => <IconPlate2 color={c} />, label: '2 meals', sub: 'OMAD or 2/day' },
            { icon: (c) => <IconPlate3 color={c} />, label: '3 meals', sub: 'Classic structure' },
            { icon: (c) => <IconPlate5 color={c} />, label: '4–5 meals', sub: 'Frequent eating' },
            { icon: (c) => <IconClock color={c} />, label: 'Intermittent fast', sub: '16:8 or 18:6' },
        ],
    },
    {
        key: 'restrictions', label: 'Dietary needs',
        title: 'Any dietary restrictions?',
        sub: 'Select all that apply to your current diet.',
        type: 'multi',
        options: [
            { icon: (c) => <IconDrumstick color={c} />, label: 'None', desc: 'No restrictions' },
            { icon: (c) => <IconLeaf color={c} />, label: 'Vegetarian', desc: 'No meat' },
            { icon: (c) => <IconSeedling color={c} />, label: 'Vegan', desc: 'No animal products' },
            { icon: (c) => <IconWheatOff color={c} />, label: 'Gluten-free', desc: 'Celiac or intolerance' },
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const canProceed = (step: Step, answers: AnswerMap): boolean => {
    if (!answers || !step) return false;
    if (step.type === 'slider') return true;
    if (step.type === 'multi') return ((answers[step.key] as number[]) || []).length > 0;
    return answers[step.key] !== undefined;
};

const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

// ─── ECG Icon ─────────────────────────────────────────────────────────────────
const ECGIcon: React.FC<{ color?: string }> = ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
        <polyline points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="60" strokeDashoffset="60">
            <animate attributeName="stroke-dashoffset" from="60" to="-60" dur="1.5s" repeatCount="indefinite" />
        </polyline>
    </svg>
);

// ─── OptionCard ───────────────────────────────────────────────────────────────
const OptionCard: React.FC<{
    icon: IconRenderer; label: string; desc?: string;
    selected: boolean; onClick: () => void; colors: any;
}> = ({ icon, label, desc, selected, onClick, colors }) => {
    const iconColor = selected ? colors.emerald : colors.textMuted;
    return (
        <button onClick={onClick} style={{
            background: selected ? colors.emeraldTint : colors.bgElevated,
            border: `0.5px solid ${selected ? colors.emeraldBorder : colors.borderDefault}`,
            borderRadius: 12, padding: '13px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
            color: selected ? colors.emerald : colors.textBody, width: '100%',
            transition: 'all 0.18s',
        }}>
            <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: selected ? colors.emeraldTint : colors.bgCard,
                border: `0.5px solid ${selected ? colors.emeraldBorder : colors.borderSubtle}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {icon(iconColor)}
            </div>
            <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: selected ? colors.emerald : colors.textPrimary }}>{label}</div>
                {desc && <div style={{ fontSize: 12, color: selected ? colors.emeraldDim : colors.textMuted, marginTop: 2 }}>{desc}</div>}
            </div>
        </button>
    );
};

// ─── TileCard ─────────────────────────────────────────────────────────────────
const TileCard: React.FC<{
    icon: IconRenderer; label: string; sub?: string;
    selected: boolean; onClick: () => void; colors: any;
}> = ({ icon, label, sub, selected, onClick, colors }) => {
    const iconColor = selected ? colors.emerald : colors.textMuted;
    return (
        <button onClick={onClick} style={{
            background: selected ? colors.emeraldTint : colors.bgElevated,
            border: `0.5px solid ${selected ? colors.emeraldBorder : colors.borderDefault}`,
            borderRadius: 12, padding: '18px 14px', cursor: 'pointer',
            textAlign: 'center', color: selected ? colors.emerald : colors.textBody,
            transition: 'all 0.18s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
            <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: selected ? colors.emeraldTint : colors.bgCard,
                border: `0.5px solid ${selected ? colors.emeraldBorder : colors.borderSubtle}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {icon(iconColor)}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: selected ? colors.emerald : colors.textPrimary }}>{label}</div>
            {sub && <div style={{ fontSize: 11, color: selected ? colors.emeraldDim : colors.textMuted }}>{sub}</div>}
        </button>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Questionnaire: React.FC = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [done, setDone] = useState(false);

    // Initial Values
    const initialValues: AnswerMap = {
        goal: undefined as any,
        activity: undefined as any,
        weight: 70,
        sleep: 7,
        meals: undefined as any,
        restrictions: [0] // Default to 'None'
    };

    // Validation Schema
    const validationSchema = Yup.object().shape({
        goal: Yup.number().required('Purpose is required'),
        activity: Yup.number().required('Activity level is required'),
        weight: Yup.number().min(40).max(160).required(),
        sleep: Yup.number().min(1).max(10).required(),
        meals: Yup.number().required('Meal frequency is required'),
        restrictions: Yup.array().of(Yup.number()).min(1, 'Select at least one option')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log('Questionnaire Data:', values);
            setDone(true);
        }
    });

    const { values, setFieldValue } = formik;

    const step = STEPS[current];
    const progress = (current / STEPS.length) * 100;

    const handleBack = () => {
        if (current === 0) { navigate('/login'); return; }
        setDirection(-1);
        setCurrent(c => c - 1);
    };

    const handleNext = () => {
        if (current === STEPS.length - 1) {
            formik.handleSubmit();
            return;
        }
        setDirection(1);
        setCurrent(c => c + 1);
    };

    const setAnswer = (key: string, val: number) => setFieldValue(key, val);
    const sliderVal = (key: string, def: number) => values[key] !== undefined ? (values[key] as number) : def;
    const labelOf = (arr: string[], idx: number | undefined) => idx !== undefined ? arr[idx] : '—';

    const toggleMulti = (key: string, val: number) => {
        const cur = (values[key] as number[]) || [];
        if (val === 0) {
            setFieldValue(key, [0]);
            return;
        }
        const without0 = cur.filter(v => v !== 0);
        const nextVal = without0.includes(val)
            ? without0.filter(v => v !== val)
            : [...without0, val];

        setFieldValue(key, nextVal.length === 0 ? [0] : nextVal);
    };

    const goalLabels = (STEPS[0] as OptionsStep).options.map(o => o.label);
    const actLabels = (STEPS[1] as OptionsStep).options.map(o => o.label);
    const mealLabels = (STEPS[4] as OptionsStep).options.map(o => o.label);
    const dietLabels = (STEPS[5] as MultiStep).options.map(o => o.label);

    return (
        <div style={{
            minHeight: '100vh', background: colors.bgPage, color: colors.textPrimary,
            display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif",
            position: 'relative', overflow: 'hidden',
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 3px; border-radius: 999px; background: ${colors.borderDefault}; cursor: pointer; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${colors.emerald}; border: 2px solid ${colors.bgPage}; cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: ${colors.emerald}; border: 2px solid ${colors.bgPage}; cursor: pointer; }
      `}</style>

            {/* Ambient */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(13,148,136,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${colors.borderSubtle} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderSubtle} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
            </div>

            {/* Header */}
            <header style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', gap: 20 }}>
                <button onClick={handleBack} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: colors.bgCard, border: `0.5px solid ${colors.borderDefault}`,
                    color: colors.textMuted, fontSize: 13, fontWeight: 600, padding: '9px 16px',
                    borderRadius: 9, cursor: 'pointer', letterSpacing: '0.03em', flexShrink: 0,
                    transition: 'color 0.15s, border-color 0.15s',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = colors.textPrimary; (e.currentTarget as HTMLButtonElement).style.borderColor = colors.borderHover; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = colors.textMuted; (e.currentTarget as HTMLButtonElement).style.borderColor = colors.borderDefault; }}
                >
                    <ChevronLeft size={15} /> Back
                </button>

                <div style={{ flex: 1, height: 3, background: colors.bgElevated, borderRadius: 999, overflow: 'hidden' }}>
                    <motion.div
                        style={{ height: '100%', background: colors.emerald, borderRadius: 999 }}
                        animate={{ width: done ? '100%' : `${progress}%` }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                </div>

                <span style={{ fontSize: 11, color: colors.textMuted, fontWeight: 700, letterSpacing: '0.15em', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {done ? 'COMPLETE' : `${current + 1} / ${STEPS.length}`}
                </span>
            </header>

            {/* Main */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 10 }}>
                <FormikProvider value={formik}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={done ? 'summary' : current}
                            custom={direction}
                            variants={variants}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                width: '100%', maxWidth: 500,
                                background: colors.bgCard,
                                border: `0.5px solid ${colors.borderDefault}`,
                                borderRadius: 18, padding: '2.75rem',
                            }}
                        >
                            {done ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                        <ECGIcon color={colors.emerald} />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: colors.emerald, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>Profile Initialized</span>
                                    </div>
                                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: colors.textPrimary, letterSpacing: '-0.03em', margin: '0 0 6px' }}>Intelligence Summary</h1>
                                    <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: '0 0 2rem', lineHeight: 1.6 }}>Review your protocol baselines before we activate.</p>

                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {[
                                            { k: 'Primary Objective', v: labelOf(goalLabels, values.goal as number) },
                                            { k: 'Activity Level', v: labelOf(actLabels, values.activity as number) },
                                            { k: 'Body Mass', v: `${parseFloat(String(values.weight || 70)).toFixed(1)} kg` },
                                            { k: 'Sleep Quality', v: `${Math.round(Number(values.sleep || 7))} / 10` },
                                            { k: 'Eating Pattern', v: labelOf(mealLabels, values.meals as number) },
                                            { k: 'Dietary Needs', v: ((values.restrictions as number[]) || []).map(i => dietLabels[i]).join(', ') || 'None' },
                                        ].map(row => (
                                            <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: `0.5px solid ${colors.borderSubtle}`, fontSize: '0.85rem' }}>
                                                <span style={{ color: colors.textMuted, fontWeight: 500 }}>{row.k}</span>
                                                <span style={{ color: colors.emerald, fontWeight: 700 }}>{row.v}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        style={{
                                            marginTop: '2rem', width: '100%', padding: '14px',
                                            background: colors.emerald, color: colors.bgPage,
                                            fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase',
                                            border: 'none', borderRadius: 10, cursor: 'pointer',
                                            transition: 'background 0.18s',
                                        }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = colors.emeraldLight)}
                                        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = colors.emerald)}
                                    >
                                        Activate Protocol →
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: colors.emerald, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
                                        Step {current + 1} of {STEPS.length}
                                    </div>
                                    <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: colors.textPrimary, letterSpacing: '-0.03em', margin: '0 0 8px' }}>{step.title}</h1>
                                    <p style={{ fontSize: '0.88rem', color: colors.textMuted, margin: '0 0 2rem', lineHeight: 1.65 }}>{step.sub}</p>

                                    {step.type === 'options' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '2rem' }}>
                                            {step.options.map((o, i) => (
                                                <OptionCard key={i} icon={o.icon} label={o.label} desc={o.desc}
                                                    colors={colors} selected={values[step.key] === i} onClick={() => setAnswer(step.key, i)} />
                                            ))}
                                        </div>
                                    )}

                                    {step.type === 'tiles' && (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '2rem' }}>
                                            {step.options.map((o, i) => (
                                                <TileCard key={i} icon={o.icon} label={o.label} sub={o.sub}
                                                    colors={colors} selected={values[step.key] === i} onClick={() => setAnswer(step.key, i)} />
                                            ))}
                                        </div>
                                    )}

                                    {step.type === 'multi' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '2rem' }}>
                                            {step.options.map((o, i) => (
                                                <OptionCard key={i} icon={o.icon} label={o.label} desc={o.desc}
                                                    colors={colors}
                                                    selected={((values[step.key] as number[]) || []).includes(i)}
                                                    onClick={() => toggleMulti(step.key, i)} />
                                            ))}
                                        </div>
                                    )}

                                    {step.type === 'slider' && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ fontSize: '3rem', fontWeight: 900, color: colors.textPrimary, marginBottom: 20, letterSpacing: '-0.04em', fontFamily: "'DM Mono', monospace" }}>
                                                {step.unit === 'kg'
                                                    ? parseFloat(String(sliderVal(step.key, step.default))).toFixed(1)
                                                    : Math.round(sliderVal(step.key, step.default))}
                                                <span style={{ fontSize: '1.1rem', fontWeight: 400, color: colors.textMuted, marginLeft: 8 }}>{step.unit}</span>
                                            </div>
                                            <input
                                                type="range" min={step.min} max={step.max} step={step.step}
                                                value={sliderVal(step.key, step.default)}
                                                onChange={e => setAnswer(step.key, parseFloat(e.target.value))}
                                                style={{ marginBottom: 12 }}
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: colors.textMuted, fontWeight: 600, letterSpacing: '0.06em', fontFamily: "'DM Mono', monospace" }}>
                                                <span>{step.labels[0]}</span><span>{step.labels[1]}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleNext}
                                        disabled={!canProceed(step, values)}
                                        style={{
                                            width: '100%', padding: '14px',
                                            background: canProceed(step, values) ? colors.emerald : colors.bgElevated,
                                            color: canProceed(step, values) ? colors.bgPage : colors.textMuted,
                                            fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase',
                                            border: `0.5px solid ${canProceed(step, values) ? colors.emeraldBorder : colors.borderSubtle}`,
                                            borderRadius: 10, cursor: canProceed(step, values) ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.18s',
                                        }}
                                        onMouseEnter={e => { if (canProceed(step, values)) (e.currentTarget as HTMLButtonElement).style.background = colors.emeraldLight; }}
                                        onMouseLeave={e => { if (canProceed(step, values)) (e.currentTarget as HTMLButtonElement).style.background = colors.emerald; }}
                                    >
                                        {current === STEPS.length - 1 ? 'Build My Plan →' : 'Continue →'}
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </FormikProvider>
            </main>
        </div>
    );
};

export default Questionnaire;