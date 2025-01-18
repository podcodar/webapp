import { Illustration } from "@packages/components/icons";

import { links } from "@packages/config/site";
import { LocalizedText } from "@packages/locale/context";
import Section from "./Section";

export default function HeroSection() {
  return (
    <Section className="px-8 py-64 flex-col justify-center">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-6 py-16 text-center md:text-left ">
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

          <div className="grid gap-6 grid-cols-2">
            <a href={links.secondaryButton} className="btn btn-outline">
              <LocalizedText token="call-to-action.secondary-button" />
            </a>

            <a
              href={links.secondaryButton}
              className="btn btn-secondary btn-outline"
            >
              <LocalizedText token="call-to-action.primary-button" />
            </a>
          </div>
        </div>

        <div className="flex w-full base:px-12 md:px-24 lg:px-36 md:col-span-2 animate-bounce">
          <Illustration />
        </div>
      </div>
    </Section>
  );
}
