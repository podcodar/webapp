import { Illustration } from "@packages/components/icons";
import { links } from "@packages/config/site";

import { LocalizedText } from "@packages/locale/context";
import Section from "./Section";

export default function CallToActionSection() {
	return (
		<Section className="px-8 py-40">
			<div className="flex flex-col items-center gap-6 text-center">
				<h2 className="font-semibold text-3xl leading-tight sm:text-4xl">
					<LocalizedText
						token={"call-to-action.title"}
						components={{
							span: <span className="text-purple-400" />,
						}}
					/>
				</h2>

				<p className="max-w-3xl text-gray-500">
					<LocalizedText token="call-to-action.description" />
				</p>

				<div className="flex w-full flex-col sm:w-auto sm:flex-row">
					<a
						href={links.secondaryButton}
						className="btn btn-ghost hover:btn-active rounded-full bg-gray-200"
					>
						<LocalizedText token="call-to-action.secondary-button" />
					</a>
				</div>
				<div className="flex w-full base:px-12 md:px-24 lg:px-36">
					<Illustration />
				</div>
			</div>
		</Section>
	);
}
