import { create } from 'zustand';
import { getMe, login as loginApi, signup as signupApi, logout } from '../api/authentication';

interface User {
  id: number;
  email: string;
  name: string;
  // Add other user fields if necessary
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  loginStack: (userData: any) => Promise<void>;
  signupStack: (userData: any) => Promise<void>;
  logoutStack: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  error: null,

  loginStack: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await loginApi(userData);
      localStorage.setItem('isAuthenticated', 'true');
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true
      });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.detail || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  signupStack: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await signupApi(userData);
      localStorage.setItem('isAuthenticated', 'true');
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true
      });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.detail || 'Signup failed',
        isLoading: false
      });
      throw error;
    }
  },

  logoutStack: async () => {
    set({ isLoading: true, error: null });
    try {
      await logout();
      localStorage.removeItem('isAuthenticated');
      set({ user: null, isAuthenticated: false, isInitialized: true, isLoading: false });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.detail || 'Logout failed',
        isLoading: false
      });
      throw error;
    }
  },

  checkAuth: async () => {
    // If already initialized or check is in progress, skip
    if (get().isInitialized) return;

    set({ isInitialized: true, isLoading: true });
    try {
      const data = await getMe();
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      localStorage.removeItem('isAuthenticated');
    }
  },
}));

export default useAuthStore;
