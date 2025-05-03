'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function CreateContentForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuth(); // <-- Aquí accedes al usuario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create content.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('topic', topic);
    formData.append('userId', user.id); // <-- Aquí agregas el id del usuario
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to create content');
      }

      console.log('Content created successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black p-6 rounded-xl shadow-md w-full max-w-md flex flex-col space-y-4 font-poppins mt-40">
      {/* ... tu formulario actual sin cambios ... */}
    </form>
  );
}




