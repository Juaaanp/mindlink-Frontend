'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';

export default function CreateContentForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const {user} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) {
      toast.error("User not logged in");
      return;
    }
  
    const contentData = {
      title: title,
      authorId: user.id.toString(),
      type: type,
      body: topic,
    };
  
    try {
      const response = await api.post('/contents', contentData);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Content created successfully!");
        console.log("Content created:", response.data);
        // limpiar formulario si quieres
        setTitle('');
        setType('');
        setTopic('');
        setImage(null);
      } else {
        console.warn("Unexpected response:", response);
        toast.error("Failed to create content.");
      }
    } catch (error: any) {
      console.error("Error creating content:", error);
      toast.error("Error creating content.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-xl shadow-md w-full max-w-md flex flex-col space-y-4 font-poppins"
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

        {/* Radio buttons para 'type' */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">Select a category:</label>
          <div className="grid grid-cols-2 gap-2">
            {['Technology', 'Science', 'Art', 'Music', 'Health', 'Education', 'Business', 'Travel'].map((option) => (
              <label key={option} className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={type === option}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-cyan-500"
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