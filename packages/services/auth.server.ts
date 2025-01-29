import { MAX_COOKIE_AGE } from "@packages/contants";
import { createCookie } from "react-router";

export const authCookie = createCookie("auth-cookie", {
  path: "/",
  maxAge: MAX_COOKIE_AGE,
});

export const refreshCookie = createCookie("refresh-cookie", {
  path: "/",
  maxAge: MAX_COOKIE_AGE,
});

export async function hasValidSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const [authToken, refreshToken] = await Promise.all([
    authCookie.parse(cookieHeader),
    refreshCookie.parse(cookieHeader),
  ]);

  return authToken && refreshToken;
}
