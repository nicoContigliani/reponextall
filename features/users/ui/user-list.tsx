'use client';

import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { userColumns } from './columns';
import UserForm from './user-form';
import { useUIStore } from '@/store/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { IUser } from '../model/user.model';

interface UserListProps {
  users: IUser[];
}

export function UserList({ users }: UserListProps) {
  const isModalOpen = useUIStore((s) => s.isUserModalOpen);
  const openUserModal = useUIStore((s) => s.openUserModal);
  const closeUserModal = useUIStore((s) => s.closeUserModal);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ucl-accent">Usuarios</h1>
        <Dialog open={isModalOpen} onOpenChange={closeUserModal}>
          <DialogTrigger asChild>
            <Button onClick={() => openUserModal()} className="ucl-neon-glow">
              <Plus className="mr-2 h-4 w-4" /> Nuevo usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear usuario</DialogTitle>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </header>

      <DataTable
        columns={userColumns}
        data={users}
        searchableKey="email"
        placeholder="Buscar por email..."
        pageSize={10}
      />
    </div>
  );
}
