import { auth } from '@clerk/nextjs/server';
import HomeClient from '@/components/landing/home-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { userId } = await auth();

  return <HomeClient isSignedIn={Boolean(userId)} />;
}
