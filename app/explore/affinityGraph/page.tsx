// app/affinity/page.tsx   (o la ruta que prefieras)
'use client';

import { useAuth } from '@/context/AuthContext';
import StudentGraph from '@/components/StudentGraph';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function AffinityGraphPage() {
  const { user } = useAuth();        // user === null mientras se carga
  const studentId = user?.id;        // id del estudiante logueado
  const [searchQuery, setSearchQuery] = useState('');       

  if (!studentId) return <p>Loading...</p>;

  return (
    <div className="pt-20 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <Sidebar/>
      <h1 className="text-2xl font-bold mb-4">
        Affinity Graph – Student View
      </h1>

      {/* Pasamos el id al componente */}
      <StudentGraph studentId={studentId.toString()} />
    </div>
  );
}
