import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Placeholder sections for now
const About = () => <section id="about" className="py-24 container mx-auto px-4"><h2 className="text-4xl font-bold mb-8">About Me</h2><div className="grid md:grid-cols-2 gap-12"><div className="space-y-4 text-lg text-muted-foreground"><p>I am Kamran Rasool, a dedicated Web Developer and Automation Specialist with a passion for creating digital experiences that drive results. With expertise in WordPress, GoHighLevel, and Squarespace, I help businesses streamline their operations and enhance their online presence.</p><p>My approach combines technical proficiency with a deep understanding of business needs, allowing me to deliver custom solutions that are both functional and aesthetically pleasing.</p></div><div className="aspect-square rounded-3xl bg-primary/5 border border-primary/10 overflow-hidden relative group"><img src="https://picsum.photos/seed/kamran/800/800" alt="Kamran Rasool" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" /><div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div></div></div></section>;

const Skills = () => {
  const skills = useStore(state => state.skills);
  const hasSkills = Array.isArray(skills) && skills.length > 0;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">TECHNICAL ARSENAL</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {hasSkills ? skills.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group p-6 rounded-3xl bg-background/40 backdrop-blur-md border border-primary/10 flex flex-col items-center gap-4 shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {skill.name[0]}
              </div>
              <div className="space-y-1">
                <span className="font-bold block">{skill.name}</span>
                <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency || 80}%` }}
                    viewport={{ once: true }}
                    className="h-full bg-primary"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          )) : [1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-40 rounded-3xl" />)}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = useStore(state => state.projects);
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <section id="projects" className="py-24 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">FEATURED WORK</h2>
          <p className="text-muted-foreground max-w-md text-lg">A selection of my most impactful projects, ranging from SaaS platforms to complex AI integrations.</p>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {['All', 'SaaS', 'AI', 'Web'].map((cat, i) => (
            <motion.button 
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-2 rounded-full border border-primary/20 hover:bg-primary hover:text-white text-sm font-bold transition-all duration-300"
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {hasProjects ? projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -15 }}
            className="group rounded-[2.5rem] border border-primary/10 overflow-hidden bg-background/40 backdrop-blur-md shadow-2xl hover:shadow-primary/20 transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={project.image_url || `https://picsum.photos/seed/${project.title}/800/600`} 
                alt={project.title} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                <div className="flex gap-3">
                  <Button size="sm" className="rounded-full font-bold">Live Demo</Button>
                  <Button size="sm" variant="outline" className="rounded-full font-bold bg-white/10 backdrop-blur-md border-white/20 text-white">Source</Button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-black tracking-tight">{project.title}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">{project.category || 'Web'}</span>
              </div>
              <p className="text-muted-foreground mb-6 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-1 rounded-full bg-secondary/50 border border-white/5">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )) : [1,2,3].map(i => <Skeleton key={i} className="h-[450px] rounded-[2.5rem]" />)}
      </div>
    </section>
  );
};

const Experience = () => {
  const experience = useStore(state => state.experience);
  const hasExperience = Array.isArray(experience) && experience.length > 0;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)]"></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">JOURNEY SO FAR</h2>
          <p className="text-muted-foreground">My professional evolution and key milestones.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {hasExperience ? experience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-0"
            >
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2"></div>
              <div className="md:flex items-center justify-between gap-12">
                <div className={cn(
                  "md:w-1/2 space-y-4",
                  i % 2 === 0 ? "md:text-right md:order-1" : "md:text-left md:order-2"
                )}>
                  <div className={cn(
                    "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest mb-2",
                    i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                  )}>
                    {exp.start_date} — {exp.current ? 'PRESENT' : exp.end_date}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{exp.role}</h3>
                  <p className="text-xl font-bold text-primary/80">{exp.company}</p>
                  <ul className={cn(
                    "space-y-3",
                    i % 2 === 0 ? "md:flex md:flex-col md:items-end" : ""
                  )}>
                    {exp.description?.map((item: string, j: number) => (
                      <li key={j} className="text-sm text-muted-foreground leading-relaxed max-w-md">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 h-8 w-8 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(56,189,248,0.4)] -translate-x-1/2 z-10"></div>
                <div className="md:w-1/2"></div>
              </div>
            </motion.div>
          )) : [1,2].map(i => <Skeleton key={i} className="h-64 rounded-3xl" />)}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 container mx-auto px-4">
    <div className="max-w-4xl mx-auto rounded-[40px] bg-primary p-8 md:p-16 text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">LET'S BUILD <br />SOMETHING <br />GREAT.</h2>
          <p className="text-primary-foreground/80 mb-8">Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">📧</div>
              <span>hello@aura.dev</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">📍</div>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-white/40 focus:outline-none focus:ring-2 ring-white/30" />
          <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-white/40 focus:outline-none focus:ring-2 ring-white/30" />
          <textarea placeholder="Message" rows={4} className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-white/40 focus:outline-none focus:ring-2 ring-white/30"></textarea>
          <button className="w-full bg-white text-primary font-bold py-4 rounded-2xl hover:bg-white/90 transition-colors shadow-lg">Send Message</button>
        </form>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-12 border-t border-primary/10 text-center text-sm text-muted-foreground">
        <p>© 2026 Aura AI Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
