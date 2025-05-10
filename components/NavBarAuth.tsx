"use client";

import { useRouter } from 'next/navigation';
import { Search } from "lucide-react";
import { FileText, Users, GraduationCap, UserCircle } from "phosphor-react";
import { useState } from "react";

type NavBarAuthProps = {
  onSearchChange: (query: string) => void;
};

const NavBarAuth = ({ onSearchChange }: NavBarAuthProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value); // Propaga el valor al padre
  };

  const handleLogoClick = (): void => {
    router.push('/home');
    console.log("Logo clicked");
  };

  const handleContents = (): void => {
    router.push('/createContent');
  };

  const handleStudyGroups = (): void => {
    router.push('/studyGroups');
  };

  const handleProfile = (): void => {
    router.push('/profile');
  };

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
          <GraduationCap size={30} />
          <span className="text-center text-[13px]">MindLink</span>
        </button>

        {/* Search bar */}
        <div className="flex items-center bg-[#2a2a2a] rounded-lg px-4 py-1 mx-4">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleInputChange}
            className="bg-transparent text-white focus:outline-none w-64 font-poppins text-[13px]"
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-6 items-center">
        <button onClick={handleContents} className="hover:text-cyan-400 font-poppins font-bold flex items-center text-[13px]">
          <FileText size={24} className="mr-1" />
          Create Content
        </button>

        <button onClick={handleStudyGroups} className="hover:text-cyan-400 font-poppins font-bold flex items-center text-[13px]">
          <Users size={24} className="mr-1" />
          Study Groups
        </button>

        <button onClick={handleProfile} className="hover:text-cyan-400 font-poppins font-bold flex items-center text-[13px]">
          <UserCircle size={24} className="mr-1" />
          Profile
        </button>
      </div>
    </nav>
  );
};

export default NavBarAuth;
