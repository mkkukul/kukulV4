
export enum ToolCategory {
  CONTENT = 'İçerik Üretimi',
  LANGUAGE = 'Dil ve Metin Analizi',
  PEDAGOGY = 'Pedagojik Modeller',
  DIFFERENTIATION = 'Farklılaştırma ve Yaratıcılık',
  INTERACTION = 'Etkileşim ve Strateji',
  ANALYSIS = 'Ölçme ve Analiz'
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
