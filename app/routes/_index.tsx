import CallToActionSection from "@packages/components/CallToActionSection";
import Footer from "@packages/components/Footer";
import MentoringSection from "@packages/components/MentoringSection";
import RoadmapSection from "@packages/components/RoadmapSection";
import TechSection from "@packages/components/TechSection";
import TestimonialSection from "@packages/components/TestimonialSection";
import WhyItWorksSection from "@packages/components/WhyItWorksSection";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { description, title } from "@packages/config/site";
import { Database } from "@packages/repositories/db";

export const meta: MetaFunction = () => {
	return [{ title }, { name: "description", content: description }];
};

export async function loader({ context }: LoaderFunctionArgs) {
	const db = new Database(
		context.cloudflare.env.TURSO_CONNECTION_URL,
		context.cloudflare.env.TURSO_AUTH_TOKEN,
	);
	const testimonials = await db.testimonials;
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
