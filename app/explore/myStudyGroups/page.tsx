'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import Sidebar from "@/components/Sidebar";
import StudyGroupCard from "./StudyGroupCard";
import StudyGroupModal, { StudyGroup } from "./StudyGroupModal";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

//Formación de grupos de estudio automáticos con base en intereses compartidos. Formación automática de grupos de estudio.
//Generación automática de conexiones entre usuarios (grafo), si han valorado contenidos similares o han estado en el mismo grupo de estudio.
//Pestaña: Grupos de estudio sugeridos. Participar en grupos de estudio sugeridos automáticamente.
//Preguntar a jahnca que atributos de un study group

interface Student {
    id: number;
    name: string;
    email: string;
}

interface GroupDTO {
    title: string; topic: string; description?: string;
}

export default function MyStudyGroups() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null); //Cuando esto no es null se abre el modal
    const [isCreating, setIsCreating] = useState(false);

    // Ejemplos de grupos (ahora con campo contents)
    const exampleGroups: StudyGroup[] = [
        {
            id: 1,
            title: "Pepe",
            topic: "Matemáticas Discretas",
            description: "Grupo para dudas, ejercicios y recursos de la materia.",
            students: [
                { id: 1, name: "Ana Ruiz", email: "ana@example.com" },
                { id: 2, name: "Carlos Pérez", email: "carlos@example.com" },
            ],
            contents: ["Apuntes Capítulo 1", "Ejercicios Semana 2"],
        },
        {
            id: 2,
            title: "Frontend Team",
            topic: "Frontend Development",
            description: "Learn React, Tailwind, and more with peers.",
            students: [
                { id: 3, name: "Alice", email: "alice@example.com" },
                { id: 4, name: "Bob", email: "bob@example.com" },
                { id: 5, name: "Charlie", email: "charlie@example.com" },
            ],
            contents: ["Repo GitHub", "Guía de estilo", "Componentes base"],
        },
        // ...otros grupos
    ];

    const openModal = (group: StudyGroup) => {
        setSelectedGroup(group);
    };
    const closeModal = () => {
        setSelectedGroup(null);
    };
    const handleJoin = (group: StudyGroup) => {
        // Aquí iría tu lógica de "unirse al grupo"
        console.log("Uniéndose al grupo", group.id);
        closeModal();
    };

    const openCreate = () => setIsCreating(true);
    const closeCreate = () => setIsCreating(false);

    const handleCreateGroup = (group: GroupDTO) => {
    console.log('Nuevo grupo creado:', group);
    // Aquí puedes enviarlo al backend
  };

    return (
        <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins relative">
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>

            {/* Sidebar */}
            <Sidebar />

            {/* Contenido */}
            <div className="">

                {/* Título y botón de creación */}
                <div className="flex items-center justify-end mb-6">
                    <button
                        onClick={openCreate}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg transition"
                    >
                        Create Study Group
                    </button>
                    {isCreating && (<CreateGroupModal
                        isOpen={true}
                        onClose={closeCreate}
                        onSubmit={handleCreateGroup}
                    />)}
                    
                </div>

                {/* Contenedor del grid alineado a la izquierda */}
                <div className="flex justify-start">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exampleGroups
                            .filter(g =>
                                g.topic.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(group => (
                                <div
                                    key={group.id}
                                    className="cursor-pointer"
                                    onClick={() => openModal(group)}
                                >
                                    <StudyGroupCard
                                        topic={group.topic}
                                        membersCount={group.students.length}
                                        contentsCount={group.contents.length}
                                        description={group.description}
                                        onJoin={() => openModal(group)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Modal. Cuando selecciono un grupo */}
            {selectedGroup && (
                <StudyGroupModal
                    group={selectedGroup}
                    onClose={closeModal}
                    onJoin={() => handleJoin(selectedGroup)}
                />
            )}
        </main>
    );
}
