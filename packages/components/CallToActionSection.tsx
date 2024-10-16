import { Illustration } from "@packages/components/icons";
import { links } from "@packages/config/site";

import { LocalizedText } from "@packages/features/i18n-context";
import Section from "./Section";

export default function CallToActionSection() {
  return (
    <Section className="py-40 px-8">
      <div className="text-center flex flex-col items-center gap-6">
        <h2 className="font-semibold leading-tight text-3xl sm:text-4xl">
          <LocalizedText
            translation={"call-to-action.title"}
            components={{
              span: <span className="text-purple-400" />,
            }}
          />
        </h2>

        <p className="text-gray-500 max-w-3xl">
          <LocalizedText translation="call-to-action.description" />
        </p>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row">
          <a href={links.secondaryButton} className="btn btn-ghost hover:btn-active rounded-full bg-gray-200">
            <LocalizedText translation="call-to-action.secondary-button" />
          </a>
        </div>
        <div className="flex w-full md:px-24 lg:px-36 base:px-12">
          <Illustration />
        </div>
      </div>
    </Section>
  );
}
