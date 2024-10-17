"use client";

import { useColorModeValue } from "@chakra-ui/react";

import { roadMapsLinks } from "@packages/config/site";
import { LocalizedText, type TranslationToken } from "@packages/locale/context";

import { classes } from "@packages/utils/classes";

import Section from "./Section";

interface CardItemProps {
  title: TranslationToken;
  link: string;
  border: string;
  shadow: string;
}

const cardList: CardItemProps[] = [
  {
    title: "roadmap.web-programming",
    link: roadMapsLinks.webProgramming,
    border: "border-[#17A9BC]",
    shadow: "hover:shadow-[#17A9BC_-8px_8px_0px]",
  },
  {
    title: "roadmap.ux-design",
    link: roadMapsLinks.uxDesign,
    border: "border-[#F99223]",
    shadow: "hover:shadow-[#F99223_-8px_8px_0px]",
  },
  {
    title: "roadmap.react",
    link: roadMapsLinks.react,
    border: "border-[#FF4CFF]",
    shadow: "hover:shadow-[#FF4CFF_-8px_8px_0px]",
  },
  {
    title: "roadmap.data",
    link: roadMapsLinks.introToData,
    border: "border-[#b794f4]",
    shadow: "hover:shadow-[#b794f4_-8px_8px_0px]",
  },
];

function CardItem({ title, link, border, shadow }: Readonly<CardItemProps>) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div
        className={classes(
          "flex justify-center py-8 border-2 rounded-lg transition-shadow duration-300 ease-in-out",
          border,
          shadow,
        )}
      >
        <h2 className="font-normal text-xl leading-tight">
          <LocalizedText token={title} />
        </h2>
      </div>
    </a>
  );
}

export default function RoadmapSection() {
  const bgColor = useColorModeValue("bg-gray-100", "bg-gray-900");

  return (
    <Section className={bgColor} innerClassName="grid gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl leading-tight">
          <LocalizedText token="roadmap.title" />
        </h2>
        <a href={roadMapsLinks.all} target="_blank" rel="noreferrer noopener">
          <LocalizedText token="roadmap.see-all" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardList.map((cardProps) => (
          <CardItem
            key={cardProps.title}
            border={cardProps.border}
            shadow={cardProps.shadow}
            link={cardProps.link}
            title={cardProps.title}
          />
        ))}
      </div>
    </Section>
  );
}
