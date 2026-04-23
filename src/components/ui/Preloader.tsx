import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const name = "KAMRAN RASOOL";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const lineVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="container max-w-4xl px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-[1px] w-8 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">System Initialization</span>
                </motion.div>
                
                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none"
                  >
                    {name}<span className="text-primary">.</span>
                  </motion.h1>
                </div>
              </div>

              <div className="text-right">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]"
                >
                  Architecting Digitial Excellence
                </motion.p>
                <div className="text-3xl font-mono text-primary font-black mt-2">
                  {progress}%
                </div>
              </div>
            </div>

            <div className="relative h-[2px] w-full bg-white/5">
              <motion.div 
                className="absolute inset-0 bg-primary origin-left"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                "Full-Stack Dev",
                "Automation Architect",
                "WordPress Expert",
                "CRM Engineer"
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Module {i + 1}</span>
                  <span className="text-xs font-bold text-white">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-primary/10 blur-[150px] rounded-full" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
