'use client';
import React, { useEffect, useState } from 'react';
import { Content } from '@/types/Content';
import api from '@/lib/api';
import ModerationContentCard from '@/components/moderatorComponents/ContentCardModerator';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contents.map(content => (
        <ModerationContentCard
          key={content.id}
          content={content}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
