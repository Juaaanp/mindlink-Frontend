'use client';

import { useState } from 'react';
import ContentCard from '@/components/ContentComponents/ContentCard';
import { Content } from '@/types/Content';
import Link from 'next/link';

// Mock data for contents
const initialContents: Content[] = [
  {
    id: '1',
    title: 'Content Title 1',
    type: 'Note',
    body: 'Brief description of content 1...',
    authorName: 'John Doe',
    imageUrl: '/fondoPrueba.jpg',
  },
  {
    id: '2',
    title: 'Content Title 2',
    type: 'Summary',
    body: 'Brief description of content 2...',
    authorName: 'Mary Smith',
    imageUrl: '/fondoPrueba.jpg',
  },
  {
    id: '3',
    title: 'Content Title 3',
    type: 'Exercise',
    body: 'Brief description of content 3...',
    authorName: 'Carl White',
    imageUrl: '/fondoPrueba.jpg',
  },
];

export default function MyContents() {
  const [selected, setSelected] = useState('My Contents');
  const [contents, setContents] = useState<Content[]>(initialContents);

  const handleEdit = (updated: Content) => {
    setContents(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDelete = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-[#18181b]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23232b] p-6 flex flex-col gap-4 text-white min-h-screen">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎓</span>
            <span className="font-bold text-lg">mindlink</span>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/explore/myContents" className={`text-left py-2 px-4 rounded transition ${selected === 'My Contents' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>
            My Contents
          </Link>
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Help Requests' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Help Requests</button>
          <button className={`text-left py-2 px-4 rounded transition ${selected === 'Study Groups' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>Study Groups</button>
          <Link href="/explore/myChats" className={`text-left py-2 px-4 rounded transition ${selected === 'My Chats' ? 'bg-[#313440]' : 'hover:bg-[#313440]'}`}>
            My Chats
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-[#18181b]">
        {/* Header with gradient */}
        <header className="w-full p-4 flex items-center justify-between rounded-b-2xl" style={{background: 'linear-gradient(90deg, #23c6e6 0%, #7f53ac 100%)'}}>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">mindlink</span>
          </div>
          <div className="bg-white/20 rounded-full p-2">
            <span className="text-white text-2xl">👤</span>
          </div>
        </header>
        {/* Contents */}
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
    </div>
  );
}