'use client';

import { useState } from 'react';
import NavBarAuth from '@/components/NavBarAuth';
import Image from 'next/image';

export default function ProfilePage() {
  const [username] = useState('John Doe');
  const [email] = useState('john.doe@example.com');
  const [role] = useState('Student');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins">
      {/* Barra de navegación fija */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth />
      </header>

      {/* Contenido con padding superior para evitar que quede tapado */}
      <main className="pt-24 px-6 flex flex-col items-center">
        {/* Imagen de perfil */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg">
            <Image
              src="/profile.png"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="text-3xl font-semibold">{username}</h2>
          <p className="text-gray-400">{email}</p>
          <span className="bg-cyan-600 text-sm px-4 py-1 rounded-full">{role}</span>
        </div>

        {/* Secciones */}
        <div className="mt-10 w-full max-w-2xl space-y-6">
          <Section title="My Contents">
            <p>You haven't created any content yet.</p>
          </Section>

          <Section title="Settings">
            <button className="bg-[#1e1e1e] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition w-full text-left">
              Change Password
            </button>
            <button className="bg-[#1e1e1e] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition w-full text-left mt-2">
              Notification Preferences
            </button>
          </Section>

          <Section title="Danger Zone">
            <button className="text-red-500 hover:underline">Logout</button>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">{title}</h3>
      {children}
    </div>
  );
}

