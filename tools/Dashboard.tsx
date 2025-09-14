import React, { useState, useEffect } from 'react';
import { ALL_TOOLS } from '../constants';
import type { Tool, ToolId, Project } from '../types';
import { getLatestProjects, createProject } from '../services/projectService';
import { getChecklistState, saveChecklistState, CHECKLIST_ITEMS } from '../services/checklistService';

interface DashboardProps {
  setActiveTool: (tool: Tool) => void;
}

const QuickStartCard: React.FC<{ tool: Tool; onClick: () => void; }> = ({ tool, onClick }) => (
  <button 
    onClick={onClick}
    className="interactive-card w-full flex items-start space-x-4 p-4 bg-[#1a1a2e]/60 border border-gray-700/50 rounded-xl text-left"
  >
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg text-fuchsia-400">
      {tool.icon}
    </div>
    <div>
      <h3 className="font-bold text-white">{tool.name}</h3>
      <p className="text-sm text-gray-400">{tool.description}</p>
    </div>
  </button>
);

const ProjectItemCard: React.FC<{ project: Project; onClick: () => void; }> = ({ project, onClick }) => {
    const FolderIcon = ALL_TOOLS.find(t => t.id === 'projects')?.icon;
    return (
     <button 
        onClick={onClick}
        className="interactive-card w-full flex items-center space-x-4 p-4 bg-[#1a1a2e]/60 border border-gray-700/50 rounded-xl text-left"
    >
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg text-fuchsia-400">
            {FolderIcon}
        </div>
        <div className="flex-1">
             <p className="font-semibold text-gray-200 text-sm">{project.title}</p>
             <p className="text-xs text-gray-400 truncate pr-4">Topic: "{project.topic}"</p>
        </div>
        <p className="text-xs text-gray-500 flex-shrink-0">{new Date(project.updatedAt).toLocaleDateString()}</p>
    </button>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ setActiveTool }) => {
    const [latestProjects, setLatestProjects] = useState<Project[]>([]);
    const [checkedItems, setCheckedItems] = useState<string[]>(getChecklistState());
    
    useEffect(() => {
        setLatestProjects(getLatestProjects(3));
    }, []);

    const navigateToTool = (toolId: ToolId) => {
        const tool = ALL_TOOLS.find(t => t.id === toolId);
        if (tool) {
            setActiveTool(tool);
        }
    }
    
    const handleCreateProject = () => {
        const title = prompt("Enter a title for your new video project:");
        if (title) {
            const topic = prompt("Enter the main topic or idea for this project:");
            if(topic) {
                createProject(title, topic);
                navigateToTool('projects');
            }
        }
    };

    const handleChecklistToggle = (item: string) => {
        const newCheckedItems = checkedItems.includes(item)
            ? checkedItems.filter(i => i !== item)
            : [...checkedItems, item];
        setCheckedItems(newCheckedItems);
        saveChecklistState(newCheckedItems);
    };

    const quickStartTools: ToolId[] = ['full-seo', 'video-script-generator', 'thumbnail-ideas', 'content-repurposer'];
    const toolsToShow = ALL_TOOLS.filter(t => quickStartTools.includes(t.id));

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Welcome back, Creator!</h1>
                <p className="mt-2 text-lg text-gray-400">Ready to create something amazing? Get started with a popular tool or revisit your recent work.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-fuchsia-400">Quick Start</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {toolsToShow.map(tool => (
                            <QuickStartCard key={tool.id} tool={tool} onClick={() => navigateToTool(tool.id)} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-fuchsia-400">Recent Projects</h2>
                     {latestProjects.length > 0 ? (
                        <div className="space-y-4">
                           {latestProjects.map(item => (
                               <ProjectItemCard key={item.id} project={item} onClick={() => navigateToTool('projects')} />
                           ))}
                        </div>
                    ) : (
                         <div className="text-center p-8 bg-[#1a1a2e]/60 border border-dashed border-gray-700/50 rounded-xl">
                            <p className="text-gray-400">Your recent projects will appear here.</p>
                        </div>
                    )}
                    <button onClick={handleCreateProject} className="w-full bg-fuchsia-600 text-white font-bold py-3 px-4 rounded-lg">
                        + Start a New Project
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-fuchsia-400 mb-4">Creator's Checklist</h2>
                <div className="p-6 bg-[#1a1a2e]/60 border border-gray-700/50 rounded-xl space-y-3">
                    {CHECKLIST_ITEMS.map((item) => (
                        <div key={item} className="flex items-center">
                            <input
                                id={`checklist-${item}`}
                                type="checkbox"
                                checked={checkedItems.includes(item)}
                                onChange={() => handleChecklistToggle(item)}
                                className="h-4 w-4 text-fuchsia-600 bg-gray-700 border-gray-600 rounded focus:ring-fuchsia-500 cursor-pointer"
                            />
                            <label htmlFor={`checklist-${item}`} className={`ml-3 text-sm font-medium cursor-pointer ${checkedItems.includes(item) ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;