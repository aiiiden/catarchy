import { useSyncExternalStore } from "react";
import {
  getAccessToken,
  getRefreshToken,
  subscribeAuth,
} from "../lib/auth-store";

type AuthSnapshot = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

let cachedSnapshot: AuthSnapshot = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

function getSnapshot(): AuthSnapshot {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (
    cachedSnapshot.accessToken === accessToken &&
    cachedSnapshot.refreshToken === refreshToken
  ) {
    return cachedSnapshot;
  }
  cachedSnapshot = {
    accessToken,
    refreshToken,
    isAuthenticated: accessToken !== null,
  };
  return cachedSnapshot;
}

export function useAuth() {
  return useSyncExternalStore(subscribeAuth, getSnapshot, getSnapshot);
}
