
import { Tool, ToolCategory } from '../types';

export const EDUCATIONAL_TOOLS: Tool[] = [
  { 
    id: 'deneme-analizi', 
    name: 'Deneme Analizi', 
    category: ToolCategory.ANALYSIS, 
    description: 'LGS ve YKS netlerini hesaplar ve stratejik analiz yapar.', 
    icon: '📈',
    systemPrompt: "Sen kukul.io Baş Analistisin. Kullanıcının girdiği net verilerini analiz et, zayıf noktaları belirle ve ders çalışma stratejisi oluştur."
  },
  { 
    id: 'visual-studio', 
    name: 'Hayal Atölyesi', 
    category: ToolCategory.CONTENT, 
    description: 'Eğitim görselleri ve materyalleri tasarlar.', 
    icon: '🎨',
    systemPrompt: "Sen kukul.io Görsel Tasarım Direktörüsün. Eğitici görseller üretmek için promptlar oluştur ve sonuçları yorumla."
  },
  { 
    id: 'raft', 
    name: 'RAFT Tasarımcısı', 
    category: ToolCategory.DIFFERENTIATION, 
    description: 'Rol-Kitle-Format-Konu odaklı görevler.', 
    icon: '⛵',
    systemPrompt: "RAFT (Rol, Kitle, Format, Konu) stratejisiyle yaratıcı yazma görevleri tasarla."
  },
  { 
    id: 'kwhlaq', 
    name: 'KWHLAQ Pano Modülü', 
    category: ToolCategory.PEDAGOGY, 
    description: 'Sorgulamaya dayalı öğrenme planı.', 
    icon: '📋',
    systemPrompt: "KWHLAQ tablosu için öğrenci girdilerini analiz et ve derinleşme soruları öner."
  },
  { 
    id: 'text-leveler', 
    name: 'Metin Seviye Ayarlayıcı', 
    category: ToolCategory.LANGUAGE, 
    description: 'Metinleri sınıf seviyesine göre ayarlar.', 
    icon: '📶',
    systemPrompt: "Metinleri farklı sınıf seviyelerine (ilkokul, lise, akademik) uygun hale getir."
  },
  { id: 'podcast', name: 'Podcast Oluşturucu', category: ToolCategory.CONTENT, description: 'Ders içeriklerini podcast senaryosuna dönüştürür.', icon: '🎙️' },
  { id: '4mat', name: '4MAT Öğretim Modeli', category: ToolCategory.PEDAGOGY, description: '8 adımlı döngüsel ders tasarımı.', icon: '🔄' },
  { id: 'hooks', name: 'Ders Kancaları', category: ToolCategory.INTERACTION, description: 'Dikkat çekici ve merak uyandırıcı girişler.', icon: '🪝' }
];
