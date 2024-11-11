import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [T | null, (value: T | null) => void];

// function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
//   return React.useReducer(
//     (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
//     initialValue
//   ) as UseStateHook<T>;
// }

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export async function removeStorageItemAsync(key: string) {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function getStorageItemAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  }
  return await SecureStore.getItemAsync(key);
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useState<string | null>(null);

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
