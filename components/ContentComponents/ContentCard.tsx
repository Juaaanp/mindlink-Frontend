// /components/ContentCard.tsx
import { Content } from "@/types/Content";

type Props = { //Para mandar el contenido del content como argumento
  content: Content;
};

export default function ContentCard({ content }: Props) {
  return (
    <div className="p-4 border rounded shadow-md bg-[#2a2a2a]">
      <h2 className="text-xl font-bold">{content.title}</h2>
      <p className="text-sm text-gray-600">Topic: {content.topic}</p>
      <p className="text-sm">Type: {content.type}</p>
      <p className="text-xs text-gray-400">Author: {content.authorId}</p>
    </div>
  );
}
