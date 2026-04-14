import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';
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
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] glow opacity-50" />
      <div className="absolute bottom-[10%] right-[-10%] glow opacity-30" style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)' }} />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[12px] font-semibold mb-6"
            >
              <Sparkles className="h-3 w-3" />
              Available for new opportunities
            </motion.div>

            <h1 className="fluid-h1 mb-6 text-foreground tracking-[-0.04em]">
              Building the <span className="text-primary">future</span> of the web.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl text-lg md:text-xl text-muted mb-10 font-medium leading-relaxed"
            >
              I'm Kamran Rasool, a Full Stack Developer specializing in high-performance digital solutions and seamless user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button className="btn-primary">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="btn-secondary">
                Contact Me
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex items-center gap-12 border-t border-border pt-8 w-full"
            >
              {[
                { label: "Projects", value: 150 },
                { label: "Experience", value: 5, suffix: "y+" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[12px] text-muted font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden lg:flex justify-center relative"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Abstract Visual */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[40px] blur-3xl animate-pulse" />
              <div className="relative h-full w-full glass rounded-[40px] p-8 flex flex-col justify-between overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-muted">
                    SYSTEM_READY
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10" />
                  ))}
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -right-8 glass p-4 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="text-[10px] font-bold">OPTIMIZING...</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ScrollProgress = () => {
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
