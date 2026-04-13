import Hero from '../components/sections/Hero';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';

// Placeholder sections for now
const About = () => <section id="about" className="py-24 container mx-auto px-4"><h2 className="text-4xl font-bold mb-8">About Me</h2><div className="grid md:grid-cols-2 gap-12"><div className="space-y-4 text-lg text-muted-foreground"><p>I am Kamran Rasool, a dedicated Web Developer and Automation Specialist with a passion for creating digital experiences that drive results. With expertise in WordPress, GoHighLevel, and Squarespace, I help businesses streamline their operations and enhance their online presence.</p><p>My approach combines technical proficiency with a deep understanding of business needs, allowing me to deliver custom solutions that are both functional and aesthetically pleasing.</p></div><div className="aspect-square rounded-3xl bg-primary/5 border border-primary/10 overflow-hidden relative group"><img src="https://picsum.photos/seed/kamran/800/800" alt="Kamran Rasool" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" /><div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div></div></div></section>;

const Skills = () => {
  const skills = useStore(state => state.skills);
  return (
    <section id="skills" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Technical Arsenal</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.length > 0 ? skills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-background border border-primary/10 flex flex-col items-center gap-3 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                {skill.name[0]}
              </div>
              <span className="font-medium">{skill.name}</span>
            </motion.div>
          )) : [1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = useStore(state => state.projects);
  return (
    <section id="projects" className="py-24 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-md">A selection of my most impactful projects, ranging from SaaS platforms to complex AI integrations.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'SaaS', 'AI', 'Web'].map(cat => (
            <button key={cat} className="px-4 py-2 rounded-full border border-primary/10 hover:bg-primary/5 text-sm transition-colors">{cat}</button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? projects.map((project, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="group rounded-3xl border border-primary/10 overflow-hidden bg-background shadow-xl shadow-primary/5"
          >
            <div className="aspect-video overflow-hidden relative">
              <img src={project.image_url || `https://picsum.photos/seed/${project.title}/800/450`} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs">Demo</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs">Repo</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-1 rounded-md bg-primary/5">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )) : [1,2,3].map(i => <Skeleton key={i} className="h-[400px] rounded-3xl" />)}
      </div>
    </section>
  );
};

const Experience = () => {
  const experience = useStore(state => state.experience);
  return (
    <section id="experience" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Journey So Far</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experience.length > 0 ? experience.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l border-primary/20 pb-8 last:pb-0">
              <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-sm font-mono text-primary">{exp.start_date} — {exp.current ? 'Present' : exp.end_date}</span>
              </div>
              <p className="text-lg font-medium text-muted-foreground mb-4">{exp.company}</p>
              <ul className="space-y-2">
                {exp.description?.map((item: string, j: number) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )) : [1,2].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
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
