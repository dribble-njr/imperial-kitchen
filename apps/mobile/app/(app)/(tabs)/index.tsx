import ParallaxScrollView from '@/components/ParallaxScrollView';
import { CartProvider } from '@/context/CartContext';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <CartProvider>
      <ParallaxScrollView>
        <Text className="text-2xl font-bold">首页</Text>
      </ParallaxScrollView>
    </CartProvider>
  );
}
