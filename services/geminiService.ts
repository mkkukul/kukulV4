
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { SYSTEM_INSTRUCTIONS } from "../constants/prompts";

export class GeminiService {
  async generateResponse(
    toolId: string,
    history: ChatMessage[],
    onChunk?: (text: string) => void
  ) {
    // Guidelines: Always initialize GoogleGenAI with named apiKey parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const systemInstruction = SYSTEM_INSTRUCTIONS[toolId] || SYSTEM_INSTRUCTIONS['default'];
      
      const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: msg.parts
      }));

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          topP: 0.95,
        }
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        const text = chunk.text || '';
        fullText += text;
        if (onChunk) onChunk(text);
      }

      return fullText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  async processFile(file: File): Promise<{ mimeType: string; data: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          mimeType: file.type,
          data: base64Data
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiService();
