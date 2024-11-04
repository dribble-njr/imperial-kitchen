import { Slot } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TokenProvider } from '@/context/AuthContext';
import { PaperProvider } from 'react-native-paper';
import '@/i8n';
import '../global.css';

export default function Root() {
  const colorScheme = useColorScheme();
  console.log(colorScheme, '==colorScheme');

  // Set up the auth context and render our layout inside of it.
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TokenProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </TokenProvider>
    </ThemeProvider>
  );
}
