
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-y-auto hide-scrollbar selection:bg-blue-500/30 selection:text-blue-900">
      
      {/* 1. SABİT ÜST KISIM (Fixed Header) */}
      <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-between items-center backdrop-blur-xl bg-white/60 dark:bg-[#020617]/60 border-b border-slate-200/10 dark:border-slate-800/10 transition-all duration-500">
        <div className="group flex items-center gap-2 cursor-pointer">
          <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
            <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L4 9v12h16V9l-8-7z" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
              <path d="M12 14v1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg md:text-2xl font-black tracking-tighter lowercase">
            kukul.<span className="text-blue-600">io</span>
          </span>
        </div>
        
        <button 
          onClick={toggleTheme} 
          className="p-2 md:p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 shadow-sm"
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

      {/* 2. ARKA PLAN GÖRSEL KATMANLAR (Glows) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow [animation-delay:2s]"></div>
      </div>

      {/* 3. ANA İÇERİK (Scroll Edilebilir) */}
      <main className="flex-1 flex flex-col items-center justify-start lg:justify-center px-6 pt-32 pb-20 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Slogan Bölümü */}
        <div className="text-center space-y-4 md:space-y-6 w-full max-w-4xl mb-12 md:mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1]">
            Sınırlarını Aş,<br />
            <span className="text-blue-600 italic font-extrabold">Geleceğini Tasarla.</span>
          </h1>
          <p className="text-sm md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed px-2">
            Karmaşayı geride bırak. <span className="text-blue-600 font-bold">kukul.io</span> ile analizlerini derinleştir, stratejini netleştir ve hedeflerine ulaş.
          </p>
        </div>

        {/* Modül Kartları Bölümü */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-5xl animate-in fade-in zoom-in duration-700 delay-300">
          
          {/* LGS Analizi Kartı */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl hover:shadow-blue-500/10 hover:border-blue-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98]"
          >
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <svg className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-4xl font-black mb-2 dark:text-white tracking-tight leading-none">LGS Analizi</h2>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest opacity-70">Veri Odaklı Başarı Stratejisi</p>
            </div>
            <div className="mt-8 md:mt-12 flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Hemen Başla <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                📈
              </div>
            </div>
          </div>

          {/* YKS Analizi Kartı */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl hover:shadow-purple-500/10 hover:border-purple-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98]"
          >
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <svg className="h-6 w-6 md:h-8 md:w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-4xl font-black mb-2 dark:text-white tracking-tight leading-none">YKS Koçluk</h2>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest opacity-70">Üniversite Yolunda Akıllı Rehber</p>
            </div>
            <div className="mt-8 md:mt-12 flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-purple-600 group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Hemen Başla <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                🎓
              </div>
            </div>
          </div>

        </div>

        {/* Alt Bilgi */}
        <footer className="mt-16 md:mt-24 text-center">
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] lg:tracking-[0.8em] opacity-50 hover:opacity-100 transition-opacity cursor-default">
            © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default LandingPage;
