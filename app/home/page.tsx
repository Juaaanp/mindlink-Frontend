'use client';

import NavBarAuth from "@/components/NavBarAuth";

export default function HomePage() {
  return (
    <div>
      <NavBarAuth />
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl mb-4 font-poppins font-bold">Welcome to Mindlink 📚</h1>
        <p className="text-lg md:text-xl text-center max-w-xl mb-6 font-poppins">
          Connect, learn, and collaborate with other students using an app designed to enhance your learning.
        </p>
        <div className="text-center">
          <h4 className="text-4xl md:text-5xl font-bold mt-5 mb-6 font-poppins">Categories</h4>

          <div className="flex flex-col items-center gap-4">
            {/* Fila 1 */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Technology', 'Science', 'Art', 'Music'].map((label) => (
                <button
                  key={label}
                  className="text-white px-4 py-2 rounded-lg shadow-md font-poppins transition-all duration-300"
                  style={{
                    background: '#313440', // Color base
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)'; // Gradiente al pasar el ratón
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#313440'; // Volver al color base
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Fila 2 */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Health', 'Education', 'Business', 'Travel'].map((label) => (
                <button
                  key={label}
                  className="text-white px-4 py-2 rounded-lg shadow-md font-poppins transition-all duration-300"
                  style={{
                    background: '#313440', // Color base
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)'; // Gradiente al pasar el ratón
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#313440'; // Volver al color base
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

