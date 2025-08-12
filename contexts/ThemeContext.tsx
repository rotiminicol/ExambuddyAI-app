import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  textHint: string;
  black: string;
  shadow: string;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111111',
  textMuted: '#6B7280',
  textHint: '#9CA3AF',
  black: '#000000',
  shadow: 'rgba(0,0,0,0.08)',
};

const darkColors: ThemeColors = {
  background: '#111111',
  surface: '#1F2937',
  border: '#374151',
  text: '#FFFFFF',
  textMuted: '#9CA3AF',
  textHint: '#6B7280',
  black: '#000000',
  shadow: 'rgba(0,0,0,0.3)',
};

interface ThemeContextType {
  themeMode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    loadThemeMode();
  }, []);

  const loadThemeMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem('themeMode');
      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        setThemeModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.log('Error loading theme mode:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.log('Error saving theme mode:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemTheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{
      themeMode,
      colors,
      isDark,
      setThemeMode,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
