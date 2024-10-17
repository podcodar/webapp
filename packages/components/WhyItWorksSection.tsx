"use client";

import { useColorModeValue } from "@chakra-ui/react";

import { PersonalizedLearningIcon, PracticalLearningIcon, TeamworkIcon } from "@packages/components/icons";
import { type I18nTextProps, LocalizedText } from "@packages/features/i18n-context";
import type { ReactNode } from "react";
import Section from "./Section";

export default function WhyItWorksSection() {
  const bgColor = useColorModeValue("bg-gray-50", "bg-gray-900");

  return (
    <Section className={bgColor} id="why-it-works">
      <h2 className="font-semibold text-3xl sm:text-4xl leading-tight text-center py-8">
        <LocalizedText token="why-it-works.title" />
      </h2>
      <div className="text-center flex flex-col md:flex-row gap-16 p-4">
        {cardList.map((card) => (
          <CardItem
            key={card.translation}
            icon={card.icon}
            title={`why-it-works.${card.translation}.title`}
            description={`why-it-works.${card.translation}.description`}
          />
        ))}
      </div>
    </Section>
  );
}

interface CardItemProps {
  icon: ReactNode;
  title: I18nTextProps["token"];
  description: I18nTextProps["token"];
}

function CardItem({ title, icon, description }: CardItemProps) {
  return (
    <div className="w-full">
      <div className="w-40 h-40 p-4 mx-auto">{icon}</div>
      <h2 className="text-md text-xl my-8">
        <LocalizedText token={title} />
      </h2>
      <p className="text-gray-500">
        <LocalizedText token={description} />
      </p>
    </div>
  );
}

type Card = {
  icon: ReactNode;
  translation: string;
};

const cardList: Card[] = [
  {
    icon: <PracticalLearningIcon />,
    translation: "practical-learn",
  },
  {
    icon: <PersonalizedLearningIcon />,
    translation: "personalized-learning",
  },
  {
    icon: <TeamworkIcon />,
    translation: "teamwork",
  },
];
