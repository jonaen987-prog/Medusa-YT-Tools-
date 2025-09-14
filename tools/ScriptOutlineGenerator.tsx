import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateScriptOutline } from '../services/geminiService';
import { saveAssetToProject } from '../services/projectService';
import type { ScriptOutlineResult } from '../types';
import CopyButton from '../components/CopyButton';
import ProjectSelector from '../components/ProjectSelector';

const ScriptOutlineGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState<ScriptOutlineResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a video topic or idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutline(null);

    try {
      const result = await generateScriptOutline(topic);
      setOutline(result);
      if(selectedProjectId) {
          saveAssetToProject(selectedProjectId, {
            type: 'script-outline',
            query: topic,
            payload: result,
          });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatOutlineForCopy = (outline: ScriptOutlineResult | null): string => {
    if (!outline) return '';
    let text = `Title: ${outline.title}\n\n`;
    text += `Hook: ${outline.hook}\n\n`;
    text += `Introduction:\n${outline.introduction}\n\n`;
    text += '--- Main Points ---\n\n';
    outline.mainPoints.forEach((point, index) => {
      text += `${index + 1}. ${point.title}\n`;
      point.talkingPoints.forEach(tp => {
        text += `   - ${tp}\n`;
      });
      text += '\n';
    });
    text += '--- Conclusion ---\n\n';
    text += `${outline.conclusion}\n\n`;
    text += `Call to Action: ${outline.cta}\n`;
    return text;
  };

  return (
    <ToolContainer
      title="Script Outline Generator"
      description="Enter your video idea, and Medusa will generate a structured script outline to guide your content creation."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic-input" className="block text-sm font-medium text-gray-300 mb-2">Video Topic or Idea</label>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'The Surprising History of Coffee'"
            className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500"
          />
        </div>

        <ProjectSelector selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-fuchsia-500 disabled:bg-fuchsia-800 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Generate Outline'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {outline && (
        <div className="mt-8 relative bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-6 space-y-6">
            <CopyButton textToCopy={formatOutlineForCopy(outline)} />
            <div className="text-center border-b border-gray-700 pb-4">
                <h3 className="text-2xl font-bold text-fuchsia-400">Title Suggestion</h3>
                <p className="text-xl text-white mt-1">{outline.title}</p>
            </div>
            
            <div>
                <h4 className="text-lg font-semibold text-fuchsia-400 mb-2">Hook (First 30s)</h4>
                <p className="text-gray-300 bg-gray-800/50 p-3 rounded-md text-sm">{outline.hook}</p>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-fuchsia-400 mb-2">Introduction</h4>
                <p className="text-gray-300 whitespace-pre-wrap text-sm">{outline.introduction}</p>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-fuchsia-400 mb-2">Main Points</h4>
                <div className="space-y-4">
                    {outline.mainPoints.map((point, index) => (
                        <div key={index} className="p-3 bg-gray-800/50 rounded-md">
                            <h5 className="font-bold text-gray-200">{index + 1}. {point.title}</h5>
                            <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-sm text-gray-300">
                                {point.talkingPoints.map((tp, i) => <li key={i}>{tp}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-fuchsia-400 mb-2">Conclusion</h4>
                <p className="text-gray-300 whitespace-pre-wrap text-sm">{outline.conclusion}</p>
            </div>
            
             <div>
                <h4 className="text-lg font-semibold text-fuchsia-400 mb-2">Call to Action (CTA)</h4>
                <p className="text-gray-300 bg-gray-800/50 p-3 rounded-md text-sm">{outline.cta}</p>
            </div>

        </div>
      )}
    </ToolContainer>
  );
};

export default ScriptOutlineGenerator;