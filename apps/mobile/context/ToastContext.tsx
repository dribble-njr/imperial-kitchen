import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { eventBus } from '@/utils/event-bus';
import { StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Portal, Surface, Text } from 'react-native-paper';
import { useBackHandler } from '@/hooks/useBackHandler';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleMessage = (message: string) => {
      showToast(message);
    };

    eventBus.on('message', handleMessage);
    return () => {
      eventBus.off('message', handleMessage);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast visible={visible} message={message} onDismiss={() => setVisible(false)} />
    </ToastContext.Provider>
  );
}

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({ message, visible, onDismiss, duration = 1000 }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (visible) {
      // 清理之前的动画和定时器
      if (animationRef.current) {
        animationRef.current.stop();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 显示动画
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start();

      // 设置隐藏定时器
      timerRef.current = setTimeout(() => {
        animationRef.current = Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        });

        animationRef.current.start(() => {
          onDismiss();
        });
      }, duration);
    }

    // 清理函数
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, duration, onDismiss, opacity]);

  useBackHandler(visible, onDismiss);

  if (!visible) return null;

  return (
    <Portal theme={{ zIndex: 9999 }}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={[styles.overlay, { opacity }]}>
          <TouchableWithoutFeedback>
            <Surface style={styles.toast} elevation={0}>
              <Text style={styles.text}>{message}</Text>
            </Surface>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Portal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 16,
    maxWidth: '80%',
    shadowColor: 'transparent'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
});
