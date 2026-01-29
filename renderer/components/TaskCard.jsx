import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import useAppStore from '../store/useAppStore';

function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${
        task.completed
          ? 'bg-dark-card/50 border-dark-border opacity-60'
          : 'bg-dark-card border-dark-border'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-cyan-500 border-cyan-500'
              : 'border-slate-500 hover:border-cyan-500'
          }`}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>
        <span
          className={`flex-1 ${
            task.completed ? 'line-through text-slate-500' : 'text-slate-200'
          }`}
        >
          {task.title}
        </span>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;
