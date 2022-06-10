import CallToActionSection from '@packages/components/CallToActionSection';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';
import TestimonialSection from '@packages/components/TestimonialSection';
import TechSection from '@packages/components/TechSection';

export default function Home() {
  return (
    <>
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <TestimonialSection />
      <TechSection />
      <Footer />
    </>
  );
}
