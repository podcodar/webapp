import { GithubIcon } from "@packages/components/icons/GithubIcon";
import { getAuth } from "@packages/services/auth";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectUri = getAuth(context).generateAuthUrl(url.origin);

  return { title: "Login", redirectUri };
}

export default function LoginPage({ errors = "" }) {
  const initialState = useLoaderData<typeof loader>();

  const githubButton = (
    <div className="flex items-center gap-2">
      <GithubIcon />
      <span>{initialState.title} with GitHub</span>
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
            Welcome back! Please sign in to continue
          </h2>
        </div>

        <a
          href={initialState.redirectUri}
          className="btn btn-outline btn-secondary w-full"
          type="submit"
        >
          {githubButton}
        </a>

        <p className="text-xs text-gray-500">
          We use GitHub for authentication to keep things simple and secure.
        </p>

        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    </div>
  );
}
