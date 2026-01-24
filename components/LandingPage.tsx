
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

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

const BarChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10L12 5L2 10L12 15L22 10Z" />
    <path d="M6 12V17C6 17 9 20 12 20C15 20 18 17 18 17V12" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/40 transition-all group-hover:scale-110 group-hover:rotate-3">
      <MeerkatIcon className="h-7 w-7 transition-transform group-hover:-translate-y-1" />
      <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-100 dark:border-slate-900 group-hover:scale-125 transition-transform">
        <svg className="h-3.5 w-3.5 text-blue-900 fill-blue-900" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white flex items-baseline">
        kukul<span className="text-blue-500 text-4xl leading-none ml-0.5">.io</span>
      </span>
      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Elite AI Observer</span>
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f1f5f9] dark:bg-[#020617] transition-all duration-700 overflow-y-auto hide-scrollbar relative">
      
      {/* 1. SABİT AKADEMİK KAMPÜS SİLÜETİ */}
      <div className="fixed bottom-0 left-0 w-full h-[45vh] pointer-events-none z-0 overflow-hidden">
        {/* Arka Katman (Yumuşak binalar) */}
        <div 
          className="absolute bottom-0 w-full h-full bg-gradient-to-t from-slate-300/40 dark:from-blue-900/10 to-transparent transition-all duration-1000"
          style={{ clipPath: 'polygon(0% 100%, 0% 85%, 15% 85%, 15% 40%, 25% 40%, 25% 20%, 35% 20%, 35% 85%, 55% 85%, 55% 30%, 65% 30%, 65% 85%, 85% 85%, 85% 50%, 95% 50%, 95% 90%, 100% 90%, 100% 100%)' }}
        />
        {/* Ön Katman (Keskin kampüs hatları) */}
        <div 
          className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-slate-400/50 dark:from-slate-900/80 to-transparent border-t border-slate-400/10 dark:border-blue-500/10 transition-all duration-700"
          style={{ clipPath: 'polygon(0% 100%, 10% 60%, 25% 60%, 25% 100%, 45% 100%, 45% 40%, 55% 40%, 55% 100%, 75% 100%, 75% 55%, 90% 55%, 90% 100%, 100% 100%)' }}
        />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/5 dark:bg-rose-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ELITE FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-between items-center backdrop-blur-2xl bg-[#f1f5f9]/60 dark:bg-[#020617]/60 border-b border-slate-200/50 dark:border-slate-800/30">
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col items-center justify-start lg:justify-center px-6 pt-40 md:pt-48 pb-20 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Slogan Section - Refined Gradients */}
        <div className="text-center space-y-4 mb-20 md:mb-32 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none whitespace-nowrap inline-block skew-x-[12deg]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-900 via-rose-700 to-blue-600">
              Sınırlarını Aş,
            </span>
          </h1>

          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none italic uppercase whitespace-nowrap block text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-rose-700 to-rose-900">
              GELECEĞİNİ TASARLA.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium pt-8 leading-relaxed">
            Karmaşayı geride bırak. <span className="font-black text-slate-900 dark:text-white">kukul.io</span> ile akademik zirveye giden yolu analizlerinle netleştir.
          </p>
        </div>

        {/* Action Cards - Cross-Swap Color Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300">
          
          {/* LGS KARTI: Bordo Zemin + Mavi Buton */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-8 md:p-14 rounded-[4rem] bg-rose-600 dark:bg-rose-700 text-white shadow-2xl hover:scale-[1.03] hover:shadow-rose-500/40 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <BarChartIcon className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <BarChartIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">LGS BAŞARI ANALİZİ</h2>
              <p className="text-base md:text-xl text-rose-100 font-medium leading-relaxed mb-12">
                Netlerini hedeflerine dönüştür. kukul.io ile her sorunun analizini yap ve gelişimini anlık takip et.
              </p>
            </div>
            
            <button className="w-full py-6 md:py-7 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3 hover:bg-white hover:text-blue-600 hover:shadow-white/20 active:scale-95 group/btn">
              <span>HEMEN BAŞLA</span>
              <ArrowRightIcon className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* YKS KARTI: Mavi Zemin + Bordo Buton */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-8 md:p-14 rounded-[4rem] bg-blue-600 dark:bg-blue-700 text-white shadow-2xl hover:scale-[1.03] hover:shadow-blue-500/40 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">
              <GraduationCapIcon className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <GraduationCapIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">YKS BAŞARI ANALİZİ</h2>
              <p className="text-base md:text-xl text-blue-100 font-medium leading-relaxed mb-12">
                Stratejini zirveye taşı. Sınav performansını analiz et ve profesyonel yol haritanı çiz.
              </p>
            </div>
            
            <button className="w-full py-6 md:py-7 bg-rose-600 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-2xl transition-all flex items-center justify-center gap-3 hover:bg-white hover:text-rose-600 hover:shadow-white/20 active:scale-95 group/btn">
              <span>HEMEN BAŞLA</span>
              <ArrowRightIcon className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>

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
