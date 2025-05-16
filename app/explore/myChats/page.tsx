'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

// Tipos definidos aquí mismo
type Chat = {
  id: string;
  participantEmails: string[];
};

type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export default function MyChatsPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [emailToName, setEmailToName] = useState<{ [email: string]: string }>({});

  // Cargar chats y nombres de participantes
  useEffect(() => {
    if (!user?.email) return;
    api.get(`/chats/participant/${user.email}`).then(async res => {
      setChats(res.data);

      // Obtener los correos de los otros participantes
      const otherEmails: string[] = Array.from(
        new Set(
          res.data
            .flatMap((chat: Chat) => chat.participantEmails)
            .filter((email: string) => email !== user.email)
        )
      );

      // Buscar los nombres de esos correos
      const nameMap: { [email: string]: string } = {};
      await Promise.all(
        otherEmails.map(async (email: string) => {
          try {
            const resp = await api.get(`/students/email/${email}`);
            nameMap[email] = resp.data.name;
          } catch {
            nameMap[email] = email; // fallback al correo si no se encuentra
          }
        })
      );
      setEmailToName(nameMap);
    });
  }, [user?.email]);

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
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  // Enviar mensaje
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat || !user?.email) return;
    await api.post('/messages', {
      chatId: selectedChat.id,
      senderId: user.email,
      text: input,
      timestamp: new Date().toISOString(),
    });
    setInput('');
    api.get(`/messages/byChat/${selectedChat.id}`).then(res => setMessages(res.data));
  };

  // Crear nuevo chat (evitar duplicados)
  const createChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !newParticipantEmail.trim()) return;

    // Buscar si ya existe un chat con esos participantes
    const res = await api.get(`/chats/participant/${user.email}`);
    const existingChat = res.data.find((chat: Chat) =>
      chat.participantEmails.includes(newParticipantEmail.trim()) &&
      chat.participantEmails.length === 2
    );

    if (existingChat) {
      setSelectedChat(existingChat);
      setNewParticipantEmail('');
      return;
    }

    // Si no existe, crear uno nuevo
    const createRes = await api.post('/chats', {
      participantEmails: [user.email, newParticipantEmail.trim()],
    });
    setChats([...chats, createRes.data]);
    setSelectedChat(createRes.data);
    setNewParticipantEmail('');
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
            <form
              onSubmit={createChat}
              className="flex flex-wrap gap-2 p-4 bg-[#18181b] border-b border-[#313440]"
            >
              <input
                className="flex-1 min-w-0 bg-[#23232b] text-white rounded-lg px-4 py-2 outline-none border border-[#313440]"
                type="text"
                placeholder="Correo del otro usuario para chatear"
                value={newParticipantEmail}
                onChange={e => setNewParticipantEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2873c6] to-[#7f53ac] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
                style={{ whiteSpace: 'nowrap' }}
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
                  Chat con: {chat.participantEmails
                    .filter(email => email !== user?.email)
                    .map(email => emailToName[email] || email)
                    .join(', ')}
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
                    String(msg.senderId) === String(user?.email)
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