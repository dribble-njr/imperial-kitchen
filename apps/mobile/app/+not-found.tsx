import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Surface } from '@/components/common';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Surface style={styles.container}>
        <Text variant="titleLarge">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="titleSmall">Go to home screen!</Text>
        </Link>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
});
