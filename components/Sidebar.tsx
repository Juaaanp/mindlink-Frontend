'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Pin, PinOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const [pinned, setPinned] = useState(true);

  if (isAdmin) {
    return null;
  }

  useEffect(() => {
    if (pinned) {
      document.body.classList.add('with-sidebar');
      document.body.classList.remove('without-sidebar');
    } else {
      document.body.classList.remove('with-sidebar');
      document.body.classList.add('without-sidebar');
    }
  }, [pinned]);


  useEffect(() => { //Asegura que el pinned no este fijado cuando se cargue si es false
    const stored = localStorage.getItem('sidebarPinned');
    if (stored === 'false') {
      setPinned(false);
    }
  }, []);

  useEffect(() => { //Se ejecuta cada ve que el valor de pinned cambia
    localStorage.setItem('sidebarPinned', pinned.toString());
  }, [pinned]);

  const showSidebar = pinned;

  const menuItems = [
    { label: 'My contents', path: '/explore/myContents' },
    { label: 'Help Requests', path: '/explore/helpRequests' },
    { label: 'My study groups', path: '/explore/myStudyGroups' },
    { label: 'My chats', path: '/explore/myChats' },
    { label: 'Affinity Graph', path: '/explore/affinityGraph'}
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 group">
      <div className="w-2 h-full"></div>

      <div
        className={`absolute top-0 left-0 h-full bg-[#23232b] text-white w-56
          transition-transform duration-300 ease-in-out shadow-lg p-4 rounded-r-2xl
          ${showSidebar ? 'translate-x-0' : '-translate-x-52 group-hover:translate-x-0'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Explore</h2>

          {/* Pinned Button */}
          <button
            onClick={() => setPinned(!pinned)}
            className="p-1 rounded hover:bg-gray-700"
            title={pinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
          >
            {pinned ? <Pin size={18} /> : <PinOff size={18} />}
          </button>
        </div>

        {/* Items del Sidebar */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left py-2 px-4 rounded transition ${pathname === item.path
                  ? 'bg-[#313440]'
                  : 'hover:bg-[#313440] hover:text-gray-200'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
