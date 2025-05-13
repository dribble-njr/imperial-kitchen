import { Surface } from '@/components/common';
import { useSSE } from '@/context/SSEContext';
import { SSEService } from '@/service';
import { SSEEventType } from '@/types';
import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';

export default function MessageScreen() {
  const { allMessages, connected } = useSSE(SSEEventType.MESSAGE);
  const [message, setMessage] = useState('');

  return (
    <Surface>
      <Text className="text-2xl font-bold">消息</Text>
      <Text className="text-xl font-bold">{connected ? 'sse已连接' : 'sse未连接'}</Text>
      <Surface className="flex-row gap-2">
        <TextInput label="消息" value={message} onChangeText={setMessage} />
        <Button
          disabled={!message}
          mode="contained"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            SSEService.pushEventByTargetIds({
              message,
              targetIds: [1, 2, 3],
              type: SSEEventType.MESSAGE
            });
          }}
        >
          推送消息
        </Button>
      </Surface>
      <Text className="text-md font-bold">消息列表: </Text>
      {allMessages.map((msg, index) => (
        <Text key={index}>
          {index} : {msg.data.message}
        </Text>
      ))}
    </Surface>
  );
}
