import { create } from 'zustand';
import { getMe, login as loginApi, signup as signupApi, logout } from '../api/authentication';

interface User {
  id: number;
  email: string;
  name: string;
  is_questionnaire_complete: boolean;
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
  // Note: Added forceRefresh so onboarding can force a UI update
  checkAuth: (forceRefresh?: boolean) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,       // Starts true so the app can show a spinner on first load
  isInitialized: false,
  error: null,

  loginStack: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await loginApi(userData);
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true
      });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.response?.data?.detail || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  signupStack: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await signupApi(userData);
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true
      });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.response?.data?.detail || 'Signup failed',
        isLoading: false
      });
      throw error;
    }
  },

  logoutStack: async () => {
    set({ isLoading: true, error: null });
    try {
      await logout();
      // Wipe the user state cleanly
      set({ user: null, isAuthenticated: false, isInitialized: true, isLoading: false });
    } catch (error: any) {
      set({
        error: typeof error === 'string' ? error : error.response?.data?.detail || 'Logout failed',
        isLoading: false
      });
      throw error;
    }
  },

  checkAuth: async (forceRefresh = false) => {
    if (get().isInitialized && !forceRefresh) return;

    set({ isLoading: true, error: null });
    try {
      const { data, status } = await getMe();
      console.log("getMe", data, status);
      if (status === 200) {
        set({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true
        });
      }
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true
        });
      } else {
        // It's a 500 error, Network Error, etc.
        // DO NOT log the user out! Just turn off the loading state.
        set({
          isLoading: false,
          isInitialized: true,
          error: "Unable to connect to the server."
        });
        console.error("Server connection issue during auth check:", error);
      }
    }
  },
}));

export default useAuthStore;