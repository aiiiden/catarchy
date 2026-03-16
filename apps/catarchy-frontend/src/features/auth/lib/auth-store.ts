const ACCESS_TOKEN_KEY = "catarchy_access_token";
const REFRESH_TOKEN_KEY = "catarchy_refresh_token";

const ACCESS_TOKEN_MAX_AGE = 4 * 60 * 60; // 4 hours
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

const listeners = new Set<() => void>();

export function subscribeAuth(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

export function setTokens(accessToken: string, refreshToken: string) {
  setCookie(ACCESS_TOKEN_KEY, accessToken, ACCESS_TOKEN_MAX_AGE);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_MAX_AGE);
  notifyListeners();
}

export function clearTokens() {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  notifyListeners();
}
