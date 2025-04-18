import { createContext, useContext, PropsWithChildren, useEffect } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { User } from '@/types';
import { eventBus, SignInPayload } from '@/utils/event-bus';
import { useRouter } from 'expo-router';

const AuthContext = createContext<{
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  isLoading: boolean;
  userInfo?: User | null;
}>({
  signIn: () => {},
  signOut: () => {},
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  isLoading: false,
  userInfo: null
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] = useStorageState('accessToken');
  const [[, refreshToken], setRefreshToken] = useStorageState('refreshToken');
  const [[, userInfo], setUserInfo] = useStorageState<User | null>('userInfo');

  const router = useRouter();

  const handleSignOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    router.push('/guide');
  };

  const handleSignIn = (payload?: SignInPayload) => {
    if (payload) {
      setAccessToken(payload.accessToken);
      setRefreshToken(payload.refreshToken);
      setUserInfo(payload.userInfo);
    }
    router.push('/');
  };

  useEffect(() => {
    eventBus.on('signOut', handleSignOut);
    eventBus.on('signIn', handleSignIn);

    return () => {
      eventBus.off('signOut', handleSignOut);
      eventBus.off('signIn', handleSignIn);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isLoading,
        userInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
