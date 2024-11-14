import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import AuthService from '@/service/auth.service';

const AuthContext = createContext<{
  signIn: (email?: string, password?: string) => void;
  signOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  accessToken: null,
  refreshToken: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useToken() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAccessToken must be wrapped in a <AccessTokenProvider />');
    }
  }

  return value;
}

export function TokenProvider(props: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] = useStorageState('accessToken');
  const [[, refreshToken], setRefreshToken] = useStorageState('refreshToken');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string = 'test@test.com', password: string = 'test123') => {
          const { accessToken, refreshToken } = await AuthService.signIn({
            email,
            password
          });

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        },
        signOut: () => {
          setAccessToken(null);
          setRefreshToken(null);
        },
        accessToken,
        refreshToken,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
