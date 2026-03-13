import React, { useEffect, useState } from 'react';
import { Activity, LogOut, Brain, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const metrics = [
    { title: "Cognitive Load", value: "Optimal", icon: <Brain size={20} />, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { title: "Metabolic Rate", value: "+12%", icon: <Zap size={20} />, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { title: "Target Focus", value: "94.2%", icon: <Target size={20} />, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" }
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-[#ffffff] font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <header className="relative z-10 w-full p-8 flex justify-between items-center border-b border-white/5 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-2 font-black text-xl text-white">
          <Activity size={20} className="text-cyan-400" />
          NUTRICORE <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full ml-2 tracking-[0.2em]">OS v1.0</span>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-[#8b95a5] hover:text-white hover:bg-white/5 gap-2 font-bold text-xs uppercase underline underline-offset-4 decoration-2 decoration-white/10"
        >
          <LogOut size={16} />
          Terminal Exit
        </Button>
      </header>

      <main className="relative z-10 flex-grow p-8 md:p-12 max-w-7xl mx-auto w-full space-y-12">
        <section className="space-y-2">
            <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
                Central Dashboard
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-lg"
            >
                Welcome back, Operator. Synchronizing real-time biometric streams.
            </motion.p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-2xl border-white/10 overflow-hidden hover:bg-white/10 transition-colors group">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bg} ${metric.color} ${metric.border} border`}>
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-white">{metric.value}</div>
                  <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={isLoaded ? { width: "70%" } : {}}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                        className={`h-full ${metric.color.replace('text', 'bg')}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <section className="pt-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
            >
                <Card className="bg-cyan-500/5 border-cyan-500/20 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-black text-white tracking-tight">Daily Calibration Required</h2>
                    <p className="text-slate-400 max-w-md">Complete your subjective operations assessment to refine your metabolic energy baseline for the next 24 hours.</p>
                  </div>
                  <Button 
                    className="h-auto bg-cyan-500 text-[#050510] font-black text-xs uppercase tracking-[0.2em] rounded-full py-5 px-10 hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    onClick={() => window.location.href = '/questionnaire'}
                  >
                    Start Assessment Terminal
                  </Button>
                </Card>
            </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
