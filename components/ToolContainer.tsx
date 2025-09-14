import React from 'react';

interface ToolContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="mt-2 text-lg text-gray-400 max-w-3xl">{description}</p>
      </header>
      <div className="bg-[#1a1a2e]/60 border border-gray-700/50 rounded-xl shadow-2xl shadow-black/20 p-4 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default ToolContainer;