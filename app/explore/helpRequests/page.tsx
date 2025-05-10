'use client';

import NavBarAuth from "@/components/NavBarAuth";
import { useState } from "react";
import AddHelpRequestModal from "./AddHelpRequestModal";
import Sidebar from "@/components/Sidebar";

export default function HelpRequests() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const createdRequests = [
        {
            studentRequested: "Student123",
            studentRequester: "me",
            subject: "Math Help",
            type: "Doubt",
            body: "I need help with integrals.",
            priorityLevel: 2,
            state: "OPEN",
        },
    ];

    const respondedRequests = [
        {
            studentRequested: "Student999",
            studentRequester: "Student456",
            subject: "Physics Help",
            type: "Homework",
            body: "Can someone explain Newton's third law?",
            priorityLevel: 1,
            state: "RESOLVED",
        },
    ];

    return (

        <main className="pt-20 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">

            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Contenido Principal */}
                <div>
                    {/* Botón agregar solicitud */}
                    <div className="flex justify-end">
                        <button
                            className="bg-cyan-600 hover:bg-cyan-700 transition px-5 py-2 rounded-lg font-semibold"
                            onClick={() => setShowModal(true)}
                        >
                            + New Help Request
                        </button>
                    </div>

                    {/* Sección: Solicitudes que hice */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-cyan-400">Help Requests I Created</h2>
                        <div className="space-y-4">
                            {createdRequests.map((req, index) => (
                                <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg shadow-md border border-neutral-700">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-400">To: {req.studentRequested}</span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${req.state === "OPEN" ? "bg-green-600" : "bg-gray-600"
                                                }`}
                                        >
                                            {req.state}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{req.subject} ({req.type})</h3>
                                    <p className="text-sm text-gray-300 mt-2">{req.body}</p>
                                    <p className="text-xs mt-2 text-yellow-400">Priority: {req.priorityLevel}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección: Solicitudes que respondí */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-green-400">Help Requests I Responded</h2>
                        <div className="space-y-4">
                            {respondedRequests.map((req, index) => (
                                <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg shadow-md border border-neutral-700">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-400">From: {req.studentRequester}</span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${req.state === "RESOLVED" ? "bg-blue-600" : "bg-gray-600"
                                                }`}
                                        >
                                            {req.state}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{req.subject} ({req.type})</h3>
                                    <p className="text-sm text-gray-300 mt-2">{req.body}</p>
                                    <p className="text-xs mt-2 text-yellow-400">Priority: {req.priorityLevel}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Modal con la información detallada */}
                {showModal && <AddHelpRequestModal onClose={() => setShowModal(false)} />}
            </div>
        </main>
    );
}
