'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { ArrowUpDown, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteUser } from '@/features/users/api/users.actions';
import { useToast } from '@/components/ui/use-toast';
import type { IUser } from '../model/user.model';

export function roleVariant(role: string): BadgeVariant {
  switch (role) {
    case 'admin':
      return 'default';
    case 'moderator':
      return 'secondary';
    default:
      return 'outline';
  }
}

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'clerkId',
    header: 'Clerk ID',
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return <span className="font-mono text-xs">{v}</span>;
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'firstName',
    header: 'Nombre'
  },
  {
    accessorKey: 'lastName',
    header: 'Apellido'
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ getValue }) => {
      const role = getValue<string>();
      return (
        <Badge variant={roleVariant(role)} className="capitalize">
          {role}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const { dismiss } = useToast();

      const handleDelete = async () => {
        if (!confirm(`¿Eliminar al usuario ${user.email}?`)) return;
        const res = await deleteUser(user.id ?? user._id ?? '');
        if (res.success) {
          dismiss('delete-user');
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/users/${user.id ?? user._id}`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
