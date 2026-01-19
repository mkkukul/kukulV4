
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-start lg:justify-center px-6 pt-24 pb-12 lg:pt-0 overflow-x-hidden relative bg-transparent selection:bg-blue-500/30 selection:text-blue-900 transition-all duration-500">
      
      {/* Background Glows - Pointer events disabled to prevent interaction issues */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[80px] md:blur-[140px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[80px] md:blur-[140px] animate-pulse-slow [animation-delay:2s] pointer-events-none"></div>

      {/* Fixed Header Section */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="group flex items-center gap-2 pointer-events-auto cursor-pointer">
          <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-transform group-hover:scale-110">
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L4 9v12h16V9l-8-7z" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
              <path d="M12 14v1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg md:text-2xl font-black tracking-tighter dark:text-white lowercase">
            kukul.<span className="text-blue-600">io</span>
          </span>
        </div>
        
        <button 
          onClick={toggleTheme} 
          className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 shadow-sm backdrop-blur-md pointer-events-auto"
        >
          {theme === 'dark' ? (
            <svg className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" />
            </svg>
          ) : (
            <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center w-full z-10 space-y-8 lg:space-y-16">
        {/* Responsive Slogan Section */}
        <div className="text-center space-y-4 lg:space-y-6 w-full max-w-4xl animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter dark:text-white leading-[1.05] lg:leading-[0.9]">
            Sınırlarını Aş,<br />
            <span className="text-blue-600 italic font-extrabold tracking-tight">Geleceğini Tasarla.</span>
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md lg:max-w-2xl mx-auto leading-relaxed px-4 opacity-80">
            Eğitimde veriyle fark yarat. <span className="text-blue-600 font-bold">kukul.io</span> karmaşıklığı basitliğe dönüştürür, potansiyelini stratejiye çevirir.
          </p>
        </div>

        {/* Responsive Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 w-full max-w-4xl px-2 md:px-4 animate-in fade-in zoom-in duration-700 delay-300">
          {/* LGS Analizi Card */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-600/20 hover:scale-[1.02] hover:border-blue-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98]"
          >
            <div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 dark:bg-blue-900/30 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-transform group-hover:scale-110">
                <svg className="h-7 w-7 lg:h-9 lg:w-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black mb-1 lg:mb-2 dark:text-white tracking-tight">LGS Strateji</h2>
              <p className="text-[10px] lg:text-sm text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest opacity-70">Hedef Odaklı Analiz</p>
            </div>
            <button className="mt-6 lg:mt-8 w-full h-12 lg:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl lg:rounded-2xl font-black text-sm lg:text-lg shadow-lg shadow-blue-500/20 transition-all">
              Hemen Başla
            </button>
          </div>

          {/* YKS Analizi Card */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-purple-600/20 hover:scale-[1.02] hover:border-purple-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98]"
          >
            <div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-50 dark:bg-purple-900/30 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-transform group-hover:scale-110">
                <svg className="h-7 w-7 lg:h-9 lg:w-9 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black mb-1 lg:mb-2 dark:text-white tracking-tight">YKS Koçluk</h2>
              <p className="text-[10px] lg:text-sm text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest opacity-70">Sıralamanı Yükselt</p>
            </div>
            <button className="mt-6 lg:mt-8 w-full h-12 lg:h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-xl lg:rounded-2xl font-black text-sm lg:text-lg shadow-lg shadow-purple-500/20 transition-all">
              Hemen Başla
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-auto pt-12 text-center text-[9px] lg:text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] transition-opacity opacity-40 hover:opacity-100">
        © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
      </footer>
    </div>
  );
};

export default LandingPage;
