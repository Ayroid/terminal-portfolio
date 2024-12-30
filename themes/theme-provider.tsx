"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = 'dracula' | 'solarized' | 'nord' | 'gruvbox' | 'onedark' | 'monokai' | 'tokyo-night' | 'github-dark' | 'catppuccin' | 'material';

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "catppuccin",
  setTheme: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("catppuccin");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
