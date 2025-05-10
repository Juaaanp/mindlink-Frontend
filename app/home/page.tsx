'use client';

import NavBarAuth from "@/components/NavBars/NavBarAuth";
import Contents from '@/components/ContentComponents/Contents';
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {

  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pinned, setPinned] = useState(false);

  const handleCategoryClick = (type: string) => {
    setSelectedType(type); // Actualiza el estado
  };

  return (
    <div className="font-poppins">
      {/* Barra de navegación fija */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <Sidebar/>

      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-4xl mb-4 font-bold flex flex-col items-center">Welcome to Mindlink
          {user ? (
            <h1>{user.name}📚</h1>
          ) : (
            <p>You're not logged.</p>
          )}</h1>
        <p className="text-lg md:text-xl text-center max-w-xl mb-6 font-poppins">
          Connect, learn, and collaborate with other students using an app designed to enhance your learning.
        </p>

        <div className="text-center">
          <h4 className="text-4xl md:text-5xl font-bold mt-5 mb-6 font-poppins">Categories</h4>

          <div className="flex flex-col items-center gap-4">
            {/* Fila 1 */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Technology', 'Science', 'Art', 'Music'].map((label) => (
                <button
                  key={label}
                  className="text-white px-4 py-2 rounded-lg shadow-md font-poppins transition-all duration-300"
                  style={{ background: '#313440' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#313440';
                  }}
                  onClick={() => handleCategoryClick(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Fila 2 */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Health', 'Education', 'Business', 'Travel'].map((label) => (
                <button
                  key={label}
                  className="text-white px-4 py-2 rounded-lg shadow-md font-poppins transition-all duration-300"
                  style={{ background: '#313440' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#313440';
                  }}
                  onClick={() => handleCategoryClick(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Contents type={selectedType} searchQuery={searchQuery} />
      </div>
    </div>
  );
}


