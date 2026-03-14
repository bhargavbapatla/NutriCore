import { createContext, useContext, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// NutriCore Design Tokens — Deep Slate + Emerald
//
// Palette rationale:
//   Base      → deep green-black slate  — biotech terminal, alive not cold
//   Primary   → emerald (#10b981)       — health, precision, nature + tech
//   Secondary → teal (#0d9488)          — depth accent, hover states
//   Danger    → rose (#f43f5e)          — alerts, logout, warnings
//   Text      → warm green-white cream  — easy on eyes, cohesive with base
// ─────────────────────────────────────────────────────────────────────────────

export interface ThemeColors {
  // ── Backgrounds (darkest → lightest) ──────────────────────────────────────
  bgPage: string;   // #0a0f0e — deep green-black page base
  bgSurface: string;   // #0f1512 — slightly lifted sections / sidebar
  bgCard: string;   // #161e1b — card and panel backgrounds
  bgElevated: string;   // #1e2b27 — hover states, active cards, input bg

  // ── Primary accent: Emerald ───────────────────────────────────────────────
  emerald: string;  // #10b981 — CTAs, active nav, send button, logo line
  emeraldLight: string;  // #34d399 — hover state
  emeraldDim: string;  // #059669 — muted/dimmed emerald for borders, dividers
  emeraldTint: string;  // rgba(16,185,129,0.08) — badge/chip backgrounds
  emeraldBorder: string;  // rgba(16,185,129,0.2)  — badge/chip borders
  emeraldGlow: string;  // rgba(16,185,129,0.12) — hover fills, card glows

  // ── Secondary accent: Teal ────────────────────────────────────────────────
  teal: string;  // #0d9488 — secondary tags, secondary agent labels
  tealTint: string;  // rgba(13,148,136,0.08)
  tealBorder: string;  // rgba(13,148,136,0.2)

  // ── Danger accent: Rose ───────────────────────────────────────────────────
  danger: string;  // #f43f5e — logout, critical alerts, errors
  dangerTint: string;  // rgba(244,63,94,0.08)
  dangerBorder: string;  // rgba(244,63,94,0.2)

  // ── Text hierarchy (brightest → dimmest) ─────────────────────────────────
  textPrimary: string;  // #ecfdf5 — headlines, bubble text (green-white)
  textBody: string;  // #6ee7b7 — body copy, descriptions (soft green)
  textMuted: string;  // #4d7c6e — labels, nav links, hints, timestamps

  // ── Borders ───────────────────────────────────────────────────────────────
  borderSubtle: string;  // rgba(16,185,129,0.07) — hairlines, section dividers
  borderDefault: string;  // rgba(16,185,129,0.14) — cards, inputs
  borderHover: string;  // rgba(16,185,129,0.28) — focused/hovered borders

  // ── Semantic — status indicators ─────────────────────────────────────────
  semanticSuccess: string;  // #10b981 — goal hit, in range
  semanticWarning: string;  // #f59e0b — nearing limit, cheat day
  semanticDanger: string;  // #f43f5e — deficiency spike, critical alert
}

// ─── Token values ─────────────────────────────────────────────────────────────
const colors: ThemeColors = {
  // Backgrounds
  bgPage: '#0a0f0e',
  bgSurface: '#0f1512',
  bgCard: '#161e1b',
  bgElevated: '#1e2b27',

  // Emerald
  emerald: '#10b981',
  emeraldLight: '#34d399',
  emeraldDim: '#059669',
  emeraldTint: 'rgba(16,185,129,0.08)',
  emeraldBorder: 'rgba(16,185,129,0.2)',
  emeraldGlow: 'rgba(16,185,129,0.12)',

  // Teal
  teal: '#0d9488',
  tealTint: 'rgba(13,148,136,0.08)',
  tealBorder: 'rgba(13,148,136,0.2)',

  // Danger
  danger: '#f43f5e',
  dangerTint: 'rgba(244,63,94,0.08)',
  dangerBorder: 'rgba(244,63,94,0.2)',

  // Text
  textPrimary: '#ecfdf5',
  textBody: '#6ee7b7',
  textMuted: '#4d7c6e',

  // Borders
  borderSubtle: 'rgba(16,185,129,0.07)',
  borderDefault: 'rgba(16,185,129,0.14)',
  borderHover: 'rgba(16,185,129,0.28)',

  // Semantic
  semanticSuccess: '#10b981',
  semanticWarning: '#f59e0b',
  semanticDanger: '#f43f5e',
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextType {
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={{ colors }}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};