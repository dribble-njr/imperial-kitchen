import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StackHeader } from '@/components/navigation';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf')
  });

  const { accessToken, isLoading } = useAuth();

  useEffect(() => {
    if (fontLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, isLoading]);

  if (!fontLoaded || isLoading) {
    return null;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!accessToken) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/guide" />;
  }

  return (
    <Stack
      screenOptions={{
        header: (props) => <StackHeader navProps={props} children={undefined} />
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(recipe)" options={{ title: '' }} />
      <Stack.Screen name="(new)" options={{ title: '', headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(profile)" options={{ title: '', headerShown: false }} />
      <Stack.Screen name="search" options={{ title: '', headerShown: false, animation: 'fade' }} />
    </Stack>
  );
}
