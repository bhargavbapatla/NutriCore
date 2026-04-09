import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  LogOut, ChevronLeft, ChevronRight,
  LayoutDashboard, Utensils, Activity,
  FlaskConical, Calendar, Settings,
  Send, Sparkles, Plus,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useAuthStore from '@/store/authStore';
import { streamDashboardInit } from '@/api/dashboard';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  time: string;
  agent?: string;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: <LayoutDashboard size={17} />, label: 'Dashboard', active: true },
  { icon: <Utensils size={17} />, label: 'Meal Log', active: false },
  { icon: <Activity size={17} />, label: 'Fitness', active: false },
  { icon: <FlaskConical size={17} />, label: 'Bloodwork', active: false },
  { icon: <Calendar size={17} />, label: 'Weekly Plan', active: false },
  { icon: <Settings size={17} />, label: 'Settings', active: false },
];

const QUICK_PROMPTS = [
  'What should I eat for dinner tonight?',
  'Log 2 rotis and dal tadka',
  'How is my protein this week?',
  'Give me my cheat day budget',
  'Analyse my last bloodwork',
];

const getTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// ─── ECG Logo ─────────────────────────────────────────────────────────────────
const ECGLogo: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { colors } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 9, overflow: 'hidden' }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible', flexShrink: 0 }}>
        <polyline
          points="1,12 5,12 7,6 9,18 11,4 13,20 15,8 17,12 23,12"
          stroke={colors.emerald} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="60"
        >
          <animate attributeName="stroke-dashoffset" from="60" to="-60" dur="1.8s" repeatCount="indefinite" />
        </polyline>
      </svg>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontWeight: 900, fontSize: '0.92rem',
              color: colors.textPrimary, letterSpacing: '0.1em',
              whiteSpace: 'nowrap', fontFamily: "'DM Mono', monospace",
              overflow: 'hidden',
            }}
          >
            NUTRICORE
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Chat bubble ──────────────────────────────────────────────────────────────
const Bubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const { colors } = useTheme();
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      {!isUser && (
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: colors.emeraldTint,
          border: `0.5px solid ${colors.emeraldBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={13} color={colors.emerald} />
        </div>
      )}

      <div style={{
        maxWidth: '72%', display: 'flex', flexDirection: 'column',
        gap: 5, alignItems: isUser ? 'flex-end' : 'flex-start',
      }}>
        {!isUser && msg.agent && (
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, color: colors.emerald,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: "'DM Mono', monospace",
          }}>
            {msg.agent}
          </span>
        )}

        <div style={{
          background: isUser ? colors.emeraldTint : colors.bgElevated,
          border: `0.5px solid ${isUser ? colors.emeraldBorder : colors.borderDefault}`,
          borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
          padding: '0.8rem 1.1rem',
          fontSize: '0.88rem', color: colors.textPrimary, lineHeight: 1.75,
        }}>
          {isUser ? msg.text : (
            <div className="md-bubble">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p style={{ margin: '0 0 0.6em', lineHeight: 1.75 }}>{children}</p>,
                  strong: ({ children }) => <strong style={{ color: colors.emerald, fontWeight: 700 }}>{children}</strong>,
                  em: ({ children }) => <em style={{ color: colors.textBody, fontStyle: 'italic' }}>{children}</em>,
                  ul: ({ children }) => <ul style={{ margin: '0.4em 0', paddingLeft: '1.2em' }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ margin: '0.4em 0', paddingLeft: '1.2em' }}>{children}</ol>,
                  li: ({ children }) => <li style={{ marginBottom: '0.25em' }}>{children}</li>,
                  h1: ({ children }) => <h1 style={{ fontSize: '1rem', fontWeight: 800, color: colors.textPrimary, margin: '0 0 0.4em' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: '0.92rem', fontWeight: 700, color: colors.textPrimary, margin: '0 0 0.4em' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: colors.emerald, margin: '0 0 0.3em' }}>{children}</h3>,
                  code: ({ children }) => <code style={{ background: colors.bgCard, border: `0.5px solid ${colors.borderDefault}`, borderRadius: 4, padding: '0.1em 0.4em', fontSize: '0.82em', fontFamily: "'DM Mono', monospace", color: colors.emeraldLight }}>{children}</code>,
                  blockquote: ({ children }) => <blockquote style={{ borderLeft: `2px solid ${colors.emeraldBorder}`, margin: '0.4em 0', paddingLeft: '0.8em', color: colors.textBody }}>{children}</blockquote>,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <span style={{
          fontSize: '0.58rem', color: colors.textMuted,
          fontFamily: "'DM Mono', monospace",
        }}>
          {msg.time}
        </span>
      </div>
    </motion.div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { logoutStack } = useAuthStore();

  // Stream AI assessment on mount
  useEffect(() => {
    const controller = new AbortController();
    const messageId = 'init';
    let started = false;

    setIsTyping(true);

    streamDashboardInit((chunk) => {
      if (!started) {
        started = true;
        setIsTyping(false);
        setMessages([{
          id: messageId,
          role: 'agent',
          agent: 'PlannerAgent',
          text: chunk,
          time: getTime(),
        }]);
      } else {
        setMessages(prev =>
          prev.map(m => m.id === messageId ? { ...m, text: m.text + chunk } : m)
        );
      }
    }, controller.signal).catch((err) => {
      if (err.name !== 'AbortError') setIsTyping(false);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const time = getTime();

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text, time }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'agent', agent: 'PlannerAgent',
        text: "I'm pulling your full context — macro balance, today's logs, and micro history. One moment and I'll have a precise answer ready.",
        time,
      }]);
    }, 1800);
  };

  const sidebarW = collapsed ? 62 : 216;

  const handleLogout = async () => {
    await logoutStack();
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: colors.bgPage, color: colors.textPrimary,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,700;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${colors.borderDefault}; border-radius: 999px; }
        textarea { outline: none; }

        .nav-btn { transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .nav-btn:hover:not(.nav-active) {
          background: ${colors.bgElevated} !important;
          color: ${colors.textPrimary} !important;
        }
        .chip { transition: background 0.15s, border-color 0.15s, color 0.15s; }
        .chip:hover {
          background: ${colors.bgElevated} !important;
          border-color: ${colors.emeraldBorder} !important;
          color: ${colors.textPrimary} !important;
        }
        .send-btn { transition: background 0.15s, transform 0.1s; }
        .send-btn:not(:disabled):hover { background: ${colors.emeraldLight} !important; }
        .send-btn:active { transform: scale(0.94); }
        .input-wrap:focus-within { border-color: ${colors.emeraldBorder} !important; }
        .logout-btn:hover { color: ${colors.danger} !important; background: ${colors.dangerTint} !important; }
        .daily-log-btn:hover { background: ${colors.emeraldLight} !important; }
        .md-bubble > *:last-child { margin-bottom: 0 !important; }
      `}</style>

      {/* ── Fixed grid overlay ─────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(${colors.borderSubtle} 1px, transparent 1px),
          linear-gradient(90deg, ${colors.borderSubtle} 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarW }}
        transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
        style={{
          flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
          background: colors.bgSurface,
          borderRight: `0.5px solid ${colors.borderSubtle}`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', zIndex: 50,
        }}
      >
        {/* Logo row */}
        <div style={{
          height: 60, padding: '0 1rem', flexShrink: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: `0.5px solid ${colors.borderSubtle}`,
        }}>
          <ECGLogo collapsed={collapsed} />
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: colors.textMuted, display: 'flex', padding: 4,
                borderRadius: 6, transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = colors.textPrimary)}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = colors.textMuted)}
            >
              <ChevronLeft size={15} />
            </button>
          )}
        </div>

        {/* Expand button */}
        {collapsed && (
          <div style={{ padding: '0.6rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setCollapsed(false)}
              style={{
                background: colors.emeraldTint,
                border: `0.5px solid ${colors.emeraldBorder}`,
                borderRadius: 8, padding: 6, cursor: 'pointer',
                color: colors.emerald, display: 'flex',
              }}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              className={`nav-btn${item.active ? ' nav-active' : ''}`}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 9,
                padding: collapsed ? '9px' : '9px 11px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: item.active ? colors.emeraldTint : 'transparent',
                border: `0.5px solid ${item.active ? colors.emeraldBorder : 'transparent'}`,
                borderRadius: 9, cursor: 'pointer',
                color: item.active ? colors.emerald : colors.textMuted,
                fontSize: '0.8rem', fontWeight: 600,
                width: '100%', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '0.6rem', borderTop: `0.5px solid ${colors.borderSubtle}` }}>
          <button
            className="nav-btn logout-btn"
            onClick={() => { handleLogout() }}
            title={collapsed ? 'Log out' : undefined}
            style={{
              display: 'flex', alignItems: 'center',
              gap: collapsed ? 0 : 9,
              padding: collapsed ? '9px' : '9px 11px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: 'transparent', border: '0.5px solid transparent',
              borderRadius: 9, cursor: 'pointer',
              color: colors.textMuted,
              fontSize: '0.8rem', fontWeight: 600,
              width: '100%', whiteSpace: 'nowrap',
            }}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ overflow: 'hidden' }}
                >
                  Log out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        minWidth: 0, height: '100vh', overflow: 'hidden',
        position: 'relative', zIndex: 1,
      }}>

        {/* Top bar */}
        <header style={{
          height: 60, flexShrink: 0,
          padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `0.5px solid ${colors.borderSubtle}`,
          background: `${colors.bgPage}e6`,
          backdropFilter: 'blur(14px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: colors.emerald,
              }}
            />
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, color: colors.textMuted,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              fontFamily: "'DM Mono', monospace",
            }}>
              6 agents active
            </span>
          </div>

          <button
            className="daily-log-btn"
            onClick={() => window.location.href = '/questionnaire'}
            style={{
              background: colors.emerald, border: 'none', borderRadius: 8,
              padding: '7px 16px', cursor: 'pointer',
              fontSize: '0.68rem', fontWeight: 800, color: '#0a0f0e',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background 0.18s',
            }}
          >
            <Plus size={12} /> Daily Log
          </button>
        </header>

        {/* ── Chat ─────────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>

          {/* Message list */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: messages.length === 0 && !isTyping ? '0' : '2rem 2.5rem',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* ── Welcome state ── */}
            {messages.length === 0 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '3rem 2rem', textAlign: 'center',
                }}
              >
                {/* Animated orb */}
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: colors.emeraldTint,
                    border: `0.5px solid ${colors.emeraldBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Sparkles size={24} color={colors.emerald} />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', inset: -7, borderRadius: '50%',
                      border: `1px solid ${colors.emeraldBorder}`,
                    }}
                  />
                </div>

                <h1 style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                  fontWeight: 900, color: colors.textPrimary,
                  letterSpacing: '-0.03em', lineHeight: 1.15,
                  margin: '0 0 0.75rem',
                }}>
                  Welcome to your dashboard
                </h1>

                <p style={{
                  fontSize: '0.92rem', color: colors.textBody,
                  lineHeight: 1.8, maxWidth: 400, margin: '0 0 2.5rem',
                }}>
                  Six AI agents are active and ready. Ask anything — what to eat, how you're tracking, your deficiencies, or your weekend cheat budget.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 520 }}>
                  {QUICK_PROMPTS.map(q => (
                    <button key={q} className="chip"
                      onClick={() => sendMessage(q)}
                      style={{
                        background: colors.bgCard,
                        border: `0.5px solid ${colors.borderDefault}`,
                        borderRadius: 8, padding: '8px 14px',
                        fontSize: '0.78rem', fontWeight: 600,
                        color: colors.textBody, cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Conversation ── */}
            {(messages.length > 0 || isTyping) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {messages.map(msg => (
                  <Bubble key={msg.id} msg={msg} />
                ))}

                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        background: colors.emeraldTint,
                        border: `0.5px solid ${colors.emeraldBorder}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Sparkles size={13} color={colors.emerald} />
                      </div>
                      <div style={{
                        background: colors.bgElevated,
                        border: `0.5px solid ${colors.borderDefault}`,
                        borderRadius: '4px 18px 18px 18px',
                        padding: '0.75rem 1rem',
                        display: 'flex', gap: 5, alignItems: 'center',
                      }}>
                        {[0, 1, 2].map(i => (
                          <motion.div key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
                            style={{ width: 5, height: 5, borderRadius: '50%', background: colors.emerald }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Quick chips — active conversation only */}
          {messages.length > 0 && (
            <div style={{ padding: '0 2rem 0.6rem', display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {QUICK_PROMPTS.slice(0, 3).map(q => (
                <button key={q} className="chip"
                  onClick={() => sendMessage(q)}
                  style={{
                    background: colors.bgCard,
                    border: `0.5px solid ${colors.borderDefault}`,
                    borderRadius: 8, padding: '5px 12px',
                    fontSize: '0.72rem', fontWeight: 600,
                    color: colors.textBody, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '0 1.5rem 1.5rem' }}>
            <div
              className="input-wrap"
              style={{
                background: colors.bgCard,
                border: `0.5px solid ${colors.borderDefault}`,
                borderRadius: 12,
                display: 'flex', alignItems: 'flex-end', gap: 10,
                padding: '0.75rem 0.75rem 0.75rem 1.1rem',
                transition: 'border-color 0.18s',
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask about meals, macros, deficiencies, cheat day..."
                rows={1}
                style={{
                  flex: 1, background: 'none', border: 'none', resize: 'none',
                  color: colors.textPrimary,
                  fontSize: '0.88rem', lineHeight: 1.65,
                  fontFamily: "'DM Sans', sans-serif",
                  maxHeight: 130, overflowY: 'auto',
                  caretColor: colors.emerald,
                }}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = `${Math.min(el.scrollHeight, 130)}px`;
                }}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? colors.emerald : colors.bgElevated,
                  border: 'none', borderRadius: 8,
                  width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() ? 'pointer' : 'default',
                  color: input.trim() ? '#0a0f0e' : colors.textMuted,
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <div style={{
              textAlign: 'center', marginTop: 8,
              fontSize: '0.6rem', color: colors.textMuted,
              fontFamily: "'DM Mono', monospace", letterSpacing: '0.05em',
            }}>
              Enter to send · Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;