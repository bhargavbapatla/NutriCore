import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2 }
    }
  };

  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', paddingBottom: '5vh' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

          <motion.h1 variants={itemVariants} className="massive-title">
            NUTRI
          </motion.h1>

          <motion.div variants={itemVariants} className="hero-text-content">
            <p className="hero-subtitle">
              Transforming biological potential into measurable performance. Building an organization that fosters physical development.
            </p>

            <button className="btn-pill">
              Launch Protocol <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
