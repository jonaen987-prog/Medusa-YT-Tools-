import React, { useState, useEffect } from 'react';
import ToolContainer from '../components/ToolContainer';
import Loader from '../components/Loader';
import { generateFullSeo } from '../services/geminiService';
import { saveAssetToProject } from '../services/projectService';
import { getBrandKit } from '../services/brandKitService';
import type { SeoResult, BrandKit } from '../types';
import OutputCard from '../components/OutputCard';
import ProjectSelector from '../components/ProjectSelector';

const loaderMessages = [
  "Analyzing your script's key themes...",
  "Crafting compelling, SEO-friendly titles...",
  "Writing an engaging video description...",
  "Cross-referencing high-performing keywords...",
  "Generating relevant tags and hashtags...",
  "Structuring your video with chapters...",
  "Finalizing the SEO package...",
];

const FullSeoMaker: React.FC = () => {
  const [script, setScript] = useState('');
  const [cta, setCta] = useState('');
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [includeDescription, setIncludeDescription] = useState(true);
  const [includeLinks, setIncludeLinks] = useState(true);
  const [includeDisclaimer, setIncludeDisclaimer] = useState(true);

  useEffect(() => {
    setBrandKit(getBrandKit());
  }, []);

  const handleClear = () => {
    setScript('');
    setCta('');
    setSeoResult(null);
    setError(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) {
      setError('Please enter a video script.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSeoResult(null);

    try {
      let result = await generateFullSeo(script, cta);
      
      let finalDescription = result.description;
      if (brandKit) {
        if (includeDescription && brandKit.channelDescription) {
          finalDescription += `\n\n--- About My Channel ---\n${brandKit.channelDescription}`;
        }
        if (includeLinks && brandKit.ctaLinks.length > 0) {
          const linksText = brandKit.ctaLinks.map(link => `${link.label}: ${link.url}`).join('\n');
          finalDescription += `\n\n--- Links & Resources ---\n${linksText}`;
        }
        if (includeDisclaimer && brandKit.standardDisclaimer) {
           finalDescription += `\n\n---\n${brandKit.standardDisclaimer}`;
        }
      }
      result.description = finalDescription.trim();

      setSeoResult(result);
      if(selectedProjectId) {
          saveAssetToProject(selectedProjectId, {
            type: 'full-seo',
            query: script.substring(0, 100) + (script.length > 100 ? '...' : ''),
            payload: result,
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
      title="Full Video SEO Maker"
      description="Paste your video script below and our AI will generate a complete SEO package. Use the options to automatically include items from your Brand Kit."
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
        <div>
            <label htmlFor="cta" className="block text-sm font-medium text-gray-300 mb-2">Custom Call to Action (Optional)</label>
            <input
                id="cta"
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g., 'Check out our new merch, link in description!'"
                className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-gray-500"
            />
        </div>
        
        {brandKit && (
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand Kit Integration</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                      <input id="includeDescription" type="checkbox" checked={includeDescription} onChange={(e) => setIncludeDescription(e.target.checked)} className="h-4 w-4 text-fuchsia-600 bg-gray-700 border-gray-600 rounded focus:ring-fuchsia-500" />
                      <label htmlFor="includeDescription" className="ml-2 text-sm text-gray-300">Channel Description</label>
                  </div>
                  <div className="flex items-center">
                      <input id="includeLinks" type="checkbox" checked={includeLinks} onChange={(e) => setIncludeLinks(e.target.checked)} className="h-4 w-4 text-fuchsia-600 bg-gray-700 border-gray-600 rounded focus:ring-fuchsia-500" />
                      <label htmlFor="includeLinks" className="ml-2 text-sm text-gray-300">CTA Links</label>
                  </div>
                  <div className="flex items-center">
                      <input id="includeDisclaimer" type="checkbox" checked={includeDisclaimer} onChange={(e) => setIncludeDisclaimer(e.target.checked)} className="h-4 w-4 text-fuchsia-600 bg-gray-700 border-gray-600 rounded focus:ring-fuchsia-500" />
                      <label htmlFor="includeDisclaimer" className="ml-2 text-sm text-gray-300">Disclaimer</label>
                  </div>
              </div>
            </div>
        )}
        
        <ProjectSelector selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />

        <div className="flex flex-col sm:flex-row gap-4">
            <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-fuchsia-500 disabled:bg-fuchsia-800 disabled:cursor-not-allowed"
            >
            {isLoading ? 'Generating...' : 'Generate Full SEO'}
            </button>
            <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Clear
            </button>
        </div>
      </form>

      {isLoading && <Loader messages={loaderMessages} />}
      {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">{error}</div>}
      
      {seoResult && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <OutputCard title="Generated Titles" content={seoResult.titles} variant="list" />
            {seoResult.chapters && seoResult.chapters.length > 0 && (
                <OutputCard title="Generated Chapters" content={seoResult.chapters.map(c => `${c.time} - ${c.title}`)} variant="chapters" />
            )}
            <div className="md:col-span-2">
                <OutputCard title="Generated Description" content={seoResult.description} variant="text" />
            </div>
            <div className="md:col-span-2">
                <OutputCard title="Generated Keywords" content={seoResult.keywords} variant="tags" />
            </div>
            <OutputCard title="Generated Tags" content={seoResult.tags.split(',').map(t => t.trim())} variant="tags" />
            <OutputCard title="Generated Hashtags" content={seoResult.hashtags} variant="tags" />
             <div className="md:col-span-2">
                <OutputCard title="Generated Disclaimer" content={seoResult.disclaimer} variant="text" />
            </div>
        </div>
      )}
    </ToolContainer>
  );
};

export default FullSeoMaker;