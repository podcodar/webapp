import { auth } from "@packages/services/auth";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import { redirect } from "react-router";

export async function loader() {
  const [authToken, refreshToken] = await Promise.all([
    authCookie.serialize("", { maxAge: -1 }),
    refreshCookie.serialize("", { maxAge: -1 }),
  ]);

  const headers = new Headers();
  headers.append("Set-Cookie", authToken);
  headers.append("Set-Cookie", refreshToken);

  return redirect(auth.urls.signIn, {
    headers,
  });
}
