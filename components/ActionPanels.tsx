
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExamSubject, StudentProfile } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AlertTriangleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const CheckCircle2Icon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TrendingUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

// --- PANELS ---

export const HooksPanel: React.FC<{ onHookClick: (data: string) => void }> = ({ onHookClick }) => {
  const [topic, setTopic] = useState('');
  
  const hookTypes = [
    { id: 'mystery', title: 'Gizemli Kutu', icon: '🎁', desc: 'Merak uyandıran bir bilinmeyen.', color: 'from-amber-400 to-orange-600' },
    { id: 'myth', title: 'Efsane Avcısı', icon: '🛡️', desc: 'Doğru bilinen yanlışları sarsın.', color: 'from-rose-500 to-pink-700' },
    { id: 'challenge', title: 'Meydan Okuma', icon: '⚔️', desc: 'Zihinsel bir düelloya davet.', color: 'from-blue-600 to-indigo-800' },
    { id: 'story', title: 'Hikaye Anlatıcı', icon: '📖', desc: 'Duygusal bir bağ kuran giriş.', color: 'from-emerald-500 to-teal-700' },
    { id: 'tech', title: 'Fütüristik Bakış', icon: '🚀', desc: 'Geleceğin teknolojisiyle bağ kurun.', color: 'from-violet-600 to-purple-800' },
    { id: 'paradox', title: 'Paradoks', icon: '🌀', desc: 'Mantığı zorlayan çelişkiler.', color: 'from-cyan-500 to-blue-700' },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-12 md:p-16 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl shadow-blue-500/30 animate-float">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">Ders Kancaları (Hooks)</h3>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest max-w-xl mx-auto">Öğrencilerin dikkatini saniyeler içinde yakalayın ve derse olan meraklarını zirveye taşıyın.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6">Ders Konusu</label>
        <input 
          type="text" 
          placeholder="Örn: Fotosentez, Fransız İhtilali, Trigonometri..." 
          className="w-full p-7 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 outline-none focus:ring-4 ring-blue-500/10 font-black text-lg transition-all shadow-inner dark:text-white"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hookTypes.map((hook) => (
          <button
            key={hook.id}
            onClick={() => {
              if (!topic.trim()) {
                alert("Lütfen önce bir konu girin.");
                return;
              }
              onHookClick(`Konu: ${topic}. Kanca Türü: ${hook.title}. Bu kanca türünü kullanarak öğrencilerin dikkatini çekecek 3 farklı giriş senaryosu üret.`);
            }}
            className="group relative h-64 p-8 rounded-[3rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-500 transition-all text-left shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hook.color} opacity-10 group-hover:opacity-20 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500`}></div>
            <div className={`w-14 h-14 bg-gradient-to-br ${hook.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-xl shadow-slate-400/20 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
              {hook.icon}
            </div>
            <h4 className="font-black text-xl uppercase tracking-tighter dark:text-white group-hover:text-blue-600 transition-colors">{hook.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-3 leading-snug">{hook.desc}</p>
            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all font-black text-[10px] uppercase text-blue-600 tracking-widest">KANCALAYIN →</div>
          </button>
        ))}
      </div>
    </div>
  );
};

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
            <option>Diğer</option>
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
    if (fileData) prompt += `EK KARNE ANALİZİ: Yüklenen karne görselindeki/PDFindeki konu bazlı başarı oranlarını, yanlış yapılan konuları ve kazanım eksiklerini çıkar. Manuel verilerimle birleştirip Kukul AI Koç olarak bana stratejik bir yol haritası sun.`;
    onAnalyze(prompt, fileData ? { mimeType: fileData.mimeType, data: fileData.data } : undefined);
  };

  return (
    <div className="min-h-[600px] animate-in fade-in duration-500">
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
        <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700">
          {/* Acil Müdahale Listesi */}
          <div className="p-12 bg-rose-500/10 border-2 border-dashed border-rose-500/30 rounded-[4rem] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-900/20">
                <AlertTriangleIcon />
              </div>
              <div>
                <h4 className="text-3xl font-black text-rose-600 uppercase tracking-tighter leading-none">Acil Müdahale Listesi</h4>
                <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mt-2">Kazanım Bazlı Kritik Konular</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              {(examType === 'LGS' 
                ? ['DNA ve Genetik Kod', 'Üslü Sayılar', 'Cümlenin Ögeleri', 'Basınç', 'EBOB-EKOK', 'Kader İnancı'] 
                : ['Türev-İntegral', 'Modern Fizik', 'Organik Kimya', 'Paragraf Analizi', 'Trigonometri', 'Ecosystems']
              ).map((item, idx) => (
                <div key={idx} className="px-8 py-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-rose-100 dark:border-rose-900/30 flex items-center gap-4 transition-all hover:scale-110 hover:-rotate-1 group cursor-default">
                  <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                  <p className="font-black text-sm text-rose-700 dark:text-rose-400 uppercase tracking-widest">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {subjectsConfig[examType].slice(0, 3).map((ders, i) => (
              <div key={ders} className="p-12 bg-white/80 dark:bg-slate-900/80 rounded-[4.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-10 backdrop-blur-xl group hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h5 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 dark:text-white">
                      {ders}
                    </h5>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Branş Analizi</p>
                  </div>
                  <span className={`px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest shadow-inner ${i === 1 ? 'bg-rose-100 text-rose-600 shadow-rose-200' : 'bg-emerald-100 text-emerald-600 shadow-emerald-200'}`}>
                      {i === 1 ? '%42 BAŞARI' : '%88 BAŞARI'}
                  </span>
                </div>
                <div className="space-y-8">
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic border-l-8 border-blue-500/20 pl-6 py-2">
                    "Verilere göre bu derste kazanım odaklı ilerlemen gerekiyor. Kukul AI Koç diyor ki: {examType} müfredatındaki en kritik kurgulara odaklan!"
                  </p>
                  <div className="pt-10 border-t border-slate-100 dark:border-slate-800 relative">
                    <div className="absolute -top-4 left-0 px-4 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">HEDEF STRATEJİ</div>
                    <p className="text-lg font-black leading-tight dark:text-slate-200 tracking-tight">PDF raporundaki soru dağılımına göre en yoğun konudan 2 test çözmelisin.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] space-y-20 border border-slate-200/50 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto animate-in slide-in-from-right-5 duration-700">
          <div className="text-center space-y-6">
             <h3 className="text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">Akıllı Strateji</h3>
             <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[11px] max-w-xl mx-auto">Verimlilik, Kazanım Odaklı İlerleme Takibi ve Owl Academia Analytic Engine v4.2 Optimizasyonu</p>
          </div>
          <div className="space-y-16">
            {subjectsConfig[examType].map((ders, i) => (
              <div key={ders} className="space-y-6">
                <div className="flex justify-between items-end text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${i % 2 === 0 ? 'bg-blue-600 shadow-blue-500/40' : 'bg-rose-600 shadow-rose-500/40'}`}></div> 
                    {ders} Verimlilik Etkisi
                  </span>
                  <span className="text-blue-600 font-black text-xl">{95 - (i * 12)}%</span>
                </div>
                <div className="h-8 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-1.5 shadow-inner border border-slate-200/50 dark:border-slate-700">
                  <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 rounded-full transition-all duration-1000 shadow-[0_0_30px_rgba(37,99,235,0.4)]" style={{ width: `${95 - (i * 12)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
         <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="space-y-2">
               <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">Konu Analizi</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kazanım Bazlı Başarı Dağılım Grafiği</p>
             </div>
             <div className="flex gap-8">
                <div className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-500 tracking-widest">
                   <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div> Güçlü Alanlar
                </div>
                <div className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-500 tracking-widest">
                   <div className="w-4 h-4 bg-rose-500 rounded-full shadow-lg shadow-rose-500/30"></div> Kritik Alanlar
                </div>
             </div>
           </div>
           
           <div className="flex items-end justify-between h-[500px] gap-10 px-8 border-b-2 border-slate-100 dark:border-slate-800 pb-12 overflow-x-auto hide-scrollbar">
              {[45, 75, 25, 95, 60, 85, 30, 90].map((val, idx) => (
                <div key={idx} className="flex-1 min-w-[60px] flex flex-col items-center gap-6 h-full justify-end group cursor-help relative">
                  <div className={`w-full rounded-t-[3rem] transition-all duration-700 group-hover:scale-x-110 group-hover:-translate-y-2 shadow-2xl ${val < 40 ? 'bg-rose-500 shadow-rose-500/40' : (val > 70 ? 'bg-blue-600 shadow-blue-500/40' : 'bg-slate-400 shadow-slate-400/30')}`} style={{ height: `${val}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 transition-all absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-black px-5 py-3 rounded-2xl shadow-2xl z-20 whitespace-nowrap">
                       BAŞARI: %{val}
                     </div>
                  </div>
                  <span className="text-[11px] font-black uppercase text-slate-400 text-center tracking-[0.2em] truncate w-full">{['SÖZ', 'MAT', 'FEN', 'İNK', 'DİN', 'İNG', 'GEO', 'FİZ'][idx]}</span>
                </div>
              ))}
           </div>
           <div className="flex justify-center items-center gap-4 opacity-50">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
              <p className="text-[11px] font-bold text-center text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap">Kukul Academia Analytic Engine v4.2</p>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
           </div>
        </div>
      )}
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
    <div className="bg-white/80 dark:bg-slate-900/50 p-12 md:p-16 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl grid lg:grid-cols-2 gap-16 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="space-y-12">
        <div>
          <h3 className="text-5xl font-black dark:text-white uppercase tracking-tighter leading-none">Hayal Atölyesi</h3>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-4">Eğitim Materyali İçin Görsel Tasarla</p>
        </div>
        <textarea className="w-full h-64 p-10 bg-slate-50 dark:bg-slate-800/80 rounded-[3rem] outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 resize-none shadow-inner text-lg leading-relaxed" placeholder="Örn: Hücre bölünmesini anlatan renkli, açıklayıcı ve pedagojik bir illüstrasyon..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={generateImage} disabled={isLoading || !prompt.trim()} className="w-full py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-blue-500/20 transition-all active:scale-95">
          {isLoading ? '🎨 Tasarlanıyor...' : '✨ Görseli Yarat'}
        </button>
      </div>
      <div className="aspect-square bg-slate-100 dark:bg-slate-800/30 rounded-[4rem] flex items-center justify-center overflow-hidden border-4 border-dashed border-slate-200 shadow-inner group relative">
        {image ? (
          <>
            <img src={image} className="w-full h-full object-cover animate-in zoom-in duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <a href={image} download="kukul-studio.png" className="px-10 py-5 bg-white text-slate-900 font-black text-sm rounded-3xl shadow-2xl hover:scale-110 transition-transform">📥 KAYDET</a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-30">
            <span className="text-8xl">🖼️</span>
            <span className="text-[11px] font-black uppercase tracking-[0.5em]">Ön İzleme Alanı</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RaftPanel: React.FC<{ onGenerate: (data: string) => void }> = ({ onGenerate }) => {
  const [data, setData] = useState({ role: '', audience: '', format: '', topic: '' });
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-12 md:p-16 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="flex items-center gap-10">
        <div className="w-24 h-24 bg-purple-600 rounded-[2.5rem] flex items-center justify-center text-white text-6xl shadow-2xl rotate-3 transition-transform hover:rotate-0">⛵</div>
        <div>
          <h3 className="text-5xl font-black dark:text-white uppercase tracking-tighter leading-none">RAFT Tasarımı</h3>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2 italic">Yaratıcı Senaryo Oluşturucu</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        {['role', 'audience', 'format', 'topic'].map(f => (
          <div key={f} className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-8">{f.toUpperCase()}</label>
            <input className="w-full p-7 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] outline-none border border-slate-100 dark:border-slate-700 font-black dark:text-white shadow-inner text-lg" placeholder={f.toUpperCase()} value={(data as any)[f]} onChange={(e) => setData({ ...data, [f]: e.target.value })} />
          </div>
        ))}
      </div>
      <button onClick={() => onGenerate(`RAFT Senaryosu: ${data.role} -> ${data.audience} için ${data.format} türünde ${data.topic} konusunu anlatacak.`)} className="w-full py-8 bg-purple-600 text-white rounded-[2.5rem] font-black text-2xl shadow-xl shadow-purple-500/30 transition-all active:scale-95">✨ SENARYOYU ÜRET</button>
    </div>
  );
};

export const StepperPanel: React.FC<{ onStepClick: (step: string) => void }> = ({ onStepClick }) => {
  const steps = [{ id: 1, title: 'Bağlantı', color: 'bg-rose-500' }, { id: 2, title: 'İnceleme', color: 'bg-orange-500' }, { id: 3, title: 'İmgeleme', color: 'bg-amber-500' }, { id: 4, title: 'Bilgi', color: 'bg-emerald-500' }, { id: 5, title: 'Uygulama', color: 'bg-blue-500' }, { id: 6, title: 'Genişletme', color: 'bg-indigo-500' }, { id: 7, title: 'İyileştirme', color: 'bg-violet-500' }, { id: 8, title: 'Paylaşma', color: 'bg-fuchsia-500' }];
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-12 md:p-20 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white">4MAT Ders Tasarımı</h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Pedagojik Derinleşme ve Öğrenme Döngüsü</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map(step => (
          <button key={step.id} onClick={() => onStepClick(`4MAT Modelinin '${step.title}' aşaması için ders içeriği tasarla.`)} className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all text-left group shadow-sm hover:shadow-2xl hover:-translate-y-2">
            <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-lg mb-6 shadow-xl group-hover:scale-110 transition-transform`}>{step.id}</div>
            <h4 className="font-black dark:text-white text-lg uppercase tracking-tighter">{step.title}</h4>
            <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest">DÖNGÜ ADIMI</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export const KWHLAQPanel: React.FC = () => {
  const cols = ['K', 'W', 'H', 'L', 'A', 'Q'];
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 p-12 md:p-16 rounded-[5rem] border border-slate-200 shadow-2xl space-y-16 backdrop-blur-xl overflow-x-auto hide-scrollbar animate-in fade-in duration-700">
      <div className="space-y-4">
        <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white">KWHLAQ Pano</h3>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sorgulamaya Dayalı Akademik Süreç Yönetimi</p>
      </div>
      <div className="flex gap-10 min-w-[1400px] pb-12">
        {cols.map(c => (
          <div key={c} className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-[4rem] p-12 h-[550px] border border-slate-100 dark:border-slate-800 shadow-md flex flex-col group hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <div className="w-20 h-20 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center font-black text-3xl mb-10 shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform relative z-10">{c}</div>
            <div className="flex-1 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem] flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all cursor-pointer bg-white/20 dark:bg-black/10 relative z-10">
              NOT EKLE
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
