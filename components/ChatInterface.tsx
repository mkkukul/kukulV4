
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, Tool } from '../types';
import { aiService } from '../services/aiService';

interface ChatInterfaceProps {
  tool: Tool;
  theme: 'light' | 'dark';
  externalPrompt?: string | null;
  onPromptProcessed?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ tool, theme, externalPrompt, onPromptProcessed }) => {
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

  // Handle prompts coming from specialized panels
  useEffect(() => {
    if (externalPrompt) {
      handleAISend(externalPrompt);
      if (onPromptProcessed) onPromptProcessed();
    }
  }, [externalPrompt]);

  const handleAISend = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
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
        parts: [{ text: "Bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin." }],
        timestamp: Date.now(),
      }]);
    } finally {
      setStreamingText('');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] lg:h-[600px] relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
      <header className="px-8 py-4 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3 shrink-0">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h4 className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-[0.2em]">Akıllı Danışman</h4>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar scroll-smooth">
        {messages.length === 0 && !streamingText && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 space-y-4">
            <span className="text-4xl">🧠</span>
            <p className="text-[10px] font-black uppercase tracking-widest text-center">Bu modül hakkında her şeyi sorabilirsin.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-sm ${
              msg.role === 'user' 
              ? 'bg-slate-900 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none'
            }`}>
              <div className={`prose prose-xs max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'}`}>
                {msg.parts.map((part, pi) => (
                  <div key={pi}>
                    {part.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-3xl px-6 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50 rounded-tl-none shadow-sm">
              <div className="prose prose-xs max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamingText}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-6 shrink-0 border-t border-slate-200/50 dark:border-slate-800/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAISend(input); }} 
          className="relative group"
        >
          <input
            type="text"
            placeholder="Analiz hakkında detay sor..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl transition-all font-semibold text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "↵"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
