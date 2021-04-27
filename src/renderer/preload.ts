import { contextBridge, ipcRenderer } from "electron";

// Type definitions for Window.electron are located in @types/global.d.ts
contextBridge.exposeInMainWorld("electron", {
  notify: (message) => ipcRenderer.send("notification", message),
  sendProgress: (percent) => ipcRenderer.send("progress", percent),
} as Window["electron"]);
