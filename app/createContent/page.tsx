'use client';

import CreateContentForm from "@/components/ContentComponents/CreateContentForm";
import NavBarAuth from "@/components/NavBarAuth";
import { FilePlus, PencilLine, BookOpenText } from "lucide-react";
import { useState } from "react";

export default function CreateContentPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins">
      {/* Barra de navegación */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
      <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="flex w-full max-w-5xl items-start justify-between gap-6">
          {/* Formulario con título */}
          <div className="w-1/2">
            <div className="flex items-center mt-10 mb-4 space-x-2">
              <FilePlus size={24} className="text-cyan-400" />
              <h2 className="text-xl font-semibold">Create Content</h2>
            </div>
            <CreateContentForm />
          </div>

          {/* Íconos decorativos más compactos */}
          <div className="w-1/2 flex flex-col items-center gap-4 text-cyan-300 mt-80">
            <BookOpenText size={150} />
            <PencilLine size={120} />
            <p className="text-sm text-center text-gray-400">
              Share your ideas with the world.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}


