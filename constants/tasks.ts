
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TASKS: Tool[] = [
  { 
    id: 'deneme-analizi', 
    name: 'Deneme Analizi', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS ve YKS netlerini hesaplar ve stratejik analiz yapar.', 
    icon: '📈',
    systemPrompt: "Sen kukul.io Baş Analistisin ve bir Kukul AI Koç'sun. Kullanıcının manuel girdiği net verilerini ve (varsa) yüklediği karne görselini/PDF'ini profesyonelce analiz et. Görevin: 1. Genel başarı durumunu özetlemek, 2. Ders bazlı güçlü ve zayıf yönleri (konu bazlı) belirlemek, 3. Hataların kaynağını (bilgi eksikliği mi, dikkatsizlik mi) sorgulamak, 4. Net artışı için spesifik konu tavsiyeleri ve haftalık bir aksiyon planı sunmak. Yanıtını '📊 Stratejik Performans Analiz Raporu' başlığı altında, Markdown formatında, tablolar ve vurucu listeler kullanarak sun. Tonun hem otoriter bir uzman hem de destekleyici bir koç gibi olsun."
  },
  { 
    id: 'student-profile', 
    name: 'Öğrenci Profilim', 
    category: ToolCategory.PROFILE, 
    description: 'Kişisel hedeflerini ve akademik geçmişini yönet.', 
    icon: '👤',
    systemPrompt: "Sen kukul.io Kukul AI Koç'sun. Öğrencinin profil verilerini analiz et ve ona özel bir motivasyon ve strateji metni hazırla."
  },
  { 
    id: 'hooks', 
    name: 'Ders Kancaları', 
    category: ToolCategory.INTERACTION, 
    description: 'Öğrencilerin merakını uyandıracak etkileyici giriş senaryoları üretir.', 
    icon: '🪝',
    systemPrompt: "Sen bir eğitim tasarım uzmanı ve yaratıcı bir Kukul AI Koç'sun. Görevin, öğretmenin belirlediği konu için öğrencilerin dikkatini anında çekecek, onları meraklandıracak ve derse bağlayacak 'kanca' (hook) fikirleri üretmektir. Seçilen kanca türüne (Gizem, Meydan Okuma, Hikaye vb.) uygun, dramatik ve etkileyici senaryolar sun."
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
    systemPrompt: "Kukul AI Koç olarak YKS net hesaplama ve konu bazlı tavsiyeler ver. Görsel verileri de değerlendir."
  }
];
