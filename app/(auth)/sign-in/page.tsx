import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Iniciar sesión | LlakaServices'
};

export default function SignInPage() {
  return (
    <main className="ucl-gradient flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
