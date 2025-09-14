import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import CopyButton from '../components/CopyButton';
import { generateHookAndIntro } from '../services/geminiService';
import type { HookIntro } from '../types';

const HookIntroCard: React.FC<{ item: HookIntro }> = ({ item }) => (
    <div className="relative bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4 space-y-2">
        <CopyButton textToCopy={`Hook: ${item.hook}\n\nIntroduction: ${item.introduction}`} />
        <div>
            <h4 className="text-sm font-semibold text-fuchsia-400">Hook</h4>
            <p className="text-gray-300">{item.hook}</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-400">Introduction</h4>
            <p className="text-gray-300">{item.introduction}</p>
        </div>
    </div>
);


const HookGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<HookIntro[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const generatedResults = await generateHookAndIntro(topic);
      setResults(generatedResults);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Video Hook & Intro Generator"
      description="Enter your video topic to generate catchy hooks and introductions designed to capture viewer attention instantly."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'The science of making perfect coffee'"
          className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-fuchsia-500 disabled:bg-fuchsia-800 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Generate Hooks'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {results && (
        <div className="mt-8 space-y-4">
           <h2 className="text-xl font-bold text-white">Generated Hooks & Intros</h2>
           {results.map((item, index) => (
               <HookIntroCard key={index} item={item} />
           ))}
        </div>
      )}
    </ToolContainer>
  );
};

export default HookGenerator;
