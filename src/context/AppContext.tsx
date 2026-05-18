import { createContext, useContext, useState, useEffect } from 'react';

export type Brief = {
  id: string;
  title: string;
  topic: string;
  date: string;
  content: {
    problemDefinition: string;
    currentSettings: string;
    options: { title: string; pros: string; cons: string }[];
    analysis: string;
    recommendation: string;
    nextSteps: string;
  };
};

type AppContextType = {
  briefs: Brief[];
  saveBrief: (brief: Brief) => void;
  deleteBrief: (id: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [briefs, setBriefs] = useState<Brief[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('policy_briefs') || '[]');
    } catch {
      return [];
    }
  });
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    localStorage.setItem('policy_briefs', JSON.stringify(briefs));
  }, [briefs]);

  const saveBrief = (brief: Brief) => {
    setBriefs((prev) => [brief, ...prev]);
  };

  const deleteBrief = (id: string) => {
    setBriefs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ briefs, saveBrief, deleteBrief, apiKey, setApiKey }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
