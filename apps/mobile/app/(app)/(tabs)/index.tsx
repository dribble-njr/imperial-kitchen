import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { CartProvider } from '@/context/CartContext';

export default function HomeScreen() {
  return (
    <CartProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
      >
        HomeScreen
      </ParallaxScrollView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  sidebar: {
    width: 100,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  main: {
    flex: 1,
    marginLeft: 100
  }
});
