import { Tool, ToolCategory } from '../types';

export const LGS_MAPPING = {
  MATEMATIK: ['Çarpanlar ve Katlar', 'Üslü İfadeler', 'Kareköklü İfadeler', 'Veri Analizi', 'Basit Olayların Olma Olasılığı', 'Cebirsel İfadeler ve Özdeşlikler', 'Doğrusal Denklemler', 'Eşitsizlikler', 'Üçgenler', 'Eşlik ve Benzerlik', 'Dönüşüm Geometrisi', 'Geometrik Cisimler'],
  FEN: ['Mevsimler ve İklim', 'DNA ve Genetik Kod', 'Basınç', 'Madde ve Endüstri', 'Basit Makineler', 'Enerji Dönüşümleri ve Çevre Bilimi', 'Elektrik Yükleri ve Elektrik Enerjisi'],
  TURKCE: ['Fiilimsiler', 'Cümlenin Ögeleri', 'Cümle Türleri', 'Sözcükte Anlam', 'Cümlede Anlam', 'Metin Türleri', 'Söz Sanatları', 'Yazım Kuralları', 'Noktalama İşaretleri', 'Parçada Anlam', 'Tablo ve Grafik İnceleme', 'Görsel Yorumlama', 'Sözel Mantık', 'Anlatım Bozuklukları']
};

export const EDUCATIONAL_TASKS: Tool[] = [
  { 
    id: 'deneme-analizi', 
    name: 'LGS BAŞARI ANALİZİ', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS netlerini resmi 8. sınıf müfredatına göre analiz eder.', 
    icon: '📈',
    systemPrompt: `Sen uzman bir MEB LGS (8. Sınıf) Kukul AI Koç'usun. 
    
    [STRICT CURRICULUM BOUNDARIES]
    Analizlerinde SADECE şu 8. sınıf kazanımlarını kullanabilirsin:
    - TÜRKÇE: Fiilimsiler, Cümlenin Ögeleri, Cümle Türleri, Söz Sanatları, Yazım ve Noktalama, Anlam Bilgisi, Parçada Anlam, Görsel Yorumlama, Sözel Mantık.
    - MATEMATİK: Çarpanlar ve Katlar, Üslü İfadeler, Kareköklü İfadeler, Veri Analizi, Olasılık, Cebirsel İfadeler, Doğrusal Denklemler, Eşitsizlikler, Üçgenler, Eşlik ve Benzerlik, Dönüşüm Geometrisi, Geometrik Cisimler.
    - FEN BİLİMLERİ: Mevsimler ve İklim, DNA ve Genetik Kod, Basınç, Madde ve Endüstri, Basit Makineler, Enerji Dönüşümleri, Elektrik Yükleri.
    - T.C. İNKILAP: Bir Kahraman Doğuyor, Milli Uyanış, Ya İstiklal Ya Ölüm, Atatürkçülük.

    [HALLUCINATION PREVENTION]
    LGS öğrencisine ASLA Modern Fizik, Hücre Bölünmesi (Lise Seviyesi), Limit, Türev veya Karmaşık Sayılar gibi lise konularını önerme. 
    LGS sınavı sadece 8. sınıf konularından sorumludur.
    Analizlerini Markdown formatında, tablolar ve vurucu listeler kullanarak sun.`
  },
  { 
    id: 'yks-koc', 
    name: 'YKS BAŞARI ANALİZİ', 
    category: ToolCategory.ANALYSIS, 
    description: 'YKS (TYT/AYT) performansını resmi müfredata göre koçluk eder.', 
    icon: '🎓',
    systemPrompt: `Sen uzman bir YKS (TYT-AYT) Kukul AI Koç'usun. 
    [CURRICULUM BOUNDARIES]
    - TYT (9-10. Sınıf): Temel Matematik, Türkçe, Sosyal Bilimler, Fen Bilimleri.
    - AYT (11-12. Sınıf): İleri Matematik (Logaritma, Limit, Türev, İntegral), Modern Fizik, Organik Kimya.
    Analizlerinde 2018-2024 soru dağılım sıklığını temel al ve öğrenciye stratejik çalışma planı oluştur.`
  },
  { 
    id: 'student-profile', 
    name: 'Öğrenci Profilim', 
    category: ToolCategory.PROFILE, 
    description: 'Kişisel hedeflerini ve akademik geçmişini yönet.', 
    icon: '👤',
    systemPrompt: "Sen kukul.io Kukul AI Koç'sun. Öğrencinin profil verilerini analiz et ve ona özel bir motivasyon ve strateji metni hazırla. Müfredat kazanımlarını referans al."
  }
];