import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Bot, Code } from 'lucide-react';
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

const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex flex-wrap justify-center w-full">
      {text.split(" ").map((word, i) => (
        <span key={i} className="mask-reveal inline-block mr-[0.2em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2 + i * 0.08, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="mask-reveal-child"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const profile = useStore(state => state.profile);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-background">
      {/* Background Gradients & Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface/50 backdrop-blur-md border border-border/50 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-10 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new projects
            </motion.div>

            <h1 className="text-[clamp(44px,8vw,86px)] font-black leading-[0.98] tracking-[-0.04em] mb-10 text-foreground">
              Web Developer <br className="hidden sm:block" />
              & <span className="text-secondary">Automation</span> <br className="hidden sm:block" />
              Specialist.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl text-lg md:text-xl text-muted/90 mb-12 font-medium leading-relaxed"
            >
              Building high-performance digital ecosystems with <span className="text-foreground font-bold">WordPress</span>, 
              <span className="text-foreground font-bold"> GoHighLevel</span>, and <span className="text-foreground font-bold">React</span>. 
              Designed for conversion, engineered for scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-20"
            >
              <Button className="btn-primary h-16 px-12 group rounded-2xl text-lg overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2 font-black tracking-tight">
                  START A PROJECT
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button variant="outline" className="btn-secondary h-16 px-10 rounded-2xl border-border/50 font-bold bg-white/50 backdrop-blur-sm text-lg">
                VIEW WORK
              </Button>
            </motion.div>

            {/* Trusted By / Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-12 gap-y-6 pt-10 border-t border-border/10"
            >
              {[
                { label: "Completed Projects", value: 150, suffix: "+" },
                { label: "Years Experience", value: 8, suffix: "+" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-4xl font-black text-foreground tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mt-1 opacity-70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Visual - Premium Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="hidden lg:flex justify-center relative scale-110 xl:scale-125"
          >
            <div className="relative w-full max-w-[450px] aspect-[4/5]">
              {/* Main Frame */}
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-surface to-background rounded-[48px] border border-border/50 shadow-2xl overflow-hidden p-3"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-40 mix-blend-soft-light" />
                <div className="relative w-full h-full bg-white dark:bg-black/20 rounded-[38px] overflow-hidden border border-border/20">
                   <img 
                    src="/kamran_profile.png" 
                    alt="Kamran Rasool" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent p-10 flex flex-col justify-end">
                    <div className="h-1 w-12 bg-primary rounded-full mb-4" />
                    <h3 className="text-2xl font-black text-foreground mb-1">KAMRAN R.</h3>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">Lead Engineer</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-12 bg-white/90 dark:bg-black/90 backdrop-blur-xl p-5 rounded-2xl shadow-premium border border-border/30 flex items-center gap-4 min-w-[200px]"
              >
                <div className="h-11 w-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <span className="text-orange-500 font-black text-xl">W</span>
                </div>
                <div>
                  <div className="text-xs font-black text-foreground uppercase tracking-widest mb-0.5">WordPress</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-3 bg-orange-500 rounded-full" />)}
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-16 bg-white/90 dark:bg-black/90 backdrop-blur-xl p-5 rounded-2xl shadow-premium border border-border/30 flex items-center gap-4 min-w-[220px]"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-black text-foreground uppercase tracking-widest mb-0.5">CRM Automation</div>
                  <div className="text-[10px] text-muted font-bold">150+ Workflows Active</div>
                </div>
              </motion.div>
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
