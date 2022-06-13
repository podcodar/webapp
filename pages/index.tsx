import { GetStaticProps } from 'next';

import CallToActionSection from '@packages/components/CallToActionSection';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';
import TestimonialSection from '@packages/components/TestimonialSection';
import TechSection from '@packages/components/TechSection';
import { Testimonial } from '@packages/entities/testimonials';
import { getTestimonialInstance } from '@packages/services/testimonials';

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
  const testimonialsService = getTestimonialInstance();

  let testimonials: Testimonial[] | null = null;
  let error: Error | null = null;

  try {
    await testimonialsService.add({
      name: 'Guilherme Barbosa',
      text: 'fala turma bao ? ses gosta de queijo ?',
      profileUrl: '',
      avatarUrl: '',
    });
    testimonials = await testimonialsService.list();
  } catch (e) {
    //error = e as Error;
  }

  return {
    revalidate: 100, // In Seconds
    // will be passed to the page component as props
    props: { testimonials, error },
  };
};
