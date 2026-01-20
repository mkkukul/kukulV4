
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

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

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/20 transition-all group-hover:scale-110 group-hover:-rotate-3">
      <MeerkatIcon className="h-7 w-7 transition-transform group-hover:-translate-y-1" />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-100 dark:border-slate-900 group-hover:scale-125 transition-transform">
        <ShellIcon className="h-3 w-3 text-blue-900 fill-blue-900" />
      </div>
    </div>
    <span className="text-3xl font-black tracking-tighter dark:text-white flex items-baseline">
      kukul<span className="text-blue-500 text-4xl leading-none">.io</span>
    </span>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-100 dark:bg-[#020617] edu-bg transition-all duration-700 overflow-y-auto hide-scrollbar relative">
      
      {/* 1. ELITE FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-between items-center backdrop-blur-xl bg-slate-100/60 dark:bg-[#020617]/60 border-b border-slate-200/50 dark:border-slate-800/30">
        <Logo />

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
        
        {/* Subtle Glow Effects */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-rose-500/[0.04] dark:bg-rose-500/10 rounded-full blur-[140px] animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.04] dark:bg-blue-500/10 rounded-full blur-[140px] animate-pulse-slow [animation-delay:3s]"></div>
        </div>

        {/* Slogan Section - Reverse Gradient & Summit Typography */}
        <div className="text-center space-y-4 mb-20 md:mb-32 animate-in fade-in slide-in-from-top-4 duration-1000 z-10">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none whitespace-nowrap inline-block skew-x-[12deg]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-500 to-blue-500">
              Sınırlarını Aş,
            </span>
          </h1>

          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none italic uppercase whitespace-nowrap block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-rose-600">
              GELECEĞİNİ TASARLA.
            </span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium pt-8 leading-relaxed">
            Karmaşayı geride bırak. <span className="font-black dark:text-white">kukul.io</span> ile zirveye giden yolu analizlerinle netleştir.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300 z-10">
          
          {/* LGS BAŞARI ANALİZİ (Açık Mavi Tema) */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border-2 border-blue-500/10 dark:border-blue-500/20 bg-white/80 dark:bg-white/5 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/20 hover:border-blue-500 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all scale-150">
              <MeerkatIcon className="w-10 h-10 text-blue-500" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-500 text-white rounded-[1.25rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter uppercase leading-none">LGS BAŞARI ANALİZİ</h2>
              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">
                Netlerini hedeflerine dönüştür. Her sorunun analizini yap ve gelişimini anlık takip et.
              </p>
            </div>
            
            {/* LGS Butonu: Mavi başlar, Hover'da Rose (Bordo) olur */}
            <button className="w-full py-6 md:py-7 bg-blue-500 hover:bg-rose-600 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3 hover:shadow-rose-500/30 active:scale-95 group/btn">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          {/* YKS BAŞARI ANALİZİ (Açık Bordo/Rose Tema) */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border-2 border-rose-600/10 dark:border-rose-600/20 bg-white/80 dark:bg-white/5 backdrop-blur-2xl shadow-xl hover:shadow-rose-500/20 hover:border-rose-600 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all scale-150">
              <ShellIcon className="w-10 h-10 text-rose-600" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-rose-600 text-white rounded-[1.25rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter uppercase leading-none">YKS BAŞARI ANALİZİ</h2>
              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">
                Stratejini zirveye taşı. Sınav performansını analiz et ve profesyonel yol haritanı çiz.
              </p>
            </div>
            
            {/* YKS Butonu: Rose (Bordo) başlar, Hover'da Mavi olur */}
            <button className="w-full py-6 md:py-7 bg-rose-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3 hover:shadow-blue-500/30 active:scale-95 group/btn">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

        </div>

        {/* Dağ Zirvesi Silüeti (Sayfa Altında) */}
        <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-slate-200/60 dark:from-slate-900/40 to-transparent pointer-events-none z-0" 
             style={{ clipPath: 'polygon(0% 100%, 15% 75%, 28% 85%, 45% 50%, 60% 78%, 78% 62%, 92% 82%, 100% 100%)' }}>
        </div>

        {/* Footer */}
        <footer className="mt-32 md:mt-48 text-center opacity-30 hover:opacity-100 transition-opacity pb-10 z-10">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-slate-500 dark:text-slate-600">
            © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default LandingPage;
