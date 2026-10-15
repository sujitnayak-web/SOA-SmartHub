import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { AuthService, SignUpParams } from '../services/authService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  currentUser: UserProfile | null;
  authUser: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<any>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSessionAndProfile = async () => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Auth is disabled.');
      setIsLoading(false);
      return;
    }

    try {
      const { authUser: sessionAuthUser, profile } = await AuthService.getSessionUser();
      setAuthUser(sessionAuthUser);
      setCurrentUser(profile);
    } catch (err) {
      console.error('Error restoring Supabase session:', err);
      setAuthUser(null);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial session check
    fetchSessionAndProfile();

    // Listen for Supabase Auth state changes
    if (!isSupabaseConfigured) return;
    
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (_event, _session) => {
      await fetchSessionAndProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthService.signIn(email, password);
      await fetchSessionAndProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (params: SignUpParams) => {
    setIsLoading(true);
    try {
      const data = await AuthService.signUp(params);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AuthService.signOut();
      setAuthUser(null);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchSessionAndProfile();
  };

  const isAuthenticated = !!authUser;
  const isAdmin = currentUser?.role === 'Administrator';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authUser,
        isLoading,
        isAuthenticated,
        isAdmin,
        signIn,
        signUp,
        signOut,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
