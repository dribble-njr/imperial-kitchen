import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import AuthService from '@/service/auth.service';
import { User } from '../../../packages/types/src/user/user.vo';

const AuthContext = createContext<{
  signIn: (email?: string, password?: string) => void;
  signOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
  userInfo?: Omit<User, 'role'> | null;
}>({
  signIn: () => null,
  signOut: () => null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  userInfo: null
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
  const [[, userInfo], setUserInfo] = useStorageState<Omit<User, 'role'> | null>('userInfo');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string = 'test@test.com', password: string = 'test123') => {
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
        isLoading,
        userInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
