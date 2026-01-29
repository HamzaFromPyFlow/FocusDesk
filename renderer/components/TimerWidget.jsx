import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import useAppStore from '../store/useAppStore';

function TimerWidget() {
  const { timerState, startTimer, pauseTimer, resetTimer, tickTimer } = useAppStore();

  React.useEffect(() => {
    let interval;
    if (timerState.running) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState.running, tickTimer]);

  const minutes = Math.floor(timerState.remaining / 60);
  const seconds = timerState.remaining % 60;
  const progress = 1 - (timerState.remaining / (timerState.sessionLength * 60));

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-dark-card"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={timerState.remaining}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={timerState.running ? pauseTimer : startTimer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/50"
        >
          {timerState.running ? <Pause size={20} /> : <Play size={20} />}
          {timerState.running ? 'Pause' : 'Start'}
        </motion.button>
        <motion.button
          onClick={resetTimer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-dark-card text-slate-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-dark-border"
        >
          <RotateCcw size={20} />
          Reset
        </motion.button>
      </div>
    </div>
  );
}

export default TimerWidget;
