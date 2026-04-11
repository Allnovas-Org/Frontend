import { create } from 'zustand';

interface UIState {
  // Modals
  isSignupModalOpen: boolean;
  isSigninModalOpen: boolean;
  isSidebarOpen: boolean;
  
  // Actions
  openSignupModal: () => void;
  closeSignupModal: () => void;
  openSigninModal: () => void;
  closeSigninModal: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isSignupModalOpen: false,
  isSigninModalOpen: false,
  isSidebarOpen: false,
  
  // Modal actions
  openSignupModal: () => set({ isSignupModalOpen: true }),
  closeSignupModal: () => set({ isSignupModalOpen: false }),
  openSigninModal: () => set({ isSigninModalOpen: true }),
  closeSigninModal: () => set({ isSigninModalOpen: false }),
  
  // Sidebar actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openSidebar: () => set({ isSidebarOpen: true }),
}));