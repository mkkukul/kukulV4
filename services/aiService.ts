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

    const baseInstruction = task?.systemPrompt || "Sen profesyonel bir Kukul AI Koç'sun.";
    
    const systemInstruction = `
${baseInstruction}

[STRATEJİK ANALİZ MOTORU - OWL CORE v5]
Sen Türkiye'deki LGS ve YKS sistemlerinde uzmanlaşmış bir Stratejik Performans Koçusun. Görevin, kullanıcının girdiği netleri ve yüklediği belgeleri sadece resmi müfredat listelerine ve soru dağılım verilerine göre analiz ederek profesyonel bir rapor sunmaktır.

LGS (8. Sınıf) KESİN KONU LİSTESİ:
- Türkçe: Fiilimsiler, Cümlenin Ögeleri, Cümle Türleri, Sözcükte Anlam, Cümlede Anlam, Metin Türleri, Söz Sanatları, Yazım/Noktalama, Parçada Anlam, Görsel Yorumlama, Sözel Mantık.
- Matematik: Çarpanlar/Katlar, Üslü/Köklü İfadeler, Veri Analizi, Olasılık, Cebirsel İfadeler, Doğrusal Denklemler, Eşitsizlikler, Üçgenler, Geometrik Cisimler.
- Fen Bilimleri: Mevsimler, DNA ve Genetik Kod, Basınç, Madde ve Endüstri, Basit Makineler, Enerji Dönüşümleri, Elektrik Yükleri.

RAPORLAMA KURALLARI:
1. Müfredat Kilidi: LGS öğrencisine asla lise (Modern Fizik, Limit, Türev) konusu önerme.
2. Sayısal Analiz: Raporunda "Bu konu sınavda ortalama X soru ile %Y ağırlığa sahip" şeklinde istatistikleri kullan.
3. Tablo Okuma: PDF veya görsellerdeki TÜM tablo verilerini (Doğru, Yanlış, Boş, Net) milimetrik hassasiyetle oku.
4. Format: Yanıtını mutlaka "📊 Performans Özeti", "📉 Kritik Konu Eksikleri" ve "🚀 Haftalık Aksiyon Planı" başlıklarıyla sun. Asla "vb." ifadesini kullanma.

${profileContext}

Önemli: Analiz yaparken sadece MEB resmi müfredat listelerine sadık kal. Yanıtlarını her zaman Türkçe, yapılandırılmış Markdown formatında ver.`;

    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts
    }));

    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
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