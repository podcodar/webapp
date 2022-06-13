import { GetStaticProps } from 'next';

import CallToActionSection from '@packages/components/CallToActionSection';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';
import TestimonialSection from '@packages/components/TestimonialSection';
import TechSection from '@packages/components/TechSection';
import { Testimonial } from '@packages/entities/testimonials';

interface Props {
  testimonials: Testimonial[] | null;
  error: Error | null;
}

export default function Home(props: Props) {
  return (
    <>
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <TechSection />
      <TestimonialSection testimonials={props.testimonials ?? []} />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let testimonials: Testimonial[] | null = null;
  let error: Error | null = null;

  return {
    revalidate: 100, // In Seconds
    // will be passed to the page component as props
    props: { testimonials, error },
  };
};
