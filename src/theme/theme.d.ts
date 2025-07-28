// src/theme.d.ts
import '@react-navigation/native';

declare module '@react-navigation/native' {
  interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;

      // ✅ Add your custom colors here
      secondary: string;
    };
  }
}
