import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { UserService } from '../service';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          UserService.signIn('test', 'test');
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
