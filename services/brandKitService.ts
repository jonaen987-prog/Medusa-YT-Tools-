import type { BrandKit } from '../types';

const BRAND_KIT_KEY = 'medusa-yt-tools-brand-kit';

const defaultBrandKit: BrandKit = {
    channelName: '',
    channelDescription: '',
    targetAudience: '',
    ctaLinks: [],
    standardDisclaimer: ''
};

export const getBrandKit = (): BrandKit => {
    try {
        const storedKit = localStorage.getItem(BRAND_KIT_KEY);
        if (storedKit) {
            const parsed = JSON.parse(storedKit);
            // Ensure ctaLinks is always an array
            if (!Array.isArray(parsed.ctaLinks)) {
                parsed.ctaLinks = [];
            }
            return { ...defaultBrandKit, ...parsed };
        }
        return defaultBrandKit;
    } catch (error) {
        console.error("Failed to get Brand Kit from localStorage", error);
        return defaultBrandKit;
    }
};

export const saveBrandKit = (brandKit: BrandKit): void => {
    try {
        localStorage.setItem(BRAND_KIT_KEY, JSON.stringify(brandKit));
    } catch (error) {
        console.error("Failed to save Brand Kit to localStorage", error);
    }
};