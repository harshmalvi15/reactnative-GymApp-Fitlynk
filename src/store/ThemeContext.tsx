// src/store/ThemeContext.tsx

import React, { createContext, useContext, useState } from 'react';
import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import 'react-native';



interface AppTheme extends NavigationTheme {
  colors: NavigationTheme['colors'] & {
    secondary: string;
  };
}

const CustomDarkTheme: AppTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000000',
    text: '#ffffff',
    card: '#1e1e1e',
    border: '#333333',
    secondary: '#aaaaaa',
  },
};

const CustomLightTheme: AppTheme = {
  ...NavigationLightTheme,
  dark: false,
  colors: {
    ...NavigationLightTheme.colors,
    background: '#ffffff',
    text: '#000000',
    card: '#f2f2f2',
    border: '#cccccc',
    secondary: '#555555',
  },
};

const ThemeContext = createContext<{
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
}>({
  theme: CustomLightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? CustomDarkTheme : CustomLightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
