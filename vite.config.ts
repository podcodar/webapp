import viteYaml from "@modyfi/vite-plugin-yaml";
import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { getLoadContext } from "./load-context";

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({
			getLoadContext,
		}),
		viteYaml(),
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				v3_singleFetch: true,
				v3_lazyRouteDiscovery: true,
			},
			routes(defineRoutes) {
				return defineRoutes((route) => {
					route("/*", "catchall.tsx");
				});
			},
		}),
		tsconfigPaths(),
	],
});
