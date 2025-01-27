import { StackHeader } from '@/components/navigation';
import { CaptchaType } from '@/types';
import { Stack } from 'expo-router';
import { createContext, useContext, useState } from 'react';

const AuthFlowContext = createContext<{
  registerType: 'admin' | 'member';
  setRegisterType: (type: 'admin' | 'member') => void;
  flowType: CaptchaType;
  setFlowType: (type: CaptchaType) => void;
  email: string;
  setEmail: (email: string) => void;
}>({
  registerType: 'admin',
  setRegisterType: () => {},
  flowType: CaptchaType.REGISTER,
  setFlowType: () => {},
  email: '',
  setEmail: () => {}
});

export function useAuthFlowContext() {
  const value = useContext(AuthFlowContext);
  if (!value) {
    throw new Error('useAuthFlowContext must be used within a AuthFlowContext.Provider');
  }
  return value;
}

export default function AuthLayout() {
  const [registerType, setRegisterType] = useState<'admin' | 'member'>('admin');
  const [flowType, setFlowType] = useState<CaptchaType>(CaptchaType.REGISTER);
  const [email, setEmail] = useState('');

  return (
    <AuthFlowContext.Provider
      value={{
        registerType,
        setRegisterType,
        flowType,
        setFlowType,
        email,
        setEmail
      }}
    >
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          header: (props) => <StackHeader navProps={props} children={undefined} />
        }}
      >
        <Stack.Screen name="guide" options={{ headerShown: false }} />
        <Stack.Screen name="create-kitchen" options={{ title: '' }} />
        <Stack.Screen name="join-kitchen" options={{ title: '' }} />
        <Stack.Screen name="sign-in" options={{ title: '' }} />
        <Stack.Screen name="sign-up" options={{ title: '' }} />
        <Stack.Screen name="captcha" options={{ title: '' }} />
      </Stack>
    </AuthFlowContext.Provider>
  );
}
