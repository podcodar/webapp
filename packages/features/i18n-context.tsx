"use client";

import i18next from "i18next";
import { useMemo, useState } from "react";
import { Trans, initReactI18next, useTranslation } from "react-i18next";

import * as en from "@packages/locale/en.yml";
import * as pt from "@packages/locale/pt.yml";
import { type ChildrenProps, useEffectOnce } from "@packages/utils/react";
import { createCtx } from "@packages/utils/react";

const DEFAULT_LOCALE: Locale = "pt";
const LOCAL_STORAGE_KEY = "podcodar:locale";

interface I18nActions {
  readonly setLocale: (locale: Locale) => void;
}

interface I18nStates {
  readonly locale: Locale;
}

const [useI18nActions, I18nActionsProvider] = createCtx<I18nActions>("I18nActionsCtx");
const [useI18nStates, I18nStatesProvider] = createCtx<I18nStates>("I18nStatesCtx");

export { useI18nActions, useI18nStates };

i18next.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  resources: { en, pt },
  interpolation: {
    escapeValue: false,
  },
});

export default function I18nProvider({ children }: ChildrenProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const state: I18nStates = useMemo(() => ({ locale }), [locale]);
  const actions: I18nActions = useMemo(
    () => ({
      setLocale: (locale) => {
        setLocale(locale);
        i18next.changeLanguage(locale);
        localStorage.setItem(LOCAL_STORAGE_KEY, locale);
      },
    }),
    [],
  );

  useEffectOnce(() => {
    // we need to put it into a effect to access local storage
    const locale = (localStorage.getItem(LOCAL_STORAGE_KEY) as Locale) ?? DEFAULT_LOCALE;
    actions.setLocale(locale);
  });

  return (
    <I18nActionsProvider value={actions}>
      <I18nStatesProvider value={state}>{children}</I18nStatesProvider>
    </I18nActionsProvider>
  );
}

type Locale = "en" | "pt";

export type TranslationNS =
  | "common"
  | "call-to-action"
  | "navbar"
  | "why-it-works"
  | "mentoring"
  | "roadmap"
  | "social-links"
  | "footer"
  | "team-page"
  | "ask-us-page"
  | "testimonials";

export type I18nTextProps = {
  translation: `${TranslationNS}.${string}`;
  components?: { readonly [tagName: string]: React.ReactElement };
};

export function LocalizedText({ translation, components = {} }: I18nTextProps) {
  const [ns, ...tokens] = translation.split(".");
  const token = tokens.join(".");
  const { t } = useTranslation(ns);
  return <Trans i18nKey={t(token)} components={components} />;
}
