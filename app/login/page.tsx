// app/login/page.tsx
'use client';

import LoginForm from '@/components/LoginForm';
import NavBarNoAuth from '@/components/NavBarNoAuth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Barra de navegación */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarNoAuth />
      </header>

      {/* Formulario */}
      <main className="flex-grow flex items-center justify-center pt-20">
        <LoginForm />
      </main>
    </div>
  );
}

