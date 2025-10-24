export type Theme = 'default' | 'bubblegum';

export interface ThemeContextType {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

export interface ThemeData {
  name: string;
  'board-image': string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}
