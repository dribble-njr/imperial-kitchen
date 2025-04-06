import { Surface } from '../common';
import { StyleSheet } from 'react-native';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Surface style={styles.container}>{children}</Surface>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
