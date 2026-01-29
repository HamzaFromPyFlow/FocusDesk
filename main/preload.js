const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),

  // IPC stubs
  notify: (options) => ipcRenderer.invoke('app:notify', options),
  saveData: (data) => ipcRenderer.invoke('app:saveData', data),
  loadData: () => ipcRenderer.invoke('app:loadData')
});
