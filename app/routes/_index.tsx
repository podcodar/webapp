import Footer from "@packages/components/Footer";
import HeroSection from "@packages/components/HeroSection";
import MentoringSection from "@packages/components/MentoringSection";
import RoadmapSection from "@packages/components/RoadmapSection";
import TechSection from "@packages/components/TechSection";
import TestimonialSection from "@packages/components/TestimonialSection";
import WhyItWorksSection from "@packages/components/WhyItWorksSection";

import { description, title } from "@packages/config/site";
import { getDatabase } from "@packages/repositories/db";
import {
  type LoaderFunctionArgs,
  type MetaFunction,
  useLoaderData,
} from "react-router";

export const meta: MetaFunction = () => {
  return [{ title }, { name: "description", content: description }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDatabase(context);
  const testimonials = await db.testimonials;
  return { testimonials };
}

export default function Index() {
  const { testimonials } = useLoaderData<typeof loader>();
  return (
    <>
      <HeroSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <TechSection />
      <TestimonialSection testimonials={testimonials} />
      <Footer />
    </>
  );
}
