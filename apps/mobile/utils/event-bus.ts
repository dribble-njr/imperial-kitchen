import { User } from '@/types';

type EventType = 'signIn' | 'signOut' | 'message';

export interface SignInPayload {
  accessToken: string;
  refreshToken: string;
  userInfo: User;
}

type EventPayloadMap = {
  signIn: SignInPayload;
  signOut: void;
  message: string;
};

type Listener<T> = (payload: T) => void;

const listeners: {
  [K in EventType]: Listener<EventPayloadMap[K]>[];
} = {
  signIn: [],
  signOut: [],
  message: []
};

export const eventBus = {
  emit<K extends EventType>(event: K, payload?: EventPayloadMap[K]) {
    listeners[event].forEach((callback) => callback(payload as EventPayloadMap[K]));
  },
  on<K extends EventType>(event: K, callback: (payload: EventPayloadMap[K]) => void) {
    listeners[event].push(callback);
  },
  off<K extends EventType>(event: K, callback: (payload: EventPayloadMap[K]) => void) {
    const index = listeners[event].indexOf(callback);
    if (index > -1) {
      listeners[event].splice(index, 1);
    }
  }
};
