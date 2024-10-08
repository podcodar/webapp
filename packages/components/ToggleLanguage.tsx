"use client";

import { Button } from "@chakra-ui/react";

import { BRFlagIcon, USFlagIcon } from "@packages/components/icons";
import { useI18nActions, useI18nStates } from "@packages/features/i18n-context";

export default function ToggleLanguage() {
  const { locale } = useI18nStates();
  const { setLocale } = useI18nActions();
  const text = locale === "en" ? <BRFlagIcon /> : <USFlagIcon />;
  const handleToggle = () => setLocale(locale === "en" ? "pt" : "en");

  return (
    <Button rounded="md" data-testid="toggle-language" aria-label="Toggle language button" onClick={handleToggle}>
      {text}
    </Button>
  );
}
