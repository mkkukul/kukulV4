
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import { Tool } from '../types';
import { EDUCATIONAL_TASKS } from '../constants/tasks';
import { AnalysisStudio, VisualStudio, RaftPanel, StepperPanel, KWHLAQPanel } from './ActionPanels';

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
  const [assistantPrompt, setAssistantPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (initialToolId) {
      const tool = EDUCATIONAL_TASKS.find(t => t.id === initialToolId);
      if (tool) setCurrentTask(tool);
    }
  }, [initialToolId]);

  const renderActionPanel = () => {
    switch (currentTask.id) {
      case 'deneme-analizi':
      case 'lgs-analiz':
      case 'yks-koc':
        return <AnalysisStudio 
          onAnalyze={(data) => setAssistantPrompt(data)} 
          isLoading={false} 
        />;
      case 'visual-studio':
        return <VisualStudio />;
      case 'raft-builder':
        return <RaftPanel 
          onGenerate={(data) => setAssistantPrompt(data)} 
        />;
      case '4mat-plan':
        return <StepperPanel 
          onStepClick={(data) => setAssistantPrompt(data)} 
        />;
      case 'kwhlaq-board':
        return <KWHLAQPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[100dvh] bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500 font-sans">
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
            {/* 1. Aksiyon Paneli Alanı */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderActionPanel()}
            </div>
            
            {/* 2. Akıllı Danışman (Alt Bölümde Entegre) */}
            <div className="bg-slate-100/30 dark:bg-slate-900/10 rounded-[2rem] md:rounded-[4rem] border border-slate-200/40 dark:border-slate-800/40 overflow-hidden transition-all duration-700 shadow-inner">
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
