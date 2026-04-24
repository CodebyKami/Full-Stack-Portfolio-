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
    <section id="home" className="relative h-screen sm:min-h-screen flex flex-col items-center pt-20 md:pt-24 overflow-hidden bg-background">
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
      
      <div className="container relative z-10 flex flex-col items-center justify-center flex-grow px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 md:mb-5 px-4"
          >
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-xl md:rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-primary/10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.6)]"></span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-0.5 md:gap-3 text-left md:text-center relative z-10">
                <span className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/90 whitespace-nowrap">
                  Full Stack Developer
                </span>
                <div className="hidden md:block w-[1px] h-3 bg-primary/20" />
                <span className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-primary whitespace-nowrap">
                  Automation Expert
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.1rem,5.5vw,2rem)] sm:text-[clamp(1.75rem,7.5vw,3.25rem)] md:text-[clamp(2.5rem,9.5vw,4rem)] mb-3 md:mb-5 text-foreground tracking-tight font-bold leading-[1.15] md:leading-[1.1] xl:text-[4.8rem] px-2"
          >
            Crafting Scalable, High-Performance<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] inline-block mt-0.5">
              Web Solutions.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl text-[11px] md:text-sm lg:text-base text-muted mb-6 md:mb-10 font-medium leading-relaxed px-4 mx-auto"
          >
            I design and develop robust web architectures and smart automations, specializing in WordPress, GoHighLevel, and custom full-stack systems for scalable business growth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-[280px] sm:max-w-none px-4 mx-auto"
          >
            <div className="w-full sm:w-auto">
              <Magnetic>
                <a href="#projects" className="block w-full">
                  <Button className="btn-primary w-full sm:min-w-[150px] md:min-w-[180px] h-11 md:h-12 px-6 md:px-8 text-xs md:text-sm rounded-full group">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Magnetic>
            </div>
            <div className="w-full sm:w-auto">
              <Magnetic>
                <a href="#contact" className="block w-full">
                  <Button className="bg-white text-black hover:bg-white/90 border border-border/50 w-full sm:min-w-[150px] md:min-w-[180px] h-11 md:h-12 px-6 md:px-8 text-xs md:text-sm rounded-full font-bold shadow-sm">
                    Let's Talk
                  </Button>
                </a>
              </Magnetic>
            </div>
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
