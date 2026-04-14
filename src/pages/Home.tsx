import React, { useRef, useState } from 'react';
import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Mail, MapPin, Send, CheckCircle2, Sparkles, Code, Cpu, Globe, Linkedin, X, ChevronRight, Download, Terminal } from 'lucide-react';
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
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

const About = () => (
  <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
    <div className="absolute top-[20%] left-[-10%] glow opacity-20" />
    
    <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div className="space-y-12">
          <div>
            <span className="section-label">About Me</span>
            <h2 className="fluid-h2 mb-8">
              Architecting <span className="text-primary">digital</span> excellence.
            </h2>
            <p className="text-lg text-muted leading-relaxed font-medium">
              I'm a Full-Stack Developer with a passion for building high-performance, scalable web systems. With over 5 years of experience, I've helped businesses automate their workflows and establish a dominant online presence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-foreground font-bold text-sm tracking-tight">Technical Leadership</h4>
              <p className="text-muted text-sm leading-relaxed">Guiding projects from conception to deployment with a focus on architecture and scalability.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-foreground font-bold text-sm tracking-tight">User-Centric Design</h4>
              <p className="text-muted text-sm leading-relaxed">Prioritizing intuitive interfaces and seamless interactions to drive user engagement.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button className="btn-primary">
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-surface flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="Avatar" className="h-full w-full object-cover" />
                </div>
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                +80
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="card-premium p-1 aspect-square max-w-md mx-auto lg:ml-auto overflow-hidden">
            <div className="h-full w-full rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://picsum.photos/seed/kamran/800/800" 
                alt="Kamran Rasool" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-2xl hidden sm:block"
          >
            <div className="text-3xl font-black text-primary mb-1">5+</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Years of Experience</div>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  </section>
);

const Skills = () => {
  const skills = useStore(state => state.skills);
  const hasSkills = Array.isArray(skills) && skills.length > 0;

  const defaultSkills = [
    { name: "React / Next.js", proficiency: 95 },
    { name: "TypeScript", proficiency: 90 },
    { name: "Node.js", proficiency: 85 },
    { name: "Tailwind CSS", proficiency: 98 },
    { name: "Supabase / Firebase", proficiency: 88 },
    { name: "Framer Motion", proficiency: 85 },
  ];

  const displaySkills = hasSkills ? skills : defaultSkills;

  return (
    <section id="skills" className="py-24 lg:py-32 bg-surface/30">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="mb-16 lg:mb-24">
          <span className="section-label">Expertise</span>
          <h2 className="fluid-h2">Technical <span className="text-primary">arsenal</span>.</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displaySkills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <Terminal className="h-6 w-6 text-muted group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{skill.name}</h3>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-primary/50"
                />
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

  const categories = ['All', ...Array.from(new Set(hasProjects ? projects.map(p => p.category).filter(Boolean) : ['Web', 'AI', 'Automation']))];

  const filteredProjects = hasProjects 
    ? (filter === 'All' ? projects : projects.filter(p => p.category?.toLowerCase() === filter.toLowerCase()))
    : [
        { title: "Quantum Dashboard", category: "Web", description: "A high-performance analytics dashboard with real-time data visualization.", tags: ["React", "D3.js", "Tailwind"] },
        { title: "AI Content Engine", category: "AI", description: "Automated content generation platform powered by large language models.", tags: ["Next.js", "OpenAI", "Supabase"] },
        { title: "Nexus CRM", category: "Automation", description: "Custom CRM solution with integrated workflow automation and lead tracking.", tags: ["GHL", "Node.js", "PostgreSQL"] },
      ];

  return (
    <section id="projects" className="py-24 lg:py-32">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div>
            <span className="section-label">Selected Work</span>
            <h2 className="fluid-h2">Building digital <span className="text-primary">legacies</span>.</h2>
          </div>
          <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-surface border border-border">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[12px] font-semibold transition-all duration-300 px-5 py-2 rounded-lg",
                  filter === cat 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bento-grid">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative card-premium p-0 overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden relative aspect-[16/10]">
                <img 
                  src={project.image_url || `https://picsum.photos/seed/${project.title}/1200/800`} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Button className="btn-primary py-2 px-5 text-[12px]">
                      Live Demo
                    </Button>
                    <Button className="btn-secondary py-2 px-5 text-[12px]">
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{project.category}</span>
                </div>
                <p className="text-muted text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-medium text-muted px-2 py-1 rounded-md bg-white/5 border border-border">{tag}</span>
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

const Experience = () => {
  const experience = useStore(state => state.experience);
  const hasExperience = Array.isArray(experience) && experience.length > 0;

  const defaultExperience = [
    { role: "Senior Full Stack Developer", company: "TechFlow Solutions", start_date: "2022", end_date: "Present", description: ["Leading development of enterprise-scale web applications.", "Architecting microservices using Node.js and Go."] },
    { role: "Frontend Engineer", company: "Creative Minds Agency", start_date: "2020", end_date: "2022", description: ["Built immersive user experiences with React and GSAP.", "Optimized performance for high-traffic client websites."] },
  ];

  const displayExperience = hasExperience ? experience : defaultExperience;

  return (
    <section id="experience" className="py-24 lg:py-32">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="mb-16 lg:mb-24">
          <span className="section-label">My Journey</span>
          <h2 className="fluid-h2">Professional <span className="text-primary">experience</span>.</h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-16 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-border">
          {displayExperience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative pl-8 md:pl-0 flex flex-col md:flex-row gap-8",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              <div className="absolute left-[-4px] md:left-1/2 md:ml-[-4px] top-0 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
              
              <div className={cn(
                "md:w-1/2",
                i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
              )}>
                <div className="inline-block px-3 py-1 rounded-lg bg-surface border border-border text-[10px] font-bold text-primary mb-4">
                  {exp.start_date} — {exp.end_date}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                <p className="text-primary font-semibold mb-4">{exp.company}</p>
                <div className={cn(
                  "space-y-2",
                  i % 2 === 0 ? "" : "md:items-end flex flex-col"
                )}>
                  {exp.description?.map((item: string, j: number) => (
                    <p key={j} className="text-sm text-muted leading-relaxed max-w-md">{item}</p>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2" />
            </motion.div>
          ))}
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
    <section id="pricing" className="py-24 lg:py-32">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="mb-16 lg:mb-24">
          <span className="section-label">Investment</span>
          <h2 className="fluid-h2">Pricing <span className="text-primary">plans</span>.</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className={cn(
                "card-premium p-10 flex flex-col h-full",
                plan.featured ? "border-primary/40 bg-primary/[0.02]" : ""
              )}
            >
              {plan.featured && <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Most Popular</span>}
              <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold tracking-tighter text-foreground">${plan.price}</span>
                <span className="text-muted text-[10px] font-bold uppercase tracking-widest">/project</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={cn(
                "w-full h-12 font-bold text-[12px]",
                plan.featured ? "btn-primary" : "btn-secondary"
              )}>
                Get Started
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
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 glow opacity-10" />
      
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-12">
            <div>
              <span className="section-label">Contact</span>
              <h2 className="fluid-h2 mb-8">
                Let's build something <span className="text-primary">extraordinary</span>.
              </h2>
              <p className="text-lg text-muted font-medium leading-relaxed max-w-md">
                Have a project in mind? Let's collaborate to create something that stands out. I'm always open to discussing new opportunities.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="h-12 w-12 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-muted mb-1">Email Me</p>
                  <p className="text-lg font-bold text-foreground">kamranrasool0045@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="h-12 w-12 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-muted mb-1">Location</p>
                  <p className="text-lg font-bold text-foreground">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card-premium p-8 md:p-10">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="text-muted">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    <Button onClick={() => setFormState('idle')} className="btn-secondary">Send Another</Button>
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
                        <label className="text-[12px] font-bold text-muted ml-1">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-background/50 border border-border rounded-xl h-12 px-5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-muted ml-1">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full bg-background/50 border border-border rounded-xl h-12 px-5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted ml-1">Subject</label>
                      <input required type="text" placeholder="Project Inquiry" className="w-full bg-background/50 border border-border rounded-xl h-12 px-5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted ml-1">Message</label>
                      <textarea required rows={4} placeholder="How can I help you?" className="w-full bg-background/50 border border-border rounded-xl p-5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground resize-none" />
                    </div>
                    <Button type="submit" disabled={formState === 'loading'} className="btn-primary w-full h-12">
                      {formState === 'loading' ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

const Services = () => {
  const services = useStore(state => state.services);
  const [selectedService, setSelectedService] = useState<any>(null);
  const hasServices = Array.isArray(services) && services.length > 0;

  const displayServices = hasServices ? services : [
    { title: "Full-Stack Development", description: "End-to-end web applications built with modern technologies like React, Next.js, and Node.js.", icon_name: "Code" },
    { title: "AI & Automation", description: "Streamlining business processes with custom AI solutions and automated workflows.", icon_name: "Cpu" },
    { title: "UI/UX Design", description: "Creating intuitive, visually stunning interfaces that prioritize user experience and conversion.", icon_name: "Sparkles" },
    { title: "Cloud Architecture", description: "Scalable and secure cloud infrastructure design and deployment.", icon_name: "Globe" },
  ];

  const getIcon = (name: string) => {
    switch(name) {
      case 'Code': return Code;
      case 'Cpu': return Cpu;
      case 'Globe': return Globe;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="mb-16 lg:mb-24">
          <span className="section-label">Expertise</span>
          <h2 className="fluid-h2">Services <span className="text-primary">offered</span>.</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, i) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="group card-premium p-8 flex flex-col h-full cursor-pointer"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="h-3 w-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-surface border border-border rounded-3xl p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {React.createElement(getIcon(selectedService.icon_name), { className: "h-7 w-7 text-primary" })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedService.title}</h3>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">Premium Expertise</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-muted leading-relaxed">{selectedService.description}</p>
                  <div className="p-6 rounded-2xl bg-background/50 border border-border">
                    <h4 className="text-[12px] font-bold uppercase tracking-widest text-foreground mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {["Customized Strategy", "High-Performance Implementation", "Ongoing Support & Optimization"].map((item, idx) => (
                        <li key={idx} className="text-sm text-muted flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="btn-primary w-full h-12" onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Inquire Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Marquee = () => {
  const skills = [
    "WordPress", "Plugin Development", "Theme Customization", "Elementor", 
    "WooCommerce", "GoHighLevel", "GHL Automation", "React", "Next.js", 
    "Node.js", "Automation", "UI/UX", "SEO", "Zapier", "Make"
  ];
  return (
    <div className="py-12 bg-secondary/20 border-y border-white/5 overflow-hidden relative">
      <motion.div 
        animate={{ x: [0, -1500] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap"
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tighter hover:text-primary/40 transition-colors cursor-default">
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = useStore(state => state.testimonials);
  const hasTestimonials = Array.isArray(testimonials) && testimonials.length > 0;

  const defaultTestimonials = [
    { name: "Sarah Johnson", role: "CEO", company: "InnovateX", content: "Kamran delivered a world-class platform that exceeded our expectations. His attention to detail is unmatched.", rating: 5 },
    { name: "Michael Chen", role: "Product Manager", company: "CloudScale", content: "The automation workflows Kamran built saved us hundreds of hours. A true professional and expert.", rating: 5 },
  ];

  const displayTestimonials = hasTestimonials ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-surface/30">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="mb-16 lg:mb-24">
          <span className="section-label">Feedback</span>
          <h2 className="fluid-h2">Client <span className="text-primary">stories</span>.</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="card-premium p-10 flex flex-col gap-8"
            >
              <div className="flex gap-1">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <Sparkles key={j} className="h-3 w-3 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-lg italic text-muted leading-relaxed font-medium">"{t.content}"</p>
              <div className="flex items-center gap-4 mt-auto pt-8 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{t.role} @ {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Blog = () => {
  const blogPosts = useStore(state => state.blogPosts);
  const hasPosts = Array.isArray(blogPosts) && blogPosts.length > 0;

  const defaultPosts = [
    { title: "The Future of AI in Web Development", excerpt: "Exploring how generative AI is transforming the way we build and maintain modern web applications.", tags: ["AI", "Tech"], read_time: "5 min read" },
    { title: "Mastering Framer Motion for Immersive UI", excerpt: "A comprehensive guide to creating fluid, high-performance animations in React applications.", tags: ["UI/UX", "Design"], read_time: "8 min read" },
  ];

  const displayPosts = hasPosts ? blogPosts : defaultPosts;

  return (
    <section id="blog" className="py-24 lg:py-32">
      <ScrollReveal className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div>
            <span className="section-label">Insights</span>
            <h2 className="fluid-h2">Latest <span className="text-primary">articles</span>.</h2>
          </div>
          <Button variant="outline" className="btn-secondary">
            View All Posts
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group card-premium p-0 overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image_url || `https://picsum.photos/seed/${post.title}/800/450`} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span>{post.tags?.[0] || 'Tech'}</span>
                  <span className="text-muted">{post.read_time || '5 min read'}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="pt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:gap-3 transition-all">
                  Read More <ChevronRight className="h-3 w-3" />
                </div>
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
    <div className="relative overflow-x-hidden">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Blog />
      <Pricing />
      <Contact />
      
      <footer className="pt-24 pb-12 border-t border-border bg-surface/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 glow opacity-10" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold tracking-tighter">
                KAMRAN<span className="text-primary">.</span>
              </h2>
              <p className="text-muted text-lg max-w-md leading-relaxed font-medium">
                Transforming complex ideas into seamless digital experiences. Specializing in high-performance web systems and AI-driven automation.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/codebykami", label: "Github" },
                  { icon: Linkedin, href: "https://linkedin.com/in/kamranrasool", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:kamranrasool0045@gmail.com", label: "Email" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted hover:text-primary transition-colors font-medium text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Social</h4>
              <ul className="space-y-4">
                {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted hover:text-primary transition-colors font-medium text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[12px] text-muted font-medium">
              © 2026 Kamran Rasool. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[12px] text-muted hover:text-primary transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-[12px] text-muted hover:text-primary transition-colors font-medium">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
