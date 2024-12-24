import CallToActionSection from "@packages/components/CallToActionSection";
import Footer from "@packages/components/Footer";
import MentoringSection from "@packages/components/MentoringSection";
import RoadmapSection from "@packages/components/RoadmapSection";
import TechSection from "@packages/components/TechSection";
import TestimonialSection from "@packages/components/TestimonialSection";
import WhyItWorksSection from "@packages/components/WhyItWorksSection";
import { db } from "@packages/repositories/db";
import { testimonialsTable } from "@packages/repositories/db/schema";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { description, title } from "@packages/config/site";

export const meta: MetaFunction = () => {
	return [{ title }, { name: "description", content: description }];
};

export async function loader() {
	const testimonials = await db.select().from(testimonialsTable);
	return { testimonials };
}

export default function Index() {
	const { testimonials } = useLoaderData<typeof loader>();
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
