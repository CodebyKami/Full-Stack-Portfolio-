import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const name = "KAMRAN RASOOL";
  const profilePic = "https://hhrjoxrdmckvdxhsuwce.supabase.co/storage/v1/object/public/portfolio/6f6c6b65-2f5b-43d2-b7dd-56a7a863a6ea/bgymm5.png";

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
              <div className="flex items-center gap-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-700" />
                  <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 ring-4 ring-primary/10">
                    <img 
                      src={profilePic} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt="Kamran Rasool" 
                    />
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-[1px] w-8 bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">System Bootstrapping</span>
                  </motion.div>
                  
                  <div className="overflow-hidden">
                    <motion.h1 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none uppercase italic"
                    >
                      {name}<span className="text-primary not-italic">.</span>
                    </motion.h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-right"
                >
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">
                    Kernel Mode: <span className="text-primary/60">Professional</span>
                  </p>
                </motion.div>
                <div className="text-5xl md:text-6xl font-mono text-primary font-black tracking-tighter">
                  {progress < 10 ? `0${progress}` : progress}%
                </div>
              </div>
            </div>

            <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-0 bg-primary origin-left shadow-[0_0_15px_rgba(200,245,56,0.5)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16">
              {[
                { label: "Core Layer", value: "Full-Stack Developer" },
                { label: "Automation", value: "Process Architect" },
                { label: "Frontend", value: "React Specialist" },
                { label: "Backend", value: "Node Context" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{item.label}</span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">{item.value}</span>
                  <div className="h-0.5 w-4 bg-primary/30" />
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
