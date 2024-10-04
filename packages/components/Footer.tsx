"use client";

import Image from "next/image";

import { Logo } from "@packages/components/icons";
import { PIX_KEY, images } from "@packages/config/site";
import { useI18n } from "@packages/features/i18n-context";

import Section from "./Section";
import SocialIconLinks from "./SocialIconLinks";

export default function Footer() {
  return (
    <Section className="bg-neutral-950 px-6 py-6 items-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 text-gray-50">
        <PodCodarLogo />
        <Copyrights />
        <Pix />
      </div>
    </Section>
  );
}

function PodCodarLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo size="large" />
    </div>
  );
}

function Pix() {
  const { t } = useI18n("footer");
  return (
    <div className="flex flex-col items-center gap-2">
      <p>{t("contribution")}</p>
      <p className="text-sm text-zinc-500">{PIX_KEY}</p>
      <Image src={images.pixQRCode} width={125} height={125} alt={t("contribution")} />
    </div>
  );
}

function Copyrights() {
  const { t } = useI18n("footer");
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center gap-2">
      <p>{t("podcodar")}</p>
      <SocialIconLinks />
      <p className="text-sm">{t("legal", { currentYear })}</p>
    </div>
  );
}
