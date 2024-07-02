import { makeFirestoreDAO, type FirestoreDAO } from "@packages/repositories/firestore";

import type { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import type { Question } from "@packages/entities/questions";

let questions: undefined | FirestoreDAO<Question>;
export function getQuestionInstance() {
  if (questions != null) return questions;

  questions = makeFirestoreDAO<Question>({
    collectionName: "questions",
    processItem: processQuestionSnapshot,
  });
  return questions;
}

function processQuestionSnapshot(doc: QueryDocumentSnapshot<DocumentData>) {
  return {
    ...doc.data(),
    id: doc.id,
  } as Question;
}
