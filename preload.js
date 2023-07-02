const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  fileManagement: (method, config) => ipcRenderer.invoke("fileManagement", method,config),
});
