import { getAuthUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await getAuthUser();

  if (user?.role !== 'admin') {
    return (
      <main className="ucl-gradient min-h-screen">
        <div className="container mx-auto py-12">
          <Card className="ucl-card">
            <CardHeader>
              <CardTitle>Acceso restringido</CardTitle>
            </CardHeader>
            <CardContent>
              Esta sección es exclusiva para administradores.
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="ucl-gradient min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold ucl-accent mb-6">Panel de administración</h1>
        <Card className="ucl-card">
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>Administra usuarios desde la sección de usuarios.</CardContent>
        </Card>
      </div>
    </main>
  );
}
