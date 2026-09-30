import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface UIState {
  isUserModalOpen: boolean;
  selectedUserId: string | null;
  isDrawerOpen: boolean;
  toggleUserModal: () => void;
  openUserModal: (id?: string) => void;
  closeUserModal: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector((set) => ({
    isUserModalOpen: false,
    selectedUserId: null,
    isDrawerOpen: false,
    toggleUserModal: () => set((s) => ({ isUserModalOpen: !s.isUserModalOpen })),
    openUserModal: (id) => set({ isUserModalOpen: true, selectedUserId: id ?? null }),
    closeUserModal: () => set({ isUserModalOpen: false, selectedUserId: null }),
    toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false })
  }))
);
