import { Suspense } from 'react';
import { getUsers } from '@/features/users/api/users.actions';
import { UserList } from './ui/user-list';
import { Skeleton } from '@/components/ui/skeleton';
import type { IUser } from './model/user.model';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="ucl-gradient min-h-screen">
      <div className="container mx-auto py-8">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <UserList users={users} />
        </Suspense>
      </div>
    </main>
  );
}
