import React from 'react';
import type { Tool, ToolGroup } from './types';

// --- Icon Components ---

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);
const TitleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10h16V7M8 4h8M12 4v3" />
    </svg>
);
const TagIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V3a2 2 0 012-2z" />
    </svg>
);
const HashtagIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M5 9h14M5 15h14" />
    </svg>
);
const LightbulbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 017.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);
const DocumentTextIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
    </svg>
);
const FolderIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);
const ImageIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const MegaphoneIcon: React.FC<{className?: string}> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.148-6.136A1.76 1.76 0 015.882 11H1.76a1.76 1.76 0 01-1.76-1.76V8.76c0-.97.79-1.76 1.76-1.76h4.122c.673 0 1.282.386 1.583.985l2.148 6.136a1.76 1.76 0 01.294-1.558l-1.5-2.5a.5.5 0 01.866-.5l1.5 2.5a1.76 1.76 0 013.417-.592V5.882a1.76 1.76 0 012.87-1.447l1.5 2.5a.5.5 0 00.866-.5l-1.5-2.5a1.76 1.76 0 00-2.87-1.447z" />
    </svg>
);
const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const BrandIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
const RecycleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);
const FilmIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);
const ChatBubbleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);


// --- Tool Definitions ---

export const DASHBOARD_TOOL: Tool = {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Welcome to your creator dashboard.',
    icon: <HomeIcon className="w-5 h-5" />
};

export const TOOL_GROUPS: ToolGroup[] = [
    {
        groupName: "Core SEO",
        tools: [
            { id: 'full-seo', name: 'Full Video SEO Maker', description: 'Generate a complete SEO package from your script.', icon: <SparklesIcon className="w-5 h-5" /> },
            { id: 'title-generator', name: 'YT Title Generator', description: 'Create catchy titles for your videos.', icon: <TitleIcon className="w-5 h-5" /> },
            { id: 'tags-generator', name: 'YT Tags & Keywords Generator', description: 'Generate relevant tags and keywords.', icon: <TagIcon className="w-5 h-5" /> },
            { id: 'hashtag-generator', name: 'YT Hashtag Generator', description: 'Find popular and relevant hashtags.', icon: <HashtagIcon className="w-5 h-5" /> },
        ]
    },
    {
        groupName: "Creative Suite",
        tools: [
             { id: 'video-idea-generator', name: 'Video Idea Generator', description: 'Get creative video ideas for any topic.', icon: <LightbulbIcon className="w-5 h-5" /> },
             { id: 'script-outline-generator', name: 'Script Outline Generator', description: 'Create a structured outline for your video.', icon: <DocumentTextIcon className="w-5 h-5" /> },
             { id: 'video-script-generator', name: 'Full Video Script Generator', description: 'Generate a complete, ready-to-record script.', icon: <FilmIcon className="w-5 h-5" /> },
             { id: 'hook-generator', name: 'Video Hook & Intro Generator', description: 'Generate engaging hooks and introductions.', icon: <MegaphoneIcon className="w-5 h-5" /> },
             { id: 'thumbnail-ideas', name: 'Thumbnail Idea Generator', description: 'Brainstorm high-CTR thumbnail concepts.', icon: <ImageIcon className="w-5 h-5" /> },
             { id: 'community-post-generator', name: 'Community Post Generator', description: 'Create engaging text posts and polls.', icon: <ChatBubbleIcon className="w-5 h-5" /> },
             { id: 'content-repurposer', name: 'Content Repurposing Helper', description: 'Turn one script into multiple content pieces.', icon: <RecycleIcon className="w-5 h-5" /> },
        ]
    },
    {
        groupName: "Management",
        tools: [
            { id: 'brand-kit', name: 'Channel Brand Kit', description: 'Manage your channel identity and default links.', icon: <BrandIcon className="w-5 h-5" /> },
            { id: 'projects', name: 'My Projects', description: 'View and manage your video projects.', icon: <FolderIcon className="w-5 h-5" /> }
        ]
    }
];

export const ALL_TOOLS = [DASHBOARD_TOOL, ...TOOL_GROUPS.flatMap(g => g.tools)];