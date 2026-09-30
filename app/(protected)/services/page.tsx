import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  return (
    <main className="ucl-gradient min-h-screen">
      <div className="container mx-auto py-8">
        <header className="mb-8 flex items-center gap-2">
          <Layers className="h-6 w-6 ucl-accent" />
          <h1 className="text-2xl font-bold ucl-accent">Servicios</h1>
        </header>
        <Card className="ucl-card">
          <CardHeader>
            <CardTitle>Catálogo próximamente</CardTitle>
          </CardHeader>
          <CardContent>La sección de servicios aún está en construcción.</CardContent>
        </Card>
      </div>
    </main>
  );
}
