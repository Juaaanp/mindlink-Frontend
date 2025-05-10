'use client';

import NavBarAuth from "@/components/NavBarAuth";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function MyStudyGroups() {

const [searchQuery, setSearchQuery] = useState<string>("");
const [pinned, setPinned] = useState(false);

    return (
        <main className="pt-24 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
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