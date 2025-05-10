'use client';

import { useState } from "react";

type Props = {
  onClose: () => void;
};

const categories = [
  'Technology', 'Science', 'Art', 'Music',
  'Health', 'Education', 'Business', 'Travel',
];

export default function AddHelpRequestModal({ onClose }: Props) {
  const [type, setType] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center overflow-y-auto">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-md mx-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">New Help Request</h2>

        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="type" className="sr-only">Type</label>
            <select
              id="type"
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
          </div>

          <div>
            <label htmlFor="body" className="sr-only">Body</label>
            <textarea
              id="body"
              placeholder="Describe your problem..."
              rows={4}
              className="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400 resize-none"
            />
          </div>

          <div>
            <label htmlFor="priority" className="sr-only">Priority</label>
            <select
              id="priority"
              className="w-full p-2 rounded bg-neutral-800 text-white"
              required
            >
              <option value="">Select Priority</option>
              <option value="1">Low (1)</option>
              <option value="2">Medium (2)</option>
              <option value="3">High (3)</option>
            </select>
          </div>

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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
