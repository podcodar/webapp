import Section from "@packages/components/Section";
import { auth } from "@packages/services/auth";
import { authCookie, hasValidSession } from "@packages/services/auth.server";
import { type LoaderFunctionArgs, Outlet, redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // if it's not the login page, ignore auth check
  const isLogin = url.pathname === auth.urls.signIn;
  if (isLogin) return;

  // if no auth token, redirect to refresh
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader);
  if (!token) {
    return redirect(auth.urls.refresh, {
      headers: { redirect: url.pathname },
    });
  }

  const isAuth = await hasValidSession(request);
  if (!isAuth) {
    return redirect(auth.urls.signOut);
  }

  return redirect(auth.urls.signIn);
}

export default function AdminPage() {
  return (
    <Section className="px-0 pt-32 min-h-[100vh]">
      <Outlet />
    </Section>
  );
}
