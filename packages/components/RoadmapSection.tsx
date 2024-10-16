"use client";

import { Flex, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import Link from "@packages/components/Link";
import { roadMapsLinks } from "@packages/config/site";
import { LocalizedText } from "@packages/features/i18n-context";

import Section from "./Section";

export default function RoadmapSection() {
  const bgColor = useColorModeValue("bg-gray-100", "bg-gray-900");
  return (
    <Section className={bgColor}>
      <Flex justifyContent="space-between" py="1rem">
        <Heading size="md" fontWeight={600} textAlign="left">
          <LocalizedText translation="roadmap.title" />
        </Heading>
        <Text textAlign="right">
          <Link href={roadMapsLinks.all} isExternal>
            <LocalizedText translation="roadmap.see-all" />
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
            color={cardProps.color}
            link={cardProps.link}
            title={`roadmap.${cardProps.title}`}
          />
        ))}
      </Grid>
    </Section>
  );
}

interface CardItemProps {
  title: string;
  link: string;
  color: string;
}

function CardItem({ title, link, color }: CardItemProps) {
  return (
    <Link href={link} isExternal _hover={{ textDecoration: "none" }}>
      <Flex
        py="2rem"
        transition="box-shadow 300ms ease-in-out"
        border="2px solid"
        borderColor={color}
        borderRadius="10px"
        justifyContent="center"
        _hover={{
          boxShadow: `-8px 8px 0 ${color}`,
        }}
      >
        <Heading size="md" fontWeight={400} textDecoration="none">
          {title}
        </Heading>
      </Flex>
    </Link>
  );
}

const cardList: CardItemProps[] = [
  {
    title: "web-programming",
    link: roadMapsLinks.webProgramming,
    color: "#17A9BC",
  },
  {
    title: "ux-design",
    link: roadMapsLinks.uxDesign,
    color: "#F99223",
  },
  {
    title: "react",
    link: roadMapsLinks.react,
    color: "#FF4CFF",
  },
  {
    title: "data",
    link: roadMapsLinks.introToData,
    color: "#b794f4",
  },
];
