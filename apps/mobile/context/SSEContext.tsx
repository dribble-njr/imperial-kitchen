import { useToken } from '@/context/AuthContext';
import { getSSEBaseURL } from '@/service/http-client';
import { SSEEventData, SSEEventType } from '@imperial-kitchen/types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import EventSource, { EventSourceEvent } from 'react-native-sse';
import { AuthService } from '@/service';
import { removeStorageItemAsync } from '@/hooks/useStorageState';
import { useRouter } from 'expo-router';

type SSEMessage = {
  id: string;
  data: SSEEventData;
  type: SSEEventType;
};

type SSEContextType = {
  sse: EventSource | null;
  messages: SSEMessage[];
  connected: boolean;
  reconnect: () => void;
  clearMessages: () => void;
};

const MaxReconnectAttempts = 5;
const MaxMessages = 100; // 只保留最新的100条历史消息

export const SSEContext = createContext<SSEContextType>({
  sse: null,
  messages: [],
  connected: false,
  reconnect: () => {},
  clearMessages: () => {}
});

export const useSSE = (type: SSEEventType) => {
  const { messages, connected, reconnect } = useContext(SSEContext);
  const allMessages = messages.filter((msg) => msg.type === type);
  return {
    allMessages,
    latestMessage: allMessages.at(-1),
    connected,
    reconnect
  };
};

export const SSEProvider = ({ children }: { children: ReactNode }) => {
  const [sse, setSSE] = useState<EventSource | null>(null);
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const { accessToken, setAccessToken, setRefreshToken } = useToken();
  const reconnectAttempts = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const router = useRouter();

  const handleTokenExpired = async () => {
    try {
      const response = await AuthService.refreshToken();
      console.log('response handleTokenExpired', response);
      if (response) {
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);

        return true;
      }
    } catch (error) {
      console.error('refresh token error:', error);
      await removeStorageItemAsync('accessToken');
      await removeStorageItemAsync('refreshToken');
      router.replace('/guide');
      return false;
    }
  };

  const createConnection = useCallback(() => {
    if (!accessToken) return;

    const handleOpen = () => {
      console.log('SSE 连接已建立');
      setConnected(true);
      reconnectAttempts.current = 0;
    };

    const handleMessage = (event: EventSourceEvent<'message'>) => {
      try {
        const data: SSEMessage = JSON.parse(event.data ?? '');
        setMessages((prev) => {
          const newMessages = [...prev, data];
          return newMessages.slice(-MaxMessages);
        });
      } catch (error) {
        console.error('消息解析错误:', error);
      }
    };

    const handleError = async (error: EventSourceEvent<'error'>) => {
      console.error('SSE 错误:', error);
      setConnected(false);
      es.close();
      setSSE(null);

      if ('xhrStatus' in error && error.xhrStatus === 401) {
        console.log('refresh token');
        const refreshSuccess = await handleTokenExpired();
        if (refreshSuccess) {
          reconnectAttempts.current = 0;
          if (!sse) createConnection();
          return;
        }
      }

      if (reconnectAttempts.current < MaxReconnectAttempts) {
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        console.log(`${timeout / 1000}秒后尝试重连...`);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current++;
          if (!sse) createConnection();
        }, timeout);
      }
    };

    if (sse) {
      sse.removeEventListener('open', handleOpen);
      sse.removeEventListener('message', handleMessage);
      sse.removeEventListener('error', handleError);
      sse.close();
      setSSE(null);
    }

    const es = new EventSource(getSSEBaseURL(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    es.addEventListener('open', handleOpen);
    es.addEventListener('message', handleMessage);
    es.addEventListener('error', handleError);

    setSSE(es);

    return () => {
      es.removeEventListener('open', handleOpen);
      es.removeEventListener('message', handleMessage);
      es.removeEventListener('error', handleError);
      es.close();
    };
  }, [accessToken]);

  const reconnect = useCallback(() => {
    if (sse) {
      sse.close();
      setSSE(null);
    }
    reconnectAttempts.current = 0;
    createConnection();
  }, [sse, createConnection]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    const cleanup = createConnection();

    return () => {
      if (cleanup) {
        cleanup();
      }
      setSSE(null);
      setConnected(false);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [createConnection]);

  return (
    <SSEContext.Provider
      value={{
        sse,
        messages,
        connected,
        reconnect,
        clearMessages
      }}
    >
      {children}
    </SSEContext.Provider>
  );
};
