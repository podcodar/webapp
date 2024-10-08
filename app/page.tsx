import CallToActionSection from "@packages/components/CallToActionSection";
import Footer from "@packages/components/Footer";
import MentoringSection from "@packages/components/MentoringSection";
import RoadmapSection from "@packages/components/RoadmapSection";
import TechSection from "@packages/components/TechSection";
import TestimonialSection from "@packages/components/TestimonialSection";
import WhyItWorksSection from "@packages/components/WhyItWorksSection";
import { db } from "@packages/repositories/db";
import { testimonialsTable } from "@packages/repositories/db/schema";

export default async function Home() {
  const testimonials = await fetchTestimonials();

  return (
    <>
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <TechSection />
      <TestimonialSection testimonials={testimonials} />
      <Footer />
    </>
  );
}

async function fetchTestimonials() {
  "use server";
  const testimonials = await db.select().from(testimonialsTable);
  return testimonials;
}
