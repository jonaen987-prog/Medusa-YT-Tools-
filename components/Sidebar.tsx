import React from 'react';
import Header from './Header';
import { TOOL_GROUPS, DASHBOARD_TOOL } from '../constants';
import type { Tool } from '../types';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  setInfoModalContent: (content: 'about' | 'privacy' | 'how-to-use') => void;
  onSettingsClick: () => void;
}

const CogIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool, setInfoModalContent, onSettingsClick }) => {
  const renderToolButton = (tool: Tool) => {
    const isActive = activeTool.id === tool.id || (tool.id === 'projects' && activeTool.id === 'history'); // Treat history as projects
    return (
      <button
        key={tool.id}
        onClick={() => setActiveTool(tool)}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 group ${
          isActive
            ? 'bg-fuchsia-600/80 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700/50 hover:scale-105 hover:shadow-xl'
        }`}
      >
        <span className={`
          transition-transform duration-300 ease-out
          ${isActive
              ? 'animate-icon-pulse'
              : 'group-hover:scale-125 group-hover:-rotate-12'
          }
          ${isActive ? 'text-white' : 'text-fuchsia-400'}
        `}>
          {tool.icon}
        </span>
        <span className="font-semibold text-sm">{tool.name}</span>
      </button>
    )
  };

  return (
    <aside className="w-64 md:w-72 bg-[#1a1a2e] flex flex-col flex-shrink-0 h-full border-r border-gray-800">
      <Header />
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div>
          {renderToolButton(DASHBOARD_TOOL)}
        </div>
        <div className="border-t border-gray-700/50 pt-4 space-y-4">
            {TOOL_GROUPS.map((group) => (
            <div key={group.groupName}>
                <h3 className="px-3 pb-2 text-xs font-bold uppercase text-gray-500 tracking-wider">{group.groupName}</h3>
                <div className="space-y-2">
                {group.tools.map((tool) => renderToolButton(tool))}
                </div>
            </div>
            ))}
        </div>
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        <div className="flex justify-center items-center space-x-4 mb-3">
            <button onClick={() => setInfoModalContent('about')} className="hover:text-fuchsia-400 transition-colors">About</button>
            <button onClick={() => setInfoModalContent('privacy')} className="hover:text-fuchsia-400 transition-colors">Privacy</button>
            <button onClick={() => setInfoModalContent('how-to-use')} className="hover:text-fuchsia-400 transition-colors">How to Use</button>
            <button onClick={onSettingsClick} className="hover:text-fuchsia-400 transition-colors" aria-label="Settings">
              <CogIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Medusa Tools. All rights reserved.</p>
            <p className="mt-1">Powered by Gemini</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;