
import { GoogleGenAI } from "@google/genai";
import { Video } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchYouTubeContent = async (query: string = "trending", isShorts: boolean = false): Promise<Video[]> => {
  try {
    const prompt = isShorts 
      ? `Find 10 popular YouTube Shorts for query "${query}". Return a JSON array of objects with fields: id, title, channelName, views, postedAt, duration ("Shorts"), description, and category.`
      : `Search YouTube for "${query}". Include both top trending videos and prominent CHANNELS/creators matching the topic. For channel results, pick a representative video. Return a JSON array of 12 objects with fields: id (11 char id), title, channelName, views, postedAt, duration, description, and category.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const jsonStr = response.text;
    const results = jsonStr ? JSON.parse(jsonStr) : [];
    
    return results.map((v: any) => ({
      ...v,
      thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, // Using hqdefault for better compatibility
      channelAvatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(v.channelName)}`
    }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};
