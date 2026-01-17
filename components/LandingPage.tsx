
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
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-500 overflow-hidden">
      {/* Decorative Glows */}
      <div className="hero-glow top-[-200px] left-[-100px] animate-pulse-slow"></div>
      <div className="hero-glow bottom-[-200px] right-[-100px] bg-indigo-500/10 dark:bg-purple-500/5 animate-pulse-slow [animation-delay:2s]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">YZ</div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Yazay Zeka</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-sm"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 flex flex-col items-center text-center animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-indigo-900/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Yapay Zeka Destekli Pedagoji
        </div>
        
        <div className="relative mb-12">
          {/* Abstract Education Visual */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10 opacity-40 dark:opacity-20">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-slow">
              <path fill="#4F46E5" d="M47.7,-62.1C60.1,-52.7,67.3,-36.1,72.4,-18.6C77.5,-1.1,80.5,17.3,73.8,31.7C67.1,46.1,50.7,56.5,34.1,64.2C17.5,71.9,0.7,76.9,-16,73.1C-32.7,69.3,-49.3,56.8,-60.7,41C-72.1,25.2,-78.3,6.1,-75.4,-11.6C-72.5,-29.3,-60.5,-45.5,-45.5,-54.2C-30.5,-62.9,-12.5,-64.1,3.4,-68.8C19.3,-73.5,35.3,-71.5,47.7,-62.1Z" transform="translate(100 100)" />
            </svg>
          </div>

          <h1 className="text-6xl md:text-[6.5rem] font-[900] text-slate-900 dark:text-white leading-[0.95] tracking-[-0.05em] mb-10 drop-shadow-sm">
            Eğitimi <span className="text-indigo-600">Zeka</span> ile <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600">Yeniden Tanımlayın.</span>
          </h1>
        </div>
        
        <p className="max-w-3xl text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed font-medium">
          Ders planlarından podcast senaryolarına, farklılaştırma stratejilerinden içerik üretimine kadar <b>53 profesyonel modül</b> ile eğitimde yeni bir dönem başlatın.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button 
            onClick={onStart}
            className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95"
          >
            Hemen Başlayın
            <svg className="w-5 h-5 inline-block ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          <a href="#tools" className="text-slate-900 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2">
            Modülleri Keşfedin
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </a>
        </div>
      </section>

      {/* Floating Elements Visual */}
      <div className="hidden lg:block relative h-0">
        <div className="absolute left-[10%] top-[-100px] animate-float [animation-delay:0s]">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
            <span className="text-4xl">📚</span>
            <span className="text-[10px] font-black uppercase text-indigo-500">Kütüphane</span>
          </div>
        </div>
        <div className="absolute right-[15%] top-[-300px] animate-float [animation-delay:2s]">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
            <span className="text-4xl">🧪</span>
            <span className="text-[10px] font-black uppercase text-purple-500">Atölye</span>
          </div>
        </div>
        <div className="absolute left-[20%] top-[-450px] animate-float [animation-delay:4s]">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
            <span className="text-4xl">🎨</span>
            <span className="text-[10px] font-black uppercase text-blue-500">Tasarım</span>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="py-16 border-y border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden select-none relative z-10">
        <div className="flex gap-24 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              {EDUCATIONAL_TOOLS.map(t => (
                <span key={t.id} className="text-3xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-widest flex items-center gap-6 hover:text-indigo-500 dark:hover:text-indigo-600 transition-colors cursor-default">
                  <span className="text-4xl grayscale opacity-30">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-40 space-y-10">
            <div className="space-y-4">
              <h2 className="text-6xl font-[900] text-slate-900 dark:text-white tracking-tighter leading-none">
                Pedagoji ve <br /><span className="text-indigo-600">Teknoloji</span> <br />Arasındaki Köprü.
              </h2>
              <div className="w-20 h-2 bg-indigo-600 rounded-full"></div>
            </div>
            
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
              Her branş ve seviye için optimize edilmiş modüller. Metin analizinden ders planlamaya, hayal atölyesinden podcast senaryolarına kadar her şey profesyonel asistanınız Yazay Zeka'da.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-7 h-7 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                  </div>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            {EDUCATIONAL_TOOLS.slice(0, 10).map((tool, i) => (
              <div 
                key={tool.id} 
                className="group p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-indigo-500 dark:hover:border-indigo-400 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex gap-8 active:scale-[0.98]"
                onClick={onStart}
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-6 group-hover:scale-110 transition-all shadow-inner">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{tool.name}</h3>
                    <span className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
            <button 
              onClick={onStart}
              className="w-full py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2.5rem] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 transition-all bg-white/20 dark:bg-transparent"
            >
              +43 Modül Daha
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-20 px-6 bg-white dark:bg-slate-950/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 dark:text-slate-600 text-xs font-black tracking-[0.2em] uppercase">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">YZ</div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white leading-none mb-1">Yazay Zeka</span>
              <span>Eğitimin Geleceği</span>
            </div>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-indigo-500 transition-colors">Şartlar</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">İletişim</a>
          </div>
          <div className="opacity-50">© 2024 İstanbul, TR</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
