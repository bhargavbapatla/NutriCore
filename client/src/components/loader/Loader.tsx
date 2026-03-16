import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div style={{
      background: colors.bgPage,
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        .helix-loading-indicator {
          position: relative;
          animation: pulse-opacity 5s ease-in-out infinite;
          width: 310px;
          height: 70px;
          margin: 0 auto;
        }

        .helix-loading-indicator .dot {
          animation-name: movement;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          height: 10px;
          position: absolute;
          top: 32.5px;
          transform: translate3d(0, -25px, 0) scale(1);
          width: 10px;
        }

        /* Odd dots — emerald (primary) */
        .helix-loading-indicator .dot:nth-of-type(2n+1):before {
          animation-name: size-opacity;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease;
          background: ${colors.emerald};
          box-shadow: 0 0 10px ${colors.emeraldGlow};
          border-radius: 50%;
          content: "";
          display: block;
          height: 100%;
          width: 100%;
        }

        /* Even dots — teal (secondary) */
        .helix-loading-indicator .dot:nth-of-type(2n):before {
          animation-name: size-opacity;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease;
          background: ${colors.teal};
          box-shadow: 0 0 10px rgba(13,148,136,0.5);
          border-radius: 50%;
          content: "";
          display: block;
          height: 100%;
          width: 100%;
        }

        .helix-loading-indicator .dot:nth-of-type(1)  { left: 300px; }
        .helix-loading-indicator .dot:nth-of-type(1),  .helix-loading-indicator .dot:nth-of-type(1):before  { animation-delay: -0.1s; }
        .helix-loading-indicator .dot:nth-of-type(2)  { left: 300px; }
        .helix-loading-indicator .dot:nth-of-type(2),  .helix-loading-indicator .dot:nth-of-type(2):before  { animation-delay: -1.2s; }
        .helix-loading-indicator .dot:nth-of-type(3)  { left: 275px; }
        .helix-loading-indicator .dot:nth-of-type(3),  .helix-loading-indicator .dot:nth-of-type(3):before  { animation-delay: -0.3s; }
        .helix-loading-indicator .dot:nth-of-type(4)  { left: 275px; }
        .helix-loading-indicator .dot:nth-of-type(4),  .helix-loading-indicator .dot:nth-of-type(4):before  { animation-delay: -1.4s; }
        .helix-loading-indicator .dot:nth-of-type(5)  { left: 250px; }
        .helix-loading-indicator .dot:nth-of-type(5),  .helix-loading-indicator .dot:nth-of-type(5):before  { animation-delay: -0.5s; }
        .helix-loading-indicator .dot:nth-of-type(6)  { left: 250px; }
        .helix-loading-indicator .dot:nth-of-type(6),  .helix-loading-indicator .dot:nth-of-type(6):before  { animation-delay: -1.6s; }
        .helix-loading-indicator .dot:nth-of-type(7)  { left: 225px; }
        .helix-loading-indicator .dot:nth-of-type(7),  .helix-loading-indicator .dot:nth-of-type(7):before  { animation-delay: -0.7s; }
        .helix-loading-indicator .dot:nth-of-type(8)  { left: 225px; }
        .helix-loading-indicator .dot:nth-of-type(8),  .helix-loading-indicator .dot:nth-of-type(8):before  { animation-delay: -1.8s; }
        .helix-loading-indicator .dot:nth-of-type(9)  { left: 200px; }
        .helix-loading-indicator .dot:nth-of-type(9),  .helix-loading-indicator .dot:nth-of-type(9):before  { animation-delay: -0.9s; }
        .helix-loading-indicator .dot:nth-of-type(10) { left: 200px; }
        .helix-loading-indicator .dot:nth-of-type(10), .helix-loading-indicator .dot:nth-of-type(10):before { animation-delay: -2.0s; }
        .helix-loading-indicator .dot:nth-of-type(11) { left: 175px; }
        .helix-loading-indicator .dot:nth-of-type(11), .helix-loading-indicator .dot:nth-of-type(11):before { animation-delay: -1.1s; }
        .helix-loading-indicator .dot:nth-of-type(12) { left: 175px; }
        .helix-loading-indicator .dot:nth-of-type(12), .helix-loading-indicator .dot:nth-of-type(12):before { animation-delay: -2.2s; }
        .helix-loading-indicator .dot:nth-of-type(13) { left: 150px; }
        .helix-loading-indicator .dot:nth-of-type(13), .helix-loading-indicator .dot:nth-of-type(13):before { animation-delay: -1.3s; }
        .helix-loading-indicator .dot:nth-of-type(14) { left: 150px; }
        .helix-loading-indicator .dot:nth-of-type(14), .helix-loading-indicator .dot:nth-of-type(14):before { animation-delay: -2.4s; }
        .helix-loading-indicator .dot:nth-of-type(15) { left: 125px; }
        .helix-loading-indicator .dot:nth-of-type(15), .helix-loading-indicator .dot:nth-of-type(15):before { animation-delay: -1.5s; }
        .helix-loading-indicator .dot:nth-of-type(16) { left: 125px; }
        .helix-loading-indicator .dot:nth-of-type(16), .helix-loading-indicator .dot:nth-of-type(16):before { animation-delay: -2.6s; }
        .helix-loading-indicator .dot:nth-of-type(17) { left: 100px; }
        .helix-loading-indicator .dot:nth-of-type(17), .helix-loading-indicator .dot:nth-of-type(17):before { animation-delay: -1.7s; }
        .helix-loading-indicator .dot:nth-of-type(18) { left: 100px; }
        .helix-loading-indicator .dot:nth-of-type(18), .helix-loading-indicator .dot:nth-of-type(18):before { animation-delay: -2.8s; }
        .helix-loading-indicator .dot:nth-of-type(19) { left: 75px; }
        .helix-loading-indicator .dot:nth-of-type(19), .helix-loading-indicator .dot:nth-of-type(19):before { animation-delay: -1.9s; }
        .helix-loading-indicator .dot:nth-of-type(20) { left: 75px; }
        .helix-loading-indicator .dot:nth-of-type(20), .helix-loading-indicator .dot:nth-of-type(20):before { animation-delay: -3.0s; }
        .helix-loading-indicator .dot:nth-of-type(21) { left: 50px; }
        .helix-loading-indicator .dot:nth-of-type(21), .helix-loading-indicator .dot:nth-of-type(21):before { animation-delay: -2.1s; }
        .helix-loading-indicator .dot:nth-of-type(22) { left: 50px; }
        .helix-loading-indicator .dot:nth-of-type(22), .helix-loading-indicator .dot:nth-of-type(22):before { animation-delay: -3.2s; }
        .helix-loading-indicator .dot:nth-of-type(23) { left: 25px; }
        .helix-loading-indicator .dot:nth-of-type(23), .helix-loading-indicator .dot:nth-of-type(23):before { animation-delay: -2.3s; }
        .helix-loading-indicator .dot:nth-of-type(24) { left: 25px; }
        .helix-loading-indicator .dot:nth-of-type(24), .helix-loading-indicator .dot:nth-of-type(24):before { animation-delay: -3.4s; }
        .helix-loading-indicator .dot:nth-of-type(25) { left: 0; }
        .helix-loading-indicator .dot:nth-of-type(25), .helix-loading-indicator .dot:nth-of-type(25):before { animation-delay: -2.5s; }
        .helix-loading-indicator .dot:nth-of-type(26) { left: 0; }
        .helix-loading-indicator .dot:nth-of-type(26), .helix-loading-indicator .dot:nth-of-type(26):before { animation-delay: -3.6s; }

        @keyframes pulse-opacity {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes movement {
          0%   { transform: translate3d(0, -25px, 0); z-index: 0;  }
          50%  { transform: translate3d(0,  25px, 0); z-index: 10; }
          100% { transform: translate3d(0, -25px, 0); z-index: -5; }
        }

        @keyframes size-opacity {
          0%   { opacity: 1;    transform: scale(1);   }
          25%  {                transform: scale(1.5); }
          50%  { opacity: 1;                           }
          75%  { opacity: 0.35; transform: scale(0.5); }
          100% { opacity: 1;    transform: scale(1);   }
        }
      `}</style>

      {/* Ambient bloom */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        {/* Helix */}
        <div className="helix-loading-indicator">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="dot" />
          ))}
        </div>

        {/* Label */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{
            fontSize: '0.6rem', fontWeight: 700,
            color: colors.textMuted, textTransform: 'uppercase',
            letterSpacing: '0.3em', animation: 'pulse-opacity 2s ease-in-out infinite',
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            Initializing
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: colors.emerald, opacity: 0.7 }} />
            <span style={{ fontSize: '0.55rem', color: colors.textMuted, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
              NutriCore Systems
            </span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: colors.teal, opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;