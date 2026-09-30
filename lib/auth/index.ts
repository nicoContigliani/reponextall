import { auth, currentUser } from '@clerk/nextjs/server';
import type { AuthUser } from '@/types';

export async function getAuthUser(): Promise<AuthUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? '',
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    imageUrl: user.imageUrl,
    fullName: user.fullName ?? null,
    role: (user.publicMetadata?.role as string) ?? 'user'
  };
}

export async function requireAuthUser(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    const { redirect } = await import('next/navigation');
    redirect('/sign-in');
  }
  return user!;
}
