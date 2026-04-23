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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 overflow-hidden bg-background">
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
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-primary text-[13px] font-semibold mb-10 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            Empowering brands through code and automation
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fluid-h1 mb-10 text-foreground tracking-tighter font-black leading-[0.9] lg:text-9xl"
          >
            Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">Excellence</span> Through Automation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-xl md:text-2xl text-muted mb-16 font-medium leading-relaxed"
          >
            I'm Kamran Rasool, a specialist in building high-performance websites and intelligent automated systems that drive real business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Magnetic>
              <Button className="btn-primary min-w-[200px] h-16 px-12 text-lg rounded-full group">
                View My Work
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button className="btn-secondary min-w-[200px] h-16 px-12 text-lg rounded-full">
                Let's Talk
              </Button>
            </Magnetic>
          </motion.div>

          {/* Centered Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-2 gap-16 border-t border-border pt-12 items-center justify-center"
          >
            {[
              { label: "Successful Projects", value: 150, suffix: "+" },
              { label: "Industry Experience", value: 8, suffix: " Years" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-5xl font-black text-foreground tracking-tighter">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[12px] text-muted font-black uppercase tracking-[0.2em] mt-3">
                  {stat.label}
                </span>
              </div>
            ))}
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
