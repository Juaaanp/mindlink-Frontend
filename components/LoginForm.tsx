'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {User} from 'phosphor-react';
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {

  const { setUser } = useAuth();
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
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      //Si fue correcta la solicitud
      const student = await response.json();
      setUser(student); //Almacenar el usuario en el contexto
      toast.success('Signed in successfully!');
      router.push('/home')

    } catch(error: any) {
      toast.error(error.message || 'Error desconocido');
      setLoading(false);
    }
  };

  return (
    <div className="bg-black p-10 rounded-2xl shadow-md w-full max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <User size={80}/>
      </div>

      <form className="flex flex-col space-y-4 font-poppins" onSubmit={handleSubmit}>
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
          className="text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          style={{
            backgroundImage: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}


