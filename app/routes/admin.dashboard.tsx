import { GithubIcon } from "@packages/components/icons/GithubIcon";
import { auth } from "@packages/services/auth";
import { useLoaderData } from "react-router";

export function loader() {
  return { signOutUrl: auth.urls.signOut };
}

export default function AdminDashboard() {
  const { signOutUrl } = useLoaderData<typeof loader>();

  const githubButton = (
    <div className="flex items-center gap-2">
      <GithubIcon />
      <span>Click here to sign-out</span>
    </div>
  );

  return (
    <div className="card shadow-md max-w-96 mx-auto">
      <div className="card-body gap-8">
        <div className="header text-center">
          <h1 className="text-3xl">
            Welcome to <span className="text-primary">PodCodar Admin 👋</span>
          </h1>

          <h2 className="text-sm font-light">
            You are signed with GitHub! Note that this page still in progress 🚧
          </h2>
        </div>

        <a
          href={signOutUrl}
          className="btn btn-outline btn-secondary w-full"
          type="submit"
        >
          {githubButton}
        </a>

        <p className="text-xs text-gray-500">
          We use GitHub for authentication to keep things simple and secure.
        </p>
      </div>
    </div>
  );
}
