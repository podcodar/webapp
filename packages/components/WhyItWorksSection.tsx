import {
  PersonalizedLearningIcon,
  PracticalLearningIcon,
  TeamworkIcon,
} from "@packages/components/icons";
import { type I18nTextProps, LocalizedText } from "@packages/locale/context";
import type { ReactNode } from "react";
import Section from "./Section";

export default function WhyItWorksSection() {
  return (
    <Section className="bg-gray-50 dark:bg-gray-900" id="why-it-works">
      <h2 className="py-8 text-center font-semibold text-3xl leading-tight sm:text-4xl">
        <LocalizedText token="why-it-works.title" />
      </h2>
      <div className="flex flex-col gap-16 p-4 text-center md:flex-row">
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
      <div className="mx-auto h-40 w-40 p-4">{icon}</div>
      <h2 className="my-8 text-md text-xl">
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
