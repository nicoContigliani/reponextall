import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export const UserSchema = z.object({
  _id: z.string().optional(),
  clerkId: z.string().min(1, 'clerkId es requerido'),
  email: z.string().email('Email inválido'),
  firstName: z.string().min(1, 'Nombre es requerido').optional(),
  lastName: z.string().min(1, 'Apellido es requerido').optional(),
  role: z.enum(['user', 'admin', 'moderator'])
});

export type SignInInput = z.infer<typeof SignInSchema>;
export type UserInput = z.infer<typeof UserSchema>;
