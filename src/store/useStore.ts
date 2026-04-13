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
  profile: null,
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
        profile: profile || null, 
        projects: projects || [], 
        skills: skills || [], 
        experience: experience || [], 
        services: services || [],
        testimonials: testimonials || [],
        blogPosts: blogPosts || [],
        clients: clients || []
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
