import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  // Tasks
  tasks: [
    { id: 1, title: 'Complete project documentation', completed: false, createdAt: new Date() },
    { id: 2, title: 'Review code changes', completed: true, createdAt: new Date() },
    { id: 3, title: 'Team meeting prep', completed: false, createdAt: new Date() },
  ],
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Date.now(), createdAt: new Date() }]
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),

  // Notes
  notes: [
    { id: 1, title: 'Meeting Notes', content: 'Important points from today\'s meeting...', color: 'yellow', createdAt: new Date() },
    { id: 2, title: 'Ideas', content: 'Brainstorming session ideas...', color: 'blue', createdAt: new Date() },
  ],
  addNote: (note) => set((state) => ({
    notes: [...state.notes, { ...note, id: Date.now(), createdAt: new Date() }]
  })),
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map(note =>
      note.id === id ? { ...note, ...updates } : note
    )
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  })),

  // Focus Sessions
  sessions: [
    { id: 1, duration: 25, completed: true, date: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, duration: 25, completed: true, date: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, duration: 25, completed: true, date: new Date(Date.now() - 10800000).toISOString() },
  ],
  addSession: (session) => set((state) => ({
    sessions: [...state.sessions, { ...session, id: Date.now(), date: session.date || new Date().toISOString() }]
  })),

  // Timer State
  timerState: {
    running: false,
    remaining: 1500, // 25 minutes in seconds
    sessionLength: 25, // minutes
  },
  setTimerState: (updates) => set((state) => ({
    timerState: { ...state.timerState, ...updates }
  })),
  startTimer: () => set((state) => ({
    timerState: { ...state.timerState, running: true }
  })),
  pauseTimer: () => set((state) => ({
    timerState: { ...state.timerState, running: false }
  })),
  resetTimer: () => set((state) => ({
    timerState: { ...state.timerState, running: false, remaining: state.timerState.sessionLength * 60 }
  })),
  setSessionLength: (minutes) => set((state) => ({
    timerState: { ...state.timerState, sessionLength: minutes, remaining: minutes * 60 }
  })),
  tickTimer: () => set((state) => {
    if (state.timerState.running && state.timerState.remaining > 0) {
      return {
        timerState: { ...state.timerState, remaining: state.timerState.remaining - 1 }
      };
    }
    if (state.timerState.remaining === 0 && state.timerState.running) {
      // Session completed
      get().addSession({ duration: state.timerState.sessionLength, completed: true, date: new Date().toISOString() });
      return {
        timerState: { ...state.timerState, running: false, remaining: state.timerState.sessionLength * 60 }
      };
    }
    return state;
  }),

  // Settings
  settings: {
    notifications: true,
    defaultSessionLength: 25,
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates }
  })),
}));

export default useAppStore;
