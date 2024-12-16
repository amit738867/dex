import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import "../global.css";

export default function RootLayout() {
  return (
    <PaperProvider>
       <Stack
          screenOptions={{
            headerShown: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark"
          }}
        >
        <Stack.Screen name="index"  />
      </Stack>
    </PaperProvider>
  );
}
