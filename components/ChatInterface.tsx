
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
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative transition-colors duration-500">
      <header className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-indigo-100 dark:border-indigo-900 transform hover:scale-105 transition-transform cursor-pointer">
            {tool.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">{tool.name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{tool.description}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 max-w-5xl mx-auto w-full hide-scrollbar">
        {messages.length === 0 && !streamingText && (
          <div className="py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-2xl text-white transform hover:rotate-6 transition-transform">
              {tool.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Nasıl yardımcı olabilirim?</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
                <b>{tool.name}</b> modülü ile pedagojik materyallerinizi dakikalar içinde hazırlayın. Bir konu başlığı girerek başlayabilirsiniz.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] rounded-[2rem] px-8 py-6 shadow-xl ${
              msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none ring-1 ring-slate-200/50 dark:ring-slate-800/50'
            }`}>
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert prose-slate'}`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi} className="leading-relaxed">
                    {part.text && (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {part.text}
                      </ReactMarkdown>
                    )}
                    {part.inlineData && (
                      <div className={`mt-4 p-4 rounded-2xl flex items-center gap-3 border ${msg.role === 'user' ? 'bg-white/10 border-white/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                        <span className="text-2xl">📄</span>
                        <div className="flex flex-col overflow-hidden">
                          <span className={`text-xs font-bold uppercase tracking-widest opacity-80 ${msg.role === 'user' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>Analiz Edilen Dosya</span>
                          <span className="text-xs truncate font-medium">Belge İçeriği Yüklendi</span>
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
            <div className="max-w-[85%] rounded-[2rem] px-8 py-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none shadow-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-blue-500"></div>
              <div className="prose prose-sm max-w-none dark:prose-invert prose-slate">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingText}
                </ReactMarkdown>
              </div>
              <div className="flex gap-1 mt-4">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-20 shadow-2xl">
        <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-4">
          {attachedFile && (
            <div className="flex items-center gap-3 p-3 bg-indigo-600 text-white rounded-[1.25rem] animate-in zoom-in-95 duration-300 shadow-lg ring-4 ring-indigo-500/20">
              <span className="text-xl">📎</span>
              <span className="text-sm font-bold flex-1 truncate">{attachedFile.name}</span>
              <button 
                type="button" 
                onClick={() => setAttachedFile(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all hover:rotate-90"
              >✕</button>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group p-5 text-slate-400 hover:text-indigo-600 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all shadow-sm relative overflow-hidden"
              title="Dosya Yükle (PDF, PNG, JPG)"
            >
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors"></div>
              <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
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
                className="w-full pl-8 pr-16 py-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] focus:ring-8 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-xl shadow-slate-200/50 dark:shadow-none group-hover:border-slate-200 dark:group-hover:border-slate-700 placeholder:text-slate-400 dark:text-white font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachedFile)}
                className={`absolute right-3 top-3 w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all ${
                  isLoading || (!input.trim() && !attachedFile)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                  : 'bg-indigo-600 text-white shadow-xl shadow-indigo-400/40 hover:bg-indigo-700 active:scale-90 hover:shadow-indigo-500/50'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-7 h-7 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-8 py-1">
            <div className="flex items-center gap-2 group cursor-help">
              <span className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.1em]">Pedagojik Filtre Aktif</p>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.1em]">Güvenli İçerik Modu</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
