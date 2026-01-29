import React from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';

function TitleBar() {
  const handleMinimize = () => {
    if (window.api) {
      window.api.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.api) {
      window.api.maximize();
    }
  };

  const handleClose = () => {
    if (window.api) {
      window.api.close();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-dark-surface/80 backdrop-blur-lg border-b border-dark-border z-50 flex items-center justify-end px-4" style={{ WebkitAppRegion: 'drag' }}>
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-dark-card transition-colors"
          title="Minimize"
        >
          <Minimize2 size={14} />
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-dark-card transition-colors"
          title="Maximize"
        >
          <Maximize2 size={14} />
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500/20 hover:text-red-400 transition-colors"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
