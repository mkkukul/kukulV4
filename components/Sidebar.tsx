
import React, { useState } from 'react';
import { EDUCATIONAL_TOOLS } from '../constants/tools';
import { Tool, ToolCategory } from '../types';

interface SidebarProps {
  currentTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  isOpen: boolean;
  theme: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({ currentTool, onSelectTool, isOpen, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'Tümü'>('Tümü');

  const filteredTasks = EDUCATIONAL_TOOLS.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: (ToolCategory | 'Tümü')[] = ['Tümü', ...Object.values(ToolCategory)];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-80 bg-white dark:bg-[#030712] border-r border-slate-200/50 dark:border-slate-800/50 z-40 transition-all duration-500 flex flex-col shadow-2xl lg:shadow-none`}>
      <div className="p-8 border-b border-slate-100 dark:border-slate-900 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">KH</div>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">KuKul <span className="text-blue-600">Hoca</span></h1>
          <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1 uppercase font-black tracking-widest opacity-80">Asistan Panel</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Görev ara..."
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-sm outline-none transition-all dark:text-white font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">🔍</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
        {filteredTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onSelectTool(task)}
            className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 group relative overflow-hidden ${
              currentTool?.id === task.id 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 border shadow-sm' 
              : 'hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-transparent'
            }`}
          >
            {currentTool?.id === task.id && (
              <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-600"></div>
            )}
            <span className={`text-2xl transition-all ${currentTool?.id === task.id ? 'scale-110' : 'group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100'}`}>
              {task.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate tracking-tight ${currentTool?.id === task.id ? 'text-blue-900 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                {task.name}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5 font-bold uppercase tracking-tighter">
                {task.category}
              </p>
            </div>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-slate-100 dark:border-slate-900">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all cursor-pointer group hover:border-blue-500/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-inner group-hover:scale-110 transition-transform">
            KH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-800 dark:text-white truncate tracking-tight">Eğitimci Hesabı</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.2em] opacity-70">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
