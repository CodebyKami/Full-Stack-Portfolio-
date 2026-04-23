import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Magnetic from '../ui/Magnetic';
import { useStore } from '../../store/useStore';

const Counter = ({ value, suffix = "+" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(easeProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

export default function Hero() {
  const profile = useStore(state => state.profile);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" 
        />
        
        {/* Abstract Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 pt-20 md:pt-24 lg:pt-0">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              y: [0, -8, 0],
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              y: { 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut",
                delay: 0.2 
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 backdrop-blur-sm border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 shadow-[0_0_20px_rgba(79,70,229,0.1)]"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Full-Stack Developer • Automation Engineer
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,7vh,5rem)] mb-6 md:mb-8 text-foreground tracking-tight font-black leading-[1.05] xl:text-[5.5rem]"
          >
            Engineering Scalable<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary transition-all">
              Technical Solutions.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-sm md:text-base lg:text-lg text-muted mb-8 md:mb-12 font-medium leading-relaxed"
          >
            Enterprise-grade web architecture and industrial-scale automations. Specializing in WordPress, GoHighLevel, and high-performance JavaScript ecosystems for global business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Magnetic>
              <Button className="btn-primary min-w-[180px] h-14 px-10 text-base rounded-full group">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button className="bg-white text-black hover:bg-white/90 border-none min-w-[180px] h-14 px-10 text-base rounded-full font-bold shadow-lg">
                Let's Talk
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[1000]"
      style={{ scaleX }}
    />
  );
};
