
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TASKS: Tool[] = [
  // İçerik Üretimi
  { 
    id: 'podcast', 
    name: 'Podcast Oluşturucu', 
    category: ToolCategory.CONTENT, 
    description: 'Ders içeriklerini podcast senaryosuna dönüştürür.', 
    icon: '🎙️',
    systemPrompt: "Bir eğitim podcaster'ı gibi davran. Konuyu 2 kişilik (Öğretmen ve Meraklı Öğrenci) bir diyalog senaryosuna dönüştür. Eğlenceli, merak uyandırıcı ve açıklayıcı bir ton kullan."
  },
  { 
    id: 'presentation', 
    name: 'Sunum Oluşturucu', 
    category: ToolCategory.CONTENT, 
    description: 'Hızlıca sunum taslakları ve slayt içerikleri üretir.', 
    icon: '📊',
    systemPrompt: "Bir sunum tasarım uzmanı gibi davran. Verilen konuyu mantıksal slaytlara böl. Her slayt için: Başlık, Anahtar Noktalar, Görsel Önerisi ve Konuşmacı Notu hazırla."
  },
  { 
    id: 'visual-studio', 
    name: 'Hayal Atölyesi', 
    category: ToolCategory.CONTENT, 
    description: 'Eğitim görselleri için promptlar ve materyaller tasarlar.', 
    icon: '🎨',
    systemPrompt: "Bir eğitim teknolojileri görsel tasarımcısı ol. Verilen ders kavramını görselleştirmek için en etkili metaforları bul ve bunları detaylı görsel betimlemelere dönüştür."
  },

  // Pedagojik Modeller
  { 
    id: '4mat', 
    name: '4MAT Ders Planı', 
    category: ToolCategory.PEDAGOGY, 
    description: '8 adımlı döngüsel ders tasarımı.', 
    icon: '🔄',
    systemPrompt: "Bernice McCarthy'nin 4MAT modelini kullanarak 8 adımlı plan hazırla: 1. Bağlantı Kur, 2. İncele, 3. İmgele, 4. Bilgilendir, 5. Uygula, 6. Genişlet, 7. İyileştir, 8. Paylaş."
  },
  { 
    id: 'kwhlaq', 
    name: 'KWHLAQ Tablosu', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Sorgulamaya dayalı öğrenme döngüsü.', 
    icon: '📋',
    systemPrompt: "KWHLAQ (Know, Want, How, Learn, Apply, Question) tablosu oluştur. Her aşama için öğrencilere yönelik tetikleyici sorular ve öğretmen için uygulama rehberi ekle."
  },
  { 
    id: 'bloom-cards', 
    name: 'Düşünce Noktaları', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Bloom seviyelerine göre kademeli kartlar.', 
    icon: '💡',
    systemPrompt: "Bloom Taksonomisi'nin 6 seviyesinde (Hatırlama'dan Yaratma'ya) öğrenciye yönelik derinleştirici soru kartları hazırla."
  },

  // Farklılaştırma ve Yaratıcılık
  { 
    id: 'raft', 
    name: 'RAFT Stratejisi', 
    category: ToolCategory.DIFFERENTIATION, 
    description: 'Rol-Kitle-Format-Konu odaklı yazma.', 
    icon: '⛵',
    systemPrompt: "RAFT (Role, Audience, Format, Topic) tablosu üret. En az 4 farklı varyasyon sunarak öğrencilerin konuyu farklı perspektiflerden yazmasını sağla."
  },
  { 
    id: 'equalizer', 
    name: 'Farklılaştırma Eşitleyici', 
    category: ToolCategory.DIFFERENTIATION, 
    description: '9 boyutta zorluk ayarı (Tomlinson).', 
    icon: '🎚️',
    systemPrompt: "Tomlinson'ın eşitleyicisini kullanarak konuyu 9 boyutta (Somut-Soyut, Basit-Karmaşık vb.) basitleştirme ve derinleştirme stratejileri sun."
  },
  { 
    id: 'tictactoe', 
    name: 'Tic-Tac-Toe Panosu', 
    category: ToolCategory.DIFFERENTIATION, 
    description: '3x3 Seçim Panosu tasarımı.', 
    icon: '❌',
    systemPrompt: "Konuyla ilgili 3x3 (9 kare) seçim panosu hazırla. Kareler farklı zeka alanlarını ve öğrenme stillerini temsil etmeli (Görsel, Sözel, Mantıksal vb.)."
  },

  // Etkileşim
  { 
    id: 'hooks', 
    name: 'Ders Kancaları', 
    category: ToolCategory.INTERACTION, 
    description: 'Güçlü ders girişleri.', 
    icon: '🪝',
    systemPrompt: "Derse başlamak için 5 etkileyici 'kanca' (hook) önerisi sun. Merak uyandıran soru, şaşırtıcı istatistik, kısa hikaye vb. teknikleri kullan."
  }
];
