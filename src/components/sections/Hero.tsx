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
    <span className="inline-flex flex-wrap justify-center">
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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 pb-20 overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="glow-purple top-[20%] right-[10%]" />
        <div className="glow-lime bottom-[20%] left-[5%]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[11px] font-bold uppercase tracking-[3px] mb-10 shadow-[0_0_20px_rgba(200,245,56,0.1)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for new projects
          </motion.div>

          <h1 className="fluid-h1 mb-10 font-heading text-foreground">
            <SplitText text="WORDPRESS &" /><br />
            <span className="text-primary italic"><SplitText text="FULL-STACK" /></span><br />
            <SplitText text="ARCHITECT" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-12 font-medium leading-relaxed"
          >
            I'm Kamran Rasool. I craft high-performance digital solutions using WordPress, GoHighLevel, and modern Full-Stack technologies. Turning complex visions into seamless experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic strength={0.2}>
              <Button className="btn-primary interactive h-16 px-10 rounded-full text-sm tracking-widest font-black">
                VIEW PROJECTS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button className="btn-secondary interactive h-16 px-10 rounded-full text-sm tracking-widest font-black">
                GET IN TOUCH
              </Button>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24"
          >
            {[
              { label: "Projects Done", value: 150 },
              { label: "Happy Clients", value: 80 },
              { label: "Years Exp.", value: 5 },
              { label: "AI Tools", value: 25 },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[10px] uppercase tracking-[2px] text-foreground/50 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgress />
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
