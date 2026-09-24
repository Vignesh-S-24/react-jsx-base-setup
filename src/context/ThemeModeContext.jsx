import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'themeMode';

const ThemeModeContext = createContext({ mode: 'light', toggleMode: () => {} });

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
};

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeModeContext);
