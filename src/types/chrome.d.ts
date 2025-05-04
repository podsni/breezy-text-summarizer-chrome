
interface Chrome {
  storage?: {
    sync?: {
      get: (keys: string[], callback: (result: any) => void) => void;
      set: (items: object, callback?: () => void) => void;
      remove: (keys: string[], callback?: () => void) => void;
    };
  };
  tabs?: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }, callback: (result: any[]) => void) => void;
  };
  scripting?: {
    executeScript: (options: {
      target: { tabId: number };
      function: () => string;
    }) => Promise<{ result: string }[]>;
  };
}

declare const chrome: Chrome;
