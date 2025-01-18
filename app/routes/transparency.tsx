import Section from "@packages/components/Section";
import { TRANSPARENCY_FOLDER_ID } from "@packages/config/site";
import { LocalizedText } from "@packages/locale/context";

type GoogleDriveListing = "list" | "grid";

export default function TransparencyPortal() {
  const listing: GoogleDriveListing = "list";
  const driverSrc = `https://drive.google.com/embeddedfolderview?id=${TRANSPARENCY_FOLDER_ID}#${listing}`;

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
