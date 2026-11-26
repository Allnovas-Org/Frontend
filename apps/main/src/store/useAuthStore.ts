import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, logoutUser, toAuthUser } from '../services/auth.service';

let inFlightUserFetch: { token: string; promise: Promise<void> } | null = null;

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'Client' | 'Freelancer';
  avatar?: string;
  createdAt?: string;
  countryCode?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
}

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  tokenExpiresAt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, token: string, expiresAt?: string) => void;
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
      tokenExpiresAt: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user and token after login/signup
      setAuth: (user, token, expiresAt) => {
        localStorage.setItem('auth-token', token);
        if (expiresAt) {
          localStorage.setItem('auth-token-expires-at', expiresAt);
        } else {
          localStorage.removeItem('auth-token-expires-at');
        }
        set({
          user,
          token,
          tokenExpiresAt: expiresAt || null,
          isAuthenticated: true,
        });
      },

      // Fetch current user from API
      fetchUser: async () => {
        const token = get().token || localStorage.getItem('auth-token');
        const expiresAt =
          get().tokenExpiresAt || localStorage.getItem('auth-token-expires-at');

        if (!token) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }

        if (expiresAt && Date.parse(expiresAt) <= Date.now()) {
          get().clearAuth();
          return;
        }

        if (inFlightUserFetch?.token === token) {
          return inFlightUserFetch.promise;
        }

        set({ isLoading: true });

        const request = (async () => {
          try {
            const userData = await getCurrentUser(token);
            if (localStorage.getItem('auth-token') !== token) return;

            set({
              user: toAuthUser(userData),
              token,
              tokenExpiresAt: expiresAt,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            const failure = error as {
              response?: { status?: number };
              status?: number;
            };
            const status = failure.response?.status ?? failure.status;
            if (status === 401 || status === 403) {
              get().clearAuth();
            } else {
              set({ isLoading: false });
              throw error;
            }
          }
        })();
        inFlightUserFetch = { token, promise: request };

        try {
          await request;
        } finally {
          if (inFlightUserFetch?.promise === request) {
            inFlightUserFetch = null;
          }
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
          await logoutUser();
        } catch (error) {
          const failure = error as {
            response?: { status?: number };
            status?: number;
          };
          console.error('Logout request failed; local credentials were cleared.', {
            status: failure.response?.status ?? failure.status,
          });
        } finally {
          get().clearAuth();
        }
      },

      // Clear all auth data
      clearAuth: () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-token-expires-at');
        set({
          user: null,
          token: null,
          tokenExpiresAt: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: ({ user, token, tokenExpiresAt, isAuthenticated }) => ({
        user,
        token,
        tokenExpiresAt,
        isAuthenticated,
      }),
    }
  )
);