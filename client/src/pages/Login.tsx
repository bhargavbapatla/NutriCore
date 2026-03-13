import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login by setting a localStorage flag
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#050510] text-[#ffffff] selection:bg-cyan-500/30 font-sans flex flex-col relative overflow-hidden">

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-500/5 blur-[150px] rounded-full" />
      </div>

      {/* --- MINIMAL HEADER --- */}
      <header className="relative z-10 w-full p-8 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-xl text-white">
          <Activity size={20} className="text-cyan-400" />
          NUTRICORE
        </div>
        <Link to="/" className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-cyan-400 transition-colors">
          Return Home
        </Link>
      </header>

      {/* --- LOGIN TERMINAL --- */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Login Protocol</h1>
            <p className="text-sm text-slate-400">Authenticate to access your bio-dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL INPUT */}
            <div className="space-y-2 text-left">
              <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                Email Identification
              </Label>
              <Input
                type="email"
                placeholder="user@neural-link.com"
                required
                className="w-full bg-white/5 border-white/10 rounded-2xl px-5 py-6 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center ml-1">
                <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  Security Key
                </Label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border-white/10 rounded-2xl px-5 py-6 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 flex justify-center w-full">
              <Button 
                type="submit" 
                className="w-full h-auto bg-white/5 border-white/15 text-white text-[0.85rem] font-black tracking-[0.2em] uppercase rounded-full py-4 px-8 backdrop-blur-[16px] hover:bg-white/10 hover:border-cyan-400/60 hover:backdrop-blur-none transition-all duration-300 group"
              >
                AUTHENTICATE
                <ArrowRight size={18} className="text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </div>
          </form>

          {/* FOOTER LINK */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              New User?{' '}
              <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                Register here
              </Link>
            </p>
          </div>

        </motion.div>
      </main>

    </div>
  );
};

export default Login;