import { useState } from 'react';

import { ChildrenProps, useEffectOnce } from '@packages/utils/react';
import createCtx from '@packages/utils/createCtx';

import {
  FirebaseWebServices,
  getFirebaseWebServices,
} from './services/firebase';

const [useFirebaseServices, FirebaseServicesProvider] =
  createCtx<FirebaseWebServices>('firebase-context');

export function FirebaseProvider({ children }: ChildrenProps) {
  const [services, setServices] = useState<FirebaseWebServices | null>(null);

  useEffectOnce(() => {
    // run after DOM is available (analytics depends on it)
    setServices(getFirebaseWebServices());
  });

  return (
    <FirebaseServicesProvider value={services}>
      {children}
    </FirebaseServicesProvider>
  );
}

export { useFirebaseServices };
