import { BrowserWindow, ipcMain, Notification } from "electron";

export const addIpcListeners = (win: BrowserWindow): void => {
  ipcMain.on("notification", (_, message: string) => {
    const notification = new Notification({
      body: message,
      icon: "/Users/joshuasprow/Projects/sandbox/pom/src/renderer/tomato.png",
      title: "Pom",
    });

    notification.show();
  });

  ipcMain.on("progress", (_, percent: null | number) => {
    if (percent === null) {
      win.setProgressBar(-1);
      return;
    }

    const progress = 1 - percent;

    win.setProgressBar(progress);
  });
};
