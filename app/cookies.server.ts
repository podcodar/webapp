import { MAX_COOKIE_AGE } from "@packages/contants";
import { createCookie } from "react-router";

export const selectedTheme = createCookie("selected-theme", {
	path: "/",
	maxAge: MAX_COOKIE_AGE,
});
