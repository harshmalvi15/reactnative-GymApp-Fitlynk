// themes.ts
import { Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#00FFD1',
    background: '#FFFFFF',
    card: '#F4F4F4',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF4081',
    secondary: '#666666', // ✅ No more error
    
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#00FFD1',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FF4081',
    secondary: '#BBBBBB', // ✅ No more error
  },
};
