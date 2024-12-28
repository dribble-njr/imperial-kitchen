import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import AuthService from '@/service/auth.service';
import { User } from '@imperial-kitchen/types';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  isLoading: boolean;
  userInfo?: Omit<User, 'role'> | null;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
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
  const [[, userInfo], setUserInfo] = useStorageState<Omit<User, 'role'> | null>('userInfo');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          const { accessToken, refreshToken, userInfo } = await AuthService.signIn({
            email,
            password
          });

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setUserInfo(userInfo);
        },
        signOut: () => {
          setAccessToken(null);
          setRefreshToken(null);
          setUserInfo(null);
        },
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
