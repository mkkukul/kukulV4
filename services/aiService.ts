
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Tool } from "../types";
import { EDUCATIONAL_TASKS } from "../constants/tasks";

export class AIService {
  // Guidelines: Always initialize GoogleGenAI with named apiKey parameter right before usage
  async sendMessage(
    taskId: string,
    history: ChatMessage[],
    onChunk: (text: string) => void
  ) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const task = EDUCATIONAL_TASKS.find(t => t.id === taskId);
    const systemInstruction = task?.systemPrompt || "Sen profesyonel bir öğretmen asistanısın.";

    // Map history to parts expected by GenAI API
    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts
    }));

    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        // Access chunk text directly using .text property
        const text = chunk.text || '';
        fullText += text;
        onChunk(text);
      }
      return fullText;
    } catch (error) {
      console.error("AI Service Error:", error);
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

export const aiService = new AIService();
