import React, { useState, useEffect } from 'react';
import ToolContainer from '../components/ToolContainer';
import OutputCard from '../components/OutputCard';
import { getProjects, createProject, deleteProject, updateProject } from '../services/projectService';
import type { Project, ProjectAsset, SeoResult, ScriptOutlineResult, VideoScriptResult, CommunityPostIdea, HookIntro, ThumbnailIdea, RepurposingResult, Tool } from '../types';

interface ProjectsProps {
  setActiveTool: (tool: Tool) => void;
}

const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const Projects: React.FC<ProjectsProps> = ({ setActiveTool }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    useEffect(() => {
        setProjects(getProjects());
    }, []);
    
    const refreshProjects = () => {
        setProjects(getProjects());
    };

    const handleCreateProject = () => {
        const title = prompt("Enter a title for your new video project:");
        if (title) {
            const topic = prompt("Enter the main topic or idea for this project:");
            if (topic) {
                const newProject = createProject(title, topic);
                setProjects(prev => [newProject, ...prev]);
                setActiveProject(newProject);
            }
        }
    };
    
    const handleDeleteProject = (id: string) => {
        if(window.confirm('Are you sure you want to delete this entire project and all its assets? This cannot be undone.')) {
            deleteProject(id);
            if(activeProject?.id === id) {
                setActiveProject(null);
            }
            refreshProjects();
        }
    };

    const renderAsset = (asset: ProjectAsset) => {
        switch(asset.type) {
            case 'full-seo':
                const seo = asset.payload as SeoResult;
                return (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <OutputCard title="Titles" content={seo.titles} variant="list" />
                        <OutputCard title="Chapters" content={seo.chapters.map(c => `${c.time} - ${c.title}`)} variant="chapters" />
                        <div className="md:col-span-2"><OutputCard title="Description" content={seo.description} /></div>
                        <div className="md:col-span-2"><OutputCard title="Keywords" content={seo.keywords} variant="tags" /></div>
                        <OutputCard title="Tags" content={seo.tags.split(',').map(t=>t.trim())} variant="tags" />
                        <OutputCard title="Hashtags" content={seo.hashtags} variant="tags" />
                    </div>
                );
            case 'titles':
            case 'hashtags':
            case 'tags':
            case 'video-ideas':
                 return <OutputCard title="Generated Items" content={asset.payload as string[]} variant="list" />;
            case 'script-outline':
                const outline = asset.payload as ScriptOutlineResult;
                 return <OutputCard title="Script Outline" content={`Title: ${outline.title}\n\nHook: ${outline.hook}\n...`} />;
            // Add more cases for new asset types
            default:
                return <p>Unsupported asset type.</p>
        }
    }

    if (activeProject) {
        return (
            <ToolContainer title={activeProject.title} description={`Topic: ${activeProject.topic}`}>
                 <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setActiveProject(null)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500">
                        &larr; Back to All Projects
                    </button>
                    <button onClick={() => handleDeleteProject(activeProject.id)} className="p-2 bg-red-800/50 hover:bg-red-700/70 rounded-md text-red-200" aria-label="Delete Project">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-6">
                    {activeProject.assets.length > 0 ? activeProject.assets.map(asset => (
                        <div key={asset.id} className="bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-fuchsia-400 capitalize">{asset.type.replace('-', ' ')}</h3>
                            <p className="text-xs text-gray-500 mb-2">Generated on {new Date(asset.timestamp).toLocaleString()}</p>
                            {renderAsset(asset)}
                        </div>
                    )) : <p>No assets have been generated for this project yet.</p>}
                </div>
            </ToolContainer>
        )
    }

    return (
        <ToolContainer
            title="My Projects"
            description="Manage all your video projects here. Each project contains all the AI-generated assets for a specific video idea."
        >
            <div className="flex justify-end mb-6">
                <button onClick={handleCreateProject} className="bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-lg">
                    + Create New Project
                </button>
            </div>
            {projects.length > 0 ? (
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="flex items-center justify-between p-4 bg-[#0f0f1b]/70 border border-gray-700 rounded-lg">
                            <button onClick={() => setActiveProject(project)} className="text-left flex-grow">
                                <h3 className="font-bold text-white hover:text-fuchsia-400 transition-colors">{project.title}</h3>
                                <p className="text-sm text-gray-400">Topic: {project.topic}</p>
                                <p className="text-xs text-gray-500 mt-1">Last updated: {new Date(project.updatedAt).toLocaleString()}</p>
                            </button>
                             <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-red-800/50 hover:bg-red-700/70 rounded-md text-red-200" aria-label="Delete Project">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-white">No Projects Found</h3>
                    <p className="mt-1 text-sm text-gray-400">
                       Click "Create New Project" to get started.
                    </p>
                </div>
            )}
        </ToolContainer>
    );
};

export default Projects;