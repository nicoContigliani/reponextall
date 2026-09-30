'use client';

import { toast } from '@/store/toast';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast({ title: 'Copiado', description: 'Texto copiado al portapapeles', variant: 'success' });
    return true;
  } catch {
    toast({ title: 'Error', description: 'No se pudo copiar el texto', variant: 'destructive' });
    return false;
  }
}
