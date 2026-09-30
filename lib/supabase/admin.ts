import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // ignore in non-interactive server contexts
          }
        }
      }
    }
  );
}

export async function uploadFile(
  key: string,
  file: File
): Promise<{ path: string; publicUrl: string }> {
  const supabase = await createAdminClient();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

  const { error } = await supabase.storage.from(bucket).upload(key, file, { upsert: true });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(key);

  return { path: key, publicUrl };
}

export async function deleteFile(key: string): Promise<void> {
  const supabase = await createAdminClient();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

  const { error } = await supabase.storage.from(bucket).remove([key]);

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

export async function getPublicUrl(key: string): Promise<string> {
  const supabase = await createAdminClient();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(key);
  return publicUrl;
}
