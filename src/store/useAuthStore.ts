import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, logoutUser } from '../services/auth.service';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'client' | 'freelancer';
  avatar?: string;
  createdAt?: string;
}

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user and token after login/signup
      setAuth: (user, token) => {
        localStorage.setItem('auth-token', token);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      // Fetch current user from API
      fetchUser: async () => {
        const token = get().token || localStorage.getItem('auth-token');

        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });

        try {
          const userData = await getCurrentUser();

          set({
            user: {
              id: userData.id,
              username: userData.username,
              firstName: userData.first_name,
              lastName: userData.last_name,
              email: userData.email,
              userType: get().user?.userType || 'freelancer', // Keep existing or default
              createdAt: userData.created_at,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to fetch user:', error);
          // If fetch fails (e.g., invalid token), clear auth
          localStorage.removeItem('auth-token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      // Update user profile
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      // Logout user
      logout: async () => {
        try {
          // Call logout API endpoint
          await logoutUser();
        } catch (error) {
          // Even if API call fails, still clear local data
          console.error('Logout API call failed:', error);
        } finally {
          // Always clear auth data locally
          localStorage.removeItem('auth-token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // Clear all auth data
      clearAuth: () => {
        localStorage.removeItem('auth-token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);