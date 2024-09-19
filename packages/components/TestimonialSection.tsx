"use client";

import { useRef } from "react";
import { useColorModeValue, Heading, Box, Flex, Image, Text, Stack, Button } from "@chakra-ui/react";

import { useI18n } from "@packages/features/i18n-context";

import Section from "./Section";

import type { Testimonial } from "@packages/entities/testimonials";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: Props) {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { t } = useI18n("testimonials");
  const sliderRef = useRef<HTMLInputElement>(null);

  function handleSliderScroll(direction: "left" | "right") {
    if (sliderRef.current === null) return;
    const multiplier = direction === "left" ? -1 : 1;
    const cardWidth = 300;
    sliderRef.current.scrollLeft += cardWidth * multiplier;
  }

  return (
    <Section bg={bgColor}>
      <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center" py="2rem">
        {t("title")}
      </Heading>
      <Flex justify="space-between" mb="0.5rem">
        <Button onClick={() => handleSliderScroll("left")}>{"<"}</Button>
        <Button onClick={() => handleSliderScroll("right")}>{">"}</Button>
      </Flex>
      <Box h="320px" overflow="hidden" scrollBehavior="smooth" ref={sliderRef}>
        <Stack direction="row">
          {testimonials.map(({ name, text, avatarUrl }) => (
            <TestimonialCard key={name} name={name} testimonial={text} img={avatarUrl} />
          ))}
        </Stack>
      </Box>
    </Section>
  );
}

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  img: string;
}

function TestimonialCard({ name, testimonial, img }: TestimonialCardProps) {
  return (
    <Box rounded="lg" shadow="lg" p={2} w="300px" flex="none">
      <Flex justifyContent="space-between" mb="1">
        <Heading alignSelf="center" size="sm">
          {name}
        </Heading>
        <Image
          src={img}
          alt={name}
          maxW={{ base: "4rem", sm: "4.5rem" }}
          fit="cover"
          rounded="full"
          borderStyle="solid"
          borderWidth="3px"
          borderColor="#17A9BC"
        />
      </Flex>
      <Text>{testimonial}</Text>
    </Box>
  );
}
