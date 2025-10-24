import { createContext, useEffect, useState } from 'react';
import { ThemeContextType, Theme } from '../types/theme.types';
import { ThemeService } from '../services/theme.service';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('default');

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    ThemeService.setTheme(newTheme);
  };

  useEffect(() => {
    const currentTheme = ThemeService.getCurrentTheme();
    setTheme(currentTheme);
    ThemeService.setTheme(currentTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
