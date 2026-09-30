import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <header className="ucl-card mb-6 flex items-center justify-between p-4">
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Inicio</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>
          <UserButton
            appearance={{
              elements: { avatarBox: 'h-9 w-9' }
            }}
          />
        </header>
        {children}
      </SignedIn>
      <SignedOut>
        <main className="ucl-gradient flex min-h-screen items-center justify-center">
          <Card className="ucl-card w-full max-w-md">
            <CardHeader>
              <CardTitle className="ucl-accent">Acceso restringido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Inicia sesión para continuar.
              </p>
              <Button asChild className="w-full ucl-neon-glow">
                <Link href="/sign-in">Iniciar sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </SignedOut>
    </>
  );
}