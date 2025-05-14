// components/CreateGroupModal.tsx
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const categories = [
  'Technology', 'Science', 'Art', 'Music',
  'Health', 'Education', 'Business', 'Travel',
];

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (group: { title: string; topic: string; description?: string }) => void;
}

export default function CreateGroupModal({ isOpen, onClose, onSubmit }: CreateGroupModalProps) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(categories[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, topic, description: description.trim() || undefined });
    onClose();
    setTitle('');
    setTopic(categories[0]);
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-gray-900 text-white p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Crear Grupo</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Categoría</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300">Descripción (opcional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-medium"
            >
              Crear
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
