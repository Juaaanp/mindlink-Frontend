'use client';

import React from 'react';
import { Content } from '@/types/Content';

type ContentModalProps = {
  content: Content;
  onClose: () => void;
};

export default function ContentModal({ content, onClose }: ContentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1e1e1e] text-white rounded-xl p-6 max-w-md w-full relative shadow-lg">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl hover:text-gray-300"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-3">{content.title}</h2>

        {/* Imagen si existe */}
        {content.imageUrl && (
          <img
            src={content.imageUrl}
            alt={content.title}
            className="rounded mb-4 max-h-60 object-cover w-full"
          />
        )}

        {/* Detalles */}
        <div className="space-y-2 text-sm text-gray-300">
          <p><span className="font-semibold text-white">Topic:</span> {content.topic}</p>
          <p><span className="font-semibold text-white">Type:</span> {content.type}</p>
          <p><span className="font-semibold text-white">Author ID:</span> {content.authorName}</p>
        </div>
      </div>
    </div>
  );
}
