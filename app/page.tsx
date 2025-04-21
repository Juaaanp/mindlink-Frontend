'use client';

import { useRouter } from 'next/navigation';

import NavbarNoAuth from '@/components/NavBarNoAuth';

export default function Home() {

  const router = useRouter();

  const handleExplorarOnClick = (): void => {
    router.push('gordon.jpg')
  }

  return (
    <div>
      <NavbarNoAuth/>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenido a Mindlink</h1>
      <p className="text-lg md:text-xl text-center max-w-xl mb-6">
        Conecta, aprende y colabora con otros estudiantes en una plataforma diseñada para potenciar tu aprendizaje.
      </p>
      <button onClick = {handleExplorarOnClick} className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all">
        Explorar Contenido
      </button>
    </div>
    </div>
  );
}
