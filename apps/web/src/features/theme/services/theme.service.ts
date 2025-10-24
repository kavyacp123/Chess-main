import { Theme } from '../types/theme.types';

const AVAILABLE_THEMES: Theme[] = ['default', 'bubblegum'];

export class ThemeService {
  static getCurrentTheme(): Theme {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    return storedTheme && AVAILABLE_THEMES.includes(storedTheme) ? storedTheme : 'default';
  }

  static setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }

  static getAvailableThemes(): Theme[] {
    return AVAILABLE_THEMES;
  }

  static isValidTheme(theme: string): theme is Theme {
    return AVAILABLE_THEMES.includes(theme as Theme);
  }
}
