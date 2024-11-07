import { ComponentColors } from '@/constants/Colors';
import { SessionProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import '@/i8n';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import '../global.css';

export default function Root() {
  const colorScheme = useColorScheme();

  const paperTheme = {
    ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
    colors: ComponentColors[colorScheme ?? 'light']
  };

  // Set up the auth context and render our layout inside of it.
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <PaperProvider theme={paperTheme}>
          <Slot />
        </PaperProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
