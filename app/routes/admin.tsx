import Section from "@packages/components/Section";
import { type LoaderFunctionArgs, Outlet, redirect } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // if it's not the login page, ignore auth check
  const isLogin = url.pathname === "/admin/login";
  if (isLogin) return;

  // TODO: redirect if no sessions is available
  const session = null;
  const isAuth = !!session;
  if (!isAuth) {
    return redirect("/admin/login");
  }
}

export default function AdminPage() {
  return (
    <Section className="px-0 pt-32 min-h-[100vh]">
      <Outlet />
    </Section>
  );
}
