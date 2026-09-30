'use server';

import { revalidatePath, revalidateTag, unstable_noStore as noStore } from 'next/cache';
import { userService } from '../server/service';
import { UserSchema, type UserInput } from '@/lib/validations/schemas';
import type { IUser } from '../model/user.model';
import type { PaginatedResult } from '@/types';

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getUsers(): Promise<IUser[]> {
  noStore();
  return userService.list();
}

export async function getUsersPaginated(
  page = 1,
  pageSize = 10
): Promise<PaginatedResult<IUser>> {
  noStore();
  return userService.paginate(page, pageSize);
}

export async function getUserById(id: string): Promise<IUser | null> {
  noStore();
  return userService.get(id);
}

export async function createUser(
  _prev: ActionResult<IUser> | null,
  formData: FormData
): Promise<ActionResult<IUser>> {
  const raw = {
    clerkId: formData.get('clerkId'),
    email: formData.get('email'),
    firstName: formData.get('firstName') || undefined,
    lastName: formData.get('lastName') || undefined,
    role: formData.get('role') || 'user'
  };

  const parsed = UserSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    const created = await userService.create(parsed.data as UserInput);
    revalidatePath('/users');
    revalidateTag('users');
    return { success: true, data: created };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al crear usuario';
    return { success: false, error: message };
  }
}

export async function updateUser(
  id: string,
  _prev: ActionResult<IUser> | null,
  formData: FormData
): Promise<ActionResult<IUser>> {
  const raw = {
    clerkId: formData.get('clerkId'),
    email: formData.get('email'),
    firstName: formData.get('firstName') || undefined,
    lastName: formData.get('lastName') || undefined,
    role: formData.get('role') || 'user'
  };

  const parsed = UserSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    const updated = await userService.update(id, parsed.data as UserInput);
    if (!updated) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    revalidatePath('/users');
    revalidateTag('users');
    return { success: true, data: updated };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al actualizar usuario';
    return { success: false, error: message };
  }
}

export async function deleteUser(id: string): Promise<ActionResult<true>> {
  try {
    await userService.remove(id);
    revalidatePath('/users');
    revalidateTag('users');
    return { success: true, data: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
    return { success: false, error: message };
  }
}
