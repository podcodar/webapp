import { useTranslation } from 'next-i18next';

type TranslationNS = 'common' | 'callToAction' | 'navbar' | 'whyItWorks';

export const useI18n = (ns: TranslationNS) => useTranslation(ns);
