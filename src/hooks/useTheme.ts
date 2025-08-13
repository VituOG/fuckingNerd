import { useState, useEffect, useContext, createContext } from 'react';
import { Theme, ThemeConfig } from '@/types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeProvider = () => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    current: 'dark',
    autoSwitch: false,
  });

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        if (window.electronAPI) {
          const savedTheme = await window.electronAPI.store.get('theme');
          const savedConfig = await window.electronAPI.store.get('themeConfig');
          
          if (savedTheme) {
            setThemeState(savedTheme);
          }
          
          if (savedConfig) {
            setThemeConfig(savedConfig);
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  // Save theme to storage when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        if (window.electronAPI) {
          await window.electronAPI.store.set('theme', theme);
          await window.electronAPI.store.set('themeConfig', themeConfig);
        }
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };

    saveTheme();
  }, [theme, themeConfig]);

  // Auto-switch theme based on system preference
  useEffect(() => {
    if (!themeConfig.autoSwitch) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: Theme = e.matches ? 'dark' : 'light';
      setThemeState(newTheme);
      setThemeConfig(prev => ({ ...prev, current: newTheme }));
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Set initial theme based on system preference
    const initialTheme: Theme = mediaQuery.matches ? 'dark' : 'light';
    setThemeState(initialTheme);
    setThemeConfig(prev => ({ ...prev, current: initialTheme }));

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeConfig.autoSwitch]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setThemeConfig(prev => ({ ...prev, current: newTheme }));
  };

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...config }));
  };

  return {
    theme,
    setTheme,
    themeConfig,
    updateThemeConfig,
  };
}; 