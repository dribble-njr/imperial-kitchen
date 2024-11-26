import ParallaxScrollView from '@/components/ParallaxScrollView';
import { CartProvider } from '@/context/CartContext';
import { useSse } from '@/context/SseContext';
import { SseType } from '@imperial-kitchen/types';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  const { allMessages, connected } = useSse(SseType.MESSAGE);

  return (
    <CartProvider>
      <ParallaxScrollView>
        <Text className="text-2xl font-bold">首页</Text>
        <Text className="text-xl font-bold">{connected ? 'sse已连接' : 'sse未连接'}</Text>
        <Text className="text-md font-bold">消息列表: </Text>
        {allMessages.map((msg, index) => (
          <Text key={index}>
            {index} : {msg.data.message}
          </Text>
        ))}
      </ParallaxScrollView>
    </CartProvider>
  );
}
