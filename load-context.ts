import type { AppLoadContext } from "@remix-run/cloudflare";
import type { PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
		extra: string; // augmented
	}
}

type GetLoadContext = (args: {
	request: Request;
	context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = ({ context }) => {
	return {
		...context,
		extra: "stuff",
	};
};
