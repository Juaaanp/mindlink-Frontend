'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import Sidebar from "@/components/Sidebar";
import StudyGroupCard from "./StudyGroupCard";
import StudyGroupModal from "./StudyGroupModal";
import { StudyGroup } from "@/types/StudyGroup";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

//Formación de grupos de estudio automáticos con base en intereses compartidos. Formación automática de grupos de estudio.
//Generación automática de conexiones entre usuarios (grafo), si han valorado contenidos similares o han estado en el mismo grupo de estudio.
//Pestaña: Grupos de estudio sugeridos. Participar en grupos de estudio sugeridos automáticamente.
//LISTAS ENLAZADAS

export default function MyStudyGroups() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [groups, setGroups] = useState<StudyGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null); //Cuando esto no es null se abre el modal
    const { user } = useAuth();

    // Ejemplos de grupos (ahora con campo contents)
    const exampleGroups: StudyGroup[] = [
        {
            id: 1,
            topic: "Matemáticas Discretas",
            description: "Grupo para dudas, ejercicios y recursos de la materia.",
            students: [
                { id: 1, name: "Ana Ruiz", email: "ana@example.com" },
                { id: 2, name: "Carlos Pérez", email: "carlos@example.com" }, //Hacer dto asi y mandar desde el back, 
            ],
            contents: ["Apuntes Capítulo 1", "Ejercicios Semana 2"],
        },
        {
            id: 2,
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

    useEffect(() => {

        //Loader, funcionalidad de agregar contenidos, editarlos?, borrarlos?, agregar descripción
        if (!user?.id) return;
        api
            .get(`/studyGroups/findByStudent/${user.id}`)
            .then((res) => setGroups(res.data))
            .catch(console.error);
    }, [user?.id]);

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

                {/* Contenedor del grid alineado a la izquierda */}
                <div className="flex justify-start">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups
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
                                        membersCount={group.students?.length || 0}
                                        contentsCount={group.contents?.length || 0}
                                        description={group.description ? group.description : 'No description yet'}
                                        onJoin={() => openModal(group)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                {groups.length === 0 && (
                        <p className="text-gray-500 italic mt-8">No study groups found. Register correctly or you are not logged.</p>
                    )}
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
