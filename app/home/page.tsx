'use client';

import NavBarAuth from "@/components/NavBarAuth";

export default function homePage() {
  return (
    <div>
      <NavBarAuth />
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-urbanist md:text-5xl mb-4">Welcome to Mindlink</h1>
        <p className="text-lg md:text-xl font-inter text-center max-w-xl mb-6">
          Connect, learn and colaborate with others students on a designed app to potenciate your learning.
        </p>
        <div className="text-center">
          <h4 className="text-4xl md:text-5xl font-bold mt-5 mb-6">Categories</h4>

          <div className="flex flex-col items-center gap-4">
            {/* Fila 1 */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Technology', 'Science', 'Art', 'Music'].map((label) => (
                <button
                  key={label}
                  className="font-inter text-white px-4 py-2 rounded-lg  shadow-md"
                  style={{
                    background: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
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
                  className="font-inter text-white px-4 py-2 rounded-lg font-semibold shadow-md"
                  style={{
                    background: 'linear-gradient(to right, #2F3C63, #00DBE3, #BF00FF, #5B0C75)',
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
