"use client";

import { useState } from "react";

import { type Analytics, getAnalyticsInstance } from "@packages/services/analytics";
import { type ChildrenProps, createCtx, useEffectOnce } from "@packages/utils/react";

const [useFirebaseServices, FirebaseServicesProvider] = createCtx<{
  analytics: Analytics | null;
}>("firebase-context");

export function FirebaseProvider({ children }: ChildrenProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffectOnce(() => {
    // run after DOM is available (analytics depends on it)
    setAnalytics(getAnalyticsInstance());
  });

  return <FirebaseServicesProvider value={{ analytics }}>{children}</FirebaseServicesProvider>;
}

export { useFirebaseServices };
