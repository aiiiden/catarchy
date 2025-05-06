import { useStore } from '@nanostores/react';
import { persistentMap } from '@nanostores/persistent';

export interface AuthState {
  token: string;
  [key: string]: string;
}

export const localStorageKey = '@catarchy/auth/';

export const $auth = persistentMap<AuthState>(localStorageKey, {
  token: '',
});

export function setAuth(auth: Partial<AuthState>) {
  if (auth.token) {
    $auth.setKey('token', auth.token);
  }
}

export function getAuth() {
  return $auth.get();
}

export function useAuth() {
  const auth = useStore($auth);

  return {
    auth,
    setAuth,
  };
}
