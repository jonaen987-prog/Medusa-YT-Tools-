import React, { useState } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateVideoScript } from '../services/geminiService';
import { saveAssetToProject } from '../services/projectService';
import type { VideoScriptResult } from '../types';
import ProjectSelector from '../components/ProjectSelector';
import CopyButton from '../components/CopyButton';

const VideoScriptGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('Under 5 minutes');
  const [script, setScript] = useState<VideoScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setScript(null);

    try {
      const result = await generateVideoScript(topic, length);
      setScript(result);
      if (selectedProjectId) {
        saveAssetToProject(selectedProjectId, {
          type: 'video-script',
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
  
  const formatScriptForCopy = (script: VideoScriptResult | null): string => {
    if (!script) return '';
    let text = `Title: ${script.title}\n\n`;
    script.script.forEach(scene => {
        text += `--- ${scene.scene.toUpperCase()} ---\n\n`;
        text += `VISUALS:\n${scene.visuals}\n\n`;
        text += `DIALOGUE:\n${scene.dialogue}\n\n`;
    });
    return text;
  };

  return (
    <ToolContainer
      title="Full Video Script Generator"
      description="Enter your video topic and desired length, and Medusa will generate a complete, ready-to-record script with dialogue and visual cues."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">Video Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'The complete guide to homemade pasta'"
            className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">Desired Video Length</label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg"
          >
            <option>Under 5 minutes</option>
            <option>5-10 minutes</option>
            <option>10-15 minutes</option>
            <option>Over 15 minutes</option>
          </select>
        </div>
        <ProjectSelector selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 border border-transparent font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-800"
        >
          {isLoading ? 'Generating Script...' : 'Generate Full Script'}
        </button>
      </form>

      {isLoading && <div className="mt-6"><Loader /></div>}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}

      {script && (
        <div className="mt-8 relative bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-6 space-y-6">
            <CopyButton textToCopy={formatScriptForCopy(script)} />
            <div className="text-center border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-fuchsia-400">Video Script: {script.title}</h2>
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                {script.script.map((scene, index) => (
                    <div key={index} className="p-4 bg-gray-800/60 rounded-lg">
                        <h3 className="text-xl font-bold text-fuchsia-300 border-b border-gray-600 pb-2 mb-3">{scene.scene}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="md:col-span-2">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Visuals</h4>
                                <p className="text-gray-300 text-sm whitespace-pre-wrap">{scene.visuals}</p>
                            </div>
                             <div className="md:col-span-3">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Dialogue</h4>
                                <p className="text-gray-200 text-sm whitespace-pre-wrap">{scene.dialogue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </ToolContainer>
  );
};

export default VideoScriptGenerator;