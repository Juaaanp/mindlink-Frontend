'use client';
import React from 'react';
import { Content } from '@/types/Content';

interface Props {
  content: Content;
  onDelete: (id: string) => void;
}

export default function ModerationContentCard({ content, onDelete }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-md flex flex-col gap-2 w-full">
      <h3 className="text-lg font-semibold">{content.title}</h3>
      <p className="text-sm text-gray-500">Type: {content.type}</p>
      <p className="text-sm text-gray-500">Author: {content.authorName || 'Unknown'}</p>
      <div className="text-sm text-gray-700">
        {content.body.length > 200
          ? `${content.body.substring(0, 200)}...`
          : content.body}
      </div>

      <button
        onClick={() => onDelete(content.id)}
        className="mt-2 self-start bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
      >
        Delete Content
      </button>
    </div>
  );
}
