import { initializeApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { useState } from 'react';

import { ChildrenProps, useEffectOnce } from '@packages/utils/react';
import createCtx from '@packages/utils/createCtx';
import firebaseConfig from '@packages/config/firebase';

interface FirebaseServices {
  analytics: Analytics;
}

const [useFirebaseServices, FirebaseServicesProvider] =
  createCtx<FirebaseServices>('firebase-context');

function setupFirebase(): FirebaseServices {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return { analytics };
}

export function FirebaseProvider({ children }: ChildrenProps) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffectOnce(() => {
    // run after DOM is available (analytics depends on it)
    setServices(setupFirebase());
  });

  return (
    <FirebaseServicesProvider value={services}>
      {children}
    </FirebaseServicesProvider>
  );
}

export { useFirebaseServices };
