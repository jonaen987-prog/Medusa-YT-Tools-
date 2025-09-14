
import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateSimpleList } from '../services/geminiService';
import OutputCard from '../components/OutputCard';

const TagsGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState<string[] | null>(null);
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
    setTags(null);

    try {
      const result = await generateSimpleList(topic, 'tags');
      setTags(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="YT Tags & Keywords Generator"
      description="Provide a topic for your video, and our AI will generate a list of relevant tags and keywords to boost your video's discoverability."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'React tutorial for beginners'"
          className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-fuchsia-500 disabled:bg-fuchsia-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Tags'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {tags && (
        <div className="mt-8">
            <OutputCard title="Generated Tags & Keywords" content={tags} />
        </div>
      )}
    </ToolContainer>
  );
};

export default TagsGenerator;