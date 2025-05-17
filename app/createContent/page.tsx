'use client';

import { useState } from 'react';
import CreateContentForm from '@/components/ContentComponents/CreateContentForm';
import {
  Cpu,

  Brush,
  Music,
  Heart,
  BookOpen,
  Briefcase,
  MapPin
} from 'lucide-react';
import NavBarAuth from '@/components/NavBars/NavBarAuth';
import Sidebar from '@/components/Sidebar';

export default function CreateContentPage() {
  const [interest, setInterest] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const renderIcon = () => {
    const commonProps = { size: 150, className: 'text-cyan-400 animate-pulse' };
    switch (interest) {
      case 'Technology':
        return <Cpu {...commonProps} />;
      case 'Science':
        return <Brush {...commonProps} />;
      case 'Art':
        return <Brush {...commonProps} />;
      case 'Music':
        return <Music {...commonProps} />;
      case 'Health':
        return <Heart {...commonProps} />;
      case 'Education':
        return <BookOpen {...commonProps} />;
      case 'Business':
        return <Briefcase {...commonProps} />;
      case 'Travel':
        return <MapPin {...commonProps} />;
      default:
        return <p className="text-gray-600 italic">Select a category to see the icon</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white p-8">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavBarAuth onSearchChange={setSearchQuery} />
      </header>

      <Sidebar/>

      {/* Formulario a la izquierda */}
      <div className="w-1/3">
        <CreateContentForm onInterestSelect={setInterest} />
      </div>

      {/* Icono / Imagen al centro-derecha */}
      <div className="w-2/3 flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
}
