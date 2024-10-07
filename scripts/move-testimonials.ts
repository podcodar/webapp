import { db } from "@packages/repositories/db";
import { testimonialsTable } from "@packages/repositories/db/schema";
import type { InsertTestimonial } from "@packages/repositories/db/schema";
import { getTestimonialInstance } from "@packages/services/testimonials";

const firebaseTestimonials = getTestimonialInstance();

async function execute() {
  const testimonialsList = await firebaseTestimonials.list();

  await Promise.allSettled(
    testimonialsList.map(async (testimonial) => {
      const newTestimonial: InsertTestimonial = {
        name: testimonial.name,
        avatarUrl: testimonial.avatarUrl,
        profileUrl: testimonial.profileUrl,
        description: testimonial.text,
      };

      console.log({ testimonial, newTestimonial });
      return db.insert(testimonialsTable).values(newTestimonial);
    }),
  );
}

execute().catch((e) => {
  console.error(e);
  process.exit(1);
});
