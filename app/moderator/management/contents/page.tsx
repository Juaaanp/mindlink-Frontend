'use client';
import React, { useEffect, useState } from 'react';
import { Content } from '@/types/Content';
import api from '@/lib/api';
import ModerationContentCard from '@/components/moderatorComponents/ContentCardModerator';
import NavBarModerator from '../../NavBar';
import { FileText } from 'phosphor-react';

export default function ManageContents() {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await api.get<Content[]>('/contents/withAuthorName');
      setContents(response.data);
    };
    fetchContents();
  }, []);

  const handleDelete = async (id: string) => {
    await api.delete(`/contents/${id}`);
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-24 space-y-4 font-poppins">
      <NavBarModerator />
      <div className='flex'>
        <h1 className='text-3xl font-bold mb-4 mr-4'>Manage Contents</h1>
        <FileText size={35} />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {contents.map(content => (
          <ModerationContentCard
            key={content.id}
            content={content}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
