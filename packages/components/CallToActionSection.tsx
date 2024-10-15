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
    <Section className="py-40 px-8">
      <div className="text-center flex flex-col items-center gap-6">
        <h2 className="font-semibold leading-tight text-3xl sm:text-4xl">
          <Trans
            i18nKey={t("title")}
            components={{
              span: <span className="text-purple-400" />,
            }}
          />
        </h2>

        <p className="text-gray-500 max-w-3xl">{t("description")}</p>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row">
          <a
            href={links.secondaryButton}
            className="rounded-full px-6 py-2 font-semibold bg-gray-100 text-black hover:bg-gray-200"
          >
            {t("secondary-button")}
          </a>
        </div>
        <div className="flex w-full md:px-24 lg:px-36 base:px-12">
          <Illustration />
        </div>
      </div>
    </Section>
  );
}
