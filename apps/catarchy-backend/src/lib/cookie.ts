type CookieRef = {
  value: string | undefined;
  maxAge: number | undefined;
  httpOnly: boolean | undefined;
  secure: boolean | undefined;
  sameSite: "lax" | "strict" | "none" | boolean | undefined;
  path: string | undefined;
};

export const setAuthCookie = (
  ref: CookieRef,
  value: string,
  maxAge: number,
  isProd: boolean,
) => {
  ref.value = value;
  ref.maxAge = maxAge;
  ref.httpOnly = true;
  ref.secure = isProd;
  ref.sameSite = "strict";
  ref.path = "/";
};
