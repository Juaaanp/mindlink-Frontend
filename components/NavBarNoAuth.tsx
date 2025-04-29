"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { GraduationCap } from 'phosphor-react';

const NavbarNoAuth = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    const handleLogoClick = (): void => {
        router.push('/');
        console.log("Logo clicked");
    };

    const handleSignIn = (): void => {
        router.push('/login')
    }

    const handleSignUp = (): void => {
      router.push('/signUp')
    }

    return (
      <nav
        className="h-16 w-full text-white px-6 py-4 shadow-md flex items-center justify-between"
        style={{
          background: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
        }}
      >
        <div className="flex space-x-6 items-center">
          <button
            onClick={handleLogoClick}
            className="hover:text-cyan-400 flex flex-col items-center h-full font-poppins font-bold"
          >
            <GraduationCap size={30}/>
            <span className="text-center text-[13px]">MindLink</span>
          </button>

        </div>
  
        {/* Navigation buttons */}
        <div className="flex space-x-6 items-center">
          <button onClick={handleSignIn} className="font-poppins font-bold hover:text-cyan-400">
          Sign in
          </button>

          <button onClick={handleSignUp} className="font-poppins font-bold hover:text-cyan-400">
          Sign up
          </button>
        </div>
      </nav>
    );
};

export default NavbarNoAuth;
