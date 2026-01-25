
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

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
    <div className="min-h-[100dvh] w-full bg-[#f1f5f9] dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden font-sans selection:bg-blue-500/30">
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
          onHome={handleGoHome}
        />
      )}
    </div>
  );
};

export default App;
