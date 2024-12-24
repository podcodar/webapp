import { MAX_COOKIE_AGE } from "@packages/contants";
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const selectedTheme = createCookie("selected-theme", {
	path: "/",
	maxAge: MAX_COOKIE_AGE,
});
