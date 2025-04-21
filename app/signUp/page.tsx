import SignUpForm from '@/components/SignUpForm';
import NavbarNoAuth from '@/components/NavBarNoAuth';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
          {/* Barra de navegación */}
          <header className="fixed top-0 left-0 w-full z-10">
            <NavbarNoAuth/>
          </header>
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <SignUpForm />
    </main>
    </div>
  );
}
