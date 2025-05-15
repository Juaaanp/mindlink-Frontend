'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import { useState } from "react";

export default function StudyGroups() {

    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>
            Hola
        </>
    ); //Revisar puntos de MyStudyGroups, validar createContent, seguir con StudyGroups
}