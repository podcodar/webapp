"use client";

import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import { PersonalizedLearningIcon, PracticalLearningIcon, TeamworkIcon } from "@packages/components/icons";
import { type I18nTextProps, LocalizedText } from "@packages/features/i18n-context";
import type { ReactNode } from "react";
import Section from "./Section";

export default function WhyItWorksSection() {
  const bgColor = useColorModeValue("bg-gray-50", "bg-gray-900");

  return (
    <Section className={bgColor} id="why-it-works">
      <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center" py="2rem">
        <LocalizedText token="why-it-works.title" />
      </Heading>
      <Stack direction={{ base: "column", md: "row" }} textAlign="center" p="1rem" spacing="4rem">
        {cardList.map((card) => (
          <CardItem
            key={card.translation}
            icon={card.icon}
            title={`why-it-works.${card.translation}.title`}
            description={`why-it-works.${card.translation}.description`}
          />
        ))}
      </Stack>
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
    <Box w="100%">
      <div className="w-40 h-40 p-4 mx-auto">{icon}</div>

      <Heading size="md" fontWeight={400} my="2rem">
        <LocalizedText token={title} />
      </Heading>

      <Text color="gray.500">
        <LocalizedText token={description} />
      </Text>
    </Box>
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
