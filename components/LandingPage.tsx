
import React from 'react';
import { EDUCATIONAL_TOOLS } from '../constants/tools';
import { ToolCategory } from '../types';

interface LandingPageProps {
  onStart: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, theme, toggleTheme }) => {
  const categories = Object.values(ToolCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">YZ</div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Yazay Zeka</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-500/10 active:scale-95"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm border border-indigo-100 dark:border-indigo-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Yapay Zeka Destekli Pedagoji
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-[900] text-slate-900 dark:text-white leading-[0.95] tracking-[-0.04em] mb-10">
          Eğitimi Yapay Zeka ile <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Yeniden Tasarlayın.</span>
        </h1>
        
        <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed font-medium">
          RAFT, 4MAT ve Bloom modelleriyle entegre çalışan Türkiye'nin ilk yapay zeka tabanlı öğretmen asistanı. 53 özel modül ile derslerinizi zenginleştirin.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95"
          >
            Hemen Başlayın
            <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          <a href="#tools" className="text-slate-900 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Modülleri Keşfedin
          </a>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-12 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden select-none">
        <div className="flex gap-20 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center">
              {EDUCATIONAL_TOOLS.map(t => (
                <span key={t.id} className="text-2xl font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest flex items-center gap-4">
                  <span className="text-3xl grayscale opacity-50">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="sticky top-40 space-y-8">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              53 Profesyonel <br />Eğitim Aracı
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
              Her branş ve seviye için optimize edilmiş pedagojik asistan modülleri. Metin analizinden ders planlamaya, hayal atölyesinden podcast senaryolarına kadar her şey tek çatı altında.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            {EDUCATIONAL_TOOLS.slice(0, 10).map((tool, i) => (
              <div 
                key={tool.id} 
                className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer flex gap-6"
                onClick={onStart}
              >
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{tool.name}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Başlat</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
            <button 
              onClick={onStart}
              className="w-full py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-slate-400 dark:text-slate-500 font-bold hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              Ve 43 modül daha... Dashboard'da keşfet.
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 dark:text-slate-600 text-xs font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">YZ</div>
            Yazay Zeka © 2024
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-indigo-500 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
