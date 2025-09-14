const CHECKLIST_KEY = 'medusa-yt-tools-checklist';

export const CHECKLIST_ITEMS = [
    "Brainstorm your next video idea",
    "Generate a full video script",
    "Create a high-CTR thumbnail concept",
    "Generate a complete SEO package for your video",
    "Plan your content repurposing strategy",
    "Engage your audience with a Community Post",
    "Update your Channel Brand Kit",
];

export const getChecklistState = (): string[] => {
    try {
        const storedState = localStorage.getItem(CHECKLIST_KEY);
        return storedState ? JSON.parse(storedState) : [];
    } catch (error) {
        console.error("Failed to get checklist state from localStorage", error);
        return [];
    }
};

export const saveChecklistState = (state: string[]): void => {
     try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
    } catch (error) {
        console.error("Failed to save checklist state to localStorage", error);
    }
};