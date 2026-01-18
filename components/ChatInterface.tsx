
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, Tool } from '../types';
import { aiService } from '../services/aiService';

interface ChatInterfaceProps {
  tool: Tool;
  theme: 'light' | 'dark';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ tool, theme }) => {
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
    // Explicitly NO auto-media-access logic here
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
    <div className="flex flex-col h-full bg-transparent relative overflow-hidden">
      {/* Clean Dashboard Header: No duplicate kukul.io text */}
      <header className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-4 lg:py-6 flex items-center justify-between sticky top-0 z-20 pt-24 lg:pt-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-blue-100 dark:border-blue-900/30">
            {tool.icon}
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1 uppercase">{tool.name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Akıllı Modül Aktif</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 max-w-4xl mx-auto w-full hide-scrollbar">
        {messages.length === 0 && !streamingText && (
          <div className="py-20 text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2rem] mx-auto flex items-center justify-center text-5xl shadow-xl border border-slate-100 dark:border-slate-800">
              {tool.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Analiz Odası</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed font-medium">
                Sınav sonuçlarını veya merak ettiğin konuyu buraya bırakarak analizi başlatabilirsin.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] rounded-3xl px-8 py-6 shadow-lg ${
              msg.role === 'user' 
              ? 'bg-slate-900 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none ring-1 ring-slate-200/10 backdrop-blur-md'
            }`}>
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'}`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi}>
                    {part.text && (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {part.text}
                      </ReactMarkdown>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="max-w-[85%] rounded-3xl px-8 py-6 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none shadow-lg backdrop-blur-md ring-1 ring-blue-500/10">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingText}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-6" />
      </div>

      {/* Input Section */}
      <div className="p-6 lg:p-8 shrink-0 relative z-20">
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-5 text-slate-400 hover:text-blue-600 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl transition-all shadow-md"
              title="Dosya Yükle"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                placeholder={`${tool.name} asistanına bir şey sor...`}
                className="w-full pl-6 pr-16 py-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:border-blue-600 outline-none transition-all shadow-xl dark:shadow-none placeholder:text-slate-400 dark:text-white font-semibold"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !attachedFile)}
                className={`absolute right-3 top-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isLoading || (!input.trim() && !attachedFile)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-300'
                  : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest opacity-60">kukul.io AI Engine Aktif</p>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
