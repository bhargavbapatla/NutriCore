import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Lock, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate signup
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/questionnaire');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-[#050510] text-slate-200 selection:bg-cyan-500/30 font-sans flex flex-col relative overflow-hidden">
            {/* --- AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/5 blur-[150px] rounded-full" />
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

            {/* --- SIGNUP TERMINAL --- */}
            <main className="relative z-10 flex-grow flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-lg p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Profile</h1>
                        <p className="text-sm text-slate-400">Initialize your bio-metric account.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* USERNAME */}
                            <div className="space-y-2 text-left">
                                <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                    Operator Name
                                </Label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <Input
                                        name="username"
                                        placeholder="User_01"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-5 py-6 text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-2 text-left">
                                <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                    Neural ID (Email)
                                </Label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="user@neural-link.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-5 py-6 text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PASSWORDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 text-left">
                                <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                    Security Key
                                </Label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-5 py-6 text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <Label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                    Confirm Key
                                </Label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-white/10 rounded-2xl pl-12 pr-5 py-6 text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-400/50 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-6 flex justify-center w-full">
                            <Button
                                type="submit"
                                className="w-full h-auto bg-white/5 border-white/15 text-white text-[0.85rem] font-black tracking-[0.2em] uppercase rounded-full py-4 px-8 backdrop-blur-[16px] hover:bg-white/10 hover:border-cyan-400/60 hover:backdrop-blur-none transition-all duration-300 group"
                            >
                                START INITIALIZATION
                                <ArrowRight size={18} className="text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </Button>
                        </div>
                    </form>

                    {/* FOOTER LINK */}
                    <div className="mt-8 text-center text-xs text-slate-500">
                        <p>
                            Already authenticated?{' '}
                            <Link to="/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors ml-1">
                                Login here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Signup;
