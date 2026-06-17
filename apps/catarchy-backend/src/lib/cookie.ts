import { Cookie } from "elysia";

export const setAuthCookie = (
  ref: Cookie<string | undefined>,
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
