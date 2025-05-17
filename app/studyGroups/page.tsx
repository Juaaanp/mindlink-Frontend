'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { StudyGroup } from "@/types/StudyGroup";
import StudyGroupCard from "../explore/myStudyGroups/StudyGroupCard";
import Sidebar from "@/components/Sidebar";
import StudyGroupModal from "../explore/myStudyGroups/StudyGroupModal";
import Loader from "@/components/Loader";

export default function StudyGroups() {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const { user } = useAuth();
    const [groups, setGroups] = useState<StudyGroup[]>([]); //Grupos desde el backend
    const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);  //Grupo seleccionado
    const [loader , setLoader] = useState(false);

    useEffect(() => {

        if (!user) return
        setLoader(true);

        api.get("/studyGroups/getAllDTOs")
            .then((res) => setGroups(res.data))
            .catch(console.error)
            .finally(() => setLoader(false));
    }, [user?.id]); //Se ejecutará cada vez que user.id cambie

    const openModal = (group: StudyGroup) => {
        setSelectedGroup(group);
    }

    const closeModal = () => {
        setSelectedGroup(null);
    };

    return (
        <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>

            <Sidebar />

            {loader && (<Loader/>)}

            <div className="flex justify-start">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(group => (
                        <div
                            key={group.id}
                            className="cursor-pointer"
                            onClick={() => openModal(group)} //setea el gruopo seleccionado para madarselo al modal
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

            {selectedGroup && (
                <StudyGroupModal
                group={selectedGroup}
                onClose={closeModal}
                />
            )}
        </main>
    ); //Revisar puntos de MyStudyGroups, seguir con StudyGroups
}