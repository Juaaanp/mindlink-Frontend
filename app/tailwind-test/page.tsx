import React from 'react';

const TailwindTestPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-4">TailwindCSS is working! 🚀</h1>
      <p className="text-lg">If you can see this styled text, Tailwind is active.</p>
    </div>
  );
};

export default TailwindTestPage;

  