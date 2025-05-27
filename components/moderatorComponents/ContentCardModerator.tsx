'use client';
import React from 'react';
import { Content } from '@/types/Content';

interface Props {
  content: Content;
  onDelete: (id: string) => void;
}

export default function ModerationContentCard({ content, onDelete }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3b] rounded-2xl p-6 shadow-lg flex flex-col gap-6 w-full max-w-md mx-auto hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-cyan-300 tracking-tight">{content.title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300 font-medium">Type: {content.type}</p>
          <p className="text-sm text-gray-300 font-medium">Author: {content.authorName}</p>
          <p className="text-sm text-gray-300 font-medium">Body: {content.body}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-poppins text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          onClick={() => onDelete(content.id)}
        >
          Delete Content
        </button>
      </div>
    </div>
  );
}
