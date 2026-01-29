import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import Dashboard from './pages/Dashboard';
import Focus from './pages/Focus';
import Notes from './pages/Notes';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import useAppStore from './store/useAppStore';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { theme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'focus':
        return <Focus />;
      case 'notes':
        return <Notes />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg text-slate-200 overflow-hidden">
      <TitleBar />
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto pt-12"
      >
        {renderPage()}
      </motion.main>
    </div>
  );
}

export default App;
