# FocusDesk

A desktop productivity application built with Electron, React, and Tailwind CSS.

## Features

- 🎯 **Focus Timer**: Pomodoro-style timer with customizable session lengths
- 📝 **Notes**: Sticky notes with color themes
- 📊 **Analytics**: Productivity charts and insights
- ✅ **Tasks**: Task management with completion tracking
- ⚙️ **Settings**: Customizable theme and preferences

## Tech Stack

- **Electron**: Desktop app framework
- **React**: UI library
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Framer Motion**: Animations
- **Recharts**: Analytics charts

## Installation

```bash
cd focusdesk
npm install
```

## Development

```bash
# Start React dev server and Electron
npm run dev

# Or run separately:
npm run dev:react  # Starts Vite dev server on port 5173
npm start          # Starts Electron (after React is running)
```

## Building

```bash
npm run build
npm start
```

## Project Structure

```
focusdesk/
├── main/              # Electron main process
│   ├── main.js       # Main process entry
│   └── preload.js    # Preload script
├── renderer/          # React application
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── store/        # Zustand store
│   └── main.jsx      # React entry point
└── package.json
```

## Features Overview

### Dashboard
- Overview of today's productivity
- Quick stats (focus time, tasks, notes)
- Active focus timer widget
- Today's tasks list

### Focus Timer
- Circular animated countdown
- Start/Pause/Reset controls
- Session length selector (15, 25, 45, 60 minutes)
- Session history

### Notes
- Create, edit, and delete notes
- Color-coded sticky notes
- Grid layout
- Real-time editing

### Analytics
- Daily focus time chart
- Weekly productivity chart
- Total focus time stats
- Streak tracking

### Settings
- Dark/Light theme toggle
- Default session length
- Notifications toggle (stub)
- About information

## Window Controls

The app uses a frameless window with custom title bar controls:
- Minimize
- Maximize/Restore
- Close

## State Management

All state is managed in-memory using Zustand. No persistence or backend is implemented.

## IPC Stubs

The app includes IPC stubs for future expansion:
- `window.api.notify()` - Notification system
- `window.api.saveData()` - Data persistence
- `window.api.loadData()` - Data loading

## License

MIT
