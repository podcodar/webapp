import Section from "@packages/components/Section";
import { LocalizedText } from "@packages/locale/context";

export default function TransparencyPortal() {
	return (
		<Section className="px-0 pt-32">
			<div className="flex flex-col items-center space-y-2 text-center md:space-y-4">
				<h1 className=" py-30 font-semibold text-xl leading-tight sm:text-3xl ">
					<LocalizedText token="transparency-portal.title" />
				</h1>
			</div>
		</Section>
	);
}
