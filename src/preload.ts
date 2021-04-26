import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  sendProgress: (...args: any[]): void => ipcRenderer.send("progress", ...args),
});
