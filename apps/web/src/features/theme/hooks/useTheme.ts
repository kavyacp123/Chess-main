import { useState, useEffect } from 'react';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../types/theme.types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(ThemeService.getCurrentTheme());

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    ThemeService.setTheme(newTheme);
  };

  useEffect(() => {
    const currentTheme = ThemeService.getCurrentTheme();
    setTheme(currentTheme);
    ThemeService.setTheme(currentTheme);
  }, []);

  return {
    theme,
    updateTheme,
    availableThemes: ThemeService.getAvailableThemes(),
  };
};
