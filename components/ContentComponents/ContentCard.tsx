'use client';

import { useState } from 'react';
import { Content } from "@/types/Content";
import Image from "next/image";
import ContentModal from "./ContentModal";
import ContentEditModal from "../../app/explore/myContents/ContentEditModal";

type Props = {
  content: Content;
  editMode?: boolean;
  onEdit?: (updated: Content) => void;
  onDelete?: (id: string) => void;
};

export default function ContentCard({ content, editMode = false, onEdit, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card clickeable */}
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer bg-[#1e1e1e] hover-blue rounded-2xl shadow-lg overflow-hidden hover:shadow-cyan-500/30 transition-shadow duration-300 max-w-[260px] w-full h-[260px]"
      >
        {/* Imagen de portada */}
        <div className="relative w-full h-36">
          <Image
            src="/fondoPrueba.jpg"
            alt={content.title}
            fill
            objectFit="cover"
            className="opacity-90"
          />
        </div>

        {/* Contenido */}
        <div className="p-3 text-white space-y-1 font-poppins">
          <h2 className="text-base font-semibold line-clamp-2">{content.title}</h2>

          {/* Tipo alineado como el título */}
          <div className="text-sm bg-[#3b3b3b] px-2 py-0.5 rounded-full text-cyan-300 inline-block">
            {content.type}
          </div>

          <p className="text-xs text-gray-400 mt-1">By {editMode ? 'me' : content.authorName}</p>
        </div>
      </div>


      {/* Modal con la información detallada o de edición */}
      {showModal && (
        editMode ? (
          <ContentEditModal
            content={content}
            onClose={() => setShowModal(false)}
            onEdit={onEdit!}
            onDelete={onDelete!}
          />
        ) : (
          <ContentModal content={content} onClose={() => setShowModal(false)} />
        )
      )}
    </>
  );
}