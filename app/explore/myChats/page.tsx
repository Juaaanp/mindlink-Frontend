'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Chat, Message } from '@/types/Chat';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function MyChatsPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newParticipantId, setNewParticipantId] = useState('');

  // Cargar chats del usuario autenticado
  useEffect(() => {
    if (!user?.id) return;
    api.get(`/chats/participant/${user.id}`).then(res => setChats(res.data));
  }, [user?.id]);

  // Cargar mensajes del chat seleccionado
  useEffect(() => {
    if (selectedChat) {
      api.get(`/messages/byChat/${selectedChat.id}`).then(res => setMessages(res.data));
    }
  }, [selectedChat]);

  // Auto-refresh de mensajes cada 2 segundos
  useEffect(() => {
    if (!selectedChat) return;
    const interval = setInterval(() => {
      api.get(`/messages/byChat/${selectedChat.id}`).then(res => setMessages(res.data));
    }, 2000); // cada 2 segundos

    return () => clearInterval(interval);
  }, [selectedChat]);

  // Enviar mensaje
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat || !user?.id) return;
    await api.post('/messages', {
      chatId: selectedChat.id,
      senderId: user.id,
      text: input,
      timestamp: new Date().toISOString(),
    });
    setInput('');
    api.get(`/messages/byChat/${selectedChat.id}`).then(res => setMessages(res.data));
  };

  // Crear nuevo chat (modificado para evitar duplicados)
  const createChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !newParticipantId.trim()) return;

    // Buscar si ya existe un chat con esos participantes
    const res = await api.get(`/chats/participant/${user.id}`);
    const existingChat = res.data.find((chat: Chat) =>
      chat.participantIds.includes(newParticipantId.trim()) &&
      chat.participantIds.length === 2
    );

    if (existingChat) {
      setSelectedChat(existingChat);
      setNewParticipantId('');
      return;
    }

    // Si no existe, crear uno nuevo
    const createRes = await api.post('/chats', {
      participantIds: [user.id, newParticipantId.trim()],
    });
    setChats([...chats, createRes.data]);
    setSelectedChat(createRes.data);
    setNewParticipantId('');
  };

  if (!user) {
    return <div className="flex-1 flex items-center justify-center text-gray-400">Cargando usuario...</div>;
  }

  return (
    <>
      {/* Navbar fijo */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      {/* Contenedor principal con padding top por el navbar */}
      <main className="pt-16 min-h-screen bg-[#0a0a0a] text-white font-poppins flex transition-all duration-300">
        {/* Sidebar a la izquierda */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex flex-1">
          <div className="flex flex-col w-72 bg-[#18181b] border-r border-[#313440]">
            {/* Formulario para crear chat */}
            <form onSubmit={createChat} className="flex gap-2 p-4 bg-[#18181b] border-b border-[#313440]">
              <input
                className="flex-1 bg-[#23232b] text-white rounded-lg px-4 py-2 outline-none border border-[#313440]"
                type="text"
                placeholder="ID del otro usuario para chatear"
                value={newParticipantId}
                onChange={e => setNewParticipantId(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2873c6] to-[#7f53ac] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Crear chat
              </button>
            </form>
            {/* Lista de chats */}
            <h3 className="text-lg font-semibold px-6 py-4 border-b border-[#313440]">Mis chats</h3>
            <ul className="flex-1 overflow-y-auto">
              {chats.map(chat => (
                <li
                  key={chat.id}
                  className={`px-6 py-4 cursor-pointer hover:bg-[#23232b] transition ${
                    selectedChat?.id === chat.id ? 'bg-[#23232b] font-bold' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  Chat con: {chat.participantIds.filter(id => String(id) !== String(user?.id)).join(', ')}
                </li>
              ))}
            </ul>
          </div>

          {/* Área de mensajes */}
          <section className="flex-1 flex flex-col justify-between bg-[#23232b]">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`max-w-md px-6 py-3 rounded-2xl text-white font-medium shadow-md ${
                    String(msg.senderId) === String(user?.id)
                      ? 'self-end bg-gradient-to-l from-[#7f53ac] to-[#2873c6]'
                      : 'self-start bg-gradient-to-r from-[#2873c6] to-[#7f53ac]'
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
            {/* Input de mensaje */}
            {selectedChat && (
              <form
                onSubmit={sendMessage}
                className="w-full flex items-center gap-2 p-6 bg-[#23232b] border-t border-[#313440]"
              >
                <input
                  className="flex-1 bg-[#18181b] text-white rounded-lg px-4 py-2 outline-none border border-[#313440] focus:border-[#7f53ac] transition"
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#2873c6] to-[#7f53ac] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
                >
                  ➤
                </button>
              </form>
            )}
            {!selectedChat && (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Selecciona un chat para ver los mensajes
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}