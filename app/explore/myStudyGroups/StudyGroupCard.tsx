// components/StudyGroupCard.tsx
'use client'

import { Users, FileText, BookOpen } from 'lucide-react';

interface StudyGroupCardProps {
  topic: string;
  membersCount: number;
  contentsCount: number;
  description?: string;
  onJoin?: () => void;
}

export default function StudyGroupCard({
  topic,
  membersCount,
  contentsCount,
  description,
  onJoin
}: StudyGroupCardProps) {
  return (
    <div
      className="
        bg-[#1e1e2f]
        text-white
        rounded-2xl
        shadow-lg
        p-6
        w-[300px]
        max-w-md
        cursor-pointer
        transform
        transition
        duration-200
        ease-in-out
        hover:scale-105
        hover:shadow-2xl
        hover:bg-[#27273f]
        flex
        flex-col
      "
      onClick={onJoin}
    >
      {/* Header */}
      <div className="flex items-center mb-4 gap-3">
        <BookOpen className="text-cyan-400" size={28} />
        <h2 className="text-xl font-semibold">{topic}</h2>
      </div>

      {/* Descripción */}
      {description && (
        <p className="text-sm text-gray-300 mb-4">
          {description}
        </p>
      )}

      {/* Badges de counts */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full">
          <Users size={16} className="text-cyan-400" />
          <span className="text-sm">Members: {membersCount}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full">
          <FileText size={16} className="text-cyan-400" />
          <span className="text-sm">Contents: {contentsCount}</span>
        </div>
      </div>

      {/* Spacer para empujar el botón abajo */}
      <div className="flex-1" />

      {/* Botón de unirse */}
      <button
        onClick={onJoin}
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-2
          w-full
          bg-cyan-600
          hover:bg-cyan-500
          transition
          duration-200
          ease-in-out
          text-white
          py-2
          px-4
          rounded-lg
          font-medium
        "
      >
        <Users size={18} />
        Ver contenido
      </button>
    </div>
  );
}
