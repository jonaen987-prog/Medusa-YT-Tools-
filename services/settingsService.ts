import type { AiTone } from '../types';

const TONE_KEY = 'medusa-yt-tools-tone';

export const TONES: AiTone[] = ['Professional', 'Casual', 'Witty', 'Enthusiastic', 'Informative'];

export const getTone = (): AiTone => {
    try {
        const storedTone = localStorage.getItem(TONE_KEY);
        if (storedTone && TONES.includes(storedTone as AiTone)) {
            return storedTone as AiTone;
        }
        return 'Professional'; // Default tone
    } catch (error) {
        console.error("Failed to get tone from localStorage", error);
        return 'Professional';
    }
};

export const saveTone = (tone: AiTone): void => {
    try {
        if (TONES.includes(tone)) {
            localStorage.setItem(TONE_KEY, tone);
        }
    } catch (error) {
        console.error("Failed to save tone to localStorage", error);
    }
};
