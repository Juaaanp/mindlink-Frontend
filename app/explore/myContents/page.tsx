'use client';

import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentComponents/ContentCard';
import { Content } from '@/types/Content';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function MyContents() {
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    api.get(`/contents/findByIdStudent/${user.id}`) //Esto retorna los contenidos sin el nombre del autor
      .then((res) => setContents(res.data))
      .catch(console.error);
  }, [user?.id]);

  const handleEdit = (updated: Content) => {
    setContents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDelete = (id: string) => {
    setContents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-black font-poppins">
      {/* NavBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      {/* Layout */}
      <div className="pt-16 flex flex-row min-h-screen">
        <Sidebar />

        <div className="flex-1 px-8 py-10">

          <div className="flex flex-wrap gap-6 justify-start">
            {contents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                editMode
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

            {contents.length === 0 && (
              <p className="text-gray-500 italic">No hay contenidos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
