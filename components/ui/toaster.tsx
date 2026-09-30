'use client';

import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToastStore, type Toast } from '@/store/toast';
import { cn } from '@/lib/utils';

const iconMap = {
  default: Info,
  success: CheckCircle,
  destructive: AlertTriangle,
  warning: AlertTriangle
};

const variantClasses = {
  default: 'border-secondary',
  success: 'border-green-600 bg-green-50/10',
  destructive: 'border-destructive bg-destructive/10',
  warning: 'border-yellow-600 bg-yellow-50/10'
};

export function Toaster() {
  const { toasts, remove } = useToastStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast: Toast) => {
        const Icon = iconMap[toast.variant ?? 'default'];
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto relative flex w-96 items-start gap-3 rounded-md border p-4 text-sm shadow-lg transition-all',
              variantClasses[toast.variant ?? 'default'],
              !toast.open && 'translate-x-full opacity-0'
            )}
          >
            <Icon className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              {toast.title && <div className="font-medium">{toast.title}</div>}
              {toast.description && (
                <div className="text-muted-foreground">{toast.description}</div>
              )}
            </div>
            {toast.action && (
              <button
                onClick={() => {
                  toast.action!.onClick();
                  remove(toast.id);
                }}
                className="ml-2 rounded border border-primary px-2 py-0.5 text-xs hover:bg-primary/10"
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => remove(toast.id)}
              className="absolute right-2 top-2 rounded p-0.5 opacity-60 hover:opacity-100"
              aria-label="Cerrar"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
