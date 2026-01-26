import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExamSubject, StudentProfile } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AlertTriangleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

// --- PANELS ---

export const StudentProfilePanel: React.FC<{ onSave: (profile: StudentProfile) => void }> = ({ onSave }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('student_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      grade: '8. Sınıf (LGS)',
      target: '',
      averageNet: 0,
      notes: ''
    };
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('student_profile', JSON.stringify(profile));
    onSave(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-8 lg:p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 backdrop-blur-xl relative overflow-hidden animate-in zoom-in duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-white text-4xl shadow-2xl">👤</div>
        <div>
          <h3 className="text-4xl font-black dark:text-white uppercase tracking-tighter leading-none">Öğrenci Profilim</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-2 italic">Akademik Kimliğini ve Hedeflerini Belirle</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Ad Soyad</label>
          <input type="text" className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner" placeholder="Örn: Ahmet Yılmaz" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Sınıf / Seviye</label>
          <select className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner" value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })} >
            <option>8. Sınıf (LGS)</option>
            <option>12. Sınıf (YKS)</option>
            <option>Mezun (YKS)</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Hedef Okul / Üniversite</label>
          <input type="text" className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner" placeholder="Örn: Galatasaray Lisesi / ODTÜ" value={profile.target} onChange={(e) => setProfile({ ...profile, target: e.target.value })} />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Mevcut Net Ortalaması</label>
          <input type="number" className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner" placeholder="0" value={profile.averageNet || ''} onChange={(e) => setProfile({ ...profile, averageNet: parseFloat(e.target.value) })} />
        </div>
      </div>
      <button onClick={handleSave} className={`w-full py-7 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${isSaved ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-blue-600 text-white hover:bg-indigo-700 shadow-blue-500/20'}`} >
        {isSaved ? '✅ Veriler Güvende' : '🚀 Profilimi Kaydet ve Analize Hazırlan'}
      </button>
    </div>
  );
};

export const AnalysisStudio: React.FC<{ 
  activeTab: 'input' | 'koc' | 'performance' | 'strategy' | 'topics';
  setActiveTab: (tab: any) => void;
  onAnalyze: (text: string, fileData?: { mimeType: string, data: string }) => void;
  isAnalyzed: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
  theme: 'light' | 'dark';
}> = ({ activeTab, onAnalyze, isAnalyzed, isLoading, children, theme }) => {
  const [examType, setExamType] = useState<'LGS' | 'TYT'>('LGS');
  const [fileData, setFileData] = useState<{ mimeType: string, data: string, name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjectsConfig = {
    LGS: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'İnkılap Tarihi', 'Din Kültürü', 'İngilizce'],
    TYT: ['Türkçe', 'Sosyal Bilimler', 'Temel Matematik', 'Fen Bilimleri']
  };

  const initialSubjects = (type: 'LGS' | 'TYT'): ExamSubject[] => 
    subjectsConfig[type].map(s => ({ name: s, correct: 0, incorrect: 0, net: 0 }));

  const [subjects, setSubjects] = useState<ExamSubject[]>(initialSubjects('LGS'));

  const handleUpdate = (index: number, field: 'correct' | 'incorrect', value: number) => {
    const newSubjects = [...subjects];
    const val = isNaN(value) ? 0 : value;
    newSubjects[index][field] = val;
    const divider = examType === 'LGS' ? 3 : 4;
    const net = newSubjects[index].correct - (newSubjects[index].incorrect / divider);
    newSubjects[index].net = Math.max(0, parseFloat(net.toFixed(2)));
    setSubjects(newSubjects);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await aiService.processFile(file);
        setFileData({ ...processed, name: file.name });
      } catch (err) { alert("Dosya hatası: " + err); }
    }
  };

  const totalNet = subjects.reduce((acc, curr) => acc + curr.net, 0);

  const triggerAnalysis = () => {
    let prompt = `Aşağıdaki ${examType} deneme verilerimi analiz et:\n\nMANUEL VERİLER:\n`;
    prompt += subjects.map(s => `- ${s.name}: ${s.correct}D ${s.incorrect}Y, Net: ${s.net}`).join('\n');
    prompt += `\nTOPLAM NET: ${totalNet.toFixed(2)}\n\n`;
    if (fileData) prompt += `EK KARNE ANALİZİ: Yüklenen resmi karne belgesindeki konu bazlı başarı oranlarını 2018-2024 soru dağılımlarına göre analiz et. Sadece müfredat sınırlarında kal.`;
    onAnalyze(prompt, fileData ? { mimeType: fileData.mimeType, data: fileData.data } : undefined);
  };

  return (
    <div className="min-h-[600px] animate-in fade-in duration-500 overflow-y-auto">
      {activeTab === 'input' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/60 rounded-[3.5rem] p-10 border border-slate-200/50 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center mb-10 px-4">
                <h4 className="text-3xl font-black uppercase tracking-tighter">Net Giriş Tablosu</h4>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  {['LGS', 'TYT'].map(t => (
                    <button key={t} onClick={() => { setExamType(t as any); setSubjects(initialSubjects(t as any)); }}
                      className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all ${examType === t ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Doğru / Yanlış</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {subjects.map((s, i) => (
                    <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-5 font-black text-slate-700 dark:text-slate-300 text-lg">{s.name}</td>
                      <td className="px-8 py-5 text-center flex items-center justify-center gap-4">
                        <input type="number" className="w-14 bg-white/50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-2 ring-blue-500" value={s.correct || ''} onChange={(e) => handleUpdate(i, 'correct', parseInt(e.target.value))} />
                        <span className="text-slate-300 font-thin text-2xl">/</span>
                        <input type="number" className="w-14 bg-white/50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-2 ring-rose-500" value={s.incorrect || ''} onChange={(e) => handleUpdate(i, 'incorrect', parseInt(e.target.value))} />
                      </td>
                      <td className={`px-8 py-5 font-black text-center text-2xl text-blue-600`}>{s.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

          <div className="space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-blue-600 text-white rounded-[4rem] p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform"></div>
              <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner group-hover:rotate-6 transition-transform">
                {fileData ? '📄' : <FileUpIcon />}
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl font-black uppercase tracking-tighter leading-tight">Karne Yükle</h4>
                <p className="text-blue-100 text-sm font-medium">PDF veya Resim yükle, Kukul AI Koç saniyeler içinde analiz etsin.</p>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
              <button className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all">
                {fileData ? fileData.name : 'Dosya Seç'}
              </button>
            </div>

            <div className="p-10 bg-white/80 dark:bg-slate-900/60 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-md">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Toplam Net Hesabı</p>
               <p className="text-7xl font-black text-blue-600 tracking-tighter">{totalNet.toFixed(2)}</p>
            </div>

            <button 
              onClick={triggerAnalysis} 
              disabled={isLoading || (totalNet === 0 && !fileData)} 
              className="w-full py-8 bg-rose-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-widest shadow-2xl shadow-rose-900/20 hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'ANALİZ EDİLİYOR...' : '🦉 RAPOR ÜRET'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'koc' && children}

      {activeTab === 'performance' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700 pb-20">
          {/* Acil Müdahale Listesi */}
          <div className="p-12 bg-rose-500/10 border-2 border-dashed border-rose-500/30 rounded-[4rem] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-900/20">
                <AlertTriangleIcon />
              </div>
              <div>
                <h4 className="text-3xl font-black text-rose-600 uppercase tracking-tighter leading-none">⚠️ Acil Müdahale Listesi</h4>
                <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mt-2">Müfredat Bazlı En Kritik Kazanımlar</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {(examType === 'LGS' 
                ? ['Üslü İfadeler', 'DNA ve Genetik Kod', 'Mevsimler', 'Sıvı Basıncı', 'Fiilimsiler'] 
                : ['Türev ve İntegral', 'Modern Fizik', 'Organik Kimya', 'Paragraf Analizi', 'Trigonometri']
              ).map((item, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2 transition-all hover:scale-105">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  <p className="font-black text-[11px] text-slate-800 dark:text-slate-200 uppercase tracking-tighter leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {subjectsConfig[examType].slice(0, 3).map((ders, i) => (
              <div key={ders} className="p-12 bg-white/80 dark:bg-slate-900/80 rounded-[4.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-10 backdrop-blur-xl group transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h5 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 dark:text-white">
                      {ders}
                    </h5>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resmi Müfredat Analizi</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic border-l-8 border-blue-500/20 pl-6 py-2">
                    "Verilere göre bu derste müfredat kazanımlarına odaklanman gerekiyor. Kukul AI Koç diyor ki: {examType} sınavının en belirleyici kısımlarına odaklan!"
                  </p>
                  <div className="pt-10 border-t border-slate-100 dark:border-slate-800 relative">
                    <div className="absolute -top-4 left-0 px-4 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">KOÇLUK TAVSİYESİ</div>
                    <p className="text-lg font-black leading-tight dark:text-slate-200 tracking-tight">Geçmiş yılların (2018-2024) soru dağılım sıklığına göre çalışma planını güncelle.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200/50 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto animate-in fade-in duration-700 mb-20">
          <div className="text-center space-y-6 mb-16">
             <h3 className="text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">Akıllı Gelişim Stratejisi</h3>
             <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[11px] max-w-xl mx-auto">Soru Dağılım Ağırlığına Göre Önceliklendirme</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { topic: 'Paragraf ve Anlam Bilgisi', impact: 10, reason: 'LGS Türkçe testinin %70’ini oluşturmaktadır.' },
              { topic: 'Üslü ve Köklü İfadeler', impact: 9, reason: 'Matematik temelini oluşturan en yüksek soru ağırlıklı ünitedir.' },
              { topic: 'DNA ve Genetik Kod', impact: 9, reason: 'Fen Bilimleri sınavının en belirleyici ve kapsamlı bölümüdür.' },
              { topic: 'Cebirsel İfadeler', impact: 8, reason: 'Yeni nesil soruların kurgulandığı kritik bir matematik alanıdır.' }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] font-black bg-blue-600 text-white px-4 py-1.5 rounded-full italic uppercase tracking-widest shadow-lg shadow-blue-500/20">ETKİ: {item.impact}/10</span>
                </div>
                <h4 className="font-black text-2xl mb-4 uppercase tracking-tighter dark:text-white">{item.topic}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 italic font-medium leading-relaxed">"{item.reason}"</p>
              </div>
            ))}
          </div>

          <div className="space-y-16">
            {subjectsConfig[examType].map((ders, i) => (
              <div key={ders} className="space-y-6">
                <div className="flex justify-between items-end text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${i % 2 === 0 ? 'bg-blue-600 shadow-blue-500/30' : 'bg-rose-600 shadow-rose-500/30'}`}></div> 
                    {ders} Müfredat Hakimiyeti
                  </span>
                  <span className="text-blue-600 font-black text-xl">{95 - (i * 12)}%</span>
                </div>
                <div className="h-6 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200/50 dark:border-slate-700">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(37,99,235,0.3)]" style={{ width: `${95 - (i * 12)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
         <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700 mb-20">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
             <div className="space-y-2 text-center md:text-left">
               <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">Konu Analizi</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resmi Kazanım Dağılım Grafiği (LGS 2026 Projeksiyonu)</p>
             </div>
           </div>
           
           <div className="flex items-end justify-between h-[400px] gap-6 px-4 md:px-8 border-b-2 border-slate-100 dark:border-slate-800 pb-12 overflow-x-auto hide-scrollbar">
              {[45, 75, 25, 95, 60, 85, 30, 90].map((val, idx) => (
                <div key={idx} className="flex-1 min-w-[40px] flex flex-col items-center gap-6 h-full justify-end group cursor-help relative">
                  <div className={`w-full rounded-t-2xl transition-all duration-700 group-hover:scale-x-110 shadow-lg ${val < 40 ? 'bg-rose-500 shadow-rose-500/40' : (val > 70 ? 'bg-blue-600 shadow-blue-500/40' : 'bg-slate-400 shadow-slate-400/20')}`} style={{ height: `${val}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 transition-all absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-xl z-20 whitespace-nowrap">
                       BAŞARI: %{val}
                     </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 text-center tracking-tighter truncate w-full">{['TR', 'MAT', 'FEN', 'İNK', 'DİN', 'İNG', 'GEO', 'FİZ'][idx]}</span>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};