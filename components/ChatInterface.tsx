
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    setMessages([]);
    setStreamingText('');
  }, [tool]);

  useEffect(() => {
    if (externalPrompt) {
      handleAISend(externalPrompt);
      if (onPromptProcessed) onPromptProcessed();
    }
  }, [externalPrompt]);

  const handleAISend = async (prompt: string | ChatMessage) => {
    const isObject = typeof prompt !== 'string';
    const promptText = isObject ? prompt.parts.find(p => p.text)?.text || '' : prompt;
    
    if (!promptText.trim() && !isObject) return;
    if (isLoading) return;

    const userMsg: ChatMessage = isObject ? prompt : {
      role: 'user',
      parts: [{ text: promptText }],
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
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
    <div className={`flex flex-col relative overflow-hidden bg-[#f1f5f9]/40 dark:bg-slate-900/40 backdrop-blur-xl ${isFullPage ? 'h-[750px]' : 'h-[500px] lg:h-[600px]'}`}>
      <header className="px-10 py-5 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between shrink-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">🦉</div>
           <div>
              <h4 className="text-[11px] font-black uppercase text-slate-800 dark:text-white tracking-[0.2em] leading-none">Kukul AI Koç</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sana Özel Akademik Analiz Aktif</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Çevrimiçi</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 hide-scrollbar scroll-smooth">
        {messages.length === 0 && !streamingText && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 space-y-6">
            <span className="text-6xl grayscale">🦉</span>
            <div className="space-y-2 text-center">
               <p className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Henüz bir analiz başlatmadın.</p>
               <p className="text-[10px] font-bold text-slate-400">Veri Girişi sekmesinden verilerini girerek Kukul AI Koç ile tanışabilirsin.</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] rounded-[2.5rem] px-8 py-5 shadow-sm ${
              msg.role === 'user' 
              ? 'bg-slate-900 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none'
            }`}>
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'} prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi}>
                    {part.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>}
                    {part.inlineData && (
                      <div className="mt-4 p-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-blue-500/20">
                        <span className="text-lg">📎</span> KARNE ANALİZ VERİSİ BAŞARIYLA ENTEGRE EDİLDİ
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-[2.5rem] px-8 py-5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none shadow-xl backdrop-blur-md">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamingText}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-8 shrink-0 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-900/20">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAISend(input); }} 
          className="relative group max-w-4xl mx-auto"
        >
          <input
            type="text"
            placeholder="Kukul AI Koç'a bir şey sor..."
            className="w-full pl-8 pr-16 py-5 bg-white/80 dark:bg-slate-800/80 border-2 border-slate-100 dark:border-slate-700 focus:border-blue-500 outline-none rounded-3xl transition-all font-semibold text-sm shadow-inner backdrop-blur-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-2.5 w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
          >
            {isLoading ? <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div> : 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" /></svg>
            }
          </button>
        </form>
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-center text-slate-400 mt-4 opacity-50">OWL CORE ENGINE v4.1 - AI TUTORING SYSTEM</p>
      </div>
    </div>
  );
};

export default ChatInterface;
