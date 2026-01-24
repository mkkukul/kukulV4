
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

const MeerkatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
    <path d="M9 11v6a3 3 0 0 0 6 0v-6" />
    <path d="M12 21v-4" />
    <path d="M8 21h8" />
    <circle cx="10.5" cy="5.5" r="0.5" fill="currentColor" />
    <circle cx="13.5" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);

const ShellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
  </svg>
);

const MeerkatLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-all group-hover:scale-110 group-hover:rotate-3">
      <MeerkatIcon className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:-translate-y-1" />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-100 dark:border-slate-900 transition-transform group-hover:scale-110">
        <ShellIcon className="h-3 w-3 md:h-3.5 md:w-3.5 text-blue-900" />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-baseline">
        kukul<span className="text-blue-600 ml-0.5">.io</span>
      </span>
      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Elite AI Observer</span>
    </div>
  </div>
);

const Navbar: React.FC<{ 
  onHome: () => void; 
}> = ({ onHome }) => (
  <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-[110] transition-colors duration-500 pointer-events-none">
    <button 
      onClick={onHome} 
      className="outline-none pointer-events-auto"
      aria-label="kukul.io Anasayfa"
    >
      <MeerkatLogo />
    </button>
  </nav>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    <div className="min-h-[100dvh] w-full bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-blue-500/30 edu-bg">
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
