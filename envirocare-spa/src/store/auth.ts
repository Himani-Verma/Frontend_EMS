import { create } from 'zustand';

export type UserRole = 'admin' | 'ce' | 'sales' | null;

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clearRole: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}));
