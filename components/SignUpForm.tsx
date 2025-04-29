'use client'; //Que este archivo se ejecute en el navegador, no en el servidor

import { useState } from 'react'; //Permite guardar y cambiar valores
import { useRouter } from 'next/navigation'; // Para redirigir
import toast from 'react-hot-toast';


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
  const router = useRouter();

  const [name, setName] = useState(''); //Guarda valores con el tiempo y se cambian con la función
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');   // Nuevo: para guardar errores
  const [loading, setLoading] = useState(false); // Opcional: loading para UX

  const handleCheckboxChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => { //cuando hago click en signUp
    e.preventDefault(); //Evita que se recargue la página
    setError(''); // Limpiar error anterior
    setLoading(true);

    const userData = {
      name,
      email,
      password,
      interests: selectedInterests,
    };

    try { //await: esperar a que esta operación termine antes de seguir, solo dentro de una func async
      const response = await fetch('http://localhost:8090/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    
      if (!response.ok) {
        const errorMessage = await response.text();
        setLoading(false);
        throw new Error(errorMessage); //Fuerza el salto al catch
      }
    
      const data = await response.json();
      console.log('Registro exitoso:', data);
    
      toast.success('Account created successfully! 🎉'); // << notificación exitosa
      router.push('/login');
      
    } catch (error: any) {
      console.error('Error en registro:', error.message);
      toast.error(error.message || 'Something went wrong'); // << notificación de error
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-md w-full max-w-lg mt-10">
      <h2 className="text-white text-3xl font-bold mt-6 mb-6 text-center font-poppins">Create an account</h2>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#2a2a2a] text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-poppins"
          required
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

        {/* Error ya no es necesario este div */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md text-center font-poppins">
            {error}
          </div>
        )}

        {/* Spinner de carga */}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-white py-4 rounded-lg font-poppins text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          style={{
            backgroundImage: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
          }}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
