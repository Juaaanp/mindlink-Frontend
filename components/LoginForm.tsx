'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginForm() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { //async: va a hacer operaciones sin bloquear el resto del programa
    e.preventDefault(); //e es el evento, React.FormEvent es el tipo del evento
    console.log("hola");
    setLoading(true);

    const loginRequest = {
      email,
      password
    }

    try {
      const response = await fetch('http://localhost:8090/students/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      //Si fue correcta la solicitud
      toast.success('Signed in successfully!');
      router.push('/home')

    } catch(error: any) {
      toast.error(error.message || 'Error desconocido');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-md w-full max-w-sm">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-white text-2xl font-bold">Welcome!</h1>
      </div>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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

        {/* Spinner de carga */}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
