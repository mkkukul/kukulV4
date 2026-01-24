
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

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-all group-hover:scale-110">
      <MeerkatIcon className="h-7 w-7" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">kukul<span className="text-blue-600 ml-0.5">.io</span></span>
      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Elite AI Observer</span>
    </div>
  </div>
);

const AcademicSkyline = () => (
  <div className="fixed bottom-0 left-0 w-full h-[45vh] pointer-events-none z-0 overflow-hidden opacity-50 transition-opacity duration-1000">
    <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-slate-400/30 dark:from-blue-900/10 to-transparent" 
         style={{ clipPath: 'polygon(0% 100%, 0% 80%, 15% 80%, 15% 40%, 25% 40%, 25% 20%, 35% 20%, 35% 80%, 55% 80%, 55% 30%, 65% 30%, 65% 85%, 85% 85%, 100% 100%)' }} />
    <div className="absolute bottom-0 w-full h-[35vh] bg-gradient-to-t from-slate-500/20 dark:from-slate-800/20 to-transparent" 
         style={{ clipPath: 'polygon(0% 100%, 10% 70%, 20% 70%, 20% 100%, 30% 100%, 30% 50%, 40% 50%, 40% 100%, 60% 100%, 60% 35%, 75% 35%, 75% 100%, 100% 100%)' }} />
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f1f5f9] dark:bg-[#020617] transition-all duration-700 overflow-y-auto hide-scrollbar relative">
      <AcademicSkyline />

      <header className="fixed top-0 left-0 w-full z-[100] p-6 flex justify-between items-center backdrop-blur-xl bg-white/40 dark:bg-[#020617]/40 border-b border-slate-200/50 dark:border-slate-800/30">
        <Logo />
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 shadow-sm"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-blue-600">
              Sınırlarını Aş,
            </span>
          </h1>
          <br />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase block text-center mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-rose-600">
              GELECEĞİNİ TASARLA.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium pt-8">
            Akademik başarının anahtarı veride saklı. <span className="font-black text-slate-900 dark:text-white">kukul.io</span> ile her soruyu analize, her analizi başarıya dönüştür.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300">
          {/* LGS KARTI: Bordo Zemin + Mavi Buton */}
          <div 
            className="group cursor-pointer p-10 md:p-14 rounded-[4rem] bg-rose-600 text-white shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-[480px] relative overflow-hidden"
          >
            <div className="absolute top-10 right-10 opacity-20 text-6xl font-black">LGS</div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 text-3xl">📈</div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">LGS Analiz Studio</h2>
              <p className="text-lg text-rose-100 font-medium leading-relaxed">
                Netlerini hedeflerine dönüştür. Sınav karneni yükle, eksiklerini yapay zeka saniyeler içinde belirlesin.
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onStart('deneme-analizi'); }}
              className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xl hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-900/20"
            >
              HEMEN BAŞLA
            </button>
          </div>

          {/* YKS KARTI: Mavi Zemin + Bordo Buton */}
          <div 
            className="group cursor-pointer p-10 md:p-14 rounded-[4rem] bg-blue-600 text-white shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-[480px] relative overflow-hidden"
          >
            <div className="absolute top-10 right-10 opacity-20 text-6xl font-black">YKS</div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 text-3xl">🎓</div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">YKS Strateji Masası</h2>
              <p className="text-lg text-blue-100 font-medium leading-relaxed">
                Zirveye giden yol haritanı çiz. TYT/AYT performansını profesyonel metriklerle analiz et.
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onStart('yks-koc'); }}
              className="w-full py-6 bg-rose-600 text-white rounded-3xl font-black text-xl hover:bg-white hover:text-rose-600 transition-all shadow-xl shadow-rose-900/20"
            >
              HEMEN BAŞLA
            </button>
          </div>
        </div>

        <footer className="mt-32 text-center opacity-30 hover:opacity-100 transition-opacity pb-10">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">
            © 2026 kukul.io — Ultimate Academia Edition
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
