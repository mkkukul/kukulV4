
import React from 'react';
import { EDUCATIONAL_TOOLS } from '../constants/tools';
import { ToolCategory } from '../types';

interface LandingPageProps {
  onStart: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-700">
      {/* Background Decor */}
      <div className="hero-glow top-[-200px] left-[-100px] animate-pulse-slow"></div>
      <div className="hero-glow bottom-[-300px] right-[-100px] bg-blue-500/10 dark:bg-blue-900/10 animate-pulse-slow [animation-delay:2s]"></div>

      {/* Modern Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-500/20 transform group-hover:scale-110 transition-transform">KH</div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">KuKul <span className="text-blue-600">Hoca</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-all border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 shadow-sm"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
              ) : (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button 
              onClick={onStart}
              className="hidden sm:block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all active:scale-95"
            >
              Başla
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 flex flex-col items-center text-center animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-12 shadow-sm border border-blue-100/50 dark:border-blue-900/50">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          KuKul Hoca ile Eğitimde Yeni Dönem
        </div>
        
        <h1 className="text-6xl md:text-[7rem] font-[900] text-slate-900 dark:text-white leading-[0.9] tracking-[-0.05em] mb-12 max-w-5xl">
          Başarıyı <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-blue-600">Veriyle Yönetin.</span>
        </h1>
        
        <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 mb-16 leading-relaxed font-medium">
          LGS ve YKS denemelerinizi analiz edin, eksiklerinizi KuKul Hoca'nın akıllı koçluk sistemiyle saniyeler içinde belirleyin.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
          >
            Hemen Başlayın
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-24 px-6 bg-white/20 dark:bg-slate-950/20 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white mb-4 leading-none">
              Deneme Analizi & <span className="text-blue-600">Sınav Koçu</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Sınav türüne özel geliştirilmiş algoritmalarla eksiklerini keşfet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* LGS Analiz Kartı */}
            <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-500 group shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-3xl font-black mb-4 dark:text-white tracking-tight">LGS Deneme Analizi</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed font-medium italic">
                KuKul Hoca veri motoruyla netlerini hesapla, ders bazlı başarı grafiklerini incele ve hedefine odaklan.
              </p>
              <button 
                onClick={onStart}
                className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Analize Başla 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* YKS Analiz Kartı */}
            <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500 group shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-3xl font-black mb-4 dark:text-white tracking-tight">YKS Deneme Analizi</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed font-medium italic">
                KuKul Hoca interaktif koçluk sistemiyle hatalarını sor, sana özel haftalık çalışma planını al.
              </p>
              <button 
                onClick={onStart}
                className="w-full h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20 active:scale-95"
              >
                Analize Başla 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-20 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm overflow-hidden select-none relative z-10">
        <div className="flex gap-24 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              {EDUCATIONAL_TOOLS.map(t => (
                <span key={t.id} className="text-3xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.2em] flex items-center gap-8 hover:text-blue-500 transition-all duration-300">
                  <span className="text-4xl opacity-40">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-16 px-6 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-slate-400 dark:text-slate-600 text-xs font-black tracking-[0.25em] uppercase">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">KH</div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white leading-none mb-1">KuKul Hoca</span>
              <span className="opacity-50 tracking-widest">Öğretmen Asistanı V4.61</span>
            </div>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-blue-600 transition-colors">Kullanım</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-blue-600 transition-colors">İletişim</a>
          </div>
          <div className="opacity-40 font-medium">© 2026 Vakfıkebir/Trabzon Türkiye KuKul Hoca</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
