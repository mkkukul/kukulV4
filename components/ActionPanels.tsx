
import React, { useState, useEffect, useRef } from 'react';
import { ExamSubject, StudentProfile, ExamHistoryEntry } from '../types';
import { aiService } from '../services/aiService';

// --- ICONS ---
const FileUpIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AlertTriangleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const UserCircleIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalculatorIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2v14a2 2 0 002 2z" /></svg>;
const ScanIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-8V4M8 12H4m4 4v4m4-12H8m12 0h-4M4 8h4m12 4h-4" /></svg>;
const SparklesIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
const TrendingUpIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

// --- LGS KONU VERİSİ ---
const LGS_TOPICS_DETAIL = {
  'Türkçe': [
    { name: 'Sözcükte Anlam', weight: 10 },
    { name: 'Cümlede Anlam', weight: 15 },
    { name: 'Paragrafta Anlam', weight: 40 },
    { name: 'Fiilimsiler', weight: 5 },
    { name: 'Cümlenin Ögeleri', weight: 5 },
    { name: 'Söz Sanatları', weight: 5 },
    { name: 'Yazım Kuralları', weight: 10 },
    { name: 'Noktalama İşaretleri', weight: 10 }
  ],
  'Matematik': [
    { name: 'Çarpanlar ve Katlar', weight: 10 },
    { name: 'Üslü İfadeler', weight: 15 },
    { name: 'Kareköklü İfadeler', weight: 20 },
    { name: 'Veri Analizi', weight: 5 },
    { name: 'Olasılık', weight: 5 },
    { name: 'Cebirsel İfadeler', weight: 15 },
    { name: 'Doğrusal Denklemler', weight: 15 },
    { name: 'Eşitsizlikler', weight: 15 }
  ],
  'Fen Bilimleri': [
    { name: 'Mevsimler ve İklim', weight: 10 },
    { name: 'DNA ve Genetik Kod', weight: 20 },
    { name: 'Basınç', weight: 15 },
    { name: 'Madde ve Endüstri', weight: 25 },
    { name: 'Basit Makineler', weight: 15 },
    { name: 'Enerji Dönüşümleri', weight: 15 }
  ],
  'İnkılap Tarihi': [
    { name: 'Bir Kahraman Doğuyor', weight: 20 },
    { name: 'Milli Uyanış', weight: 40 },
    { name: 'Ya İstiklal Ya Ölüm', weight: 40 }
  ],
  'Din Kültürü': [
    { name: 'Kader İnancı', weight: 35 },
    { name: 'Zekat ve Sadaka', weight: 35 },
    { name: 'Din ve Hayat', weight: 30 }
  ],
  'İngilizce': [
    { name: 'Friendship', weight: 30 },
    { name: 'Teen Life', weight: 35 },
    { name: 'In The Kitchen', weight: 35 }
  ]
};

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
  const [selectedTrendSubject, setSelectedTrendSubject] = useState<string>('Türkçe');
  
  useEffect(() => {
    const saved = localStorage.getItem('exam_history');
    if (saved) {
      setHistory(JSON.parse(saved).sort((a: any, b: any) => b.date - a.date));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="p-20 text-center space-y-6 bg-white/50 dark:bg-slate-900/50 rounded-[4rem] border border-dashed border-slate-300 dark:border-slate-700 max-w-5xl mx-auto">
        <div className="text-6xl grayscale">📉</div>
        <h3 className="text-3xl font-black uppercase dark:text-white">Henüz Bir Veri Yok</h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Deneme verilerini girdikçe gelişimini burada göreceksin.</p>
      </div>
    );
  }

  const latest = history[0];
  const earliest = history[history.length - 1];
  const previous = history.length > 1 ? history[1] : null;
  const improvement = previous ? latest.totalNet - previous.totalNet : 0;
  const totalGrowth = latest.totalNet - earliest.totalNet;

  const subjectTrendData = history.slice().reverse().map(entry => {
    const subj = entry.subjects.find(s => s.name === selectedTrendSubject);
    return {
      date: new Date(entry.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }),
      net: subj ? subj.net : 0
    };
  });

  const availableSubjects = Object.keys(LGS_TOPICS_DETAIL);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto pb-32">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Güncel Net</p>
          <div className="flex items-end gap-3">
             <span className="text-4xl font-black text-blue-600 tabular-nums">{latest.totalNet.toFixed(2)}</span>
             {improvement !== 0 && (
               <span className={`text-xs font-black mb-1 ${improvement > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement).toFixed(2)}
               </span>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Toplam Gelişim</p>
          <div className="flex items-end gap-3">
             <span className={`text-4xl font-black tabular-nums ${totalGrowth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
               {totalGrowth > 0 ? '+' : ''}{totalGrowth.toFixed(2)}
             </span>
             <span className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter">İLK GÜNDEN BERİ</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Deneme Sayısı</p>
          <span className="text-4xl font-black dark:text-white tabular-nums">{history.length}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Süreç Verimliliği</p>
          <span className="text-4xl font-black text-indigo-600 tabular-nums">%{Math.min(100, (history.length * 10)).toFixed(0)}</span>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/80 p-10 md:p-14 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 backdrop-blur-xl relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><TrendingUpIcon /></div>
             <div>
               <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Ders Gelişim Trendi</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Seçili Dersin Zaman İçindeki Net Grafiği</p>
             </div>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl overflow-x-auto hide-scrollbar border border-slate-200 dark:border-slate-700 shadow-inner max-w-full">
            {availableSubjects.map(subj => (
              <button 
                key={subj} 
                onClick={() => setSelectedTrendSubject(subj)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap ${selectedTrendSubject === subj ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[300px] flex items-end justify-between gap-4 px-4 border-b border-slate-100 dark:border-slate-800 pb-10">
          {subjectTrendData.map((data, idx) => {
            const maxVal = selectedTrendSubject === 'Türkçe' || selectedTrendSubject === 'Matematik' || selectedTrendSubject === 'Fen Bilimleri' ? 20 : 10;
            const heightPerc = (data.net / maxVal) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-4 group relative">
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap z-20">
                  {data.net.toFixed(2)} NET
                </div>
                <div 
                  className={`w-full rounded-t-2xl transition-all duration-700 shadow-lg ${heightPerc > 75 ? 'bg-emerald-500 shadow-emerald-500/20' : (heightPerc < 40 ? 'bg-rose-500 shadow-rose-500/20' : 'bg-blue-600 shadow-blue-500/20')}`}
                  style={{ height: `${Math.max(5, heightPerc)}%` }}
                ></div>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter text-center leading-none">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-12">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Deneme Arşivi</h3>
          <button 
            onClick={() => { if(confirm('Tüm geçmişi silmek istediğine emin misin?')) { localStorage.removeItem('exam_history'); setHistory([]); } }}
            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
          >
            Geçmişi Temizle
          </button>
        </div>
        
        <div className="space-y-6">
          {history.map((entry) => (
            <div key={entry.id} className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600/10 dark:bg-blue-600/20 rounded-2xl flex flex-col items-center justify-center border border-blue-600/20">
                  <span className="text-[10px] font-black text-blue-600 uppercase leading-none">{new Date(entry.date).toLocaleString('tr-TR', { month: 'short' })}</span>
                  <span className="text-2xl font-black dark:text-white leading-none mt-1">{new Date(entry.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="font-black text-xl dark:text-white uppercase tracking-tighter">{entry.examType} Akademik Değerlendirme</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {new Date(entry.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Toplam Net</p>
                  <p className="text-3xl font-black text-blue-600 tabular-nums">{entry.totalNet.toFixed(2)}</p>
                </div>
                <div className="hidden lg:flex flex-wrap gap-2 max-w-[250px] justify-end">
                   {entry.subjects.map(s => (
                     <div key={s.name} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${s.net > (s.name === 'Matematik' ? 12 : 7) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
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

    // OWL CORE v5 DERİN ANALİZ FORMATI
    let prompt = `Kukul AI Koç, lütfen aşağıdaki ${examType} deneme verilerimi ve (varsa) ekteki dosyayı kullanarak OWL CORE v5 derin analiz raporunu oluştur.\n\n`;
    
    // Veri Setini AI'ya Aktarma
    prompt += `[NET VERİLERİ]:\n` + subjects.map(s => `- ${s.name}: ${s.correct} Doğru, ${s.incorrect} Yanlış, Net: ${s.net}`).join('\n');
    prompt += `\n[TOPLAM NET]: ${totalNet.toFixed(2)}\n\n`;
    
    // Derin Analiz Tetikleyicisi
    prompt += `[ANALİZ TALEBİ]:\n`;
    prompt += `1. Raporu profesyonel bir koç diliyle, öğrenciyi sorgulayarak oluştur.\n`;
    prompt += `2. PDF müfredatındaki eksiksiz konu isimlerini kullan.\n`;
    prompt += `3. En kritik 2 konu için öğrenciye 3'er adet yeni nesil antrenman sorusu üret.`;

    onAnalyze(prompt, fileData ? { mimeType: fileData.mimeType, data: fileData.data } : undefined);
  };

  const getDetailedAnalysis = (subjectName: string, net: number) => {
    const maxQuestions = (subjectName === 'Türkçe' || subjectName === 'Matematik' || subjectName === 'Fen Bilimleri') ? 20 : 10;
    const ratio = (net / maxQuestions) * 100;

    const data: any = {
      'Türkçe': {
        status: ratio > 75 ? 'Mükemmel' : ratio > 40 ? 'Geliştirilmeli' : 'Kritik Seviye',
        strategy: 'Her gün 20 paragraf sorusuyla odaklanma süreni artır. Fiilimsiler ve cümlenin ögeleri konularını tekrar et.',
        growth: 'Anlam bilgisi sorularındaki hızını %15 artırabilirsen, sayısal bölüme daha taze bir zihinle geçebilirsin.',
        coachMsg: 'Harikasın! Türkçede kurduğun hakimiyet, diğer tüm derslerin anahtarıdır. Okuma hızın senin süper gücün olacak.'
      },
      'Matematik': {
        status: ratio > 70 ? 'Üst Düzey' : ratio > 35 ? 'Dikkat Gerektiriyor' : 'Yoğun Çalışma Şart',
        strategy: 'Yeni nesil soruların kurgusunu anlamak için önce modelleme yap. Kareköklü sayılarda pratikliğini artır.',
        growth: 'İşlem hatalarını minimize ederek netlerini 4-5 puan yukarı çekebilirsin. Geometrik cisimlerde görselleştirmeye odaklan.',
        coachMsg: 'Matematik bir maratondur, her yanlış bir adımdır. Mantığını kavradığın her soru seni zirveye bir adım daha yaklaştırır.'
      },
      'Fen Bilimleri': {
        status: ratio > 75 ? 'Bilim İnsanı Adayı' : ratio > 45 ? 'İyi Yolda' : 'Konu Eksiği Mevcut',
        strategy: 'Basınç ve DNA ünitelerindeki deney düzeneklerini kendin çizerek çalış. Madde ve endüstride periyodik tabloyu adın gibi bil.',
        growth: 'Analitik düşünme becerin Fen testinde sana fark yaratacak. Basit makinelerde kuvvet kazancı mantığını oturt.',
        coachMsg: 'Merakın senin en büyük rehberin. Bilimin ışığında attığın her adım, deneme sonuçlarında parlamaya devam edecek!'
      },
      'İnkılap Tarihi': {
        status: ratio > 80 ? 'Stratejist' : ratio > 50 ? 'Ortalama' : 'Okuma Eksikliği',
        strategy: 'Olaylar arasındaki neden-sonuç ilişkisini kronolojik tablo üzerinden takip et. Kavramlara hakim ol.',
        growth: 'Atatürkçülük ve Çağdaşlaşan Türkiye ünitesinde yorum gücünü kullanarak full çekebilirsin.',
        coachMsg: 'Tarih, geleceği yazanların dersidir. Geçmişin derslerini bugünün başarısına dönüştürmek senin elinde.'
      },
      'Din Kültürü': {
        status: ratio > 85 ? 'Huzurlu Başarı' : ratio > 60 ? 'Yeterli' : 'Kavram Karmaşası',
        strategy: 'Ayet ve hadis yorumlama sorularında anahtar kelimelere odaklan. Zekat ve sadaka oranlarını tekrar et.',
        growth: 'Kader ve kaza ünitesindeki ince farkları öğrenerek bu dersten tam puan alabilirsin.',
        coachMsg: 'Değerlerine verdiğin önem, karakterinle beraber netlerine de yansıyor. Samimiyetin başarıyı getirecektir.'
      },
      'İngilizce': {
        status: ratio > 80 ? 'Global Öğrenci' : ratio > 40 ? 'Kelime Eksiği' : 'Başlangıç Seviyesi',
        strategy: 'Her gün yeni öğrendiğin 10 kelimeyle cümle kur. Diyalog tamamlama sorularında soru köküne dikkat et.',
        growth: 'Friendship ve Teen Life ünitelerindeki kalıpları ezberleyerek süreni kısaltabilirsin.',
        coachMsg: 'Dünya senin dilinde konuşmaya başlayacak! Kelimelerin gücüyle sınırlarını her gün biraz daha genişletiyorsun.'
      }
    };

    return data[subjectName] || { 
      status: 'Analiz Ediliyor', 
      strategy: 'Düzenli tekrar ve deneme çözümü.', 
      growth: 'Genel gelişim potansiyeli yüksek.', 
      coachMsg: 'Başarı yolunda emin adımlarla ilerliyorsun!' 
    };
  };

  const [selectedTopicSubject, setSelectedTopicSubject] = useState<string>('Türkçe');

  return (
    <div className="min-h-[600px] animate-in fade-in duration-500 overflow-y-auto pb-20">
      {activeTab === 'input' && (
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 dark:bg-slate-900/80 rounded-[3.5rem] p-10 border border-slate-200/50 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><CalculatorIcon /></div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Performans Kaydı</h4>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Karne Tara veya Manuel Veri Gir</p>
                    </div>
                  </div>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                    <button onClick={() => setExamType('LGS')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${examType === 'LGS' ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}>LGS</button>
                    <button onClick={() => setExamType('TYT')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${examType === 'TYT' ? 'bg-rose-600 shadow-lg text-white' : 'text-slate-400 hover:text-slate-600'}`}>TYT / YKS</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/80">
                      <tr>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Doğru</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Yanlış</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Net</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {subjects.map((s, i) => (
                        <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-6 font-black text-slate-700 dark:text-slate-300 text-lg">{s.name}</td>
                          <td className="px-6 py-6 text-center">
                            <input type="number" className="w-20 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-4 ring-blue-500/10 transition-all text-blue-600" value={s.correct || ''} onChange={(e) => handleUpdate(i, 'correct', e.target.value)} placeholder="0" />
                          </td>
                          <td className="px-6 py-6 text-center">
                            <input type="number" className="w-20 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center font-black outline-none focus:ring-4 ring-rose-500/10 transition-all text-rose-500" value={s.incorrect || ''} onChange={(e) => handleUpdate(i, 'incorrect', e.target.value)} placeholder="0" />
                          </td>
                          <td className="px-6 py-6 font-black text-right text-2xl text-slate-900 dark:text-white tabular-nums">{s.net.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
          <div className="space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-[4rem] p-12 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] border border-white/10 active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform"></div>
              <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner group-hover:rotate-6 transition-transform border border-white/10 group-hover:bg-blue-600 transition-colors duration-500">
                {fileData ? <ScanIcon /> : <FileUpIcon />}
              </div>
              <div className="space-y-2 relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tighter leading-tight">Karne Analizi</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-8 leading-relaxed">PDF veya Görsel Yükle, Konu Bazlı Eksiklerini Keşfet.</p>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
              <div className={`px-10 py-5 ${fileData ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-white/10 hover:bg-white/20'} text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all`}>
                {fileData ? fileData.name : 'BELGE YÜKLE'}
              </div>
            </div>
            
            <div className="p-10 bg-white/90 dark:bg-slate-900/80 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-md">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Güncel Net Ortalaması</p>
               <p className="text-7xl font-black text-blue-600 tracking-tighter tabular-nums">{totalNet.toFixed(2)}</p>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-4 italic">HESAPLANAN TOPLAM</p>
            </div>
            
            <button 
              onClick={triggerAnalysis} 
              disabled={isLoading || (totalNet === 0 && !fileData)} 
              className="w-full py-8 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {isLoading ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <>🦉 ANALİZİ BAŞLAT</>}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'koc' && children}

      {activeTab === 'performance' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700 pb-20 max-w-7xl mx-auto">
          <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-32 h-32 bg-white/20 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border border-white/20">🦉</div>
                <div className="flex-1 text-center md:text-left space-y-4">
                   <h3 className="text-4xl font-black uppercase tracking-tighter">Derinlemesine Ders Analizi</h3>
                   <p className="text-blue-100 text-lg font-medium max-w-2xl leading-relaxed italic">"Netlerin sadece bir sayı değil, gelişim yolculuğunun kilometre taşlarıdır. Senin için hazırladığım bu özel analizi dikkatle incele!"</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subjects.map((s) => {
              const analysis = getDetailedAnalysis(s.name, s.net);
              const isLow = s.net < (s.name === 'Türkçe' || s.name === 'Matematik' || s.name === 'Fen Bilimleri' ? 8 : 4);
              const isHigh = s.net > (s.name === 'Türkçe' || s.name === 'Matematik' || s.name === 'Fen Bilimleri' ? 16 : 8);

              return (
                <div key={s.name} className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border-t-8 border-t-blue-600" style={{ borderTopColor: isLow ? '#f43f5e' : (isHigh ? '#10b981' : '#2563eb') }}>
                   <div className="p-10 space-y-8">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="text-3xl font-black uppercase tracking-tighter dark:text-white">{s.name}</h4>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Ders Bazlı Check-up</p>
                         </div>
                         <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg ${isLow ? 'bg-rose-500 text-white' : (isHigh ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white')}`}>
                            {analysis.status}
                         </div>
                      </div>

                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 italic relative">
                         <div className="absolute -top-3 left-6 px-3 bg-blue-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest py-1 flex items-center gap-2">
                            <SparklesIcon /> AI Koç Notu
                         </div>
                         <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">"{analysis.coachMsg}"</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                         <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase text-blue-600 tracking-[0.2em]">🎯 Çalışma Stratejisi</p>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-bold leading-relaxed">{analysis.strategy}</p>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase text-emerald-600 tracking-[0.2em]">🚀 Gelişim Alanları</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">{analysis.growth}</p>
                         </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                         <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(step => (
                               <div key={step} className={`w-8 h-2 rounded-full ${step <= (s.net / (s.name === 'Türkçe' || s.name === 'Matematik' || s.name === 'Fen Bilimleri' ? 20 : 10) * 5) ? 'bg-blue-600' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                            ))}
                         </div>
                         <div className="text-right">
                            <span className="text-3xl font-black text-blue-600 tabular-nums">{s.net.toFixed(2)}</span>
                            <span className="text-[10px] font-black text-slate-400 ml-1 uppercase">NET</span>
                         </div>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
         <div className="bg-white/80 dark:bg-slate-900/80 p-8 md:p-20 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-12 backdrop-blur-xl animate-in fade-in duration-700 mb-20 max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
             <div className="space-y-2 text-center md:text-left">
               <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">Konu Analizi</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Müfredat Ustalık Seviyeleri ve Kazanım Takibi</p>
             </div>
             <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto hide-scrollbar max-w-full shadow-inner">
                {Object.keys(LGS_TOPICS_DETAIL).map(subj => (
                  <button 
                    key={subj} 
                    onClick={() => setSelectedTopicSubject(subj)} 
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${selectedTopicSubject === subj ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {subj}
                  </button>
                ))}
             </div>
           </div>
           
           <div className="space-y-8">
              {(LGS_TOPICS_DETAIL as any)[selectedTopicSubject].map((topic: any, idx: number) => {
                const subjectNet = subjects.find(s => s.name === selectedTopicSubject)?.net || 0;
                const maxNet = selectedTopicSubject === 'Türkçe' || selectedTopicSubject === 'Matematik' || selectedTopicSubject === 'Fen Bilimleri' ? 20 : 10;
                const baseMastery = Math.min((subjectNet / maxNet) * 100, 100);
                const mastery = Math.max(0, Math.min(100, baseMastery + (Math.random() * 20 - 10)));
                
                return (
                  <div key={idx} className="p-8 bg-white dark:bg-slate-800/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex justify-between items-end mb-4">
                        <h5 className="font-black text-2xl dark:text-white uppercase tracking-tight">{topic.name}</h5>
                        <div className="flex flex-col items-end">
                          <span className={`text-[11px] font-black px-4 py-1.5 rounded-full ${mastery < 40 ? 'bg-rose-500 text-white' : (mastery > 75 ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white')} shadow-lg`}>
                            %{mastery.toFixed(0)} USTALIK
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-4 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out shadow-lg ${mastery < 40 ? 'bg-rose-500' : (mastery > 75 ? 'bg-emerald-500' : 'bg-blue-600')}`} 
                          style={{ width: `${mastery}%` }} 
                        />
                      </div>
                    </div>
                    <div className="shrink-0 text-center w-28 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Sınav Ağırlığı</p>
                       <p className="text-3xl font-black text-slate-800 dark:text-white">%{topic.weight}</p>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
      )}
      
      {(activeTab === 'strategy') && (
        <div className="bg-white/80 dark:bg-slate-900/80 p-16 md:p-24 rounded-[5rem] border border-slate-200/50 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto animate-in fade-in duration-700 mb-20">
          <div className="text-center space-y-6 mb-20">
             <h3 className="text-7xl font-black uppercase tracking-tighter dark:text-white leading-none">Stratejik Plan</h3>
             <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[12px] max-w-xl mx-auto">Zirveye Giden Yolda 4 Temel Kazanım</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {[
              { topic: 'Bütüncül Okuma Disiplini', impact: 10, reason: 'Okuduğunu saniyeler içinde anlayan öğrenci, Fen ve Matematik kurgularında asla hata yapmaz.' },
              { topic: 'Sayısal Modelleme Yetisi', impact: 9, reason: 'Formül ezberlemek yerine sayıların mantığını kavramak, yeni nesil soruların tek anahtarıdır.' },
              { topic: 'Bilimsel Gözlem ve Analiz', impact: 9, reason: 'Laboratuvar düzeneklerini zihninde kurabilen öğrenci, Fen testinde %100 başarıya ulaşır.' },
              { topic: 'Hata Defteri Kültürü', impact: 8, reason: 'En büyük öğretmen yaptığın yanlışlardır. Her hatayı bir kazanıma dönüştür ve eksikleri kapat.' }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-slate-50 dark:bg-slate-800 rounded-[3.5rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-xl group">
                <div className="flex justify-between mb-6">
                  <span className="text-[10px] font-black bg-blue-600 text-white px-5 py-2 rounded-full italic uppercase tracking-widest shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">ETKİ: {item.impact}/10</span>
                </div>
                <h4 className="font-black text-3xl mb-6 uppercase tracking-tighter dark:text-white leading-tight">{item.topic}</h4>
                <p className="text-base text-slate-500 dark:text-slate-400 italic font-medium leading-relaxed">"{item.reason}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
