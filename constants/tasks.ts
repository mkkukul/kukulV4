
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TASKS: Tool[] = [
  { 
    id: 'student-profile', 
    name: 'Öğrenci Profilim', 
    category: ToolCategory.PROFILE, 
    description: 'Kişisel hedeflerini ve akademik geçmişini yönet.', 
    icon: '👤',
    systemPrompt: "Sen kukul.io Eğitim Koçusun. Öğrencinin profil verilerini (hedef, sınıf, mevcut durum) analiz et ve ona özel bir motivasyon ve strateji metni hazırla."
  },
  { 
    id: 'deneme-analizi', 
    name: 'Deneme Analizi', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS ve YKS netlerini hesaplar ve stratejik analiz yapar.', 
    icon: '📈',
    systemPrompt: "Sen kukul.io Baş Analistisin. Kullanıcının girdiği net verilerini profesyonelce analiz et. Ders bazlı güçlü ve zayıf yönleri belirle, net artışı için spesifik konu tavsiyeleri ver ve kişiselleştirilmiş bir haftalık çalışma stratejisi oluştur. Yanıtını '📊 Stratejik Analiz Raporu' başlığı altında, Markdown formatında, tablolar ve listeler kullanarak sun."
  },
  { 
    id: 'visual-studio', 
    name: 'Hayal Atölyesi', 
    category: ToolCategory.CONTENT, 
    description: 'Eğitim materyalleri için yapay zeka ile görsel üretir.', 
    icon: '🎨',
    systemPrompt: "Sen kukul.io Görsel Tasarım Direktörüsün. Kullanıcının betimlediği kavramı, eğitimsel açıdan en etkili görsele dönüştürecek profesyonel bir sahne tasarla."
  },
  { 
    id: 'raft-builder', 
    name: 'RAFT Tasarımcısı', 
    category: ToolCategory.DIFFERENTIATION, 
    description: 'Yaratıcı yazma görevleri için parametrik senaryo üretir.', 
    icon: '⛵',
    systemPrompt: "Sen kukul.io Yaratıcı Yazarlık Koçusun. Verilen Rol, Kitle, Format ve Konu parametrelerini kullanarak öğrenciyi heyecanlandıracak, disiplinlerarası bir yazma görevi kurgula."
  },
  { 
    id: '4mat-plan', 
    name: '4MAT Ders Planı', 
    category: ToolCategory.PEDAGOGY, 
    description: '8 adımlı döngüsel ders tasarımı.', 
    icon: '🔄',
    systemPrompt: "Sen 4MAT Öğretim Modeli uzmanısın. Kullanıcının konusunu 8 adımda (Bağlantı, İnceleme, İmgeleme, Bilgilendirme, Uygulama, Genişletme, İyileştirme, Paylaşma) yapılandır."
  },
  { 
    id: 'kwhlaq-board', 
    name: 'KWHLAQ Tablosu', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Sorgulamaya dayalı öğrenme sürecini takip eder.', 
    icon: '📋',
    systemPrompt: "Sen kukul.io Pedagoji Danışmanısın. Öğrencinin KWHLAQ tablosundaki girdilerini değerlendir ve her hücre için merakı derinleştirecek ek birer soru veya kaynak önerisi sun."
  },
  { 
    id: 'lgs-analiz', 
    name: 'LGS Hızlı Değerlendirme', 
    category: ToolCategory.ANALYSIS, 
    description: 'Hızlı LGS rehberliği.', 
    icon: '📊',
    systemPrompt: "LGS Uzmanı olarak veri odaklı ve cesaretlendirici bir rehberlik sun."
  },
  { 
    id: 'yks-koc', 
    name: 'YKS Strateji Masası', 
    category: ToolCategory.ANALYSIS, 
    description: 'YKS (TYT/AYT) koçluk seansı.', 
    icon: '🎓',
    systemPrompt: "YKS Koçu olarak net hesaplama ve konu bazlı tavsiyeler ver."
  },
  { 
    id: 'podcast', 
    name: 'Podcast Senaryosu', 
    category: ToolCategory.CONTENT, 
    description: 'Konuları diyaloglara çevirir.', 
    icon: '🎙️',
  },
  { 
    id: 'hooks', 
    name: 'Ders Kancaları', 
    category: ToolCategory.INTERACTION, 
    description: 'Güçlü ders girişleri.', 
    icon: '🪝',
  }
];
