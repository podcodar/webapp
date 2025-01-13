import Section from "@packages/components/Section";
import { LocalizedText } from "@packages/locale/context";

const FOLDER_ID = "1lNvrSfyhmpV4mgMbj4Vic72qEfe_r6my";

export default function TransparencyPortal() {
	const driverSrc = `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#list`;

	return (
		<Section className="px-0 pt-32 min-h-[100vh]">
			<div className="flex flex-col items-center space-y-2 text-center md:space-y-4 w-full">
				<h1 className=" py-30 font-semibold text-xl leading-tight sm:text-3xl ">
					<LocalizedText token="transparency-portal.title" />
				</h1>

				<iframe
					title="Transparency Portal"
					src={driverSrc}
					className="w-full h-full border-none"
					width="100%"
					height="100vh"
				/>
			</div>
		</Section>
	);
}
