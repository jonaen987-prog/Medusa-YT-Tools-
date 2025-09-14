import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateCommunityPostIdeas } from '../services/geminiService';
import { saveAssetToProject } from '../services/projectService';
import type { CommunityPostIdea } from '../types';
import ProjectSelector from '../components/ProjectSelector';

const CommunityPostGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<CommunityPostIdea | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a channel topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const postIdeas = await generateCommunityPostIdeas(topic);
      setResults(postIdeas);
      if (selectedProjectId) {
        saveAssetToProject(selectedProjectId, {
          type: 'community-posts',
          query: topic,
          payload: postIdeas,
        });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Community Post Generator"
      description="Enter your general channel topic to generate engaging text posts and polls for your YouTube Community Tab."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">Channel Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'Vintage Tech Restoration' or 'Spicy Food Challenges'"
            className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg"
          />
        </div>
        <ProjectSelector selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-800"
        >
          {isLoading ? 'Generating Ideas...' : 'Generate Post Ideas'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}

      {results && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-fuchsia-400">Text Post Ideas</h2>
            {results.textPosts.map((post, index) => (
              <div key={index} className="bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4">
                <p className="text-gray-200">{post.content}</p>
                <p className="mt-3 text-sm font-semibold text-fuchsia-300">{post.cta}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-fuchsia-400">Poll Ideas</h2>
            {results.polls.map((poll, index) => (
              <div key={index} className="bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4">
                <p className="font-semibold text-gray-200">{poll.question}</p>
                <ul className="mt-3 space-y-2">
                  {poll.options.map((option, i) => (
                    <li key={i} className="text-sm text-gray-300 bg-gray-800/50 p-2 rounded-md">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolContainer>
  );
};

export default CommunityPostGenerator;