import { GoogleGenAI, Type } from "@google/genai";
import type { SeoResult, ScriptOutlineResult, ThumbnailIdea, HookIntro, RepurposingResult, VideoScriptResult, CommunityPostIdea } from '../types';
import { getTone } from './settingsService';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const addToneToPrompt = (prompt: string): string => {
    const tone = getTone();
    const toneInstruction = `\nIMPORTANT: Your response should have a ${tone} and engaging tone of voice.`;
    return prompt + toneInstruction;
}

const fullSeoSchema = {
  type: Type.OBJECT,
  properties: {
    titles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Three different, catchy, and SEO-optimized titles for the video. Each title should be under 70 characters.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed and engaging video description of about 200-300 words. It should summarize the script, include relevant keywords naturally, and have a clear call-to-action.",
    },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of at least 20 relevant keywords and long-tail keywords for the video.",
    },
    tags: {
      type: Type.STRING,
      description: "A single string of comma-separated tags. The total length of the string must be under 500 characters.",
    },
    disclaimer: {
      type: Type.STRING,
      description: "A standard, generic disclaimer for YouTube videos, mentioning things like fair use or affiliate links if applicable based on common practice.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5 to 10 relevant hashtags, each starting with '#'.",
    },
    chapters: {
        type: Type.ARRAY,
        description: "A list of video chapters based on the script's content flow. The first chapter should always start at '00:00'.",
        items: {
            type: Type.OBJECT,
            properties: {
                time: { type: Type.STRING, description: "Timestamp for the chapter start, e.g., '00:00' or '01:23'." },
                title: { type: Type.STRING, description: "A concise and descriptive title for the chapter." }
            },
            required: ["time", "title"]
        }
    }
  },
  required: ["titles", "description", "keywords", "tags", "disclaimer", "hashtags", "chapters"],
};

const scriptOutlineSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A catchy, SEO-friendly title for the video." },
        hook: { type: Type.STRING, description: "A compelling opening sentence or two (under 30 seconds) to grab the viewer's attention." },
        introduction: { type: Type.STRING, description: "A brief introduction (1-2 paragraphs) that sets up the topic and tells viewers what to expect." },
        mainPoints: {
            type: Type.ARRAY,
            description: "A list of 3-5 main sections for the video body. Each section should represent a key part of the content.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A clear heading for this section of the video." },
                    talkingPoints: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of bullet points or key ideas to discuss within this section."
                    }
                },
                required: ["title", "talkingPoints"]
            }
        },
        conclusion: { type: Type.STRING, description: "A summary of the key takeaways from the video." },
        cta: { type: Type.STRING, description: "A clear call-to-action, such as asking viewers to like, subscribe, or check out a link." }
    },
    required: ["title", "hook", "introduction", "mainPoints", "conclusion", "cta"]
};

const videoScriptSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A catchy, SEO-friendly title for the video." },
        script: {
            type: Type.ARRAY,
            description: "The full video script, broken down into scenes or sections.",
            items: {
                type: Type.OBJECT,
                properties: {
                    scene: { type: Type.STRING, description: "The name of the scene (e.g., 'Intro - Hook', 'Main Point 1: The Problem', 'Outro - CTA')." },
                    dialogue: { type: Type.STRING, description: "The exact words to be spoken by the narrator or host." },
                    visuals: { type: Type.STRING, description: "A description of the on-screen visuals, B-roll, text overlays, or graphics for this scene." },
                },
                required: ["scene", "dialogue", "visuals"]
            }
        }
    },
    required: ["title", "script"]
};

const communityPostSchema = {
    type: Type.OBJECT,
    properties: {
        textPosts: {
            type: Type.ARRAY,
            description: "A list of 2-3 engaging text-based community posts.",
            items: {
                type: Type.OBJECT,
                properties: {
                    content: { type: Type.STRING, description: "The main body of the text post (e.g., a question, a behind-the-scenes update, or a fun fact)." },
                    cta: { type: Type.STRING, description: "A call-to-action for the post (e.g., 'Let me know in the comments!', 'Check out my latest video!')." }
                },
                required: ["content", "cta"]
            }
        },
        polls: {
            type: Type.ARRAY,
            description: "A list of 2-3 engaging poll ideas.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The poll question to ask the community." },
                    options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 2-4 options for the poll." }
                },
                required: ["question", "options"]
            }
        }
    },
    required: ["textPosts", "polls"]
};

const thumbnailIdeasSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            concept: { type: Type.STRING, description: "A short, catchy name for the thumbnail concept (e.g., 'The Shocking Reveal' or 'Minimalist Tech')." },
            visuals: { type: Type.STRING, description: "A detailed description of the main visual elements, background, and subject placement. Be specific about imagery." },
            textOverlay: { type: Type.STRING, description: "The exact text to be placed on the thumbnail. Should be short, punchy, and intriguing." },
            colors: { type: Type.STRING, description: "Recommended color palette (e.g., 'Vibrant yellow and black for high contrast')." }
        },
        required: ["concept", "visuals", "textOverlay", "colors"]
    }
};

const hookIntroSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            hook: { type: Type.STRING, description: "A compelling opening sentence (under 15 seconds) to grab the viewer's attention." },
            introduction: { type: Type.STRING, description: "A brief introduction (1-2 sentences) that expands on the hook and sets up the video's topic." }
        },
        required: ["hook", "introduction"]
    }
};

const repurposingSchema = {
    type: Type.OBJECT,
    properties: {
        shorts: {
            type: Type.ARRAY,
            description: "A list of 3 distinct ideas for short-form videos (Shorts, TikToks, Reels) based on the script.",
            items: {
                type: Type.OBJECT,
                properties: {
                    idea: { type: Type.STRING, description: "A catchy title or concept for the short video." },
                    scriptHook: { type: Type.STRING, description: "The key sentence or moment from the original script to use as the hook." },
                    visualSuggestion: { type: Type.STRING, description: "A brief suggestion for visuals or on-screen text." }
                },
                required: ["idea", "scriptHook", "visualSuggestion"]
            }
        },
        blogOutline: {
            type: Type.OBJECT,
            description: "A structured outline for a blog post or article based on the video script.",
            properties: {
                title: { type: Type.STRING, description: "An SEO-friendly headline for the blog post." },
                introduction: { type: Type.STRING, description: "A brief introductory paragraph." },
                mainPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of main headings (H2s) for the article body." },
                conclusion: { type: Type.STRING, description: "A concluding paragraph summarizing the key takeaways." }
            },
            required: ["title", "introduction", "mainPoints", "conclusion"]
        },
        tweetThread: {
            type: Type.OBJECT,
            description: "An idea for a Twitter/X thread to promote the video.",
            properties: {
                hook: { type: Type.STRING, description: "An engaging opening tweet (the hook) to capture attention." },
                tweets: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 subsequent tweets that summarize the video's key points." }
            },
            required: ["hook", "tweets"]
        }
    },
    required: ["shorts", "blogOutline", "tweetThread"]
};


const parseJsonResponse = (jsonString: string, context: string) => {
    try {
        const result = JSON.parse(jsonString);
        return result;
    } catch (error) {
        console.error(`Failed to parse Gemini JSON response for ${context}:`, jsonString, error);
        throw new Error("AI failed to generate a valid response. Please check the format and try again.");
    }
}

export const generateFullSeo = async (script: string, cta: string): Promise<SeoResult> => {
  let prompt = `You are a world-class YouTube SEO strategist and content expert. Your task is to analyze the following video script and generate a complete and optimized SEO package for it.
  
  Video Script:
  ---
  ${script}
  ---
  
  Based on this script, generate the following SEO components. Your response MUST be in a valid JSON format that adheres to the provided schema.
  - Three unique, compelling titles.
  - A detailed video description.
  - 20+ relevant keywords.
  - A comma-separated string of tags (under 500 characters total).
  - A standard YouTube disclaimer.
  - 5-10 relevant hashtags.
  - A list of timestamped video chapters that logically break down the video's content.
  
  ${cta ? `IMPORTANT: Please seamlessly integrate the following custom call-to-action into the end of the video description: "${cta}"` : 'Include a generic call-to-action to subscribe in the description.'}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: addToneToPrompt(prompt),
    config: {
      responseMimeType: "application/json",
      responseSchema: fullSeoSchema,
      temperature: 0.7,
    },
  });

  return parseJsonResponse(response.text.trim(), 'full SEO') as SeoResult;
};


export const generateSimpleList = async (topic: string, type: 'titles' | 'tags' | 'hashtags' | 'ideas'): Promise<string[]> => {
    const listDescription = {
        titles: "5 unique, catchy, and SEO-optimized YouTube titles",
        tags: "15 relevant YouTube tags (as a list of strings)",
        hashtags: "10 relevant and popular YouTube hashtags, each starting with '#'",
        ideas: "7 creative and engaging YouTube video ideas, each as a concise title-like suggestion",
    };

    const prompt = `You are a YouTube content expert and idea generator. For a video about "${topic}", generate a list of ${listDescription[type]}. Return the response as a JSON array of strings.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
            temperature: 0.8,
        }
    });
    
    return parseJsonResponse(response.text.trim(), type) as string[];
};

export const generateScriptOutline = async (topic: string): Promise<ScriptOutlineResult> => {
    const prompt = `You are an expert YouTube scriptwriter and content strategist. Your task is to create a well-structured and engaging video script outline based on the following topic. The outline should provide a clear roadmap for a creator to follow.
    
    Video Topic: "${topic}"
    
    Please generate a script outline with the following components. Your response MUST be in a valid JSON format that adheres to the provided schema:
    - A catchy title.
    - A strong hook to grab attention in the first 15-30 seconds.
    - An introduction that sets the stage.
    - 3 to 5 main points, each with several talking points (bullet points).
    - A conclusion that summarizes the key information.
    - A clear call-to-action (CTA).`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: scriptOutlineSchema,
            temperature: 0.7,
        }
    });
    
    return parseJsonResponse(response.text.trim(), 'script outline') as ScriptOutlineResult;
};

export const generateVideoScript = async (topic: string, length: string): Promise<VideoScriptResult> => {
    const prompt = `You are an expert YouTube scriptwriter. Your task is to write a complete, engaging, and well-paced video script based on the provided topic and desired length.
    
    Video Topic: "${topic}"
    Desired Length: ${length}
    
    The script should be structured logically with clear scenes (e.g., Intro, Main Point 1, Outro). For each scene, provide the exact dialogue and a description of the suggested visuals (like B-roll, on-screen text, or graphics). The pacing should be appropriate for the specified video length.
    
    Your response MUST be in a valid JSON format that adheres to the provided schema.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: videoScriptSchema,
            temperature: 0.7,
        }
    });
    
    return parseJsonResponse(response.text.trim(), 'video script') as VideoScriptResult;
};


export const generateThumbnailIdeas = async (title: string): Promise<ThumbnailIdea[]> => {
    const prompt = `You are a professional YouTube thumbnail designer and click-through-rate (CTR) expert. Your task is to brainstorm 3-4 distinct, high-impact thumbnail concepts for a video with the following title. Focus on clarity, emotion, and curiosity.
    
    Video Title: "${title}"
    
    For each concept, provide the following details in a JSON format matching the schema: a concept name, a description of the visuals, the exact text overlay, and a suggested color palette.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: thumbnailIdeasSchema,
            temperature: 0.8,
        }
    });
    
    return parseJsonResponse(response.text.trim(), 'thumbnail ideas') as ThumbnailIdea[];
};

export const generateHookAndIntro = async (topic: string): Promise<HookIntro[]> => {
    const prompt = `You are an expert YouTube scriptwriter specializing in viewer retention. For a video about "${topic}", generate 4 different and compelling combinations of a hook and a short introduction.
    
    - The hook should be a single, punchy sentence to grab attention immediately.
    - The introduction should be 1-2 sentences that build on the hook and clearly state what the video is about.
    
    Return the response as a JSON array of objects, where each object contains a 'hook' and an 'introduction'.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: hookIntroSchema,
            temperature: 0.9,
        }
    });
    
    return parseJsonResponse(response.text.trim(), 'hooks and intros') as HookIntro[];
};

export const generateCommunityPostIdeas = async (topic: string): Promise<CommunityPostIdea> => {
    const prompt = `You are a YouTube community manager and engagement expert. Your task is to generate ideas for the YouTube Community Tab to keep an audience engaged, based on a channel's general topic.
    
    Channel Topic: "${topic}"
    
    Generate a mix of engaging content. Your response MUST be in a valid JSON format that adheres to the provided schema:
    - **Text Posts:** 2-3 ideas for text-based posts. These could be questions, behind-the-scenes updates, or interesting facts related to the channel topic. Each should have main content and a call-to-action.
    - **Polls:** 2-3 ideas for polls. Each poll should have an interesting question and 2-4 distinct options for viewers to vote on.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: communityPostSchema,
            temperature: 0.8,
        }
    });
    
    return parseJsonResponse(response.text.trim(), 'community posts') as CommunityPostIdea;
};

export const generateRepurposedContent = async (script: string): Promise<RepurposingResult> => {
    const prompt = `You are a social media and content marketing expert. Your task is to analyze the following YouTube video script and generate a content repurposing plan to maximize its reach across different platforms.
    
    Video Script:
    ---
    ${script}
    ---
    
    Based on this script, generate ideas for the following formats. Your response MUST be in a valid JSON format that adheres to the provided schema:
    1.  **Short-form Videos:** Create 3 distinct ideas for YouTube Shorts, TikToks, or Reels. For each, provide a concept title, identify the key hook from the script, and suggest a visual approach.
    2.  **Blog Post Outline:** Create a structured outline for a blog post based on the video's content, including a title, introduction, main points (headings), and a conclusion.
    3.  **Tweet Thread:** Create an engaging hook for a Twitter/X thread and a series of 3-5 tweets that summarize the video's core message.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: addToneToPrompt(prompt),
        config: {
            responseMimeType: "application/json",
            responseSchema: repurposingSchema,
            temperature: 0.7,
        }
    });

    return parseJsonResponse(response.text.trim(), 'repurposed content') as RepurposingResult;
}