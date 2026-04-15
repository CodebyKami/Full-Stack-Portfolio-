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
    title: 'Web Developer | WordPress, GoHighLevel, Squarespace & Full-Stack Solutions',
    bio: 'I am a passionate Web Developer specializing in building high-performance websites and automated systems. With expertise in WordPress, GoHighLevel, and Squarespace, I bridge the gap between complex technical requirements and intuitive user interfaces.',
    email: 'kamranrasool0045@gmail.com',
  },
  projects: [
    { title: 'E-Commerce Solution', category: 'Web', description: 'Custom WordPress e-commerce platform with advanced product filtering and seamless checkout.', tags: ['WordPress', 'WooCommerce', 'PHP'] },
    { title: 'GHL Automation Suite', category: 'Automation', description: 'End-to-end CRM automation for lead generation and nurturing using GoHighLevel.', tags: ['GHL', 'Zapier', 'Automation'] },
    { title: 'SaaS Landing Page', category: 'Web', description: 'High-converting landing page built with Squarespace for a tech startup.', tags: ['Squarespace', 'CSS', 'Design'] },
    { title: 'Full-Stack Dashboard', category: 'Web', description: 'Custom React-based dashboard for real-time data monitoring and management.', tags: ['React', 'Node.js', 'PostgreSQL'] },
  ],
  skills: [
    { name: 'WordPress', proficiency: 98 },
    { name: 'GoHighLevel', proficiency: 95 },
    { name: 'Squarespace', proficiency: 92 },
    { name: 'React / Next.js', proficiency: 90 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'PHP / Laravel', proficiency: 88 },
    { name: 'UI/UX Design', proficiency: 85 },
  ],
  experience: [
    { role: 'Senior Web Developer', company: 'Freelance', start_date: '2020', end_date: 'Present', description: ['Specialized in WordPress, GoHighLevel, and Squarespace development.', 'Delivered 150+ successful projects for global clients.', 'Implemented complex CRM automations and custom full-stack solutions.'] },
    { role: 'Web Developer', company: 'Digital Agency', start_date: '2018', end_date: '2020', description: ['Developed custom themes and plugins for WordPress.', 'Managed client websites and ensured high performance and security.', 'Collaborated with design teams to create pixel-perfect interfaces.'] },
  ],
  services: [
    { title: 'WordPress Development', description: 'Custom themes, plugin development, and performance optimization for WordPress sites.', icon_name: 'Code', order_index: 0 },
    { title: 'GoHighLevel Setup', description: 'Complete CRM setup, funnel building, and automation workflows in GHL.', icon_name: 'Cpu', order_index: 1 },
    { title: 'Squarespace Design', description: 'Beautiful, responsive, and high-converting websites built on Squarespace.', icon_name: 'Globe', order_index: 2 },
  ],
  testimonials: [
    { name: 'Sarah Johnson', role: 'CEO', company: 'TechFlow', content: 'Kamran is a wizard with WordPress. He transformed our site into a lead-generating machine.', rating: 5 },
    { name: 'Michael Chen', role: 'Founder', company: 'GrowthScale', content: 'The GHL automation Kamran built saved us hundreds of hours. Highly recommended!', rating: 5 },
    { name: 'David Thompson', role: 'Marketing Director', company: 'DirectLink', content: 'Professional, responsive, and technically brilliant. Kamran delivered exactly what we needed.', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Creative Lead', company: 'StudioNine', content: 'Our Squarespace site looks incredible. Kamran has a great eye for design and detail.', rating: 5 },
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
