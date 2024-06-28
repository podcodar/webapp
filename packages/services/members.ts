import {
  makeFirestoreDAO,
  type FirestoreDAO,
} from '@packages/repositories/firestore';

import type { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
import type { Member } from '@packages/entities/members';

let members: undefined | FirestoreDAO<Member>;
export function getMemberInstance() {
  if (members != null) return members;

  members = makeFirestoreDAO<Member>({
    collectionName: 'members',
    processItem: processMemberDocumentSnapshot,
  });
  return members;
}

function processMemberDocumentSnapshot(
  doc: QueryDocumentSnapshot<DocumentData>,
) {
  return {
    ...doc.data(),
    id: doc.id,
  } as Member;
}
