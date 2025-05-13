'use client';

import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import AddHelpRequestModal from './AddHelpRequestModal';
import { HelpRequest } from '@/types/HelpRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function HelpRequests() { //Funcionalidad extra: Que los requests se muestren en forma inversa
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');
    const { user } = useAuth();
    const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
    const [editingRequest, setEditingRequest] = useState<HelpRequest | null>(null);


    const handleRequestChange = (newOrUpdatedReq: HelpRequest) => { //Para cargar los requests al crear o editar uno
        setHelpRequests((prev) => {
            const exists = prev.some(req => req.id === newOrUpdatedReq.id);
            if (exists) {
                return prev.map(req => req.id === newOrUpdatedReq.id ? newOrUpdatedReq : req);
            } else {
                return [...prev, newOrUpdatedReq];
            }
        });
    };

    // Abrir modal en modo edición
    const handleEdit = (request: HelpRequest) => {
        setEditingRequest(request);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this help request?")) return;

        try {
            await api.delete(`/helpRequests/${id}`);
            setHelpRequests(prev => prev.filter(req => req.id !== id)); //Quita el request eliminado sin volver a hacer un llamado al backend
            toast.success("Help request deleted");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting request");
        }
    };

    useEffect(() => {
        if (!user?.id) return;

        api
            .get(`/helpRequests/findByStudent/${user.id}`)
            .then((res) => setHelpRequests(res.data))
            .catch(console.error);
    }, [user?.id]);

    const filteredRequests = helpRequests.filter((req) => {
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
                            {/* Botones Editar y Eliminar solo si está OPEN */}
                            {req.state === 'OPEN' && (
                                <div className="mt-3 flex gap-2 justify-end">
                                    <button
                                        onClick={() => handleEdit(req)}
                                        className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(req.id)}
                                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredRequests.length === 0 && (
                        <p className="text-gray-500 italic mt-8">No help requests found for this filter.</p>
                    )}
                </section>
            </div>

            {showModal && (
                <AddHelpRequestModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingRequest(null);
                    }}
                    existingRequest={editingRequest}
                    onUpdate={(newOrUpdatedReq) => {
                        handleRequestChange(newOrUpdatedReq);
                        setShowModal(false);
                        setEditingRequest(null);
                    }}
                />
            )}
        </main>
    );
}
