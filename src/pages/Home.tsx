import React, { useRef, useState, useEffect } from 'react';
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
  Plus
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

const About = () => (
  <section id="about" className="relative bg-white">
    <ScrollReveal className="container">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-border">
            <img 
              src="https://picsum.photos/seed/kamran/800/1000" 
              alt="Kamran Rasool" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Achievement Cards */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass p-6 md:p-8 rounded-3xl shadow-premium border border-border/50 max-w-[200px] md:max-w-[240px]"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">8+</div>
            <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-muted leading-tight">Years of Engineering Excellence</div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-10 -right-6 md:-right-10 glass p-5 md:p-6 rounded-3xl shadow-premium border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Global Clients</div>
                <div className="text-[10px] text-muted font-medium">20+ Countries</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2 space-y-10">
          <div className="space-y-6">
            <span className="section-label">The Story</span>
            <h2 className="fluid-h2 leading-[1.1]">
              Crafting <span className="text-primary">exceptional</span> digital experiences.
            </h2>
            <p className="text-lg md:text-xl text-muted leading-relaxed font-medium">
              I'm a Senior Product Engineer with a deep focus on the intersection of design and engineering. My mission is to build digital products that are not just functional, but delightful to use.
            </p>
            <p className="text-base text-muted/80 leading-relaxed">
              With a background in both frontend and backend systems, I bridge the gap between complex technical requirements and intuitive user interfaces. I specialize in building scalable architectures that power modern web applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h4 className="text-foreground font-bold text-base">Product Strategy</h4>
              <p className="text-muted text-sm leading-relaxed">Aligning technical decisions with business goals to ensure long-term success.</p>
            </div>
            <div className="space-y-3">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <h4 className="text-foreground font-bold text-base">System Design</h4>
              <p className="text-muted text-sm leading-relaxed">Building robust, scalable, and maintainable architectures from day one.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button className="btn-primary h-14 px-8">
              Download Resume
              <Download className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-secondary h-14 px-8">
              Read My Blog
            </Button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </section>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      icon: Code
    },
    {
      title: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "Supabase", "Redis", "GraphQL"],
      icon: Cpu
    },
    {
      title: "Tools & DevOps",
      skills: ["Docker", "AWS", "Vercel", "Git", "Figma", "Stripe API"],
      icon: Globe
    }
  ];

  return (
    <section id="skills" className="bg-surface">
      <ScrollReveal className="container">
        <div className="mb-16 md:mb-24 text-center">
          <span className="section-label mx-auto">Expertise</span>
          <h2 className="fluid-h2">Technical <span className="text-primary">arsenal</span>.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[32px] shadow-premium border border-border group transition-all duration-500"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <category.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6 tracking-tight">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-4 py-2 rounded-xl bg-surface border border-border text-sm font-medium text-muted hover:border-primary/30 hover:text-primary transition-colors"
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
        { title: "Quantum Dashboard", category: "Web", description: "A high-performance analytics dashboard with real-time data visualization and predictive insights.", tags: ["React", "D3.js", "Tailwind"] },
        { title: "AI Content Engine", category: "AI", description: "Automated content generation platform powered by LLMs with multi-modal support.", tags: ["Next.js", "OpenAI", "Supabase"] },
        { title: "Nexus CRM", category: "SaaS", description: "Custom CRM solution with integrated workflow automation and advanced lead tracking.", tags: ["Node.js", "PostgreSQL", "Redis"] },
        { title: "Stripe Integration", category: "Web", description: "Seamless payment processing system with subscription management and tax handling.", tags: ["React", "Stripe", "Node.js"] },
        { title: "Linear Clone", category: "SaaS", description: "A high-performance project management tool with real-time collaboration.", tags: ["Next.js", "Socket.io", "Prisma"] },
        { title: "Apple Store UI", category: "Web", description: "A pixel-perfect recreation of the Apple Store experience with fluid animations.", tags: ["React", "Framer Motion", "GSAP"] },
      ];

  return (
    <section id="projects" className="bg-white">
      <ScrollReveal className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-10">
          <div className="max-w-2xl">
            <span className="section-label">Selected Work</span>
            <h2 className="fluid-h2 tracking-tight">Building digital <span className="text-primary">legacies</span>.</h2>
            <p className="text-lg text-muted mt-6 font-medium">A collection of projects that push the boundaries of web engineering and user experience design.</p>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-surface border border-border w-fit">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={cn(
                  "text-[13px] font-bold transition-all duration-300 px-6 py-2.5 rounded-xl",
                  filter === cat 
                    ? "bg-white text-primary shadow-sm border border-border" 
                    : "text-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col bg-white rounded-[32px] border border-border overflow-hidden hover:border-primary/20 hover:shadow-hover transition-all duration-500"
            >
              <div className="overflow-hidden relative aspect-[16/10]">
                <img 
                  src={project.image_url || `https://picsum.photos/seed/${project.title}/1200/800`} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex gap-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <Button className="bg-white text-foreground hover:bg-white/90 h-11 px-6 rounded-xl font-bold text-sm">
                      Live Demo
                    </Button>
                    <Button className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 h-11 px-6 rounded-xl font-bold text-sm border border-white/30">
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10">{project.category}</span>
                </div>
                <p className="text-muted text-base mb-8 line-clamp-2 font-medium leading-relaxed">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[11px] font-bold text-muted/80 px-3 py-1.5 rounded-lg bg-surface border border-border uppercase tracking-wider">{tag}</span>
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
    { role: "Senior Product Engineer", company: "TechFlow Solutions", start_date: "2022", end_date: "Present", description: ["Leading development of enterprise-scale web applications.", "Architecting microservices using Node.js and Go.", "Mentoring junior engineers and establishing best practices."] },
    { role: "Frontend Architect", company: "Creative Minds Agency", start_date: "2020", end_date: "2022", description: ["Built immersive user experiences with React and GSAP.", "Optimized performance for high-traffic client websites.", "Developed a custom UI library used across 20+ projects."] },
  ];

  const displayExperience = hasExperience ? experience : defaultExperience;

  return (
    <section id="experience" className="bg-surface">
      <ScrollReveal className="container">
        <div className="mb-16 md:mb-24 text-center">
          <span className="section-label mx-auto">My Journey</span>
          <h2 className="fluid-h2">Professional <span className="text-primary">experience</span>.</h2>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-border">
          {displayExperience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "relative pl-10 md:pl-0 flex flex-col md:flex-row gap-10",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-[6px] ring-primary/10 z-10" />
              
              <div className={cn(
                "md:w-1/2",
                i % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"
              )}>
                <div className="inline-block px-4 py-1.5 rounded-xl bg-white border border-border text-[11px] font-bold text-primary mb-6 shadow-sm">
                  {exp.start_date} — {exp.end_date}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">{exp.role}</h3>
                <p className="text-primary text-base font-bold mb-6">{exp.company}</p>
                <div className={cn(
                  "space-y-4",
                  i % 2 === 0 ? "" : "md:items-end flex flex-col"
                )}>
                  {exp.description?.map((item: string, j: number) => (
                    <p key={j} className="text-base text-muted leading-relaxed max-w-lg font-medium">{item}</p>
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

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            subject: formData.subject, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      setFormState('idle');
    }
  };

  return (
    <section id="contact" className="bg-white relative overflow-hidden">
      <ScrollReveal className="container">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="section-label">Contact</span>
              <h2 className="fluid-h2 leading-tight">
                Let's build something <span className="text-primary">extraordinary</span>.
              </h2>
              <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-md">
                Ready to take your project to the next level? I'm currently accepting new projects and consulting opportunities.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-xl font-bold text-foreground break-all tracking-tight">kamranrasool0045@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Location</p>
                  <p className="text-xl font-bold text-foreground tracking-tight">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-surface border border-border rounded-[40px] p-10 md:p-12 shadow-premium">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12"
                  >
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-foreground tracking-tight">Message Sent!</h3>
                      <p className="text-lg text-muted font-medium">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setFormState('idle')}
                      className="btn-secondary h-12 px-8 font-bold"
                    >
                      Send Another
                    </Button>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                        <Input 
                          required 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe" 
                          className="bg-white border-border h-14 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                        <Input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com" 
                          className="bg-white border-border h-14 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Subject</label>
                      <Input 
                        required 
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Inquiry" 
                        className="bg-white border-border h-14 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-muted uppercase tracking-widest ml-1">Message</label>
                      <Textarea 
                        required 
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..." 
                        className="bg-white border-border min-h-[180px] rounded-[24px] focus:ring-primary/20 focus:border-primary transition-all p-6 font-medium resize-none" 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={formState === 'loading'}
                      className="w-full btn-primary h-16 text-lg rounded-2xl group"
                    >
                      {formState === 'loading' ? 'Sending...' : (
                        <span className="flex items-center gap-3">
                          Send Message <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      )}
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

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      
      <footer className="py-12 md:py-20 bg-surface border-t border-border relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-24">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                KAMRAN<span className="text-primary">.</span>
              </h2>
              <p className="text-lg text-muted max-w-md leading-relaxed font-medium">
                Designing and engineering high-performance digital products. Focused on quality, performance, and user experience.
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
                    className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-500 shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted hover:text-primary transition-colors font-bold text-base">
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
                    <a href="#" className="text-muted hover:text-primary transition-colors font-bold text-base">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-muted font-bold tracking-tight">
              © 2026 Kamran Rasool. Designed with precision.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-sm text-muted hover:text-primary transition-colors font-bold">Privacy Policy</a>
              <a href="#" className="text-sm text-muted hover:text-primary transition-colors font-bold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
