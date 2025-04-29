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
    console.log({ name, email, password, selectedInterests });
  };

  return (
    <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-md w-full max-w-lg">
      <h2 className="text-white text-3xl font-bold mt-6 mb-6 text-center font-poppins">Create an account</h2>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
        />
        <div className="bg-[#2a2a2a] p-6 rounded-lg">
          <p className="text-white text-lg text-center font-poppins font-semibold mb-4">Select your interests</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center text-white font-poppins">
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
        </div>
        <button
          type="submit"
          className="text-white py-4 rounded-lg font-poppins text-lg font-semibold hover:opacity-90 transition"
          style={{
            backgroundImage: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
