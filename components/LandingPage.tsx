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
  <div className="fixed bottom-0 left-0 w-full h-[35vh] pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 opacity-40">
    <div className="absolute bottom-0 w-full h-full bg-slate-400 dark:bg-slate-800" 
         style={{ clipPath: 'polygon(0% 100%, 0% 75%, 5% 75%, 5% 40%, 12% 40%, 12% 75%, 25% 75%, 25% 25%, 40% 25%, 40% 85%, 55% 85%, 55% 35%, 65% 35%, 65% 90%, 80% 90%, 80% 50%, 90% 50%, 90% 100%, 100% 100%)' }} />
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f1f5f9] dark:bg-[#020617] transition-all duration-700 overflow-y-auto relative">
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
            Başarı tesadüf değildir. <span className="font-black text-slate-900 dark:text-white">kukul.io</span> ile akademik performansını analiz et, zayıf noktalarını güce dönüştür.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300">
          
          {/* LGS KARTI (Bordo/Rose Zemin + Mavi Buton) */}
          <div className="group p-8 md:p-14 rounded-[4rem] bg-rose-600 text-white shadow-2xl flex flex-col justify-between h-[500px] transition-all hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-10 right-10 opacity-20 text-6xl font-black">LGS</div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 text-3xl">📈</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
                LGS BAŞARI ANALİZİ
              </h2>
              <p className="text-base md:text-xl text-white opacity-90 font-medium leading-relaxed mb-12">
                Netlerini hedeflerine dönüştür. Sınav karneni yükle, eksiklerini Kukul AI Koç saniyeler içinde belirlesin.
              </p>
            </div>
            <button 
              onClick={() => onStart('deneme-analizi')}
              className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-xl hover:bg-white hover:text-blue-600 transition-all active:scale-95"
            >
              HEMEN BAŞLA →
            </button>
          </div>

          {/* YKS KARTI (Mavi Zemin + Bordo/Rose Buton) */}
          <div className="group p-8 md:p-14 rounded-[4rem] bg-blue-600 text-white shadow-2xl flex flex-col justify-between h-[500px] transition-all hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-10 right-10 opacity-20 text-6xl font-black">YKS</div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10 text-3xl">🎓</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
                YKS BAŞARI ANALİZİ
              </h2>
              <p className="text-base md:text-xl text-white opacity-90 font-medium leading-relaxed mb-12">
                Zirveye giden yol haritanı çiz. TYT/AYT performansını Kukul AI Koç ile profesyonelce analiz et.
              </p>
            </div>
            <button 
              onClick={() => onStart('yks-koc')}
              className="w-full py-6 bg-rose-600 text-white rounded-[1.5rem] font-black text-lg md:text-2xl shadow-xl hover:bg-white hover:text-rose-600 transition-all active:scale-95"
            >
              HEMEN BAŞLA →
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