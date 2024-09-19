import CallToActionSection from "@packages/components/CallToActionSection";
import Footer from "@packages/components/Footer";
import MentoringSection from "@packages/components/MentoringSection";
import RoadmapSection from "@packages/components/RoadmapSection";
import TechSection from "@packages/components/TechSection";
import TestimonialSection from "@packages/components/TestimonialSection";
import WhyItWorksSection from "@packages/components/WhyItWorksSection";
import { getTestimonialInstance } from "@packages/services/testimonials";

export default async function Home() {
  const testimonials = await getTestimonialInstance().list();
  const activeTestimonials = testimonials.filter((testimonial) => testimonial.approved) ?? [];

  return (
    <>
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <TechSection />
      <TestimonialSection testimonials={activeTestimonials} />
      <Footer />
    </>
  );
}
