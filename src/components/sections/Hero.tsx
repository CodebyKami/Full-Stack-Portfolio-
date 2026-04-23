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
    <section id="home" className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 pt-40 pb-20 flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative mb-12"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(79,70,229,0.1)",
                  "0 0 40px rgba(79,70,229,0.3)",
                  "0 0 20px rgba(79,70,229,0.1)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden group-hover:border-primary/40 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 transition-opacity duration-1000" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-primary drop-shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
              </motion.div>
              <span className="relative z-10 drop-shadow-sm whitespace-nowrap">Full-Stack Developer • Automation Engineer</span>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,8vh,4.5rem)] mb-8 text-foreground tracking-tight font-black leading-[1.05] xl:text-[6.2rem]"
          >
            Engineering Scalable<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] inline-block mt-2">
              Technical Solutions.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-sm md:text-base lg:text-lg text-muted mb-12 font-medium leading-relaxed px-4"
          >
            Developing high-performance web architecture and intelligent automations. Specializing in WordPress, GHL, and custom full-stack solutions for global business expansion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto px-6"
          >
            <Magnetic>
              <Button className="btn-primary w-full sm:min-w-[200px] h-16 px-10 text-base rounded-full group">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button className="bg-white text-black hover:bg-white/90 border-none w-full sm:min-w-[200px] h-16 px-10 text-base rounded-full font-bold shadow-xl">
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
