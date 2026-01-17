
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import { Tool } from '../types';
import { EDUCATIONAL_TASKS } from '../constants/tasks';

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

  useEffect(() => {
    if (initialToolId) {
      const tool = EDUCATIONAL_TASKS.find(t => t.id === initialToolId);
      if (tool) setCurrentTask(tool);
    }
  }, [initialToolId]);

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <Sidebar 
        currentTool={currentTask} 
        onSelectTool={(task) => {
          setCurrentTask(task);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        theme={theme}
      />
      
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        <div className="lg:hidden absolute top-4 left-4 z-50 flex gap-2">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <ChatInterface tool={currentTask} theme={theme} toggleTheme={toggleTheme} />
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
