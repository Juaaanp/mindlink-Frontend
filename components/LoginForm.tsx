
'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-md w-full max-w-sm">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-white text-2xl font-bold">mindlink</h1>
      </div>

      <form className="flex flex-col space-y-4">
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

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
