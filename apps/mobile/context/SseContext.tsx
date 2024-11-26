/* eslint-disable @typescript-eslint/no-explicit-any */

import { useToken } from '@/context/AuthContext';
import { getSseBaseURL } from '@/service/http-client';
import { SseEventData, SseType } from '@imperial-kitchen/types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import EventSource from 'react-native-sse';

type SseMessage = {
  id: string;
  data: SseEventData;
  type: SseType;
};

type SseContextType = {
  sse: EventSource | null;
  messages: SseMessage[];
  connected: boolean;
  reconnect: () => void;
  clearMessages: () => void;
};

const MaxReconnectAttempts = 5;
const MaxMessages = 100; // 只保留最新的100条历史消息

export const SseContext = createContext<SseContextType>({
  sse: null,
  messages: [],
  connected: false,
  reconnect: () => {},
  clearMessages: () => {}
});

export const useSse = (type: SseType) => {
  const { messages, connected, reconnect } = useContext(SseContext);
  const allMessages = messages.filter((msg) => msg.type === type);
  return {
    allMessages,
    latestMessage: allMessages.at(-1),
    connected,
    reconnect
  };
};

export const SseProvider = ({ children }: { children: ReactNode }) => {
  const [sse, setSse] = useState<EventSource | null>(null);
  const [messages, setMessages] = useState<SseMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const token = useToken();
  const reconnectAttempts = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const createConnection = useCallback(() => {
    if (!token.accessToken) return;

    const es = new EventSource(getSseBaseURL(), {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    });

    const handleOpen = () => {
      console.log('SSE 连接已建立');
      setConnected(true);
      reconnectAttempts.current = 0;
    };

    const handleMessage = (event: any) => {
      try {
        const data: SseMessage = JSON.parse(event.data);
        console.log(`接收到消息: ${JSON.stringify(data)}`);
        setMessages((prev) => {
          const newMessages = [...prev, data];
          return newMessages.slice(-MaxMessages);
        });
      } catch (error) {
        console.error('消息解析错误:', error);
      }
    };

    const handleError = (error: any) => {
      console.error('SSE 错误:', error);
      setConnected(false);
      es.close();
      setSse(null);

      if (reconnectAttempts.current < MaxReconnectAttempts) {
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        console.log(`${timeout / 1000}秒后尝试重连...`);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current++;
          createConnection();
        }, timeout);
      }
    };

    es.addEventListener('open', handleOpen);
    es.addEventListener('message', handleMessage);
    es.addEventListener('error', handleError);

    setSse(es);

    return () => {
      es.removeEventListener('open', handleOpen);
      es.removeEventListener('message', handleMessage);
      es.removeEventListener('error', handleError);
      es.close();
    };
  }, [token.accessToken]);

  const reconnect = useCallback(() => {
    if (sse) {
      sse.close();
      setSse(null);
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
        setSse(null);
        setConnected(false);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [createConnection]);

  return (
    <SseContext.Provider
      value={{
        sse,
        messages,
        connected,
        reconnect,
        clearMessages
      }}
    >
      {children}
    </SseContext.Provider>
  );
};
