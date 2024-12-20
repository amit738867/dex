import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { useThemeStore } from '@/lib/Themes';
import "../global.css";

export default function RootLayout() {

  const theme = useThemeStore((state) => state.theme);

  return (
    <PaperProvider theme={theme} >
       <Stack
          screenOptions={{
            headerShown: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark"
          }}
        >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index"  />
      </Stack>
    </PaperProvider>
  );
}
