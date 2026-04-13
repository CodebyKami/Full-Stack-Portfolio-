import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface PortfolioState {
  profile: any;
  projects: any[];
  skills: any[];
  experience: any[];
  services: any[];
  testimonials: any[];
  blogPosts: any[];
  clients: any[];
  isLoading: boolean;
  fetchPortfolio: () => Promise<void>;
}

export const useStore = create<PortfolioState>((set) => ({
  profile: {
    full_name: 'Kamran Rasool',
    title: 'WordPress & Full-Stack Developer',
    bio: 'Expert in building high-performance websites using WordPress, GoHighLevel, and Squarespace. Specializing in custom themes, CRM automation, and full-stack solutions.',
    email: 'kamranrasool0045@gmail.com',
  },
  projects: [
    { title: 'E-Commerce Platform', category: 'Web', description: 'A full-featured online store built with React and Node.js.', tags: ['React', 'Node.js', 'Stripe'] },
    { title: 'CRM Automation', category: 'Automation', description: 'Custom GoHighLevel workflows for lead management.', tags: ['GHL', 'Zapier'] },
    { title: 'AI Chatbot', category: 'AI', description: 'Intelligent customer support agent integrated with WordPress.', tags: ['OpenAI', 'WordPress'] },
  ],
  skills: [
    { name: 'WordPress', proficiency: 98 },
    { name: 'GoHighLevel', proficiency: 95 },
    { name: 'React', proficiency: 90 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'Squarespace', proficiency: 92 },
  ],
  experience: [
    { role: 'Senior Web Developer', company: 'Freelance', start_date: '2020', end_date: 'Present', description: ['Delivered 150+ successful projects.', 'Specialized in WordPress and GHL.'] },
  ],
  services: [
    { title: 'WordPress Development', description: 'Custom themes and plugin development for high-performance sites.', icon_name: 'Code', order_index: 0 },
    { title: 'Full-Stack Solutions', description: 'End-to-end web applications built with modern technologies.', icon_name: 'Cpu', order_index: 1 },
    { title: 'CRM & Automation', description: 'Streamlining business processes with GHL and custom workflows.', icon_name: 'Globe', order_index: 2 },
  ],
  testimonials: [
    { name: 'Sarah Johnson', role: 'CEO', company: 'TechFlow', content: 'Kamran is a wizard with WordPress. He transformed our site into a lead-generating machine.', rating: 5 },
  ],
  blogPosts: [
    { title: 'Mastering WordPress in 2025', excerpt: 'The latest trends and tools for WordPress developers.', read_time: '5 min read', tags: ['WordPress', 'Web Dev'] },
  ],
  clients: [
    { name: 'Google', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  ],
  isLoading: false,
  fetchPortfolio: async () => {
    set({ isLoading: true });
    try {
      const [
        { data: profile },
        { data: projects },
        { data: skills },
        { data: experience },
        { data: services },
        { data: testimonials },
        { data: blogPosts },
        { data: clients }
      ] = await Promise.all([
        supabase.from('profiles').select('*').single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('proficiency', { ascending: false }),
        supabase.from('experience').select('*').order('start_date', { ascending: false }),
        supabase.from('services').select('*').order('order_index', { ascending: true }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('published_at', { ascending: false }),
        supabase.from('clients').select('*').order('created_at', { ascending: false })
      ]);

      set({ 
        profile: profile || {
          full_name: 'Kamran Rasool',
          title: 'WordPress & Full-Stack Developer',
          bio: 'Expert in building high-performance websites using WordPress, GoHighLevel, and Squarespace. Specializing in custom themes, CRM automation, and full-stack solutions.',
          email: 'kamranrasool0045@gmail.com',
        }, 
        projects: (projects && projects.length > 0) ? projects : [
          { title: 'E-Commerce Platform', category: 'Web', description: 'A full-featured online store built with React and Node.js.', tags: ['React', 'Node.js', 'Stripe'] },
          { title: 'CRM Automation', category: 'Automation', description: 'Custom GoHighLevel workflows for lead management.', tags: ['GHL', 'Zapier'] },
          { title: 'AI Chatbot', category: 'AI', description: 'Intelligent customer support agent integrated with WordPress.', tags: ['OpenAI', 'WordPress'] },
        ], 
        skills: (skills && skills.length > 0) ? skills : [
          { name: 'WordPress', proficiency: 98 },
          { name: 'GoHighLevel', proficiency: 95 },
          { name: 'React', proficiency: 90 },
          { name: 'Node.js', proficiency: 85 },
          { name: 'Squarespace', proficiency: 92 },
        ], 
        experience: (experience && experience.length > 0) ? experience : [
          { role: 'Senior Web Developer', company: 'Freelance', start_date: '2020', end_date: 'Present', description: ['Delivered 150+ successful projects.', 'Specialized in WordPress and GHL.'] },
        ], 
        services: (services && services.length > 0) ? services : [
          { title: 'WordPress Development', description: 'Custom themes and plugin development for high-performance sites.', icon_name: 'Code', order_index: 0 },
          { title: 'Full-Stack Solutions', description: 'End-to-end web applications built with modern technologies.', icon_name: 'Cpu', order_index: 1 },
          { title: 'CRM & Automation', description: 'Streamlining business processes with GHL and custom workflows.', icon_name: 'Globe', order_index: 2 },
        ],
        testimonials: (testimonials && testimonials.length > 0) ? testimonials : [
          { name: 'Sarah Johnson', role: 'CEO', company: 'TechFlow', content: 'Kamran is a wizard with WordPress. He transformed our site into a lead-generating machine.', rating: 5 },
        ],
        blogPosts: (blogPosts && blogPosts.length > 0) ? blogPosts : [
          { title: 'Mastering WordPress in 2025', excerpt: 'The latest trends and tools for WordPress developers.', read_time: '5 min read', tags: ['WordPress', 'Web Dev'] },
        ],
        clients: (clients && clients.length > 0) ? clients : [
          { name: 'Google', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        ]
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
