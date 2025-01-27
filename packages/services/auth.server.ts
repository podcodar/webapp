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
