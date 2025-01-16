import { GithubIcon } from "@packages/components/icons/GithubIcon";
import {
	type ActionFunction,
	type ActionFunctionArgs,
	Form,
	useActionData,
	useLoaderData,
} from "react-router";

const REDIRECT_URI = "http://localhost:3000/api/auth/callback/github";
export function loader() {
	return { title: "Login", redirectUri: REDIRECT_URI };
}

export async function action({ request }: ActionFunctionArgs) {
	const url = new URL(request.url);
	// TODO: setup a redirect to GitHub provider
	return { title: "Signed In", redirectUri: url };
}

export default function LoginPage({ errors = "" }) {
	const initialState = useLoaderData<typeof loader>();
	const currentState = useActionData<typeof action>();

	console.log({ initialState, currentState });

	const githubButton = (
		<div className="flex items-center gap-2">
			<GithubIcon />
			<span>{currentState?.title ?? initialState.title} with GitHub</span>
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

				<Form className="grid gap-4" method="post">
					<button
						className="btn btn-outline btn-secondary w-full"
						type="submit"
					>
						{githubButton}
					</button>

					<p className="text-xs text-gray-500">
						We use GitHub for authentication to keep things simple and secure.
					</p>
				</Form>

				{errors && <p className="text-red-500">{errors}</p>}
			</div>
		</div>
	);
}
