import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Bot, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Magnetic from '../ui/Magnetic';

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
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-primary text-[13px] font-semibold mb-8 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Available for new projects
            </motion.div>

            <h1 className="fluid-h1 mb-8 text-foreground tracking-tight">
              Designing <span className="text-primary">digital</span> products that scale.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl text-lg md:text-xl text-muted mb-12 font-medium leading-relaxed"
            >
              I'm Kamran Rasool, a Senior Product Engineer focused on building high-performance web applications with exceptional user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
            >
              <Button className="btn-primary w-full sm:w-auto h-14 px-10 text-base">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-secondary w-full sm:w-auto h-14 px-10 text-base">
                Let's Talk
              </Button>
            </motion.div>

            {/* Trusted By / Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex items-center justify-center lg:justify-start gap-10 border-t border-border pt-10 w-full"
            >
              {[
                { label: "Projects Completed", value: 150, suffix: "+" },
                { label: "Years Experience", value: 8, suffix: "+" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[12px] text-muted font-bold uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Visual - Premium Mockup/Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden lg:flex justify-center relative"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Abstract Visual Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[40px] border border-primary/10 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/abstract/800/800')] opacity-20 mix-blend-overlay grayscale" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-6 rounded-2xl shadow-premium border border-border/50 max-w-[240px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Clean Code</div>
                    <div className="text-[10px] text-muted font-medium">Production Ready</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-primary" />
                  </div>
                  <div className="h-1.5 w-[70%] bg-surface rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-secondary" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-6 rounded-2xl shadow-premium border border-border/50 max-w-[240px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Premium UI</div>
                    <div className="text-[10px] text-muted font-medium">Apple Level Design</div>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-surface overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i + 20}/64/64`} alt="Avatar" className="h-full w-full object-cover" />
                    </div>
                  ))}
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
