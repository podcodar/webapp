import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import {
  makeFirestoreDAO,
  FirestoreDAO,
} from '@packages/repositories/firestore';
import { Testimonial } from '@packages/entities/testimonials';

interface testimonialProps {
  name: string;
  testimonial: string;
  gitUsername: string;
}

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

export async function addTestimonial({
  name,
  testimonial,
  gitUsername,
}: testimonialProps) {
  const testimonialsService = getTestimonialInstance();
  try {
    const member = await fetch(
      `https://api.github.com/users/${gitUsername}`,
    ).then((r) => r.json());

    await testimonialsService.add({
      name: name,
      text: testimonial,
      profileUrl: member.html_url,
      avatarUrl: member.avatar_url,
      approved: false,
    });
  } catch (e) {
    return e;
  }
  return 0;
}
