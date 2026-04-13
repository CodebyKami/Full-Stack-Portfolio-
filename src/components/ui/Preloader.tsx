import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
        >
          <div className="relative overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white"
            >
              KAMRAN<span className="text-primary">.</span>
            </motion.h1>
          </div>

          <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[4px] text-muted-foreground">Initializing Experience</span>
            <span className="text-primary font-mono text-xs font-bold">{progress}%</span>
          </div>

          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
