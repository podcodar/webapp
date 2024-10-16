"use client";

import {
  Box,
  type ComponentWithAs,
  Heading,
  Icon,
  type IconProps,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { PersonalizedLearningIcon, PracticalLearningIcon, TeamworkIcon } from "@packages/components/icons";
import { type I18nTextProps, LocalizedText } from "@packages/features/i18n-context";
import Section from "./Section";

export default function WhyItWorksSection() {
  const bgColor = useColorModeValue("bg-gray-50", "bg-gray-900");

  return (
    <Section className={bgColor} id="why-it-works">
      <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center" py="2rem">
        <LocalizedText translation="why-it-works.title" />
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
  icon: ComponentWithAs<"svg", IconProps>;
  title: I18nTextProps["translation"];
  description: I18nTextProps["translation"];
}

function CardItem({ title, icon, description }: CardItemProps) {
  return (
    <Box w="100%">
      <Icon as={icon} w="10rem" h="10rem" m="1rem" />
      <Heading size="md" fontWeight={400} my="2rem">
        <LocalizedText translation={title} />
      </Heading>
      <Text color="gray.500">
        <LocalizedText translation={description} />
      </Text>
    </Box>
  );
}

type Card = {
  icon: ComponentWithAs<"svg", IconProps>;
  translation: string;
};

const cardList: Card[] = [
  {
    icon: PracticalLearningIcon,
    translation: "practical-learn",
  },
  {
    icon: PersonalizedLearningIcon,
    translation: "personalized-learning",
  },
  {
    icon: TeamworkIcon,
    translation: "teamwork",
  },
];
