import { initializeApp } from 'firebase/app';

import firebaseConfig from '@packages/config/firebase';

export const app = initializeApp(firebaseConfig);
