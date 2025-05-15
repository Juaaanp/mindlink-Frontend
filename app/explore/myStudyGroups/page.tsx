'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import Sidebar from "@/components/Sidebar";
import StudyGroupCard from "./StudyGroupCard";
import StudyGroupModal from "./StudyGroupModal";
import { StudyGroup } from "@/types/StudyGroup";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Loader from "@/components/Loader";

//Formación de grupos de estudio automáticos con base en intereses compartidos. Formación automática de grupos de estudio.
//Generación automática de conexiones entre usuarios (grafo), si han valorado contenidos similares o han estado en el mismo grupo de estudio.
//Pestaña: Grupos de estudio sugeridos. Participar en grupos de estudio sugeridos automáticamente.
//LISTAS ENLAZADAS
//Editar y eliminar contenidos?, actualizar la descripción y los contenidos reactivamente? 

export default function MyStudyGroups() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [groups, setGroups] = useState<StudyGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null); //Cuando esto no es null se abre el modal
    const { user } = useAuth();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }
        setLoader(true);
        if (!user?.id) return;
        api
            .get(`/studyGroups/findByStudent/${user.id}`)
            .then((res) => setGroups(res.data))
            .catch(console.error)
            .finally(() => setLoader(false));
    }, [user?.id]);

    const openModal = (group: StudyGroup) => {
        setSelectedGroup(group);
    };
    const closeModal = () => {
        setSelectedGroup(null);
    };
    const handleAddContent = (group: StudyGroup) => { //Con el grupo seleccionado
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

                {loader && (<><Loader/></>)}
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
                />
            )}
        </main>
    );
}
