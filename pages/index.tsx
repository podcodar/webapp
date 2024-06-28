import CallToActionSection from '@packages/components/CallToActionSection';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';
import TestimonialSection from '@packages/components/TestimonialSection';
import TechSection from '@packages/components/TechSection';
import { getTestimonialInstance } from '@packages/services/testimonials';

import type { Testimonial } from '@packages/entities/testimonials';
import type { GetStaticProps } from 'next';

interface Props {
  testimonials: Testimonial[] | null;
  error: string | null;
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
  const testimonialsService = getTestimonialInstance();

  let testimonials: Testimonial[] | null = null;
  let error: Error | null = null;

  try {
    testimonials = await (
      await testimonialsService.list()
    ).filter((t) => t.approved === true);
  } catch (e) {
    error = e as Error;
  }

  return {
    revalidate: 100, // In Seconds
    // will be passed to the page component as props
    props: { testimonials, error: error?.message || null },
  };
};
