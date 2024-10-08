"use client";

import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Trans } from "react-i18next";

import { Illustration } from "@packages/components/icons";
import { links } from "@packages/config/site";
import { useI18n } from "@packages/features/i18n-context";

import Section from "./Section";

export default function CallToActionSection() {
  const { t } = useI18n("call-to-action");

  return (
    <Section className="py-40">
      <Stack textAlign="center" align="center" spacing={{ base: 8, md: 10 }}>
        <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%">
          <Trans
            i18nKey={t("title")}
            components={{
              span: <span className="text-purple-400" />,
            }}
          />
        </Heading>

        <p className="text-gray-500 max-w-3xl">{t("description")}</p>

        <Stack spacing={6} w={{ base: "100%", sm: "auto" }} direction={{ base: "column", sm: "row" }}>
          <Button as="a" href={links.secondaryButton} rounded="full" px={6}>
            {t("secondary-button")}
          </Button>
        </Stack>
        <Flex w="full">
          <Illustration height={{ sm: "24rem", lg: "28rem" }} />
        </Flex>
      </Stack>
    </Section>
  );
}
