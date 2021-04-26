export {};
declare global {
  interface Window extends Window {
    electron: {
      sendProgress(): void;
    };
  }
}
declare const window: Window;
