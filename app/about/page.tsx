'use client';

import Link from 'next/link';
import NavbarNoAuth from '@/components/NavBarNoAuth';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18181b] to-[#0a0a0a] text-white">
      
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
        <NavbarNoAuth />
      </header>

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Creators Section */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Our Creators
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
                <h3 className="text-xl font-semibold mb-2">Juan David Muñoz Maya</h3>
              </div>
              <div className="text-center group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
                <h3 className="text-xl font-semibold mb-2">Juan Pablo Rodríguez Gamba</h3>
              </div>
              <div className="text-center group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
                <h3 className="text-xl font-semibold mb-2">Miguel Ángel Vásquez</h3>
              </div>
            </div>
          </section>

          {/* MindLink Description */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              About MindLink
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                MindLink is an innovative educational social network developed by Juan David Muñoz Maya, Juan Pablo Rodríguez Gamba, and Miguel Ángel Vásquez, designed to connect students through knowledge, academic interests, and collaboration.
              </p>
              <p className="text-lg leading-relaxed">
                This platform integrates custom data structures to optimize the learning experience and the formation of intelligent academic communities.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-sm text-gray-400">Developed with Next.js and TypeScript</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              What Makes MindLink Special?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🔍</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Content Exploration and Rating</h3>
                    <p className="text-gray-300 leading-relaxed">Users can publish, search, and rate educational resources organized through a Binary Search Tree (BST).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🤝</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Smart Connection</h3>
                    <p className="text-gray-300 leading-relaxed">Using an undirected graph, MindLink detects common interests and values affinities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🧠</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automated Study Groups</h3>
                    <p className="text-gray-300 leading-relaxed">Dynamically formed based on shared interests and previous participation.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🚨</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Priority Academic Help</h3>
                    <p className="text-gray-300 leading-relaxed">Help requests are managed with a priority queue that organizes the most urgent cases.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">📈</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Analysis and Visualization</h3>
                    <p className="text-gray-300 leading-relaxed">Moderators can observe the educational network behavior and analyze dynamics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">📩</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Direct Messaging</h3>
                    <p className="text-gray-300 leading-relaxed">Students can communicate directly to share knowledge.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 