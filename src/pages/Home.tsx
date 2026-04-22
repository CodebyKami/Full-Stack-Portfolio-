import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Github, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Code, 
  Cpu, 
  Globe, 
  Linkedin, 
  X, 
  ChevronRight, 
  Download, 
  ArrowRight,
  Plus,
  Star
} from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';
import ErrorBoundary from '../components/ui/ErrorBoundary';

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
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

const FactsBar = () => {
  const facts = [
    { label: "Projects Completed", value: "150+" },
    { label: "Global Clients", value: "20+" },
    { label: "Years Experience", value: "8+" },
    { label: "Success Rate", value: "100%" },
  ];

  return (
    <div className="bg-surface/30 py-16 border-y border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {facts.map((fact, i) => (
            <div key={i} className="text-center space-y-3 p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{fact.value}</div>
              <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const profile = useStore(state => state.profile);
  
  return (
    <section id="about" className="relative bg-background overflow-hidden py-24 md:py-32">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <ScrollReveal className="container">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl border border-border/50 bg-surface">
              <img 
                src="/kamran_profile.png" 
                alt={profile.full_name || "Kamran Rasool"} 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105 hover:scale-100 grayscale-[30%] hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 to-transparent p-10 flex flex-col justify-end">
                <div className="h-1 w-12 bg-primary rounded-full mb-4" />
                <h3 className="text-2xl font-black text-foreground tracking-tight uppercase">EXPERIENCE EXCELLENCE</h3>
              </div>
            </div>
            
            {/* Achievement Cards */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-surface/90 backdrop-blur-xl p-8 rounded-[32px] shadow-premium border border-border/50 max-w-[220px]"
            >
              <div className="text-4xl font-black text-primary mb-1 tracking-tighter">150+</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted leading-relaxed">Projects Delivered Globally</div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-10 -right-6 md:-right-10 bg-surface/90 backdrop-blur-xl p-6 rounded-[32px] shadow-premium border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-0.5">Operation</div>
                  <div className="text-sm font-black text-foreground uppercase tracking-tight">Worldwide</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-8">
              <span className="section-label">Engineering Precision</span>
              <h2 className="fluid-h2 leading-[1.1] font-black uppercase text-foreground">
                Solving Complex <br />
                Business <span className="text-primary italic">Challenges</span>.
              </h2>
              <p className="text-lg md:text-xl text-muted/90 leading-relaxed font-medium bg-gradient-to-r from-foreground/10 to-transparent p-6 rounded-[24px] border-l-4 border-primary">
                {profile.bio || "Senior Web Developer with 8+ years of engineering excellence."}
              </p>
              <p className="text-base text-muted/70 leading-relaxed">
                I specialize in creating custom digital solutions that help businesses scale. Whether it's a high-performance WordPress site, a complex GoHighLevel automation, or a bespoke full-stack application, I deliver quality and results.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4 group">
                <div className="h-1.5 w-12 bg-primary rounded-full group-hover:w-20 transition-all duration-500" />
                <h4 className="text-foreground font-black text-sm uppercase tracking-widest">Web Engineering</h4>
                <p className="text-muted/70 text-sm leading-relaxed">Building responsive, ultra-fast, and conversion-optimized architectures.</p>
              </div>
              <div className="space-y-4 group">
                <div className="h-1.5 w-12 bg-secondary rounded-full group-hover:w-20 transition-all duration-500" />
                <h4 className="text-foreground font-black text-sm uppercase tracking-widest">CRM Automation</h4>
                <p className="text-muted/70 text-sm leading-relaxed">Scaling businesses with complex GHL workflows and platform integrations.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-5">
              <Button className="btn-primary h-16 px-10 rounded-2xl group">
                <span className="font-black uppercase tracking-widest flex items-center gap-3">
                  Download CV <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                </span>
              </Button>
              <Button className="btn-secondary h-16 px-10 rounded-2xl border-border/50 bg-surface hover:bg-white/5 font-bold uppercase tracking-widest text-sm">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "CMS & Platforms",
      skills: ["WordPress", "Squarespace", "Shopify", "GHL Communities"],
      icon: Globe,
      color: "text-primary"
    },
    {
      title: "Core Engineering",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Python"],
      icon: Code,
      color: "text-secondary"
    },
    {
      title: "Architectures",
      skills: ["API Desing", "GHL Automation", "Zapier", "CRM Setup"],
      icon: Cpu,
      color: "text-primary"
    }
  ];

  return (
    <section id="skills" className="bg-surface/50 border-y border-border/50 py-24 md:py-32">
      <ScrollReveal className="container">
        <div className="mb-20 md:mb-28 text-center max-w-3xl mx-auto">
          <span className="section-label mx-auto">Precision Skills</span>
          <h2 className="fluid-h2 uppercase font-black tracking-tighter">
            Technological <span className="text-secondary italic">Core</span>.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="bg-surface/80 backdrop-blur-md p-10 rounded-[40px] border border-border/50 group transition-all duration-500 hover:shadow-premium"
            >
              <div className={cn("h-16 w-16 rounded-[20px] bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500", category.color)}>
                <category.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-8 tracking-tight uppercase">{category.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-5 py-2.5 rounded-full bg-background border border-border/50 text-[11px] font-bold text-muted uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Projects = () => {
  const projects = useStore(state => state.projects);
  const [filter, setFilter] = useState('All');
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  const categories = ['All', ...Array.from(new Set(hasProjects ? projects.map(p => p.category).filter(Boolean) : ['Web', 'AI', 'SaaS']))];

  const filteredProjects = hasProjects 
    ? (filter === 'All' ? projects : projects.filter(p => p.category?.toLowerCase() === filter.toLowerCase()))
    : [
        { title: "Enterprise E-Commerce", category: "Web", description: "A high-performance online store with advanced inventory management, custom checkout flows, and Stripe integration.", tags: ["React", "Node.js", "Stripe"] },
        { title: "CRM Automation Suite", category: "Automation", description: "Custom GoHighLevel workflows and Zapier integrations that streamlined lead management.", tags: ["GHL", "Zapier", "API"] },
        { title: "AI Support Engine", category: "AI", description: "Intelligent customer support agent powered by OpenAI, seamlessly integrated into WordPress.", tags: ["OpenAI", "WordPress"] },
      ];

  return (
    <section id="projects" className="bg-background py-24 md:py-32">
      <ScrollReveal className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 md:mb-28 gap-10">
          <div className="max-w-2xl">
            <span className="section-label">Selected Projects</span>
            <h2 className="fluid-h2 tracking-tight font-black uppercase text-foreground">
              Engineering <span className="text-secondary italic">Excellence</span>.
            </h2>
            <p className="text-lg text-muted mt-6 font-medium">A curated selection of high-performance digital products and complex automation systems.</p>
          </div>
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-surface/50 border border-border/50 w-fit backdrop-blur-md">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[11px] font-black uppercase tracking-widest transition-all duration-300 px-8 py-3 rounded-xl",
                  filter === cat 
                    ? "bg-primary text-background shadow-lg scale-105" 
                    : "text-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col bg-surface/40 rounded-[40px] border border-border/50 overflow-hidden hover:border-primary/40 hover:shadow-premium transition-all duration-700"
            >
              <div className="overflow-hidden relative aspect-[4/3] m-4 rounded-[32px]">
                <img 
                  src={project.image_url || `https://picsum.photos/seed/${project.title}/1200/800`} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-md">
                  <div className="flex flex-col gap-4 px-10 text-center">
                     <p className="text-sm font-bold text-foreground leading-relaxed">{project.description}</p>
                     <div className="flex gap-4 justify-center">
                        <Button className="btn-primary h-12 px-8 rounded-xl font-black uppercase tracking-tighter text-sm">
                          Case Study
                        </Button>
                     </div>
                  </div>
                </div>
              </div>
              <div className="p-8 pt-2 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase leading-none">{project.title}</h3>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-black text-muted/60 px-4 py-1.5 rounded-full bg-white/5 border border-border/50 uppercase tracking-[0.1em]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Services = () => {
  const services = useStore(state => state.services);
  
  return (
    <section id="services" className="bg-background py-24 md:py-32">
      {/* Abstract Background Element */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <ScrollReveal className="container">
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <span className="section-label mx-auto">Our Expertise</span>
          <h2 className="fluid-h2 uppercase font-black tracking-[-0.02em] leading-none mb-6">
            Elite Digital <br />
            <span className="text-primary">Infrastructures</span>.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -12 }}
              className="bg-surface/50 backdrop-blur-md p-12 rounded-[48px] border border-border/50 group transition-all duration-700 hover:shadow-premium"
            >
              <div className="h-20 w-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-background transition-all duration-700">
                {service.icon_name === 'Code' && <Code className="h-9 w-9" />}
                {service.icon_name === 'Cpu' && <Cpu className="h-9 w-9" />}
                {service.icon_name === 'Globe' && <Globe className="h-9 w-9" />}
              </div>
              <h3 className="text-2xl font-black text-foreground mb-8 tracking-tight uppercase leading-tight">{service.title}</h3>
              <p className="text-muted/80 text-lg leading-relaxed font-medium">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = useStore(state => state.testimonials);
  
  return (
    <section id="testimonials" className="bg-surface/30 py-24 md:py-32">
      <ScrollReveal className="container">
        <div className="mb-20 md:mb-28 text-center">
          <span className="section-label mx-auto">Client Success</span>
          <h2 className="fluid-h2 uppercase font-black">Trusted by <span className="text-secondary italic">Leaders</span>.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface p-12 rounded-[48px] border border-border/50 flex flex-col hover:border-primary/30 transition-all duration-700"
            >
              <div className="flex gap-1.5 mb-8">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-foreground font-black leading-tight mb-12 flex-grow italic tracking-tight">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                  <img src={`https://picsum.photos/seed/${testimonial.name}/128/128`} alt={testimonial.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-foreground uppercase tracking-tighter leading-none mb-1">{testimonial.name}</h4>
                  <p className="text-xs text-muted font-bold uppercase tracking-[0.2em]">{testimonial.role} @ {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Resume = () => {
  const experience = useStore(state => state.experience);
  const hasExperience = Array.isArray(experience) && experience.length > 0;

  const defaultExperience = [
    { role: "Senior Web Developer", company: "Freelance", start_date: "2020", end_date: "Present", description: ["Specialized in WordPress, GoHighLevel, and Squarespace development.", "Delivered 150+ successful projects for global clients.", "Implemented complex CRM automations and custom full-stack solutions."] },
    { role: "Web Developer", company: "Digital Agency", start_date: "2018", end_date: "2020", description: ["Developed custom themes and plugins for WordPress.", "Managed client websites and ensured high performance and security.", "Collaborated with design teams to create pixel-perfect interfaces."] },
  ];

  const education = [
    { degree: "Bachelor of Computer Science", school: "University of Engineering & Technology", year: "2018" },
  ];

  const displayExperience = hasExperience ? experience : defaultExperience;

  return (
    <section id="resume" className="bg-surface/10 py-24 md:py-32 border-b border-border/30">
      <ScrollReveal className="container">
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <span className="section-label mx-auto">The Timeline</span>
          <h2 className="fluid-h2 uppercase font-black tracking-tight leading-none">Professional <br /><span className="text-primary italic">Milestones</span>.</h2>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            <h3 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-5 uppercase">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Code className="h-7 w-7 text-primary" />
              </div>
              Experience
            </h3>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary before:to-transparent pl-10">
              {displayExperience.map((exp, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   className="relative group pb-4"
                >
                  <div className="absolute left-[-49px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(200,245,56,0.3)]" />
                  <div className="text-[11px] font-black text-primary mb-4 uppercase tracking-[0.2em]">{exp.start_date} — {exp.end_date}</div>
                  <h4 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">{exp.role}</h4>
                  <p className="text-muted font-black text-xs uppercase tracking-widest mb-6 bg-white/5 w-fit px-3 py-1 rounded-md">{exp.company}</p>
                  <ul className="space-y-3">
                    {exp.description?.map((item: string, j: number) => (
                      <li key={j} className="text-sm text-muted/80 leading-relaxed flex gap-3 font-medium">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            <h3 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-5 uppercase">
              <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Globe className="h-7 w-7 text-secondary" />
              </div>
              Education
            </h3>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-secondary before:to-transparent pl-10">
              {education.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute left-[-49px] top-0 h-6 w-6 rounded-full bg-secondary border-4 border-background group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(251,46,134,0.3)]" />
                  <div className="text-[11px] font-black text-secondary mb-4 uppercase tracking-[0.2em]">{edu.year}</div>
                  <h4 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">{edu.degree}</h4>
                  <p className="text-muted font-black text-xs uppercase tracking-widest bg-white/5 w-fit px-3 py-1 rounded-md">{edu.school}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormState('loading');
    
    try {
      const response = await axios.post('/api/contact', formData);

      if (response && response.data && response.data.success) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
      setFormState('idle');
    }
  };

  return (
    <ErrorBoundary>
      <section id="contact" className="bg-background relative overflow-hidden py-24 md:py-32">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <ScrollReveal className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6 text-center lg:text-left">
                <span className="section-label mx-auto lg:ml-0">Contact</span>
                <h2 className="fluid-h2 leading-tight">
                  Let's build something <span className="text-secondary">extraordinary</span>.
                </h2>
                <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-md mx-auto lg:ml-0">
                  Ready to take your project to the next level? I'm currently accepting new projects and consulting opportunities.
                </p>
              </div>
              
              <div className="space-y-10 max-w-md mx-auto lg:ml-0">
                <div className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(200,245,56,0.2)] transition-all duration-500">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Email Me</p>
                    <p className="text-xl font-bold text-foreground break-all tracking-tight">kamranrasool0045@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(200,245,56,0.2)] transition-all duration-500">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Location</p>
                    <p className="text-xl font-bold text-foreground tracking-tight">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-surface/50 backdrop-blur-xl border border-border rounded-[40px] p-8 md:p-12 shadow-premium relative z-10">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12"
                    >
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-foreground tracking-tight uppercase">Message Sent!</h3>
                        <p className="text-lg text-muted font-medium">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                      </div>
                      <Button 
                        variant="link" 
                        onClick={() => setFormState('idle')}
                        className="text-primary font-black uppercase tracking-widest text-sm"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-2">Full Name</label>
                          <Input 
                            required 
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe" 
                            className="bg-background/50 border-border h-14 rounded-2xl focus:border-primary transition-all font-medium" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-2">Email Address</label>
                          <Input 
                            required 
                            type="email" 
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com" 
                            className="bg-background/50 border-border h-14 rounded-2xl focus:border-primary transition-all font-medium" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-2">Subject</label>
                        <Input 
                          required 
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Project Inquiry" 
                          className="bg-background/50 border-border h-14 rounded-2xl focus:border-primary transition-all font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-2">Message</label>
                        <Textarea 
                          required 
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell me about your project..." 
                          className="bg-background/50 border-border min-h-[160px] rounded-2xl focus:border-primary transition-all p-5 font-medium resize-none" 
                        />
                      </div>
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={formState === 'loading'}
                          className="w-full btn-primary h-16 rounded-2xl group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-tight text-lg">
                            {formState === 'loading' ? 'SENDING...' : (
                              <>
                                SEND MESSAGE <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                              </>
                            )}
                          </span>
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </ErrorBoundary>
  );
};

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <FactsBar />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
      
      <footer className="pt-20 pb-16 bg-surface border-t border-border/30 relative overflow-hidden backdrop-blur-xl">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-20">
            <div className="md:col-span-2 space-y-10">
              <h2 className="text-4xl font-black tracking-tighter uppercase">
                KAMRAN<span className="text-primary">.</span>
              </h2>
              <p className="text-xl text-muted/80 max-w-md leading-relaxed font-medium">
                Designing and engineering high-performance digital products for elite businesses worldwide.
              </p>
              <div className="flex gap-5">
                {[
                  { icon: Github, href: "https://github.com/codebykami", label: "Github" },
                  { icon: Linkedin, href: "https://linkedin.com/in/kamranrasool", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:kamranrasool0045@gmail.com", label: "Email" }
                ].map((social, i) => (
                  <Magnetic key={i}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-14 w-14 rounded-[20px] bg-white/5 border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-700 shadow-premium"
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
            
            <div className="space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-primary">Explore</h4>
              <ul className="space-y-5">
                {['About', 'Resume', 'Projects', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted font-bold text-lg hover:text-primary transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-primary">Legal</h4>
              <ul className="space-y-5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted font-bold text-lg hover:text-primary transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-sm text-muted/60 font-black uppercase tracking-widest text-center">
              © {new Date().getFullYear()} Kamran Rasool. All rights reserved.
            </p>
            <div className="flex gap-10">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">DESIGN BY KAMI</span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">V.2.0.24</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
