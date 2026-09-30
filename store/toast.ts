import { create } from 'zustand';

export type ToastVariant = 'default' | 'success' | 'destructive' | 'warning';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Toast extends ToastOptions {
  id: string;
  open: boolean;
}

interface ToastState {
  toasts: Toast[];
  add: (toast: ToastOptions) => string;
  update: (id: string, toast: Partial<Toast>) => void;
  dismiss: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  add: (t) => {
    const id = `toast-${Date.now().toString(36)}`;
    set((s) => ({ toasts: [...s.toasts, { ...t, id, open: true }] }));
    return id;
  },
  update: (id, toast) =>
    set((s) => ({
      toasts: s.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t))
    })),
  dismiss: (id) =>
    set((s) => ({
      toasts: s.toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
    })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] })
}));

export function toast(opts: ToastOptions) {
  return useToastStore.getState().add(opts);
}
