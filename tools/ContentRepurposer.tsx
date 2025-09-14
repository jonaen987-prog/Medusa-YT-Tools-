import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateRepurposedContent } from '../services/geminiService';
import type { RepurposingResult } from '../types';
import CopyButton from '../components/CopyButton';

const loaderMessages = [
  "Analyzing your script for key moments...",
  "Brainstorming short-form video ideas...",
  "Structuring a blog post outline...",
  "Crafting a catchy tweet thread...",
  "Maximizing your content's reach...",
];

const ContentRepurposer: React.FC = () => {
  const [script, setScript] = useState('');
  const [result, setResult] = useState<RepurposingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) {
      setError('Please enter a video script to repurpose.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedResult = await generateRepurposedContent(script);
      setResult(generatedResult);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Content Repurposing Helper"
      description="Paste your video script to generate ideas for Shorts, a blog post outline, and a tweet thread to maximize your content's impact."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
           <label htmlFor="script" className="block text-sm font-medium text-gray-300 mb-2">Video Script</label>
           <textarea
            id="script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your full video script here..."
            className="w-full h-64 p-4 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500 resize-y"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-800"
        >
          {isLoading ? 'Generating...' : 'Repurpose Content'}
        </button>
      </form>

      {isLoading && <Loader messages={loaderMessages} />}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {result && (
        <div className="mt-8 space-y-8">
            {/* Shorts Ideas */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-fuchsia-400">Short-form Video Ideas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.shorts.map((short, index) => (
                        <div key={index} className="bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4 space-y-2">
                            <h3 className="font-semibold text-gray-200">{short.idea}</h3>
                            <p className="text-sm text-gray-400"><strong className="text-gray-300">Hook:</strong> "{short.scriptHook}"</p>
                            <p className="text-sm text-gray-400"><strong className="text-gray-300">Visuals:</strong> {short.visualSuggestion}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Post Outline */}
            <div className="relative p-6 bg-[#0f0f1b]/70 border border-gray-700 rounded-lg space-y-4">
                <CopyButton textToCopy={
`Title: ${result.blogOutline.title}

${result.blogOutline.introduction}

Main Points:
${result.blogOutline.mainPoints.map(p => `- ${p}`).join('\n')}

${result.blogOutline.conclusion}`
                } />
                <h2 className="text-2xl font-bold text-fuchsia-400">Blog Post Outline</h2>
                <div>
                    <h3 className="font-bold text-white">{result.blogOutline.title}</h3>
                    <p className="mt-2 text-gray-300">{result.blogOutline.introduction}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-300">Main Points:</h4>
                    <ul className="list-disc list-inside mt-1 text-gray-400 space-y-1">
                        {result.blogOutline.mainPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
                <p className="text-gray-300 pt-2 border-t border-gray-700">{result.blogOutline.conclusion}</p>
            </div>

             {/* Tweet Thread */}
            <div className="relative p-6 bg-[#0f0f1b]/70 border border-gray-700 rounded-lg space-y-3">
                 <CopyButton textToCopy={`1/ ${result.tweetThread.hook}\n\n${result.tweetThread.tweets.map((t, i) => `${i+2}/ ${t}`).join('\n\n')}`} />
                <h2 className="text-2xl font-bold text-fuchsia-400">Tweet Thread Idea</h2>
                <div className="p-3 bg-gray-800/50 rounded-md">
                    <p className="font-semibold text-gray-200">1/ {result.tweetThread.hook} 🧵</p>
                </div>
                <div className="pl-4 border-l-2 border-gray-700 space-y-3">
                    {result.tweetThread.tweets.map((tweet, i) => (
                        <div key={i} className="p-3 bg-gray-800/50 rounded-md">
                           <p className="text-gray-300">{i + 2}/ {tweet}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </ToolContainer>
  );
};

export default ContentRepurposer;