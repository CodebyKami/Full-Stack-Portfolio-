import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface PortfolioState {
  profile: any;
  projects: any[];
  skills: any[];
  experience: any[];
  testimonials: any[];
  isLoading: boolean;
  fetchPortfolio: () => Promise<void>;
}

export const useStore = create<PortfolioState>((set) => ({
  profile: null,
  projects: [],
  skills: [],
  experience: [],
  testimonials: [],
  isLoading: false,
  fetchPortfolio: async () => {
    set({ isLoading: true });
    try {
      const [
        { data: profile },
        { data: projects },
        { data: skills },
        { data: experience },
        { data: testimonials }
      ] = await Promise.all([
        supabase.from('profiles').select('*').single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('proficiency', { ascending: false }),
        supabase.from('experience').select('*').order('start_date', { ascending: false }),
        supabase.from('testimonials').select('*')
      ]);

      set({ 
        profile: profile || null, 
        projects: projects || [], 
        skills: skills || [], 
        experience: experience || [], 
        testimonials: testimonials || [] 
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
