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
    title: 'Senior Web Developer & Product Engineer',
    bio: 'Expert in building high-performance digital solutions using WordPress, GoHighLevel, and Squarespace. Specializing in custom themes, CRM automation, and full-stack architectures with 8+ years of engineering excellence.',
    email: 'kamranrasool0045@gmail.com',
  },
  projects: [
    { title: 'Enterprise E-Commerce', category: 'Web', description: 'A high-performance online store with advanced inventory management, custom checkout flows, and Stripe integration.', tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'] },
    { title: 'CRM Automation Suite', category: 'Automation', description: 'Custom GoHighLevel workflows and Zapier integrations that streamlined lead management for 50+ global clients.', tags: ['GHL', 'Zapier', 'API'] },
    { title: 'AI Support Engine', category: 'AI', description: 'Intelligent customer support agent powered by OpenAI, seamlessly integrated into WordPress ecosystems.', tags: ['OpenAI', 'WordPress', 'Python'] },
    { title: 'Real Estate Portal', category: 'Web', description: 'A pixel-perfect property listing site with custom search algorithms and interactive map features.', tags: ['Next.js', 'Tailwind', 'Mapbox'] },
  ],
  skills: [
    { name: 'WordPress', proficiency: 98 },
    { name: 'GoHighLevel', proficiency: 95 },
    { name: 'React / Next.js', proficiency: 92 },
    { name: 'Node.js', proficiency: 88 },
    { name: 'Squarespace', proficiency: 94 },
    { name: 'Python', proficiency: 85 },
    { name: 'AWS / DevOps', proficiency: 80 },
  ],
  experience: [
    { role: 'Senior Web Developer', company: 'Freelance / Consultant', start_date: '2020', end_date: 'Present', description: ['Delivered 150+ successful projects for clients in 20+ countries.', 'Specialized in high-conversion WordPress themes and complex GHL automations.', 'Architected scalable full-stack solutions for startups and enterprise clients.'] },
    { role: 'Full-Stack Developer', company: 'Tech Solutions Inc.', start_date: '2017', end_date: '2020', description: ['Developed custom CRM integrations and automated business workflows.', 'Led a team of 3 developers in building a proprietary SaaS dashboard.', 'Optimized database performance, reducing query times by 40%.'] },
  ],
  services: [
    { title: 'Premium WordPress', description: 'Custom-coded themes and plugins designed for speed, security, and conversion.', icon_name: 'Code', order_index: 0 },
    { title: 'Full-Stack Engineering', description: 'Scalable web applications built with modern frameworks like React, Next.js, and Node.js.', icon_name: 'Cpu', order_index: 1 },
    { title: 'CRM & Automation', description: 'Advanced GoHighLevel setups and custom API integrations to automate your sales funnel.', icon_name: 'Globe', order_index: 2 },
  ],
  testimonials: [
    { name: 'Sarah Johnson', role: 'CEO', company: 'InnovateX', content: 'Kamran is a wizard with WordPress. He transformed our site into a lead-generating machine with incredible speed.', rating: 5 },
    { name: 'Michael Chen', role: 'Operations Director', company: 'CloudScale', content: 'The GHL automation Kamran built saved us hundreds of hours. His technical depth is truly impressive.', rating: 5 },
  ],
  blogPosts: [
    { title: 'The Future of WordPress in 2025', excerpt: 'Exploring the shift towards headless architectures and AI integration in the WordPress ecosystem.', read_time: '6 min read', tags: ['WordPress', 'AI'] },
    { title: 'Scaling SaaS with Next.js', excerpt: 'Best practices for building maintainable and high-performance SaaS products.', read_time: '8 min read', tags: ['Next.js', 'SaaS'] },
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
          title: 'Senior Web Developer & Product Engineer',
          bio: 'Expert in building high-performance digital solutions using WordPress, GoHighLevel, and Squarespace. Specializing in custom themes, CRM automation, and full-stack architectures with 8+ years of engineering excellence.',
          email: 'kamranrasool0045@gmail.com',
        }, 
        projects: (projects && projects.length > 0) ? projects : [
          { title: 'Enterprise E-Commerce', category: 'Web', description: 'A high-performance online store with advanced inventory management, custom checkout flows, and Stripe integration.', tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'] },
          { title: 'CRM Automation Suite', category: 'Automation', description: 'Custom GoHighLevel workflows and Zapier integrations that streamlined lead management for 50+ global clients.', tags: ['GHL', 'Zapier', 'API'] },
          { title: 'AI Support Engine', category: 'AI', description: 'Intelligent customer support agent powered by OpenAI, seamlessly integrated into WordPress ecosystems.', tags: ['OpenAI', 'WordPress', 'Python'] },
          { title: 'Real Estate Portal', category: 'Web', description: 'A pixel-perfect property listing site with custom search algorithms and interactive map features.', tags: ['Next.js', 'Tailwind', 'Mapbox'] },
        ], 
        skills: (skills && skills.length > 0) ? skills : [
          { name: 'WordPress', proficiency: 98 },
          { name: 'GoHighLevel', proficiency: 95 },
          { name: 'React / Next.js', proficiency: 92 },
          { name: 'Node.js', proficiency: 88 },
          { name: 'Squarespace', proficiency: 94 },
          { name: 'Python', proficiency: 85 },
          { name: 'AWS / DevOps', proficiency: 80 },
        ], 
        experience: (experience && experience.length > 0) ? experience : [
          { role: 'Senior Web Developer', company: 'Freelance / Consultant', start_date: '2020', end_date: 'Present', description: ['Delivered 150+ successful projects for clients in 20+ countries.', 'Specialized in high-conversion WordPress themes and complex GHL automations.', 'Architected scalable full-stack solutions for startups and enterprise clients.'] },
          { role: 'Full-Stack Developer', company: 'Tech Solutions Inc.', start_date: '2017', end_date: '2020', description: ['Developed custom CRM integrations and automated business workflows.', 'Led a team of 3 developers in building a proprietary SaaS dashboard.', 'Optimized database performance, reducing query times by 40%.'] },
        ], 
        services: (services && services.length > 0) ? services : [
          { title: 'Premium WordPress', description: 'Custom-coded themes and plugins designed for speed, security, and conversion.', icon_name: 'Code', order_index: 0 },
          { title: 'Full-Stack Engineering', description: 'Scalable web applications built with modern frameworks like React, Next.js, and Node.js.', icon_name: 'Cpu', order_index: 1 },
          { title: 'CRM & Automation', description: 'Advanced GoHighLevel setups and custom API integrations to automate your sales funnel.', icon_name: 'Globe', order_index: 2 },
        ],
        testimonials: (testimonials && testimonials.length > 0) ? testimonials : [
          { name: 'Sarah Johnson', role: 'CEO', company: 'InnovateX', content: 'Kamran is a wizard with WordPress. He transformed our site into a lead-generating machine with incredible speed.', rating: 5 },
          { name: 'Michael Chen', role: 'Operations Director', company: 'CloudScale', content: 'The GHL automation Kamran built saved us hundreds of hours. His technical depth is truly impressive.', rating: 5 },
        ],
        blogPosts: (blogPosts && blogPosts.length > 0) ? blogPosts : [
          { title: 'The Future of WordPress in 2025', excerpt: 'Exploring the shift towards headless architectures and AI integration in the WordPress ecosystem.', read_time: '6 min read', tags: ['WordPress', 'AI'] },
          { title: 'Scaling SaaS with Next.js', excerpt: 'Best practices for building maintainable and high-performance SaaS products.', read_time: '8 min read', tags: ['Next.js', 'SaaS'] },
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
