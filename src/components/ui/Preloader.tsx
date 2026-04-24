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
          <div className="container max-w-4xl px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="flex items-center gap-6 md:gap-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group shrink-0"
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
                  <div className="relative h-20 w-20 md:h-32 md:w-32 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 ring-4 ring-primary/5">
                    <img 
                      src={profilePic} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt="Kamran Rasool" 
                    />
                  </div>
                </motion.div>

                <div className="space-y-2 md:space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 md:gap-3"
                  >
                    <div className="h-[1px] w-6 md:w-8 bg-primary" />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-primary whitespace-nowrap">System Initialization</span>
                  </motion.div>
                  
                  <div className="overflow-hidden">
                    <motion.h1 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none uppercase"
                    >
                      {name}<span className="text-primary text-[1.2em]">.</span>
                    </motion.h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-2">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-left md:text-right"
                >
                  <p className="text-[9px] md:text-[11px] font-medium text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-0 md:mb-1">
                    Environment: <span className="text-primary/60">Live</span>
                  </p>
                </motion.div>
                <div className="text-4xl md:text-6xl font-sans text-primary font-bold tracking-tighter">
                  {progress < 10 ? `0${progress}` : progress}%
                </div>
              </div>
            </div>

            <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-0 bg-primary origin-left shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-12 md:mt-16">
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
