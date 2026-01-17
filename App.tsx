
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState, Tool } from './types';
import { EDUCATIONAL_TASKS } from './constants/tasks';

const Navbar: React.FC<{ 
  onHome: () => void; 
  theme: 'light' | 'dark'; 
  toggleTheme: () => void 
}> = ({ onHome, theme, toggleTheme }) => (
  <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-[110] transition-colors duration-500">
    <button onClick={onHome} className="group flex items-center gap-3 outline-none">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
        {/* Owl / Bird Icon */}
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L4 9v12h16V9l-8-7z" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          <path d="M12 14v2" strokeLinecap="round" />
        </svg>
        {/* Lightning / Zap Icon */}
        <svg className="h-4 w-4 absolute -bottom-1 -right-1 text-yellow-400 fill-yellow-400 animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <span className="text-xl font-black tracking-tighter dark:text-white uppercase transition-opacity group-hover:opacity-80">
        KuKul <span className="text-blue-600">Hoca</span>
      </span>
    </button>
    
    <button 
      onClick={toggleTheme} 
      className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 shadow-sm backdrop-blur-md"
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  </nav>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleStart = (toolId?: string) => {
    if (toolId) setSelectedToolId(toolId);
    setView('dashboard');
  };

  const handleGoHome = () => {
    setView('landing');
    setSelectedToolId(null);
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      <Navbar onHome={handleGoHome} theme={theme} toggleTheme={toggleTheme} />
      
      <div className="h-full">
        {view === 'landing' ? (
          <LandingPage 
            onStart={handleStart} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
        ) : (
          <Dashboard 
            theme={theme} 
            toggleTheme={toggleTheme} 
            initialToolId={selectedToolId} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
