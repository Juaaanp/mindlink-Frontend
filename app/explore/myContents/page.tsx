'use client';

import { useState } from 'react';
import ContentCard from '@/components/ContentComponents/ContentCard';
import { Content } from '@/types/Content';
import NavBarAuth from '@/components/NavBarAuth';
import Sidebar from '@/components/Sidebar';

// Datos simulados para los contenidos
const initialContents: Content[] = [
  {
    id: '1',
    title: 'Título del contenido 1',
    type: 'Apunte',
    body: 'Descripción breve del contenido 1...',
    authorName: 'Juan Pérez',
    imageUrl: '/fondoPrueba.jpg',
  },
  {
    id: '2',
    title: 'Título del contenido 2',
    type: 'Resumen',
    body: 'Descripción breve del contenido 2...',
    authorName: 'María López',
    imageUrl: '/fondoPrueba.jpg',
  },
  {
    id: '3',
    title: 'Título del contenido 3',
    type: 'Ejercicio',
    body: 'Descripción breve del contenido 3...',
    authorName: 'Carlos Ruiz',
    imageUrl: '/fondoPrueba.jpg',
  },
];

export default function MyContents() {

  const [selected, setSelected] = useState('Mis contenidos');
  const [contents, setContents] = useState<Content[]>(initialContents);
  const [searchQuery, setSearchQuery] = useState<String>('');

  const handleEdit = (updated: Content) => {
    setContents(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDelete = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (

    <main className="pt-16 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">

      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <Sidebar />

      {/* Sidebar */}
      <aside className="w-64 bg-[#23232b] p-6 flex flex-col gap-4 text-white min-h-screen">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎓</span>
            <span className="font-bold text-lg">mindlink</span>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Mis contenidos' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Mis contenidos</button>
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Solicitudes de ayuda' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Solicitudes de ayuda</button>
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Mis grupos de estudio' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Mis grupos de estudio</button>
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Mis chats' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Mis chats</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-[#18181b]">
        {/* Header con degradado */}
        <header className="w-full p-4 flex items-center justify-between rounded-b-2xl" style={{ background: 'linear-gradient(90deg, #23c6e6 0%, #7f53ac 100%)' }}>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">mindlink</span>
          </div>
          <div className="bg-white/20 rounded-full p-2">
            <span className="text-white text-2xl">👤</span>
          </div>
        </header>
        {/* Contenidos */}
        <section className="flex-1 flex flex-col items-start p-10 gap-6 bg-[#18181b]">
          <div className="flex flex-wrap gap-8">
            {contents.map(content => (
              <ContentCard
                key={content.id}
                content={content}
                editMode
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>
    </main>
  );
}