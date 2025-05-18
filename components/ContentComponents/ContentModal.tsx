'use client';

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Content } from "@/types/Content";
import { NewValoration } from "@/types/Valoration";

type Props = {
  content: Content;
  onClose: () => void;
};

export default function ContentModal({ content, onClose }: Props) {
  const [ratings, setRatings] = useState<NewValoration[]>([]);

  useEffect(() => { //Para cargar las valoraciones
    api
      .get(`/valorations/byContent/${content.id}`)
      .then((res) => setRatings(res.data))
      .catch(console.error);
  }, [content.id]);

  const handleAddRating = (newRating: NewValoration) => { //Para agregar valoraciones
    api
      .post("/valorations", {
        content: content.id,
        student: "student-id", // reemplazar con ID real, autenticación
        ...newRating, //Rate y comment vienen del formulario
      })
      .then(() => {
        setRatings((prev) => [...prev, newRating]); //Actualiza el estado agregando la nueva valoración
      })
      .catch(console.error);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-[#1e1e1e] text-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-2">{content.title}</h2>
        <p className="text-sm text-gray-400 mb-4">
          {content.type} • por {content.authorName}
        </p>
        <p className="mb-6">{content.body}</p> {/* Personalizar body del contenido aquí */}

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Valoraciones</h3>
          {ratings.length === 0 ? (
            <p className="text-gray-400">Aún no hay valoraciones.</p>
          ) : (
            <div className="space-y-4">
              {ratings.map((rating, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400 mr-2">
                      {"★".repeat(rating.rate)}{"☆".repeat(5 - rating.rate)}
                    </div>
                    <span className="text-sm text-gray-400">
                      Valoración {idx + 1}
                    </span>
                  </div>
                  <p>{rating.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-lg font-semibold mb-2">Agregar una valoración</h4>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const rate = parseInt((form.rate as any).value);
              const comment = (form.comment as any).value.trim();
              if (rate >= 1 && rate <= 5 && comment) {
                handleAddRating({ rate, comment });
                form.reset();
              }
            }}
          >
            <div>
              <label className="block text-sm mb-1">Puntuación (1 a 5):</label>
              <select
                name="rate"
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Comentario:</label>
              <textarea
                name="comment"
                rows={3}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Escribe tu opinión..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              Enviar valoración
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
