import { app, BrowserWindow } from "electron";
import Store from "electron-store";
import { addIpcListeners } from "./ipc";
import { createWindow } from "./window";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const initializeStore = () => {
  try {
    const store = new Store();

    store.set("unicorn", "🦄");
    console.log(store.get("unicorn"));
  } catch (error) {
    console.error(error);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const win = createWindow();

  addIpcListeners(win);

  console.log("CONFIG_DIR", app.getPath("userData"));

  initializeStore();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
