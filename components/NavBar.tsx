'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { ChevronDown, Search, UserCircle } from 'lucide-react';

export default function NavBar() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <nav className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700 text-white px-6 py-4 shadow-md flex items-center justify-between">
            {/* Logo */}
            <button onClick={handleLogoClick} className="flex items-center space-x-2">
                <img src="/logo.png" alt="Mindlink Logo" className="w-8 h-8" />
                <span className="text-xl font-bold">Mindlink</span>
            </button>

            {/* Explore dropdown */}
            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-1 hover:text-cyan-400">
                    <span>Explore</span>
                    <ChevronDown size={16} />
                </Menu.Button>
                <Menu.Items className="absolute mt-2 w-40 bg-[#2a2a2a] rounded-lg shadow-lg p-2 z-50">
                    <Menu.Item>
                        {({ active }) => (
                            <button className={`w-full text-left px-2 py-1 rounded ${active ? 'bg-cyan-500' : ''}`}>
                                Option 1
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button className={`w-full text-left px-2 py-1 rounded ${active ? 'bg-cyan-500' : ''}`}>
                                Option 2
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

            {/* Search bar */}
            <div className="flex items-center bg-[#2a2a2a] rounded-lg px-3 py-1 mx-4">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-white focus:outline-none w-64"
                />
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-6 items-center">
                <button className="hover:text-cyan-400">Contents</button>
                <button className="hover:text-cyan-400">Study Groups</button>
                <button className="hover:text-cyan-400 flex items-center">
                    <UserCircle size={24} className="mr-1" />
                    Profile
                </button>
            </div>
        </nav>

    );
}
