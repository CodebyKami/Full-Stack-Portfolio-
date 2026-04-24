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
  Globe,
  Cpu,
  Sparkles,
  X,
  Upload,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState<any[]>([]);

  const { profile, projects, skills, experience, services, testimonials, blogPosts, clients, fetchPortfolio } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemData, setNewItemData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user?.id || 'public'}/${fileName}`;

      // 1. Check if bucket exists/is accessible
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      
      if (bucketError) {
        console.error("Storage list error:", bucketError);
        throw new Error("Could not access Supabase storage. Please check if storage is enabled in your project.");
      }

      const portfolioBucket = buckets?.find(b => b.name === 'portfolio');
      
      if (!portfolioBucket) {
        console.log("Bucket 'portfolio' missing, attempting to create...");
        const { error: createError } = await supabase.storage.createBucket('portfolio', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error("Bucket creation failed:", createError);
          throw new Error("Bucket 'portfolio' not found and could not be created. Please create it manually in your Supabase dashboard.");
        }
        toast.info("Created missing 'portfolio' storage bucket.");
      }

      // 2. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      setNewItemData({ ...newItemData, [fieldName]: publicUrl });
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      const msg = error.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
      toast.error(String(msg));
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortfolio();
      fetchMessages();
      setupStorage();
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'profile') {
      setNewItemData(profile || {});
    } else {
      setNewItemData({});
    }
  }, [activeTab, profile]);

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

  const handleDelete = async (table: string, id: string | undefined) => {
    if (!id) {
      toast.info('This is sample data. To manage your own content, please go to the "System Setup" tab and run the seed script.', {
        duration: 5000,
        action: {
          label: 'Go to Setup',
          onClick: () => setActiveTab('setup')
        }
      });
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      toast.success('Deleted successfully');
      
      if (table === 'messages') {
        fetchMessages();
      } else {
        fetchPortfolio();
      }
    } catch (error: any) {
      toast.error('Delete failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let table = activeTab;
      if (activeTab === 'blog') table = 'blog_posts';
      
      const { error } = await supabase.from(table).insert([newItemData]);
      if (error) throw error;
      
      toast.success('Item added successfully');
      setIsAddModalOpen(false);
      setNewItemData({});
      
      if (table === 'messages') {
        fetchMessages();
      } else {
        fetchPortfolio();
      }
    } catch (error: any) {
      toast.error('Add failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        ...newItemData,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      toast.success('Profile updated successfully');
      setIsAddModalOpen(false);
      setNewItemData({});
      fetchPortfolio();
    } catch (error: any) {
      toast.error('Update failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setupStorage = async () => {
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      if (listError) throw listError;

      const exists = buckets?.some(b => b.name === 'portfolio');
      if (!exists) {
        const { error: createError } = await supabase.storage.createBucket('portfolio', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        });
        if (createError) throw createError;
        toast.success("Storage bucket 'portfolio' created successfully!");
      }
    } catch (error: any) {
      console.error('Storage setup error:', error);
      // We don't toast here as it might be a permission issue that doesn't block everything
    }
  };

  const seedData = async () => {
    setIsLoading(true);
    try {
      // Try to setup storage first
      await setupStorage();

      const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800";
      const defaultHero = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600";

      // Seed Profile
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: 'Kamran Rasool',
        title: 'Full-Stack Developer & Automation Expert',
        bio: 'Expert in building high-performance websites using WordPress, GoHighLevel, and Squarespace.',
        email: 'kamranrasool0045@gmail.com',
        avatar_url: defaultAvatar,
        hero_image_url: defaultHero,
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

      // Seed Services
      await supabase.from('services').insert([
        { title: 'Full-Stack Development', description: 'Building scalable, high-performance web applications.', details: 'I specialize in React, Next.js, and Node.js to build robust applications.', icon_name: 'Code', order_index: 0 },
        { title: 'AI Automation', description: 'Streamlining business processes with intelligent AI agents.', details: 'Using Zapier, Make, and custom AI agents to automate your workflow.', icon_name: 'Cpu', order_index: 1 },
        { title: 'UI/UX Design', description: 'Creating intuitive, visually stunning interfaces.', details: 'Focusing on user-centric design principles and modern aesthetics.', icon_name: 'Globe', order_index: 2 },
      ]);

      // Seed Testimonials
      await supabase.from('testimonials').insert([
        { name: 'John Doe', role: 'CEO', company: 'TechCorp', content: 'Kamran is an exceptional developer who delivered our project ahead of schedule.', rating: 5 },
        { name: 'Jane Smith', role: 'Founder', company: 'StartupInc', content: 'The automation workflows Kamran built saved us 20+ hours a week.', rating: 5 },
      ]);

      // Seed Blog Posts
      await supabase.from('blog_posts').insert([
        { title: 'The Future of AI in Web Dev', excerpt: 'How AI is changing the way we build websites in 2025.', content: 'Full content here...', read_time: '5 min read', tags: ['AI', 'Web Dev'] },
        { title: 'Mastering GoHighLevel', excerpt: 'Tips and tricks for advanced CRM automation.', content: 'Full content here...', read_time: '8 min read', tags: ['GHL', 'Automation'] },
      ]);

      // Seed Clients
      await supabase.from('clients').insert([
        { name: 'Google', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Meta', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
      ]);

      toast.success('Database seeded successfully!');
      fetchPortfolio();
    } catch (error: any) {
      toast.error('Seeding failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fixBackendIssues = async () => {
    setIsLoading(true);
    try {
      // 1. Storage
      const { data: buckets } = await supabase.storage.listBuckets();
      const portfolioBucket = buckets?.find(b => b.name === 'portfolio');
      if (!portfolioBucket) {
        await supabase.storage.createBucket('portfolio', { public: true });
        toast.info("Created missing 'portfolio' storage bucket.");
      }

      // 2. Check and Fix Table Columns (Critical for Profiles)
      const { error: profileError } = await supabase.from('profiles').select('hero_image_url').limit(1);
      if (profileError && profileError.code === '42703') {
        toast.warning("Profile table is missing modern columns. Please run the REPAIR SQL in your dashboard.");
      }

      // 3. Check tables
      const tables = ['profiles', 'projects', 'skills', 'services', 'experience', 'testimonials', 'blog_posts', 'clients', 'messages'];
      const missingTables = [];

      for (const table of tables) {
        const { error } = await supabase.from(table).select('id').limit(1);
        if (error && error.code === '42P01') {
          missingTables.push(table);
        }
      }

      if (missingTables.length > 0) {
        toast.warning(
          `Missing tables: ${missingTables.join(', ')}. Please run the SQL schema in your Supabase dashboard.`,
          { duration: 6000 }
        );
      } else {
        toast.success("All database tables are ready!");
      }
    } catch (err: any) {
      toast.error("Process failed: " + (err.message || String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    // ... (keep existing login UI)
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
    { id: 'services', label: 'Services', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'blog', label: 'Blog', icon: Mail },
    { id: 'clients', label: 'Clients', icon: Globe },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'setup', label: 'System Setup', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex dark text-white">
      {/* Sidebar - WordPress Style */}
      <aside className="w-72 border-r border-white/5 bg-[#0a0a0a] flex flex-col fixed inset-y-0 text-white">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-2xl font-black tracking-tighter text-white">ADMIN<span className="text-primary">.</span></h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[2px] mt-1">Portfolio Manager</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto custom-scrollbar">
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
                <p className="text-xs font-bold text-white">{profile?.full_name || 'Kamran Rasool'}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{profile?.title || 'Administrator'}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-black">
                {(profile?.full_name || 'KR').split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="p-12 max-w-6xl mx-auto relative">
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
              <Card className="w-full max-w-2xl bg-[#0a0a0a] border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-bold uppercase tracking-tight">Add New {activeTab}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)}><X className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="p-8 max-h-[80vh] overflow-y-auto">
                  <form onSubmit={activeTab === 'profile' ? handleUpdateProfile : handleAddItem} className="space-y-6">
                    {activeTab === 'profile' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                            <Input required value={newItemData.full_name || ''} onChange={e => setNewItemData({...newItemData, full_name: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Professional Title</label>
                            <Input required value={newItemData.title || ''} onChange={e => setNewItemData({...newItemData, title: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Personal Bio</label>
                          <Textarea required value={newItemData.bio || ''} onChange={e => setNewItemData({...newItemData, bio: e.target.value})} className="bg-white/5 border-white/10 min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Profile Image</label>
                            <div className="flex gap-2">
                              <Input value={newItemData.avatar_url || ''} onChange={e => setNewItemData({...newItemData, avatar_url: e.target.value})} className="bg-white/5 border-white/10" placeholder="/kamran_profile.png" />
                              <div className="relative">
                                <input type="file" accept="image/*" className="hidden" id="p-upload" onChange={(e) => handleFileUpload(e, 'avatar_url')} />
                                <Button type="button" variant="outline" className="h-8 border-white/10 px-3 hover:bg-white/5" onClick={() => document.getElementById('p-upload')?.click()}>
                                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-primary" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hero Background</label>
                            <div className="flex gap-2">
                              <Input value={newItemData.hero_image_url || ''} onChange={e => setNewItemData({...newItemData, hero_image_url: e.target.value})} className="bg-white/5 border-white/10" placeholder="https://..." />
                              <div className="relative">
                                <input type="file" accept="image/*" className="hidden" id="h-upload" onChange={(e) => handleFileUpload(e, 'hero_image_url')} />
                                <Button type="button" variant="outline" className="h-8 border-white/10 px-3 hover:bg-white/5" onClick={() => document.getElementById('h-upload')?.click()}>
                                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-primary" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">GitHub URL</label>
                            <Input value={newItemData.github_url || ''} onChange={e => setNewItemData({...newItemData, github_url: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">LinkedIn URL</label>
                            <Input value={newItemData.linkedin_url || ''} onChange={e => setNewItemData({...newItemData, linkedin_url: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                            <Input value={newItemData.email || ''} onChange={e => setNewItemData({...newItemData, email: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'projects' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                            <Input required value={newItemData.title || ''} onChange={e => setNewItemData({...newItemData, title: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                            <Input required value={newItemData.category || ''} onChange={e => setNewItemData({...newItemData, category: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                          <Input required value={newItemData.description || ''} onChange={e => setNewItemData({...newItemData, description: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project Image</label>
                          <div className="flex gap-2">
                            <Input value={newItemData.image_url || ''} onChange={e => setNewItemData({...newItemData, image_url: e.target.value})} className="bg-white/5 border-white/10" placeholder="https://..." />
                            <div className="relative">
                              <input type="file" accept="image/*" className="hidden" id="proj-upload" onChange={(e) => handleFileUpload(e, 'image_url')} />
                              <Button type="button" variant="outline" className="h-8 border-white/10 px-3 hover:bg-white/5" onClick={() => document.getElementById('proj-upload')?.click()}>
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-primary" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'skills' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skill Name</label>
                            <Input required value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Proficiency (%)</label>
                            <Input type="number" min="0" max="100" required value={newItemData.proficiency || ''} onChange={e => setNewItemData({...newItemData, proficiency: parseInt(e.target.value)})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                          <Input required value={newItemData.category || ''} onChange={e => setNewItemData({...newItemData, category: e.target.value})} className="bg-white/5 border-white/10" placeholder="Frontend, Backend, etc." />
                        </div>
                      </>
                    )}

                    {activeTab === 'services' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Title</label>
                          <Input required value={newItemData.title || ''} onChange={e => setNewItemData({...newItemData, title: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                          <Input required value={newItemData.description || ''} onChange={e => setNewItemData({...newItemData, description: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon Name (Lucide)</label>
                          <Input value={newItemData.icon_name || ''} onChange={e => setNewItemData({...newItemData, icon_name: e.target.value})} className="bg-white/5 border-white/10" placeholder="Code, Cpu, Globe, etc." />
                        </div>
                      </>
                    )}

                    {activeTab === 'experience' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</label>
                            <Input required value={newItemData.role || ''} onChange={e => setNewItemData({...newItemData, role: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Company</label>
                            <Input required value={newItemData.company || ''} onChange={e => setNewItemData({...newItemData, company: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Start Date</label>
                            <Input required value={newItemData.start_date || ''} onChange={e => setNewItemData({...newItemData, start_date: e.target.value})} className="bg-white/5 border-white/10" placeholder="Jan 2020" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">End Date</label>
                            <Input value={newItemData.end_date || ''} onChange={e => setNewItemData({...newItemData, end_date: e.target.value})} className="bg-white/5 border-white/10" placeholder="Present or Date" />
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'testimonials' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</label>
                            <Input required value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role/Company</label>
                            <Input required value={newItemData.role || ''} onChange={e => setNewItemData({...newItemData, role: e.target.value})} className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Testimonial Content</label>
                          <Input required value={newItemData.content || ''} onChange={e => setNewItemData({...newItemData, content: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                      </>
                    )}

                    {activeTab === 'clients' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</label>
                          <Input required value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Logo URL</label>
                          <div className="flex gap-2">
                            <Input required value={newItemData.logo_url || ''} onChange={e => setNewItemData({...newItemData, logo_url: e.target.value})} className="bg-white/5 border-white/10" placeholder="https://..." />
                            <div className="relative">
                              <input type="file" accept="image/*" className="hidden" id="client-upload" onChange={(e) => handleFileUpload(e, 'logo_url')} />
                              <Button type="button" variant="outline" className="h-8 border-white/10 px-3 hover:bg-white/5" onClick={() => document.getElementById('client-upload')?.click()}>
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-primary" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'blog' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Post Title</label>
                          <Input required value={newItemData.title || ''} onChange={e => setNewItemData({...newItemData, title: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Excerpt</label>
                          <Input required value={newItemData.excerpt || ''} onChange={e => setNewItemData({...newItemData, excerpt: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Featured Image</label>
                          <div className="flex gap-2">
                            <Input value={newItemData.image_url || ''} onChange={e => setNewItemData({...newItemData, image_url: e.target.value})} className="bg-white/5 border-white/10" placeholder="https://..." />
                            <div className="relative">
                              <input type="file" accept="image/*" className="hidden" id="blog-upload" onChange={(e) => handleFileUpload(e, 'image_url')} />
                              <Button type="button" variant="outline" className="h-8 border-white/10 px-3 hover:bg-white/5" onClick={() => document.getElementById('blog-upload')?.click()}>
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-primary" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                          <Input value={newItemData.category || ''} onChange={e => setNewItemData({...newItemData, category: e.target.value})} className="bg-white/5 border-white/10" />
                        </div>
                      </>
                    )}

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-1 btn-primary h-12 font-bold" disabled={isLoading}>
                        {isLoading ? 'SAVING...' : 'SAVE ITEM'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 h-12 border-white/10 hover:bg-white/5 font-bold">
                        CANCEL
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Total Projects</p>
                  <h3 className="text-5xl font-black text-white">{projects.length}</h3>
                </Card>
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Services Offered</p>
                  <h3 className="text-5xl font-black text-white">{services.length}</h3>
                </Card>
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Testimonials</p>
                  <h3 className="text-5xl font-black text-white">{testimonials.length}</h3>
                </Card>
                <Card className="bg-[#0a0a0a] border-white/5 p-8 space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[3px]">Blog Posts</p>
                  <h3 className="text-5xl font-black text-white">{blogPosts.length}</h3>
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
                  <Button 
                    variant="outline" 
                    className="h-20 border-white/5 hover:bg-white/5 flex flex-col gap-1 items-start p-6"
                    onClick={() => {
                      setActiveTab('projects');
                      setIsAddModalOpen(true);
                    }}
                  >
                    <span className="font-bold text-white">Add New Project</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Showcase your latest work</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 border-white/5 hover:bg-white/5 flex flex-col gap-1 items-start p-6"
                    onClick={() => {
                      setActiveTab('profile');
                      setNewItemData(profile || {});
                      setIsAddModalOpen(true);
                    }}
                  >
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
                <Button className="btn-primary gap-2 h-10 px-6" onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="h-4 w-4" /> ADD PROJECT
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id || project.title} className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
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
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete('projects', project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                <Button className="btn-primary gap-2 h-10 px-6" onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="h-4 w-4" /> ADD SKILL
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id || skill.name} className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {skill.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{skill.category} • {skill.proficiency}%</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all" onClick={() => handleDelete('skills', skill.id)}>
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
                <Button className="btn-primary gap-2 h-10 px-6" onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="h-4 w-4" /> ADD EXPERIENCE
                </Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id || exp.role} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] group relative">
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
                      <Button variant="ghost" size="icon" className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all" onClick={() => handleDelete('experience', exp.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black tracking-tighter">Manage Services</h2>
            <Button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Service</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service: any) => (
              <div key={service.id || service.title} className="card-premium p-8 flex justify-between items-start">
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted text-sm line-clamp-2">{service.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete('services', service.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'testimonials' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black tracking-tighter">Client Testimonials</h2>
            <Button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Testimonial</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t: any) => (
              <div key={t.id || t.name} className="card-premium p-8 space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => <Sparkles key={i} className="h-3 w-3 text-primary fill-primary" />)}
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete('testimonials', t.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <p className="text-muted italic">"{t.content}"</p>
                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role} @ {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'blog' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black tracking-tighter">Blog Posts</h2>
            <Button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>New Post</Button>
          </div>
          <div className="grid gap-6">
            {blogPosts.map((post: any) => (
              <div key={post.id || post.title} className="card-premium p-6 flex gap-8 items-center">
                <img src={post.image_url || 'https://picsum.photos/seed/blog/200/200'} className="h-24 w-40 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-muted text-sm line-clamp-1">{post.excerpt}</p>
                  <div className="flex gap-4 mt-2">
                    {post.tags?.map((tag: string) => <span key={tag} className="text-[10px] text-primary font-bold uppercase tracking-widest">#{tag}</span>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete('blog_posts', post.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black tracking-tighter">Client Logos</h2>
            <Button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Client</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clients.map((client: any) => (
              <div key={client.id || client.name} className="card-premium p-6 flex flex-col items-center gap-4 group relative">
                <img src={client.logo_url} className="h-8 w-auto grayscale group-hover:grayscale-0 transition-all" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{client.name}</p>
                <button 
                  onClick={() => handleDelete('clients', client.id)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <Card className="bg-[#0a0a0a] border-white/5">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-8">
            <CardTitle className="text-2xl font-bold">Profile Identity</CardTitle>
            <Button className="btn-primary gap-2 h-10 px-6 font-bold" onClick={() => {
              setNewItemData(profile || {});
              setIsAddModalOpen(true);
            }}>
              <Settings className="h-4 w-4" /> EDIT PROFILE
            </Button>
          </CardHeader>
          <CardContent className="pt-10">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative h-48 w-48 rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                  <img 
                    src={profile?.avatar_url || "/kamran_profile.png"} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran'; }}
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-6 text-white">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tighter">{profile?.full_name}</h2>
                  <p className="text-primary font-bold text-lg mt-1 uppercase tracking-widest">{profile?.title}</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-muted-foreground leading-relaxed italic">"{profile?.bio}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Email</p>
                    <p className="text-sm font-medium text-white">{profile?.email}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">GitHub</p>
                    <p className="text-sm font-medium text-white truncate">{profile?.github_url || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Hero Background
              </h3>
              <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                <img 
                  src={profile?.hero_image_url || 'https://picsum.photos/seed/abstract/800/800'} 
                  className="w-full h-full object-cover opacity-50" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-[10px] font-bold uppercase tracking-[4px] text-white/50">Current Hero Background</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'messages' && (
        <Card className="bg-[#0a0a0a] border-white/5">
          <CardHeader className="border-b border-white/5 pb-8 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Inbound Messages</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-primary/20 text-primary">{messages.filter(m => !m.read).length} UNREAD</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl">
                  <Mail className="h-8 w-8 mx-auto mb-4 opacity-20" />
                  <p>No messages received yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold",
                            msg.read ? "bg-white/5 text-muted-foreground" : "bg-primary/20 text-primary"
                          )}>
                            {(msg.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{msg.name || 'Anonymous'}</h4>
                            <p className="text-xs text-muted-foreground">{msg.email || 'No email'} • {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Just now'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8" onClick={() => handleDelete('messages', msg.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="pl-14">
                        <p className="text-sm font-bold text-primary mb-1">{msg.subject}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                        2. Execute <code>/supabase/schema.sql</code> first.<br/>
                        3. If you have an existing profiles table, execute the **Repair Script** below.
                      </p>
                      <div className="flex gap-4">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => {
                          const repairSql = "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hero_image_url TEXT;";
                          navigator.clipboard.writeText(repairSql);
                          toast.info("Repair SQL copied to clipboard");
                        }}>
                          COPY REPAIR SQL
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => {
                          navigator.clipboard.writeText("Check /supabase/schema.sql in the file explorer.");
                          toast.info("SQL path copied to clipboard");
                        }}>
                          COPY SCHEMA PATH
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Storage Configuration</h3>
                        <p className="text-sm text-muted-foreground">Setup the 'portfolio' bucket for image uploads.</p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-4">
                      <p className="text-sm text-muted-foreground">Apply these storage bucket policies in your Supabase SQL editor:</p>
                      <pre className="p-4 bg-[#0a0a0a] rounded-xl text-[10px] text-primary/80 font-mono overflow-x-auto border border-white/5">
{`-- 1. Create the bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true) ON CONFLICT (id) DO NOTHING;

-- 2. Create policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');`}
                      </pre>
                      <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold" onClick={() => {
                        const storageSql = `INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');`;
                        navigator.clipboard.writeText(storageSql);
                        toast.success("Storage SQL copied to clipboard");
                      }}>
                        COPY STORAGE SQL
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
                      <Button onClick={fixBackendIssues} disabled={isLoading} variant="outline" className="h-12 px-8 border-primary/20 text-primary hover:bg-primary/5 font-bold ml-4">
                        {isLoading ? 'FIXING...' : 'FIX ALL BACKEND ISSUES'}
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
