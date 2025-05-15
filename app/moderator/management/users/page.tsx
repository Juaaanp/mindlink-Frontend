'use client';
import React, { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import api from '@/lib/api';
import { Student } from '@/types/Student';

export default function ManageUsers() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await api.get<Student[]>('/students'); // Endpoint GET all
      setStudents(response.data);
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 space-y-4 font-poppins">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map(student => (
          <UserCard key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}