'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';

interface CreateContentFormProps {
  onInterestSelect?: (interest: string) => void;
}

export default function CreateContentForm({ onInterestSelect }: CreateContentFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuth();

  const categories = ['Technology', 'Science', 'Art', 'Music', 'Health', 'Education', 'Business', 'Travel'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const contentData = {
      title,
      authorId: user.id.toString(),
      type,
      body: topic,
    };

    try {
      const response = await api.post('/contents', contentData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Content created successfully!");
        setTitle('');
        setType('');
        setTopic('');
        setImage(null);
        onInterestSelect?.(''); // limpiar selección
      } else {
        toast.error("Failed to create content.");
      }
    } catch (error: any) {
      toast.error("Error creating content.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-xl shadow-md max-w-md w-full ml-0 mr-auto flex flex-col space-y-4 font-poppins"
        style={{ maxWidth: '400px' }} // más compacto para que quede a la izquierda
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create New Content</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Radio buttons para 'type' con animación */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">Select a category:</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((option) => (
              <label
                key={option}
                className={`flex items-center space-x-2 cursor-pointer
                  rounded-md px-3 py-2
                  transition-transform duration-300 ease-in-out
                  ${
                    type === option
                      ? 'bg-cyan-600 scale-105 shadow-lg text-white'
                      : 'bg-[#222238] hover:bg-cyan-700 text-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={type === option}
                  onChange={(e) => {
                    setType(e.target.value);
                    onInterestSelect?.(e.target.value);
                  }}
                  className="accent-cyan-400 cursor-pointer"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Upload Image */}
        <div className="w-full">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-[#2a2a2a] hover:bg-cyan-700 text-white px-4 py-2 rounded-lg block text-center"
          >
            Upload Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />
          {image && (
            <p className="text-sm text-gray-400 mt-2">Selected: {image.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          style={{
            backgroundImage: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
          }}
        >
          Create Content
        </button>
      </form>
    </div>
  );
}
