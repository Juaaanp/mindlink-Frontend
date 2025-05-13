// components/StudyGroupCard.tsx
'use client'

import { Users, BookOpen } from 'lucide-react';

interface StudyGroupCardProps {
  topic: string;
  students: string[];
  description?: string; 
  onJoin?: () => void;
}

export default function StudyGroupCard({ topic, students, description, onJoin }: StudyGroupCardProps) {

  return (
    <div className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-6 w-full max-w-md transition hover:shadow-xl">
      <div className="flex items-center mb-4 gap-3">
        <BookOpen className="text-cyan-400" size={28} />
        <h2 className="text-xl font-semibold">{topic}</h2>
      </div>

      {description && <p className="text-sm text-gray-300 mb-4">{description}</p>}

      <div className="mb-4">
        <h3 className="text-sm text-gray-400 uppercase mb-1">Members ({students.length})</h3>
        <ul className="text-sm space-y-1">
          {students.map((name, idx) => (
            <li key={idx} className="text-gray-200">• {name}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onJoin}
        className="mt-4 flex items-center justify-center gap-2 w-full bg-cyan-600 hover:bg-cyan-500 transition text-white py-2 px-4 rounded-lg font-medium"
      >
        <Users size={18} />
        Join Group
      </button>
    </div>
  );
}
