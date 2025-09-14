import React, { useState, useEffect } from 'react';
import ToolContainer from '../components/ToolContainer';
import { getBrandKit, saveBrandKit } from '../services/brandKitService';
import type { BrandKit, CtaLink } from '../types';

const BrandKitManager: React.FC = () => {
    const [brandKit, setBrandKit] = useState<BrandKit>(getBrandKit());
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBrandKit(prev => ({ ...prev, [name]: value }));
    };

    const handleLinkChange = (index: number, field: keyof CtaLink, value: string) => {
        const newLinks = [...brandKit.ctaLinks];
        // @ts-ignore
        newLinks[index][field] = value;
        setBrandKit(prev => ({ ...prev, ctaLinks: newLinks }));
    };
    
    const addLink = () => {
        setBrandKit(prev => ({
            ...prev,
            ctaLinks: [...prev.ctaLinks, { id: Date.now().toString(), label: '', url: '' }]
        }));
    };

    const removeLink = (index: number) => {
        const newLinks = brandKit.ctaLinks.filter((_, i) => i !== index);
        setBrandKit(prev => ({ ...prev, ctaLinks: newLinks }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        saveBrandKit(brandKit);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };
    
    return (
        <ToolContainer
            title="Channel Brand Kit"
            description="Define your channel's identity here. The information saved will be available in other tools, like the Full SEO Maker, to ensure consistency across your content."
        >
            <form onSubmit={handleSave} className="space-y-8">
                {/* Channel Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-fuchsia-400 border-b border-gray-700 pb-2">Channel Information</h3>
                    <div>
                        <label htmlFor="channelName" className="block text-sm font-medium text-gray-300 mb-2">Channel Name</label>
                        <input type="text" name="channelName" id="channelName" value={brandKit.channelName} onChange={handleInputChange} placeholder="e.g., Medusa Creative" className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                        <input type="text" name="targetAudience" id="targetAudience" value={brandKit.targetAudience} onChange={handleInputChange} placeholder="e.g., Aspiring YouTube creators and digital marketers" className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg" />
                    </div>
                     <div>
                        <label htmlFor="channelDescription" className="block text-sm font-medium text-gray-300 mb-2">Standard Channel Description / About Me</label>
                        <textarea name="channelDescription" id="channelDescription" value={brandKit.channelDescription} onChange={handleInputChange} rows={4} placeholder="A short paragraph that describes what your channel is about." className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg resize-y" />
                    </div>
                </div>

                {/* CTA Links Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-fuchsia-400 border-b border-gray-700 pb-2">Standard Call-to-Action Links</h3>
                     <div className="space-y-3">
                        {brandKit.ctaLinks.map((link, index) => (
                            <div key={link.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                <input type="text" value={link.label} onChange={(e) => handleLinkChange(index, 'label', e.target.value)} placeholder="Label (e.g., Follow me on X)" className="flex-1 p-2 bg-[#0f0f1b] border border-gray-600 rounded-md text-sm" />
                                <input type="url" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} placeholder="https://..." className="flex-1 p-2 bg-[#0f0f1b] border border-gray-600 rounded-md text-sm" />
                                <button type="button" onClick={() => removeLink(index)} className="p-2 bg-red-800/50 hover:bg-red-700/70 rounded-md text-red-200" aria-label="Remove Link">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addLink} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500">Add Link</button>
                </div>

                 {/* Disclaimer Section */}
                <div className="space-y-4">
                     <h3 className="text-xl font-bold text-fuchsia-400 border-b border-gray-700 pb-2">Standard Disclaimer</h3>
                     <div>
                        <label htmlFor="standardDisclaimer" className="block text-sm font-medium text-gray-300 mb-2">Disclaimer Text</label>
                        <textarea name="standardDisclaimer" id="standardDisclaimer" value={brandKit.standardDisclaimer} onChange={handleInputChange} rows={3} placeholder="e.g., The opinions expressed in this video are my own. Any links in the description may be affiliate links." className="w-full p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg resize-y" />
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <button type="submit" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700">
                        Save Brand Kit
                    </button>
                    {showSuccess && <p className="text-green-400 animate-fade-in">Brand Kit saved successfully!</p>}
                </div>
            </form>
        </ToolContainer>
    );
};

export default BrandKitManager;