import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import { ThemeContextType } from '../types/theme.types';

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemesProvider');
  }
  return context;
};
