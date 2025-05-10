'use client';

import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const mockChats = [
  {
    id: '1',
    name: 'Student 1',
    lastMessage: 'Hi, how is the project going?',
    lastTime: '5 min ago',
    messages: [
      { id: 1, fromMe: false, text: 'Hi, how is the project going?' },
      { id: 2, fromMe: true, text: 'Going great, thanks!' },
      { id: 3, fromMe: false, text: 'Need any help?' },
    ],
  },
  {
    id: '2',
    name: 'Student 2',
    lastMessage: 'Can we review the code?',
    lastTime: '15 min ago',
    messages: [
      { id: 1, fromMe: false, text: 'Can we review the code?' },
      { id: 2, fromMe: true, text: 'Sure, send it over.' },
    ],
  },
  {
    id: '3',
    name: 'Student 3',
    lastMessage: 'Report is ready!',
    lastTime: '1 hour ago',
    messages: [
      { id: 1, fromMe: false, text: 'Report is ready!' },
      { id: 2, fromMe: true, text: 'Great, thanks!' },
    ],
  },
];

export default function MyChats() {
  const [selectedChatId, setSelectedChatId] = useState(mockChats[0].id);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

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

          {/* Lista de chats */}
          <section className="w-80 bg-[#18181b] border-r border-[#23232b] flex flex-col">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-center gap-4 px-6 py-5 border-b border-[#23232b] text-left transition-colors ${
                  selectedChatId === chat.id ? 'bg-[#23232b]' : 'hover:bg-[#23232b]'
                }`}
              >
                <div className="bg-[#23232b] rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                  <span role="img" aria-label="user">👤</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{chat.name}</div>
                  <div className="text-gray-400 text-sm truncate">{chat.lastMessage}</div>
                </div>
                <div className="text-xs text-gray-500">{chat.lastTime}</div>
              </button>
            ))}
          </section>

          {/* Área de mensajes */}
          <section className="flex-1 flex flex-col justify-between bg-[#23232b]">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-4">
              {selectedChat?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-md px-6 py-3 rounded-2xl text-white font-medium shadow-md ${
                    msg.fromMe
                      ? 'self-end bg-gradient-to-l from-[#7f53ac] to-[#2873c6]'
                      : 'self-start bg-gradient-to-r from-[#2873c6] to-[#7f53ac]'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInputValue('');
              }}
              className="w-full flex items-center gap-2 p-6 bg-[#23232b] border-t border-[#313440]"
            >
              <input
                className="flex-1 bg-[#18181b] text-white rounded-lg px-4 py-2 outline-none border border-[#313440] focus:border-[#7f53ac] transition"
                type="text"
                placeholder="Write a message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2873c6] to-[#7f53ac] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                ➤
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
