import { initializeApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

import firebaseConfig from '@packages/config/firebase';

import type { Member } from '@packages/entities/members';
import type { Result } from '@packages/utils/functions';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getFirebaseWebServices(): FirebaseWebServices {
  // Initialize Firebase services
  const analytics = getAnalytics(app);
  return { analytics };
}

export function getFirebaseApiServices(): FirebaseApiServices {
  const memberCollection = collection(db, 'members');

  async function addMembers(member: Member): Promise<Result<AddMemberResp>> {
    try {
      const docRef = await addDoc(memberCollection, member);
      const resp: AddMemberResp = { id: docRef.id };

      return [resp, null];
    } catch (e) {
      return [null, e as Error];
    }
  }

  async function getMembers(): Promise<Result<Member[]>> {
    try {
      const querySnapshot = await getDocs(memberCollection);
      const resp = querySnapshot.docs.map((doc) => doc.data() as Member);

      return [resp, null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  return {
    db: { getMembers, addMembers },
  };
}

export interface FirebaseWebServices {
  analytics: Analytics;
}

interface FirebaseApiServices {
  db: {
    addMembers: (member: Member) => Promise<Result<AddMemberResp>>;
    getMembers: () => Promise<Result<Member[]>>;
  };
}

interface AddMemberResp {
  id: string;
}
