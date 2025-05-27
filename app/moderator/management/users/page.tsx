'use client';
import React, { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import api from '@/lib/api';
import { Student } from '@/types/Student';
import NavBarModerator from '../../NavBar';
import { Users } from 'phosphor-react'; 

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
    <div className="p-24 space-y-4 font-poppins">
      <NavBarModerator/>
      <div className= "flex">
        <h1 className="text-3xl font-bold mb-4 mr-4">Manage Users</h1>
        <Users size={35} className="mb-4"/>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map(student => (
          <UserCard key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}