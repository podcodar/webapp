import { defaultLang, ui } from '@/i18n/ui';

export type Lang = keyof typeof ui;

/**
 * Get language from URL pathname.
 */
export function getLangFromUrl(_url: URL): Lang {
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key];
  };
}
