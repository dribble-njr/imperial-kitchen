import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Button } from 'react-native-paper';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <Button mode="contained">Click Test</Button>
      <Button mode="contained" disabled>
        Click Test
      </Button>
      <Button mode="elevated">Click Test</Button>
      <Button mode="elevated" disabled>
        Click Test
      </Button>
      <Button mode="outlined">Click Test</Button>
      <Button mode="outlined" disabled>
        Click Test
      </Button>
      <Button mode="text">Click Test</Button>
      <Button mode="text" disabled>
        Click Test
      </Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  }
});
