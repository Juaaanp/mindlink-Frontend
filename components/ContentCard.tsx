// /components/ContentCard.tsx
import { Content } from "@/types/Content";

export const ContentCard = ({ content }: { content: Content }) => (
  <div className="p-4 border rounded shadow-md bg-white">
    <h2 className="text-xl font-bold">{content.title}</h2>
    <p className="text-sm text-gray-600">Topic: {content.topic}</p>
    <p className="text-sm">Type: {content.type}</p>
    <p className="text-xs text-gray-400">Author: {content.author}</p>
  </div>
);
