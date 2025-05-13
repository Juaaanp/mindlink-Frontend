'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { HelpRequest } from '@/types/HelpRequest';
import NavBarModerator from '../../NavBar';
import {toast} from 'react-hot-toast';

export default function HelpRequestsModerator() { //hacer lo de la prioridad, cambiar prop del NavBar, extra: notificacion al usuario
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');
  const [responseInputs, setResponseInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    api
      .get('/helpRequests/findWithPriority')
      .then(res => setHelpRequests(res.data))
      .catch(console.error);
  };

  const handleResponseChange = (id: string, value: string) => {
    setResponseInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitResponse = async (req: HelpRequest) => {
    const responseText = responseInputs[req.id];
    if (!responseText?.trim()) {
      toast.error("Response input is empty");
      return;
    } 

    try {
      const updated = {
        ...req, //Copia los campos de la request
        response: responseText, //Y cambia estos campos
        state: 'RESOLVED',
      };

      await api.put(`/helpRequests/${req.id}`, updated);

      toast.success("Help request updated");

      setHelpRequests(prev =>
        prev.map(r => (r.id === req.id ? updated : r))
      ); //Remplaza la req actual por su versión actualizada
      setResponseInputs(prev => ({ ...prev, [req.id]: '' }));
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  const filtered = helpRequests.filter(req => {
    if (filter === 'ALL') return true;
    return req.state === filter;
  });

  return (
    <>
      <NavBarModerator />

      <main className="pt-24 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins">
        <h1 className="text-3xl font-bold mb-6">Manage Help Requests</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {['ALL', 'OPEN', 'RESOLVED'].map(state => (
            <button
              key={state}
              className={`px-4 py-2 rounded-lg border transition ${
                filter === state ? 'bg-cyan-600 text-white' : 'bg-[#1a1a1a] border-gray-600 text-gray-300'
              }`}
              onClick={() => setFilter(state as 'ALL' | 'OPEN' | 'RESOLVED')}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Request list */}
        <section className="space-y-4">
          {filtered.map(req => (
            <div
              key={req.id}
              className="bg-[#1a1a1a] p-4 rounded-lg border border-neutral-700 shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{req.subject}</h3>
                  <p className="text-sm text-gray-300">{req.body}</p>
                  <p className="text-xs text-yellow-400 mt-1">Priority: {req.priorityLevel}</p>
                  <p className="text-xs text-cyan-400">Student: {req.studentName}</p>

                  {req.state === 'RESOLVED' ? (
                    <p className="text-sm text-green-400 mt-2">
                      Response: {req.response}
                    </p>
                  ) : (
                    <div className="mt-4">
                      <textarea
                        placeholder="Write a response..."
                        value={responseInputs[req.id] || ''}
                        onChange={e => handleResponseChange(req.id, e.target.value)}
                        className="w-full p-2 text-sm bg-[#111] text-white border border-gray-600 rounded mb-2"
                        rows={3}
                      />
                      <button
                        onClick={() => handleSubmitResponse(req)}
                        className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700"
                      >
                        Submit Response
                      </button>
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    req.state === 'OPEN' ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                >
                  {req.state}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-500 italic mt-8">No help requests found.</p>
          )}
        </section>
      </main>
    </>
  );
}
