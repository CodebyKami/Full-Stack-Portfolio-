import React, { useRef, useState } from 'react';
import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Mail, MapPin, Send, CheckCircle2, Sparkles, Code, Cpu, Globe, Linkedin } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';

const ScrollReveal = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.1 
          } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => (
  <section id="about" className="relative">
    <ScrollReveal className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <span className="section-label">01 / ABOUT ME</span>
          <h2 className="text-[clamp(36px,5vw,56px)] leading-tight">
            BRIDGING THE GAP BETWEEN <span className="text-primary italic">HUMAN VISION</span> AND AI.
          </h2>
          <div className="space-y-6 text-lg text-muted">
            <p>
              I am Kamran Rasool, a dedicated Web Developer and Automation Specialist with a passion for creating digital experiences that drive results. With expertise in WordPress, GoHighLevel, and Squarespace, I help businesses streamline their operations and enhance their online presence.
            </p>
            <p>
              My approach combines technical proficiency with a deep understanding of business needs, allowing me to deliver custom solutions that are both functional and aesthetically pleasing.
            </p>
          </div>
          
          <div className="flex gap-12 pt-4">
            <div>
              <h4 className="text-2xl font-bold text-foreground">5+</h4>
              <p className="text-[10px] uppercase tracking-widest text-muted">Years Exp.</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-foreground">150+</h4>
              <p className="text-[10px] uppercase tracking-widest text-muted">Projects</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 aspect-[4/5] rounded-[20px] overflow-hidden border border-white/10 group interactive"
          >
            <motion.div 
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full h-full"
            >
              <img 
                src="https://picsum.photos/seed/kamran/800/1000" 
                alt="Kamran Rasool" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
            
            {/* Glowing Ring */}
            <div className="absolute inset-0 pointer-events-none border-[2px] border-transparent rounded-[20px] overflow-hidden">
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,#c8f538_20%,transparent_40%)] animate-[spin_3s_linear_infinite]" />
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl -z-10" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 blur-3xl -z-10" />
        </div>
      </div>
    </ScrollReveal>
  </section>
);

const Skills = () => {
  const skills = useStore(state => state.skills);
  const hasSkills = Array.isArray(skills) && skills.length > 0;

  return (
    <section id="skills" className="bg-secondary/30">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">03 / EXPERTISE</span>
          <h2 className="text-[clamp(36px,5vw,56px)]">TECHNICAL ARSENAL.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-12">
          {hasSkills ? skills.map((skill, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold font-heading uppercase tracking-tight">{skill.name}</span>
                <span className="text-sm font-bold text-primary">{skill.proficiency || 80}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
                  className="absolute top-0 left-0 h-full bg-primary shimmer"
                />
              </div>
            </div>
          )) : [1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Projects = () => {
  const projects = useStore(state => state.projects);
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <section id="projects">
      <ScrollReveal className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label">04 / WORK</span>
            <h2 className="text-[clamp(36px,5vw,56px)]">FEATURED PROJECTS.</h2>
          </div>
          <div className="flex gap-4">
            {['All', 'Web', 'AI', 'Automation'].map((cat) => (
              <button key={cat} className="text-[11px] font-bold uppercase tracking-[2px] text-muted hover:text-primary transition-colors interactive">
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {hasProjects ? projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -6 }}
              className="group card-premium p-0 overflow-hidden interactive"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <motion.img 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  src={project.image_url || `https://picsum.photos/seed/${project.title}/1200/800`} 
                  alt={project.title} 
                  className="object-cover w-full h-full" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="flex gap-4"
                  >
                    <Button className="btn-primary h-auto py-3 px-6 text-xs">
                      VIEW CASE <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                    <Button className="btn-secondary h-auto py-3 px-6 text-xs">
                      GITHUB <Github className="ml-2 h-3 w-3" />
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{project.category || 'WEB'}</span>
                </div>
                <p className="text-muted mb-8 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted px-4 py-1.5 rounded-full border border-white/5 bg-white/5">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )) : [1,2].map(i => <Skeleton key={i} className="h-[500px] rounded-[20px]" />)}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Experience = () => {
  const experience = useStore(state => state.experience);
  const hasExperience = Array.isArray(experience) && experience.length > 0;

  return (
    <section id="experience" className="bg-secondary/30">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20 text-center">
          <span className="section-label">05 / JOURNEY</span>
          <h2 className="text-[clamp(36px,5vw,56px)]">EXPERIENCE.</h2>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 origin-top -translate-x-1/2"
          />

          <div className="space-y-24">
            {hasExperience ? experience.map((exp, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                  className="absolute left-0 md:left-1/2 top-0 h-4 w-4 rounded-full bg-primary -translate-x-1/2 shadow-[0_0_20px_rgba(200,245,56,0.6)] z-10"
                />
                
                <div className={cn(
                  "flex flex-col md:flex-row gap-12",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "md:w-1/2 pl-10 md:pl-0",
                    i % 2 === 0 ? "md:text-left" : "md:text-right"
                  )}>
                    <span className="text-primary font-bold text-sm mb-2 block">{exp.start_date} — {exp.current ? 'PRESENT' : exp.end_date}</span>
                    <h3 className="text-3xl font-bold mb-2">{exp.role}</h3>
                    <p className="text-xl text-muted mb-6 font-medium">{exp.company}</p>
                    <ul className={cn(
                      "space-y-4 text-muted",
                      i % 2 === 0 ? "" : "md:flex md:flex-col md:items-end"
                    )}>
                      {exp.description?.map((item: string, j: number) => (
                        <li key={j} className="text-sm leading-relaxed max-w-md">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </div>
            )) : [1,2].map(i => <Skeleton key={i} className="h-40 w-full" />)}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: "Starter", price: "999", features: ["Single Page Website", "Basic SEO", "Contact Form", "Mobile Responsive"], featured: false },
    { name: "Professional", price: "2499", features: ["Multi-page Website", "Advanced SEO", "AI Chatbot Integration", "CMS Setup"], featured: true },
    { name: "Enterprise", price: "4999", features: ["Custom SaaS Solution", "Full Automation", "AI Agent Development", "24/7 Support"], featured: false },
  ];

  return (
    <section id="pricing">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20 text-center">
          <span className="section-label">06 / PRICING</span>
          <h2 className="text-[clamp(36px,5vw,56px)]">INVESTMENT.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={cn(
                "card-premium p-12 flex flex-col interactive",
                plan.featured ? "scale-105 border-primary/50 bg-surface shadow-[0_0_50px_rgba(200,245,56,0.1)]" : "bg-secondary/20"
              )}
            >
              {plan.featured && <span className="text-[10px] font-bold uppercase tracking-[3px] text-primary mb-6">Most Popular</span>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold font-heading text-foreground">${plan.price}</span>
                <span className="text-muted text-sm">/project</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={cn(
                "w-full h-auto py-4 text-xs font-bold",
                plan.featured ? "btn-primary" : "btn-secondary"
              )}>
                GET STARTED
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section id="contact">
      <ScrollReveal className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <span className="section-label">07 / CONTACT</span>
              <h2 className="text-[clamp(36px,5vw,56px)] leading-tight">
                LET'S BUILD <br />SOMETHING <span className="text-primary italic">ICONIC</span>.
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group interactive">
                <div className="h-14 w-14 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Email Me</p>
                  <p className="text-xl font-bold">kamranrasool0045@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group interactive">
                <div className="h-14 w-14 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Location</p>
                  <p className="text-xl font-bold">Faisalabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h3 className="text-3xl font-bold">MESSAGE SENT!</h3>
                  <p className="text-muted">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  <Button onClick={() => setFormState('idle')} className="btn-secondary h-auto py-3 px-8">SEND ANOTHER</Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary transition-colors peer placeholder-transparent" 
                        placeholder="Name"
                        id="name"
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-0 top-4 text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        FULL NAME
                      </label>
                    </div>
                    <div className="relative group">
                      <input 
                        type="email" 
                        required
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary transition-colors peer placeholder-transparent" 
                        placeholder="Email"
                        id="email"
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-0 top-4 text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        EMAIL ADDRESS
                      </label>
                    </div>
                    <div className="relative group">
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary transition-colors peer placeholder-transparent resize-none" 
                        placeholder="Message"
                        id="message"
                      />
                      <label 
                        htmlFor="message"
                        className="absolute left-0 top-4 text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        YOUR MESSAGE
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={formState === 'loading'}
                    className="btn-primary w-full h-auto py-5 interactive flex items-center justify-center gap-3"
                  >
                    {formState === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <>SEND MESSAGE <Send className="h-4 w-4" /></>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Full-Stack Development", desc: "Building scalable, high-performance web applications using modern stacks.", icon: Code },
    { title: "AI Automation", desc: "Streamlining business processes with intelligent AI agents and custom workflows.", icon: Cpu },
    { title: "UI/UX Design", desc: "Creating intuitive, visually stunning interfaces that prioritize user experience.", icon: Globe },
    { title: "Cloud Solutions", desc: "Deploying and managing robust infrastructure on AWS, Google Cloud, and Azure.", icon: Sparkles },
  ];

  return (
    <section id="services">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">02 / SERVICES</span>
          <h2 className="text-[clamp(36px,5vw,56px)]">WHAT I OFFER.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative card-premium p-10 pt-16 overflow-hidden interactive"
            >
              {/* Top Border Reveal */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              {/* Background Number */}
              <span className="absolute top-4 right-8 text-8xl font-black text-white/[0.03] font-heading select-none group-hover:text-white/[0.05] transition-colors">
                0{i + 1}
              </span>

              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                  <service.icon className="h-8 w-8 text-primary group-hover:scale-125 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Pricing />
      <Contact />
      
      <footer className="pt-32 pb-12 border-t border-white/5 bg-secondary/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-[60px] relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2 space-y-10">
              <h2 className="text-5xl font-extrabold font-heading tracking-tighter">
                KAMRAN<span className="text-primary">.</span>
              </h2>
              <p className="text-muted text-xl max-w-md leading-relaxed font-medium">
                Transforming complex ideas into seamless digital experiences. Specializing in high-performance web systems and AI-driven automation.
              </p>
              <div className="flex gap-5">
                {[
                  { icon: Github, href: "https://github.com/codebykami", label: "Github" },
                  { icon: Linkedin, href: "https://linkedin.com/in/kamranrasool", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:kamranrasool0045@gmail.com", label: "Email" }
                ].map((social, i) => (
                  <Magnetic key={i} strength={0.2}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-500 interactive group"
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
            
            <div className="space-y-10">
              <h4 className="text-[11px] uppercase tracking-[4px] font-bold text-primary/80">Navigation</h4>
              <ul className="space-y-5">
                {['Home', 'About', 'Services', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted hover:text-primary transition-all duration-300 font-bold text-sm tracking-tight interactive flex items-center gap-2 group">
                      <span className="h-[1px] w-0 bg-primary group-hover:w-4 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-[11px] uppercase tracking-[4px] font-bold text-primary/80">Expertise</h4>
              <ul className="space-y-5">
                {['Full-Stack Dev', 'AI Automation', 'UI/UX Design', 'Cloud Solutions'].map((item) => (
                  <li key={item} className="text-muted font-bold text-sm tracking-tight flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-muted uppercase tracking-[3px] font-black">
                © 2026 Crafted with Passion
              </p>
              <p className="text-[10px] text-primary uppercase tracking-[3px] font-black">
                By Kamran Rasool
              </p>
            </div>
            <div className="flex gap-10">
              <a href="#" className="text-[10px] uppercase tracking-[3px] text-muted hover:text-primary transition-colors font-black interactive">Privacy</a>
              <a href="#" className="text-[10px] uppercase tracking-[3px] text-muted hover:text-primary transition-colors font-black interactive">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-10 right-10 z-[50] hidden md:block"
      >
        <Magnetic strength={0.3}>
          <button className="h-16 w-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_40px_rgba(200,245,56,0.6)] interactive relative group">
            <Mail className="h-6 w-6" />
            <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
          </button>
        </Magnetic>
      </motion.div>
    </div>
  );
}
