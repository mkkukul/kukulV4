
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import { Tool, StudentProfile, ChatMessage } from '../types';
import { EDUCATIONAL_TASKS } from '../constants/tasks';
import { AnalysisStudio, VisualStudio, RaftPanel, StepperPanel, KWHLAQPanel, StudentProfilePanel } from './ActionPanels';

interface DashboardProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  initialToolId?: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ theme, toggleTheme, initialToolId }) => {
  const [currentTask, setCurrentTask] = useState<Tool>(
    initialToolId 
    ? (EDUCATIONAL_TASKS.find(t => t.id === initialToolId) || EDUCATIONAL_TASKS[0])
    : EDUCATIONAL_TASKS[0]
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<ChatMessage | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('student_profile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (initialToolId) {
      const tool = EDUCATIONAL_TASKS.find(t => t.id === initialToolId);
      if (tool) setCurrentTask(tool);
    }
  }, [initialToolId]);

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
  };

  const renderActionPanel = () => {
    switch (currentTask.id) {
      case 'student-profile':
        return <StudentProfilePanel onSave={(p) => {
          setStudentProfile(p);
          handleExternalPrompt(`Profilimi güncelledim: ${p.name}, ${p.grade}, Hedef: ${p.target}. Lütfen bana bu bilgiler ışığında kısa bir motivasyon mesajı ver.`);
        }} />;
      case 'deneme-analizi':
      case 'lgs-analiz':
      case 'yks-koc':
        return <AnalysisStudio 
          onAnalyze={handleExternalPrompt} 
          isLoading={false} 
        />;
      case 'visual-studio':
        return <VisualStudio />;
      case 'raft-builder':
        return <RaftPanel 
          onGenerate={(data) => handleExternalPrompt(data)} 
        />;
      case '4mat-plan':
        return <StepperPanel 
          onStepClick={(data) => handleExternalPrompt(data)} 
        />;
      case 'kwhlaq-board':
        return <KWHLAQPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[100dvh] bg-[#f1f5f9] dark:bg-[#020617] overflow-hidden transition-colors duration-500 font-sans">
      <Sidebar 
        currentTool={currentTask} 
        onSelectTool={(task) => {
          setCurrentTask(task);
          setIsSidebarOpen(false);
          setAssistantPrompt(null);
        }}
        isOpen={isSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        {/* Mobil Menü Butonu */}
        <div className="lg:hidden absolute top-24 left-4 z-50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar pb-24 lg:pb-12">
          <div className="p-4 lg:p-10 max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
            
            {/* Hoş Geldin Mesajı (Profil varsa) */}
            {studentProfile && currentTask.id !== 'student-profile' && (
              <div className="bg-white/50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between animate-in fade-in duration-700">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-black">
                     {studentProfile.name.charAt(0).toUpperCase()}
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Akademik Takip Aktif</p>
                     <p className="font-bold dark:text-white">{studentProfile.name} • {studentProfile.grade}</p>
                   </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Hedef</p>
                  <p className="font-black text-blue-600 dark:text-blue-400 truncate max-w-[200px]">{studentProfile.target}</p>
                </div>
              </div>
            )}

            {/* 1. Aksiyon Paneli Alanı */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderActionPanel()}
            </div>
            
            {/* 2. Akıllı Danışman (Alt Bölümde Entegre) */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[4rem] border border-slate-200/40 dark:border-slate-800/40 overflow-hidden transition-all duration-700 shadow-xl">
              <ChatInterface 
                tool={currentTask} 
                theme={theme} 
                externalPrompt={assistantPrompt}
                onPromptProcessed={() => setAssistantPrompt(null)}
              />
            </div>
          </div>
        </div>
      </main>
      
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
