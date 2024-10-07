import { db } from "@packages/repositories/db";
import { testimonialsTable } from "@packages/repositories/db/schema";
import type { InsertTestimonial } from "@packages/repositories/db/schema";
import { getTestimonialInstance } from "@packages/services/testimonials";

const firebaseTestimonials = getTestimonialInstance();

async function execute() {
  const testimonialsList = await firebaseTestimonials.list();

  for (const testimonial of testimonialsList) {
    const newTestimonial: InsertTestimonial = {
      name: testimonial.name,
      avatarUrl: testimonial.avatarUrl,
      profileUrl: testimonial.profileUrl,
      description: testimonial.text,
    };
    const res = await db.insert(testimonialsTable).values(newTestimonial);
    console.log({
      res,
    });
  }
}

execute().catch((e) => {
  console.error(e);
  process.exit(1);
});
