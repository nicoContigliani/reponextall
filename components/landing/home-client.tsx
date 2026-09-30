'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Loader2, Users, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 2]} className="absolute inset-0 z-0">
      <color attach="background" args={['#020b1e']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-2, -2, -2]} intensity={0.4} color="#00f0ff" />
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          distort={0.5}
          speed={1.5}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}

interface HomeClientProps {
  isSignedIn: boolean;
}

export default function HomeClient({ isSignedIn }: HomeClientProps) {
  return (
    <main className="ucl-gradient relative flex min-h-screen items-center justify-center overflow-hidden">
      <Scene />
      <Suspense
        fallback={
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-ucl-neon" />
          </div>
        }
      >
        <div className="relative z-10 container mx-auto px-4 py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-ucl-white ucl-accent drop-shadow-[0_0_8px_#0ff]">
              LlakaServices
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Plataforma de servicios impulsada por Server-Driven UI.
            </p>
          </header>

          {!isSignedIn ? (
            <section className="mb-12 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-ucl-neon">
                Accede a tu panel
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Inicia sesión o crea una cuenta para continuar.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg" className="ucl-neon-glow">
                  <Link href="/sign-in">Iniciar sesión</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-ucl-neon text-ucl-neon">
                  <Link href="/sign-up">Crear cuenta</Link>
                </Button>
              </div>
            </section>
          ) : (
            <section className="mb-12 text-center">
              <div className="mb-6 flex justify-center">
                <UserButton appearance={{ elements: { avatarBox: 'h-12 w-12' } }} />
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                ¿Qué deseas administrar hoy?
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild className="ucl-neon-glow">
                  <Link href="/users">Ver usuarios</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/services">Ver servicios</Link>
                </Button>
              </div>
            </section>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:max-w-2xl lg:mx-auto">
            <Card className="ucl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ucl-accent">
                  <Users className="h-5 w-5" />
                  Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Administra usuarios, roles y permisos.
                </p>
              </CardContent>
            </Card>

            <Card className="ucl-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ucl-accent">
                  <Layers className="h-5 w-5" />
                  Servicios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Catálogo de servicios disponibles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
