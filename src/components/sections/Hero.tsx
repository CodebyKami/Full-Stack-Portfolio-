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
      
      <div className="container relative z-10 pt-32 pb-16 md:pt-48 md:pb-24 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-12 px-4"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-4 px-5 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-full bg-white/80 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-primary/10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex h-3.5 w-3.5 md:h-4 md:w-4 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.6)]"></span>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1.5 border border-primary/20 rounded-full border-dashed"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-left md:text-center relative z-10">
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/90 whitespace-nowrap">
                  Full Stack Developer
                </span>
                <div className="hidden md:block w-[1.5px] h-3.5 bg-primary/20" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-primary whitespace-nowrap">
                  Automation Expert
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.75rem,8vw,3rem)] sm:text-[clamp(2.5rem,10vw,4.5rem)] md:text-[clamp(3.5rem,12vw,6rem)] mb-6 md:mb-8 text-foreground tracking-tight font-bold leading-[1.15] md:leading-[1.05] xl:text-[6.5rem] px-2"
          >
            Crafting Scalable, High-Performance<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] inline-block mt-1">
              Web Solutions.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-base md:text-lg lg:text-xl text-muted mb-10 md:mb-14 font-medium leading-relaxed px-4 mx-auto"
          >
            I design and develop robust web architectures and smart automations, specializing in WordPress, GoHighLevel, and custom full-stack systems for scalable business growth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none px-4 mx-auto"
          >
            <div className="w-full sm:w-auto">
              <Magnetic>
                <a href="#projects" className="block w-full">
                  <Button className="btn-primary w-full sm:min-w-[180px] md:min-w-[200px] h-14 md:h-16 px-8 md:px-10 text-base rounded-full group">
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Magnetic>
            </div>
            <div className="w-full sm:w-auto">
              <Magnetic>
                <a href="#contact" className="block w-full">
                  <Button className="bg-white text-black hover:bg-white/90 border border-border/50 w-full sm:min-w-[180px] md:min-w-[200px] h-14 md:h-16 px-8 md:px-10 text-base rounded-full font-bold shadow-sm">
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
