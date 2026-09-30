'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const supabase = createClient();

  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabaseBrowser = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useSupabaseBrowser must be used within Providers');
  }
  return ctx.supabase;
};
