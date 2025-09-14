import type { Project, ProjectAsset, AssetType, AssetPayload } from '../types';

const PROJECTS_KEY = 'medusa-yt-tools-projects';

export const getProjects = (): Project[] => {
    try {
        const itemsJson = localStorage.getItem(PROJECTS_KEY);
        if (!itemsJson) return [];
        const items = JSON.parse(itemsJson) as Project[];
        return items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } catch (error) {
        console.error("Failed to parse projects from localStorage", error);
        return [];
    }
};

export const getLatestProjects = (count: number): Project[] => {
    const allProjects = getProjects();
    return allProjects.slice(0, count);
}

export const getProjectById = (id: string): Project | undefined => {
    return getProjects().find(p => p.id === id);
}

export const saveProjects = (projects: Project[]): void => {
    try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to save projects to localStorage", error);
    }
}

export const createProject = (title: string, topic: string): Project => {
    const now = new Date().toISOString();
    const newProject: Project = {
        id: now + Math.random().toString(36).substr(2, 9),
        title,
        topic,
        createdAt: now,
        updatedAt: now,
        assets: [],
    };
    const projects = getProjects();
    saveProjects([newProject, ...projects]);
    return newProject;
};

export const updateProject = (updatedProject: Project): void => {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
        projects[index] = {
            ...updatedProject,
            updatedAt: new Date().toISOString(),
        };
        saveProjects(projects);
    }
};

export const deleteProject = (id: string): void => {
    const projects = getProjects();
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
};

export const saveAssetToProject = (
    projectId: string,
    assetData: { type: AssetType; query: string; payload: AssetPayload }
): void => {
    const project = getProjectById(projectId);
    if (!project) return;
    
    const newAsset: ProjectAsset = {
        ...assetData,
        id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
    };

    project.assets.unshift(newAsset); // Add to the beginning
    updateProject(project);
}