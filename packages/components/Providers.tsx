"use client";

import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import Layout from "@packages/components/Layout";
import Metadata from "@packages/components/Metadata";
import I18nProvider from "@packages/locale/context";
import { useIsClient } from "@packages/utils/react";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <ChakraProvider>
        <I18nProvider>
          <Layout>
            <CSSReset />
            <Metadata />
            {children}
          </Layout>
        </I18nProvider>
      </ChakraProvider>
    </Suspense>
  );
}
