'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

//Formación de grupos de estudio automáticos con base en intereses compartidos.
//Generación automática de conexiones entre usuarios (grafo), si han valorado contenidos similares o han estado en el mismo grupo de estudio.
//Participar en grupos de estudio sugeridos automáticamente.
//Pestaña: Grupos de estudio sugeridos.
//Formación automática de grupos de estudio.

export default function MyStudyGroups() {

const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <main className="pt-16 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>

            <Sidebar/>

            <div className="">
                <h1>My Study Groups</h1>
            </div>
        </main>
    );  
}