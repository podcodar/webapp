import { defaultLang, ui } from '@/i18n/ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(_url: URL): Lang {
  return defaultLang;
}

export function useTranslations() {
  const t = function translate(key: string): string {
    return (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
  return t;
}
