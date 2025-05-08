'use client';

import { useState } from 'react';
import { Content } from '@/types/Content';
import { Valoration } from '@/types/Valoration';

interface Props {
  content: Content;
  onClose: () => void;
  onEdit: (updated: Content) => void;
  onDelete: (id: string) => void;
}

// Valoraciones simuladas (mock)
const mockValorations: Valoration[] = [
  { rate: 5, comment: 'Excelente contenido, muy útil.' },
  { rate: 4, comment: 'Me ayudó bastante, gracias.' },
  { rate: 3, comment: 'Está bien, pero podría mejorar.' },
];

export default function ContentEditModal({ content, onClose, onEdit, onDelete }: Props) {
  const [form, setForm] = useState({
    title: content.title,
    type: content.type,
    body: content.body,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({ ...content, ...form });
    onClose();
  };

  const handleDelete = () => {
    onDelete(content.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-[#1e1e1e] text-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Editar contenido</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Formulario de edición */}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1 min-w-[250px]">
            <div>
              <label className="block mb-1">Título</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Tipo</label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Descripción</label>
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                rows={4}
                required
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2873c6] to-[#7f53ac] px-6 py-2 rounded text-white font-semibold shadow hover:opacity-90 transition"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold transition"
              >
                Eliminar
              </button>
            </div>
          </form>
          {/* Valoraciones solo visualización */}
          <div className="flex-1 min-w-[250px] md:border-l md:border-gray-700 md:pl-8">
            <h3 className="text-xl font-semibold mb-4">Valoraciones</h3>
            {mockValorations.length === 0 ? (
              <p className="text-gray-400">Aún no hay valoraciones.</p>
            ) : (
              <div className="space-y-4">
                {mockValorations.map((rating, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="text-yellow-400 mr-2">
                        {'★'.repeat(rating.rate)}{'☆'.repeat(5 - rating.rate)}
                      </div>
                      <span className="text-sm text-gray-400">
                        Valoración {idx + 1}
                      </span>
                    </div>
                    <p>{rating.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 