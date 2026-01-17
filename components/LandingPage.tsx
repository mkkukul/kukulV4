
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col relative bg-transparent">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[140px] animate-pulse-slow"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[140px] animate-pulse-slow [animation-delay:2s]"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 max-h-[calc(100vh-80px)]">
        <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter dark:text-white leading-[1.05] transition-all">
            Hedefini Seç,<br />
            <span className="text-blue-600">Gerisini KuKul Hoca'ya Bırak.</span>
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg max-w-xl mx-auto leading-tight">
            Sınav yolculuğunda karmaşaya son. KuKul Hoca ile verilerini güce dönüştür, zirveye giden yolu netleştir.
          </p>
        </div>

        {/* Action Dashboard Container */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl px-4 animate-in fade-in zoom-in duration-700 delay-300">
          {/* LGS Modülü - Okyanus Mavisi */}
          <div 
            onClick={() => onStart('lgs-analiz')}
            className="group relative cursor-pointer p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:border-blue-500 transition-all duration-500 shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] flex flex-col items-start"
          >
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-1 dark:text-white tracking-tight">LGS Analizi</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium italic">
              "Netlerini Başarıya Dönüştür."
            </p>
            <button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3">
              Analize Başla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* YKS Modülü - Derin Mor */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group relative cursor-pointer p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:border-purple-500 transition-all duration-500 shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] flex flex-col items-start"
          >
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/30 mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-1 dark:text-white tracking-tight">YKS Analizi</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium italic">
              "Stratejinle Fark Yarat."
            </p>
            <button className="w-full h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-lg transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3">
              Analize Başla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Elegant Fixed Footer */}
      <footer className="p-6 text-center text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] z-10 transition-opacity opacity-40 hover:opacity-100">
        © 2026 Vakfıkebir / Trabzon — KuKul Hoca Platformu V4.61
      </footer>
    </div>
  );
};

export default LandingPage;
