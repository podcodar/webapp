"use client";

import { Stack, Text, Image, Grid } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { useI18n } from "@packages/features/i18n-context";
import { PIX_KEY, images } from "@packages/config/site";
import { Logo } from "@packages/components/icons";

import Section from "./Section";
import SocialIconLinks from "./SocialIconLinks";
import { classes } from "@packages/utils/classes";

export default function Footer() {
  const bgColor = "bg-neutral-950";
  return (
    <Section className={classes(bgColor, 'px-6 py-6 items-center')}>
      <Grid gridTemplateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} color="gray.50" css={centerGridCells}>
        <PodCodarLogo />
        <Copyrights />
        <Pix />
      </Grid>
    </Section>
  );
}

function PodCodarLogo() {
  return (
    <Stack>
      <Logo size="large" />
    </Stack>
  );
}

function Pix() {
  const { t } = useI18n("footer");
  return (
    <Stack>
      <Text>{t("contribution")}</Text>
      <Text fontSize="sm" color="#718096">
        {PIX_KEY}
      </Text>
      <Image src={images.pixQRCode} width="40%" alt={t("contribution")} />
    </Stack>
  );
}

function Copyrights() {
  const { t } = useI18n("footer");
  const currentYear = new Date().getFullYear();
  return (
    <Stack>
      <Text>{t("podcodar")}</Text>

      <SocialIconLinks />

      <Text fontSize="sm">{t("legal", { currentYear })}</Text>
    </Stack>
  );
}

const centerGridCells = css`
  & > * {
    align-items: center;
  }
`;
