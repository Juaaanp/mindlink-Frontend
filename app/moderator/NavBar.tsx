'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap } from 'phosphor-react';

export default function NavBarModerator() {

    const router = useRouter();

    const handleNavigation = (path: string) => {
            router.push(path);
        };

    return (

        <header
            className="fixed top-0 left-0 w-full z-50 bh-16 w-full text-white px-6 py-4 shadow-md flex items-center justify-between"
            style={{
                background: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
            }}
        >
            <div className="flex space-x-6 items-center">
                {/* Logo MindLink */}
                <button
                    onClick={() => handleNavigation("/moderator/home")}
                    className="hover:text-cyan-400 flex flex-col items-center h-full font-poppins font-bold"
                >
                    <GraduationCap size={30} />
                    <span className="text-[15px]">MindLink</span>
                </button>

                {/* Texto de bienvenida */}
                <div className="font-poppins">
                    <h1 className="text-xl font-bold text-white">Welcome, Admin!</h1>
                    <p className="text-sm text-gray-200">Manage your platform with ease</p>
                </div>
            </div>
            <div>
                <button
                className='hover:text-cyan-400 font-poppins font-bold' 
                onClick={() => handleNavigation("/login")}>
                    Log out
                </button>
            </div>
        </header>
    );
}