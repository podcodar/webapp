"use client";
import { Grid, GridItem, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import { LocalizedText, type TranslationToken } from "@packages/features/i18n-context";
import { classes } from "@packages/utils/classes";
import Section from "./Section";

export default function MentoringSection() {
  const bgColor = useColorModeValue("bg-white", "bg-gray-950");

  return (
    <Section className={classes("py-20", bgColor)}>
      <Grid templateColumns="repeat(5, 1fr)" gap={{ basE: 0, md: 4 }}>
        <GridItem rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 2 }}>
          <Heading size="md" my="2rem" fontWeight={400} textAlign="center">
            <LocalizedText translation="mentoring.title" />
          </Heading>

          <Text color="gray.500" fontSize="3xl" textAlign="center" px="3rem">
            <LocalizedText translation="mentoring.description" />
          </Text>
        </GridItem>

        {mentoringList.map((mentoring) => (
          <CardItem
            key={mentoring}
            title={`mentoring.${mentoring}.title`}
            description={`mentoring.${mentoring}.description`}
          />
        ))}
      </Grid>
    </Section>
  );
}

interface CardItemProps {
  title: TranslationToken;
  description: TranslationToken;
}

function CardItem({ title, description }: CardItemProps) {
  return (
    <GridItem colSpan={{ base: 5, md: 3 }} textAlign={{ base: "center", md: "left" }}>
      <Heading size="md" fontWeight={400} my="2rem">
        <LocalizedText translation={title} />
      </Heading>
      <Text color="gray.500">
        <LocalizedText translation={description} />
      </Text>
    </GridItem>
  );
}

const mentoringList = ["study-mentorships", "project-mentoring", "market-mentoring"];
