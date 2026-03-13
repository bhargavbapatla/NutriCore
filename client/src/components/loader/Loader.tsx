import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="bg-[#020617] w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* INJECTED CSS FOR HELIX ANIMATION */}
      <style>
        {`
          .helix-loading-indicator {
            position: relative;
            -webkit-animation: pulse-opacity 5s ease-in-out infinite;
            animation: pulse-opacity 5s ease-in-out infinite;
            width: 310px;
            height: 70px;
            margin: 0 auto;
          }

          .helix-loading-indicator .dot {
            -webkit-animation-name: movement;
            animation-name: movement;
            -webkit-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out;
            height: 10px;
            position: absolute;
            top: 32.5px;
            -webkit-transform: translate3d(0, -25px, 0) scale(1);
            transform: translate3d(0, -25px, 0) scale(1);
            width: 10px;
          }

          .helix-loading-indicator .dot:before {
            -webkit-animation-name: size-opacity;
            animation-name: size-opacity;
            -webkit-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            -webkit-animation-timing-function: ease;
            animation-timing-function: ease;
            background: #22d3ee;
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
            border-radius: 50%;
            content: "";
            display: block;
            height: 100%;
            width: 100%;
          }

          .helix-loading-indicator .dot:nth-of-type(2n):before {
            background-color: #d946ef;
            box-shadow: 0 0 10px rgba(217, 70, 239, 0.8);
          }

          .helix-loading-indicator .dot:nth-of-type(1) { left: 300px; }
          .helix-loading-indicator .dot:nth-of-type(1), .helix-loading-indicator .dot:nth-of-type(1):before { animation-delay: -0.1s; }
          .helix-loading-indicator .dot:nth-of-type(2) { left: 300px; }
          .helix-loading-indicator .dot:nth-of-type(2), .helix-loading-indicator .dot:nth-of-type(2):before { animation-delay: -1.2s; }
          .helix-loading-indicator .dot:nth-of-type(3) { left: 275px; }
          .helix-loading-indicator .dot:nth-of-type(3), .helix-loading-indicator .dot:nth-of-type(3):before { animation-delay: -0.3s; }
          .helix-loading-indicator .dot:nth-of-type(4) { left: 275px; }
          .helix-loading-indicator .dot:nth-of-type(4), .helix-loading-indicator .dot:nth-of-type(4):before { animation-delay: -1.4s; }
          .helix-loading-indicator .dot:nth-of-type(5) { left: 250px; }
          .helix-loading-indicator .dot:nth-of-type(5), .helix-loading-indicator .dot:nth-of-type(5):before { animation-delay: -0.5s; }
          .helix-loading-indicator .dot:nth-of-type(6) { left: 250px; }
          .helix-loading-indicator .dot:nth-of-type(6), .helix-loading-indicator .dot:nth-of-type(6):before { animation-delay: -1.6s; }
          .helix-loading-indicator .dot:nth-of-type(7) { left: 225px; }
          .helix-loading-indicator .dot:nth-of-type(7), .helix-loading-indicator .dot:nth-of-type(7):before { animation-delay: -0.7s; }
          .helix-loading-indicator .dot:nth-of-type(8) { left: 225px; }
          .helix-loading-indicator .dot:nth-of-type(8), .helix-loading-indicator .dot:nth-of-type(8):before { animation-delay: -1.8s; }
          .helix-loading-indicator .dot:nth-of-type(9) { left: 200px; }
          .helix-loading-indicator .dot:nth-of-type(9), .helix-loading-indicator .dot:nth-of-type(9):before { animation-delay: -0.9s; }
          .helix-loading-indicator .dot:nth-of-type(10) { left: 200px; }
          .helix-loading-indicator .dot:nth-of-type(10), .helix-loading-indicator .dot:nth-of-type(10):before { animation-delay: -2s; }
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
          .helix-loading-indicator .dot:nth-of-type(20), .helix-loading-indicator .dot:nth-of-type(20):before { animation-delay: -3s; }
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

          @-webkit-keyframes pulse-opacity {
            0% { opacity: 0; }
            50% { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes pulse-opacity {
            0% { opacity: 0; }
            50% { opacity: 1; }
            to { opacity: 0; }
          }

          @-webkit-keyframes movement {
            0% { -webkit-transform: translate3d(0, -25px, 0); transform: translate3d(0, -25px, 0); z-index: 0; }
            50% { -webkit-transform: translate3d(0, 25px, 0); transform: translate3d(0, 25px, 0); z-index: 10; }
            to { -webkit-transform: translate3d(0, -25px, 0); transform: translate3d(0, -25px, 0); z-index: -5; }
          }
          @keyframes movement {
            0% { transform: translate3d(0, -25px, 0); z-index: 0; }
            50% { transform: translate3d(0, 25px, 0); z-index: 10; }
            to { transform: translate3d(0, -25px, 0); z-index: -5; }
          }

          @-webkit-keyframes size-opacity {
            0% { opacity: 1; -webkit-transform: scale(1); transform: scale(1); }
            25% { -webkit-transform: scale(1.5); transform: scale(1.5); }
            50% { opacity: 1; }
            75% { opacity: .35; -webkit-transform: scale(.5); transform: scale(.5); }
            to { opacity: 1; -webkit-transform: scale(1); transform: scale(1); }
          }
          @keyframes size-opacity {
            0% { opacity: 1; transform: scale(1); }
            25% { transform: scale(1.5); }
            50% { opacity: 1; }
            75% { opacity: .35; transform: scale(.5); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[40vw] h-[40vw] bg-cyan-500/10 blur-[100px] rounded-full absolute" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Helix Animation */}
        <div className="helix-loading-indicator">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;