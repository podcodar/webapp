import { ADMIN_ROUTES } from "@packages/contants";
import { getAuth } from "@packages/services/auth";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import { type LoaderFunctionArgs, redirect } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const cookies = request.headers.get("Cookie");
  const [authToken, refreshToken] = await Promise.all([
    authCookie.parse(cookies),
    refreshCookie.parse(cookies),
  ]);

  if (authToken) return redirect(ADMIN_ROUTES.dashboard);
  if (!refreshToken) return redirect(ADMIN_ROUTES.signIn);

  const token = await getAuth(context).refreshAccessToken(refreshToken);

  const redirectUrl = request.headers.get("redirect") ?? ADMIN_ROUTES.dashboard;
  const [authHeader, refreshHeader] = await Promise.all([
    authCookie.serialize(token.access_token, { maxAge: token.expires_in }),
    refreshCookie.serialize(token.refresh_token, {
      maxAge: token.refresh_token_expires_in,
    }),
  ]);

  const headers = new Headers();
  headers.append("Set-Cookie", refreshHeader);
  headers.append("Set-Cookie", authHeader);

  return redirect(redirectUrl, { headers });
}
