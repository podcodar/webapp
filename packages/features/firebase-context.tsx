import { useState } from 'react';

import { type ChildrenProps, useEffectOnce } from '@packages/utils/react';
import createCtx from '@packages/utils/createCtx';
import {
  getAnalyticsInstance,
  type Analytics,
} from '@packages/services/analytics';

const [useFirebaseServices, FirebaseServicesProvider] = createCtx<{
  analytics: Analytics | null;
}>('firebase-context');

export function FirebaseProvider({ children }: ChildrenProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffectOnce(() => {
    // run after DOM is available (analytics depends on it)
    setAnalytics(getAnalyticsInstance());
  });

  return (
    <FirebaseServicesProvider value={{ analytics }}>
      {children}
    </FirebaseServicesProvider>
  );
}

export { useFirebaseServices };
