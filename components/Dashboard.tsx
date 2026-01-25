
import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import { Tool, StudentProfile, ChatMessage } from '../types';
import { EDUCATIONAL_TASKS } from '../constants/tasks';
import { AnalysisStudio, VisualStudio, RaftPanel, StepperPanel, KWHLAQPanel, StudentProfilePanel, HooksPanel } from './ActionPanels';

type AnalysisTab = 'input' | 'koc' | 'performance' | 'strategy' | 'topics';

interface DashboardProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  initialToolId?: string | null;
  onHome: () => void;
}

const MeerkatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
    <path d="M9 11v6a3 3 0 0 0 6 0v-6" />
    <path d="M12 21v-4" />
    <path d="M8 21h8" />
  </svg>
);

const Logo = ({ onHome }: { onHome: () => void }) => (
  <div onClick={onHome} className="flex items-center gap-2 group cursor-pointer select-none shrink-0">
    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
      <MeerkatIcon className="h-6 w-6" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-black tracking-tighter dark:text-white">kukul<span className="text-blue-600">.io</span></span>
      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">Elite AI Observer</span>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ theme, toggleTheme, initialToolId, onHome }) => {
  const [currentTask, setCurrentTask] = useState<Tool>(
    initialToolId 
    ? (EDUCATIONAL_TASKS.find(t => t.id === initialToolId) || EDUCATIONAL_TASKS[0])
    : EDUCATIONAL_TASKS[0]
  );
  
  const [activeTab, setActiveTab] = useState<AnalysisTab>('input');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<ChatMessage | null>(null);
  
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('student_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const handleExternalPrompt = (text: string, fileData?: { mimeType: string, data: string }) => {
    const parts: any[] = [{ text }];
    if (fileData) {
      parts.push({ inlineData: { mimeType: fileData.mimeType, data: fileData.data } });
    }
    setAssistantPrompt({
      role: 'user',
      parts,
      timestamp: Date.now()
    });
    
    setIsAnalyzed(true);
    setActiveTab('koc'); // Analizden sonra otomatik AI Koç'a geçiş
  };

  const isAnalysisTool = ['deneme-analizi', 'lgs-analiz', 'yks-koc'].includes(currentTask.id);

  const tabs = [
    { id: 'input', label: 'Veri Girişi' },
    { id: 'koc', label: '🦉 Kukul AI Koç' },
    { id: 'performance', label: 'Stratejik Performans' },
    { id: 'strategy', label: 'Akıllı Strateji' },
    { id: 'topics', label: 'Konu Analizi' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] dark:bg-[#020617] relative">
      
      {/* SABİT ÜST NAVİGASYON (Fixed Header) */}
      <nav className="fixed top-0 w-full z-[110] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          <Logo onHome={onHome} />
          
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl overflow-x-auto hide-scrollbar border border-slate-200 dark:border-slate-700">
            {tabs.map(tab => {
              const isDisabled = !isAnalyzed && tab.id !== 'input';
              return (
                <button 
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  disabled={isDisabled}
                  className={`px-4 md:px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : isDisabled 
                      ? 'opacity-20 cursor-not-allowed' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* AKIŞKAN İÇERİK ALANI - pt-32 header boşluğu için */}
      <main className="flex-1 pt-32 pb-32 px-4 md:px-10 max-w-7xl mx-auto w-full relative z-10 overflow-visible">
        
        {/* ÖĞRENCİ KİMLİK KARTI */}
        {studentProfile && (
          <div className="mb-8 p-6 bg-white/60 dark:bg-slate-900/40 rounded-[2rem] border border-white/40 dark:border-slate-800/40 backdrop-blur-md flex items-center justify-between animate-in fade-in duration-1000 shadow-sm">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/20">
                 {studentProfile.name.charAt(0).toUpperCase()}
               </div>
               <div>
                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Akademik Kimlik</p>
                 <p className="font-black text-xl dark:text-white">{studentProfile.name} <span className="text-slate-300 mx-2 font-thin">|</span> <span className="text-blue-600">{studentProfile.grade}</span></p>
               </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Kritik Hedef</p>
              <p className="font-black text-rose-600 dark:text-rose-400 text-lg">{studentProfile.target || 'Hedef Belirlenmedi'}</p>
            </div>
          </div>
        )}

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {isAnalysisTool ? (
            <AnalysisStudio 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onAnalyze={handleExternalPrompt}
              isAnalyzed={isAnalyzed}
              isLoading={false}
              theme={theme}
            >
              {activeTab === 'koc' && (
                <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in duration-500">
                   <ChatInterface 
                      tool={currentTask} 
                      theme={theme} 
                      externalPrompt={assistantPrompt}
                      onPromptProcessed={() => setAssistantPrompt(null)}
                      isFullPage={true}
                    />
                </div>
              )}
            </AnalysisStudio>
          ) : (
            <div className="space-y-8">
              {currentTask.id === 'student-profile' ? (
                <StudentProfilePanel onSave={(p) => {
                  setStudentProfile(p);
                  handleExternalPrompt(`Profilimi güncelledim: ${p.name}, ${p.grade}, Hedef: ${p.target}. Lütfen bu bilgilere göre Kukul AI Koç tavsiyelerini bekliyorum.`);
                }} />
              ) : currentTask.id === 'hooks' ? (
                <HooksPanel onHookClick={(data) => handleExternalPrompt(data)} />
              ) : currentTask.id === 'visual-studio' ? (
                <VisualStudio />
              ) : currentTask.id === 'raft-builder' ? (
                <RaftPanel onGenerate={(data) => handleExternalPrompt(data)} />
              ) : currentTask.id === '4mat-plan' ? (
                <StepperPanel onStepClick={(data) => handleExternalPrompt(data)} />
              ) : currentTask.id === 'kwhlaq-board' ? (
                <KWHLAQPanel />
              ) : (
                <div className="bg-white/80 dark:bg-slate-900/60 rounded-[3rem] border border-slate-200/50 shadow-2xl overflow-hidden backdrop-blur-xl">
                  <ChatInterface 
                    tool={currentTask} 
                    theme={theme} 
                    externalPrompt={assistantPrompt}
                    onPromptProcessed={() => setAssistantPrompt(null)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* EN ARKA KATMAN KAMPÜS SİLÜETİ - Opaklık %40 ve sabitlendi */}
      <div className="fixed bottom-0 left-0 w-full h-[35vh] pointer-events-none z-0 opacity-40 transition-all duration-1000">
         <div className="absolute bottom-0 w-full h-full bg-slate-400 dark:bg-slate-800" 
              style={{ clipPath: 'polygon(0% 100%, 0% 70%, 8% 70%, 8% 40%, 15% 40%, 15% 70%, 30% 70%, 30% 20%, 45% 20%, 45% 85%, 60% 85%, 60% 40%, 75% 40%, 75% 90%, 85% 90%, 85% 30%, 95% 30%, 95% 100%, 100% 100%)' }} />
      </div>
    </div>
  );
};

export default Dashboard;
