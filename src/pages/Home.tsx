import React, { useRef, useState } from 'react';
import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Mail, MapPin, Send, CheckCircle2, Sparkles, Code, Cpu, Globe, Linkedin, X, ChevronRight } from 'lucide-react';
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
  <section id="about" className="relative py-24">
    <ScrollReveal className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <span className="section-label">ABOUT ME</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter leading-[1.1]">
            TURNING IDEAS INTO <span className="text-primary italic">DIGITAL REALITY</span>.
          </h2>
          <div className="space-y-6 text-lg text-foreground/80 font-medium">
            <p>
              I am Kamran Rasool, a Full-Stack Developer and WordPress Expert with a passion for building high-performance digital experiences. With a deep grip on WordPress, GoHighLevel, and modern web technologies, I help businesses scale through custom solutions.
            </p>
            <p>
              My expertise lies in bridging the gap between complex technical requirements and intuitive user interfaces. Whether it's a custom WordPress theme or a complex SaaS application, I deliver excellence.
            </p>
          </div>
          
          <div className="flex gap-12 pt-4">
            <div>
              <h4 className="text-2xl font-bold text-foreground">5+</h4>
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Years Exp.</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-foreground">150+</h4>
              <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Projects</p>
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
    <section id="skills" className="bg-secondary/30 py-24">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">EXPERTISE</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">TECHNICAL ARSENAL.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-12">
          {hasSkills ? skills.map((skill, i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold font-heading uppercase tracking-tight text-foreground">{skill.name}</span>
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
  const [filter, setFilter] = useState('All');
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  const filteredProjects = hasProjects 
    ? (filter === 'All' ? projects : projects.filter(p => p.category === filter))
    : [];

  const categories = ['All', 'Web', 'AI', 'Automation', 'CRM'];

  return (
    <section id="projects" className="py-24">
      <ScrollReveal className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label">WORK</span>
            <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">FEATURED PROJECTS.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[2px] transition-all duration-300 interactive px-6 py-3 rounded-full border",
                  filter === cat ? "bg-primary text-black border-primary" : "text-muted hover:text-primary border-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              className={cn(
                "group card-premium p-0 overflow-hidden interactive",
                i === 0 && filter === 'All' ? "md:col-span-2" : ""
              )}
            >
              <div className={cn(
                "overflow-hidden relative",
                i === 0 && filter === 'All' ? "aspect-[21/9]" : "aspect-[16/10]"
              )}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image_url || `https://picsum.photos/seed/${project.title}/1200/800`} 
                  alt={project.title} 
                  className="object-cover w-full h-full" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <div className="flex gap-4">
                    <Button className="btn-primary h-auto py-3 px-6 text-xs">
                      VIEW LIVE <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                    <Button className="btn-secondary h-auto py-3 px-6 text-xs">
                      GITHUB <Github className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{project.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{project.category || 'WEB'}</span>
                </div>
                <p className="text-foreground/70 mb-8 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 px-4 py-1.5 rounded-full border border-white/5 bg-white/5">{tag}</span>
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

  return (
    <section id="experience" className="py-24 bg-secondary/10">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">MY JOURNEY</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">EXPERIENCE.</h2>
        </div>
        
        <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-white/5">
          {hasExperience ? experience.map((exp, i) => (
            <div key={i} className={cn(
              "relative flex flex-col md:flex-row gap-12",
              i % 2 === 0 ? "md:flex-row-reverse" : ""
            )}>
              <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-0 h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(200,245,56,0.5)] z-10" />
              
              <div className="md:w-1/2 space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  {exp.start_date} — {exp.end_date}
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">{exp.role}</h3>
                <p className="text-xl text-primary/80 font-medium">{exp.company}</p>
                <ul className="space-y-3">
                  {exp.description?.map((item: string, j: number) => (
                    <li key={j} className="text-foreground/70 flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )) : [1,2].map(i => <Skeleton key={i} className="h-40 w-full" />)}
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
    <section id="pricing" className="py-24">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">PRICING</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">INVESTMENT.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={cn(
                "card-premium p-12 flex flex-col interactive h-full",
                plan.featured ? "border-primary/50 bg-primary/[0.02] shadow-[0_0_50px_rgba(200,245,56,0.1)]" : "bg-secondary/20"
              )}
            >
              {plan.featured && <span className="text-[10px] font-bold uppercase tracking-[3px] text-primary mb-6">Most Popular</span>}
              <h3 className="text-3xl font-bold mb-2 tracking-tight text-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black tracking-tighter text-foreground">${plan.price}</span>
                <span className="text-foreground/60 font-medium">/project</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-4 text-foreground/70 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={cn(
                "w-full h-16 rounded-2xl font-bold text-sm tracking-widest uppercase interactive",
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />
      
      <ScrollReveal className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <span className="section-label">CONTACT</span>
              <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter leading-[1.1]">
                LET'S BUILD SOMETHING <span className="text-primary italic">EXTRAORDINARY</span>.
              </h2>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-center gap-8 group interactive">
                <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[3px] text-foreground/60 font-bold mb-1">Email Me</p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">kamranrasool0045@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group interactive">
                <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[3px] text-foreground/60 font-bold mb-1">Location</p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">Lahore, Pakistan</p>
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
                  <h3 className="text-3xl font-bold text-foreground">MESSAGE SENT!</h3>
                  <p className="text-foreground/70">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setFormState('idle')} className="btn-secondary">SEND ANOTHER</Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[3px] font-bold text-foreground/60 ml-1">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl h-16 px-6 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[3px] font-bold text-foreground/60 ml-1">Email Address</label>
                      <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl h-16 px-6 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[3px] font-bold text-foreground/60 ml-1">Subject</label>
                    <input required type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl h-16 px-6 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium text-foreground" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[3px] font-bold text-foreground/60 ml-1">Message</label>
                    <textarea required placeholder="Tell me about your project..." rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all font-medium resize-none text-foreground" />
                  </div>
                  <Button type="submit" disabled={formState === 'loading'} className="btn-primary w-full h-16 rounded-2xl font-bold text-sm tracking-widest uppercase interactive">
                    {formState === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                    <Send className="ml-3 h-5 w-5" />
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
  const services = useStore(state => state.services);
  const [selectedService, setSelectedService] = useState<any>(null);
  const hasServices = Array.isArray(services) && services.length > 0;

  const displayServices = hasServices ? services : [
    { title: "WordPress Development", description: "Custom themes and plugin development for high-performance sites.", icon_name: "Code" },
    { title: "Full-Stack Solutions", description: "End-to-end web applications built with modern technologies.", icon_name: "Cpu" },
    { title: "CRM & Automation", description: "Streamlining business processes with GHL and custom workflows.", icon_name: "Globe" },
    { title: "UI/UX Design", description: "Creating intuitive, visually stunning interfaces that prioritize user experience.", icon_name: "Sparkles" },
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
    <section id="services" className="py-24">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">SERVICES</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">WHAT I OFFER.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, i) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedService(service)}
                className={cn(
                  "group relative card-premium p-12 overflow-hidden interactive cursor-pointer",
                  i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                )}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="relative z-10">
                  <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 tracking-tight text-foreground">{service.title}</h3>
                  <p className="text-foreground/70 text-lg leading-relaxed">{service.description}</p>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[32px] p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 text-muted hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {React.createElement(getIcon(selectedService.icon_name), { className: "h-10 w-10 text-primary" })}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter">{selectedService.title}</h3>
                    <p className="text-primary font-bold uppercase tracking-[2px] text-xs mt-1">Premium Service</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-xl text-muted leading-relaxed">{selectedService.description}</p>
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-[2px] text-white mb-4">Service Details</h4>
                    <p className="text-muted leading-relaxed">{selectedService.details || "I provide comprehensive solutions tailored to your specific business needs, ensuring high performance and scalability."}</p>
                  </div>
                </div>

                <Button className="btn-primary w-full h-14 font-bold" onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  BOOK THIS SERVICE
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
  const skills = ["WordPress", "GoHighLevel", "React", "Next.js", "Node.js", "Automation", "UI/UX", "SEO", "Squarespace", "Zapier", "Make"];
  return (
    <div className="py-12 bg-secondary/20 border-y border-white/5 overflow-hidden relative">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap"
      >
        {[...skills, ...skills].map((skill, i) => (
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

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <ScrollReveal className="container mx-auto">
        <div className="mb-20">
          <span className="section-label">FEEDBACK</span>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">CLIENT STORIES.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {hasTestimonials ? testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={cn(
                "card-premium p-12 flex flex-col gap-8 interactive",
                i === 1 ? "md:-translate-y-8" : ""
              )}
            >
              <div className="flex gap-1">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <Sparkles key={j} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-xl italic text-foreground/80 leading-relaxed font-medium">"{t.content}"</p>
              <div className="flex items-center gap-5 mt-auto pt-8 border-t border-white/5">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.name}</h4>
                  <p className="text-sm text-foreground/60 uppercase tracking-widest font-bold">{t.role} @ {t.company}</p>
                </div>
              </div>
            </motion.div>
          )) : [1,2,3].map(i => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Blog = () => {
  const blogPosts = useStore(state => state.blogPosts);
  const hasPosts = Array.isArray(blogPosts) && blogPosts.length > 0;

  return (
    <section id="blog" className="py-24">
      <ScrollReveal className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label">INSIGHTS</span>
            <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter">LATEST ARTICLES.</h2>
          </div>
          <Button variant="outline" className="btn-secondary interactive">
            VIEW ALL POSTS
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {hasPosts ? blogPosts.map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group card-premium p-0 overflow-hidden interactive"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.image_url || `https://picsum.photos/seed/${post.title}/800/450`} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10 space-y-6">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[3px] text-primary">
                  <span>{post.tags?.[0] || 'TECH'}</span>
                  <span className="text-foreground/60">{post.read_time || '5 MIN READ'}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">{post.title}</h3>
                <p className="text-lg text-foreground/70 line-clamp-2 leading-relaxed font-medium">{post.excerpt}</p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[3px] text-white group-hover:gap-4 transition-all">
                  READ MORE <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          )) : [1,2,3].map(i => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      </ScrollReveal>
    </section>
  );
};

const Clients = () => {
  const clients = useStore(state => state.clients);
  const hasClients = Array.isArray(clients) && clients.length > 0;

  return (
    <div className="py-24 border-y border-white/5 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {hasClients ? clients.map((client, i) => (
            <img 
              key={i} 
              src={client.logo_url} 
              alt={client.name} 
              className="h-8 md:h-12 w-auto object-contain hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
          )) : [1,2,3,4,5].map(i => <div key={i} className="h-12 w-32 bg-white/5 rounded-lg animate-pulse" />)}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Clients />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Blog />
      <Pricing />
      <Contact />
      
      <footer className="pt-24 pb-12 border-t border-white/5 bg-secondary/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-[60px] relative z-10">
          <div className="flex justify-end mb-12">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-500 interactive group"
            >
              <ChevronRight className="h-6 w-6 -rotate-90 group-hover:scale-125 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2 space-y-10">
              <h2 className="text-5xl font-extrabold font-heading tracking-tighter">
                KAMRAN<span className="text-primary">.</span>
              </h2>
              <p className="text-foreground/70 text-xl max-w-md leading-relaxed font-medium">
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
                    <a href={`#${item.toLowerCase()}`} className="text-foreground/60 hover:text-primary transition-all duration-300 font-bold text-sm tracking-tight interactive flex items-center gap-2 group">
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
                  <li key={item} className="text-foreground/60 font-bold text-sm tracking-tight flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-foreground/60 uppercase tracking-[3px] font-black">
                © 2025 Crafted with Passion
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
