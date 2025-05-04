
interface ChromeTab {
  id?: number;
  url?: string;
  title?: string;
}

interface Chrome {
  storage?: {
    sync?: {
      get: (keys: string[] | string | null, callback: (result: any) => void) => void;
      set: (items: object, callback?: () => void) => void;
      remove: (keys: string[] | string, callback?: () => void) => void;
    };
  };
  tabs?: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }, callback: (result: ChromeTab[]) => void) => void;
  };
  scripting?: {
    executeScript: (options: {
      target: { tabId: number };
      function: () => string;
    }) => Promise<{ result: string }[]>;
  };
}

declare global {
  const chrome: Chrome;
}

export {};
