import CallToActionSection from '@packages/components/CallToActionSection';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import TestimonialSection from '@packages/components/TestimonialSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';

export default function Home() {
  return (
    <>
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <TestimonialSection />
      <RoadmapSection />
      <Footer />
    </>
  );
}
