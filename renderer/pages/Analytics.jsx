import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useAppStore from '../store/useAppStore';

function Analytics() {
  const { sessions } = useAppStore();

  // Mock data for charts
  const dailyData = [
    { day: 'Mon', focus: 120 },
    { day: 'Tue', focus: 150 },
    { day: 'Wed', focus: 90 },
    { day: 'Thu', focus: 180 },
    { day: 'Fri', focus: 140 },
    { day: 'Sat', focus: 60 },
    { day: 'Sun', focus: 45 },
  ];

  const weeklyData = [
    { week: 'Week 1', sessions: 12, hours: 5 },
    { week: 'Week 2', sessions: 18, hours: 7.5 },
    { week: 'Week 3', sessions: 15, hours: 6.25 },
    { week: 'Week 4', sessions: 20, hours: 8.3 },
  ];

  const totalFocusTime = dailyData.reduce((sum, d) => sum + d.focus, 0);
  const avgDaily = Math.round(totalFocusTime / dailyData.length);
  const currentStreak = 5; // Mock streak

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-slate-400">Your productivity insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border backdrop-blur-xl"
        >
          <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {totalFocusTime}
          </div>
          <div className="text-slate-400 text-sm">Total Focus Minutes</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border backdrop-blur-xl"
        >
          <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {avgDaily}
          </div>
          <div className="text-slate-400 text-sm">Avg Daily Minutes</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border backdrop-blur-xl"
        >
          <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {currentStreak}
          </div>
          <div className="text-slate-400 text-sm">Day Streak</div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <h3 className="text-xl font-semibold mb-6">Daily Focus Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <h3 className="text-xl font-semibold mb-6">Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="sessions" fill="#06b6d4" name="Sessions" />
              <Bar dataKey="hours" fill="#3b82f6" name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;
