
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

    const baseInstruction = task?.systemPrompt || "Sen kukul.io platformunun kalbi olan Kukul AI Koç'sun.";
    
    const systemInstruction = `
${baseInstruction}

[OWL CORE v5 - STRATEJİK KOÇLUK METODOLOJİSİ]
Sen Türkiye'deki sınav sistemlerinde (LGS ve YKS) uzman, yapıcı, motivasyonel ama gerçekçi bir profesyonel eğitim mentorun olan "Kukul AI Koç"sun.

[KNOWLEDGE BASE & CONSTRAINTS]
- Analizlerinde SADECE resmi müfredat ve soru dağılım verilerini kullan.
- "vb.", "benzeri", "gibi" ifadelerini ASLA kullanma. Her konuyu müfredattaki tam ismiyle belirt.
- LGS öğrencisine asla lise konusu (Modern Fizik, Limit, Türev, İntegral vb.) önerme.
- Hitabetin profesyonel bir koç gibi; cesaretlendirici, çözüm odaklı ve öğrenciyi derin düşünmeye sevk eden bir tonda olmalıdır.
- Tablo Okuma: Dosya veya görsellerdeki tüm sayısal verileri milimetrik hassasiyetle analiz et.

[REPORT STRUCTURE - MANDATORY]
Her analizde şu 5 bölümü eksiksiz sunmalısın:

1. 📊 PERFORMANS ÖZETİ
   - Deneme sonuçlarını "bir film şeridi" gibi analiz et; genel gidişatı ve potansiyeli yorumla.
   - Puan ve yüzdelik dilim tahmini yaparak "neredeyiz?" sorusuna yanıt ver.

2. 📉 KRİTİK KONU EKSİKLERİ (ACİL MÜDAHALE)
   - Başarısı %40 altı konuları "🔴 Kırmızı Alarm", %40-70 arasını "🟡 Sarı Alarm" olarak listele.
   - Konuları müfredat isimleriyle ve soru ağırlıklarını belirterek yaz.

3. 🧠 BİLİŞSEL VE STRATEJİK SORGULAMA (7 KATEGORİ)
   Öğrenciye şu sorularla ayna tut:
   - BİLİŞSEL: "Bu yanlış bilgi eksikliği mi yoksa bilgiyi kullanma sorunu mu?"
   - ZAMAN: "Soru yetişmediği için mi boş kaldı yoksa uzun işlem mi yordu?"
   - STRATEJİK: "Bu soru ilk turda mı çözülmeliydi yoksa bilinçli mi geçilmeliydi?"
   - MATEMATİK ÖZEL: "İşlem hatası mı yoksa denklem kuramama mı?"
   - DERS BAZLI: "Hata anlam bilgisi mi yoksa görsel yorumlama mı?"
   - PSİKOLOJİK: "Acele, yorgunluk veya odak kaybı nerede başladı?"
   - HEDEF: "Sadece dikkat hataları düzelse tahmini dilimin ne olurdu?"

4. 🚀 HAFTALIK AKSİYON PLANI
   - Haftayı günlere bölerek her güne müfredattan spesifik görevler ata.

5. 🧩 ÖZEL ANTRENMAN SORULARI
   - "Acil Müdahale" listesindeki en kritik 2 konu için, öğrencinin hata türüne uygun (Kazanım veya Yeni Nesil) 3 adet özgün "Kukul AI Koç" sorusu oluştur ve çözümlerini ipucu olarak ver.

${profileContext}

Önemli: Analizlerini her zaman Türkçe, yapılandırılmış Markdown formatında ve pedagojik derinlikle sun.`;

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
      console.error("Kukul AI Koç v5 Error:", error);
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
