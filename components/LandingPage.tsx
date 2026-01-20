
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const MeerkatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <path d="M10 12h4" />
    <path d="M7 15v2a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2" />
  </svg>
);

const ShellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
    <path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-slate-50 dark:bg-[#020617] edu-bg transition-all duration-700 overflow-y-auto hide-scrollbar relative">
      
      {/* 1. ELITE FIXED HEADER (PEARL GLASS) */}
      <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-between items-center backdrop-blur-xl bg-slate-50/40 dark:bg-[#020617]/40 border-b border-slate-200/50 dark:border-slate-800/30">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-blue-600 dark:bg-blue-700 text-white rounded-2xl shadow-xl transition-transform group-hover:scale-110">
            <ShellIcon className="h-6 w-6 animate-float" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-black text-xl md:text-3xl tracking-tighter dark:text-white uppercase leading-none">
              kukul.<span className="text-blue-600">io</span>
            </span>
            <div className="flex items-center gap-1 opacity-60">
              <MeerkatIcon className="h-3 w-3 text-yellow-500" />
              <span className="text-[8px] font-black uppercase tracking-[0.25em] dark:text-slate-400">Elite AI Observer</span>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-all text-yellow-500 shadow-lg"
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col items-center justify-start lg:justify-center px-6 pt-32 md:pt-40 pb-20 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Subtle Pearl Gradients */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px] animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#800000]/5 dark:bg-red-900/10 rounded-full blur-[140px] animate-pulse-slow [animation-delay:3s]"></div>
        </div>

        {/* Slogan Section - Elite Pearl Typography */}
        <div className="text-center space-y-4 mb-20 md:mb-28 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none italic">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-purple-700 to-blue-600">
              Sınırlarını Aş,
            </span>
          </h1>

          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none italic uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-900 whitespace-nowrap">
              GELECEĞİNİ TASARLA
            </span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-base md:text-2xl max-w-xl mx-auto font-medium pt-8 leading-relaxed">
            Karmaşayı geride bırak. <span className="font-black dark:text-white">kukul.io</span> ile analizlerini derinleştir, stratejini netleştir.
          </p>
        </div>

        {/* Action Cards (Glass Pearl Elite) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300">
          
          {/* LGS KARTI (Pearl Glass) */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border-2 border-blue-600/5 dark:border-blue-600/10 bg-white/80 dark:bg-white/5 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/15 hover:border-blue-600 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-all rotate-12 scale-150">
              <ShellIcon className="w-40 h-40 text-blue-600" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.25rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter uppercase leading-none">LGS Başarı Analizi</h2>
              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">
                Netlerini hedeflerine dönüştür. <span className="text-blue-600 font-bold">KuKul AI</span> ile her sorunun analizini yap ve gelişimini takip et.
              </p>
            </div>
            
            <button className="w-full py-6 md:py-7 bg-blue-600 hover:bg-yellow-400 hover:text-slate-950 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          {/* YKS KARTI (Pearl Glass) */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border-2 border-[#800000]/5 dark:border-[#800000]/10 bg-white/80 dark:bg-white/5 backdrop-blur-2xl shadow-xl hover:shadow-red-500/15 hover:border-[#800000] transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-all -rotate-12 scale-150">
              <ShellIcon className="w-40 h-40 text-[#800000]" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-[#800000] text-white rounded-[1.25rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter uppercase leading-none">YKS Başarı Analizi</h2>
              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">
                Stratejini zirveye taşı. <span className="text-[#800000] font-bold">KuKul AI</span> ile sınav performansını analiz et ve yol haritanı oluştur.
              </p>
            </div>
            
            <button className="w-full py-6 md:py-7 bg-[#800000] hover:bg-yellow-400 hover:text-slate-950 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

        </div>

        {/* Minimal Footer */}
        <footer className="mt-28 md:mt-44 text-center opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-slate-500 dark:text-slate-600">
            © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default LandingPage;
