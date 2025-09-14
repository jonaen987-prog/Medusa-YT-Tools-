import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateThumbnailIdeas } from '../services/geminiService';
import type { ThumbnailIdea } from '../types';

const ThumbnailIdeaCard: React.FC<{ idea: ThumbnailIdea }> = ({ idea }) => (
    <div className="bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4 space-y-3">
        <h3 className="font-bold text-fuchsia-400">{idea.concept}</h3>
        <div>
            <h4 className="text-sm font-semibold text-gray-400">Visuals</h4>
            <p className="text-gray-300 text-sm">{idea.visuals}</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-400">Text Overlay</h4>
            <p className="text-gray-300 text-sm font-mono bg-gray-800/50 p-2 rounded">"{idea.textOverlay}"</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-400">Color Palette</h4>
            <p className="text-gray-300 text-sm">{idea.colors}</p>
        </div>
    </div>
);

const ThumbnailIdeaGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [ideas, setIdeas] = useState<ThumbnailIdea[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a video title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas(null);

    try {
      const result = await generateThumbnailIdeas(title);
      setIdeas(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Thumbnail Idea Generator"
      description="Enter your video title, and Medusa will brainstorm high-impact thumbnail concepts to boost your click-through rate."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 'I Tried a 30-Day Digital Detox'"
          className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-fuchsia-500 disabled:bg-fuchsia-800 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {ideas && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <h2 className="md:col-span-2 text-xl font-bold text-white">Generated Thumbnail Concepts</h2>
           {ideas.map((idea, index) => (
               <ThumbnailIdeaCard key={index} idea={idea} />
           ))}
        </div>
      )}
    </ToolContainer>
  );
};

export default ThumbnailIdeaGenerator;
