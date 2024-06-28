import {
  makeFirestoreDAO,
  type FirestoreDAO,
} from '@packages/repositories/firestore';

import type { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
import type { Testimonial } from '@packages/entities/testimonials';

interface TestimonialProps {
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
}: TestimonialProps) {
  const testimonialsService = getTestimonialInstance();
  const member = await fetch(
    `https://api.github.com/users/${gitUsername}`,
  ).then((r) => r.json());

  if (member.message === 'Not Found') {
    return 'toast.invalidUserError';
  }
  try {
    await testimonialsService.add({
      name: name,
      text: testimonial,
      profileUrl: member.html_url,
      avatarUrl: member.avatar_url,
      approved: false,
    });
  } catch (e) {
    return 'toast.serverError';
  }
  return;
}
