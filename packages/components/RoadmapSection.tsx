"use client";

import { Flex, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import Link from "@packages/components/Link";
import { roadMapsLinks } from "@packages/config/site";
import { LocalizedText, type TranslationToken } from "@packages/locale/context";

import { classes } from "@packages/utils/classes";
import Section from "./Section";

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
          <CardItem key={cardProps.title} color={cardProps.color} link={cardProps.link} title={cardProps.title} />
        ))}
      </Grid>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  link: string;
  color: string;
}

function CardItem({ title, link, color }: CardItemProps) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className={classes("flex justify-center py-8 border-2 rounded-lg", color)}>
        <h2 className="font-normal text-xl leading-tight">{title}</h2>
      </div>
    </a>
  );
}

const cardList: CardItemProps[] = [
  {
    title: "roadmap.web-programming",
    link: roadMapsLinks.webProgramming,
    color: "border-cyan-500",
  },
  {
    title: "roadmap.ux-design",
    link: roadMapsLinks.uxDesign,
    color: "border-orange-500",
  },
  {
    title: "roadmap.react",
    link: roadMapsLinks.react,
    color: "border-pink-500",
  },
  {
    title: "roadmap.data",
    link: roadMapsLinks.introToData,
    color: "border-purple-500",
  },
];
