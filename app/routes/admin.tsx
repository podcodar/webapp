import Section from "@packages/components/Section";
import { auth } from "@packages/services/auth";
import { authCookie } from "@packages/services/auth.server";
import { type LoaderFunctionArgs, Outlet, redirect } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("Cookie");
  const accessToken = await authCookie.parse(cookieHeader);

  if (!accessToken) {
    if (url.pathname === auth.urls.signIn) return;

    return redirect(auth.urls.refresh, {
      headers: { redirect: url.pathname },
    });
  }

  // /admin, /admin/login -> /admin/dashboard
  if (url.pathname.match(/^\/admin\/?$/) || url.pathname === auth.urls.signIn) {
    return redirect("/admin/dashboard");
  }
}

export default function AdminPage() {
  return (
    <Section className="px-0 pt-32 min-h-[100vh]">
      <Outlet />
    </Section>
  );
}
