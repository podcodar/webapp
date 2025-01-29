import { ADMIN_ROUTES, VALID_EMAILS } from "@packages/contants";
import { getAuth } from "@packages/services/auth";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import { logger } from "@packages/services/logger";
import { type LoaderFunctionArgs, redirect } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const code = params.get("code");
  const state = params.get("state");

  const auth = getAuth(context);

  if (!code) {
    logger.error("missing code");
    return new Response("Missing code", { status: 400 });
  }

  if (!state) {
    logger.error("missing state");
    return new Response("Missing state", { status: 400 });
  }

  // FIXME: validate state
  // assert(auth.isValidState(state), "Invalid state");

  const token = await auth.fetchAccessToken(code);

  logger.info("access token fetched", { token });

  if (!token) {
    logger.error("missing token");
    return new Response("Failed to fetch access token", { status: 401 });
  }

  const profile = await auth.fetchAuthenticatedUser(token.access_token);
  const shouldBlock = !VALID_EMAILS.some((reEmail) =>
    reEmail.test(profile.email),
  );

  logger.info("fetched user profile", { token, shouldBlock });

  if (shouldBlock) {
    logger.error({ profile, status: "401" });

    return new Response("Unauthorized user, your attempt will be reported", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  logger.info("user authorized, serializing acookies");

  const redirectUrl = request.headers.get("redirect") ?? ADMIN_ROUTES.dashboard;
  const [authHeader, refreshHeader] = await Promise.all([
    authCookie.serialize(token.access_token, { maxAge: token.expires_in }),
    refreshCookie.serialize(token.refresh_token, {
      maxAge: token.refresh_token_expires_in,
    }),
  ]);

  logger.info("cookies serialized, setting headers");

  // check if its a valid user
  const headers = new Headers();
  headers.append("Set-Cookie", refreshHeader);
  headers.append("Set-Cookie", authHeader);

  // TODO: create user
  // TODO: set user info in cookies

  logger.info("redirecting to dashboard", { redirectUrl, headers });

  return redirect(redirectUrl, { headers });
}
