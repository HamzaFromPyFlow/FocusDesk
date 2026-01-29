import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Timer, StickyNote, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="w-64 bg-dark-surface/50 backdrop-blur-xl border-r border-dark-border h-screen pt-12">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          FocusDesk
        </h1>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/50'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
