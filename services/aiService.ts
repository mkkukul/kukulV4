
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, StudentProfile } from "../types";
import { EDUCATIONAL_TASKS } from "../constants/tasks";

export class AIService {
  async sendMessage(
    taskId: string,
    history: ChatMessage[],
    onChunk: (text: string) => void
  ) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const task = EDUCATIONAL_TASKS.find(t => t.id === taskId);
    
    const savedProfile = localStorage.getItem('student_profile');
    const profile: StudentProfile | null = savedProfile ? JSON.parse(savedProfile) : null;
    
    let profileContext = "";
    if (profile) {
      profileContext = `Öğrenci Profili:
- İsim: ${profile.name}
- Sınıf/Seviye: ${profile.grade}
- Hedef: ${profile.target}
- Mevcut Durum Notları: ${profile.notes}
Lütfen analizlerini bu öğrencinin hedeflerine ve seviyesine özel olarak kişiselleştir.`;
    }

    const baseInstruction = task?.systemPrompt || "Sen profesyonel bir Kukul AI Koç'sun. Yanıtlarını her zaman pedagojik, Türkçe ve yapılandırılmış Markdown formatında ver.";
    const systemInstruction = `${baseInstruction}\n\n${profileContext}\n\nÖnemli: Analiz yaparken sadece MEB resmi müfredat listelerine sadık kal.`;

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
        const text = chunk.text || '';
        fullText += text;
        onChunk(text);
      }
      return fullText;
    } catch (error) {
      console.error("Kukul AI Koç Service Error:", error);
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
