import { ADMIN_ROUTES } from "@packages/contants";
import { authCookie, refreshCookie } from "@packages/services/auth.server";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const [authToken, refreshToken] = await Promise.all([
    authCookie.serialize("", { maxAge: -1 }),
    refreshCookie.serialize("", { maxAge: -1 }),
  ]);

  const headers = new Headers();
  headers.append("Set-Cookie", authToken);
  headers.append("Set-Cookie", refreshToken);

  return redirect(ADMIN_ROUTES.signIn, { headers });
}
