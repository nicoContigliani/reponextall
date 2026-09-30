import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Registrarse | LlakaServices'
};

export default function SignUpPage() {
  return (
    <main className="ucl-gradient flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignUp routing="hash" />
      </div>
    </main>
  );
}
