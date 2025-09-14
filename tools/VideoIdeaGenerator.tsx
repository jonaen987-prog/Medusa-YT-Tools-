
import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateSimpleList } from '../services/geminiService';
import OutputCard from '../components/OutputCard';

const VideoIdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas(null);

    try {
      const result = await generateSimpleList(topic, 'ideas');
      setIdeas(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Video Idea Generator"
      description="Feeling stuck? Enter a general topic or niche, and let Medusa brainstorm some creative video ideas for you."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'sustainable living' or 'history of video games'"
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
        <div className="mt-8">
            {/* Fix: Replaced incorrect 'isList' prop with 'variant="list"' to match component props. */}
            <OutputCard title="Generated Video Ideas" content={ideas} variant="list" />
        </div>
      )}
    </ToolContainer>
  );
};

export default VideoIdeaGenerator;
