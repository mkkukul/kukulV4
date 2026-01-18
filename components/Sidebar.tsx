
import React, { useState } from 'react';
import { EDUCATIONAL_TOOLS } from '../constants/tools';
import { Tool, ToolCategory } from '../types';

interface SidebarProps {
  currentTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  isOpen: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTool, onSelectTool, isOpen, theme, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'Tümü'>('Tümü');
  const [mediaActive, setMediaActive] = useState({ mic: false, cam: false });

  const handleMediaRequest = async (type: 'mic' | 'cam') => {
    try {
      const constraints = type === 'mic' ? { audio: true } : { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaActive(prev => ({ ...prev, [type]: true }));
      console.log(`${type} active:`, stream);
      alert(`${type === 'mic' ? 'Mikrofon' : 'Kamera'} erişimi başarıyla sağlandı.`);
    } catch (err) {
      console.error(`${type} error:`, err);
      alert(`${type === 'mic' ? 'Mikrofon' : 'Kamera'} izni verilmedi.`);
    }
  };

  const filteredTasks = EDUCATIONAL_TOOLS.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: (ToolCategory | 'Tümü')[] = ['Tümü', ...Object.values(ToolCategory)];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-80 bg-white dark:bg-[#030712] border-r border-slate-200/50 dark:border-slate-800/50 z-40 transition-all duration-500 flex flex-col shadow-2xl lg:shadow-none pt-24 lg:pt-20`}>
      {/* 1. Header: Asistan Paneli Title */}
      <div className="px-8 pb-4">
        <h1 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Asistan Paneli</h1>
      </div>

      {/* 2. Media Controls: Directly under Title */}
      <div className="px-8 pb-6 flex items-center gap-3">
        <button 
          onClick={() => handleMediaRequest('mic')}
          className={`p-3 rounded-xl transition-all border ${mediaActive.mic ? 'bg-green-500/10 border-green-500/50 text-green-500 shadow-inner' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-500'}`}
          title="Mikrofon"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
        </button>
        <button 
          onClick={() => handleMediaRequest('cam')}
          className={`p-3 rounded-xl transition-all border ${mediaActive.cam ? 'bg-green-500/10 border-green-500/50 text-green-500 shadow-inner' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-500'}`}
          title="Kamera"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
      </div>

      <div className="px-6 pb-4 border-b border-slate-100 dark:border-slate-900">
        <div className="relative group mb-4">
          <input
            type="text"
            placeholder="Görev ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-blue-500/50 rounded-xl text-xs outline-none transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
        {filteredTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onSelectTool(task)}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-4 transition-all duration-200 group relative ${
              currentTool?.id === task.id 
              ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20' 
              : 'hover:bg-slate-50 dark:hover:bg-slate-900/30 border border-transparent'
            }`}
          >
            <span className="text-xl">{task.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{task.name}</p>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-tighter truncate">{task.category}</p>
            </div>
          </button>
        ))}
      </nav>
      
      {/* 3. Footer: Minimalist Theme Toggle Icons */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-900">
        <button 
          onClick={toggleTheme}
          className="w-full flex justify-between items-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100 transition-all"
        >
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Görünüm</span>
          <div className="flex gap-3">
            <svg className={`h-4 w-4 ${theme === 'light' ? 'text-blue-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.552 13.292c.337-.363.486-.83.462-1.312z" />
            </svg>
            <svg className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
