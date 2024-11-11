import { useColorScheme } from 'react-native';
import { ComponentColors } from '@/constants/Colors';
import { TokenProvider } from '@/context/AuthContext';
import initializeI18n from '@/i8n';
import { Slot } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import '../global.css';

export default function Root() {
  const colorScheme = useColorScheme();

  const paperTheme = {
    ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
    colors: ComponentColors[colorScheme ?? 'light']
  };

  initializeI18n();

  // Set up the auth context and render our layout inside of it.
  return (
    <TokenProvider>
      <PaperProvider theme={paperTheme}>
        <Slot />
      </PaperProvider>
    </TokenProvider>
  );
}
