
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';
import { EDUCATIONAL_TASKS } from './constants/tasks';

const Navbar: React.FC<{ 
  onHome: () => void; 
}> = ({ onHome }) => (
  <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-[110] transition-colors duration-500 pointer-events-none">
    <button 
      onClick={onHome} 
      className="group flex items-center gap-2 outline-none pointer-events-auto"
      aria-label="kukul.io Anasayfa"
    >
      <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L4 9v12h16V9l-8-7z" />
          <circle cx="9" cy="11" r="1" fill="currentColor" />
          <circle cx="15" cy="11" r="1" fill="currentColor" />
          <path d="M12 14v1" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-lg md:text-2xl font-black tracking-tighter dark:text-white lowercase transition-opacity group-hover:opacity-80">
        kukul.<span className="text-blue-600">io</span>
      </span>
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
    <div className="min-h-[100dvh] w-full bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans">
      {view === 'dashboard' && <Navbar onHome={handleGoHome} />}
      
      <div className="h-full w-full">
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
