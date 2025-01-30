import { StackHeader } from '@/components/navigation';
import { CaptchaType } from '@/types';
import { Stack } from 'expo-router';
import { createContext, useContext, useState } from 'react';

const AuthFlowContext = createContext<{
  registerType: 'admin' | 'member';
  setRegisterType: (type: 'admin' | 'member') => void;
  captchaType: CaptchaType;
  setCaptchaType: (type: CaptchaType) => void;
  email: string;
  setEmail: (email: string) => void;
  captcha: string;
  setCaptcha: (captcha: string) => void;
}>({
  registerType: 'admin',
  setRegisterType: () => {},
  captchaType: CaptchaType.REGISTER,
  setCaptchaType: () => {},
  email: '',
  setEmail: () => {},
  captcha: '',
  setCaptcha: () => {}
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
  const [captchaType, setCaptchaType] = useState<CaptchaType>(CaptchaType.REGISTER);
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');

  return (
    <AuthFlowContext.Provider
      value={{
        registerType,
        setRegisterType,
        captchaType,
        setCaptchaType,
        email,
        setEmail,
        captcha,
        setCaptcha
      }}
    >
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          header: (props) => <StackHeader navProps={props} children={undefined} />
        }}
      >
        <Stack.Screen name="guide" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ title: '' }} />
        <Stack.Screen name="sign-up" options={{ title: '' }} />
        <Stack.Screen name="captcha" options={{ title: '' }} />
        <Stack.Screen name="set-password" options={{ title: '' }} />
      </Stack>
    </AuthFlowContext.Provider>
  );
}
