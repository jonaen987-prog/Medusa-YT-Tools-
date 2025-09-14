import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { getProjects, createProject } from '../services/projectService';

interface ProjectSelectorProps {
    selectedProjectId: string | null;
    setSelectedProjectId: (id: string | null) => void;
    onProjectCreated?: (newProject: Project) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ selectedProjectId, setSelectedProjectId, onProjectCreated }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleCreateNewProject = () => {
        const title = prompt("Enter a title for your new video project:");
        if (title) {
            const topic = prompt("Enter the main topic for this project:", "Same as current query");
            if (topic) {
                const newProject = createProject(title, topic);
                setProjects(prev => [newProject, ...prev]);
                setSelectedProjectId(newProject.id);
                if(onProjectCreated) onProjectCreated(newProject);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value === 'new') {
            handleCreateNewProject();
        } else {
            setSelectedProjectId(value || null);
        }
    };

    return (
        <div>
            <label htmlFor="project-selector" className="block text-sm font-medium text-gray-300 mb-2">
                Save to Project
            </label>
            <div className="flex gap-2">
                <select
                    id="project-selector"
                    value={selectedProjectId || ''}
                    onChange={handleChange}
                    className="flex-grow p-3 bg-[#0f0f1b] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200"
                >
                    <option value="">Select a project (optional)</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                    <option value="new" className="text-fuchsia-400 font-semibold">
                        + Create New Project...
                    </option>
                </select>
            </div>
             <p className="mt-2 text-xs text-gray-400">
                Saving results to a project helps you keep all assets for a video organized in one place.
            </p>
        </div>
    );
};

export default ProjectSelector;