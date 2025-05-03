'use client';

import { useState } from 'react';
import { Content } from "@/types/Content";
import Image from "next/image";
import ContentModal from "./ContentModal";

type Props = {
  content: Content;
};

export default function ContentCard({ content }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card clickeable */}
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer bg-[#1e1e1e] hover-blue rounded-2xl shadow-lg overflow-hidden hover:shadow-cyan-500/30 transition-shadow duration-300 max-w-sm w-full"
      >
        {/* Imagen de portada */}
        <div className="relative w-full h-48">
          <Image
            src="/fondoPrueba.jpg"
            alt={content.title}
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        </div>

        {/* Contenido */}
        <div className="p-5 text-white space-y-2 font-poppins">
          <h2 className="text-xl font-semibold">{content.title}</h2>
          <div className="flex flex-wrap text-sm gap-2">
            <span className="bg-[#3b3b3b] px-3 py-1 rounded-full text-cyan-300">
              {content.type}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">By {content.authorName}</p>
        </div>
      </div>

      {/* Modal con la información detallada */}
      {showModal && (
        <ContentModal content={content} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}