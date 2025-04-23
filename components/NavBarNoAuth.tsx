"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";

const NavbarNoAuth = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    const handleLogoClick = (): void => { //Cada vez que se hace click al logo:
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
    <nav className="h-16 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div className="flex space-x-6 items-center">
        <button onClick={handleLogoClick} className="flex items-center space-x-2 h-full">
        <img src="/logo.png" alt="Mindlink Logo" className="h-14 w-15" />
        </button>
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-6 items-center">
        <button onClick={handleSignIn} className="hover:text-cyan-400">Sign in</button>
        <button onClick={handleSignUp} className="hover:text-cyan-400">Sign up</button>
      </div>
    </nav>
  );
};

export default NavbarNoAuth;
