"use client";

import { Flex, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import Link from "@packages/components/Link";
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
        <h2 className="font-normal text-xl leading-tight">{title}</h2>
      </div>
    </a>
  );
}

export default function RoadmapSection() {
  const bgColor = useColorModeValue("bg-gray-100", "bg-gray-900");

  return (
    <Section className={bgColor}>
      <Flex justifyContent="space-between" py="1rem">
        <Heading size="md" fontWeight={600} textAlign="left">
          <LocalizedText token="roadmap.title" />
        </Heading>
        <Text textAlign="right">
          <Link href={roadMapsLinks.all} target="_blank">
            <LocalizedText token="roadmap.see-all" />
          </Link>
        </Text>
      </Flex>

      <Grid
        gridTemplateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="2rem"
        my="2rem"
      >
        {cardList.map((cardProps) => (
          <CardItem
            key={cardProps.title}
            border={cardProps.border}
            shadow={cardProps.shadow}
            link={cardProps.link}
            title={cardProps.title}
          />
        ))}
      </Grid>
    </Section>
  );
}
