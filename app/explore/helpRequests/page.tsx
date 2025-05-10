'use client';

import NavBarAuth from '@/components/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import AddHelpRequestModal from './AddHelpRequestModal';
import { useState } from 'react';

type HelpRequest = {  //Hacer conexión con backend de los helpRequests (dejarlo funcional)
    id: string;
    student: string;
    subject: string;
    type: string;
    body: string;
    response?: string;
    priorityLevel: number;
    state: 'OPEN' | 'RESOLVED';
};

export default function HelpRequests() {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');

    const allRequests: HelpRequest[] = [
        {
            id: '1',
            student: 'Student123',
            subject: 'Math Help',
            type: 'Doubt',
            body: 'I need help with integrals.',
            priorityLevel: 2,
            state: 'OPEN',
        },
        {
            id: '2',
            student: 'Student456',
            subject: 'Physics Help',
            type: 'Homework',
            body: 'Can someone explain Newton’s third law?',
            response: 'Yes! It states that for every action, there is an equal and opposite reaction.',
            priorityLevel: 1,
            state: 'RESOLVED',
        },
        {
            id: '3',
            student: 'Student789',
            subject: 'Art Question',
            type: 'Project',
            body: 'How do I blend colors in digital art?',
            priorityLevel: 3,
            state: 'OPEN',
        },
    ];

    const filteredRequests = allRequests.filter((req) => {
        if (filter === 'ALL') return true;
        return req.state === filter;
    });

    return (
        <main className="pt-24 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth onSearchChange={setSearchQuery} />
            </header>

            <Sidebar />

            <div>
                {/* Botón agregar + filtros */}
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg border transition ${filter === 'ALL' ? 'bg-cyan-700 text-white' : 'bg-[#1a1a1a] border-gray-600 text-gray-300'
                                }`}
                            onClick={() => setFilter('ALL')}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg border transition ${filter === 'OPEN' ? 'bg-green-700 text-white' : 'bg-[#1a1a1a] border-gray-600 text-gray-300'
                                }`}
                            onClick={() => setFilter('OPEN')}
                        >
                            Open
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg border transition ${filter === 'RESOLVED' ? 'bg-blue-700 text-white' : 'bg-[#1a1a1a] border-gray-600 text-gray-300'
                                }`}
                            onClick={() => setFilter('RESOLVED')}
                        >
                            Resolved
                        </button>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-cyan-600 hover:bg-cyan-700 transition px-5 py-2 rounded-lg font-semibold"
                    >
                        + New Help Request
                    </button>
                </div>

                {/* Lista de solicitudes filtradas */}
                <section className="space-y-4">
                    {filteredRequests.map((req) => (
                        <div key={req.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-neutral-700 shadow-md">
                            <div className="flex justify-between mb-2">

                                <div className='flex '>
                                    <h3 className="text-lg font-semibold mr-3">{req.subject} </h3>
                                    <span className="bg-[#3b3b3b] px-3 py-1 rounded-full text-cyan-300 text-sm">
                                        {req.type}
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${req.state === 'OPEN' ? 'bg-green-600' : 'bg-blue-600'
                                        }`}
                                >
                                    {req.state}
                                </span>

                            </div>
                            <p className="text-sm mt-2 text-gray-300">{req.body}</p>
                            {req.state === 'RESOLVED' && (
                                <p className="text-sm mt-2 text-green-300">Response: {req.response}</p>
                            )}
                            <p className="text-xs mt-2 text-yellow-400">Priority: {req.priorityLevel}</p>
                        </div>
                    ))}

                    {filteredRequests.length === 0 && (
                        <p className="text-gray-500 italic mt-8">No help requests found for this filter.</p>
                    )}
                </section>
            </div>

            {showModal && <AddHelpRequestModal onClose={() => setShowModal(false)} />}
        </main>
    );
}
