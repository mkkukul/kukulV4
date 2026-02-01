
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, Tool } from '../types';
import { aiService } from '../services/aiService';

interface ChatInterfaceProps {
  tool: Tool;
  theme: 'light' | 'dark';
  externalPrompt?: ChatMessage | null;
  onPromptProcessed?: () => void;
  isFullPage?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  tool, 
  theme, 
  externalPrompt, 
  onPromptProcessed,
  isFullPage = false
}) => {
  // Local storage management
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`chat_history_${tool.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ mimeType: string; data: string; name: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem(`chat_history_${tool.id}`, JSON.stringify(messages));
  }, [messages, streamingText, tool.id]);

  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${tool.id}`);
    setMessages(saved ? JSON.parse(saved) : []);
    setStreamingText('');
  }, [tool.id]);

  useEffect(() => {
    if (externalPrompt) {
      handleAISend(externalPrompt);
      if (onPromptProcessed) onPromptProcessed();
    }
  }, [externalPrompt]);

  const clearHistory = () => {
    if (confirm('Bu sohbet geçmişini temizlemek istediğine emin misin?')) {
      setMessages([]);
      localStorage.removeItem(`chat_history_${tool.id}`);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await aiService.processFile(file);
        setAttachedFile({ ...processed, name: file.name });
      } catch (err) {
        alert("Dosya işlenirken bir hata oluştu.");
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAISend = async (prompt: string | ChatMessage) => {
    const isObject = typeof prompt !== 'string';
    const promptText = isObject ? prompt.parts.find(p => p.text)?.text || '' : prompt;
    
    if (!promptText.trim() && !isObject && !attachedFile) return;
    if (isLoading) return;

    let userMsg: ChatMessage;

    if (isObject) {
      userMsg = prompt;
    } else {
      const parts: any[] = [{ text: promptText || (attachedFile ? "Bu belgeyi/görseli analiz et." : "") }];
      if (attachedFile) {
        parts.push({ 
          inlineData: { 
            mimeType: attachedFile.mimeType, 
            data: attachedFile.data 
          } 
        });
      }
      userMsg = {
        role: 'user',
        parts,
        timestamp: Date.now(),
      };
    }

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);

    let fullResponse = '';
    try {
      await aiService.sendMessage(
        tool.id,
        updatedHistory,
        (chunk) => {
          fullResponse += chunk;
          setStreamingText(fullResponse);
        }
      );
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: fullResponse }],
        timestamp: Date.now(),
      }]);
    } catch (err) {
       setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: "Kukul AI Koç şu an biraz meşgul. Lütfen tekrar dene." }],
        timestamp: Date.now(),
      }]);
    } finally {
      setStreamingText('');
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-2xl ${isFullPage ? 'h-full min-h-[750px]' : 'h-[600px]'}`}>
      <header className="px-10 py-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between shrink-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl z-20 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-blue-500/20 ring-4 ring-blue-500/10">🦉</div>
           <div>
              <h4 className="text-[12px] font-black uppercase text-slate-800 dark:text-white tracking-[0.25em] leading-none">Kukul AI Koç</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Sana Özel Akademik Analiz Aktif
              </p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           {messages.length > 0 && (
             <button 
               onClick={clearHistory}
               className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-400 tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
               title="Sohbeti Sıfırla"
             >
               🧹 Arşivi Sil
             </button>
           )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-10 hide-scrollbar scroll-smooth relative">
        {messages.length === 0 && !streamingText && (
          <div className="h-full flex flex-col items-center justify-center opacity-60 space-y-8 animate-in fade-in duration-1000">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-6xl grayscale transition-all hover:grayscale-0 hover:scale-110 cursor-help">🦉</div>
            <div className="space-y-3 text-center max-w-sm">
               <p className="text-lg font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 leading-tight">Henüz bir analiz başlatılmadı.</p>
               <p className="text-xs font-medium text-slate-400 leading-relaxed">Veri girişi yapabilir, karneni yükleyebilir veya Kukul AI Koç'a akademik hedeflerini sorabilirsin.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">📊 LGS NET ANALİZİ</div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">📄 KARNE TARAMA</div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
            <div className={`max-w-[85%] lg:max-w-[75%] rounded-[2.5rem] px-8 py-6 shadow-xl ${
              msg.role === 'user' 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-tr-none border border-white/5' 
              : 'bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none backdrop-blur-sm'
            }`}>
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'} prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:leading-relaxed prose-strong:text-blue-500`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi}>
                    {part.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>}
                    {part.inlineData && (
                      <div className="mt-5 p-5 bg-blue-600/10 dark:bg-blue-600/20 rounded-[1.5rem] border border-blue-500/30 flex items-center gap-5 shadow-inner">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg">
                          {part.inlineData.mimeType.includes('image') ? '🖼️' : '📄'}
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Analiz Verisi Yüklendi</p>
                          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter mt-1">
                            {part.inlineData.mimeType.includes('image') ? 'Görsel Karakter Tanıma (OCR) Aktif' : 'PDF Veri Madenciliği Aktif'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[8px] font-black uppercase opacity-30 tracking-widest">
                {new Date(msg.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] lg:max-w-[75%] rounded-[2.5rem] px-8 py-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none shadow-2xl backdrop-blur-xl">
              <div className="prose prose-sm max-w-none dark:prose-invert prose-strong:text-blue-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamingText}</ReactMarkdown>
              </div>
              <div className="mt-4 flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-10" />
      </div>

      <div className="p-8 lg:p-12 shrink-0 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl z-20">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAISend(input); }} 
          className="relative group max-w-5xl mx-auto"
        >
          {attachedFile && (
            <div className="absolute -top-20 left-0 flex items-center gap-4 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 ring-4 ring-blue-500/20">
              <div className="text-xl">{attachedFile.mimeType.includes('image') ? '🖼️' : '📄'}</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Hazır Belge</span>
                <span className="text-xs font-bold truncate max-w-[200px] mt-1">{attachedFile.name}</span>
              </div>
              <button 
                type="button"
                onClick={() => setAttachedFile(null)}
                className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/40 transition-all hover:rotate-90"
              >
                ✕
              </button>
            </div>
          )}

          <div className="relative flex items-center gap-4">
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute left-3 top-2.5 w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-inner group/btn"
                title="Karne veya Belge Yükle"
              >
                <svg className="w-6 h-6 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              
              <input
                type="text"
                placeholder={attachedFile ? "Bu belge hakkında ne öğrenmek istersin?" : "Kukul AI Koç'a bir şey sor..."}
                className="w-full pl-18 pr-20 py-6 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-600 outline-none rounded-[2rem] transition-all font-bold text-sm shadow-2xl dark:text-white placeholder:text-slate-400 placeholder:font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,application/pdf" 
                onChange={handleFileSelect} 
              />

              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachedFile)}
                className="absolute right-3 top-2.5 w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-20 disabled:grayscale disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center gap-8 mt-6">
           <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-60">OWL CORE ENGINE v5.0 - STRATEGIC ANALYSIS ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
