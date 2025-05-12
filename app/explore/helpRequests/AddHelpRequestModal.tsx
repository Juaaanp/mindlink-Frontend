'use client';

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { HelpRequest } from "@/types/HelpRequest";

type Props = {
  onClose: () => void;
  onUpdate: (newOrUpdatedReq: HelpRequest) => void;
  existingRequest?: HelpRequest | null;
};

const categories = [
  'Technology', 'Science', 'Art', 'Music',
  'Health', 'Education', 'Business', 'Travel',
];

export default function AddHelpRequestModal({
  onClose,
  onUpdate,
  existingRequest,
}: Props) {
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [body, setBody] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");

  // Rellenar el formulario si se trata de una edición
  useEffect(() => {
    if (existingRequest) {
      setSubject(existingRequest.subject || "");
      setType(existingRequest.type || "");
      setBody(existingRequest.body || "");
      setPriorityLevel(existingRequest.priorityLevel.toString());
    }
  }, [existingRequest]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const data = {
      student: user.id,
      subject,
      type,
      body,
      priorityLevel: Number(priorityLevel),
      state: "OPEN"
    };

    try {
      let res;
      if (existingRequest) {
        // UPDATE
        res = await api.put(`/helpRequests/${existingRequest.id}`, data);
        toast.success("Help request updated");
      } else {
        // CREATE
        res = await api.post("/helpRequests", data);
        toast.success("Help request created");
      }

      onUpdate(res.data); // Notificamos al padre con la data nueva o actualizada
      //Onclose
    } catch (err) {
      console.error(err);
      toast.error("Error submitting request");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center overflow-y-auto">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-md mx-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">
          {existingRequest ? "Edit Help Request" : "New Help Request"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white"
            required
          >
            <option value="">Select Type</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Describe your problem..."
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400 resize-none"
            required
          />

          <select
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white"
            required
          >
            <option value="">Select Priority</option>
            <option value="1">Low (1)</option>
            <option value="2">Medium (2)</option>
            <option value="3">High (3)</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700"
            >
              {existingRequest ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
