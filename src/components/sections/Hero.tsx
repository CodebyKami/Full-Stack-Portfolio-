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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Available for New Opportunities
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Senior Web Developer <br />
              & <span className="text-primary">Automation</span> Expert.
            </h1>

            <p className="text-xl text-muted mb-10 max-w-lg leading-relaxed">
              Specializing in high-performance WordPress solutions, GoHighLevel ecosystems, and Squarespace architectures with 8+ years of expertise.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-primary h-14 px-8 rounded-xl font-bold">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary h-14 px-8 rounded-xl font-bold">
                View Portfolio
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10">
              <div className="relative group">
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent rounded-[40px] z-20 pointer-events-none" />
                <img 
                  src="/kamran_profile.png" 
                  alt="Kamran Rasool" 
                  className="rounded-[40px] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] max-h-[600px]" 
                />
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-6 rounded-[24px] shadow-premium border border-border z-30"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Code className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">150+</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Projects Done</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 -left-6 bg-white p-6 rounded-[24px] shadow-premium border border-border z-30"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">AI Powered</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Solutions</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] z-0" />
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
