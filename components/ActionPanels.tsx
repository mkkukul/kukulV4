
import React, { useState, useEffect, useRef } from 'react';
// Added missing import for GoogleGenAI to fix the reference error
import { GoogleGenAI } from "@google/genai";
import { ExamSubject, StudentProfile } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const StrategyIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const ListIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;

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
    <div className="bg-white/80 dark:bg-slate-900/50 p-8 lg:p-12 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 animate-in fade-in zoom-in duration-500 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-2xl">👤</div>
        <div>
          <h3 className="text-4xl font-black dark:text-white uppercase tracking-tighter leading-none">Öğrenci Profilim</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 italic">Akademik Kimliğini ve Hedeflerini Belirle</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Ad Soyad</label>
          <input type="text" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200" placeholder="Örn: Ahmet Yılmaz" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Sınıf / Seviye</label>
          <select className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200" value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })} >
            <option>8. Sınıf (LGS)</option>
            <option>12. Sınıf (YKS)</option>
            <option>Mezun (YKS)</option>
            <option>Diğer</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Hedef Okul / Üniversite</label>
          <input type="text" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200" placeholder="Örn: İstanbul Erkek Lisesi / ODTÜ Bilgisayar" value={profile.target} onChange={(e) => setProfile({ ...profile, target: e.target.value })} />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Mevcut Net Ortalaması</label>
          <input type="number" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200" placeholder="0" value={profile.averageNet || ''} onChange={(e) => setProfile({ ...profile, averageNet: parseFloat(e.target.value) })} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Ek Notlar / Motivasyon Cümlesi</label>
          <textarea className="w-full h-32 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 resize-none" placeholder="Hayallerini buraya fısılda..." value={profile.notes} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} />
        </div>
      </div>
      <button onClick={handleSave} className={`w-full py-7 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isSaved ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-indigo-700 text-white shadow-blue-500/20'}`} >
        {isSaved ? '✅ Veriler Güvende' : '🚀 Profilimi Kaydet ve Analiz Et'}
      </button>
    </div>
  );
};

export const AnalysisStudio: React.FC<{ onAnalyze: (text: string, fileData?: { mimeType: string, data: string }) => void, isLoading: boolean }> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'input' | 'performance' | 'strategy' | 'topics'>('input');
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
    if (fileData) prompt += `EK KARNE ANALİZİ: Ekteki görselden konu bazlı eksikleri çıkarıp bana stratejik yol haritası sun.`;
    onAnalyze(prompt, fileData ? { mimeType: fileData.mimeType, data: fileData.data } : undefined);
    setActiveTab('performance');
  };

  const themeColor = examType === 'LGS' ? 'blue' : 'rose';
  const themeBg = examType === 'LGS' ? 'bg-blue-600' : 'bg-rose-600';
  const themeText = examType === 'LGS' ? 'text-blue-600' : 'text-rose-600';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* SEKMELER */}
      <div className="flex flex-wrap gap-2 md:gap-3 bg-white/60 dark:bg-slate-900/40 p-2 rounded-[2.5rem] backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        {[
          { id: 'input', label: 'Veri Girişi', icon: ListIcon },
          { id: 'performance', label: 'Stratejik Performans', icon: ChartIcon },
          { id: 'strategy', label: 'Akıllı Strateji', icon: StrategyIcon },
          { id: 'topics', label: 'Konu Analizi', icon: FileIcon },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? (examType === 'LGS' ? 'bg-blue-600 text-white shadow-xl' : 'bg-rose-600 text-white shadow-xl') 
              : 'text-slate-500 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <tab.icon />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* PANEL İÇERİĞİ */}
      <div className="min-h-[500px]">
        {activeTab === 'input' && (
          <div className="bg-white/80 dark:bg-slate-900/50 p-6 lg:p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 backdrop-blur-xl animate-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${themeBg}`}>📈</div>
                <div>
                  <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Analysis Studio</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Deneme Veri Entegrasyonu</p>
                </div>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner">
                {['LGS', 'TYT'].map(t => (
                  <button key={t} onClick={() => { setExamType(t as any); setSubjects(initialSubjects(t as any)); }}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${examType === t ? (t === 'LGS' ? 'bg-blue-600 text-white shadow-lg' : 'bg-rose-600 text-white shadow-lg') : 'text-slate-500 hover:text-slate-700'}`}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/40">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/80">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">D / Y</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Net</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {subjects.map((s, i) => (
                        <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{s.name}</td>
                          <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                            <input type="number" className="w-12 bg-transparent border-b border-slate-200 text-center font-bold" value={s.correct || ''} onChange={(e) => handleUpdate(i, 'correct', parseInt(e.target.value))} />
                            <span className="text-slate-300">/</span>
                            <input type="number" className="w-12 bg-transparent border-b border-slate-200 text-center font-bold" value={s.incorrect || ''} onChange={(e) => handleUpdate(i, 'incorrect', parseInt(e.target.value))} />
                          </td>
                          <td className={`px-6 py-4 font-black text-center ${themeText}`}>{s.net}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-6">
                <div onClick={() => fileInputRef.current?.click()} className="p-10 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all bg-white dark:bg-slate-900/40">
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                  {fileData ? (
                    <div className="text-center">
                      <p className="text-4xl mb-2">📄</p>
                      <p className="text-[10px] font-black truncate max-w-[120px]">{fileData.name}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-4xl mb-2">📁</p>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Karne Yükle</p>
                    </>
                  )}
                </div>
                <div className="p-6 bg-slate-900 text-white rounded-[2rem] text-center shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Genel Net</p>
                  <p className="text-4xl font-black">{totalNet.toFixed(2)}</p>
                </div>
                <button onClick={triggerAnalysis} disabled={isLoading || (totalNet === 0 && !fileData)} className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all ${themeBg} hover:scale-[1.02] active:scale-95 disabled:opacity-50`}>
                  {isLoading ? 'Analiz Ediliyor...' : 'RAPOR ÜRET'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5">
             <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] backdrop-blur-xl">
               <h4 className="text-lg font-black text-rose-600 uppercase tracking-tighter flex items-center gap-3 mb-6">
                 <span className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center text-xs">!</span>
                 Acil Müdahale Listesi (Kritik Eksikler)
               </h4>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {['Üslü Sayılar', 'EBOB-EKOK', 'Sıvı Basıncı', 'Cümle Türleri', 'Hız-Zaman'].map((item, idx) => (
                   <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Kritik Konu</p>
                     <p className="text-xs font-bold dark:text-white truncate">{item}</p>
                     <div className="mt-3 flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-full h-1 bg-rose-500 rounded-full"></div>)}
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="grid md:grid-cols-3 gap-6">
                {subjectsConfig[examType].slice(0, 3).map((ders, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <h5 className="font-black text-xl uppercase tracking-tighter">{ders}</h5>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${idx === 1 ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'}`}>
                        {idx === 1 ? '%42 Başarı' : '%88 Başarı'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">"Görsel yorumlama sorularında hata payın yüksek. Odaklanman gereken alan: Tablo ve Grafik okuma."</p>
                    <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                       <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">HEDEF STRATEJİ</p>
                       <p className="text-[11px] font-bold">Haftada 2 ek test çöz.</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 animate-in slide-in-from-right-5">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Akıllı Gelişim Stratejisi</h3>
            <div className="grid gap-8">
               {subjectsConfig[examType].map((ders, idx) => (
                 <div key={idx} className="space-y-3">
                   <div className="flex justify-between items-end">
                     <div>
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders Bazlı Etki</span>
                       <p className="font-bold uppercase tracking-tighter">{ders}</p>
                     </div>
                     <p className="text-xs font-black text-blue-600">{100 - (idx * 15)}% Verimlilik</p>
                   </div>
                   <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                     <div className={`h-full rounded-full transition-all duration-1000 ${themeBg}`} style={{ width: `${100 - (idx * 15)}%` }}></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-in fade-in">
             <h3 className="text-3xl font-black uppercase tracking-tighter">Konu Bazlı Başarı Analizi</h3>
             <div className="flex items-end justify-between h-64 gap-2 md:gap-4 px-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                {[40, 75, 20, 90, 55, 80].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                    <div className={`w-full rounded-t-xl transition-all duration-1000 hover:opacity-80 cursor-help ${val < 40 ? 'bg-rose-500' : (val > 70 ? 'bg-blue-600' : 'bg-slate-400')}`} style={{ height: `${val}%` }}></div>
                    <span className="text-[8px] font-black uppercase text-slate-400 text-center truncate w-full">{['SÖZ', 'MAT', 'FEN', 'İNK', 'DİN', 'İNG'][idx]}</span>
                  </div>
                ))}
             </div>
             <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-widest">Sınav Genel Kazanım Yüzdeleri</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const VisualStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Dijital Sanat');
  const [aspect, setAspect] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    try {
      // Initialize the GoogleGenAI client with the API key from the environment.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `Sanat Tarzı: ${style}. Konu: ${prompt}. Profesyonel eğitim illüstrasyonu, 4K çözünürlük.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
        config: { imageConfig: { aspectRatio: aspect } }
      });
      // Iterate through candidates and parts to find the image data.
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) setImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (err) { alert("Hata: " + err); } finally { setIsLoading(false); }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl grid lg:grid-cols-2 gap-10 backdrop-blur-xl">
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Visual Studio</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Görsel Eğitim Materyali</p>
        </div>
        <textarea className="w-full h-44 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 resize-none" placeholder="Örn: Hücre bölünmesini anlatan renkli bir çizim..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={generateImage} disabled={isLoading || !prompt.trim()} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-xl shadow-xl transition-all">
          {isLoading ? '🎨 Tasarlanıyor...' : '✨ Görseli Yarat'}
        </button>
      </div>
      <div className="aspect-square bg-slate-100 dark:bg-slate-800/30 rounded-[3rem] flex items-center justify-center overflow-hidden border-4 border-dashed border-slate-200">
        {image ? <img src={image} className="w-full h-full object-cover" /> : <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Ön İzleme</span>}
      </div>
    </div>
  );
};

export const RaftPanel: React.FC<{ onGenerate: (data: string) => void }> = ({ onGenerate }) => {
  const [data, setData] = useState({ role: '', audience: '', format: '', topic: '' });
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 backdrop-blur-xl">
      <div className="flex items-center gap-6"><div className="w-16 h-16 bg-purple-600 rounded-[1.5rem] flex items-center justify-center text-white text-4xl shadow-2xl rotate-3">⛵</div>
      <div><h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">RAFT Senaryo Masası</h3></div></div>
      <div className="grid md:grid-cols-2 gap-8">
        {['role', 'audience', 'format', 'topic'].map(f => (
          <input key={f} className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border border-slate-100 dark:border-slate-700 font-bold" placeholder={f.toUpperCase()} value={(data as any)[f]} onChange={(e) => setData({ ...data, [f]: e.target.value })} />
        ))}
      </div>
      <button onClick={() => onGenerate(`RAFT Senaryosu: ${data.role} -> ${data.audience} için ${data.format} türünde ${data.topic} konusunu anlatacak.`)} className="w-full py-6 bg-purple-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-purple-500/30 transition-all">✨ Senaryoyu Üret</button>
    </div>
  );
};

export const StepperPanel: React.FC<{ onStepClick: (step: string) => void }> = ({ onStepClick }) => {
  const steps = [{ id: 1, title: 'Bağlantı', color: 'bg-rose-500' }, { id: 2, title: 'İnceleme', color: 'bg-orange-500' }, { id: 3, title: 'İmgeleme', color: 'bg-amber-500' }, { id: 4, title: 'Bilgi', color: 'bg-emerald-500' }, { id: 5, title: 'Uygulama', color: 'bg-blue-500' }, { id: 6, title: 'Genişletme', color: 'bg-indigo-500' }, { id: 7, title: 'İyileştirme', color: 'bg-violet-500' }, { id: 8, title: 'Paylaşma', color: 'bg-fuchsia-500' }];
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 backdrop-blur-xl">
      <h3 className="text-3xl font-black uppercase tracking-tighter">4MAT Ders Tasarımı</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map(step => (
          <button key={step.id} onClick={() => onStepClick(`4MAT Modelinin '${step.title}' aşaması için ders içeriği tasarla.`)} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all text-left">
            <div className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center text-white font-black text-xs mb-4 shadow-lg`}>{step.id}</div>
            <h4 className="font-black dark:text-white text-sm uppercase tracking-tighter">{step.title}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export const KWHLAQPanel: React.FC = () => {
  const cols = ['K', 'W', 'H', 'L', 'A', 'Q'];
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-200 shadow-2xl space-y-8 backdrop-blur-xl overflow-x-auto">
      <h3 className="text-3xl font-black uppercase tracking-tighter">KWHLAQ Sorgulama Panosu</h3>
      <div className="flex gap-4 min-w-[1000px]">
        {cols.map(c => (
          <div key={c} className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-6 h-96 border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black mb-4">{c}</div>
            <div className="border-2 border-dashed border-slate-200 h-full rounded-2xl flex items-center justify-center text-[10px] font-black text-slate-400">NOT EKLE</div>
          </div>
        ))}
      </div>
    </div>
  );
};
