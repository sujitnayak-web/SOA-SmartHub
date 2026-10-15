import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

export const BRANCH_OPTIONS = [
  'Computer Science and Engineering',
  'CSE (Artificial Intelligence and Machine Learning)',
  'CSE (Data Science)',
  'CSE (Cyber Security)',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other'
];

export const ACADEMIC_YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
];

export interface SignUpParams {
  fullName: string;
  registrationNumber: string;
  academicYear: string;
  branch: string;
  email: string;
  password: string;
}

export const AuthService = {
  signUp: async ({ fullName, registrationNumber, academicYear, branch, email, password }: SignUpParams) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    
    // 1. Sign up with Supabase Auth and pass metadata for profile trigger
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          registration_number: registrationNumber,
          academic_year: academicYear,
          branch: branch
        }
      }
    });

    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  resetPassword: async (email: string) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if (error) throw error;
  },

  getSessionUser: async (): Promise<{ authUser: any; profile: UserProfile | null }> => {
    if (!supabase) return { authUser: null, profile: null };

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      return { authUser: null, profile: null };
    }

    const authUser = session.user;

    // Fetch profile from public.profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    let profile: UserProfile;

    if (profileError || !profileData) {
      // Fallback profile if trigger hasn't fired yet or table is missing in unmigrated environments
      profile = {
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
        email: authUser.email || '',
        studentId: authUser.user_metadata?.registration_number || 'SOA-2026-0000',
        department: authUser.user_metadata?.branch || 'Computer Science and Engineering',
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        notificationsEnabled: true,
        emailAlerts: true,
        theme: 'Light'
      };
    } else {
      profile = {
        name: profileData.full_name,
        email: authUser.email || '',
        studentId: profileData.registration_number,
        department: profileData.branch,
        role: profileData.role || 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        notificationsEnabled: true,
        emailAlerts: true,
        theme: 'Light'
      };
    }

    return { authUser, profile };
  },

  updateProfile: async (userId: string, updates: { fullName?: string; department?: string; academicYear?: string }) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const dbUpdates: any = {};
    if (updates.fullName) dbUpdates.full_name = updates.fullName;
    if (updates.department) dbUpdates.branch = updates.department;
    if (updates.academicYear) dbUpdates.academic_year = updates.academicYear;
    dbUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', userId)
      .select();

    if (error) throw error;
    return data;
  }
};

