import { createContext, useContext, useMemo, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { makeThrowMissingImplementation } from '@packages/utils/functions';
import { ChildrenProps, useEffectOnce } from '@packages/utils/react';
import * as en from '@packages/locale/en.yml';
import * as pt from '@packages/locale/pt.yml';

const DEFAULT_LOCALE: Locale = 'pt';
const LOCAL_STORAGE_KEY = 'podcodar:locale';
const missingI18nProvider = makeThrowMissingImplementation(
  'Missing I18nProvider upwards in this tree',
);

interface I18nActions {
  readonly setLocale: (locale: Locale) => void;
}

interface I18nStates {
  readonly locale: Locale;
}

const I18nActionsCtx = createContext<I18nActions>({
  setLocale: missingI18nProvider,
});

const I18nStateCtx = createContext<I18nStates>({
  locale: DEFAULT_LOCALE,
});

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
    const locale =
      (localStorage.getItem(LOCAL_STORAGE_KEY) as Locale) ?? DEFAULT_LOCALE;
    actions.setLocale(locale);
  });

  return (
    <I18nActionsCtx.Provider value={actions}>
      <I18nStateCtx.Provider value={state}>{children}</I18nStateCtx.Provider>
    </I18nActionsCtx.Provider>
  );
}

export function useI18nStates() {
  return useContext(I18nStateCtx);
}

export function useI18nActions() {
  return useContext(I18nActionsCtx);
}

export function useI18n(namespace: TranslationNS) {
  return useTranslation(namespace);
}

type Locale = 'en' | 'pt';

type TranslationNS =
  | 'common'
  | 'callToAction'
  | 'navbar'
  | 'whyItWorks'
  | 'mentoring'
  | 'roadmap'
  | 'footer';
