import type React from 'react';

export type AiTone = 'Professional' | 'Casual' | 'Witty' | 'Enthusiastic' | 'Informative';

export type ToolId = 
  | 'dashboard'
  | 'full-seo' 
  | 'title-generator' 
  | 'tags-generator' 
  | 'hashtag-generator' 
  | 'video-idea-generator' 
  | 'script-outline-generator'
  | 'video-script-generator'
  | 'hook-generator'
  | 'thumbnail-ideas'
  | 'community-post-generator'
  | 'content-repurposer'
  | 'brand-kit'
  | 'projects'
  | 'history'; // history is deprecated, replaced by projects

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface ToolGroup {
    groupName: string;
    tools: Tool[];
}

// --- Result Payloads ---

export interface SeoResult {
  titles: string[];
  description: string;
  keywords: string[];
  tags: string;
  disclaimer: string;
  hashtags: string[];
  chapters: { time: string; title: string }[];
}

export interface ScriptOutlineResult {
  title: string;
  hook: string;
  introduction: string;
  mainPoints: {
    title: string;
    talkingPoints: string[];
  }[];
  conclusion: string;
  cta: string;
}

export interface VideoScriptResult {
    title: string;
    script: {
        scene: string; // e.g., "Intro", "Main Point 1", "Outro"
        dialogue: string;
        visuals: string; // Description of on-screen visuals
    }[];
}

export interface ThumbnailIdea {
    concept: string;
    visuals: string;
    textOverlay: string;
    colors: string;
}

export interface HookIntro {
    hook: string;
    introduction: string;
}

export interface CommunityPostIdea {
    textPosts: {
        content: string;
        cta: string;
    }[];
    polls: {
        question: string;
        options: string[];
    }[];
}

export interface RepurposingResult {
    shorts: {
        idea: string;
        scriptHook: string;
        visualSuggestion: string;
    }[];
    blogOutline: {
        title: string;
        introduction: string;
        mainPoints: string[];
        conclusion: string;
    };
    tweetThread: {
        hook: string;
        tweets: string[];
    };
}

// --- Brand Kit ---

export interface CtaLink {
    id: string;
    label: string;
    url: string;
}

export interface BrandKit {
    channelName: string;
    channelDescription: string;
    targetAudience: string;
    ctaLinks: CtaLink[];
    standardDisclaimer: string;
}

// --- Project System ---

export type AssetType = 
 | 'full-seo'
 | 'titles'
 | 'tags'
 | 'hashtags'
 | 'video-ideas'
 | 'script-outline'
 | 'video-script'
 | 'hooks-intros'
 | 'thumbnail-ideas'
 | 'community-posts'
 | 'repurposed-content';

export type AssetPayload = 
 | SeoResult 
 | string[] 
 | ScriptOutlineResult
 | VideoScriptResult
 | HookIntro[]
 | ThumbnailIdea[]
 | CommunityPostIdea
 | RepurposingResult;

export interface ProjectAsset {
    id: string;
    type: AssetType;
    timestamp: string;
    query: string;
    payload: AssetPayload;
}

export interface Project {
    id: string;
    title: string;
    topic: string;
    createdAt: string;
    updatedAt: string;
    assets: ProjectAsset[];
}


// --- Deprecated ---

export type HistoryResult = SeoResult | ScriptOutlineResult;

export interface HistoryItem {
  id: string;
  timestamp: string;
  query: string;
  result: HistoryResult;
  type: 'full-seo' | 'script-outline-generator';
}