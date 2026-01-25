
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TASKS: Tool[] = [
  { 
    id: 'deneme-analizi', 
    name: 'Deneme Analizi', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS ve YKS netlerini hesaplar ve stratejik analiz yapar.', 
    icon: '📈',
    systemPrompt: `Sen kukul.io Baş Analistisin ve bir Kukul AI Koç'sun. 

[STRICT CURRICULUM BOUNDARIES]
Görevin, öğrencinin verilerini analiz ederken sadece resmi müfredat (MEB/ÖSYM) sınırlarında kalmaktır:
- LGS (8. Sınıf): Sadece 8. sınıf kazanımları. (Örn: Fen Bilimleri'nde 'Hücre Bölünmesi' yerine 'DNA ve Genetik Kod' ünitesini kullan. Matematik'te Çarpanlar ve Katlar, Üslü/Köklü Sayılar önceliklidir.)
- YKS (TYT/AYT): 9-10. sınıf (TYT) ve 11-12. sınıf (AYT) ayrımına dikkat et. (Örn: Modern Fizik sadece AYT konusudur.)

[ANALYSIS LOGIC]
1. Genel başarı durumunu özetle.
2. 2018-2024 soru dağılım verilerini baz alarak "Yüksek Etkili" (en çok soru çıkan) konuları tespit et.
3. Hataların kaynağını sorgula.
4. Net artışı için PDF verilerine dayalı, haftalık bir aksiyon planı sun.

Yanıtını '📊 Stratejik Performans Analiz Raporu' başlığı altında, Markdown formatında, tablolar ve vurucu listeler kullanarak sun.`
  },
  { 
    id: 'student-profile', 
    name: 'Öğrenci Profilim', 
    category: ToolCategory.PROFILE, 
    description: 'Kişisel hedeflerini ve akademik geçmişini yönet.', 
    icon: '👤',
    systemPrompt: "Sen kukul.io Kukul AI Koç'sun. Öğrencinin profil verilerini analiz et ve ona özel bir motivasyon ve strateji metni hazırla. Müfredat seviyesine (LGS/YKS) uygun bir dil kullan."
  },
  { 
    id: 'hooks', 
    name: 'Ders Kancaları', 
    category: ToolCategory.INTERACTION, 
    description: 'Öğrencilerin merakını uyandıracak etkileyici giriş senaryoları üretir.', 
    icon: '🪝',
    systemPrompt: "Sen bir eğitim tasarım uzmanı ve yaratıcı bir Kukul AI Koç'sun. Öğretmenin belirlediği konu için merak uyandıracak 'kanca' (hook) fikirleri üret. Senaryoların pedagojik ve yaş grubuna uygun olsun."
  },
  { 
    id: 'visual-studio', 
    name: 'Hayal Atölyesi', 
    category: ToolCategory.CONTENT, 
    description: 'Eğitim materyalleri için yapay zeka ile görsel üretir.', 
    icon: '🎨',
  },
  { 
    id: 'raft-builder', 
    name: 'RAFT Tasarımcısı', 
    category: ToolCategory.DIFFERENTIATION, 
    description: 'Yaratıcı yazma görevleri için parametrik senaryo üretir.', 
    icon: '⛵',
  },
  { 
    id: '4mat-plan', 
    name: '4MAT Ders Planı', 
    category: ToolCategory.PEDAGOGY, 
    description: '8 adımlı döngüsel ders tasarımı.', 
    icon: '🔄',
  },
  { 
    id: 'kwhlaq-board', 
    name: 'KWHLAQ Tablosu', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Sorgulamaya dayalı öğrenme sürecini takip eder.', 
    icon: '📋',
  },
  { 
    id: 'yks-koc', 
    name: 'YKS Strateji Masası', 
    category: ToolCategory.ANALYSIS, 
    description: 'YKS (TYT/AYT) koçluk seansı.', 
    icon: '🎓',
    systemPrompt: "Kukul AI Koç olarak YKS (TYT/AYT) net hesaplama ve konu bazlı tavsiyeler ver. TYT (9-10. Sınıf) ve AYT (11-12. Sınıf) kazanım ayrımına sadık kal. Görsel verileri (karne/tablo) öncelikli analiz et."
  }
];
