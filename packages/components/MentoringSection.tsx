"use client";

import { useColorModeValue } from "@chakra-ui/react";
import { LocalizedText, type TranslationToken } from "@packages/features/i18n-context";
import { classes } from "@packages/utils/classes";
import Section from "./Section";

export default function MentoringSection() {
  const bgColor = useColorModeValue("bg-white", "bg-gray-950");

  return (
    <Section className={classes("py-20", bgColor)}>
      <div className="grid grid-cols-5 gap-0 md:gap-4">
        <div className="row-span-1 md:row-span-3 col-span-5 md:col-span-2">
          <h2 className="text-lg my-8 font-light text-center">
            <LocalizedText token="mentoring.title" />
          </h2>

          <div className="text-gray-500 text-3xl text-center px-12">
            <LocalizedText token="mentoring.description" />
          </div>
        </div>

        {mentoringList.map((mentoring) => (
          <CardItem
            key={mentoring}
            title={`mentoring.${mentoring}.title`}
            description={`mentoring.${mentoring}.description`}
          />
        ))}
      </div>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  description: TranslationToken;
}

function CardItem({ title, description }: CardItemProps) {
  return (
    <div className="col-span-5 md:col-span-3 text-center md:text-left">
      <h3 className="text-md font-light my-8">
        <LocalizedText token={title} />
      </h3>
      <span className="text-gray-500">
        <LocalizedText token={description} />
      </span>
    </div>
  );
}

const mentoringList = ["study-mentorships", "project-mentoring", "market-mentoring"];
