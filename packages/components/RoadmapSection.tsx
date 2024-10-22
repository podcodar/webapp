"use client";

import { useColorModeValue } from "@chakra-ui/react";
import type { CSSProperties } from "react";

import { roadMapsLinks } from "@packages/config/site";
import { LocalizedText, type TranslationToken } from "@packages/locale/context";

import { classes } from "@packages/utils/classes";

import Section from "./Section";

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
          <CardItem key={cardProps.title} color={cardProps.color} link={cardProps.link} title={cardProps.title} />
        ))}
      </div>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  link: string;
  color: string;
}

function CardItem({ title, link, color }: Readonly<CardItemProps>) {
  const innerStyle = {
    "--color": color,
  } as CSSProperties;

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div
        className={
          "flex justify-center py-8 border-2 border-[var(--color)] rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-[-8px_8px_0px_0px_var(--color)]"
        }
        style={innerStyle}
      >
        <h2 className="font-normal text-xl leading-tight">
          <LocalizedText token={title} />
        </h2>
      </div>
    </a>
  );
}

const cardList: CardItemProps[] = [
  {
    title: "roadmap.web-programming",
    link: roadMapsLinks.webProgramming,
    color: "#17A9BC",
  },
  {
    title: "roadmap.ux-design",
    link: roadMapsLinks.uxDesign,
    color: "#F99223",
  },
  {
    title: "roadmap.react",
    link: roadMapsLinks.react,
    color: "#FF4CFF",
  },
  {
    title: "roadmap.data",
    link: roadMapsLinks.introToData,
    color: "#b794f4",
  },
];
