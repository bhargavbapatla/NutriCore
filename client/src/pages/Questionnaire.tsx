import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────
type AnswerMap = Record<string, number | number[] | string>;

interface BaseStep {
    key: string;
    label: string;
    title: string;
    sub: string;
}

interface OptionsStep extends BaseStep {
    type: 'options' | 'tiles';
    options: { icon: string; label: string; desc?: string; sub?: string }[];
}

interface SliderStep extends BaseStep {
    type: 'slider';
    min: number;
    max: number;
    default: number;
    step: number;
    unit: string;
    labels: [string, string];
}

interface MultiStep extends BaseStep {
    type: 'multi';
    options: { icon: string; label: string; desc: string }[];
}

type Step = OptionsStep | SliderStep | MultiStep;

// ─── Questions ───────────────────────────────────────────────────────────────

const STEPS: Step[] = [
    {
        key: 'goal',
        label: 'Primary goal',
        title: "What's your main goal?",
        sub: 'This shapes everything — your plan is built around this.',
        type: 'options',
        options: [
            { icon: '↓', label: 'Lose weight', desc: 'Reduce body fat, improve composition' },
            { icon: '↑', label: 'Build muscle', desc: 'Gain lean mass and strength' },
            { icon: '◎', label: 'Maintain & tone', desc: 'Stay lean, improve fitness' },
            { icon: '♡', label: 'Improve health', desc: 'Energy, longevity, better habits' },
        ],
    },
    {
        key: 'activity',
        label: 'Activity level',
        title: 'How active are you currently?',
        sub: 'Be honest — this sets your calorie baseline.',
        type: 'options',
        options: [
            { icon: '🪑', label: 'Sedentary', desc: 'Desk job, little to no exercise' },
            { icon: '🚶', label: 'Lightly active', desc: '1–3 workouts per week' },
            { icon: '🏃', label: 'Moderately active', desc: '3–5 workouts per week' },
            { icon: '⚡', label: 'Very active', desc: '6+ workouts or physical job' },
        ],
    },
    {
        key: 'weight',
        label: 'Current weight',
        title: 'What do you weigh right now?',
        sub: 'Used to calculate your daily calorie and macro targets.',
        type: 'slider',
        min: 40, max: 160, default: 70, step: 0.5, unit: 'kg',
        labels: ['40 kg', '160 kg'],
    },
    {
        key: 'sleep',
        label: 'Recovery quality',
        title: 'How well did you sleep last night?',
        sub: 'Poor sleep raises cortisol and affects nutrient partitioning.',
        type: 'slider',
        min: 1, max: 10, default: 7, step: 1, unit: '/ 10',
        labels: ['Restless', 'Deep sleep'],
    },
    {
        key: 'meals',
        label: 'Eating pattern',
        title: 'How do you prefer to eat?',
        sub: 'Your plan adapts to your natural rhythm.',
        type: 'tiles',
        options: [
            { icon: '🍽️', label: '2 meals', sub: 'OMAD or 2/day' },
            { icon: '🍽️', label: '3 meals', sub: 'Classic structure' },
            { icon: '🍽️', label: '4–5 meals', sub: 'Frequent eating' },
            { icon: '⏰', label: 'Intermittent fast', sub: '16:8 or 18:6' },
        ],
    },
    {
        key: 'restrictions',
        label: 'Dietary needs',
        title: 'Any dietary restrictions?',
        sub: 'Select all that apply to your current diet.',
        type: 'multi',
        options: [
            { icon: '🥩', label: 'None', desc: 'No restrictions' },
            { icon: '🌿', label: 'Vegetarian', desc: 'No meat' },
            { icon: '🌱', label: 'Vegan', desc: 'No animal products' },
            { icon: '🚫', label: 'Gluten-free', desc: 'Celiac or intolerance' },
        ],
    },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const canProceed = (step: Step, answers: AnswerMap): boolean => {
    if (step.type === 'slider') return true;
    if (step.type === 'multi') return ((answers[step.key] as number[]) || []).length > 0;
    return answers[step.key] !== undefined;
};

// ─── Animation variants ──────────────────────────────────────────────────────

const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

// ─── ECG Icon ────────────────────────────────────────────────────────────────

const ECGIcon: React.FC<{ color?: string }> = ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
        <polyline
            points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
            stroke={color} strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="60" strokeDashoffset="60"
        >
            <animate attributeName="stroke-dashoffset" from="60" to="-60" dur="1.5s" repeatCount="indefinite" />
        </polyline>
    </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const OptionCard: React.FC<{
    icon: string; label: string; desc?: string;
    selected: boolean; onClick: () => void;
    colors: any;
}> = ({ icon, label, desc, selected, onClick, colors }) => (
    <button
        onClick={onClick}
        style={{
            background: selected ? colors.emeraldTint : colors.bgElevated,
            border: `0.5px solid ${selected ? colors.emerald : colors.borderSubtle}`,
            borderRadius: 14, padding: '14px 18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
            color: selected ? colors.emerald : colors.textBody, width: '100%',
            transition: 'all 0.18s',
        }}
    >
        <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: selected ? colors.emeraldTint : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
            {desc && <div style={{ fontSize: 12, color: selected ? colors.emerald : colors.textMuted, marginTop: 2 }}>{desc}</div>}
        </div>
    </button>
);

const TileCard: React.FC<{
    icon: string; label: string; sub?: string;
    selected: boolean; onClick: () => void;
    colors: any;
}> = ({ icon, label, sub, selected, onClick, colors }) => (
    <button
        onClick={onClick}
        style={{
            background: selected ? colors.emeraldTint : colors.bgElevated,
            border: `0.5px solid ${selected ? colors.emerald : colors.borderSubtle}`,
            borderRadius: 14, padding: '18px 14px', cursor: 'pointer',
            textAlign: 'center', color: selected ? colors.emerald : colors.textBody,
            transition: 'all 0.18s',
        }}
    >
        <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: selected ? colors.emerald : colors.textMuted, marginTop: 3 }}>{sub}</div>}
    </button>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const Questionnaire: React.FC = () => {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [done, setDone] = useState(false);

    const step = STEPS[current];
    const progress = (current / STEPS.length) * 100;

    const handleBack = () => {
        if (current === 0) { navigate('/login'); return; }
        setDirection(-1);
        setCurrent(c => c - 1);
    };

    const handleNext = () => {
        if (current === STEPS.length - 1) { setDone(true); return; }
        setDirection(1);
        setCurrent(c => c + 1);
    };

    const setAnswer = (key: string, val: number) => {
        setAnswers(prev => ({ ...prev, [key]: val }));
    };

    const toggleMulti = (key: string, val: number) => {
        setAnswers(prev => {
            const cur = (prev[key] as number[]) || [];
            if (val === 0) return { ...prev, [key]: [0] };
            const without0 = cur.filter(v => v !== 0);
            return {
                ...prev,
                [key]: without0.includes(val)
                    ? without0.filter(v => v !== val)
                    : [...without0, val],
            };
        });
    };

    const sliderVal = (key: string, def: number) =>
        answers[key] !== undefined ? (answers[key] as number) : def;

    const labelOf = (arr: string[], idx: number | undefined) =>
        idx !== undefined ? arr[idx] : '—';

    const goalLabels = STEPS[0].type !== 'slider' ? STEPS[0].options.map(o => o.label) : [];
    const actLabels = STEPS[1].type !== 'slider' ? STEPS[1].options.map(o => o.label) : [];
    const mealLabels = STEPS[4].type !== 'slider' ? STEPS[4].options.map(o => o.label) : [];
    const dietLabels = STEPS[5].type !== 'slider' ? STEPS[5].options.map(o => o.label) : [];

    return (
        <div style={{
            minHeight: '100vh', background: colors.bgPage, color: colors.textPrimary,
            display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif",
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Ambient blobs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: `${colors.emerald}0a`, filter: 'blur(120px)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '600px', height: '600px', background: `${colors.danger}0a`, filter: 'blur(120px)', borderRadius: '50%' }} />
            </div>

            {/* Header */}
            <header style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', gap: 20 }}>
                <button
                    onClick={handleBack}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: colors.bgCard, border: `1px solid ${colors.borderSubtle}`,
                        color: colors.textPrimary, fontSize: 13, fontWeight: 700, padding: '10px 18px',
                        borderRadius: 12, cursor: 'pointer', letterSpacing: '0.03em', flexShrink: 0,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ChevronLeft size={16} /> Back
                </button>

                {/* Progress bar */}
                <div style={{ flex: 1, height: 4, background: colors.borderSubtle, borderRadius: 999, overflow: 'hidden' }}>
                    <motion.div
                        style={{ height: '100%', background: colors.emerald, borderRadius: 999 }}
                        animate={{ width: done ? '100%' : `${progress}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>

                <span style={{ fontSize: 11, color: colors.textMuted, fontWeight: 800, letterSpacing: '0.15em', flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>
                    {done ? 'COMPLETE' : `${current + 1} / ${STEPS.length}`}
                </span>
            </header>

            {/* Main */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 10 }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={done ? 'summary' : current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            width: '100%', maxWidth: 520,
                            background: colors.bgCard,
                            border: `1px solid ${colors.borderDefault}`,
                            borderRadius: 16, padding: '3.5rem',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                    >
                        {done ? (
                            // ── Summary ──
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <ECGIcon color={colors.emerald} />
                                    <span style={{ fontSize: 11, fontWeight: 900, color: colors.emerald, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>Profile Initialized</span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.textPrimary, marginBottom: 8, letterSpacing: '-0.02em' }}>Intelligence Summary</div>
                                <p style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '2rem' }}>Biological data verification complete. Review your protocol baselines.</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[
                                        { k: 'Primary Objective', v: labelOf(goalLabels, answers.goal as number) },
                                        { k: 'Neural Activity', v: labelOf(actLabels, answers.activity as number) },
                                        { k: 'Biometric Mass', v: `${parseFloat(String(answers.weight || 70)).toFixed(1)} kg` },
                                        { k: 'Regen Quality', v: `${Math.round(Number(answers.sleep || 7))} / 10` },
                                        { k: 'Input Pattern', v: labelOf(mealLabels, answers.meals as number) },
                                        { k: 'Material Restrictions', v: ((answers.restrictions as number[]) || []).map(i => dietLabels[i]).join(', ') || 'None' },
                                    ].map(row => (
                                        <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.borderSubtle}`, fontSize: '0.9rem' }}>
                                            <span style={{ color: colors.textMuted, fontWeight: 600 }}>{row.k}</span>
                                            <span style={{ color: colors.emerald, fontWeight: 700 }}>{row.v}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    onClick={() => navigate('/dashboard')}
                                    whileHover={{ scale: 1.02, backgroundColor: colors.emeraldTint }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        marginTop: '2.5rem', width: '100%', padding: '18px',
                                        background: colors.emeraldTint, color: colors.emerald, fontSize: '0.85rem',
                                        fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                                        border: `1px solid ${colors.emeraldBorder}`, borderRadius: 12, cursor: 'pointer',
                                        backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'
                                    }}
                                >
                                    Activate Protocol →
                                </motion.button>
                            </>
                        ) : (
                            // ── Step ──
                            <>
                                <div style={{ fontSize: 11, fontWeight: 900, color: colors.emerald, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
                                    Step {current + 1}
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: colors.textPrimary, marginBottom: 12, letterSpacing: '-0.02em' }}>{step.title}</div>
                                <p style={{ fontSize: '0.95rem', color: colors.textMuted, marginBottom: '2.5rem', lineHeight: 1.6 }}>{step.sub}</p>

                                {step.type === 'options' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2.5rem' }}>
                                        {step.options.map((o, i) => (
                                            <OptionCard key={i} icon={o.icon} label={o.label} desc={o.desc}
                                                colors={colors}
                                                selected={answers[step.key] === i}
                                                onClick={() => setAnswer(step.key, i)} />
                                        ))}
                                    </div>
                                )}

                                {step.type === 'tiles' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '2.5rem' }}>
                                        {step.options.map((o, i) => (
                                            <TileCard key={i} icon={o.icon} label={o.label} sub={o.sub}
                                                colors={colors}
                                                selected={answers[step.key] === i}
                                                onClick={() => setAnswer(step.key, i)} />
                                        ))}
                                    </div>
                                )}

                                {step.type === 'multi' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2.5rem' }}>
                                        {step.options.map((o, i) => (
                                            <OptionCard key={i} icon={o.icon} label={o.label} desc={o.desc}
                                                colors={colors}
                                                selected={((answers[step.key] as number[]) || []).includes(i)}
                                                onClick={() => toggleMulti(step.key, i)} />
                                        ))}
                                    </div>
                                )}

                                {step.type === 'slider' && (
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: colors.textPrimary, marginBottom: 16 }}>
                                            {step.unit === 'kg'
                                                ? parseFloat(String(sliderVal(step.key, step.default))).toFixed(1)
                                                : Math.round(sliderVal(step.key, step.default))
                                            }
                                            <span style={{ fontSize: '1.25rem', fontWeight: 500, color: colors.textMuted, marginLeft: 8 }}>{step.unit}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={step.min} max={step.max} step={step.step}
                                            value={sliderVal(step.key, step.default)}
                                            onChange={e => setAnswer(step.key, parseFloat(e.target.value))}
                                            style={{
                                                width: '100%',
                                                accentColor: colors.emerald,
                                                marginBottom: 16,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: colors.textMuted, fontWeight: 700, letterSpacing: '0.05em' }}>
                                            <span>{step.labels[0]}</span><span>{step.labels[1]}</span>
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    onClick={handleNext}
                                    disabled={!canProceed(step, answers)}
                                    whileHover={canProceed(step, answers) ? { backgroundColor: colors.emeraldTint } : {}}
                                    style={{
                                        width: '100%', padding: '18px',
                                        background: canProceed(step, answers) ? colors.emeraldTint : 'rgba(255,255,255,0.03)',
                                        color: canProceed(step, answers) ? colors.emerald : colors.textMuted,
                                        fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
                                        border: `1px solid ${canProceed(step, answers) ? colors.emeraldBorder : colors.borderSubtle}`, borderRadius: 12,
                                        cursor: canProceed(step, answers) ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.3s ease',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    {current === STEPS.length - 1 ? 'Build Intelligence →' : 'Continue Sequence →'}
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Questionnaire;