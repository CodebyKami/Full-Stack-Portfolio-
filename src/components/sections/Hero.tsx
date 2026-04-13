import { motion } from 'motion/react';
import { ArrowRight, Download, Sparkles, Code, Cpu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12"
        >
          <Sparkles className="h-3 w-3 animate-spin-slow" />
          AI-Powered Portfolio Experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white"
        >
          I'M <span className="text-gradient">KAMRAN</span> <br />
          <span className="text-gradient">RASOOL</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground mb-12 font-medium leading-relaxed"
        >
          Full-Stack Developer & Automation Specialist. I build high-conversion websites 
          and intelligent business systems that scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="h-16 px-10 rounded-full text-lg font-black bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-105 active:scale-95 group">
            View Projects
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg font-black border-primary/20 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95">
            Download Resume
            <Download className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Stats/Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { icon: Code, label: "Clean Code", desc: "Production-ready architectures" },
            { icon: Cpu, label: "AI Native", desc: "Intelligent agent integrations" },
            { icon: Globe, label: "Scalable", desc: "Cloud-first infrastructure" },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="flex flex-col items-center p-8 rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all group shadow-2xl"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">{item.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
}
