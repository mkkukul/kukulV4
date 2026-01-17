
import React from 'react';
import { EDUCATIONAL_TOOLS } from '../constants/tools';
import { ToolCategory } from '../types';

interface LandingPageProps {
  onStart: (toolId?: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-700 pb-20">
      {/* Background Decor */}
      <div className="hero-glow top-[-200px] left-[-100px] animate-pulse-slow"></div>
      <div className="hero-glow bottom-[-300px] right-[-100px] bg-blue-500/10 dark:bg-blue-900/10 animate-pulse-slow [animation-delay:2s]"></div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center px-6 animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 shadow-sm border border-blue-100/50 dark:border-blue-900/50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          KuKul Hoca ile Eğitimde Yeni Dönem
        </div>
        
        <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter mb-6 dark:text-white leading-[0.9]">
          Başarıyı <span className="text-blue-600">Veriyle</span> <br /> Yönetin
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl mb-12 font-medium leading-relaxed">
          LGS ve YKS denemelerinizi analiz edin, eksiklerinizi KuKul Hoca'nın 
          akıllı koçluk sistemiyle saniyeler içinde belirleyin.
        </p>
      </section>

      {/* Analysis Cards */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-24 relative z-10">
        <AnalysisCard 
          title="LGS Deneme Analizi"
          description="KuKul Hoca veri motoruyla netlerini hesapla, ders bazlı başarı grafiklerini incele ve hedefine odaklan."
          icon="📊"
          color="blue"
          onAction={() => onStart('lgs-analiz')}
        />

        <AnalysisCard 
          title="YKS Deneme Analizi"
          description="KuKul Hoca interaktif koçluk sistemiyle hatalarını sor, sana özel haftalık çalışma planını al."
          icon="🎓"
          color="purple"
          onAction={() => onStart('yks-koc')}
        />
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

const AnalysisCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: string; 
  color: 'blue' | 'purple';
  onAction: () => void;
}> = ({ title, description, icon, color, onAction }) => {
  const colorClasses = {
    blue: 'hover:border-blue-500 hover:shadow-blue-500/10 bg-blue-50 dark:bg-blue-900/20 text-blue-600',
    purple: 'hover:border-purple-500 hover:shadow-purple-500/10 bg-purple-50 dark:bg-purple-900/20 text-purple-600',
  };

  const btnClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
    purple: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20',
  };

  return (
    <div className={`p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-xl group ${colorClasses[color].split(' ').slice(0, 2).join(' ')}`}>
      <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform ${colorClasses[color].split(' ').slice(2).join(' ')}`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-4 dark:text-white tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed italic text-lg">
        {description}
      </p>
      <button 
        onClick={onAction}
        className={`w-full py-6 rounded-2xl text-white font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-95 ${btnClasses[color]}`}
      >
        Analize Başla 
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default LandingPage;
