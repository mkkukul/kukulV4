
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
    <div className="min-h-screen flex flex-col transition-colors duration-700">
      {/* Abstract Background Elements */}
      <div className="hero-glow top-[-200px] left-[-100px] animate-pulse-slow"></div>
      <div className="hero-glow bottom-[-300px] right-[-100px] bg-indigo-500/10 dark:bg-purple-900/10 animate-pulse-slow [animation-delay:2s]"></div>

      {/* Modern Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-500/20 transform group-hover:scale-110 transition-transform">YZ</div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Yazay Zeka</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-all border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 shadow-sm"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button 
              onClick={onStart}
              className="hidden sm:block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-500/20 transition-all active:scale-95"
            >
              Dashboard'a Git
            </button>
          </div>
        </div>
      </nav>

      {/* Minimalist Hero Section */}
      <section className="pt-48 pb-20 px-6 flex flex-col items-center text-center animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.25em] mb-12 shadow-sm border border-indigo-100/50 dark:border-indigo-900/50">
          <svg className="w-4 h-4 animate-spin [animation-duration:3s]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          53 Profesyonel Eğitim Aracı Bir Arada
        </div>
        
        <h1 className="text-6xl md:text-[7rem] font-[900] text-slate-900 dark:text-white leading-[0.9] tracking-[-0.05em] mb-12 max-w-5xl">
          Derslerinize <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600">Zeka Katın.</span>
        </h1>
        
        <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 mb-16 leading-relaxed font-medium">
          RAFT, 4MAT ve Bloom modelleriyle entegre çalışan Türkiye'nin ilk yapay zeka tabanlı öğretmen asistanı platformu.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-[0_20px_60px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
          >
            Hemen Başlayın
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          <button className="text-slate-900 dark:text-white font-bold text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-4 flex items-center gap-2">
            Modülleri Keşfedin
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </section>

      {/* Animated Marquee of Tasks */}
      <div className="py-20 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm overflow-hidden select-none relative z-10">
        <div className="flex gap-24 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              {EDUCATIONAL_TOOLS.map(t => (
                <span key={t.id} className="text-3xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.2em] flex items-center gap-8 hover:text-indigo-500 dark:hover:text-indigo-500 transition-all duration-300">
                  <span className="text-4xl opacity-40">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section with Glassmorphism Cards */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Eğitimde <span className="text-indigo-600">Yeni Standart</span>.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">Modern pedagoji ve ileri teknoloji ile öğretmenlerimizin iş yükünü azaltıyoruz.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon="🎚️"
            title="9 Boyutlu Farklılaştırma"
            desc="Tomlinson modeline dayalı 9 farklı boyutta ders içeriklerini her öğrenci için otomatik kişiselleştirin."
            color="bg-blue-500"
          />
          <FeatureCard 
            icon="🔄"
            title="Ders Tasarım Modelleri"
            desc="4MAT, KWHLAQ ve Bloom gibi dünya standartlarında pedagojik modellerle kusursuz ders akışları kurgulayın."
            color="bg-indigo-500"
          />
          <FeatureCard 
            icon="🎙️"
            title="Zengin Materyal Üretimi"
            desc="Saniyeler içinde podcast senaryosu, sunum taslağı ve etkileşimli görevler oluşturarak zamandan tasarruf edin."
            color="bg-purple-500"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-16 px-6 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-slate-400 dark:text-slate-600 text-xs font-black tracking-[0.25em] uppercase">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">YZ</div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white leading-none mb-1">Yazay Zeka</span>
              <span className="opacity-50 tracking-widest">Öğretmen Asistanı V4.61</span>
            </div>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-indigo-600 transition-colors">Kullanım</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">İletişim</a>
          </div>
          <div className="opacity-40 font-medium">© 2026 Vakfıkebir/Trabzon Türkiye Yazay Zeka</div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => (
  <div className="group p-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[3rem] hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-default">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-10 mb-4 tracking-tight leading-none">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
      {desc}
    </p>
  </div>
);

export default LandingPage;
