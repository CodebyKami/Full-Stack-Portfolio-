import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, LogOut, Database, MessageSquare, Briefcase, Code, User, Mail } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: window.location.origin + '/admin'
        }
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
      const { error: prError } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: 'Kamran Rasool',
        title: 'Full-Stack Developer & Automation Expert',
        bio: 'Expert in building high-performance websites using WordPress, GoHighLevel, and Squarespace, alongside custom Full-Stack solutions and AI integrations.',
        email: 'kamranrasool0045@gmail.com',
        github_url: 'https://github.com/codebykami',
        linkedin_url: 'https://linkedin.com/in/kamranrasool',
      });
      if (prError) throw prError;

      // Seed Skills
      const { error: sError } = await supabase.from('skills').insert([
        { name: 'WordPress', category: 'CMS', proficiency: 98 },
        { name: 'GoHighLevel', category: 'CRM/Automation', proficiency: 95 },
        { name: 'Squarespace', category: 'CMS', proficiency: 92 },
        { name: 'React / Next.js', category: 'Frontend', proficiency: 90 },
        { name: 'Node.js / Express', category: 'Backend', proficiency: 85 },
        { name: 'PHP / Laravel', category: 'Backend', proficiency: 88 },
        { name: 'Zapier / Make', category: 'Automation', proficiency: 94 },
        { name: 'SEO', category: 'Marketing', proficiency: 85 },
      ]);
      if (sError) throw sError;

      // Seed Projects
      const { error: pError } = await supabase.from('projects').insert([
        { 
          title: 'E-commerce Automation Hub', 
          description: 'A custom solution for syncing Shopify orders with GoHighLevel CRM for automated lead nurturing.',
          tags: ['Node.js', 'Shopify API', 'GoHighLevel', 'Automation'],
          featured: true,
          category: 'Automation'
        },
        { 
          title: 'Real Estate CRM Snapshot', 
          description: 'A comprehensive GoHighLevel snapshot designed for real estate agents with custom funnels and workflows.',
          tags: ['GoHighLevel', 'CRM', 'Funnels'],
          featured: true,
          category: 'CRM'
        },
        { 
          title: 'Aura AI Portfolio', 
          description: 'A premium AI-powered portfolio platform with intelligent assistant and proposal generation.',
          tags: ['Next.js', 'Supabase', 'Groq AI', 'Tailwind'],
          featured: true,
          category: 'SaaS'
        }
      ]);
      if (pError) throw pError;

      // Seed Experience
      const { error: eError } = await supabase.from('experience').insert([
        { 
          company: 'Freelance / Self-Employed', 
          role: 'Senior Web Developer & Automation Specialist', 
          start_date: '2021-01-01', 
          current: true,
          description: ['Delivered 100+ high-conversion websites', 'Automated business workflows for 50+ clients', 'Specialized in CRM integrations']
        },
        { 
          company: 'Digital Agency X', 
          role: 'Full-Stack Developer', 
          start_date: '2019-05-01', 
          end_date: '2020-12-31',
          description: ['Developed custom WordPress themes', 'Built internal tools with React', 'Managed client deployments']
        }
      ]);
      if (eError) throw eError;

      toast.success('Database seeded with realistic data!');
      fetchPortfolio();
    } catch (error: any) {
      toast.error('Seeding failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-primary/5">
        <Card className="w-full max-w-md border-primary/10 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="admin@aura.dev"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleMagicLink}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
                Send Magic Link
              </Button>
            </form>
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground space-y-2">
              <p className="font-bold text-primary">Recovery Solution:</p>
              <p>If you forgot your password, enter your email and click <strong>"Send Magic Link"</strong>. You'll receive a login link directly in your inbox.</p>
              <p className="pt-2 border-t border-primary/10"><strong>Database Setup:</strong> Ensure you've run the SQL in <code>/supabase/schema.sql</code> in your Supabase SQL Editor to create the required tables.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content and messages.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={seedData} disabled={isLoading} className="gap-2">
            <Database className="h-4 w-4" />
            Seed Data
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[750px]">
          <TabsTrigger value="projects" className="gap-2"><Code className="h-4 w-4" /> Projects</TabsTrigger>
          <TabsTrigger value="skills" className="gap-2"><User className="h-4 w-4" /> Skills</TabsTrigger>
          <TabsTrigger value="experience" className="gap-2"><Briefcase className="h-4 w-4" /> Experience</TabsTrigger>
          <TabsTrigger value="messages" className="gap-2"><MessageSquare className="h-4 w-4" /> Messages</TabsTrigger>
          <TabsTrigger value="setup" className="gap-2"><Database className="h-4 w-4" /> Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle>Database Setup & Recovery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Step 1: Create Tables
                </h3>
                <p className="text-sm text-muted-foreground">
                  Copy the SQL from <code>/supabase/schema.sql</code> and paste it into your <strong>Supabase SQL Editor</strong>. This will create all necessary tables and security policies.
                </p>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText("Check /supabase/schema.sql in the file explorer.");
                  toast.info("SQL path copied to clipboard");
                }}>
                  Copy SQL Path
                </Button>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Step 2: Seed Realistic Data
                </h3>
                <p className="text-sm text-muted-foreground">
                  Once tables are created, click the button below to populate your portfolio with realistic data for Kamran Rasool.
                </p>
                <Button onClick={seedData} disabled={isLoading} className="btn-primary">
                  {isLoading ? 'Seeding...' : 'Seed Realistic Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Project</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-primary/5">
                    <div>
                      <h4 className="font-bold">{project.title}</h4>
                      <div className="flex gap-2 mt-1">
                        {project.tags?.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Skill</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">{skill.name[0]}</div>
                      <div>
                        <h4 className="font-bold">{skill.name}</h4>
                        <span className="text-xs text-muted-foreground">{skill.category} • {skill.proficiency}%</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card className="border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Experience</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-primary/5 bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">{exp.role} @ {exp.company}</h4>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.start_date} — {exp.current ? 'Present' : exp.end_date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No messages yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
