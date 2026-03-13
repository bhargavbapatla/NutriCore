import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ClipboardCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Questionnaire: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate assessment logging
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#050510] text-slate-200 selection:bg-cyan-500/30 font-sans flex flex-col relative overflow-hidden">
            {/* --- AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-500/5 blur-[150px] rounded-full" />
            </div>

            {/* --- MINIMAL HEADER --- */}
            <header className="relative z-10 w-full p-8 flex justify-between items-center">
                <div className="flex items-center gap-2 font-black text-xl text-white">
                    <Activity size={20} className="text-cyan-400" />
                    NUTRICORE
                </div>
            </header>

            <main className="relative z-10 flex-grow flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl"
                >
                    <Card className="bg-white/5 backdrop-blur-3xl border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[2rem] overflow-hidden">
                        <CardHeader className="text-center pb-8 border-b border-white/5 space-y-2">
                            <div className="mx-auto w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4 border border-cyan-400/20">
                                <ClipboardCheck className="text-cyan-400" size={24} />
                            </div>
                            <CardTitle className="text-3xl font-black text-white tracking-tight">Daily Operations Assessment</CardTitle>
                            <CardDescription className="text-slate-400 text-sm">Synchronize your subjective metrics for precise biometric calibration.</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Sleep Quality Optimization</Label>
                                            <span className="text-xs font-bold text-cyan-400 tabular-nums">1.0 - 10.0</span>
                                        </div>
                                        <Slider 
                                            defaultValue={[7]} 
                                            max={10} 
                                            step={0.1} 
                                            className="py-4"
                                        />
                                        <div className="flex justify-between text-[8px] text-slate-600 uppercase font-black px-1">
                                            <span>Restless</span>
                                            <span>Deep REm</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Current Energy Level Status</Label>
                                        <Select defaultValue="medium">
                                            <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:ring-cyan-400/30">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0a0f1c] border-white/10 text-white">
                                                <SelectItem value="high">Optimal Efficiency</SelectItem>
                                                <SelectItem value="medium">Nominal Operations</SelectItem>
                                                <SelectItem value="low">Degraded Performance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        className="w-full h-auto py-5 bg-cyan-500 text-[#050510] font-black text-[0.85rem] tracking-[0.2em] uppercase rounded-full hover:bg-cyan-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                                    >
                                        Log Assessment Protocol
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
};

export default Questionnaire;
