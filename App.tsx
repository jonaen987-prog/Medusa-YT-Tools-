import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './tools/Dashboard';
import FullSeoMaker from './tools/FullSeoMaker';
import TitleGenerator from './tools/TitleGenerator';
import TagsGenerator from './tools/TagsGenerator';
import HashtagGenerator from './tools/HashtagGenerator';
import VideoIdeaGenerator from './tools/VideoIdeaGenerator';
import ScriptOutlineGenerator from './tools/ScriptOutlineGenerator';
import VideoScriptGenerator from './tools/VideoScriptGenerator';
import Projects from './tools/Projects';
import ThumbnailIdeaGenerator from './tools/ThumbnailIdeaGenerator';
import HookGenerator from './tools/HookGenerator';
import BrandKitManager from './tools/BrandKitManager';
import ContentRepurposer from './tools/ContentRepurposer';
import CommunityPostGenerator from './tools/CommunityPostGenerator';
import Modal from './components/Modal';
import SettingsModal from './components/SettingsModal';
import WelcomeModal from './components/WelcomeModal';
import type { Tool } from './types';
import { DASHBOARD_TOOL } from './constants';

const WELCOME_KEY = 'medusa-yt-tools-welcomed';

type ModalType = 'about' | 'privacy' | 'how-to-use' | null;

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(DASHBOARD_TOOL);
  const [infoModalContent, setInfoModalContent] = useState<ModalType>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  useEffect(() => {
    const hasBeenWelcomed = localStorage.getItem(WELCOME_KEY);
    if (!hasBeenWelcomed) {
      setIsWelcomeOpen(true);
    }
  }, []);

  const handleWelcomeClose = () => {
    localStorage.setItem(WELCOME_KEY, 'true');
    setIsWelcomeOpen(false);
  }

  const renderActiveTool = useCallback(() => {
    switch (activeTool.id) {
      case 'dashboard':
        return <Dashboard setActiveTool={setActiveTool} />;
      case 'full-seo':
        return <FullSeoMaker />;
      case 'title-generator':
        return <TitleGenerator />;
      case 'tags-generator':
        return <TagsGenerator />;
      case 'hashtag-generator':
        return <HashtagGenerator />;
      case 'video-idea-generator':
        return <VideoIdeaGenerator />;
      case 'script-outline-generator':
        return <ScriptOutlineGenerator />;
      case 'video-script-generator':
        return <VideoScriptGenerator />;
      case 'hook-generator':
        return <HookGenerator />;
      case 'thumbnail-ideas':
        return <ThumbnailIdeaGenerator />;
      case 'community-post-generator':
        return <CommunityPostGenerator />;
      case 'content-repurposer':
        return <ContentRepurposer />;
      case 'brand-kit':
        return <BrandKitManager />;
      case 'projects':
        return <Projects setActiveTool={setActiveTool}/>;
      default:
        return <Dashboard setActiveTool={setActiveTool} />;
    }
  }, [activeTool]);
  
  const getModalInfo = (): { title: string; content: React.ReactNode } => {
    switch (infoModalContent) {
        case 'about':
            return {
                title: 'About Medusa YT Tools',
                content: (
                    <>
                        <p>Welcome to Medusa YT Tools, a premium suite of AI-powered utilities designed to supercharge your YouTube content creation workflow.</p>
                        <p>Our goal is to help creators like you save time and optimize your videos for maximum reach and engagement. By leveraging the power of Google's advanced Gemini model, we provide instant, high-quality SEO packages, creative ideas, and structured video outlines.</p>
                        <p>Whether you're a seasoned YouTuber or just starting, Medusa is here to be your creative co-pilot. This application runs entirely in your browser, ensuring your data remains private and secure.</p>
                        <h4>Key Features:</h4>
                        <ul>
                            <li><strong>Project-Based Workflow:</strong> Organize all your assets for a video idea in one place.</li>
                            <li><strong>Full SEO Maker:</strong> Generate titles, descriptions, tags, and more from a single script.</li>
                            <li><strong>Creative Suite:</strong> Generate video ideas, full scripts, hooks, and even thumbnail concepts.</li>
                            <li><strong>Brand Kit:</strong> Define your channel's identity for consistent branding in your descriptions.</li>
                        </ul>
                    </>
                )
            };
        case 'privacy':
            return {
                title: 'Privacy Policy',
                content: (
                    <>
                        <p>We take your privacy very seriously. Here’s how Medusa handles your data:</p>
                        <ul>
                            <li><strong>Client-Side Only:</strong> This application runs entirely in your web browser. We do not have a server, and we do not log or track any of the data you input.</li>
                            <li><strong>Local Storage:</strong> Your projects, settings, and Brand Kit are saved in your browser's local storage. This data is stored only on your computer and is never transmitted to us.</li>
                            <li><strong>Direct to Google:</strong> The information you provide is sent directly from your browser to the Google Gemini API to generate results.</li>
                            <li><strong>API Key Security:</strong> Your Google Gemini API key is managed by the environment you are running this application in.</li>
                            <li><strong>No Cookies or Tracking:</strong> We do not use cookies or any third-party tracking scripts.</li>
                        </ul>
                        <p>In short, your creative work remains yours. We don't see it, we don't want it, and we don't store it (except in your own browser for your convenience).</p>
                    </>
                )
            };
        case 'how-to-use':
            return {
                title: 'How to Use Medusa YT Tools',
                content: (
                    <>
                        <p>Select a tool from the sidebar to get started. For a more personalized experience, configure your preferences:</p>
                        <h4>1. Manage Your Projects</h4>
                        <p>The "My Projects" tool is your central hub. Create new projects for your video ideas, and all your generated content (titles, scripts, etc.) will be saved there for easy access.</p>
                        <h4>2. Set Your Brand Kit</h4>
                        <p>Go to the "Channel Brand Kit" tool under "Management." Fill in your channel details, standard links, and disclaimers. This information can then be automatically added to your generated video descriptions in the "Full Video SEO Maker."</p>
                        <h4>3. Set Your AI Tone of Voice</h4>
                        <p>Click the gear icon in the sidebar to set a default tone for all AI generations. This helps ensure the output matches your brand's style.</p>
                        <h4>4. Explore the Creative Suite</h4>
                        <p>Use the "Full Video Script Generator" for complete scripts or the "Community Post Generator" to engage your audience. The other tools can help you brainstorm ideas, outlines, hooks, and thumbnail concepts.</p>
                    </>
                )
            };
        default:
            return { title: '', content: null };
    }
  };

  const { title: modalTitle, content: modalBody } = getModalInfo();

  return (
    <>
      <div className="flex h-screen bg-[#0f0f1b] text-gray-200">
        <Sidebar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          setInfoModalContent={setInfoModalContent}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {renderActiveTool()}
        </main>
      </div>
      <Modal
        isOpen={!!infoModalContent}
        onClose={() => setInfoModalContent(null)}
        title={modalTitle}
      >
        {modalBody}
      </Modal>
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={handleWelcomeClose}
      />
    </>
  );
};

export default App;