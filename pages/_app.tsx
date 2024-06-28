import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import Layout from "@packages/components/Layout";
import Metadata from "@packages/components/Metadata";
import ModalProvider from "@packages/features/modal-context";
import I18nProvider from "@packages/features/i18n-context";
import { FirebaseProvider } from "@packages/features/firebase-context";
import { withProviders } from "@packages/utils/react";

import type { AppProps } from "next/app";
import { Suspense } from "react";
import { useIsClient } from "@packages/hooks/useIsClient";

function MyApp({ Component, pageProps }: AppProps) {
	const isClient = useIsClient();

	if (!isClient) {
		return null;
	}

	return (
		<Suspense fallback={<p>Loading</p>}>
			{withProviders(
				<Layout>
					<CSSReset />
					<Metadata />
					<Component {...pageProps} />
				</Layout>,
				providers,
			)}
		</Suspense>
	);
}

const providers = [ModalProvider, FirebaseProvider, ChakraProvider, I18nProvider];

export default MyApp;
