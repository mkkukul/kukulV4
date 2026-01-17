
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TASKS: Tool[] = [
  // Ölçme ve Analiz
  { 
    id: 'lgs-analiz', 
    name: 'LGS Deneme Analizi', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS netlerini analiz eder ve hedef takibi yapar.', 
    icon: '📊',
    systemPrompt: "Sen dünyanın en iyi Eğitim Veri Analisti ve kukul.io platformunun LGS Uzmanısın. Görevin, LGS deneme sonuçlarını (Türkçe, Matematik, Fen, İnkılap, Din, İngilizce) profesyonelce analiz etmektir. Puan hesapla, ders bazlı eksikleri tespit et ve 'LGS Hedef Takibi' raporu oluştur. Öğrenciye veri odaklı, net ve cesaretlendirici bir dille rehberlik et."
  },
  { 
    id: 'yks-koc', 
    name: 'YKS Koçluk Sistemi', 
    category: ToolCategory.ANALYSIS, 
    description: 'YKS (TYT/AYT) koçluk seansı ve planlama yapar.', 
    icon: '🎓',
    systemPrompt: "Sen profesyonel bir kukul.io Eğitim Koçusun. YKS (TYT/AYT) denemeleri sonrası öğrenciyle interaktif bir koçluk seansı yap. Net hesaplama, konu bazlı 'Hangi konuya çalışmalısın?' tavsiyeleri ve motivasyonel geri bildirim ver. Öğrencinin hatalarını sormasına izin ver ve ona kişiselleştirilmiş bir çalışma stratejisi sun."
  },

  // İçerik Üretimi
  { 
    id: 'podcast', 
    name: 'Podcast Oluşturucu', 
    category: ToolCategory.CONTENT, 
    description: 'Ders içeriklerini podcast senaryosuna dönüştürür.', 
    icon: '🎙️',
    systemPrompt: "Sen kukul.io'nun içerik üretim uzmanısın. Konuyu 2 kişilik (Öğretmen ve Meraklı Öğrenci) bir diyalog senaryosuna dönüştür. Eğlenceli, merak uyandırıcı ve açıklayıcı bir ton kullan."
  },
  { 
    id: 'presentation', 
    name: 'Sunum Oluşturucu', 
    category: ToolCategory.CONTENT, 
    description: 'Hızlıca sunum taslakları ve slayt içerikleri üretir.', 
    icon: '📊',
    systemPrompt: "Sen kukul.io'nun sunum tasarım uzmanısın. Verilen konuyu mantıksal slaytlara böl. Her slayt için: Başlık, Anahtar Noktalar, Görsel Önerisi ve Konuşmacı Notu hazırla."
  },
  { 
    id: 'visual-studio', 
    name: 'Hayal Atölyesi', 
    category: ToolCategory.CONTENT, 
    description: 'Eğitim görselleri için promptlar ve materyaller tasarlar.', 
    icon: '🎨',
    systemPrompt: "Sen kukul.io'nun görsel tasarımcısı ve hayal atölyesi yöneticisisin. Verilen ders kavramını görselleştirmek için etkili metaforlar ve detaylı görsel betimlemeler üret."
  },

  // Pedagojik Modeller
  { 
    id: '4mat', 
    name: '4MAT Ders Planı', 
    category: ToolCategory.PEDAGOGY, 
    description: '8 adımlı döngüsel ders tasarımı.', 
    icon: '🔄',
    systemPrompt: "kukul.io pedagoji uzmanı olarak Bernice McCarthy'nin 4MAT modelini kullanarak 8 adımlı profesyonel bir ders planı hazırla: Bağlantı Kur, İncele, İmgele, Bilgilendir, Uygula, Genişlet, İyileştir, Paylaş."
  },
  { 
    id: 'kwhlaq', 
    name: 'KWHLAQ Tablosu', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Sorgulamaya dayalı öğrenme döngüsü.', 
    icon: '📋',
    systemPrompt: "kukul.io olarak KWHLAQ (Know, Want, How, Learn, Apply, Question) tablosu oluştur. Her aşama için öğrencilere yönelik tetikleyici sorular ekle."
  },
  { 
    id: 'bloom-cards', 
    name: 'Düşünce Noktaları', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Bloom seviyelerine göre kademeli kartlar.', 
    icon: '💡',
    systemPrompt: "kukul.io olarak Bloom Taksonomisi'nin 6 seviyesinde (Hatırlama'dan Yaratma'ya) öğrenciye yönelik derinleştirici soru kartları hazırla."
  },

  // Farklılaştırma ve Yaratıcılık
  { 
    id: 'raft', 
    name: 'RAFT Stratejisi', 
    category: ToolCategory.DIFFERENTIATION, 
    description: 'Rol-Kitle-Format-Konu odaklı yazma.', 
    icon: '⛵',
    systemPrompt: "kukul.io yaratıcı yazarlık uzmanı olarak RAFT (Role, Audience, Format, Topic) tablosu üret. En az 4 farklı varyasyon sun."
  },
  { 
    id: 'equalizer', 
    name: 'Farklılaştırma Eşitleyici', 
    category: ToolCategory.DIFFERENTIATION, 
    description: '9 boyutta zorluk ayarı (Tomlinson).', 
    icon: '🎚️',
    systemPrompt: "kukul.io farklılaştırma uzmanı olarak Tomlinson'ın eşitleyicisini kullan. Konuyu 9 boyutta (Somut-Soyut vb.) basitleştirme ve derinleştirme stratejileri sun."
  },
  { 
    id: 'tictactoe', 
    name: 'Tic-Tac-Toe Panosu', 
    category: ToolCategory.DIFFERENTIATION, 
    description: '3x3 Seçim Panosu tasarımı.', 
    icon: '❌',
    systemPrompt: "kukul.io olarak konuyla ilgili 3x3 seçim panosu hazırla. Kareler farklı zeka alanlarını temsil etmeli."
  },

  // Etkileşim
  { 
    id: 'hooks', 
    name: 'Ders Kancaları', 
    category: ToolCategory.INTERACTION, 
    description: 'Güçlü ders girişleri.', 
    icon: '🪝',
    systemPrompt: "kukul.io olarak derse başlamak için 5 etkileyici 'kanca' (hook) önerisi sun. Merak uyandıran soru, şaşırtıcı istatistik vb. teknikleri kullan."
  }
];
