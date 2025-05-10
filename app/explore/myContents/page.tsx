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

    <main className="pt-16 text-white p-6 font-poppins">

      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-[#18181b] h-[calc(100vh-4rem)]">

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