import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import {
  makeFirestoreDAO,
  FirestoreDAO,
} from '@packages/repositories/firestore';
import { Testimonial } from '@packages/entities/testimonials';

let testimonials: undefined | FirestoreDAO<Testimonial>;
export function getTestimonialInstance() {
  if (testimonials != null) return testimonials;

  testimonials = makeFirestoreDAO<Testimonial>({
    collectionName: 'testimonials',
    processItem: processQuestionSnapshot,
  });
  return testimonials;
}

function processQuestionSnapshot(doc: QueryDocumentSnapshot<DocumentData>) {
  return {
    ...doc.data(),
    id: doc.id,
  } as Testimonial;
}
