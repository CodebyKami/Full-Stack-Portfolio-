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
    <section id="home" className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 pt-32 pb-8 flex flex-col items-center justify-center min-h-0 h-full">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -12, 0],
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 15px rgba(79,70,229,0.2)",
                "0 0 35px rgba(79,70,229,0.5)",
                "0 0 15px rgba(79,70,229,0.2)"
              ]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              boxShadow: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/40 text-primary text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 ring-1 ring-white/10"
          >
            <Sparkles className="h-4 w-4 animate-pulse fill-primary/20" />
            Full-Stack Developer • Automation Engineer
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.8rem,7vh,4.2rem)] mb-6 text-foreground tracking-tight font-black leading-[1.1] xl:text-[5.5rem]"
          >
            Engineering Scalable<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
              Technical Solutions.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-xs md:text-sm lg:text-base text-muted mb-8 font-medium leading-relaxed px-4"
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
