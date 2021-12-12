import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { app } from '@packages/repositories/firebase';

export interface FirestoreArgs<T> {
  collectionName: string;
  processItem: (doc: QueryDocumentSnapshot<DocumentData>) => T;
}

export interface FirestoreResponse {
  id: string;
}

export interface FirestoreDAO<T> {
  add: (item: T) => Promise<FirestoreResponse>;
  update: (id: string, item: Object) => Promise<FirestoreResponse>;
  list: () => Promise<T[]>;
}

/**
 * This function creates an Firestore Data Access Object (DAO) for a given entity
 */
export function makeFirestoreDAO<T>({
  collectionName,
  processItem,
}: FirestoreArgs<T>): FirestoreDAO<T> {
  const db = getFirestore(app);
  const dbCollection = collection(db, collectionName);
  return {
    add: async (item: T) => {
      const docRef = await addDoc(dbCollection, item);
      return { id: docRef.id };
    },
    update: async (id: string, item: Object) => {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...item } as any);
      return { id: docRef.id };
    },
    list: async () => {
      const querySnapshot = await getDocs(dbCollection);
      return querySnapshot.docs.map(processItem);
    },
  };
}
