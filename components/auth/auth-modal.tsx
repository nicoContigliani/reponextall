'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignIn, SignUp } from '@clerk/nextjs';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: 'sign-in' | 'sign-up';
}

export function AuthModal({ open, onOpenChange, defaultMode = 'sign-in' }: AuthModalProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>(defaultMode);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6">
          <DialogTitle>
            {mode === 'sign-in' ? 'Iniciar sesión' : 'Crear cuenta'}
          </DialogTitle>
          <nav className="mt-2 flex justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setMode('sign-in')}
              className={
                mode === 'sign-in'
                  ? 'ucl-accent ucl-neon-glow rounded-md px-3 py-1 font-medium'
                  : 'text-muted-foreground rounded-md px-3 py-1'
              }
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => setMode('sign-up')}
              className={
                mode === 'sign-up'
                  ? 'ucl-accent ucl-neon-glow rounded-md px-3 py-1 font-medium'
                  : 'text-muted-foreground rounded-md px-3 py-1'
              }
            >
              Crear cuenta
            </button>
          </nav>
        </DialogHeader>
        <div className="p-6 pt-0">
          {mode === 'sign-in' ? <SignIn routing="hash" /> : <SignUp routing="hash" />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
