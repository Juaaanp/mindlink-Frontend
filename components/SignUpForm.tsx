'use client';

import { useState } from 'react';

const categories = [
  'Technology',
  'Science',
  'Art',
  'Music',
  'Health',
  'Education',
  'Business',
  'Travel',
];

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleCheckboxChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del formulario
    console.log({ name, email, password, selectedInterests });
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md w-full max-w-sm mx-auto mt-20 mb-20 px-4">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Create an account</h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <p className="text-white font-semibold mb-2">Select your interests:</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="mr-2 accent-cyan-500"
                />
                {category}
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSelectedInterests([])}
            className="text-sm text-cyan-400 mt-2 hover:underline"
          >
            Omit
          </button>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
