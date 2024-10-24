"use client";

import { useColorModeValue } from "@chakra-ui/react";

import { roadMapsLinks } from "@packages/config/site";
import { LocalizedText, type TranslationToken } from "@packages/locale/context";
import { classes } from "@packages/utils/classes";

import Section from "./Section";

import styles from "./roadmapSection.module.css";

export default function RoadmapSection() {
  console.log(styles);

  const bgColor = useColorModeValue("bg-gray-100", "bg-gray-900");

  return (
    <Section className={bgColor} innerClassName="grid gap-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl leading-tight">
          <LocalizedText token="roadmap.title" />
        </h2>
        <a href={roadMapsLinks.all} target="_blank" rel="noreferrer noopener">
          <LocalizedText token="roadmap.see-all" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cardList.map((cardProps) => (
          <CardItem
            key={cardProps.title}
            colorClass={cardProps.colorClass}
            link={cardProps.link}
            title={cardProps.title}
          />
        ))}
      </div>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  link: string;
  colorClass: string;
}

function CardItem({ title, link, colorClass }: Readonly<CardItemProps>) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div
        className={classes(
          "flex justify-center rounded-lg border-2 py-8 transition-shadow duration-300 ease-in-out",
          styles.card,
          colorClass,
        )}
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
    colorClass: styles.blue,
  },
  {
    title: "roadmap.ux-design",
    link: roadMapsLinks.uxDesign,
    colorClass: styles.orange,
  },
  {
    title: "roadmap.react",
    link: roadMapsLinks.react,
    colorClass: styles.pink,
  },
  {
    title: "roadmap.data",
    link: roadMapsLinks.introToData,
    colorClass: styles.purple,
  },
];
