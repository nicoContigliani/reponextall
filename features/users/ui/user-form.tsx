'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import { UserSchema, type UserInput } from '@/lib/validations/schemas';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createUser } from '@/features/users/api/users.actions';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function UserForm() {
  const { add } = useToast();

  const form = useForm<UserInput>({
    resolver: zodResolver(UserSchema) as Resolver<UserInput>,
    defaultValues: { clerkId: '', email: '', role: 'user' }
  });

  async function onSubmit(values: UserInput) {
    const formData = new FormData();
    formData.set('clerkId', values.clerkId);
    formData.set('email', values.email);
    if (values.firstName) formData.set('firstName', values.firstName);
    if (values.lastName) formData.set('lastName', values.lastName);
    formData.set('role', values.role);

    const res = await createUser(null, formData);
    if (res.success) {
      add({ title: 'Usuario creado', description: res.data?.email, variant: 'success' });
      form.reset();
    } else {
      add({ title: 'Error', description: res.error, variant: 'destructive' });
    }
  }

  return (
    <FormProvider {...form}>
      <Card className="ucl-card">
        <CardHeader>
          <CardTitle>Nuevo usuario</CardTitle>
        </CardHeader>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-4">
            <FormField
              name="clerkId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clerk ID</FormLabel>
                  <FormControl>
                    <Input placeholder="user_..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Usuario</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Limpiar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting} className="ucl-neon-glow">
              {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Guardar
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </FormProvider>
  );
}
