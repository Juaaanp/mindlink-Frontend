'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavbarNoAuth from '@/components/NavBars/NavBarNoAuth';

export default function Home() {
  const router = useRouter();

  const handleExplorarOnClick = (): void => {
    router.push('WhatsApp Image 2025-05-26 at 4.48.26 PM.jpeg');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18181b] to-[#0a0a0a]">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-sm shadow-lg">
        <NavbarNoAuth />
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 font-poppins">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Welcome to Mindlink
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Connect, learn, and collaborate with other students on a platform designed to enhance your learning experience.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
              <button 
                onClick={handleExplorarOnClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/25 hover:scale-105"
              >
                <span className="relative z-10 text-white font-semibold text-lg">
                  Explore Content
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <Link 
                href="/about"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20"
              >
                <span className="text-white font-semibold text-lg">
                  Learn More
                </span>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Collaborative Learning</h3>
              <p className="text-gray-400">Connect with other students and share knowledge effectively.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p className="text-gray-400">Access verified and up-to-date educational resources.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Active Community</h3>
              <p className="text-gray-400">Join a community of students committed to learning.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
