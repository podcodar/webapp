"use client";

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
      <I18nProvider>
        <Layout>
          <Metadata />
          {children}
        </Layout>
      </I18nProvider>
    </Suspense>
  );
}
