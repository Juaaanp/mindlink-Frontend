import SignUpForm from '@/components/SignUpForm';
import NavbarNoAuth from '@/components/NavBarNoAuth';


export default function SignUpPage() {

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Barra de navegación */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavbarNoAuth />
      </header>

      <main className="flex min-h-screen bg-[#0a0a0a]">
        {/* Imagen con texto superpuesto */}
        <div className="w-1/2 relative flex items-center justify-center">
          <img
            src="/img.png"
            alt="signUp"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 p-8 text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 font-poppins font-bold">Sign Up!</h1>
            <p className="text-lg text-xl font-poppins mt-10">
              Welcome to MindLink! 🎓 We're excited for you to be a part of our learning community. Here you can explore a variety of educational courses designed to help you reach your goals.
            </p>
            <p className="text-lg font-poppins mt-20">Your knowledge journey begins here! 🌟</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="w-1/2 flex items-center justify-center">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}


