
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TOOLS: Tool[] = [
  // İçerik Üretimi
  { id: 'podcast', name: 'Podcast Oluşturucu', category: ToolCategory.CONTENT, description: 'Ders içeriklerini podcast senaryosuna dönüştürür.', icon: '🎙️' },
  { id: 'presentation', name: 'Sunum Oluşturucu', category: ToolCategory.CONTENT, description: 'Hızlıca sunum taslakları ve slayt içerikleri üretir.', icon: '📊' },
  { id: 'interactive', name: 'Etkileşimli Materyal', category: ToolCategory.CONTENT, description: 'Öğrenci katılımını artıran interaktif kurgular.', icon: '🕹️' },
  { id: 'visual-studio', name: 'Hayal Atölyesi', category: ToolCategory.CONTENT, description: 'Eğitim görselleri ve materyalleri tasarlar.', icon: '🎨' },

  // Dil ve Metin Analizi
  { id: 'word-guide', name: 'Kelimeler Rehberi', category: ToolCategory.LANGUAGE, description: 'Kelime hazinesi geliştirme ve analiz.', icon: '📖' },
  { id: 'summarizer', name: 'Metin Özetleyici', category: ToolCategory.LANGUAGE, description: 'Uzun metinleri pedagojik seviyeye uygun özetler.', icon: '📝' },
  { id: 'leveler', name: 'Metin Seviye Ayarlayıcı', category: ToolCategory.LANGUAGE, description: 'Metinleri CEFR veya sınıf seviyesine göre ayarlar.', icon: '📶' },
  { id: 'pronunciation', name: 'Telaffuz Değerlendirici', category: ToolCategory.LANGUAGE, description: 'Dil öğretimi için telaffuz rehberi.', icon: '🗣️' },

  // Pedagojik Planlama Modelleri
  { id: '4mat', name: '4MAT Öğretim Modeli', category: ToolCategory.PEDAGOGY, description: '8 adımlı döngüsel ders tasarımı.', icon: '🔄' },
  { id: 'kwhlaq', name: 'KWHLAQ Tablosu', category: ToolCategory.PEDAGOGY, description: 'Sorgulamaya dayalı öğrenme planı.', icon: '📋' },
  { id: 'five-entry', name: 'Beş Giriş Noktası', category: ToolCategory.PEDAGOGY, description: 'Gardner odaklı farklı perspektif sunumu.', icon: '🖐️' },
  { id: 'bloom-cards', name: 'Düşünce Noktaları', category: ToolCategory.PEDAGOGY, description: 'Bloom seviyelerine göre kademeli kartlar.', icon: '💡' },
  { id: 'tiered-lesson', name: 'Kademeli Ders Planı', category: ToolCategory.PEDAGOGY, description: 'Hazırbulunuşluğa göre seviyeli planlama.', icon: '🪜' },

  // Farklılaştırma ve Yaratıcı Görevler
  { id: 'equalizer', name: 'Farklılaştırma Eşitleyici', category: ToolCategory.DIFFERENTIATION, description: 'Zorluk ve karmaşıklık ayarı (Tomlinson).', icon: '🎚️' },
  { id: 'raft', name: 'RAFT Yazma Stratejisi', category: ToolCategory.DIFFERENTIATION, description: 'Rol-Kitle-Format-Konu odaklı görevler.', icon: '⛵' },
  { id: 'tictactoe', name: 'Tic-Tac-Toe Seçim Panosu', category: ToolCategory.DIFFERENTIATION, description: '3x3 grid üzerinde 9 farklı öğrenme görevi.', icon: '❌' },
  { id: 'choice-board', name: 'Seçim Panoları', category: ToolCategory.DIFFERENTIATION, description: 'Öğrenci özerkliği için görev listeleri.', icon: '🍱' },

  // Etkileşim ve Sınıf Yönetimi
  { id: 'hooks', name: 'Ders Kancaları', category: ToolCategory.INTERACTION, description: 'Dikkat çekici ve merak uyandırıcı girişler.', icon: '🪝' },
  { id: 'real-world', name: 'Gerçek Dünya Bağlantıları', category: ToolCategory.INTERACTION, description: 'Konuyu günlük hayatla ilişkilendirme.', icon: '🌍' },
  { id: 'transfer', name: 'Transfer Görevleri', category: ToolCategory.INTERACTION, description: 'Öğrenileni yeni durumlara aktarma.', icon: '📤' },
  { id: 'pbl', name: 'Proje Tabanlı Öğrenme', category: ToolCategory.INTERACTION, description: 'Gerçek dünya problemlerine çözümler.', icon: '🏗️' },
  { id: 'cooperative', name: 'İş Birlikli Öğrenme', category: ToolCategory.INTERACTION, description: 'Grup çalışması stratejileri.', icon: '🤝' },
  { id: 'classroom-mgmt', name: 'Sınıf Yönetimi', category: ToolCategory.INTERACTION, description: 'Durumsal yönetim stratejileri.', icon: '🏫' }
];
