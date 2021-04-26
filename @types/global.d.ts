export {};
declare global {
  interface Window extends Window {
    electron: {
      sendProgress(percent: null | number): void;
    };
  }
}
declare const window: Window;
