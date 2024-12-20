import { create } from 'zustand';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';


const OrangeTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'orange',
    background: '#FFF8E1',
    surface: '#FFE0B2',
  },
};

const BlackTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1f2937',
    background: '#121212',
    surface: '#333333',
    text: '#ffffff',
  },
};


const useThemeStore = create((set) => ({
  theme: OrangeTheme,
  currentTheme: false,
  toggleTheme: () => 
    set((state) => ({
      theme: state.currentTheme ? OrangeTheme : BlackTheme,
      currentTheme: !state.currentTheme,
    })),
}));

export { useThemeStore, OrangeTheme, BlackTheme };