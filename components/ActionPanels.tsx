
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExamSubject, StudentProfile, ExamHistoryEntry } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileUpIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AlertTriangleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const UserCircleIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalculatorIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2v14a2 2 0 002 2z" /></svg>;
const TargetIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HistoryIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

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
    <div className="bg-white/80 dark:bg-slate-900/50 p-8 lg:p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 backdrop-blur-xl relative overflow-hidden animate-in zoom-in duration-500 max-w-5xl mx-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
            <UserCircleIcon />
          </div>
          <div>
            <h3 className="text-4xl font-black dark:text-white uppercase tracking-tighter leading-none">Öğrenci Profilim</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-2 italic">Akademik Kimliğini ve Hedeflerini Belirle</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-4">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Ad Soyad
          </label>
          <input 
            type="text" 
            className="w-full p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner focus:ring-4 ring-blue-500/10 transition-all text-lg" 
            placeholder="Örn: Ahmet Yılmaz" 
            value={profile.name} 
            onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
          />
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Sınıf Seviyesi
          </label>
          <select 
            className="w-full p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner focus:ring-4 ring-blue-500/10 transition-all text-lg appearance-none cursor-pointer" 
            value={profile.grade} 
            onChange={(e) => setProfile({ ...profile, grade: e.target.value })} 
          >
            <option>8. Sınıf (LGS)</option>
            <option>12. Sınıf (YKS - Sayısal)</option>
            <option>12. Sınıf (YKS - Eşit Ağırlık)</option>
            <option>12. Sınıf (YKS - Sözel)</option>
            <option>Mezun (YKS)</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Hedef Okul / Puan
          </label>
          <input 
            type="text" 
            className="w-full p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner focus:ring-4 ring-blue-500/10 transition-all text-lg pl-14" 
            placeholder="Örn: Galatasaray Lisesi" 
            value={profile.target} 
            onChange={(e) => setProfile({ ...profile, target: e.target.value })} 
          />
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Mevcut Net Ortalaması
          </label>
          <input 
            type="number" 
            className="w-full p-6 bg-slate-50 dark:bg-slate-800/80 rounded-3xl outline-none border border-slate-100 dark:border-slate-700 font-bold dark:text-white shadow-inner focus:ring-4 ring-blue-500/10 transition-all text-lg" 
            value={profile.averageNet || ''} 
            onChange={(e) => setProfile({ ...profile, averageNet: parseFloat(e.target.value) })} 
          />
        </div>
      </div>

      <button onClick={handleSave} className={`w-full py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 ${isSaved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-indigo-700'}`}>
        {isSaved ? <>✅ Kaydedildi</> : <>🚀 Profili Kaydet</>}
      </button>
    </div>
  );
};

export const ProgressTracker: React.FC = () => {
  const [history, setHistory] = useState<ExamHistoryEntry[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('exam_history');
    if (saved) {
      setHistory(JSON.parse(saved).sort((a: any, b: any) => b.date - a.date));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="p-20 text-center space-y-6 bg-white/50 dark:bg-slate-900/50 rounded-[4rem] border border-dashed border-slate-300 dark:border-slate-700">
        <div className="text-6xl grayscale">📉</div>
        <h3 className="text-3xl font-black uppercase dark:text-white">Henüz Bir Veri Yok</h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Deneme verilerini girdikçe gelişimini burada göreceksin.</p>
      </div>
    );
  }

  const latest = history[0];
  const previous = history.length > 1 ? history[1] : null;
  const improvement = previous ? latest.totalNet - previous.totalNet : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Son Deneme Neti</p>
          <div className="flex items-end gap-3">
             <span className="text-5xl font-black text-blue-600 tabular-nums">{latest.totalNet.toFixed(2)}</span>
             {improvement !== 0 && (
               <span className={`text-sm font-black mb-1 ${improvement > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement).toFixed(2)}
               </span>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Çözülen Deneme Sayısı</p>
          <span className="text-5xl font-black dark:text-white tabular-nums">{history.length}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Hedefe Kalan</p>
          <span className="text-5xl font-black text-rose-600 tabular-nums">?</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-12">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Gelişim Geçmişi</h3>
          <button 
            onClick={() => { if(confirm('Tüm geçmişi silmek istediğine emin misin?')) { localStorage.removeItem('exam_history'); setHistory([]); } }}
            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
          >
            Geçmişi Temizle
          </button>
        </div>
        
        <div className="space-y-6">
          {history.map((entry) => (
            <div key={entry.id} className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-blue-600 uppercase leading-none">{new Date(entry.date).toLocaleString('tr-TR', { month: 'short' })}</span>
                  <span className="text-xl font-black dark:text-white leading-none mt-1">{new Date(entry.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="font-black text-xl dark:text-white uppercase tracking-tighter">{entry.examType} Denemesi</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {new Date(entry.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Toplam Net</p>
                  <p className="text-3xl font-black text-blue-600 tabular-nums">{entry.totalNet.toFixed(2)}</p>
                </div>
                <div className="flex flex-wrap gap-2 max-w-[200px] justify-end">
                   {entry.subjects.slice(0, 3).map(s => (
                     <div key={s.name} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-[9px] font-black uppercase">
                       {s.name.substring(0,3)}: {s.net}
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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

  useEffect(() => {
    setSubjects(initialSubjects(examType));
  }, [examType]);

  const handleUpdate = (index: number, field: 'correct' | 'incorrect', value: string) => {
    const newSubjects = [...subjects];
    const val = parseInt(value) || 0;
    newSubjects[index][field] = Math.max(0, val);
    
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
    // Save to History before analysis
    const historyEntry: ExamHistoryEntry = {
      id: crypto.randomUUID(),
      date: Date.now(),
      examType: examType,
      totalNet: totalNet,
      subjects: [...subjects]
    };
    const saved = localStorage.getItem('exam_history');
    const history = saved ? JSON.parse(saved) : [];
    history.push(historyEntry);
    localStorage.setItem('exam_history', JSON.stringify(history));

    let prompt = `Aşağıdaki ${examType} deneme verilerimi analiz et:\n\n[MANUEL VERİ GİRİŞİ]\n`;
    prompt += subjects.map(s => `- ${s.name}: ${s.correct} Doğru, ${s.incorrect} Yanlış, Net: ${s.net}`).join('\n');
    prompt += `\nTOPLAM NET: ${totalNet.toFixed(2)}\n\n`;
    if (fileData) prompt += `\n[PDF/RESİM ANALİZİ]: Yüklenen belgedeki verileri de bu analizle birleştir.`;
    onAnalyze(prompt, fileData ? { mimeType: fileData.mimeType, data: fileData.data } : undefined);
  };

  return (
    <div className="min-h-[600px] animate-in fade-in duration-500 overflow-y-auto pb-20">
      {activeTab === 'input' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 dark:bg-slate-900/80 rounded-[3.5rem] p-10 border border-slate-200/50 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <CalculatorIcon />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Manuel Net Girişi</h4>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Sınav Türünü Seç ve Netlerini Hesapla</p>
                    </div>
                  </div>
                  
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                    <button 
                      onClick={() => setExamType('LGS')}
                      className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${examType === 'LGS' ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >LGS</button>
                    <button 
                      onClick={() => setExamType('TYT')}
                      className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${examType === 'TYT' ? 'bg-rose-600 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >YKS / TYT</button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/80">
                      <tr>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Doğru</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Yanlış</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Dönem Sonu Net</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {subjects.map((s, i) => (
                        <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-6 font-black text-slate-700 dark:text-slate-300 text-lg">{s.name}</td>
                          <td className="px-6 py-6 text-center">
                            <input 
                              type="number" 
                              className="w-20 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-4 ring-blue-500/10 transition-all text-blue-600" 
                              value={s.correct || ''} 
                              onChange={(e) => handleUpdate(i, 'correct', e.target.value)}
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-6 text-center">
                            <input 
                              type="number" 
                              className="w-20 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-4 ring-rose-500/10 transition-all text-rose-500" 
                              value={s.incorrect || ''} 
                              onChange={(e) => handleUpdate(i, 'incorrect', e.target.value)}
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-6 font-black text-right text-2xl text-slate-900 dark:text-white tabular-nums">
                            {s.net.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-center">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Hesaplama Formülü</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                     {examType === 'LGS' ? 'Doğru - (Yanlış / 3)' : 'Doğru - (Yanlış / 4)'}
                   </p>
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-slate-900 text-white rounded-[4rem] p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] border border-slate-800"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform"></div>
              <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform border border-white/10">
                {fileData ? '📄' : <FileUpIcon />}
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl font-black uppercase tracking-tighter leading-tight">Görsel / PDF Analizi</h4>
                <p className="text-slate-400 text-sm font-medium">Karmaşık karneleri yükle, Kukul AI otomatik tarasın.</p>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
              <button className="w-full py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all">
                {fileData ? fileData.name : 'OPSİYONEL DOSYA EKLE'}
              </button>
            </div>

            <div className="p-10 bg-white/90 dark:bg-slate-900/80 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-md">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Genel Başarı Ortalaması</p>
               <p className="text-7xl font-black text-blue-600 tracking-tighter tabular-nums">{totalNet.toFixed(2)}</p>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-4 italic">TOPLAM NET</p>
            </div>

            <button 
              onClick={triggerAnalysis} 
              disabled={isLoading || (totalNet === 0 && !fileData)} 
              className="w-full py-8 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>🦉 ANALİZİ BAŞLAT</>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'koc' && children}

      {activeTab === 'performance' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700 pb-20">
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
                ? ['Üslü İfadeler', 'DNA ve Genetik Kod', 'Mevsimler ve İklim', 'Basınç', 'Fiilimsiler'] 
                : ['Türev ve İntegral', 'Modern Fizik', 'Organik Kimya', 'Paragraf Analizi', 'Trigonometri']
              ).map((item, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2 transition-all hover:scale-105">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  <p className="font-black text-[11px] text-slate-800 dark:text-slate-200 uppercase tracking-tighter leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200/50 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto animate-in fade-in duration-700 mb-20">
          <div className="text-center space-y-6 mb-16">
             <h3 className="text-6xl font-black uppercase tracking-tighter dark:text-white leading-none">Akıllı Gelişim Stratejisi</h3>
             <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[11px] max-w-xl mx-auto">Müfredat Kazanım Odaklı İlerleme Takibi</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { topic: 'Paragraf ve Anlam Bilgisi', impact: 10, reason: 'Sınav başarısının %70’ini oluşturmaktadır.' },
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
        </div>
      )}

      {activeTab === 'topics' && (
         <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-16 backdrop-blur-xl animate-in fade-in duration-700 mb-20">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
             <div className="space-y-2 text-center md:text-left">
               <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">Konu Analizi</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resmi Kazanım Dağılım Grafiği Projeksiyonu</p>
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
