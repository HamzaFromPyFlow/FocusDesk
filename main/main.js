const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Detect dev mode - check NODE_ENV (don't rely on isPackaged for dev)
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0f172a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: isDev
    }
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173').catch((err) => {
      console.error('Failed to load dev server. Make sure to run "npm run dev" instead of "npm start"');
      console.error(err);
    });
    mainWindow.webContents.openDevTools();
  } else {
    // Production mode - load built files
    const distPath = path.join(__dirname, '../dist/index.html');
    const fs = require('fs');
    if (!fs.existsSync(distPath)) {
      console.error('Production build not found! Please run "npm run build" first.');
      // Show error page
      mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`
          document.body.innerHTML = \`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; padding: 20px; text-align: center; background: #0f172a; color: #e2e8f0;">
              <h1 style="color: #f87171; margin-bottom: 16px;">Build Not Found</h1>
              <p style="color: #94a3b8; margin-bottom: 8px;">Production build not found.</p>
              <p style="color: #64748b; margin-bottom: 24px;">Please run:</p>
              <code style="background: #1e293b; padding: 12px 24px; border-radius: 6px; font-size: 14px; color: #06b6d4;">
                npm run build
              </code>
              <p style="color: #64748b; margin-top: 24px; font-size: 12px;">Or use "npm run dev" for development mode</p>
            </div>
          \`;
        `);
      });
      // Load a blank page first
      mainWindow.loadURL('data:text/html,<html><body></body></html>');
    } else {
      mainWindow.loadFile(distPath);
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for window controls
ipcMain.handle('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window:close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// IPC stubs for future expansion
ipcMain.handle('app:notify', (event, { title, body }) => {
  // Stub: would show native notification
  console.log('Notification:', title, body);
  return { success: true };
});

ipcMain.handle('app:saveData', (event, data) => {
  // Stub: would save to file/database
  console.log('Save data:', data);
  return { success: true };
});

ipcMain.handle('app:loadData', () => {
  // Stub: would load from file/database
  return { success: true, data: null };
});
