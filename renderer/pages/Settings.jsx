import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Clock } from 'lucide-react';
import useAppStore from '../store/useAppStore';

function Settings() {
  const { theme, setTheme, settings, updateSettings, setSessionLength } = useAppStore();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-400">Customize your experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <div className="flex items-center gap-3 mb-6">
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            <h3 className="text-xl font-semibold">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-dark-surface border border-dark-border">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-slate-400">Choose your preferred theme</div>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg shadow-cyan-500/50 transition-all"
              >
                {theme === 'dark' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Focus Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock size={24} />
            <h3 className="text-xl font-semibold">Focus Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
              <div className="font-medium mb-2">Default Session Length</div>
              <div className="text-sm text-slate-400 mb-4">
                Set your preferred focus session duration
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 45, 60].map((length) => (
                  <button
                    key={length}
                    onClick={() => {
                      setSessionLength(length);
                      updateSettings({ defaultSessionLength: length });
                    }}
                    className={`p-3 rounded-lg border transition-all ${
                      settings.defaultSessionLength === length
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500'
                        : 'bg-dark-card border-dark-border text-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} />
            <h3 className="text-xl font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-dark-surface border border-dark-border">
              <div>
                <div className="font-medium">Enable Notifications</div>
                <div className="text-sm text-slate-400">
                  Get notified when focus sessions complete
                </div>
              </div>
              <button
                onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.notifications ? 'bg-cyan-500' : 'bg-dark-border'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <h3 className="text-xl font-semibold mb-6">About FocusDesk</h3>
          <div className="space-y-3 text-slate-400">
            <p>Version 1.0.0</p>
            <p>A desktop productivity app built with Electron and React.</p>
            <p className="text-sm text-slate-500">
              Focus on what matters. Track your productivity and stay focused.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;
