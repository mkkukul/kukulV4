
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, Tool } from '../types';
import { aiService } from '../services/aiService';

interface ChatInterfaceProps {
  tool: Tool;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ tool, theme, toggleTheme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: string; data: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    setMessages([]);
    setStreamingText('');
    setAttachedFile(null);
  }, [tool]);

  const handleStreaming = async (updatedHistory: ChatMessage[]) => {
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
        parts: [{ text: "Bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin." }],
        timestamp: Date.now(),
      }]);
    } finally {
      setStreamingText('');
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const userParts: ChatMessage['parts'] = [];
    if (input.trim()) {
      userParts.push({ text: input });
    }
    if (attachedFile) {
      userParts.push({ inlineData: { mimeType: attachedFile.type, data: attachedFile.data } });
    }

    const userMsg: ChatMessage = {
      role: 'user',
      parts: userParts,
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);
    handleStreaming(updatedHistory);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processed = await aiService.processFile(file);
        setAttachedFile({
          name: file.name,
          type: file.type,
          data: processed.data
        });
      } catch (err) {
        alert("Dosya yüklenemedi.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent relative transition-colors duration-700">
      <header className="bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-indigo-100 dark:border-indigo-900 transition-all hover:scale-110">
            {tool.icon}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1">{tool.name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{tool.description}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-3 rounded-[1.25rem] bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-all border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
          ) : (
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-12 max-w-5xl mx-auto w-full hide-scrollbar">
        {messages.length === 0 && !streamingText && (
          <div className="py-24 text-center space-y-8 animate-fade-in">
            <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-[3rem] mx-auto flex items-center justify-center text-6xl shadow-2xl shadow-indigo-500/10 border border-slate-100 dark:border-slate-800 transform hover:rotate-6 transition-all">
              {tool.icon}
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Merhaba Öğretmenim!</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-lg leading-relaxed font-medium">
                Pedagojik asistanınız <b>{tool.name}</b> hazır. Bir ders konusu girerek veya bir PDF yükleyerek hemen başlayabiliriz.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[90%] lg:max-w-[80%] rounded-[2.5rem] px-10 py-8 shadow-2xl ${
              msg.role === 'user' 
              ? 'bg-slate-900 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none ring-1 ring-slate-200/50 dark:ring-slate-800/20 backdrop-blur-xl'
            }`}>
              <div className={`prose prose-sm md:prose-base max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert prose-slate'}`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi} className="leading-relaxed">
                    {part.text && (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {part.text}
                      </ReactMarkdown>
                    )}
                    {part.inlineData && (
                      <div className={`mt-6 p-5 rounded-3xl flex items-center gap-4 border ${msg.role === 'user' ? 'bg-white/10 border-white/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                        <span className="text-3xl">📄</span>
                        <div className="flex flex-col overflow-hidden">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-80 ${msg.role === 'user' ? 'text-indigo-300' : 'text-indigo-600'}`}>Doküman Analiz Edildi</span>
                          <span className="text-sm truncate font-bold">Öğretim Materyali İşlendi</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="max-w-[90%] lg:max-w-[80%] rounded-[2.5rem] px-10 py-8 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none shadow-2xl backdrop-blur-xl relative overflow-hidden ring-1 ring-indigo-500/20">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
              <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-slate">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingText}
                </ReactMarkdown>
              </div>
              <div className="flex gap-2 mt-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-10" />
      </div>

      {/* Input Section - Minimalist Floating Glass UI */}
      <div className="p-8 pb-10 bg-transparent relative z-20">
        <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-4">
          {attachedFile && (
            <div className="flex items-center gap-4 p-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-3xl animate-in zoom-in-95 duration-300 shadow-2xl">
              <span className="text-2xl">📎</span>
              <span className="text-sm font-black uppercase tracking-wider flex-1 truncate">{attachedFile.name}</span>
              <button 
                type="button" 
                onClick={() => setAttachedFile(null)}
                className="w-10 h-10 rounded-2xl bg-white/10 dark:bg-slate-900/10 hover:bg-white/20 dark:hover:bg-slate-900/20 flex items-center justify-center transition-all hover:rotate-90"
              >✕</button>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-6 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center"
              title="Materyal Yükle (PDF, PNG, JPG)"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".pdf,.png,.jpg,.jpeg,.txt"
            />
            
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder={`${tool.name} için talimatınızı buraya bırakın...`}
                className="w-full pl-8 pr-20 py-7 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/10 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition-all shadow-2xl dark:shadow-none placeholder:text-slate-400 dark:text-white font-semibold text-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachedFile)}
                className={`absolute right-4 top-4 w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${
                  isLoading || (!input.trim() && !attachedFile)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                  : 'bg-indigo-600 text-white shadow-xl shadow-indigo-400/30 hover:bg-indigo-700 active:scale-90 hover:shadow-indigo-500/50'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-10 py-2">
            <div className="flex items-center gap-2 group cursor-help">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em]">Pedagojik Filtre Aktif</p>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em]">Kişiselleştirilmiş Öğretim</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
