import { useTheme } from '../features/theme';

export const SettingsPage = () => {
  const { theme, updateTheme, availableThemes } = useTheme();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
        <div className="space-y-4">
          {availableThemes.map((themeOption) => (
            <label key={themeOption} className="flex items-center space-x-3">
              <input
                type="radio"
                name="theme"
                value={themeOption}
                checked={theme === themeOption}
                onChange={(e) => updateTheme(e.target.value as any)}
                className="w-4 h-4"
              />
              <span className="capitalize">{themeOption}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
