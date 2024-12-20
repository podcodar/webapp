"use client";

import I18nProvider from "@packages/locale/context";
import { useIsClient } from "@packages/utils/react";
import { Suspense } from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  // FIXME: handle i18n on the server side
  const isClient = useIsClient();
  const fallback = (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Loading...</p>
    </div>
  );

  if (!isClient) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <I18nProvider>
        <NavBar />

        {children}
      </I18nProvider>
    </Suspense>
  );
}
