
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col p-8 md:p-12 relative bg-transparent">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[140px] animate-pulse-slow [animation-delay:2s] pointer-events-none"></div>

      {/* 1. Header Section */}
      <header className="flex justify-between items-center shrink-0 z-20">
        <div className="group flex items-center gap-3 cursor-pointer">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-transform group-hover:scale-110">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L4 9v12h16V9l-8-7z" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
              <path d="M12 14v1.5" strokeLinecap="round" />
            </svg>
            <svg className="h-3.5 w-3.5 absolute -bottom-1 -right-1 text-yellow-400 fill-yellow-400 animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,1)]" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter dark:text-white lowercase">
            kukul.<span className="text-blue-600">io</span>
          </span>
        </div>
        
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
      </header>

      {/* 2. Content Section - Perfectly Centered */}
      <main className="flex-1 flex flex-col items-center justify-center space-y-12 max-h-full z-10">
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-top-6 duration-1000 max-w-3xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter dark:text-white leading-[0.85]">
            Sınırlarını Aş,<br />
            <span className="text-blue-600 italic font-extrabold text-4xl md:text-6xl tracking-tight">Geleceğini Tasarla.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl max-w-xl mx-auto leading-relaxed px-4">
            Karmaşayı geride bırak. <span className="text-blue-600 font-bold">kukul.io</span> ile analizlerini derinleştir, stratejini netleştir.
          </p>
        </div>

        {/* 3. Module Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl px-4 animate-in fade-in zoom-in duration-700 delay-300">
          <div 
            onClick={() => onStart('lgs-analiz')}
            className="group cursor-pointer p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/30 hover:scale-[1.03] hover:border-blue-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] h-full"
          >
            <div>
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <svg className="h-9 w-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-2 dark:text-white tracking-tight">LGS Analizi</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest opacity-80">Netlerini Başarıya Dönüştür</p>
            </div>
            <button className="mt-8 w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group-hover:translate-y-[-2px]">
              Analize Başla
            </button>
          </div>

          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-purple-600/30 hover:scale-[1.03] hover:border-purple-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] h-full"
          >
            <div>
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <svg className="h-9 w-9 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-2 dark:text-white tracking-tight">YKS Analizi</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest opacity-80">Stratejinle Fark Yarat</p>
            </div>
            <button className="mt-8 w-full h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group-hover:translate-y-[-2px]">
              Analize Başla
            </button>
          </div>
        </div>
      </main>

      <footer className="p-4 shrink-0 text-center text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.6em] z-10 transition-opacity opacity-40 hover:opacity-100">
        © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
      </footer>
    </div>
  );
};

export default LandingPage;
