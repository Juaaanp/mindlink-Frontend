'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18181b] to-[#0a0a0a] text-white">
      {/* Header con efecto de cristal */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎓</span>
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">mindlink</span>
            </div>
            <Link 
              href="/"
              className="px-6 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Sección de Creadores */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Nuestros Creadores
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

          {/* Descripción de MindLink */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Sobre MindLink
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                MindLink es una innovadora red social educativa desarrollada por Juan David Muñoz Maya, Juan Pablo Rodríguez Gamba y Miguel Ángel Vásquez, que busca conectar estudiantes a través del conocimiento, los intereses académicos y la colaboración.
              </p>
              <p className="text-lg leading-relaxed">
                Esta plataforma integra estructuras de datos personalizadas para optimizar la experiencia de aprendizaje y la formación de comunidades académicas inteligentes.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-sm text-gray-400">Desarrollado con Next.js y TypeScript</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Características */}
          <section className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              ¿Qué hace especial a MindLink?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🔍</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Exploración y Valoración de Contenidos</h3>
                    <p className="text-gray-300 leading-relaxed">Los usuarios pueden publicar, buscar y calificar recursos educativos organizados mediante un Árbol Binario de Búsqueda (ABB).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🤝</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Conexión Inteligente</h3>
                    <p className="text-gray-300 leading-relaxed">Mediante un grafo no dirigido, MindLink detecta intereses comunes y valora afinidades.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🧠</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Grupos de Estudio Automatizados</h3>
                    <p className="text-gray-300 leading-relaxed">Se forman dinámicamente con base en intereses compartidos y participación previa.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🚨</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ayuda Académica por Prioridad</h3>
                    <p className="text-gray-300 leading-relaxed">Las solicitudes de ayuda se gestionan con una cola de prioridad que organiza los casos más urgentes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">📈</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Análisis y Visualización</h3>
                    <p className="text-gray-300 leading-relaxed">Los moderadores pueden observar el comportamiento de la red educativa y analizar dinámicas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">📩</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Mensajería Directa</h3>
                    <p className="text-gray-300 leading-relaxed">Los estudiantes pueden comunicarse directamente para compartir conocimiento.</p>
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