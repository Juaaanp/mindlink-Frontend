'use client';
import React from 'react';
import { Student } from '@/types/Student';

interface Props {
  student: Student;
  onDelete: (id: string) => void;
}

export default function UserCard({ student, onDelete }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-md flex flex-col gap-2 w-full">
      <h3 className="text-lg font-semibold">{student.name}</h3>
      <p className="text-sm text-gray-500">{student.email}</p>
      <div className="text-sm text-gray-700">
        Interests: {student.interests.join(', ') || 'Ninguno'}
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2 self-start font-poppins"
        onClick={() => onDelete(student.id)}
      >
        Delete User
      </button>
    </div>
  );
}