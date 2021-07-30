import type { AppProps } from "next/app";

import Layout from "@packages/components/Layout";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Metadata from "@packages/components/Metadata";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <CSSReset />
        <Metadata />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
