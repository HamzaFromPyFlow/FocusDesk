import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, FileText, Timer } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TimerWidget from '../components/TimerWidget';
import useAppStore from '../store/useAppStore';

function Dashboard() {
  const { tasks, sessions, notes, timerState } = useAppStore();
  const todayTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed).length;
  const focusTimeToday = sessions.filter(s => {
    const today = new Date();
    const sessionDate = new Date(s.date);
    return sessionDate.toDateString() === today.toDateString();
  }).reduce((sum, s) => sum + s.duration, 0);

  const stats = [
    {
      label: 'Focus Time',
      value: `${focusTimeToday} min`,
      icon: Clock,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Tasks Completed',
      value: completedToday,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Notes Written',
      value: notes.length,
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-400">Your productivity overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} opacity-20`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Today's Tasks</h2>
            <a
              href="#focus"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg shadow-cyan-500/50 transition-all inline-block"
            >
              Start Focus
            </a>
          </div>
          <div className="space-y-3">
            {todayTasks.length > 0 ? (
              todayTasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="text-slate-400 text-center py-8">No tasks for today</p>
            )}
          </div>
        </motion.div>

        {/* Active Focus Session */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <h2 className="text-2xl font-semibold mb-4">Focus Timer</h2>
          <TimerWidget />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
