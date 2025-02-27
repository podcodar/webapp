import Link from "@packages/components/Link";
import Section from "@packages/components/Section";
import { TabNav } from "@packages/components/TabNav";
import { ADMIN_ROUTES } from "@packages/contants";
import { authCookie } from "@packages/services/auth.server";
import {
  type LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
} from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("Cookie");
  const accessToken = await authCookie.parse(cookieHeader);

  if (!accessToken) {
    if (url.pathname === ADMIN_ROUTES.signIn) return { isAuthorized: false };

    return redirect(ADMIN_ROUTES.refresh, {
      headers: { redirect: url.pathname },
    });
  }

  // /admin, /admin/login -> /admin/dashboard
  if (
    url.pathname.match(/^\/admin\/?$/) ||
    url.pathname === ADMIN_ROUTES.signIn
  ) {
    return redirect(ADMIN_ROUTES.dashboard);
  }

  const selectedTab =
    url.pathname
      .replace(/^\/admin\//, "")
      .split("/")
      .pop() ?? "";

  return { isAuthorized: true, selectedTab };
}

export default function AdminPage() {
  const { isAuthorized, selectedTab = "" } = useLoaderData<typeof loader>();
  const header = (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl">
          Welcome to <span className="text-primary">PodCodar Admin 👋</span>
        </h1>

        <Link
          className="btn btn-sm btn-error btn-outline rounded-full"
          href={ADMIN_ROUTES.signOut}
        >
          Sign Out
        </Link>
      </div>

      <h2 className="text-sm font-light">
        You are signed with GitHub! Note that this page still in progress 🚧
      </h2>
    </>
  );

  const tabs = [
    { id: "dashboard", title: "Dashboard" },
    { id: "members", title: "Members" },
    { id: "testimonials", title: "Testimonials" },
  ];

  return (
    <Section className="px-0 pt-32 min-h-[100vh]">
      <TabNav
        hidden={!isAuthorized}
        activeTab={selectedTab}
        header={header}
        tabs={tabs}
      >
        <Outlet />
      </TabNav>
    </Section>
  );
}
