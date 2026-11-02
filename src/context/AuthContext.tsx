import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole } from '../types';
import { INITIAL_USERS } from '../data/seedData';

interface AuthContextType {
  currentUser: UserProfile;
  role: UserRole;
  theme: 'light' | 'dark';
  sessionToken: string | null;
  allUsers: UserProfile[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: UserProfile }>;
  register: (payload: any) => Promise<{ success: boolean; error?: string; user?: UserProfile; message?: string }>;
  logout: () => Promise<void>;
  recoverPassword: (email: string) => Promise<{ success: boolean; error?: string; resetToken?: string; message?: string }>;
  resetPassword: (token: string, newPass: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  switchUserById: (userId: string) => Promise<void>;
  toggleTheme: () => void;
  isCrefitoApproved: boolean;
  refreshUsers: () => Promise<void>;
  updateUserProfile: (updated: Partial<UserProfile>) => Promise<boolean>;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return localStorage.getItem('reavita_auth_token') || 'sess_demo_patient';
  });

  const [currentUser, setCurrentUserState] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('reavita_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    return INITIAL_USERS[0]; // Mariana Silva (Patient)
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(INITIAL_USERS);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('reavita_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return currentUser.themePreference === 'dark' ? 'dark' : 'light';
  });

  // Apply theme class to document root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('reavita_theme', theme);
  }, [theme]);

  // Persist current user & token
  useEffect(() => {
    localStorage.setItem('reavita_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem('reavita_auth_token', sessionToken);
    } else {
      localStorage.removeItem('reavita_auth_token');
    }
  }, [sessionToken]);

  // Authenticated fetch helper
  const authFetch = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (sessionToken) {
      headers.set('Authorization', `Bearer ${sessionToken}`);
    }
    // Also include user ID for test consistency
    if (currentUser?.id) {
      headers.set('x-user-id', currentUser.id);
    }
    return fetch(url, { ...options, headers });
  }, [sessionToken, currentUser?.id]);

  // Check current session from server on boot
  useEffect(() => {
    async function verifySession() {
      if (!sessionToken) return;
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${sessionToken}`, 'x-user-id': currentUser.id }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) setCurrentUserState(data.user);
        }
      } catch (err) {
        console.warn('Session verification fallback:', err);
      }
    }
    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao efetuar login.' };
      }

      setCurrentUserState(data.user);
      setSessionToken(data.token);
      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro de conexão com o servidor.' };
    }
  };

  const register = async (payload: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao realizar cadastro.' };
      }

      setCurrentUserState(data.user);
      setSessionToken(data.token);
      return { success: true, user: data.user, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro de conexão.' };
    }
  };

  const logout = async () => {
    try {
      if (sessionToken) {
        await authFetch('/api/auth/logout', { method: 'POST' });
      }
    } catch (err) {
      console.warn('Logout notice:', err);
    } finally {
      setSessionToken(null);
      // Fallback to demo patient
      setCurrentUserState(INITIAL_USERS[0]);
    }
  };

  const recoverPassword = async (email: string) => {
    try {
      const res = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true, resetToken: data.resetToken, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (resetToken: string, newPassword: string) => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const switchUserById = async (userId: string) => {
    try {
      const res = await fetch('/api/auth/demo-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.user && data.token) {
        setCurrentUserState(data.user);
        setSessionToken(data.token);
        if (data.user.themePreference && data.user.themePreference !== 'system') {
          setTheme(data.user.themePreference as 'light' | 'dark');
        }
      }
    } catch (err) {
      const target = allUsers.find(u => u.id === userId);
      if (target) setCurrentUserState(target);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setCurrentUserState(prev => ({ ...prev, themePreference: nextTheme }));
    authFetch('/api/users/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ themePreference: nextTheme })
    }).catch(err => console.warn('Could not persist theme on server:', err));
  };

  const updateUserProfile = async (updated: Partial<UserProfile>): Promise<boolean> => {
    try {
      const res = await authFetch('/api/users/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUserState(data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Update profile error:', err);
      return false;
    }
  };

  const refreshUsers = async () => {
    // In strict security mode, only platform_admin can list all users
    try {
      const res = await authFetch('/api/admin/pending-physios');
      if (res.ok) {
        const data = await res.json();
        // admin refresh
      }
    } catch (err) {
      console.warn('Refresh users skipped:', err);
    }
  };

  const isCrefitoApproved = currentUser.role !== 'physiotherapist' || currentUser.crefito?.status === 'approved';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        theme,
        sessionToken,
        allUsers,
        login,
        register,
        logout,
        recoverPassword,
        resetPassword,
        switchUserById,
        toggleTheme,
        isCrefitoApproved,
        refreshUsers,
        updateUserProfile,
        authFetch
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
