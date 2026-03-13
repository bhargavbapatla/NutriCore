import { createContext, useContext, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ThemeColors — full design token surface for NutriCore
//
// Palette rationale:
//   Base     → warm charcoal (#0e0c0a) — not cold blue-black, feels premium
//   Primary  → amber-gold (#e8b86d)    — warmth, nutrition, premium health
//   Secondary→ sage green (#7eb89a)    — nature, wellness, macros/tracking
//   Tertiary → dusty rose (#c47a7a)    — alerts, diabetes agent, warnings
//   Text     → warm off-whites         — cream hierarchy, never harsh white
// ─────────────────────────────────────────────────────────────────────────────

export interface ThemeColors {
  // ── Backgrounds (darkest → lightest) ──────────────────────────────────────
  bgPage: string;   // #0e0c0a — warm near-black page base
  bgSurface: string;   // #141210 — slightly lifted sections
  bgCard: string;   // #1c1916 — card / panel backgrounds
  bgElevated: string;   // #252118 — hover states, active cards

  // ── Primary accent: Amber Gold ────────────────────────────────────────────
  gold: string;  // #e8b86d — CTA buttons, active state, logo ECG line
  goldLight: string;  // #f5d08a — hover state of gold elements
  goldDim: string;  // #c49a4e — muted gold for decorative lines, dividers
  goldTint: string;  // rgba(232,184,109,0.08) — badge / pill backgrounds
  goldBorder: string;  // rgba(232,184,109,0.2)  — badge / pill borders
  goldGlow: string;  // rgba(232,184,109,0.12) — subtle hover glow fills

  // ── Secondary accent: Sage Green ─────────────────────────────────────────
  sage: string;  // #7eb89a — FitnessAgent, DeficiencyAgent, healthy states
  sageTint: string;  // rgba(126,184,154,0.08)
  sageBorder: string;  // rgba(126,184,154,0.2)

  // ── Tertiary accent: Dusty Rose ───────────────────────────────────────────
  rose: string;  // #c47a7a — DiabetesAgent, alerts, warnings
  roseTint: string;  // rgba(196,122,122,0.08)
  roseBorder: string;  // rgba(196,122,122,0.2)

  // ── Text hierarchy (brightest → dimmest) ─────────────────────────────────
  textPrimary: string;  // #f5f0e8 — headlines, card titles (warm off-white)
  textBody: string;  // #a09880 — body copy, descriptions
  textMuted: string;  // #5a5245 — labels, hints, nav links, footer text

  // ── Borders ───────────────────────────────────────────────────────────────
  borderSubtle: string; // rgba(255,248,235,0.06) — hairlines, section dividers
  borderDefault: string; // rgba(255,248,235,0.1)  — card borders, inputs
  borderHover: string; // rgba(232,184,109,0.25) — hovered card borders

  // ── Semantic (for status indicators & agent tags) ─────────────────────────
  semanticSuccess: string; // #7eb89a — goal achieved, calorie in range
  semanticWarning: string; // #e8b86d — cheat day, nearing limit
  semanticDanger: string; // #c47a7a — deficiency, glucose spike
}

// ─── Token values ─────────────────────────────────────────────────────────────
const colors: ThemeColors = {
  // Backgrounds
  bgPage: '#0e0c0a',
  bgSurface: '#141210',
  bgCard: '#1c1916',
  bgElevated: '#252118',

  // Gold
  gold: '#e8b86d',
  goldLight: '#f5d08a',
  goldDim: '#c49a4e',
  goldTint: 'rgba(232,184,109,0.08)',
  goldBorder: 'rgba(232,184,109,0.2)',
  goldGlow: 'rgba(232,184,109,0.12)',

  // Sage
  sage: '#7eb89a',
  sageTint: 'rgba(126,184,154,0.08)',
  sageBorder: 'rgba(126,184,154,0.2)',

  // Rose
  rose: '#c47a7a',
  roseTint: 'rgba(196,122,122,0.08)',
  roseBorder: 'rgba(196,122,122,0.2)',

  // Text
  textPrimary: '#f5f0e8',
  textBody: '#a09880',
  textMuted: '#5a5245',

  // Borders
  borderSubtle: 'rgba(255,248,235,0.06)',
  borderDefault: 'rgba(255,248,235,0.1)',
  borderHover: 'rgba(232,184,109,0.25)',

  // Semantic
  semanticSuccess: '#7eb89a',
  semanticWarning: '#e8b86d',
  semanticDanger: '#c47a7a',
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
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};