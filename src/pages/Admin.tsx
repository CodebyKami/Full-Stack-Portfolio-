import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  Database, 
  MessageSquare, 
  Briefcase, 
  Code, 
  User, 
  Mail, 
  LayoutDashboard, 
  Settings,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const { projects, skills, experience, fetchPortfolio } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }
    setIsLoading(true);
    try {
      const redirectUrl = window.location.origin + '/admin';
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: { emailRedirectTo: redirectUrl }
      });
      if (error) throw error;
      toast.success('Magic link sent to your email!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out');
  };

  const seedData = async () => {
    setIsLoading(true);
    try {
      // Seed Profile
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: 'Kamran Rasool',
        title: 'Full-Stack Developer & Automation Expert',
        bio: 'Expert in building high-performance websites using WordPress, GoHighLevel, and Squarespace.',
        email: 'kamranrasool0045@gmail.com',
        github_url: 'https://github.com/codebykami',
        linkedin_url: 'https://linkedin.com/in/kamranrasool',
      });

      // Seed Skills
      await supabase.from('skills').insert([
        { name: 'WordPress', category: 'CMS', proficiency: 98 },
        { name: 'GoHighLevel', category: 'CRM/Automation', proficiency: 95 },
        { name: 'React', category: 'Frontend', proficiency: 90 },
        { name: 'Node.js', category: 'Backend', proficiency: 85 },
      ]);

      toast.success('Database seeded successfully!');
      fetchPortfolio();
    } catch (error: any) {
      toast.error('Seeding failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-white">ADMIN<span className="text-primary">.</span></h1>
            <p className="text-muted-foreground text-sm uppercase tracking-[2px]">Secure Access Portal</p>
          </div>
          
          <Card className="border-white/5 bg-[#0a0a0a] shadow-2xl">
            <CardContent className="pt-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground">Email Address</label>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="bg-white/5 border-white/10 focus:border-primary transition-all h-12"
                    placeholder="admin@aura.dev"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground">Password</label>
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="bg-white/5 border-white/10 focus:border-primary transition-all h-12"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full h-12 btn-primary font-bold" disabled={isLoading}>
                  {isLoading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-[2px]"><span className="bg-[#0a0a0a] px-4 text-muted-foreground">Recovery</span></div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-white/10 hover:bg-white/5 gap-2 font-bold" 
                  onClick={handleMagicLink}
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4" />
                  SEND MAGIC LINK
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <p className="text-[11px] font-bold text-primary uppercase tracking-[2px]">Setup Reminder:</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ensure your Supabase Redirect URL is set to: <br/>
              <code className="text-primary mt-1 block font-mono">{window.location.origin}/**</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'setup', label: 'System Setup', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar - WordPress Style */}
      <aside className="w-72 border-r border-white/5 bg-[#0a0a0a] flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-2xl font-black tracking-tighter text-white">ADMIN<span className="text-primary">.</span></h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[2px] mt-1">Portfolio Manager</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                activeTab === item.id 
                  ? "bg-primary text-black font-bold shadow-[0_0_20px_rgba(200,245,56,0.2)]" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5", activeTab === item.id ? "text-black" : "text-muted-foreground group-hover:text-primary")} />
              <span className="text-sm tracking-tight">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4 text-black" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="w-full justify-start gap-4 text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-12 rounded-xl"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-bold">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-72">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex items-center justify-between px-12 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Pages</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
            <span className="text-white font-bold text-sm capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" target="_blank" className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
              <Globe className="h-4 w-4" />
              VIEW SITE
            </a>
            <div className="h-8 w-[1px] bg-white/5" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-white">Kamran Rasool</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Administrator</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-black">
                KR
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="p-12 max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Total Projects</p>
                  <h3 className="text-5xl font-black text-white">{projects.length}</h3>
                </Card>
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Skills Tracked</p>
                  <h3 className="text-5xl font-black text-white">{skills.length}</h3>
                </Card>
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Experience Years</p>
                  <h3 className="text-5xl font-black text-white">5+</h3>
                </Card>
              </div>

              <Card className="bg-[#0a0a0a] border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 border-white/5 hover:bg-white/5 flex flex-col gap-1 items-start p-6">
                    <span className="font-bold text-white">Add New Project</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Showcase your latest work</span>
                  </Button>
                  <Button variant="outline" className="h-20 border-white/5 hover:bg-white/5 flex flex-col gap-1 items-start p-6">
                    <span className="font-bold text-white">Update Profile</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Change your bio and title</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'projects' && (
            <Card className="bg-[#0a0a0a] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-8">
                <CardTitle className="text-2xl font-bold">Manage Projects</CardTitle>
                <Button className="btn-primary gap-2 h-10 px-6">
                  <Plus className="h-4 w-4" /> ADD PROJECT
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-xl bg-white/5 overflow-hidden">
                          <img src={project.image_url || `https://picsum.photos/seed/${project.title}/200/200`} className="w-full h-full object-cover opacity-50" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{project.title}</h4>
                          <div className="flex gap-2 mt-2">
                            {project.tags?.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-[9px] bg-white/5 text-muted-foreground border-none px-2">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Settings className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'skills' && (
            <Card className="bg-[#0a0a0a] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-8">
                <CardTitle className="text-2xl font-bold">Expertise & Skills</CardTitle>
                <Button className="btn-primary gap-2 h-10 px-6">
                  <Plus className="h-4 w-4" /> ADD SKILL
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {skill.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{skill.category} • {skill.proficiency}%</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'experience' && (
            <Card className="bg-[#0a0a0a] border-white/5">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-8">
                <CardTitle className="text-2xl font-bold">Work History</CardTitle>
                <Button className="btn-primary gap-2 h-10 px-6">
                  <Plus className="h-4 w-4" /> ADD EXPERIENCE
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] group relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                          <p className="text-primary font-bold text-sm">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                            {exp.start_date} — {exp.current ? 'PRESENT' : exp.end_date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'messages' && (
            <Card className="bg-[#0a0a0a] border-white/5">
              <CardHeader className="border-b border-white/5 pb-8">
                <CardTitle className="text-2xl font-bold">Inbound Messages</CardTitle>
              </CardHeader>
              <CardContent className="pt-20 pb-20 text-center">
                <div className="max-w-xs mx-auto space-y-6">
                  <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                    <Mail className="h-10 w-10 text-muted-foreground/20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">No Messages Yet</h3>
                    <p className="text-sm text-muted-foreground">When clients contact you through the website, their messages will appear here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-8">
              <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Database className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Database Initialization</h3>
                        <p className="text-sm text-muted-foreground">Setup your Supabase tables and security policies.</p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        1. Open your **Supabase SQL Editor**.<br/>
                        2. Copy the contents of <code>/supabase/schema.sql</code>.<br/>
                        3. Execute the script to create all required tables.
                      </p>
                      <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => {
                        navigator.clipboard.writeText("Check /supabase/schema.sql in the file explorer.");
                        toast.info("SQL path copied to clipboard");
                      }}>
                        COPY SCHEMA PATH
                      </Button>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Plus className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Data Seeding</h3>
                        <p className="text-sm text-muted-foreground">Populate your portfolio with Kamran Rasool's professional data.</p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <Button onClick={seedData} disabled={isLoading} className="btn-primary h-12 px-8 font-bold">
                        {isLoading ? 'SEEDING DATA...' : 'RUN SEED SCRIPT'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
