
import React from 'react';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const MeerkatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2C11.5,2,11.1,2.1,10.7,2.2C10.5,2.4,10.3,2.7,10.3,3C10.3,3.3,10.5,3.6,10.7,3.8C11,3.9,11.3,4,11.7,4C11.8,4,12,4,12.2,4 C12.3,4,12.4,4,12.5,4C13,4,13.4,4.2,13.7,4.5C14.1,4.9,14.2,5.4,14.2,5.9C14.2,6.4,14,6.9,13.6,7.2C13.2,7.6,12.7,7.8,12.2,7.8 C11.7,7.8,11.2,7.6,10.8,7.2C10.4,6.9,10.2,6.4,10.2,5.9C10.2,5.4,10.4,4.9,10.8,4.5C10.6,4.4,10.4,4.4,10.2,4.4C9.6,4.4,9,4.7,8.6,5.1 C8.1,5.6,7.9,6.2,7.9,6.8V11C7.9,11.6,8.1,12.2,8.6,12.6L11,15V22H13V15L15.4,12.6C15.9,12.2,16.1,11.6,16.1,11V6.8 C16.1,5.2,14.8,4,13.2,4C13.1,4,13,4,12.9,4C13,3.7,13,3.4,13,3C13,2.4,12.6,2,12,2z" />
  </svg>
);

const SeashellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
    <path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#020617] bg-gradient-to-br from-[#020617] via-[#020617] to-[#4c0519] text-white flex flex-col relative overflow-y-auto hide-scrollbar selection:bg-yellow-400 selection:text-black">
      
      {/* 1. FIXED NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] p-4 md:p-6 backdrop-blur-2xl bg-[#020617]/40 border-b border-white/5 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6 overflow-hidden">
              <SeashellIcon className="h-6 w-6 text-white animate-float" />
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-black text-xl md:text-3xl tracking-tighter uppercase leading-none">
              kukul.<span className="text-blue-500">io</span>
            </span>
            <div className="flex items-center gap-1">
              <MeerkatIcon className="h-3 w-3 text-yellow-400" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Elite AI Platform</span>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-yellow-400 shadow-xl"
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </nav>

      {/* 2. MAIN CONTENT (Scrollable) */}
      <main className="flex-1 flex flex-col items-center justify-start lg:justify-center px-6 pt-32 pb-20 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Slogan Bölümü */}
        <div className="text-center space-y-6 md:space-y-8 w-full max-w-5xl mb-16 md:mb-24 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
            Next Generation Learning
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] md:leading-[0.85] text-white">
            Sınırlarını Aş,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-600 italic">Geleceğini Tasarla.</span>
          </h1>
          <p className="text-base md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed px-2">
            Karmaşayı geride bırak. <span className="text-white font-black">kukul.io</span>'nun akıllı analizleriyle potansiyelini keşfet, stratejini netleştir ve zirveye ulaş.
          </p>
        </div>

        {/* Aksiyon Kartları Düzeni */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full max-w-6xl animate-in fade-in zoom-in duration-700 delay-300">
          
          {/* LGS KARTI (Mavi Odaklı) */}
          <div 
            onClick={() => onStart('deneme-analizi')}
            className="group cursor-pointer p-8 md:p-12 rounded-[3rem] border border-blue-500/20 bg-blue-600/5 backdrop-blur-3xl shadow-2xl hover:border-yellow-400 hover:bg-blue-600/10 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-yellow-400/10 transition-all"></div>
            
            <div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg className="h-8 w-8 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none text-white">LGS Başarı Analizi</h2>
              <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed mb-12">
                Netlerini hedeflerine dönüştür. <span className="text-blue-500 font-bold">KuKul AI</span> ile her sorunun analizini yap ve gelişimini anlık takip et.
              </p>
            </div>
            
            <button className="w-full py-6 bg-blue-600 hover:bg-yellow-400 hover:text-black text-white rounded-2xl font-black text-xl md:text-2xl shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group/btn">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          {/* YKS KARTI (Bordo Odaklı) */}
          <div 
            onClick={() => onStart('yks-koc')}
            className="group cursor-pointer p-8 md:p-12 rounded-[3rem] border border-red-900/30 bg-red-900/5 backdrop-blur-3xl shadow-2xl hover:border-yellow-400 hover:bg-red-900/10 transition-all duration-500 flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-900/10 rounded-full blur-[80px] group-hover:bg-yellow-400/10 transition-all"></div>
            
            <div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#800000] text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(128,0,0,0.4)] transition-transform group-hover:scale-110 group-hover:-rotate-3">
                <svg className="h-8 w-8 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none text-white">YKS Başarı Analizi</h2>
              <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed mb-12">
                Stratejini zirveye taşı. <span className="text-red-600 font-bold">KuKul AI</span> ile sınav performansını analiz et ve kişisel yol haritanı oluştur.
              </p>
            </div>
            
            <button className="w-full py-6 bg-[#800000] hover:bg-yellow-400 hover:text-black text-white rounded-2xl font-black text-xl md:text-2xl shadow-2xl shadow-red-900/40 transition-all flex items-center justify-center gap-3 group/btn">
              <span>HEMEN BAŞLA</span>
              <svg className="h-6 w-6 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-24 md:mt-32 text-center opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-slate-500">
            © 2026 kukul.io — Sınırlarını Aş, Geleceğini Tasarla.
          </p>
        </footer>

      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse-slow [animation-delay:3s]"></div>
      </div>
    </div>
  );
};

export default LandingPage;
