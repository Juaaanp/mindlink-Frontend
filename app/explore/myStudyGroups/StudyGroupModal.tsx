'use client';

import { FC, useState } from 'react';
import { X, UserCircle, BookOpen, FileText, PlusCircle, Save } from 'lucide-react';
import { StudyGroup } from '@/types/StudyGroup';
import api from '@/lib/api';

interface StudyGroupModalProps {
  group: StudyGroup;
  onClose: () => void;
}

const StudyGroupModal: FC<StudyGroupModalProps> = ({ group, onClose }) => {
  const [showContentInput, setShowContentInput] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [contents, setContents] = useState(group.contents || []);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(group.description || '');

  const handleSaveDescription = () => {
    if (newDescription.trim() === '') return;

    api.post(`/studyGroups/addDescription/${group.id}`, {
      description: newDescription.trim(),
    })
  }

  const handleAddContent = () => {
    setShowContentInput(true);
  };

  const handleSaveContent = () => {
    if (newContent.trim() === '') return;
    setContents([...contents, newContent.trim()]);
    setNewContent('');
    setShowContentInput(false);

    api.post(`/studyGroups/addContent/${group.id}`, {
      content: newContent.trim(),
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 backdrop-blur-sm">
      <div className="relative bg-[#1e1e2f] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#23232b] px-6 py-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Study Group</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-white">
          {/* Topic & Description */}
          <div>
            <h3 className="text-sm uppercase text-gray-400">Topic</h3>
            <p className="text-lg font-medium">{group.topic}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-1">Description</h3>

            {editingDescription ? (
              <>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#2a2a3a] text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500"
                  rows={3}
                  placeholder="Enter a description..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      handleSaveDescription();
                      setEditingDescription(false);
                    }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewDescription(group.description || '');
                      setEditingDescription(false);
                    }}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300">{newDescription || 'No description yet.'}</p>
                <button
                  onClick={() => setEditingDescription(true)}
                  className="mt-2 text-sm text-cyan-400 hover:underline"
                >
                  Edit description
                </button>
              </>
            )}
          </div>

          {/* Students */}
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-2">Members ({group.students.length})</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.students.map((s) => (
                <li key={s.id} className="flex items-center gap-3 bg-[#2a2a3a] p-3 rounded-lg">
                  <UserCircle size={32} className="text-cyan-500" />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contents */}
          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-2">Contents</h3>
            <ul className="space-y-2">
              {contents.length > 0 ? (
                contents.map((c, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 bg-[#2a2a3a] p-3 rounded-lg hover:bg-[#33334a] transition"
                  >
                    <FileText size={20} className="text-cyan-400" />
                    <span className="text-gray-200">{c}</span>
                  </li>
                ))
              ) : (
                <span className="text-gray-400">No contents yet</span>
              )}
            </ul>

            {/* Input para nuevo contenido */}
            {showContentInput && (
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter new content"
                  className="flex-1 px-3 py-2 rounded-md bg-[#2a2a3a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSaveContent}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleAddContent}
              className="flex-1 text-center bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-medium transition"
            >
              <PlusCircle className="inline-block mr-2" size={18} />
              New Content
            </button>
            <button
              onClick={onClose}
              className="flex-1 text-center bg-transparent border border-gray-500 hover:border-gray-400 text-gray-300 py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupModal;
