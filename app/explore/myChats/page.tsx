'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

type Student = {
  id: string;
  name: string;
  email: string;
  studyGroupsIdList?: string[];
  interests?: string[];
  commonGroups?: string[];
  commonInterests?: string[];
};

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Student[]>([]);

  // Cargar chats y nombres de participantes
  useEffect(() => {
    if (!user?.email) return;
    api.get(`/chats/participant/${user.email}`).then(async res => {
      setChats(res.data);

      const otherEmails: string[] = Array.from(
        new Set<string>(
          res.data
            .flatMap((chat: Chat) => chat.participantEmails)
            .filter((email: string) => email !== user.email)
        )
      );

      const nameMap: { [email: string]: string } = {};
      await Promise.all(
        otherEmails.map(async (email: string) => {
          try {
            const resp = await api.get(`/students/email/${email}`);
            nameMap[email] = resp.data.name;
          } catch {
            nameMap[email] = email;
          }
        })
      );
      setEmailToName(nameMap);
    });
  }, [user?.email]);

  // Cargar mensajes y obtener nombres de remitentes
  useEffect(() => {
    if (!selectedChat) return;
    api.get(`/messages/byChat/${selectedChat.id}`).then(async res => {
      setMessages(res.data);

      const senderEmails: string[] = Array.from(
        new Set<string>(res.data.map((msg: Message) => msg.senderId as string))
      ).filter((email: string) => !(email in emailToName));

      if (senderEmails.length > 0) {
        const nameMap = { ...emailToName };
        await Promise.all(
          senderEmails.map(async (email: string) => {
            try {
              const resp = await api.get(`/students/email/${email}`);
              nameMap[email] = resp.data.name;
            } catch {
              nameMap[email] = email;
            }
          })
        );
        setEmailToName(nameMap);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  // Auto-refresh de mensajes cada 2 segundos
  useEffect(() => {
    if (!selectedChat) return;
    const interval = setInterval(() => {
      api.get(`/messages/byChat/${selectedChat.id}`).then(async res => {
        setMessages(res.data);

        const senderEmails: string[] = Array.from(
          new Set<string>(res.data.map((msg: Message) => msg.senderId as string))
        ).filter((email: string) => !(email in emailToName));

        if (senderEmails.length > 0) {
          const nameMap = { ...emailToName };
          await Promise.all(
            senderEmails.map(async (email: string) => {
              try {
                const resp = await api.get(`/students/email/${email}`);
                nameMap[email] = resp.data.name;
              } catch {
                nameMap[email] = email;
              }
            })
          );
          setEmailToName(nameMap);
        }
      });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  // Cargar sugerencias de estudiantes
  useEffect(() => {
    if (!user?.id) return;
    api.get(`/students/suggestions/${user.id}`).then(res => setSuggestions(res.data));
  }, [user?.id]);

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

  // Eliminar mensaje
  const deleteMessage = async (id: string) => {
    await api.delete(`/messages/${id}`);
    setMessages(messages.filter(m => m.id !== id));
  };

  // Editar mensaje
  const editMessage = async (id: string) => {
    await api.put(`/messages/${id}`, { text: editText });
    setEditingId(null);
    setEditText('');
    api.get(`/messages/byChat/${selectedChat?.id}`).then(res => setMessages(res.data));
  };

  // Crear nuevo chat (evitar duplicados)
  const createChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !newParticipantEmail.trim()) return;

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

    const createRes = await api.post('/chats', {
      participantEmails: [user.email, newParticipantEmail.trim()],
    });
    setChats([...chats, createRes.data]);
    setSelectedChat(createRes.data);
    setNewParticipantEmail('');
  };

  const deleteChat = async (chatId: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este chat?')) {
      await api.delete(`/chats/${chatId}`);
      setChats(prev => prev.filter(c => c.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
    }
  };

  if (!user) {
    return <div className="flex-1 flex items-center justify-center text-gray-400">Cargando usuario...</div>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>
      <main className="pt-16 min-h-screen bg-[#0a0a0a] text-white font-poppins flex transition-all duration-300">
        <Sidebar />
        <div className="flex flex-1">
          <div className="flex flex-col w-72 bg-[#18181b] border-r border-[#313440]">
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
            <h3 className="text-lg font-semibold px-6 py-4 border-b border-[#313440]">Mis chats</h3>
            <ul className="flex-1 overflow-y-auto">
              {chats.map(chat => (
                <li
                  key={chat.id}
                  className={`px-6 py-4 cursor-pointer hover:bg-[#23232b] transition ${
                    selectedChat?.id === chat.id ? 'bg-[#23232b] font-bold' : ''
                  } flex items-center justify-between`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <span>
                    Chat con: {chat.participantEmails
                      .filter(email => email !== user?.email)
                      .map(email => emailToName[email] || email)
                      .join(', ')}
                  </span>
                  <button
                    className="ml-2 text-red-400 hover:text-red-600 text-xs"
                    title="Eliminar chat"
                    onClick={e => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold px-6 py-4 border-b border-[#313440]">Sugerencias</h3>
            <ul className="flex-1 overflow-y-auto">
              {suggestions.map(s => (
                <li key={s.id} className="px-6 py-3 border-b border-[#23232b] flex flex-col">
                  <span className="font-bold">{s.name}</span>
                  <span className="text-xs text-gray-400">{s.email}</span>
                  {s.commonGroups && s.commonGroups.length > 0 && (
                    <span className="text-xs text-blue-400 mt-1">
                      Grupos en común: {s.commonGroups.join(', ')}
                    </span>
                  )}
                  {s.commonInterests && s.commonInterests.length > 0 && (
                    <span className="text-xs text-green-400 mt-1">
                      Intereses en común: {s.commonInterests.join(', ')}
                    </span>
                  )}
                  <button
                    className="mt-2 bg-gradient-to-r from-[#2873c6] to-[#7f53ac] text-white px-3 py-1 rounded-lg text-xs"
                    onClick={() => setNewParticipantEmail(s.email)}
                  >
                    Chatear
                  </button>
                </li>
              ))}
              {suggestions.length === 0 && (
                <li className="px-6 py-3 text-gray-400 text-xs">Sin sugerencias por ahora</li>
              )}
            </ul>
          </div>
          <section className="flex-1 flex flex-col justify-between bg-[#23232b]">
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
                  <div className="font-bold flex justify-between items-center">
                    {emailToName[msg.senderId] || msg.senderId}
                    {msg.senderId === user.email && (
                      <div className="flex gap-2">
                        <button
                          className="text-blue-400 hover:text-blue-600 text-xs"
                          onClick={() => {
                            setEditingId(msg.id);
                            setEditText(msg.text);
                          }}
                          type="button"
                          title="Editar mensaje"
                        >
                          ✏️
                        </button>
                        <button
                          className="text-red-400 hover:text-red-600 text-xs"
                          onClick={() => deleteMessage(msg.id)}
                          type="button"
                          title="Eliminar mensaje"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  {editingId === msg.id ? (
                    <form
                      onSubmit={async e => {
                        e.preventDefault();
                        await editMessage(msg.id);
                      }}
                      className="flex gap-2 mt-2"
                    >
                      <input
                        className="flex-1 bg-[#18181b] text-white rounded-lg px-2 py-1 outline-none border border-[#313440]"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                      />
                      <button type="submit" className="text-green-400 hover:text-green-600 text-xs">Guardar</button>
                      <button type="button" className="text-gray-400 hover:text-gray-600 text-xs" onClick={() => setEditingId(null)}>Cancelar</button>
                    </form>
                  ) : (
                    <>
                      {msg.text}
                      <div className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleString()}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
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