
export enum ToolCategory {
  CONTENT = 'İçerik Üretimi',
  LANGUAGE = 'Dil ve Metin Analizi',
  PEDAGOGY = 'Pedagojik Modeller',
  DIFFERENTIATION = 'Farklılaştırma ve Yaratıcılık',
  INTERACTION = 'Etkileşim ve Strateji',
  ANALYSIS = 'Ölçme ve Analiz',
  PROFILE = 'Kişisel Veri'
}

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: string;
  systemPrompt?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text?: string; inlineData?: { mimeType: string; data: string } }[];
  timestamp: number;
}

export type ViewState = 'landing' | 'dashboard';

export interface ExamSubject {
  name: string;
  correct: number;
  incorrect: number;
  net: number;
}

export interface StudentProfile {
  name: string;
  grade: string;
  target: string;
  averageNet: number;
  notes: string;
}

export interface ExamHistoryEntry {
  id: string;
  date: number;
  examType: 'LGS' | 'TYT';
  totalNet: number;
  subjects: ExamSubject[];
}

export interface AnalysisResult {
  emergencyList: string[];
  lessonStats: {
    name: string;
    score: number;
    advice: string;
    status: 'success' | 'warning' | 'error';
  }[];
}
