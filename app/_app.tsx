import { useIsClient } from "@packages/utils/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
