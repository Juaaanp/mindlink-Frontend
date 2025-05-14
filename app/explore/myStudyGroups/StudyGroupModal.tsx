// components/StudyGroupModal.tsx
'use client';

import { FC } from 'react';
import { X, UserCircle, BookOpen, FileText } from 'lucide-react';

export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface StudyGroup {
  id: number;
  title: string;
  topic: string;
  description?: string;
  students: Student[];
  contents: string[];
}

interface StudyGroupModalProps {
  group: StudyGroup;
  onClose: () => void;
  onJoin?: () => void;
}

const StudyGroupModal: FC<StudyGroupModalProps> = ({ group, onClose, onJoin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="relative bg-[#1e1e2f] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#23232b] px-6 py-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">{group.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-white">
          {/* Topic & Description */}
          <div>
            <h3 className="text-sm uppercase text-gray-400">Topic</h3>
            <p className="text-lg font-medium">{group.topic}</p>
          </div>
          {group.description && (
            <div>
              <h3 className="text-sm uppercase text-gray-400">Description</h3>
              <p className="text-gray-300">{group.description}</p>
            </div>
          )}

          {/* Students */}
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-2">Members ({group.students.length})</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.students.map((s) => (
                <li key={s.id} className="flex items-center gap-3 bg-[#2a2a3a] p-3 rounded-lg">
                  <UserCircle size={32} className="text-cyan-500" />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contents */}
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-2">Contents</h3>
            <ul className="space-y-2">
              {group.contents.map((c, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 bg-[#2a2a3a] p-3 rounded-lg hover:bg-[#33334a] transition"
                >
                  <FileText size={20} className="text-cyan-400" />
                  <span className="text-gray-200">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={onJoin}
              className="flex-1 text-center bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-medium transition"
            >
              Join Group
            </button>
            <button
              onClick={onClose}
              className="flex-1 text-center bg-transparent border border-gray-500 hover:border-gray-400 text-gray-300 py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupModal;
