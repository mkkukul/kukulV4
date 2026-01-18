
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExamSubject } from '../types';

// 1. AnalysisStudio (Deneme Analizi - Gelişmiş Net Hesaplama)
export const AnalysisStudio: React.FC<{ onAnalyze: (data: string) => void, isLoading: boolean }> = ({ onAnalyze, isLoading }) => {
  const [examType, setExamType] = useState<'LGS' | 'TYT'>('LGS');
  
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
    
    // Net Hesaplama: LGS'de 3 yanlış 1 doğruyu, TYT'de 4 yanlış 1 doğruyu götürür.
    const divider = examType === 'LGS' ? 3 : 4;
    const net = newSubjects[index].correct - (newSubjects[index].incorrect / divider);
    newSubjects[index].net = Math.max(0, parseFloat(net.toFixed(2)));
    
    setSubjects(newSubjects);
  };

  const totalNet = subjects.reduce((acc, curr) => acc + curr.net, 0);

  const triggerAnalysis = () => {
    const dataString = `Sınav Türü: ${examType}\n` + 
      subjects.map(s => `- ${s.name}: Doğru: ${s.correct}, Yanlış: ${s.incorrect}, Net: ${s.net}`).join('\n') +
      `\nToplam Net: ${totalNet.toFixed(2)}`;
    
    onAnalyze(`Aşağıdaki deneme netlerimi analiz et:\n${dataString}\n\nLütfen bu verilere göre zayıf noktalarımı belirle ve bana ders bazlı bir gelişim stratejisi sun.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 lg:p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Analysis Studio</h3>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1 opacity-70">Veriyle Başarıyı Hedefle</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner">
          {['LGS', 'TYT'].map(t => (
            <button 
              key={t}
              onClick={() => { setExamType(t as any); setSubjects(initialSubjects(t as any)); }}
              className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${examType === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ders</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Doğru</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Yanlış</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Net</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {subjects.map((s, i) => (
              <tr key={s.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-8 py-5 font-bold text-slate-700 dark:text-slate-300">{s.name}</td>
                <td className="px-8 py-5 text-center">
                  <input 
                    type="number" 
                    min="0"
                    className="w-16 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none p-1 font-black text-center text-lg dark:text-white transition-all"
                    value={s.correct || ''}
                    placeholder="0"
                    onChange={(e) => handleUpdate(i, 'correct', parseInt(e.target.value))}
                  />
                </td>
                <td className="px-8 py-5 text-center">
                  <input 
                    type="number" 
                    min="0"
                    className="w-16 bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-red-500 outline-none p-1 font-black text-center text-lg dark:text-white transition-all"
                    value={s.incorrect || ''}
                    placeholder="0"
                    onChange={(e) => handleUpdate(i, 'incorrect', parseInt(e.target.value))}
                  />
                </td>
                <td className="px-8 py-5 font-black text-blue-600 dark:text-blue-400 text-xl text-center">{s.net}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-600/5 dark:bg-blue-600/10 border-t-2 border-blue-600/20">
              <td colSpan={3} className="px-8 py-6 font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Toplam Genel Net</td>
              <td className="px-8 py-6 font-black text-blue-700 dark:text-blue-300 text-4xl text-center tabular-nums">{totalNet.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button 
        onClick={triggerAnalysis}
        disabled={isLoading || totalNet === 0}
        className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.98] text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-500/30 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
      >
        <span className="flex items-center justify-center gap-3">
          {isLoading ? (
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : '🚀'}
          <span>Stratejik Raporu Üret</span>
        </span>
      </button>
    </div>
  );
};

// 2. VisualStudio (Hayal Atölyesi - Gemini Image API)
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
      const fullPrompt = `Sanat Tarzı: ${style}. Konu: ${prompt}. Profesyonel eğitim illüstrasyonu, 4K çözünürlük, canlı renkler.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
        config: { imageConfig: { aspectRatio: aspect } }
      });
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImage(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (err) {
      alert("Görsel oluşturma hatası: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl grid lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Visual Studio</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Hayalindeki Materyali Tasarla</p>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Görsel Betimleme</label>
          <textarea 
            className="w-full h-44 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl outline-none focus:ring-4 ring-blue-500/10 border border-slate-100 dark:border-slate-700 font-medium resize-none text-slate-800 dark:text-slate-200"
            placeholder="Örn: Newton'un hareket yasalarını anlatan eğlenceli ve renkli bir şema..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Stil</label>
            <select 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-sm border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {['Dijital Sanat', '3D Render', 'Yağlı Boya', 'Karakalem', 'Minimalist', 'Anime'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Boyut</label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl gap-1">
              {['1:1', '16:9', '9:16'].map(a => (
                <button 
                  key={a} 
                  onClick={() => setAspect(a as any)} 
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${aspect === a ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600' : 'text-slate-400'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button 
          onClick={generateImage}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? '🎨 Tasarlanıyor...' : '✨ Görseli Yarat'}
        </button>
      </div>

      <div className="aspect-square bg-slate-100 dark:bg-slate-800/30 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden relative group">
        {image ? (
          <>
            <img src={image} alt="Generated" className="w-full h-full object-cover animate-in fade-in zoom-in" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href={image} download="kukul-studio.png" className="px-8 py-4 bg-white rounded-2xl text-slate-900 font-black text-sm hover:scale-110 transition-transform shadow-2xl">📥 Cihaza Kaydet</a>
            </div>
          </>
        ) : (
          <div className="text-center p-8 space-y-6 opacity-30">
            <span className="text-8xl">🖼️</span>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Hayal Gücünü Ekranına Yansıt</p>
          </div>
        )}
        {isLoading && <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-center"><div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}
      </div>
    </div>
  );
};

// 3. RaftPanel (RAFT Tasarımcısı)
export const RaftPanel: React.FC<{ onGenerate: (data: string) => void }> = ({ onGenerate }) => {
  const [data, setData] = useState({ role: '', audience: '', format: '', topic: '' });

  return (
    <div className="bg-white dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-purple-600 rounded-[1.5rem] flex items-center justify-center text-white text-4xl shadow-2xl rotate-3">⛵</div>
        <div>
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">RAFT Strateji Masası</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Otantik Yazma Görevi Tasarımı</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { id: 'role', label: '👤 ROL', placeholder: 'Kim olarak yazacak?' },
          { id: 'audience', label: '👥 KİTLE', placeholder: 'Kime hitap ediyor?' },
          { id: 'format', label: '📄 FORMAT', placeholder: 'Yazı türü nedir?' },
          { id: 'topic', label: '🎯 KONU', placeholder: 'Ana tema ne?' }
        ].map(f => (
          <div key={f.id} className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">{f.label}</label>
            <input 
              type="text"
              className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-purple-500/10 border border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200"
              placeholder={f.placeholder}
              value={(data as any)[f.id]}
              onChange={(e) => setData({ ...data, [f.id]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={() => onGenerate(`Aşağıdaki RAFT parametrelerini kullanarak yaratıcı bir yazma senaryosu oluştur:\nRol: ${data.role}\nKitle: ${data.audience}\nFormat: ${data.format}\nKonu: ${data.topic}\n\nLütfen bu senaryoyu pedagojik kazanımlarla birleştirerek etkileyici bir görev tasarla.`)}
        className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-purple-500/30 transition-all active:scale-[0.98]"
      >
        ✨ Senaryoyu Kaleme Al
      </button>
    </div>
  );
};

// 4. StepperPanel (4MAT / Pedagojik Modeller)
export const StepperPanel: React.FC<{ onStepClick: (step: string) => void }> = ({ onStepClick }) => {
  const steps = [
    { id: 1, title: 'Bağlantı Kur', desc: 'Deneyimle ilişkilendirme', color: 'bg-rose-500' },
    { id: 2, title: 'İnceleme Yap', desc: 'Analiz ve anlama', color: 'bg-orange-500' },
    { id: 3, title: 'İmgeleme', desc: 'Görselleştirme', color: 'bg-amber-500' },
    { id: 4, title: 'Bilgilendirme', desc: 'Teorik sunum', color: 'bg-emerald-500' },
    { id: 5, title: 'Uygulama', desc: 'Pratik yapma', color: 'bg-blue-500' },
    { id: 6, title: 'Genişletme', desc: 'Özgünlük ekleme', color: 'bg-indigo-500' },
    { id: 7, title: 'İyileştirme', desc: 'Değerlendirme', color: 'bg-violet-500' },
    { id: 8, title: 'Paylaşma', desc: 'Geri bildirim', color: 'bg-fuchsia-500' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white text-4xl shadow-2xl">🔄</div>
        <div>
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">4MAT Planlayıcı</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Döngüsel Ders Tasarımı</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map(step => (
          <button 
            key={step.id}
            onClick={() => onStepClick(`4MAT Modelinin '${step.title}' (Adım ${step.id}) aşaması için yaratıcı ders içeriği önerileri sunar mısın? Açıklama: ${step.desc}`)}
            className="group p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-left hover:border-blue-500 transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95"
          >
            <div className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center text-white font-black text-xs mb-4 group-hover:scale-110 transition-transform shadow-lg`}>{step.id}</div>
            <h4 className="font-black dark:text-white text-sm mb-2 uppercase tracking-tighter leading-tight">{step.title}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80">{step.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// 5. KWHLAQ Pano Modülü
export const KWHLAQPanel: React.FC = () => {
  const columns = [
    { id: 'k', title: 'Know (Biliyorum)', color: 'bg-blue-500' },
    { id: 'w', title: 'Want (Merak)', color: 'bg-purple-500' },
    { id: 'h', title: 'How (Nasıl?)', color: 'bg-indigo-500' },
    { id: 'l', title: 'Learned (Ne?)', color: 'bg-emerald-500' },
    { id: 'a', title: 'Action (Aksiyon)', color: 'bg-amber-500' },
    { id: 'q', title: 'Questions (Sorular)', color: 'bg-rose-500' }
  ];

  const [items, setItems] = useState<Record<string, string[]>>({
    k: [], w: [], h: [], l: [], a: [], q: []
  });
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const addItem = (id: string) => {
    if (!inputValue.trim()) return;
    setItems({ ...items, [id]: [...items[id], inputValue] });
    setInputValue('');
    setActiveInput(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white text-4xl shadow-2xl -rotate-2">📋</div>
          <div>
            <h3 className="text-3xl font-black dark:text-white tracking-tighter uppercase leading-none">KWHLAQ Pano Modülü</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Sorgulamaya Dayalı Öğrenme Süreci</p>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl border border-slate-700"
        >
          📄 PDF / Çıktı Al
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-x-auto pb-6 hide-scrollbar">
        {columns.map(col => (
          <div key={col.id} className="min-w-[200px] flex flex-col bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-4 ${col.color} text-white font-black text-xs uppercase tracking-widest text-center shadow-md`}>
              {col.title}
            </div>
            <div className="flex-1 p-5 space-y-4 min-h-[300px]">
              {items[col.id].map((item, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-xs font-bold shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 dark:text-slate-200">
                  {item}
                </div>
              ))}
              
              {activeInput === col.id ? (
                <div className="space-y-3 animate-in fade-in zoom-in duration-200">
                  <textarea 
                    autoFocus
                    className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-2xl text-xs font-bold outline-none resize-none shadow-lg dark:text-white"
                    rows={4}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => addItem(col.id)} className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-lg shadow-blue-500/20 active:scale-95 transition-all">EKLE</button>
                    <button onClick={() => setActiveInput(null)} className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl text-[10px] font-black text-slate-500 active:scale-95 transition-all">İPTAL</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setActiveInput(col.id)}
                  className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-lg">+</span> NOT EKLE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
