import React from 'react';
import { motion } from 'framer-motion';
import TimerWidget from '../components/TimerWidget';
import useAppStore from '../store/useAppStore';

function Focus() {
  const { timerState, setSessionLength, sessions } = useAppStore();
  const sessionLengths = [15, 25, 45, 60];

  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Focus Timer
        </h1>
        <p className="text-slate-400">Pomodoro-style focus sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
        >
          <TimerWidget />
        </motion.div>

        {/* Session Length Selector & History */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
          >
            <h3 className="text-xl font-semibold mb-4">Session Length</h3>
            <div className="grid grid-cols-2 gap-3">
              {sessionLengths.map((length) => (
                <button
                  key={length}
                  onClick={() => setSessionLength(length)}
                  className={`p-3 rounded-lg border transition-all ${
                    timerState.sessionLength === length
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500'
                      : 'bg-dark-surface border-dark-border text-slate-300 hover:border-cyan-500/50'
                  }`}
                >
                  {length} min
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
          >
            <h3 className="text-xl font-semibold mb-4">Recent Sessions</h3>
            <div className="space-y-2">
              {recentSessions.length > 0 ? (
                recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{session.duration} min</div>
                      <div className="text-xs text-slate-400">
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">No sessions yet</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Focus;
