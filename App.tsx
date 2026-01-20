
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

const MeerkatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-.6 0-1.1.2-1.5.6l-1.9 1.9c-.4.4-.6.9-.6 1.5v2c0 .6.2 1.1.6 1.5L10 11v2c0 1.1.9 2 2 2s2-.9 2-2v-2l1.4-1.4c.4-.4.6-.9.6-1.5v-2c0-.6-.2-1.1-.6-1.5L13.5 2.6c-.4-.4-.9-.6-1.5-.6z" />
    <path d="M10 20c0 1.1.9 2 2 2s2-.9 2-2" />
    <circle cx="10.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <path d="M12 8v.01" />
  </svg>
);

const ShellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
    <path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const Navbar: React.FC<{ 
  onHome: () => void; 
}> = ({ onHome }) => (
  <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-[110] transition-colors duration-500 pointer-events-none">
    <button 
      onClick={onHome} 
      className="group flex items-center gap-3 outline-none pointer-events-auto"
      aria-label="kukul.io Anasayfa"
    >
      <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/30 transition-all group-hover:scale-105">
        <MeerkatIcon className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:-translate-y-1" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-100 dark:border-slate-900 group-hover:scale-125 transition-transform">
          <ShellIcon className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-900 fill-blue-900" />
        </div>
      </div>
      <span className="text-xl md:text-3xl font-black tracking-tighter dark:text-white flex items-baseline group-hover:opacity-90 transition-opacity">
        kukul<span className="text-blue-500 text-2xl md:text-4xl leading-none">.io</span>
      </span>
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
    <div className="min-h-[100dvh] w-full bg-slate-100 dark:bg-[#020617] edu-bg text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-yellow-400/30">
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
