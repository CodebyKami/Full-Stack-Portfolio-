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
    title: 'Web Developer & Automation Specialist',
    bio: 'I am a Web Developer specializing in high-performance websites and automated systems using WordPress, GoHighLevel, and Squarespace.',
    email: 'kamranrasool0045@gmail.com',
    avatar_url: 'https://hhrjoxrdmckvdxhsuwce.supabase.co/storage/v1/object/public/portfolio/6f6c6b65-2f5b-43d2-b7dd-56a7a863a6ea/bgymm5.png',
    hero_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
  },
  projects: [],
  skills: [],
  experience: [],
  services: [],
  testimonials: [],
  blogPosts: [],
  clients: [],
  isLoading: false,
  fetchPortfolio: async () => {
    set({ isLoading: true });
    try {
      const fetchItem = async (table: string, options: any = {}) => {
        try {
          let query = supabase.from(table).select('*');
          if (options.single) {
            const { data, error } = await query.single();
            if (error) return null;
            return data;
          }
          if (options.order) {
            query = query.order(options.order.column, { ascending: options.order.ascending });
          }
          const { data, error } = await query;
          if (error) return [];
          return data;
        } catch (e) {
          console.error(`Error fetching ${table}:`, e);
          return options.single ? null : [];
        }
      };

      const [
        profile,
        projects,
        skills,
        experience,
        services,
        testimonials,
        blogPosts,
        clients
      ] = await Promise.all([
        fetchItem('profiles', { single: true }),
        fetchItem('projects', { order: { column: 'created_at', ascending: false } }),
        fetchItem('skills', { order: { column: 'proficiency', ascending: false } }),
        fetchItem('experience', { order: { column: 'start_date', ascending: false } }),
        fetchItem('services', { order: { column: 'order_index', ascending: true } }),
        fetchItem('testimonials', { order: { column: 'created_at', ascending: false } }),
        fetchItem('blog_posts', { order: { column: 'created_at', ascending: false } }),
        fetchItem('clients', { order: { column: 'created_at', ascending: false } })
      ]);

      const defaultProfile = {
        full_name: 'Kamran Rasool',
        title: 'Senior Web Developer & Product Engineer',
        bio: 'Expert in building high-performance digital solutions using WordPress, GoHighLevel, and Squarespace. Specializing in custom themes, CRM automation, and full-stack architectures with 8+ years of engineering excellence.',
        email: 'kamranrasool0045@gmail.com',
        avatar_url: 'https://hhrjoxrdmckvdxhsuwce.supabase.co/storage/v1/object/public/portfolio/6f6c6b65-2f5b-43d2-b7dd-56a7a863a6ea/bgymm5.png',
        hero_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
      };

      const profileData = profile || null;

      set({ 
        profile: profileData || defaultProfile, 
        projects: projects || [], 
        skills: skills || [], 
        experience: experience || [], 
        services: services || [],
        testimonials: testimonials || [],
        blogPosts: blogPosts || [],
        clients: clients || []
      });
    } catch (error) {
      console.error('Fatal error fetching portfolio data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
