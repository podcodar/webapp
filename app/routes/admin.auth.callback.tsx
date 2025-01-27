import { auth } from "@packages/services/auth";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import { type LoaderFunctionArgs, redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const code = params.get("code");
  const state = params.get("state");

  console.debug({ code, state });

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  if (!state) {
    return new Response("Missing state", { status: 400 });
  }

  const token = await auth.fetchAccessToken(code, state);
  if (!token) {
    return new Response("Failed to fetch access token", { status: 401 });
  }

  const redirectUrl = request.headers.get("redirect") ?? "/admin/dashboard";
  const [authHeader, refreshHeader] = await Promise.all([
    authCookie.serialize(token.access_token, { maxAge: token.expires_in }),
    refreshCookie.serialize(token.refresh_token, {
      maxAge: token.refresh_token_expires_in,
    }),
  ]);

  const headers = new Headers();
  headers.append("Set-Cookie", refreshHeader);
  headers.append("Set-Cookie", authHeader);

  // TODO: create user
  // TODO: set user info in cookies

  return redirect(redirectUrl, { headers });
}
