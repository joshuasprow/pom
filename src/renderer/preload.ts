import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  sendProgress: (percent) => ipcRenderer.send("progress", percent),
} as Window["electron"]);
