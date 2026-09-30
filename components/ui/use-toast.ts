'use client';

import { useEffect } from 'react';
import { useToastStore, toast } from '@/store/toast';
import type { Toast, ToastOptions } from '@/store/toast';

export { toast };
export type { Toast, ToastOptions };

export function useToast() {
  const { toasts, dismiss, remove, clear } = useToastStore();

  useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
    toasts.forEach((t) => {
      if (t.open) {
        timeouts.set(
          t.id,
          setTimeout(() => {
            useToastStore.getState().remove(t.id);
          }, t.duration ?? 4000)
        );
      }
    });
    return () => {
      timeouts.forEach((v) => clearTimeout(v));
    };
  }, [toasts, dismiss, remove]);

  return { toasts, add: toast, dismiss, remove, clear };
}
