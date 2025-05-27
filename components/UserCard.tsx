'use client';
import React from 'react';
import { Student } from '@/types/Student';

interface Props {
  student: Student;
  onDelete: (id: string) => void;
}

export default function UserCard({ student, onDelete }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3b] rounded-2xl p-6 shadow-lg flex flex-col gap-4 w-full hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="text-xl font-bold text-cyan-300">{student.name}</h3>
      <p className="text-sm text-gray-400">{student.email}</p>
      <div className="text-sm text-purple-200">
        Interests: {student.interests.join(', ') || 'None'}
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg mt-3 self-start font-poppins text-sm font-medium transition-colors duration-200"
        onClick={() => onDelete(student.id)}
      >
        Delete User
      </button>
    </div>
  );
}