import { VALID_EMAILS } from "@packages/contants";
import { getAuth } from "@packages/services/auth";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import { type LoaderFunctionArgs, redirect } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const code = params.get("code");
  const state = params.get("state");

  const auth = getAuth(context);

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  if (!state) {
    return new Response("Missing state", { status: 400 });
  }

  // FIXME: validate state
  // assert(auth.isValidState(state), "Invalid state");

  const token = await auth.fetchAccessToken(code);
  if (!token) {
    return new Response("Failed to fetch access token", { status: 401 });
  }

  const profile = await auth.fetchAuthenticatedUser(token.access_token);
  if (!VALID_EMAILS.some((reEmail) => reEmail.test(profile.email))) {
    // NOTE: this log is required to get information on people trying to access our app without authorization
    console.debug({ profile, status: "401" });
    return new Response("Unauthorized user, your attempt will be reported", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const redirectUrl = request.headers.get("redirect") ?? "/admin/dashboard";
  const [authHeader, refreshHeader] = await Promise.all([
    authCookie.serialize(token.access_token, { maxAge: token.expires_in }),
    refreshCookie.serialize(token.refresh_token, {
      maxAge: token.refresh_token_expires_in,
    }),
  ]);

  // check if its a valid user
  const headers = new Headers();
  headers.append("Set-Cookie", refreshHeader);
  headers.append("Set-Cookie", authHeader);

  // TODO: create user
  // TODO: set user info in cookies

  return redirect(redirectUrl, { headers });
}
