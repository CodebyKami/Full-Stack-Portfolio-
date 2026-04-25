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
    <section id="home" className="relative min-h-screen lg:h-screen flex flex-col items-center justify-center pt-24 pb-12 lg:pt-20 lg:pb-16 xl:pt-32 xl:pb-24 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] brightness-100 contrast-150 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 md:px-12 py-8 lg:py-0 gap-6 xl:gap-12 max-w-7xl mx-auto flex-grow">
        {/* Left Content Side */}
        <div className="flex-1 max-w-2xl text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 lg:mb-6 flex justify-center lg:justify-start"
          >
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 relative z-10">
                <span className="text-[9px] sm:text-[10px] md:text-sm font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] text-foreground/90 whitespace-nowrap">
                  Full-Stack Engineer
                </span>
                <div className="w-[1px] h-3 md:h-3.5 bg-primary/20" />
                <span className="text-[9px] sm:text-[10px] md:text-sm font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] text-primary whitespace-nowrap">
                  AI Automation Expert
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,12vw,4.5rem)] sm:text-[clamp(4rem,14vw,5.5rem)] lg:text-[clamp(2.8rem,7vw,4.5rem)] xl:text-[clamp(4.5rem,12vw,6.5rem)] mb-4 lg:mb-6 text-foreground tracking-[0.05em] xl:tracking-tighter font-black leading-[1] lg:leading-[0.95]"
          >
            Full Stack<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] inline-block pb-2 lg:pb-4">
              Engineer
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-xl lg:text-[1rem] xl:text-[1.25rem] text-muted/80 mb-6 lg:mb-10 font-medium leading-[1.6] max-w-[320px] sm:max-w-xl mx-auto lg:mx-0 balance"
          >
            Building elite WordPress solutions, modern web apps, and intelligent AI automations that cut costs, boost conversions, and scale your business on autopilot.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-6"
          >
            <Magnetic>
              <a href="#projects">
                <Button className="btn-primary h-12 md:h-14 px-6 md:px-10 text-xs md:text-base rounded-full group shadow-lg shadow-primary/20">
                  Explore My Work
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact">
                <Button variant="ghost" className="h-12 md:h-14 px-6 md:px-10 text-xs md:text-base rounded-full border border-border/60 hover:bg-surface font-semibold">
                  Let's Talk
                </Button>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Image Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:flex flex-1 relative items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[320px] lg:max-w-[380px] xl:max-w-[450px] aspect-[1/1.3]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[70px] rotate-6 animate-pulse blur-2xl" />
            <div className="absolute inset-0 border border-primary/20 rounded-[70px] -rotate-3 transition-transform duration-700 group-hover:rotate-3" />
            
            <div className="relative w-full h-full rounded-[60px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-2 md:border-[6px] border-white backdrop-blur-sm group">
              <img 
                src={profile?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000'} 
                alt={profile?.full_name}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
            </div>

            {/* Experience floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-8 xl:-left-12 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 z-20"
            >
              <div className="flex items-center gap-3 md:gap-5">
                <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl md:rounded-[1.25rem] bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-sm font-bold text-muted uppercase tracking-[0.15em]">Experience</p>
                  <p className="text-xl md:text-3xl font-black text-foreground tracking-tight"><Counter value={3} suffix="+" /> Years</p>
                </div>
              </div>
            </motion.div>

            {/* Projects floating badge */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-12 -right-12 xl:-top-16 xl:-right-16 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 z-20"
            >
              <div className="flex items-center gap-3 md:gap-5">
                <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl md:rounded-[1.25rem] bg-secondary/10 flex items-center justify-center text-secondary">
                  <ArrowRight className="h-5 w-5 md:h-8 md:w-8" />
                </div>
                <div>
                  <p className="text-[10px] md:text-sm font-bold text-muted uppercase tracking-[0.15em]">Track Record</p>
                  <p className="text-xl md:text-3xl font-black text-foreground tracking-tight"><Counter value={100} /> Projects</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
