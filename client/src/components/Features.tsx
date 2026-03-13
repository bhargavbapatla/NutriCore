import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Brain, Zap, Target, LineChart } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="feature-card glass-panel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc secondary-text">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <Brain size={28} />,
      title: "Neurometric Profiling",
      description: "Analyze cognitive function and adapt nutrition to maximize focus, retention, and neural plasticity.",
    },
    {
      icon: <Target size={28} />,
      title: "Micro-Targeting",
      description: "Deliver exact micro-nutrients when your system is primed for absolute maximal absorption.",
    },
    {
      icon: <Activity size={28} />,
      title: "Real-Time Adjustment",
      description: "Continuous synchronization with your wearable tech dynamically alters your recommended caloric intake.",
    },
    {
      icon: <Shield size={28} />,
      title: "Immunological Defense",
      description: "Proactive protocols designed specifically to fortify your immune system ahead of pathogenic exposure.",
    },
    {
      icon: <Zap size={28} />,
      title: "Metabolic Optimization",
      description: "Accelerate your basal metabolic rate using our proprietary enzymatic manipulation protocols.",
    },
    {
      icon: <LineChart size={28} />,
      title: "Predictive Analytics",
      description: "Forecast your physical and mental energy levels throughout the day with 94% accuracy.",
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Engineered for <span className="text-gradient">Peak Performance</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle secondary-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Stop guessing. Start optimizing. NutriCore bridges the gap between complex biochemistry and daily action.
        </motion.p>
      </div>

      <div className="features-grid">
        {featuresList.map((feat, index) => (
          <FeatureCard 
            key={index} 
            icon={feat.icon} 
            title={feat.title} 
            description={feat.description}
            delay={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
