
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExamSubject, StudentProfile } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const TrendingUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LightbulbIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const BarChart2Icon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const AlertTriangleIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const CheckCircle2Icon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

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

export const AnalysisStudio: React.FC<{ 
  onAnalyze: (text: string, fileData?: { mimeType: string, data: string }) => void, 
  isLoading: boolean 
}> = ({ onAnalyze, isLoading }) => {
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

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ÜST SEKME NAVİGASYONU */}
      <div className="flex flex-wrap gap-2 bg-slate-200/50 dark:bg-slate-900/40 p-2 rounded-[2rem] backdrop-blur-xl border border-slate-200/50">
        {[
          { id: 'input', label: 'Veri Girişi', icon: FileUpIcon },
          { id: 'performance', label: 'Stratejik Performans', icon: TrendingUpIcon },
          { id: 'strategy', label: 'Akıllı Strateji', icon: LightbulbIcon },
          { id: 'topics', label: 'Konu Analizi', icon: BarChart2Icon }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[600px]">
        {/* AKILLI GELİŞİM STRATEJİSİ (Progress Bars) */}
        {activeTab === 'strategy' && (
          <div className="bg-white dark:bg-slate-900/60 p-10 rounded-[3rem] space-y-10 border border-slate-200/50 shadow-xl animate-in slide-in-from-right-5 duration-500">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Akıllı Gelişim Stratejisi</h3>
            <div className="space-y-8">
              {['TÜRKÇE', 'MATEMATİK', 'FEN BİLİMLERİ'].map((ders, i) => (
                <div key={ders} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Ders Bazlı Etki: {ders}</span>
                    <span className="text-blue-600">{100 - (i * 15)}% Verimlilik</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${100 - (i * 15)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERİ GİRİŞİ (Dosya Yükleme Paneli) */}
        {activeTab === 'input' && (
          <div className="grid lg:grid-cols-3 gap-8 animate-in zoom-in duration-300">
            <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/60 rounded-[3rem] p-8 border border-slate-200/50 shadow-xl overflow-hidden">
                <div className="flex justify-between items-center mb-8 px-4">
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Net Giriş Tablosu</h4>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                    {['LGS', 'TYT'].map(t => (
                      <button key={t} onClick={() => { setExamType(t as any); setSubjects(initialSubjects(t as any)); }}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${examType === t ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400'}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/80">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Doğru / Yanlış</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {subjects.map((s, i) => (
                      <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{s.name}</td>
                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                          <input type="number" className="w-12 bg-transparent border-b-2 border-slate-200 text-center font-bold" value={s.correct || ''} onChange={(e) => handleUpdate(i, 'correct', parseInt(e.target.value))} />
                          <span className="text-slate-300">/</span>
                          <input type="number" className="w-12 bg-transparent border-b-2 border-slate-200 text-center font-bold" value={s.incorrect || ''} onChange={(e) => handleUpdate(i, 'incorrect', parseInt(e.target.value))} />
                        </td>
                        <td className={`px-6 py-4 font-black text-center text-blue-600`}>{s.net}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            <div className="bg-blue-600 text-white rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform" onClick={() => fileInputRef.current?.click()}>
                 {fileData ? '📄' : '📂'}
              </div>
              <h4 className="text-2xl font-black uppercase leading-tight">Karne Yükle</h4>
              <p className="text-blue-100 text-sm font-medium">PDF veya Resim yükle, yapay zeka saniyeler içinde analiz etsin.</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">
                {fileData ? fileData.name : 'Dosya Seç'}
              </button>
              <button onClick={triggerAnalysis} disabled={isLoading || (totalNet === 0 && !fileData)} className="w-full py-5 bg-blue-900/50 text-white border border-blue-400/30 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-900 transition-all active:scale-95 disabled:opacity-50">
                {isLoading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
              </button>
            </div>
          </div>
        )}

        {/* STRATEJİK PERFORMANS */}
        {activeTab === 'performance' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
            <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangleIcon />
                <h4 className="text-xl font-black text-rose-600 uppercase tracking-tighter">Acil Müdahale Listesi (Kritik Kayıplar)</h4>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                {['Üslü İfadeler', 'EBOB-EKOK', 'Mevsimler', 'Sıvı Basıncı', 'Cümle Türleri'].map(item => (
                  <div key={item} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Ders Konusu</p>
                    <p className="font-bold text-xs truncate dark:text-white">{item}</p>
                    <p className="text-rose-600 font-black text-sm mt-2">!!!</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['Türkçe', 'Matematik', 'Fen Bilimleri'].map((ders, i) => (
                <div key={ders} className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
                  <div className="flex justify-between items-start">
                    <h5 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 dark:text-white">
                      <CheckCircle2Icon /> {ders}
                    </h5>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${i === 1 ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'}`}>
                        {i === 1 ? '%42 Başarı' : '%88 Başarı'}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"Görsel yorumlama becerin yüksek ancak analiz sorularında %40 bandında kalmışsın."</p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">HEDEF STRATEJİ</p>
                      <p className="text-sm font-bold leading-snug dark:text-slate-300">Günlük 20 ek branş denemesiyle hızını artır.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KONU ANALİZİ (Simple Chart) */}
        {activeTab === 'topics' && (
           <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-500">
             <h3 className="text-3xl font-black uppercase tracking-tighter">Konu Bazlı Başarı Grafiği</h3>
             <div className="flex items-end justify-between h-64 gap-4 px-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                {[40, 75, 20, 90, 55, 80].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className={`w-full rounded-t-2xl transition-all duration-700 group-hover:opacity-80 ${val < 40 ? 'bg-rose-500' : (val > 70 ? 'bg-blue-600' : 'bg-slate-400')}`} style={{ height: `${val}%` }}></div>
                    <span className="text-[9px] font-black uppercase text-slate-400 text-center truncate w-full">{['SÖZ', 'MAT', 'FEN', 'İNK', 'DİN', 'İNG'][idx]}</span>
                  </div>
                ))}
             </div>
             <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-[0.3em] pt-4">Sınav Genel Kazanım Yüzdeleri</p>
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `Sanat Tarzı: ${style}. Konu: ${prompt}. Profesyonel eğitim illüstrasyonu, 4K çözünürlük.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
        config: { imageConfig: { aspectRatio: aspect } }
      });
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
