export {};

/**
 * Extending the global Window interface to enable type safety for Electron
 * methods.
 *
 * https://stackoverflow.com/a/47130953/8340430
 *
 **/

declare global {
  interface Window extends Window {
    electron: {
      notify(message: string): void;
      sendProgress(percent: null | number): void;
    };
  }

  const window: Window;
}
