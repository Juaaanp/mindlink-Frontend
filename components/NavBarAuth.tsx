"use client";

import { Menu, MenuItem } from "@headlessui/react";
import { useRouter } from 'next/navigation';
import { ChevronDown, Search } from "lucide-react";
import { FileText, Users, GraduationCap, UserCircle } from "phosphor-react";
import { useState } from "react";

const NavBarAuth = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const items = [
    { label: "My contents", onClick: () => router.push('/explore/myContents') },
    { label: "Help requests", onClick: () => router.push('/explore/helpRequests') },
    { label: "My study groups", onClick: () => router.push('/explore/myStudyGroups') },
    { label: "My chats", onClick: () => router.push('/explore/myChats') },
  ];

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

        {/* Explore dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-1 hover:text-cyan-400">
            <span className="font-poppins font-bold text-[15px]">Explore</span>
            <ChevronDown size={16} />
          </Menu.Button>
          
          <Menu.Items className="absolute mt-2 w-40 bg-[#2a2a2a] rounded-lg shadow-lg p-2 z-50">

            <Menu.Items className="...">
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={`w-full text-left px-3 py-2 rounded-md font-poppins text-sm transition ${active ? "bg-cyan-600 text-white" : "hover:bg-neutral-700"
                        }`}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>

          </Menu.Items>
        </Menu>

        {/* Search bar */}
        <div className="flex items-center bg-[#2a2a2a] rounded-lg px-4 py-1 mx-4">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
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
